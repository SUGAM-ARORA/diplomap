import { c as create_ssr_component, e as escape } from "./ssr.js";
const css = {
  code: ".circle.svelte-1dj7i4o{height:var(--size);width:var(--size);border-color:var(--color) transparent var(--color) var(--color);border-width:calc(var(--size) / 15);border-style:solid;-o-border-image:initial;border-image:initial;border-radius:50%;animation:var(--duration) linear 0s infinite normal none running svelte-1dj7i4o-rotate}.pause-animation.svelte-1dj7i4o{animation-play-state:paused}@keyframes svelte-1dj7i4o-rotate{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}",
  map: `{"version":3,"file":"Circle.svelte","sources":["Circle.svelte"],"sourcesContent":["<script>export let color = '#FF3E00';\\nexport let unit = 'px';\\nexport let duration = '0.75s';\\nexport let size = '60';\\nexport let pause = false;\\n<\/script>\\n\\n<div\\n\\tclass=\\"circle\\"\\n\\tclass:pause-animation={pause}\\n\\tstyle=\\"--size: {size}{unit}; --color: {color}; --duration: {duration}\\"\\n/>\\n\\n<style>\\n\\t.circle {\\n\\t\\theight: var(--size);\\n\\t\\twidth: var(--size);\\n\\t\\tborder-color: var(--color) transparent var(--color) var(--color);\\n\\t\\tborder-width: calc(var(--size) / 15);\\n\\t\\tborder-style: solid;\\n\\t\\t-o-border-image: initial;\\n\\t\\t   border-image: initial;\\n\\t\\tborder-radius: 50%;\\n\\t\\tanimation: var(--duration) linear 0s infinite normal none running rotate;\\n\\t}\\n\\t.pause-animation {\\n\\t\\tanimation-play-state: paused;\\n\\t}\\n\\t@keyframes rotate {\\n\\t\\t0% {\\n\\t\\t\\ttransform: rotate(0);\\n\\t\\t}\\n\\t\\t100% {\\n\\t\\t\\ttransform: rotate(360deg);\\n\\t\\t}\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAcC,sBAAQ,CACP,MAAM,CAAE,IAAI,MAAM,CAAC,CACnB,KAAK,CAAE,IAAI,MAAM,CAAC,CAClB,YAAY,CAAE,IAAI,OAAO,CAAC,CAAC,WAAW,CAAC,IAAI,OAAO,CAAC,CAAC,IAAI,OAAO,CAAC,CAChE,YAAY,CAAE,KAAK,IAAI,MAAM,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CACpC,YAAY,CAAE,KAAK,CACnB,eAAe,CAAE,OAAO,CACrB,YAAY,CAAE,OAAO,CACxB,aAAa,CAAE,GAAG,CAClB,SAAS,CAAE,IAAI,UAAU,CAAC,CAAC,MAAM,CAAC,EAAE,CAAC,QAAQ,CAAC,MAAM,CAAC,IAAI,CAAC,OAAO,CAAC,qBACnE,CACA,+BAAiB,CAChB,oBAAoB,CAAE,MACvB,CACA,WAAW,qBAAO,CACjB,EAAG,CACF,SAAS,CAAE,OAAO,CAAC,CACpB,CACA,IAAK,CACJ,SAAS,CAAE,OAAO,MAAM,CACzB,CACD"}`
};
const Circle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { color = "#FF3E00" } = $$props;
  let { unit = "px" } = $$props;
  let { duration = "0.75s" } = $$props;
  let { size = "60" } = $$props;
  let { pause = false } = $$props;
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.unit === void 0 && $$bindings.unit && unit !== void 0) $$bindings.unit(unit);
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0) $$bindings.duration(duration);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.pause === void 0 && $$bindings.pause && pause !== void 0) $$bindings.pause(pause);
  $$result.css.add(css);
  return `<div class="${["circle svelte-1dj7i4o", pause ? "pause-animation" : ""].join(" ").trim()}" style="${"--size: " + escape(size, true) + escape(unit, true) + "; --color: " + escape(color, true) + "; --duration: " + escape(duration, true)}"></div>`;
});
export {
  Circle as C
};
