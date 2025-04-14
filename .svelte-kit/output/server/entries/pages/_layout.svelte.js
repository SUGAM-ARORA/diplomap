import { g as get_store_value, o as onDestroy, c as create_ssr_component, a as add_styles, e as escape, v as validate_component, m as missing_component, b as spread, d as escape_object, f as merge_ssr_styles, h as add_attribute, i as subscribe, j as each } from "../../chunks/ssr.js";
import { p as page } from "../../chunks/stores.js";
import { d as derived, w as writable } from "../../chunks/index.js";
import { I as Icon } from "../../chunks/Icon.js";
function writableDerived(origins, derive, reflect, initial) {
  var childDerivedSetter, originValues, blockNextDerive = false;
  var reflectOldValues = reflect.length >= 2;
  var wrappedDerive = (got, set, update3) => {
    childDerivedSetter = set;
    if (reflectOldValues) {
      originValues = got;
    }
    if (!blockNextDerive) {
      let returned = derive(got, set, update3);
      if (derive.length < 2) {
        set(returned);
      } else {
        return returned;
      }
    }
    blockNextDerive = false;
  };
  var childDerived = derived(origins, wrappedDerive, initial);
  var singleOrigin = !Array.isArray(origins);
  function doReflect(reflecting) {
    var setWith = reflect(reflecting, originValues);
    if (singleOrigin) {
      blockNextDerive = true;
      origins.set(setWith);
    } else {
      setWith.forEach((value, i) => {
        blockNextDerive = true;
        origins[i].set(value);
      });
    }
    blockNextDerive = false;
  }
  var tryingSet = false;
  function update2(fn) {
    var isUpdated, mutatedBySubscriptions, oldValue, newValue;
    if (tryingSet) {
      newValue = fn(get_store_value(childDerived));
      childDerivedSetter(newValue);
      return;
    }
    var unsubscribe = childDerived.subscribe((value) => {
      if (!tryingSet) {
        oldValue = value;
      } else if (!isUpdated) {
        isUpdated = true;
      } else {
        mutatedBySubscriptions = true;
      }
    });
    newValue = fn(oldValue);
    tryingSet = true;
    childDerivedSetter(newValue);
    unsubscribe();
    tryingSet = false;
    if (mutatedBySubscriptions) {
      newValue = get_store_value(childDerived);
    }
    if (isUpdated) {
      doReflect(newValue);
    }
  }
  return {
    subscribe: childDerived.subscribe,
    set(value) {
      update2(() => value);
    },
    update: update2
  };
}
const TOAST_LIMIT = 20;
const toasts = writable([]);
const pausedAt = writable(null);
const toastTimeouts = /* @__PURE__ */ new Map();
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    remove(toastId);
  }, 1e3);
  toastTimeouts.set(toastId, timeout);
};
const clearFromRemoveQueue = (toastId) => {
  const timeout = toastTimeouts.get(toastId);
  if (timeout) {
    clearTimeout(timeout);
  }
};
function update(toast2) {
  if (toast2.id) {
    clearFromRemoveQueue(toast2.id);
  }
  toasts.update(($toasts) => $toasts.map((t) => t.id === toast2.id ? { ...t, ...toast2 } : t));
}
function add(toast2) {
  toasts.update(($toasts) => [toast2, ...$toasts].slice(0, TOAST_LIMIT));
}
function upsert(toast2) {
  if (get_store_value(toasts).find((t) => t.id === toast2.id)) {
    update(toast2);
  } else {
    add(toast2);
  }
}
function dismiss(toastId) {
  toasts.update(($toasts) => {
    if (toastId) {
      addToRemoveQueue(toastId);
    } else {
      $toasts.forEach((toast2) => {
        addToRemoveQueue(toast2.id);
      });
    }
    return $toasts.map((t) => t.id === toastId || toastId === void 0 ? { ...t, visible: false } : t);
  });
}
function remove(toastId) {
  toasts.update(($toasts) => {
    if (toastId === void 0) {
      return [];
    }
    return $toasts.filter((t) => t.id !== toastId);
  });
}
function startPause(time) {
  pausedAt.set(time);
}
function endPause(time) {
  let diff;
  pausedAt.update(($pausedAt) => {
    diff = time - ($pausedAt || 0);
    return null;
  });
  toasts.update(($toasts) => $toasts.map((t) => ({
    ...t,
    pauseDuration: t.pauseDuration + diff
  })));
}
const defaultTimeouts = {
  blank: 4e3,
  error: 4e3,
  success: 2e3,
  loading: Infinity,
  custom: 4e3
};
function useToasterStore(toastOptions = {}) {
  const mergedToasts = writableDerived(toasts, ($toasts) => $toasts.map((t) => ({
    ...toastOptions,
    ...toastOptions[t.type],
    ...t,
    duration: t.duration || toastOptions[t.type]?.duration || toastOptions?.duration || defaultTimeouts[t.type],
    style: [toastOptions.style, toastOptions[t.type]?.style, t.style].join(";")
  })), ($toasts) => $toasts);
  return {
    toasts: mergedToasts,
    pausedAt
  };
}
const isFunction = (valOrFunction) => typeof valOrFunction === "function";
const resolveValue = (valOrFunction, arg) => isFunction(valOrFunction) ? valOrFunction(arg) : valOrFunction;
const genId = /* @__PURE__ */ (() => {
  let count = 0;
  return () => {
    count += 1;
    return count.toString();
  };
})();
const prefersReducedMotion = /* @__PURE__ */ (() => {
  let shouldReduceMotion;
  return () => {
    if (shouldReduceMotion === void 0 && typeof window !== "undefined") {
      const mediaQuery = matchMedia("(prefers-reduced-motion: reduce)");
      shouldReduceMotion = !mediaQuery || mediaQuery.matches;
    }
    return shouldReduceMotion;
  };
})();
const createToast = (message, type = "blank", opts) => ({
  createdAt: Date.now(),
  visible: true,
  type,
  ariaProps: {
    role: "status",
    "aria-live": "polite"
  },
  message,
  pauseDuration: 0,
  ...opts,
  id: opts?.id || genId()
});
const createHandler = (type) => (message, options) => {
  const toast2 = createToast(message, type, options);
  upsert(toast2);
  return toast2.id;
};
const toast = (message, opts) => createHandler("blank")(message, opts);
toast.error = createHandler("error");
toast.success = createHandler("success");
toast.loading = createHandler("loading");
toast.custom = createHandler("custom");
toast.dismiss = (toastId) => {
  dismiss(toastId);
};
toast.remove = (toastId) => remove(toastId);
toast.promise = (promise, msgs, opts) => {
  const id = toast.loading(msgs.loading, { ...opts, ...opts?.loading });
  promise.then((p) => {
    toast.success(resolveValue(msgs.success, p), {
      id,
      ...opts,
      ...opts?.success
    });
    return p;
  }).catch((e) => {
    toast.error(resolveValue(msgs.error, e), {
      id,
      ...opts,
      ...opts?.error
    });
  });
  return promise;
};
function calculateOffset(toast2, $toasts, opts) {
  const { reverseOrder, gutter = 8, defaultPosition } = opts || {};
  const relevantToasts = $toasts.filter((t) => (t.position || defaultPosition) === (toast2.position || defaultPosition) && t.height);
  const toastIndex = relevantToasts.findIndex((t) => t.id === toast2.id);
  const toastsBefore = relevantToasts.filter((toast3, i) => i < toastIndex && toast3.visible).length;
  const offset = relevantToasts.filter((t) => t.visible).slice(...reverseOrder ? [toastsBefore + 1] : [0, toastsBefore]).reduce((acc, t) => acc + (t.height || 0) + gutter, 0);
  return offset;
}
const handlers = {
  startPause() {
    startPause(Date.now());
  },
  endPause() {
    endPause(Date.now());
  },
  updateHeight: (toastId, height) => {
    update({ id: toastId, height });
  },
  calculateOffset
};
function useToaster(toastOptions) {
  const { toasts: toasts2, pausedAt: pausedAt2 } = useToasterStore(toastOptions);
  const timeouts = /* @__PURE__ */ new Map();
  let _pausedAt;
  const unsubscribes = [
    pausedAt2.subscribe(($pausedAt) => {
      if ($pausedAt) {
        for (const [, timeoutId] of timeouts) {
          clearTimeout(timeoutId);
        }
        timeouts.clear();
      }
      _pausedAt = $pausedAt;
    }),
    toasts2.subscribe(($toasts) => {
      if (_pausedAt) {
        return;
      }
      const now = Date.now();
      for (const t of $toasts) {
        if (timeouts.has(t.id)) {
          continue;
        }
        if (t.duration === Infinity) {
          continue;
        }
        const durationLeft = (t.duration || 0) + t.pauseDuration - (now - t.createdAt);
        if (durationLeft < 0) {
          if (t.visible) {
            toast.dismiss(t.id);
          }
          return null;
        }
        timeouts.set(t.id, setTimeout(() => toast.dismiss(t.id), durationLeft));
      }
    })
  ];
  onDestroy(() => {
    for (const unsubscribe of unsubscribes) {
      unsubscribe();
    }
  });
  return { toasts: toasts2, handlers };
}
const css$a = {
  code: "div.svelte-11kvm4p{width:20px;opacity:0;height:20px;border-radius:10px;background:var(--primary, #61d345);position:relative;transform:rotate(45deg);animation:svelte-11kvm4p-circleAnimation 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;animation-delay:100ms}div.svelte-11kvm4p::after{content:'';box-sizing:border-box;animation:svelte-11kvm4p-checkmarkAnimation 0.2s ease-out forwards;opacity:0;animation-delay:200ms;position:absolute;border-right:2px solid;border-bottom:2px solid;border-color:var(--secondary, #fff);bottom:6px;left:6px;height:10px;width:6px}@keyframes svelte-11kvm4p-circleAnimation{from{transform:scale(0) rotate(45deg);opacity:0}to{transform:scale(1) rotate(45deg);opacity:1}}@keyframes svelte-11kvm4p-checkmarkAnimation{0%{height:0;width:0;opacity:0}40%{height:0;width:6px;opacity:1}100%{opacity:1;height:10px}}",
  map: `{"version":3,"file":"CheckmarkIcon.svelte","sources":["CheckmarkIcon.svelte"],"sourcesContent":["<!-- Adapted from https://github.com/timolins/react-hot-toast -->\\n<script>export let primary = \\"#61d345\\";\\nexport let secondary = \\"#fff\\";\\n<\/script>\\n\\n<div style:--primary={primary} style:--secondary={secondary} />\\n\\n<style>\\n\\tdiv {\\n\\t\\twidth: 20px;\\n\\t\\topacity: 0;\\n\\t\\theight: 20px;\\n\\t\\tborder-radius: 10px;\\n\\t\\tbackground: var(--primary, #61d345);\\n\\t\\tposition: relative;\\n\\t\\ttransform: rotate(45deg);\\n\\t\\tanimation: circleAnimation 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;\\n\\t\\tanimation-delay: 100ms;\\n\\t}\\n\\n\\tdiv::after {\\n\\t\\tcontent: '';\\n\\t\\tbox-sizing: border-box;\\n\\t\\tanimation: checkmarkAnimation 0.2s ease-out forwards;\\n\\t\\topacity: 0;\\n\\t\\tanimation-delay: 200ms;\\n\\t\\tposition: absolute;\\n\\t\\tborder-right: 2px solid;\\n\\t\\tborder-bottom: 2px solid;\\n\\t\\tborder-color: var(--secondary, #fff);\\n\\t\\tbottom: 6px;\\n\\t\\tleft: 6px;\\n\\t\\theight: 10px;\\n\\t\\twidth: 6px;\\n\\t}\\n\\n\\t@keyframes circleAnimation {\\n\\t\\tfrom {\\n\\t\\t\\ttransform: scale(0) rotate(45deg);\\n\\t\\t\\topacity: 0;\\n\\t\\t}\\n\\t\\tto {\\n\\t\\t\\ttransform: scale(1) rotate(45deg);\\n\\t\\t\\topacity: 1;\\n\\t\\t}\\n\\t}\\n\\n\\t@keyframes checkmarkAnimation {\\n\\t\\t0% {\\n\\t\\t\\theight: 0;\\n\\t\\t\\twidth: 0;\\n\\t\\t\\topacity: 0;\\n\\t\\t}\\n\\t\\t40% {\\n\\t\\t\\theight: 0;\\n\\t\\t\\twidth: 6px;\\n\\t\\t\\topacity: 1;\\n\\t\\t}\\n\\t\\t100% {\\n\\t\\t\\topacity: 1;\\n\\t\\t\\theight: 10px;\\n\\t\\t}\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAQC,kBAAI,CACH,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,IAAI,CACnB,UAAU,CAAE,IAAI,SAAS,CAAC,QAAQ,CAAC,CACnC,QAAQ,CAAE,QAAQ,CAClB,SAAS,CAAE,OAAO,KAAK,CAAC,CACxB,SAAS,CAAE,8BAAe,CAAC,IAAI,CAAC,aAAa,KAAK,CAAC,CAAC,KAAK,CAAC,CAAC,IAAI,CAAC,CAAC,KAAK,CAAC,CAAC,QAAQ,CAChF,eAAe,CAAE,KAClB,CAEA,kBAAG,OAAQ,CACV,OAAO,CAAE,EAAE,CACX,UAAU,CAAE,UAAU,CACtB,SAAS,CAAE,iCAAkB,CAAC,IAAI,CAAC,QAAQ,CAAC,QAAQ,CACpD,OAAO,CAAE,CAAC,CACV,eAAe,CAAE,KAAK,CACtB,QAAQ,CAAE,QAAQ,CAClB,YAAY,CAAE,GAAG,CAAC,KAAK,CACvB,aAAa,CAAE,GAAG,CAAC,KAAK,CACxB,YAAY,CAAE,IAAI,WAAW,CAAC,KAAK,CAAC,CACpC,MAAM,CAAE,GAAG,CACX,IAAI,CAAE,GAAG,CACT,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,GACR,CAEA,WAAW,8BAAgB,CAC1B,IAAK,CACJ,SAAS,CAAE,MAAM,CAAC,CAAC,CAAC,OAAO,KAAK,CAAC,CACjC,OAAO,CAAE,CACV,CACA,EAAG,CACF,SAAS,CAAE,MAAM,CAAC,CAAC,CAAC,OAAO,KAAK,CAAC,CACjC,OAAO,CAAE,CACV,CACD,CAEA,WAAW,iCAAmB,CAC7B,EAAG,CACF,MAAM,CAAE,CAAC,CACT,KAAK,CAAE,CAAC,CACR,OAAO,CAAE,CACV,CACA,GAAI,CACH,MAAM,CAAE,CAAC,CACT,KAAK,CAAE,GAAG,CACV,OAAO,CAAE,CACV,CACA,IAAK,CACJ,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,IACT,CACD"}`
};
const CheckmarkIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { primary = "#61d345" } = $$props;
  let { secondary = "#fff" } = $$props;
  if ($$props.primary === void 0 && $$bindings.primary && primary !== void 0) $$bindings.primary(primary);
  if ($$props.secondary === void 0 && $$bindings.secondary && secondary !== void 0) $$bindings.secondary(secondary);
  $$result.css.add(css$a);
  return `  <div class="svelte-11kvm4p"${add_styles({
    "--primary": primary,
    "--secondary": secondary
  })}></div>`;
});
const css$9 = {
  code: "div.svelte-1ee93ns{width:20px;opacity:0;height:20px;border-radius:10px;background:var(--primary, #ff4b4b);position:relative;transform:rotate(45deg);animation:svelte-1ee93ns-circleAnimation 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;animation-delay:100ms}div.svelte-1ee93ns::after,div.svelte-1ee93ns::before{content:'';animation:svelte-1ee93ns-firstLineAnimation 0.15s ease-out forwards;animation-delay:150ms;position:absolute;border-radius:3px;opacity:0;background:var(--secondary, #fff);bottom:9px;left:4px;height:2px;width:12px}div.svelte-1ee93ns:before{animation:svelte-1ee93ns-secondLineAnimation 0.15s ease-out forwards;animation-delay:180ms;transform:rotate(90deg)}@keyframes svelte-1ee93ns-circleAnimation{from{transform:scale(0) rotate(45deg);opacity:0}to{transform:scale(1) rotate(45deg);opacity:1}}@keyframes svelte-1ee93ns-firstLineAnimation{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}@keyframes svelte-1ee93ns-secondLineAnimation{from{transform:scale(0) rotate(90deg);opacity:0}to{transform:scale(1) rotate(90deg);opacity:1}}",
  map: `{"version":3,"file":"ErrorIcon.svelte","sources":["ErrorIcon.svelte"],"sourcesContent":["<!-- Adapted from https://github.com/timolins/react-hot-toast -->\\n<script>export let primary = \\"#ff4b4b\\";\\nexport let secondary = \\"#fff\\";\\n<\/script>\\n\\n<div style:--primary={primary} style:--secondary={secondary} />\\n\\n<style>\\n\\tdiv {\\n\\t\\twidth: 20px;\\n\\t\\topacity: 0;\\n\\t\\theight: 20px;\\n\\t\\tborder-radius: 10px;\\n\\t\\tbackground: var(--primary, #ff4b4b);\\n\\t\\tposition: relative;\\n\\t\\ttransform: rotate(45deg);\\n\\t\\tanimation: circleAnimation 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;\\n\\t\\tanimation-delay: 100ms;\\n\\t}\\n\\n\\tdiv::after,\\n\\tdiv::before {\\n\\t\\tcontent: '';\\n\\t\\tanimation: firstLineAnimation 0.15s ease-out forwards;\\n\\t\\tanimation-delay: 150ms;\\n\\t\\tposition: absolute;\\n\\t\\tborder-radius: 3px;\\n\\t\\topacity: 0;\\n\\t\\tbackground: var(--secondary, #fff);\\n\\t\\tbottom: 9px;\\n\\t\\tleft: 4px;\\n\\t\\theight: 2px;\\n\\t\\twidth: 12px;\\n\\t}\\n\\n\\tdiv:before {\\n\\t\\tanimation: secondLineAnimation 0.15s ease-out forwards;\\n\\t\\tanimation-delay: 180ms;\\n\\t\\ttransform: rotate(90deg);\\n\\t}\\n\\n\\t@keyframes circleAnimation {\\n\\t\\tfrom {\\n\\t\\t\\ttransform: scale(0) rotate(45deg);\\n\\t\\t\\topacity: 0;\\n\\t\\t}\\n\\t\\tto {\\n\\t\\t\\ttransform: scale(1) rotate(45deg);\\n\\t\\t\\topacity: 1;\\n\\t\\t}\\n\\t}\\n\\n\\t@keyframes firstLineAnimation {\\n\\t\\tfrom {\\n\\t\\t\\ttransform: scale(0);\\n\\t\\t\\topacity: 0;\\n\\t\\t}\\n\\t\\tto {\\n\\t\\t\\ttransform: scale(1);\\n\\t\\t\\topacity: 1;\\n\\t\\t}\\n\\t}\\n\\n\\t@keyframes secondLineAnimation {\\n\\t\\tfrom {\\n\\t\\t\\ttransform: scale(0) rotate(90deg);\\n\\t\\t\\topacity: 0;\\n\\t\\t}\\n\\t\\tto {\\n\\t\\t\\ttransform: scale(1) rotate(90deg);\\n\\t\\t\\topacity: 1;\\n\\t\\t}\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAQC,kBAAI,CACH,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,IAAI,CACnB,UAAU,CAAE,IAAI,SAAS,CAAC,QAAQ,CAAC,CACnC,QAAQ,CAAE,QAAQ,CAClB,SAAS,CAAE,OAAO,KAAK,CAAC,CACxB,SAAS,CAAE,8BAAe,CAAC,IAAI,CAAC,aAAa,KAAK,CAAC,CAAC,KAAK,CAAC,CAAC,IAAI,CAAC,CAAC,KAAK,CAAC,CAAC,QAAQ,CAChF,eAAe,CAAE,KAClB,CAEA,kBAAG,OAAO,CACV,kBAAG,QAAS,CACX,OAAO,CAAE,EAAE,CACX,SAAS,CAAE,iCAAkB,CAAC,KAAK,CAAC,QAAQ,CAAC,QAAQ,CACrD,eAAe,CAAE,KAAK,CACtB,QAAQ,CAAE,QAAQ,CAClB,aAAa,CAAE,GAAG,CAClB,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,IAAI,WAAW,CAAC,KAAK,CAAC,CAClC,MAAM,CAAE,GAAG,CACX,IAAI,CAAE,GAAG,CACT,MAAM,CAAE,GAAG,CACX,KAAK,CAAE,IACR,CAEA,kBAAG,OAAQ,CACV,SAAS,CAAE,kCAAmB,CAAC,KAAK,CAAC,QAAQ,CAAC,QAAQ,CACtD,eAAe,CAAE,KAAK,CACtB,SAAS,CAAE,OAAO,KAAK,CACxB,CAEA,WAAW,8BAAgB,CAC1B,IAAK,CACJ,SAAS,CAAE,MAAM,CAAC,CAAC,CAAC,OAAO,KAAK,CAAC,CACjC,OAAO,CAAE,CACV,CACA,EAAG,CACF,SAAS,CAAE,MAAM,CAAC,CAAC,CAAC,OAAO,KAAK,CAAC,CACjC,OAAO,CAAE,CACV,CACD,CAEA,WAAW,iCAAmB,CAC7B,IAAK,CACJ,SAAS,CAAE,MAAM,CAAC,CAAC,CACnB,OAAO,CAAE,CACV,CACA,EAAG,CACF,SAAS,CAAE,MAAM,CAAC,CAAC,CACnB,OAAO,CAAE,CACV,CACD,CAEA,WAAW,kCAAoB,CAC9B,IAAK,CACJ,SAAS,CAAE,MAAM,CAAC,CAAC,CAAC,OAAO,KAAK,CAAC,CACjC,OAAO,CAAE,CACV,CACA,EAAG,CACF,SAAS,CAAE,MAAM,CAAC,CAAC,CAAC,OAAO,KAAK,CAAC,CACjC,OAAO,CAAE,CACV,CACD"}`
};
const ErrorIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { primary = "#ff4b4b" } = $$props;
  let { secondary = "#fff" } = $$props;
  if ($$props.primary === void 0 && $$bindings.primary && primary !== void 0) $$bindings.primary(primary);
  if ($$props.secondary === void 0 && $$bindings.secondary && secondary !== void 0) $$bindings.secondary(secondary);
  $$result.css.add(css$9);
  return `  <div class="svelte-1ee93ns"${add_styles({
    "--primary": primary,
    "--secondary": secondary
  })}></div>`;
});
const css$8 = {
  code: "div.svelte-1j7dflg{width:12px;height:12px;box-sizing:border-box;border:2px solid;border-radius:100%;border-color:var(--secondary, #e0e0e0);border-right-color:var(--primary, #616161);animation:svelte-1j7dflg-rotate 1s linear infinite}@keyframes svelte-1j7dflg-rotate{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}",
  map: '{"version":3,"file":"LoaderIcon.svelte","sources":["LoaderIcon.svelte"],"sourcesContent":["<!-- Adapted from https://github.com/timolins/react-hot-toast -->\\n<script>export let primary = \\"#616161\\";\\nexport let secondary = \\"#e0e0e0\\";\\n<\/script>\\n\\n<div style:--primary={primary} style:--secondary={secondary} />\\n\\n<style>\\n\\tdiv {\\n\\t\\twidth: 12px;\\n\\t\\theight: 12px;\\n\\t\\tbox-sizing: border-box;\\n\\t\\tborder: 2px solid;\\n\\t\\tborder-radius: 100%;\\n\\t\\tborder-color: var(--secondary, #e0e0e0);\\n\\t\\tborder-right-color: var(--primary, #616161);\\n\\t\\tanimation: rotate 1s linear infinite;\\n\\t}\\n\\n\\t@keyframes rotate {\\n\\t\\tfrom {\\n\\t\\t\\ttransform: rotate(0deg);\\n\\t\\t}\\n\\t\\tto {\\n\\t\\t\\ttransform: rotate(360deg);\\n\\t\\t}\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAQC,kBAAI,CACH,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,UAAU,CACtB,MAAM,CAAE,GAAG,CAAC,KAAK,CACjB,aAAa,CAAE,IAAI,CACnB,YAAY,CAAE,IAAI,WAAW,CAAC,QAAQ,CAAC,CACvC,kBAAkB,CAAE,IAAI,SAAS,CAAC,QAAQ,CAAC,CAC3C,SAAS,CAAE,qBAAM,CAAC,EAAE,CAAC,MAAM,CAAC,QAC7B,CAEA,WAAW,qBAAO,CACjB,IAAK,CACJ,SAAS,CAAE,OAAO,IAAI,CACvB,CACA,EAAG,CACF,SAAS,CAAE,OAAO,MAAM,CACzB,CACD"}'
};
const LoaderIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { primary = "#616161" } = $$props;
  let { secondary = "#e0e0e0" } = $$props;
  if ($$props.primary === void 0 && $$bindings.primary && primary !== void 0) $$bindings.primary(primary);
  if ($$props.secondary === void 0 && $$bindings.secondary && secondary !== void 0) $$bindings.secondary(secondary);
  $$result.css.add(css$8);
  return `  <div class="svelte-1j7dflg"${add_styles({
    "--primary": primary,
    "--secondary": secondary
  })}></div>`;
});
const css$7 = {
  code: ".indicator.svelte-1kgeier{position:relative;display:flex;justify-content:center;align-items:center;min-width:20px;min-height:20px}.status.svelte-1kgeier{position:absolute}.animated.svelte-1kgeier{position:relative;transform:scale(0.6);opacity:0.4;min-width:20px;animation:svelte-1kgeier-enter 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards}@keyframes svelte-1kgeier-enter{from{transform:scale(0.6);opacity:0.4}to{transform:scale(1);opacity:1}}",
  map: `{"version":3,"file":"ToastIcon.svelte","sources":["ToastIcon.svelte"],"sourcesContent":["<script>import CheckmarkIcon from \\"./CheckmarkIcon.svelte\\";\\nimport ErrorIcon from \\"./ErrorIcon.svelte\\";\\nimport LoaderIcon from \\"./LoaderIcon.svelte\\";\\nexport let toast;\\n$:\\n  ({ type, icon, iconTheme } = toast);\\n<\/script>\\n\\n{#if typeof icon === 'string'}\\n\\t<div class=\\"animated\\">{icon}</div>\\n{:else if typeof icon !== 'undefined'}\\n\\t<svelte:component this={icon} />\\n{:else if type !== 'blank'}\\n\\t<div class=\\"indicator\\">\\n\\t\\t<LoaderIcon {...iconTheme} />\\n\\t\\t{#if type !== 'loading'}\\n\\t\\t\\t<div class=\\"status\\">\\n\\t\\t\\t\\t{#if type === 'error'}\\n\\t\\t\\t\\t\\t<ErrorIcon {...iconTheme} />\\n\\t\\t\\t\\t{:else}\\n\\t\\t\\t\\t\\t<CheckmarkIcon {...iconTheme} />\\n\\t\\t\\t\\t{/if}\\n\\t\\t\\t</div>\\n\\t\\t{/if}\\n\\t</div>\\n{/if}\\n\\n<style>\\n\\t.indicator {\\n\\t\\tposition: relative;\\n\\t\\tdisplay: flex;\\n\\t\\tjustify-content: center;\\n\\t\\talign-items: center;\\n\\t\\tmin-width: 20px;\\n\\t\\tmin-height: 20px;\\n\\t}\\n\\n\\t.status {\\n\\t\\tposition: absolute;\\n\\t}\\n\\n\\t.animated {\\n\\t\\tposition: relative;\\n\\t\\ttransform: scale(0.6);\\n\\t\\topacity: 0.4;\\n\\t\\tmin-width: 20px;\\n\\t\\tanimation: enter 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;\\n\\t}\\n\\n\\t@keyframes enter {\\n\\t\\tfrom {\\n\\t\\t\\ttransform: scale(0.6);\\n\\t\\t\\topacity: 0.4;\\n\\t\\t}\\n\\t\\tto {\\n\\t\\t\\ttransform: scale(1);\\n\\t\\t\\topacity: 1;\\n\\t\\t}\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AA4BC,yBAAW,CACV,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,SAAS,CAAE,IAAI,CACf,UAAU,CAAE,IACb,CAEA,sBAAQ,CACP,QAAQ,CAAE,QACX,CAEA,wBAAU,CACT,QAAQ,CAAE,QAAQ,CAClB,SAAS,CAAE,MAAM,GAAG,CAAC,CACrB,OAAO,CAAE,GAAG,CACZ,SAAS,CAAE,IAAI,CACf,SAAS,CAAE,oBAAK,CAAC,IAAI,CAAC,KAAK,CAAC,aAAa,KAAK,CAAC,CAAC,KAAK,CAAC,CAAC,IAAI,CAAC,CAAC,KAAK,CAAC,CAAC,QACrE,CAEA,WAAW,oBAAM,CAChB,IAAK,CACJ,SAAS,CAAE,MAAM,GAAG,CAAC,CACrB,OAAO,CAAE,GACV,CACA,EAAG,CACF,SAAS,CAAE,MAAM,CAAC,CAAC,CACnB,OAAO,CAAE,CACV,CACD"}`
};
const ToastIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let type;
  let icon;
  let iconTheme;
  let { toast: toast2 } = $$props;
  if ($$props.toast === void 0 && $$bindings.toast && toast2 !== void 0) $$bindings.toast(toast2);
  $$result.css.add(css$7);
  ({ type, icon, iconTheme } = toast2);
  return `${typeof icon === "string" ? `<div class="animated svelte-1kgeier">${escape(icon)}</div>` : `${typeof icon !== "undefined" ? `${validate_component(icon || missing_component, "svelte:component").$$render($$result, {}, {}, {})}` : `${type !== "blank" ? `<div class="indicator svelte-1kgeier">${validate_component(LoaderIcon, "LoaderIcon").$$render($$result, Object.assign({}, iconTheme), {}, {})} ${type !== "loading" ? `<div class="status svelte-1kgeier">${type === "error" ? `${validate_component(ErrorIcon, "ErrorIcon").$$render($$result, Object.assign({}, iconTheme), {}, {})}` : `${validate_component(CheckmarkIcon, "CheckmarkIcon").$$render($$result, Object.assign({}, iconTheme), {}, {})}`}</div>` : ``}</div>` : ``}`}`}`;
});
const css$6 = {
  code: ".message.svelte-1nauejd{display:flex;justify-content:center;margin:4px 10px;color:inherit;flex:1 1 auto;white-space:pre-line}",
  map: `{"version":3,"file":"ToastMessage.svelte","sources":["ToastMessage.svelte"],"sourcesContent":["<script>export let toast;\\n<\/script>\\n\\n<div class=\\"message\\" {...toast.ariaProps}>\\n\\t{#if typeof toast.message === 'string'}\\n\\t\\t{toast.message}\\n\\t{:else}\\n\\t\\t<svelte:component this={toast.message} {toast} />\\n\\t{/if}\\n</div>\\n\\n<style>\\n\\t.message {\\n\\t\\tdisplay: flex;\\n\\t\\tjustify-content: center;\\n\\t\\tmargin: 4px 10px;\\n\\t\\tcolor: inherit;\\n\\t\\tflex: 1 1 auto;\\n\\t\\twhite-space: pre-line;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAYC,uBAAS,CACR,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,MAAM,CAAE,GAAG,CAAC,IAAI,CAChB,KAAK,CAAE,OAAO,CACd,IAAI,CAAE,CAAC,CAAC,CAAC,CAAC,IAAI,CACd,WAAW,CAAE,QACd"}`
};
const ToastMessage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { toast: toast2 } = $$props;
  if ($$props.toast === void 0 && $$bindings.toast && toast2 !== void 0) $$bindings.toast(toast2);
  $$result.css.add(css$6);
  return `<div${spread([{ class: "message" }, escape_object(toast2.ariaProps)], { classes: "svelte-1nauejd" })}>${typeof toast2.message === "string" ? `${escape(toast2.message)}` : `${validate_component(toast2.message || missing_component, "svelte:component").$$render($$result, { toast: toast2 }, {}, {})}`} </div>`;
});
const css$5 = {
  code: "@keyframes svelte-ug60r4-enterAnimation{0%{transform:translate3d(0, calc(var(--factor) * -200%), 0) scale(0.6);opacity:0.5}100%{transform:translate3d(0, 0, 0) scale(1);opacity:1}}@keyframes svelte-ug60r4-exitAnimation{0%{transform:translate3d(0, 0, -1px) scale(1);opacity:1}100%{transform:translate3d(0, calc(var(--factor) * -150%), -1px) scale(0.6);opacity:0}}@keyframes svelte-ug60r4-fadeInAnimation{0%{opacity:0}100%{opacity:1}}@keyframes svelte-ug60r4-fadeOutAnimation{0%{opacity:1}100%{opacity:0}}.base.svelte-ug60r4{display:flex;align-items:center;background:#fff;color:#363636;line-height:1.3;will-change:transform;box-shadow:0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);max-width:350px;pointer-events:auto;padding:8px 10px;border-radius:8px}.transparent.svelte-ug60r4{opacity:0}.enter.svelte-ug60r4{animation:svelte-ug60r4-enterAnimation 0.35s cubic-bezier(0.21, 1.02, 0.73, 1) forwards}.exit.svelte-ug60r4{animation:svelte-ug60r4-exitAnimation 0.4s cubic-bezier(0.06, 0.71, 0.55, 1) forwards}.fadeIn.svelte-ug60r4{animation:svelte-ug60r4-fadeInAnimation 0.35s cubic-bezier(0.21, 1.02, 0.73, 1) forwards}.fadeOut.svelte-ug60r4{animation:svelte-ug60r4-fadeOutAnimation 0.4s cubic-bezier(0.06, 0.71, 0.55, 1) forwards}",
  map: `{"version":3,"file":"ToastBar.svelte","sources":["ToastBar.svelte"],"sourcesContent":["<script>import ToastIcon from \\"./ToastIcon.svelte\\";\\nimport { prefersReducedMotion } from \\"../core/utils\\";\\nimport ToastMessage from \\"./ToastMessage.svelte\\";\\nexport let toast;\\nexport let position = void 0;\\nexport let style = \\"\\";\\nexport let Component = void 0;\\nlet factor;\\nlet animation;\\n$: {\\n  const top = (toast.position || position || \\"top-center\\").includes(\\"top\\");\\n  factor = top ? 1 : -1;\\n  const [enter, exit] = prefersReducedMotion() ? [\\"fadeIn\\", \\"fadeOut\\"] : [\\"enter\\", \\"exit\\"];\\n  animation = toast.visible ? enter : exit;\\n}\\n<\/script>\\n\\n<div\\n\\tclass=\\"base {toast.height ? animation : 'transparent'} {toast.className || ''}\\"\\n\\tstyle=\\"{style}; {toast.style}\\"\\n\\tstyle:--factor={factor}\\n>\\n\\t{#if Component}\\n\\t\\t<svelte:component this={Component}>\\n\\t\\t\\t<ToastIcon {toast} slot=\\"icon\\" />\\n\\t\\t\\t<ToastMessage {toast} slot=\\"message\\" />\\n\\t\\t</svelte:component>\\n\\t{:else}\\n\\t\\t<slot {ToastIcon} {ToastMessage} {toast}>\\n\\t\\t\\t<ToastIcon {toast} />\\n\\t\\t\\t<ToastMessage {toast} />\\n\\t\\t</slot>\\n\\t{/if}\\n</div>\\n\\n<style>\\n\\t@keyframes enterAnimation {\\n\\t\\t0% {\\n\\t\\t\\ttransform: translate3d(0, calc(var(--factor) * -200%), 0) scale(0.6);\\n\\t\\t\\topacity: 0.5;\\n\\t\\t}\\n\\t\\t100% {\\n\\t\\t\\ttransform: translate3d(0, 0, 0) scale(1);\\n\\t\\t\\topacity: 1;\\n\\t\\t}\\n\\t}\\n\\n\\t@keyframes exitAnimation {\\n\\t\\t0% {\\n\\t\\t\\ttransform: translate3d(0, 0, -1px) scale(1);\\n\\t\\t\\topacity: 1;\\n\\t\\t}\\n\\t\\t100% {\\n\\t\\t\\ttransform: translate3d(0, calc(var(--factor) * -150%), -1px) scale(0.6);\\n\\t\\t\\topacity: 0;\\n\\t\\t}\\n\\t}\\n\\n\\t@keyframes fadeInAnimation {\\n\\t\\t0% {\\n\\t\\t\\topacity: 0;\\n\\t\\t}\\n\\t\\t100% {\\n\\t\\t\\topacity: 1;\\n\\t\\t}\\n\\t}\\n\\n\\t@keyframes fadeOutAnimation {\\n\\t\\t0% {\\n\\t\\t\\topacity: 1;\\n\\t\\t}\\n\\t\\t100% {\\n\\t\\t\\topacity: 0;\\n\\t\\t}\\n\\t}\\n\\n\\t.base {\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tbackground: #fff;\\n\\t\\tcolor: #363636;\\n\\t\\tline-height: 1.3;\\n\\t\\twill-change: transform;\\n\\t\\tbox-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);\\n\\t\\tmax-width: 350px;\\n\\t\\tpointer-events: auto;\\n\\t\\tpadding: 8px 10px;\\n\\t\\tborder-radius: 8px;\\n\\t}\\n\\n\\t.transparent {\\n\\t\\topacity: 0;\\n\\t}\\n\\n\\t.enter {\\n\\t\\tanimation: enterAnimation 0.35s cubic-bezier(0.21, 1.02, 0.73, 1) forwards;\\n\\t}\\n\\n\\t.exit {\\n\\t\\tanimation: exitAnimation 0.4s cubic-bezier(0.06, 0.71, 0.55, 1) forwards;\\n\\t}\\n\\n\\t.fadeIn {\\n\\t\\tanimation: fadeInAnimation 0.35s cubic-bezier(0.21, 1.02, 0.73, 1) forwards;\\n\\t}\\n\\n\\t.fadeOut {\\n\\t\\tanimation: fadeOutAnimation 0.4s cubic-bezier(0.06, 0.71, 0.55, 1) forwards;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAoCC,WAAW,4BAAe,CACzB,EAAG,CACF,SAAS,CAAE,YAAY,CAAC,CAAC,CAAC,KAAK,IAAI,QAAQ,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,MAAM,GAAG,CAAC,CACpE,OAAO,CAAE,GACV,CACA,IAAK,CACJ,SAAS,CAAE,YAAY,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,MAAM,CAAC,CAAC,CACxC,OAAO,CAAE,CACV,CACD,CAEA,WAAW,2BAAc,CACxB,EAAG,CACF,SAAS,CAAE,YAAY,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,MAAM,CAAC,CAAC,CAC3C,OAAO,CAAE,CACV,CACA,IAAK,CACJ,SAAS,CAAE,YAAY,CAAC,CAAC,CAAC,KAAK,IAAI,QAAQ,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,MAAM,GAAG,CAAC,CACvE,OAAO,CAAE,CACV,CACD,CAEA,WAAW,6BAAgB,CAC1B,EAAG,CACF,OAAO,CAAE,CACV,CACA,IAAK,CACJ,OAAO,CAAE,CACV,CACD,CAEA,WAAW,8BAAiB,CAC3B,EAAG,CACF,OAAO,CAAE,CACV,CACA,IAAK,CACJ,OAAO,CAAE,CACV,CACD,CAEA,mBAAM,CACL,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,UAAU,CAAE,IAAI,CAChB,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,GAAG,CAChB,WAAW,CAAE,SAAS,CACtB,UAAU,CAAE,CAAC,CAAC,GAAG,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CACxE,SAAS,CAAE,KAAK,CAChB,cAAc,CAAE,IAAI,CACpB,OAAO,CAAE,GAAG,CAAC,IAAI,CACjB,aAAa,CAAE,GAChB,CAEA,0BAAa,CACZ,OAAO,CAAE,CACV,CAEA,oBAAO,CACN,SAAS,CAAE,4BAAc,CAAC,KAAK,CAAC,aAAa,IAAI,CAAC,CAAC,IAAI,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,QACnE,CAEA,mBAAM,CACL,SAAS,CAAE,2BAAa,CAAC,IAAI,CAAC,aAAa,IAAI,CAAC,CAAC,IAAI,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,QACjE,CAEA,qBAAQ,CACP,SAAS,CAAE,6BAAe,CAAC,KAAK,CAAC,aAAa,IAAI,CAAC,CAAC,IAAI,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,QACpE,CAEA,sBAAS,CACR,SAAS,CAAE,8BAAgB,CAAC,IAAI,CAAC,aAAa,IAAI,CAAC,CAAC,IAAI,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,QACpE"}`
};
const ToastBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { toast: toast2 } = $$props;
  let { position = void 0 } = $$props;
  let { style = "" } = $$props;
  let { Component = void 0 } = $$props;
  let factor;
  let animation;
  if ($$props.toast === void 0 && $$bindings.toast && toast2 !== void 0) $$bindings.toast(toast2);
  if ($$props.position === void 0 && $$bindings.position && position !== void 0) $$bindings.position(position);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0) $$bindings.style(style);
  if ($$props.Component === void 0 && $$bindings.Component && Component !== void 0) $$bindings.Component(Component);
  $$result.css.add(css$5);
  {
    {
      const top = (toast2.position || position || "top-center").includes("top");
      factor = top ? 1 : -1;
      const [enter, exit] = prefersReducedMotion() ? ["fadeIn", "fadeOut"] : ["enter", "exit"];
      animation = toast2.visible ? enter : exit;
    }
  }
  return `<div class="${"base " + escape(toast2.height ? animation : "transparent", true) + " " + escape(toast2.className || "", true) + " svelte-ug60r4"}"${add_styles(merge_ssr_styles(escape(style, true) + "; " + escape(toast2.style, true), { "--factor": factor }))}>${Component ? `${validate_component(Component || missing_component, "svelte:component").$$render($$result, {}, {}, {
    message: () => {
      return `${validate_component(ToastMessage, "ToastMessage").$$render($$result, { toast: toast2, slot: "message" }, {}, {})}`;
    },
    icon: () => {
      return `${validate_component(ToastIcon, "ToastIcon").$$render($$result, { toast: toast2, slot: "icon" }, {}, {})}`;
    }
  })}` : `${slots.default ? slots.default({ ToastIcon, ToastMessage, toast: toast2 }) : ` ${validate_component(ToastIcon, "ToastIcon").$$render($$result, { toast: toast2 }, {}, {})} ${validate_component(ToastMessage, "ToastMessage").$$render($$result, { toast: toast2 }, {}, {})} `}`} </div>`;
});
const css$4 = {
  code: ".wrapper.svelte-v01oml{left:0;right:0;display:flex;position:absolute;transform:translateY(calc(var(--offset, 16px) * var(--factor) * 1px))}.transition.svelte-v01oml{transition:all 230ms cubic-bezier(0.21, 1.02, 0.73, 1)}.active.svelte-v01oml{z-index:9999}.active.svelte-v01oml>*{pointer-events:auto}",
  map: `{"version":3,"file":"ToastWrapper.svelte","sources":["ToastWrapper.svelte"],"sourcesContent":["<script>import { onMount } from \\"svelte\\";\\nimport { prefersReducedMotion } from \\"../core/utils\\";\\nimport ToastBar from \\"./ToastBar.svelte\\";\\nimport ToastMessage from \\"./ToastMessage.svelte\\";\\nexport let toast;\\nexport let setHeight;\\nlet wrapperEl;\\nonMount(() => {\\n  setHeight(wrapperEl.getBoundingClientRect().height);\\n});\\n$:\\n  top = toast.position?.includes(\\"top\\") ? 0 : null;\\n$:\\n  bottom = toast.position?.includes(\\"bottom\\") ? 0 : null;\\n$:\\n  factor = toast.position?.includes(\\"top\\") ? 1 : -1;\\n$:\\n  justifyContent = toast.position?.includes(\\"center\\") && \\"center\\" || (toast.position?.includes(\\"right\\") || toast.position?.includes(\\"end\\")) && \\"flex-end\\" || null;\\n<\/script>\\n\\n<div\\n\\tbind:this={wrapperEl}\\n\\tclass=\\"wrapper\\"\\n\\tclass:active={toast.visible}\\n\\tclass:transition={!prefersReducedMotion()}\\n\\tstyle:--factor={factor}\\n\\tstyle:--offset={toast.offset}\\n\\tstyle:top\\n\\tstyle:bottom\\n\\tstyle:justify-content={justifyContent}\\n>\\n\\t{#if toast.type === 'custom'}\\n\\t\\t<ToastMessage {toast} />\\n\\t{:else}\\n\\t\\t<slot {toast}>\\n\\t\\t\\t<ToastBar {toast} position={toast.position} />\\n\\t\\t</slot>\\n\\t{/if}\\n</div>\\n\\n<style>\\n\\t.wrapper {\\n\\t\\tleft: 0;\\n\\t\\tright: 0;\\n\\t\\tdisplay: flex;\\n\\t\\tposition: absolute;\\n\\t\\ttransform: translateY(calc(var(--offset, 16px) * var(--factor) * 1px));\\n\\t}\\n\\n\\t.transition {\\n\\t\\ttransition: all 230ms cubic-bezier(0.21, 1.02, 0.73, 1);\\n\\t}\\n\\n\\t.active {\\n\\t\\tz-index: 9999;\\n\\t}\\n\\n\\t.active > :global(*) {\\n\\t\\tpointer-events: auto;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAyCC,sBAAS,CACR,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,CAAC,CACR,OAAO,CAAE,IAAI,CACb,QAAQ,CAAE,QAAQ,CAClB,SAAS,CAAE,WAAW,KAAK,IAAI,QAAQ,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,IAAI,QAAQ,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CACtE,CAEA,yBAAY,CACX,UAAU,CAAE,GAAG,CAAC,KAAK,CAAC,aAAa,IAAI,CAAC,CAAC,IAAI,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,CACvD,CAEA,qBAAQ,CACP,OAAO,CAAE,IACV,CAEA,qBAAO,CAAW,CAAG,CACpB,cAAc,CAAE,IACjB"}`
};
const ToastWrapper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let top;
  let bottom;
  let factor;
  let justifyContent;
  let { toast: toast2 } = $$props;
  let { setHeight } = $$props;
  let wrapperEl;
  if ($$props.toast === void 0 && $$bindings.toast && toast2 !== void 0) $$bindings.toast(toast2);
  if ($$props.setHeight === void 0 && $$bindings.setHeight && setHeight !== void 0) $$bindings.setHeight(setHeight);
  $$result.css.add(css$4);
  top = toast2.position?.includes("top") ? 0 : null;
  bottom = toast2.position?.includes("bottom") ? 0 : null;
  factor = toast2.position?.includes("top") ? 1 : -1;
  justifyContent = toast2.position?.includes("center") && "center" || (toast2.position?.includes("right") || toast2.position?.includes("end")) && "flex-end" || null;
  return `<div class="${[
    "wrapper svelte-v01oml",
    (toast2.visible ? "active" : "") + " " + (!prefersReducedMotion() ? "transition" : "")
  ].join(" ").trim()}"${add_styles({
    "--factor": factor,
    "--offset": toast2.offset,
    top,
    bottom,
    "justify-content": justifyContent
  })}${add_attribute("this", wrapperEl, 0)}>${toast2.type === "custom" ? `${validate_component(ToastMessage, "ToastMessage").$$render($$result, { toast: toast2 }, {}, {})}` : `${slots.default ? slots.default({ toast: toast2 }) : ` ${validate_component(ToastBar, "ToastBar").$$render($$result, { toast: toast2, position: toast2.position }, {}, {})} `}`} </div>`;
});
const css$3 = {
  code: ".toaster.svelte-1phplh9{--default-offset:16px;position:fixed;z-index:9999;top:var(--default-offset);left:var(--default-offset);right:var(--default-offset);bottom:var(--default-offset);pointer-events:none}",
  map: `{"version":3,"file":"Toaster.svelte","sources":["Toaster.svelte"],"sourcesContent":["<script>import useToaster from \\"../core/use-toaster\\";\\nimport ToastWrapper from \\"./ToastWrapper.svelte\\";\\nexport let reverseOrder = false;\\nexport let position = \\"top-center\\";\\nexport let toastOptions = void 0;\\nexport let gutter = 8;\\nexport let containerStyle = void 0;\\nexport let containerClassName = void 0;\\nconst { toasts, handlers } = useToaster(toastOptions);\\nlet _toasts;\\n$:\\n  _toasts = $toasts.map((toast) => ({\\n    ...toast,\\n    position: toast.position || position,\\n    offset: handlers.calculateOffset(toast, $toasts, {\\n      reverseOrder,\\n      gutter,\\n      defaultPosition: position\\n    })\\n  }));\\n<\/script>\\n\\n<div\\n\\tclass=\\"toaster {containerClassName || ''}\\"\\n\\tstyle={containerStyle}\\n\\ton:mouseenter={handlers.startPause}\\n\\ton:mouseleave={handlers.endPause}\\n\\trole=\\"alert\\"\\n>\\n\\t{#each _toasts as toast (toast.id)}\\n\\t\\t<ToastWrapper {toast} setHeight={(height) => handlers.updateHeight(toast.id, height)} />\\n\\t{/each}\\n</div>\\n\\n<style>\\n\\t.toaster {\\n\\t\\t--default-offset: 16px;\\n\\n\\t\\tposition: fixed;\\n\\t\\tz-index: 9999;\\n\\t\\ttop: var(--default-offset);\\n\\t\\tleft: var(--default-offset);\\n\\t\\tright: var(--default-offset);\\n\\t\\tbottom: var(--default-offset);\\n\\t\\tpointer-events: none;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAmCC,uBAAS,CACR,gBAAgB,CAAE,IAAI,CAEtB,QAAQ,CAAE,KAAK,CACf,OAAO,CAAE,IAAI,CACb,GAAG,CAAE,IAAI,gBAAgB,CAAC,CAC1B,IAAI,CAAE,IAAI,gBAAgB,CAAC,CAC3B,KAAK,CAAE,IAAI,gBAAgB,CAAC,CAC5B,MAAM,CAAE,IAAI,gBAAgB,CAAC,CAC7B,cAAc,CAAE,IACjB"}`
};
const Toaster = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $toasts, $$unsubscribe_toasts;
  let { reverseOrder = false } = $$props;
  let { position = "top-center" } = $$props;
  let { toastOptions = void 0 } = $$props;
  let { gutter = 8 } = $$props;
  let { containerStyle = void 0 } = $$props;
  let { containerClassName = void 0 } = $$props;
  const { toasts: toasts2, handlers: handlers2 } = useToaster(toastOptions);
  $$unsubscribe_toasts = subscribe(toasts2, (value) => $toasts = value);
  let _toasts;
  if ($$props.reverseOrder === void 0 && $$bindings.reverseOrder && reverseOrder !== void 0) $$bindings.reverseOrder(reverseOrder);
  if ($$props.position === void 0 && $$bindings.position && position !== void 0) $$bindings.position(position);
  if ($$props.toastOptions === void 0 && $$bindings.toastOptions && toastOptions !== void 0) $$bindings.toastOptions(toastOptions);
  if ($$props.gutter === void 0 && $$bindings.gutter && gutter !== void 0) $$bindings.gutter(gutter);
  if ($$props.containerStyle === void 0 && $$bindings.containerStyle && containerStyle !== void 0) $$bindings.containerStyle(containerStyle);
  if ($$props.containerClassName === void 0 && $$bindings.containerClassName && containerClassName !== void 0) $$bindings.containerClassName(containerClassName);
  $$result.css.add(css$3);
  _toasts = $toasts.map((toast2) => ({
    ...toast2,
    position: toast2.position || position,
    offset: handlers2.calculateOffset(toast2, $toasts, {
      reverseOrder,
      gutter,
      defaultPosition: position
    })
  }));
  $$unsubscribe_toasts();
  return `<div class="${"toaster " + escape(containerClassName || "", true) + " svelte-1phplh9"}"${add_attribute("style", containerStyle, 0)} role="alert">${each(_toasts, (toast2) => {
    return `${validate_component(ToastWrapper, "ToastWrapper").$$render(
      $$result,
      {
        toast: toast2,
        setHeight: (height) => handlers2.updateHeight(toast2.id, height)
      },
      {},
      {}
    )}`;
  })} </div>`;
});
const Bar_chart_2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "line",
      {
        "x1": "18",
        "x2": "18",
        "y1": "20",
        "y2": "10"
      }
    ],
    [
      "line",
      {
        "x1": "12",
        "x2": "12",
        "y1": "20",
        "y2": "4"
      }
    ],
    [
      "line",
      {
        "x1": "6",
        "x2": "6",
        "y1": "20",
        "y2": "14"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "bar-chart-2" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Bell = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"
      }
    ],
    ["path", { "d": "M10.3 21a1.94 1.94 0 0 0 3.4 0" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "bell" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Bookmark = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "bookmark" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Facebook = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "facebook" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Globe = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["circle", { "cx": "12", "cy": "12", "r": "10" }],
    [
      "path",
      {
        "d": "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"
      }
    ],
    ["path", { "d": "M2 12h20" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "globe" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Instagram = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "rect",
      {
        "width": "20",
        "height": "20",
        "x": "2",
        "y": "2",
        "rx": "5",
        "ry": "5"
      }
    ],
    [
      "path",
      {
        "d": "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
      }
    ],
    [
      "line",
      {
        "x1": "17.5",
        "x2": "17.51",
        "y1": "6.5",
        "y2": "6.5"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "instagram" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Linkedin = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
      }
    ],
    [
      "rect",
      {
        "width": "4",
        "height": "12",
        "x": "2",
        "y": "9"
      }
    ],
    ["circle", { "cx": "4", "cy": "4", "r": "2" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "linkedin" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Mail = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "rect",
      {
        "width": "20",
        "height": "16",
        "x": "2",
        "y": "4",
        "rx": "2"
      }
    ],
    [
      "path",
      {
        "d": "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "mail" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Menu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "line",
      {
        "x1": "4",
        "x2": "20",
        "y1": "12",
        "y2": "12"
      }
    ],
    [
      "line",
      {
        "x1": "4",
        "x2": "20",
        "y1": "6",
        "y2": "6"
      }
    ],
    [
      "line",
      {
        "x1": "4",
        "x2": "20",
        "y1": "18",
        "y2": "18"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "menu" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Moon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "moon" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Newspaper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"
      }
    ],
    ["path", { "d": "M18 14h-8" }],
    ["path", { "d": "M15 18h-5" }],
    ["path", { "d": "M10 6h8v4h-8V6Z" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "newspaper" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Search = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["circle", { "cx": "11", "cy": "11", "r": "8" }],
    ["path", { "d": "m21 21-4.3-4.3" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "search" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Sun = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["circle", { "cx": "12", "cy": "12", "r": "4" }],
    ["path", { "d": "M12 2v2" }],
    ["path", { "d": "M12 20v2" }],
    ["path", { "d": "m4.93 4.93 1.41 1.41" }],
    ["path", { "d": "m17.66 17.66 1.41 1.41" }],
    ["path", { "d": "M2 12h2" }],
    ["path", { "d": "M20 12h2" }],
    ["path", { "d": "m6.34 17.66-1.41 1.41" }],
    ["path", { "d": "m19.07 4.93-1.41 1.41" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "sun" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Trending_up = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["polyline", { "points": "22 7 13.5 15.5 8.5 10.5 2 17" }],
    ["polyline", { "points": "16 7 22 7 22 13" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "trending-up" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Twitter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "twitter" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const User = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
      }
    ],
    ["circle", { "cx": "12", "cy": "7", "r": "4" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "user" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const theme = writable("light");
const css$2 = {
  code: ".nav-link.svelte-rrvili{display:flex;align-items:center;gap:0.5rem;--tw-text-opacity:1;color:rgb(75 85 99 / var(--tw-text-opacity));transition-property:color, background-color, border-color, text-decoration-color, fill, stroke;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms\n}.nav-link.svelte-rrvili:hover{--tw-text-opacity:1;color:rgb(37 99 235 / var(--tw-text-opacity))\n}.nav-link.svelte-rrvili:is(.dark *){--tw-text-opacity:1;color:rgb(209 213 219 / var(--tw-text-opacity))\n}.nav-link.svelte-rrvili:hover:is(.dark *){--tw-text-opacity:1;color:rgb(96 165 250 / var(--tw-text-opacity))\n}",
  map: `{"version":3,"file":"Navbar.svelte","sources":["Navbar.svelte"],"sourcesContent":["<script lang=\\"ts\\">import {\\n  Globe,\\n  Sun,\\n  Moon,\\n  Search,\\n  Bell,\\n  User,\\n  TrendingUp,\\n  Newspaper,\\n  BarChart2,\\n  Bookmark,\\n  Menu,\\n  X\\n} from \\"lucide-svelte\\";\\nimport { theme } from \\"$lib/stores/theme\\";\\nimport { page } from \\"$app/stores\\";\\nimport { fade, slide } from \\"svelte/transition\\";\\nlet showConflictMap = $page.url.pathname === \\"/conflicts\\";\\nlet showMobileMenu = false;\\nlet searchQuery = \\"\\";\\nfunction toggleTheme() {\\n  theme.update((t) => t === \\"light\\" ? \\"dark\\" : \\"light\\");\\n}\\nfunction handleSearch(e) {\\n  if (e.key === \\"Enter\\") {\\n    console.log(\\"Searching for:\\", searchQuery);\\n  }\\n}\\n$: isActive = (path) => $page.url.pathname === path;\\n<\/script>\\n\\n<nav class=\\"bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50\\">\\n  <div class=\\"container mx-auto px-4\\">\\n    <div class=\\"flex items-center justify-between h-16\\">\\n      <!-- Logo and Main Nav -->\\n      <div class=\\"flex items-center gap-8\\">\\n        <a \\n          href=\\"/\\" \\n          class=\\"flex items-center gap-2 hover:opacity-80 transition-opacity\\"\\n          aria-label=\\"DiplomMap Home\\"\\n        >\\n          <Newspaper class=\\"w-8 h-8 text-blue-600 dark:text-blue-400\\" />\\n          <span class=\\"text-xl font-bold\\">DiplomMap</span>\\n        </a>\\n        \\n        <div class=\\"hidden lg:flex items-center gap-6\\">\\n          <a \\n            href=\\"/trending\\" \\n            class=\\"nav-link {isActive('/trending') ? 'text-blue-600 dark:text-blue-400' : ''}\\"\\n          >\\n            <TrendingUp class=\\"w-4 h-4\\" />\\n            <span>Top Stories</span>\\n          </a>\\n          <a \\n            href=\\"/markets\\" \\n            class=\\"nav-link {isActive('/markets') ? 'text-blue-600 dark:text-blue-400' : ''}\\"\\n          >\\n            <BarChart2 class=\\"w-4 h-4\\" />\\n            <span>Markets</span>\\n          </a>\\n          <a \\n            href=\\"/saved\\" \\n            class=\\"nav-link {isActive('/saved') ? 'text-blue-600 dark:text-blue-400' : ''}\\"\\n          >\\n            <Bookmark class=\\"w-4 h-4\\" />\\n            <span>Saved</span>\\n          </a>\\n          <a\\n            href=\\"/conflicts\\"\\n            class=\\"flex items-center gap-2 px-3 py-1.5 rounded-full \\n                   {isActive('/conflicts') \\n                     ? 'bg-blue-600 text-white' \\n                     : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-800'} \\n                   transition-colors\\"\\n          >\\n            <Globe class=\\"w-4 h-4\\" />\\n            {showConflictMap ? 'Back to News' : 'Global Conflicts'}\\n          </a>\\n        </div>\\n      </div>\\n\\n      <!-- Search Bar -->\\n      <div class=\\"hidden lg:flex flex-1 max-w-xl mx-8\\">\\n        <div class=\\"relative w-full\\">\\n          <input\\n            type=\\"text\\"\\n            bind:value={searchQuery}\\n            on:keydown={handleSearch}\\n            placeholder=\\"Search news, markets, conflicts...\\"\\n            class=\\"w-full px-4 py-2 pl-10 pr-4 rounded-lg border dark:border-gray-700 \\n                   bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 \\n                   focus:ring-blue-500 transition-colors\\"\\n          />\\n          <Search class=\\"absolute left-3 top-2.5 w-5 h-5 text-gray-400\\" />\\n        </div>\\n      </div>\\n\\n      <!-- Right Side Nav -->\\n      <div class=\\"flex items-center gap-4\\">\\n        <button \\n          class=\\"p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full relative\\"\\n          aria-label=\\"Notifications\\"\\n        >\\n          <Bell class=\\"w-5 h-5\\" />\\n          <span class=\\"absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full\\"></span>\\n        </button>\\n        \\n        <button\\n          on:click={toggleTheme}\\n          class=\\"p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full\\"\\n          aria-label=\\"Toggle theme\\"\\n        >\\n          {#if $theme === 'light'}\\n            <Moon class=\\"w-5 h-5\\" />\\n          {:else}\\n            <Sun class=\\"w-5 h-5\\" />\\n          {/if}\\n        </button>\\n\\n        <button \\n          class=\\"hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full \\n                 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 \\n                 dark:hover:bg-gray-600 transition-colors\\"\\n          aria-label=\\"Account\\"\\n        >\\n          <User class=\\"w-5 h-5\\" />\\n          <span>Account</span>\\n        </button>\\n\\n        <!-- Mobile Menu Toggle -->\\n        <button\\n          class=\\"lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full\\"\\n          on:click={() => showMobileMenu = !showMobileMenu}\\n          aria-label={showMobileMenu ? 'Close menu' : 'Open menu'}\\n        >\\n          {#if showMobileMenu}\\n            <X class=\\"w-6 h-6\\" />\\n          {:else}\\n            <Menu class=\\"w-6 h-6\\" />\\n          {/if}\\n        </button>\\n      </div>\\n    </div>\\n  </div>\\n\\n  <!-- Mobile Menu -->\\n  {#if showMobileMenu}\\n    <div\\n      class=\\"lg:hidden\\"\\n      transition:slide={{ duration: 200 }}\\n    >\\n      <div class=\\"px-4 py-3 space-y-1\\">\\n        <div class=\\"mb-4\\">\\n          <div class=\\"relative\\">\\n            <input\\n              type=\\"text\\"\\n              bind:value={searchQuery}\\n              on:keydown={handleSearch}\\n              placeholder=\\"Search...\\"\\n              class=\\"w-full px-4 py-2 pl-10 pr-4 rounded-lg border \\n                     dark:border-gray-700 bg-gray-50 dark:bg-gray-900 \\n                     focus:outline-none focus:ring-2 focus:ring-blue-500\\"\\n            />\\n            <Search class=\\"absolute left-3 top-2.5 w-5 h-5 text-gray-400\\" />\\n          </div>\\n        </div>\\n\\n        <a \\n          href=\\"/trending\\"\\n          class=\\"flex items-center gap-2 px-3 py-2 rounded-lg \\n                 {isActive('/trending') \\n                   ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100' \\n                   : 'hover:bg-gray-100 dark:hover:bg-gray-700'}\\"\\n        >\\n          <TrendingUp class=\\"w-5 h-5\\" />\\n          <span>Top Stories</span>\\n        </a>\\n\\n        <a \\n          href=\\"/markets\\"\\n          class=\\"flex items-center gap-2 px-3 py-2 rounded-lg \\n                 {isActive('/markets') \\n                   ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100' \\n                   : 'hover:bg-gray-100 dark:hover:bg-gray-700'}\\"\\n        >\\n          <BarChart2 class=\\"w-5 h-5\\" />\\n          <span>Markets</span>\\n        </a>\\n\\n        <a \\n          href=\\"/saved\\"\\n          class=\\"flex items-center gap-2 px-3 py-2 rounded-lg \\n                 {isActive('/saved') \\n                   ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100' \\n                   : 'hover:bg-gray-100 dark:hover:bg-gray-700'}\\"\\n        >\\n          <Bookmark class=\\"w-5 h-5\\" />\\n          <span>Saved</span>\\n        </a>\\n\\n        <a \\n          href=\\"/conflicts\\"\\n          class=\\"flex items-center gap-2 px-3 py-2 rounded-lg \\n                 {isActive('/conflicts') \\n                   ? 'bg-blue-600 text-white' \\n                   : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100'}\\"\\n        >\\n          <Globe class=\\"w-5 h-5\\" />\\n          <span>{showConflictMap ? 'Back to News' : 'Global Conflicts'}</span>\\n        </a>\\n\\n        <button \\n          class=\\"flex items-center gap-2 px-3 py-2 rounded-lg w-full \\n                 hover:bg-gray-100 dark:hover:bg-gray-700\\"\\n        >\\n          <User class=\\"w-5 h-5\\" />\\n          <span>Account</span>\\n        </button>\\n      </div>\\n    </div>\\n  {/if}\\n</nav>\\n\\n<style lang=\\"postcss\\">\\n  .nav-link {\\n    display: flex;\\n    align-items: center;\\n    gap: 0.5rem;\\n    --tw-text-opacity: 1;\\n    color: rgb(75 85 99 / var(--tw-text-opacity));\\n    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;\\n    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\\n    transition-duration: 150ms\\n}\\n.nav-link:hover {\\n    --tw-text-opacity: 1;\\n    color: rgb(37 99 235 / var(--tw-text-opacity))\\n}\\n.nav-link:is(.dark *) {\\n    --tw-text-opacity: 1;\\n    color: rgb(209 213 219 / var(--tw-text-opacity))\\n}\\n.nav-link:hover:is(.dark *) {\\n    --tw-text-opacity: 1;\\n    color: rgb(96 165 250 / var(--tw-text-opacity))\\n}\\n</style>"],"names":[],"mappings":"AAgOE,uBAAU,CACR,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,MAAM,CACX,iBAAiB,CAAE,CAAC,CACpB,KAAK,CAAE,IAAI,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC,IAAI,iBAAiB,CAAC,CAAC,CAC7C,mBAAmB,CAAE,KAAK,CAAC,CAAC,gBAAgB,CAAC,CAAC,YAAY,CAAC,CAAC,qBAAqB,CAAC,CAAC,IAAI,CAAC,CAAC,MAAM,CAC/F,0BAA0B,CAAE,aAAa,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CACxD,mBAAmB,CAAE;AACzB,CACA,uBAAS,MAAO,CACZ,iBAAiB,CAAE,CAAC,CACpB,KAAK,CAAE,IAAI,EAAE,CAAC,EAAE,CAAC,GAAG,CAAC,CAAC,CAAC,IAAI,iBAAiB,CAAC;AACjD,CACA,uBAAS,IAAI,KAAK,CAAC,CAAC,CAAE,CAClB,iBAAiB,CAAE,CAAC,CACpB,KAAK,CAAE,IAAI,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,CAAC,CAAC,IAAI,iBAAiB,CAAC;AACnD,CACA,uBAAS,MAAM,IAAI,KAAK,CAAC,CAAC,CAAE,CACxB,iBAAiB,CAAE,CAAC,CACpB,KAAK,CAAE,IAAI,EAAE,CAAC,GAAG,CAAC,GAAG,CAAC,CAAC,CAAC,IAAI,iBAAiB,CAAC;AAClD"}`
};
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isActive;
  let $page, $$unsubscribe_page;
  let $theme, $$unsubscribe_theme;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  let showConflictMap = $page.url.pathname === "/conflicts";
  let searchQuery = "";
  $$result.css.add(css$2);
  isActive = (path) => $page.url.pathname === path;
  $$unsubscribe_page();
  $$unsubscribe_theme();
  return `<nav class="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50"><div class="container mx-auto px-4"><div class="flex items-center justify-between h-16"> <div class="flex items-center gap-8"><a href="/" class="flex items-center gap-2 hover:opacity-80 transition-opacity" aria-label="DiplomMap Home">${validate_component(Newspaper, "Newspaper").$$render(
    $$result,
    {
      class: "w-8 h-8 text-blue-600 dark:text-blue-400"
    },
    {},
    {}
  )} <span class="text-xl font-bold" data-svelte-h="svelte-6z0aod">DiplomMap</span></a> <div class="hidden lg:flex items-center gap-6"><a href="/trending" class="${"nav-link " + escape(
    isActive("/trending") ? "text-blue-600 dark:text-blue-400" : "",
    true
  ) + " svelte-rrvili"}">${validate_component(Trending_up, "TrendingUp").$$render($$result, { class: "w-4 h-4" }, {}, {})} <span data-svelte-h="svelte-1nh06tc">Top Stories</span></a> <a href="/markets" class="${"nav-link " + escape(
    isActive("/markets") ? "text-blue-600 dark:text-blue-400" : "",
    true
  ) + " svelte-rrvili"}">${validate_component(Bar_chart_2, "BarChart2").$$render($$result, { class: "w-4 h-4" }, {}, {})} <span data-svelte-h="svelte-i5z6ph">Markets</span></a> <a href="/saved" class="${"nav-link " + escape(
    isActive("/saved") ? "text-blue-600 dark:text-blue-400" : "",
    true
  ) + " svelte-rrvili"}">${validate_component(Bookmark, "Bookmark").$$render($$result, { class: "w-4 h-4" }, {}, {})} <span data-svelte-h="svelte-7f40kr">Saved</span></a> <a href="/conflicts" class="${"flex items-center gap-2 px-3 py-1.5 rounded-full " + escape(
    isActive("/conflicts") ? "bg-blue-600 text-white" : "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-800",
    true
  ) + " transition-colors"}">${validate_component(Globe, "Globe").$$render($$result, { class: "w-4 h-4" }, {}, {})} ${escape(showConflictMap ? "Back to News" : "Global Conflicts")}</a></div></div>  <div class="hidden lg:flex flex-1 max-w-xl mx-8"><div class="relative w-full"><input type="text" placeholder="Search news, markets, conflicts..." class="w-full px-4 py-2 pl-10 pr-4 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"${add_attribute("value", searchQuery, 0)}> ${validate_component(Search, "Search").$$render(
    $$result,
    {
      class: "absolute left-3 top-2.5 w-5 h-5 text-gray-400"
    },
    {},
    {}
  )}</div></div>  <div class="flex items-center gap-4"><button class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full relative" aria-label="Notifications">${validate_component(Bell, "Bell").$$render($$result, { class: "w-5 h-5" }, {}, {})} <span class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span></button> <button class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full" aria-label="Toggle theme">${$theme === "light" ? `${validate_component(Moon, "Moon").$$render($$result, { class: "w-5 h-5" }, {}, {})}` : `${validate_component(Sun, "Sun").$$render($$result, { class: "w-5 h-5" }, {}, {})}`}</button> <button class="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" aria-label="Account">${validate_component(User, "User").$$render($$result, { class: "w-5 h-5" }, {}, {})} <span data-svelte-h="svelte-f46e0b">Account</span></button>  <button class="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"${add_attribute("aria-label", "Open menu", 0)}>${`${validate_component(Menu, "Menu").$$render($$result, { class: "w-6 h-6" }, {}, {})}`}</button></div></div></div>  ${``} </nav>`;
});
const css$1 = {
  code: ".social-link.svelte-v34vcz{border-radius:9999px;--tw-bg-opacity:1;background-color:rgb(243 244 246 / var(--tw-bg-opacity));padding:0.5rem;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms\n}.social-link.svelte-v34vcz:hover{--tw-bg-opacity:1;background-color:rgb(219 234 254 / var(--tw-bg-opacity))\n}.social-link.svelte-v34vcz:is(.dark *){--tw-bg-opacity:1;background-color:rgb(55 65 81 / var(--tw-bg-opacity))\n}.social-link.svelte-v34vcz:hover:is(.dark *){--tw-bg-opacity:1;background-color:rgb(30 58 138 / var(--tw-bg-opacity))\n}.footer-link.svelte-v34vcz{--tw-text-opacity:1;color:rgb(75 85 99 / var(--tw-text-opacity));transition-property:color, background-color, border-color, text-decoration-color, fill, stroke;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms\n}.footer-link.svelte-v34vcz:hover{--tw-text-opacity:1;color:rgb(37 99 235 / var(--tw-text-opacity))\n}.footer-link.svelte-v34vcz:is(.dark *){--tw-text-opacity:1;color:rgb(156 163 175 / var(--tw-text-opacity))\n}.footer-link.svelte-v34vcz:hover:is(.dark *){--tw-text-opacity:1;color:rgb(96 165 250 / var(--tw-text-opacity))\n}",
  map: '{"version":3,"file":"Footer.svelte","sources":["Footer.svelte"],"sourcesContent":["<script lang=\\"ts\\">import {\\n  Newspaper,\\n  Twitter,\\n  Facebook,\\n  Instagram,\\n  Linkedin,\\n  Mail\\n} from \\"lucide-svelte\\";\\n<\/script>\\n\\n<footer class=\\"bg-white dark:bg-gray-800 shadow-lg mt-auto\\">\\n  <div class=\\"container mx-auto px-4 py-8\\">\\n    <div class=\\"grid grid-cols-1 md:grid-cols-4 gap-8\\">\\n      <!-- Brand -->\\n      <div class=\\"space-y-4\\">\\n        <div class=\\"flex items-center gap-2\\">\\n          <Newspaper class=\\"w-8 h-8 text-blue-600 dark:text-blue-400\\" />\\n          <span class=\\"text-xl font-bold\\">DiplomMap</span>\\n        </div>\\n        <p class=\\"text-sm text-gray-600 dark:text-gray-400\\">\\n          Your comprehensive source for global news, conflicts, and geopolitical insights.\\n        </p>\\n        <div class=\\"flex gap-4\\">\\n          <a href=\\"#\\" class=\\"social-link\\">\\n            <Twitter class=\\"w-5 h-5\\" />\\n          </a>\\n          <a href=\\"#\\" class=\\"social-link\\">\\n            <Facebook class=\\"w-5 h-5\\" />\\n          </a>\\n          <a href=\\"#\\" class=\\"social-link\\">\\n            <Instagram class=\\"w-5 h-5\\" />\\n          </a>\\n          <a href=\\"#\\" class=\\"social-link\\">\\n            <Linkedin class=\\"w-5 h-5\\" />\\n          </a>\\n        </div>\\n      </div>\\n\\n      <!-- Quick Links -->\\n      <div>\\n        <h3 class=\\"font-semibold mb-4\\">Quick Links</h3>\\n        <ul class=\\"space-y-2\\">\\n          <li><a href=\\"#\\" class=\\"footer-link\\">Top Stories</a></li>\\n          <li><a href=\\"#\\" class=\\"footer-link\\">Global Conflicts</a></li>\\n          <li><a href=\\"#\\" class=\\"footer-link\\">Elections</a></li>\\n          <li><a href=\\"#\\" class=\\"footer-link\\">Markets</a></li>\\n        </ul>\\n      </div>\\n\\n      <!-- Categories -->\\n      <div>\\n        <h3 class=\\"font-semibold mb-4\\">Categories</h3>\\n        <ul class=\\"space-y-2\\">\\n          <li><a href=\\"#\\" class=\\"footer-link\\">World News</a></li>\\n          <li><a href=\\"#\\" class=\\"footer-link\\">India</a></li>\\n          <li><a href=\\"#\\" class=\\"footer-link\\">Business</a></li>\\n          <li><a href=\\"#\\" class=\\"footer-link\\">Technology</a></li>\\n          <li><a href=\\"#\\" class=\\"footer-link\\">Sports</a></li>\\n        </ul>\\n      </div>\\n\\n      <!-- Newsletter -->\\n      <div>\\n        <h3 class=\\"font-semibold mb-4\\">Stay Updated</h3>\\n        <p class=\\"text-sm text-gray-600 dark:text-gray-400 mb-4\\">\\n          Subscribe to our newsletter for daily updates.\\n        </p>\\n        <div class=\\"flex\\">\\n          <input\\n            type=\\"email\\"\\n            placeholder=\\"Enter your email\\"\\n            class=\\"flex-1 px-4 py-2 rounded-l-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500\\"\\n          />\\n          <button class=\\"px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors\\">\\n            <Mail class=\\"w-5 h-5\\" />\\n          </button>\\n        </div>\\n      </div>\\n    </div>\\n\\n    <div class=\\"border-t dark:border-gray-700 mt-8 pt-8 text-center text-sm text-gray-600 dark:text-gray-400\\">\\n      <p>© {new Date().getFullYear()} DiplomMap. All rights reserved.</p>\\n    </div>\\n  </div>\\n</footer>\\n\\n<style lang=\\"postcss\\">\\n  .social-link {\\n\\n    border-radius: 9999px;\\n\\n    --tw-bg-opacity: 1;\\n\\n    background-color: rgb(243 244 246 / var(--tw-bg-opacity));\\n\\n    padding: 0.5rem;\\n\\n    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;\\n\\n    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\\n\\n    transition-duration: 150ms\\n}\\n\\n.social-link:hover {\\n\\n    --tw-bg-opacity: 1;\\n\\n    background-color: rgb(219 234 254 / var(--tw-bg-opacity))\\n}\\n\\n.social-link:is(.dark *) {\\n\\n    --tw-bg-opacity: 1;\\n\\n    background-color: rgb(55 65 81 / var(--tw-bg-opacity))\\n}\\n\\n.social-link:hover:is(.dark *) {\\n\\n    --tw-bg-opacity: 1;\\n\\n    background-color: rgb(30 58 138 / var(--tw-bg-opacity))\\n}\\n\\n  .footer-link {\\n\\n    --tw-text-opacity: 1;\\n\\n    color: rgb(75 85 99 / var(--tw-text-opacity));\\n\\n    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;\\n\\n    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\\n\\n    transition-duration: 150ms\\n}\\n\\n  .footer-link:hover {\\n\\n    --tw-text-opacity: 1;\\n\\n    color: rgb(37 99 235 / var(--tw-text-opacity))\\n}\\n\\n  .footer-link:is(.dark *) {\\n\\n    --tw-text-opacity: 1;\\n\\n    color: rgb(156 163 175 / var(--tw-text-opacity))\\n}\\n\\n  .footer-link:hover:is(.dark *) {\\n\\n    --tw-text-opacity: 1;\\n\\n    color: rgb(96 165 250 / var(--tw-text-opacity))\\n}\\n</style>"],"names":[],"mappings":"AAuFE,0BAAa,CAEX,aAAa,CAAE,MAAM,CAErB,eAAe,CAAE,CAAC,CAElB,gBAAgB,CAAE,IAAI,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,CAAC,CAAC,IAAI,eAAe,CAAC,CAAC,CAEzD,OAAO,CAAE,MAAM,CAEf,mBAAmB,CAAE,KAAK,CAAC,CAAC,gBAAgB,CAAC,CAAC,YAAY,CAAC,CAAC,qBAAqB,CAAC,CAAC,IAAI,CAAC,CAAC,MAAM,CAE/F,0BAA0B,CAAE,aAAa,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAExD,mBAAmB,CAAE;AACzB,CAEA,0BAAY,MAAO,CAEf,eAAe,CAAE,CAAC,CAElB,gBAAgB,CAAE,IAAI,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,CAAC,CAAC,IAAI,eAAe,CAAC;AAC5D,CAEA,0BAAY,IAAI,KAAK,CAAC,CAAC,CAAE,CAErB,eAAe,CAAE,CAAC,CAElB,gBAAgB,CAAE,IAAI,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC,IAAI,eAAe,CAAC;AACzD,CAEA,0BAAY,MAAM,IAAI,KAAK,CAAC,CAAC,CAAE,CAE3B,eAAe,CAAE,CAAC,CAElB,gBAAgB,CAAE,IAAI,EAAE,CAAC,EAAE,CAAC,GAAG,CAAC,CAAC,CAAC,IAAI,eAAe,CAAC;AAC1D,CAEE,0BAAa,CAEX,iBAAiB,CAAE,CAAC,CAEpB,KAAK,CAAE,IAAI,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC,IAAI,iBAAiB,CAAC,CAAC,CAE7C,mBAAmB,CAAE,KAAK,CAAC,CAAC,gBAAgB,CAAC,CAAC,YAAY,CAAC,CAAC,qBAAqB,CAAC,CAAC,IAAI,CAAC,CAAC,MAAM,CAE/F,0BAA0B,CAAE,aAAa,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAExD,mBAAmB,CAAE;AACzB,CAEE,0BAAY,MAAO,CAEjB,iBAAiB,CAAE,CAAC,CAEpB,KAAK,CAAE,IAAI,EAAE,CAAC,EAAE,CAAC,GAAG,CAAC,CAAC,CAAC,IAAI,iBAAiB,CAAC;AACjD,CAEE,0BAAY,IAAI,KAAK,CAAC,CAAC,CAAE,CAEvB,iBAAiB,CAAE,CAAC,CAEpB,KAAK,CAAE,IAAI,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,CAAC,CAAC,IAAI,iBAAiB,CAAC;AACnD,CAEE,0BAAY,MAAM,IAAI,KAAK,CAAC,CAAC,CAAE,CAE7B,iBAAiB,CAAE,CAAC,CAEpB,KAAK,CAAE,IAAI,EAAE,CAAC,GAAG,CAAC,GAAG,CAAC,CAAC,CAAC,IAAI,iBAAiB,CAAC;AAClD"}'
};
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<footer class="bg-white dark:bg-gray-800 shadow-lg mt-auto"><div class="container mx-auto px-4 py-8"><div class="grid grid-cols-1 md:grid-cols-4 gap-8"> <div class="space-y-4"><div class="flex items-center gap-2">${validate_component(Newspaper, "Newspaper").$$render(
    $$result,
    {
      class: "w-8 h-8 text-blue-600 dark:text-blue-400"
    },
    {},
    {}
  )} <span class="text-xl font-bold" data-svelte-h="svelte-6z0aod">DiplomMap</span></div> <p class="text-sm text-gray-600 dark:text-gray-400" data-svelte-h="svelte-112hvkt">Your comprehensive source for global news, conflicts, and geopolitical insights.</p> <div class="flex gap-4"><a href="#" class="social-link svelte-v34vcz">${validate_component(Twitter, "Twitter").$$render($$result, { class: "w-5 h-5" }, {}, {})}</a> <a href="#" class="social-link svelte-v34vcz">${validate_component(Facebook, "Facebook").$$render($$result, { class: "w-5 h-5" }, {}, {})}</a> <a href="#" class="social-link svelte-v34vcz">${validate_component(Instagram, "Instagram").$$render($$result, { class: "w-5 h-5" }, {}, {})}</a> <a href="#" class="social-link svelte-v34vcz">${validate_component(Linkedin, "Linkedin").$$render($$result, { class: "w-5 h-5" }, {}, {})}</a></div></div>  <div data-svelte-h="svelte-gyu99j"><h3 class="font-semibold mb-4">Quick Links</h3> <ul class="space-y-2"><li><a href="#" class="footer-link svelte-v34vcz">Top Stories</a></li> <li><a href="#" class="footer-link svelte-v34vcz">Global Conflicts</a></li> <li><a href="#" class="footer-link svelte-v34vcz">Elections</a></li> <li><a href="#" class="footer-link svelte-v34vcz">Markets</a></li></ul></div>  <div data-svelte-h="svelte-ya0d93"><h3 class="font-semibold mb-4">Categories</h3> <ul class="space-y-2"><li><a href="#" class="footer-link svelte-v34vcz">World News</a></li> <li><a href="#" class="footer-link svelte-v34vcz">India</a></li> <li><a href="#" class="footer-link svelte-v34vcz">Business</a></li> <li><a href="#" class="footer-link svelte-v34vcz">Technology</a></li> <li><a href="#" class="footer-link svelte-v34vcz">Sports</a></li></ul></div>  <div><h3 class="font-semibold mb-4" data-svelte-h="svelte-morqfs">Stay Updated</h3> <p class="text-sm text-gray-600 dark:text-gray-400 mb-4" data-svelte-h="svelte-1cqup2p">Subscribe to our newsletter for daily updates.</p> <div class="flex"><input type="email" placeholder="Enter your email" class="flex-1 px-4 py-2 rounded-l-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"> <button class="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors">${validate_component(Mail, "Mail").$$render($$result, { class: "w-5 h-5" }, {}, {})}</button></div></div></div> <div class="border-t dark:border-gray-700 mt-8 pt-8 text-center text-sm text-gray-600 dark:text-gray-400"><p>© ${escape((/* @__PURE__ */ new Date()).getFullYear())} DiplomMap. All rights reserved.</p></div></div> </footer>`;
});
const css = {
  code: ".dark{color-scheme:dark}html{scroll-behavior:smooth}body{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}",
  map: '{"version":3,"file":"+layout.svelte","sources":["+layout.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { onMount } from \\"svelte\\";\\nimport { page } from \\"$app/stores\\";\\nimport { Toaster } from \\"svelte-french-toast\\";\\nimport Navbar from \\"$lib/components/Navbar.svelte\\";\\nimport Footer from \\"$lib/components/Footer.svelte\\";\\nimport { theme } from \\"$lib/stores/theme\\";\\nimport \\"../app.css\\";\\nonMount(() => {\\n  if (window.matchMedia(\\"(prefers-color-scheme: dark)\\").matches) {\\n    theme.set(\\"dark\\");\\n  }\\n  window.matchMedia(\\"(prefers-color-scheme: dark)\\").addEventListener(\\"change\\", (e) => {\\n    theme.set(e.matches ? \\"dark\\" : \\"light\\");\\n  });\\n});\\n<\/script>\\n\\n<svelte:head>\\n  <title>DiplomMap - Global News & Conflict Tracker</title>\\n  <meta name=\\"description\\" content=\\"Track global conflicts, news, and geopolitical developments in real-time\\" />\\n</svelte:head>\\n\\n<div class=\\"min-h-screen flex flex-col {$theme}\\">\\n  <Navbar />\\n  \\n  <main class=\\"flex-1 bg-gray-50 dark:bg-gray-900\\">\\n    <slot />\\n  </main>\\n\\n  <Footer />\\n  <Toaster />\\n</div>\\n\\n<style>\\n  :global(.dark) {\\n    color-scheme: dark;\\n  }\\n\\n  :global(html) {\\n    scroll-behavior: smooth;\\n  }\\n\\n  :global(body) {\\n    -webkit-font-smoothing: antialiased;\\n    -moz-osx-font-smoothing: grayscale;\\n}\\n</style>"],"names":[],"mappings":"AAkCU,KAAO,CACb,YAAY,CAAE,IAChB,CAEQ,IAAM,CACZ,eAAe,CAAE,MACnB,CAEQ,IAAM,CACZ,sBAAsB,CAAE,WAAW,CACnC,uBAAuB,CAAE,SAC7B"}'
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $theme, $$unsubscribe_theme;
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  $$result.css.add(css);
  $$unsubscribe_theme();
  return `${$$result.head += `<!-- HEAD_svelte-13omwk3_START -->${$$result.title = `<title>DiplomMap - Global News &amp; Conflict Tracker</title>`, ""}<meta name="description" content="Track global conflicts, news, and geopolitical developments in real-time"><!-- HEAD_svelte-13omwk3_END -->`, ""} <div class="${"min-h-screen flex flex-col " + escape($theme, true)}">${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})} <main class="flex-1 bg-gray-50 dark:bg-gray-900">${slots.default ? slots.default({}) : ``}</main> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})} ${validate_component(Toaster, "Toaster").$$render($$result, {}, {}, {})} </div>`;
});
export {
  Layout as default
};
