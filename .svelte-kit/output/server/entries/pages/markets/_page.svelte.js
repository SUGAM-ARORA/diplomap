import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import { C as Circle } from "../../../chunks/ArrowUp.svelte_svelte_type_style_lang.js";
import { B as Bar_chart_2 } from "../../../chunks/bar-chart-2.js";
const eventPrefix = /^on/;
const events = [];
Object.keys(globalThis).forEach((key) => {
  if (eventPrefix.test(key)) {
    events.push(key.replace(eventPrefix, ""));
  }
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-6pp29j_START -->${$$result.title = `<title>Markets | DiplomMap</title>`, ""}<!-- HEAD_svelte-6pp29j_END -->`, ""} <div class="container mx-auto px-4 py-6"><div class="flex items-center gap-3 mb-8">${validate_component(Bar_chart_2, "BarChart2").$$render($$result, { class: "w-8 h-8 text-blue-600" }, {}, {})} <h1 class="text-2xl font-bold" data-svelte-h="svelte-a13jsv">Markets</h1></div> ${`<div class="flex justify-center items-center h-64">${validate_component(Circle, "Circle").$$render(
    $$result,
    {
      size: "60",
      color: "#3B82F6",
      unit: "px",
      duration: "1s"
    },
    {},
    {}
  )}</div>`}</div>`;
});
export {
  Page as default
};
