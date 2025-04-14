import { c as create_ssr_component } from "../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const code = "rate-limited";
  const message = "You have hit the rate limit. Please <a class='__boltUpgradePlan__'>Upgrade</a> to keep chatting, or you can continue coding for free in the editor.";
  const providerLimitHit = false;
  const isRetryable = true;
  if ($$props.code === void 0 && $$bindings.code && code !== void 0) $$bindings.code(code);
  if ($$props.message === void 0 && $$bindings.message && message !== void 0) $$bindings.message(message);
  if ($$props.providerLimitHit === void 0 && $$bindings.providerLimitHit && providerLimitHit !== void 0) $$bindings.providerLimitHit(providerLimitHit);
  if ($$props.isRetryable === void 0 && $$bindings.isRetryable && isRetryable !== void 0) $$bindings.isRetryable(isRetryable);
  return ``;
});
export {
  Page as default
};
