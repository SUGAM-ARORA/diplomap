import { c as create_ssr_component, e as escape } from "../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const code = "rate-limited";
  let { message = "You have hit the rate limit. Please upgrade to keep chatting, or you can continue coding for free in the editor." } = $$props;
  const providerLimitHit = false;
  const isRetryable = true;
  if ($$props.code === void 0 && $$bindings.code && code !== void 0) $$bindings.code(code);
  if ($$props.message === void 0 && $$bindings.message && message !== void 0) $$bindings.message(message);
  if ($$props.providerLimitHit === void 0 && $$bindings.providerLimitHit && providerLimitHit !== void 0) $$bindings.providerLimitHit(providerLimitHit);
  if ($$props.isRetryable === void 0 && $$bindings.isRetryable && isRetryable !== void 0) $$bindings.isRetryable(isRetryable);
  return `<div><p>${escape(message)}</p></div>`;
});
export {
  Page as default
};
