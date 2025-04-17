import { c as create_ssr_component, v as validate_component, j as each, e as escape } from "../../../chunks/ssr.js";
import { C as Circle } from "../../../chunks/ArrowUp.svelte_svelte_type_style_lang.js";
import "../../../chunks/news.js";
import { T as Trending_up } from "../../../chunks/trending-up.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selectedTimeframe = "24h";
  const timeframes = [
    { id: "1h", label: "Last Hour" },
    { id: "24h", label: "Last 24 Hours" },
    { id: "7d", label: "This Week" },
    { id: "30d", label: "This Month" }
  ];
  return `${$$result.head += `<!-- HEAD_svelte-1pxogmg_START -->${$$result.title = `<title>Trending Stories | DiplomMap</title>`, ""}<!-- HEAD_svelte-1pxogmg_END -->`, ""} <div class="container mx-auto px-4 py-6"><div class="flex items-center justify-between mb-8"><div class="flex items-center gap-3">${validate_component(Trending_up, "TrendingUp").$$render($$result, { class: "w-8 h-8 text-blue-600" }, {}, {})} <h1 class="text-2xl font-bold" data-svelte-h="svelte-1vg662c">Trending Stories</h1></div> <div class="flex gap-2">${each(timeframes, (frame) => {
    return `<button class="${"px-4 py-2 rounded-full text-sm font-medium transition-colors " + escape(
      selectedTimeframe === frame.id ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700",
      true
    )}">${escape(frame.label)} </button>`;
  })}</div></div> ${`<div class="flex justify-center items-center h-64">${validate_component(Circle, "Circle").$$render(
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
