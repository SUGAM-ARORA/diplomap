import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import { C as Circle } from "../../../chunks/ArrowUp.svelte_svelte_type_style_lang.js";
import { B as Bookmark } from "../../../chunks/bookmark.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-1k2tbm5_START -->${$$result.title = `<title>Saved Items | DiplomMap</title>`, ""}<!-- HEAD_svelte-1k2tbm5_END -->`, ""} <div class="container mx-auto px-4 py-6"><div class="flex items-center gap-3 mb-8">${validate_component(Bookmark, "Bookmark").$$render($$result, { class: "w-8 h-8 text-blue-600" }, {}, {})} <h1 class="text-2xl font-bold" data-svelte-h="svelte-f8f0tx">Saved Items</h1></div> ${`<div class="flex justify-center items-center h-64">${validate_component(Circle, "Circle").$$render(
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
