import { c as create_ssr_component, v as validate_component, j as each, e as escape } from "../../chunks/ssr.js";
import { C as Circle } from "../../chunks/ArrowUp.svelte_svelte_type_style_lang.js";
import "../../chunks/news.js";
import { I as Icon } from "../../chunks/Icon.js";
const Zap = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "polygon",
      {
        "points": "13 2 3 14 12 14 11 22 21 10 12 10 13 2"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "zap" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const css = {
  code: "@keyframes svelte-c0c9lo-marquee{0%{transform:translateX(100%)}100%{transform:translateX(-100%)}}.animate-marquee.svelte-c0c9lo{animation:svelte-c0c9lo-marquee 30s linear infinite}",
  map: '{"version":3,"file":"BreakingNews.svelte","sources":["BreakingNews.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { onMount } from \\"svelte\\";\\nimport { Zap } from \\"lucide-svelte\\";\\nimport { fetchBreakingNews } from \\"$lib/services/news\\";\\nlet breakingNews = [];\\nonMount(async () => {\\n  breakingNews = await fetchBreakingNews();\\n  const interval = setInterval(async () => {\\n    breakingNews = await fetchBreakingNews();\\n  }, 5 * 60 * 1e3);\\n  return () => clearInterval(interval);\\n});\\n<\/script>\\n\\n{#if breakingNews.length > 0}\\n  <div class=\\"bg-red-600 text-white py-2 px-4 mb-6 rounded-lg shadow-lg\\">\\n    <div class=\\"flex items-center gap-2\\">\\n      <Zap class=\\"w-5 h-5 animate-pulse\\" />\\n      <div class=\\"overflow-hidden\\">\\n        <div class=\\"animate-marquee whitespace-nowrap\\">\\n          {#each breakingNews as news}\\n            <span class=\\"mx-4\\">{news}</span>\\n          {/each}\\n        </div>\\n      </div>\\n    </div>\\n  </div>\\n{/if}\\n\\n<style>\\n  @keyframes marquee {\\n    0% {\\n      transform: translateX(100%);\\n    }\\n    100% {\\n      transform: translateX(-100%);\\n    }\\n  }\\n\\n  .animate-marquee {\\n    animation: marquee 30s linear infinite;\\n  }\\n</style>"],"names":[],"mappings":"AA6BE,WAAW,qBAAQ,CACjB,EAAG,CACD,SAAS,CAAE,WAAW,IAAI,CAC5B,CACA,IAAK,CACH,SAAS,CAAE,WAAW,KAAK,CAC7B,CACF,CAEA,8BAAiB,CACf,SAAS,CAAE,qBAAO,CAAC,GAAG,CAAC,MAAM,CAAC,QAChC"}'
};
const BreakingNews = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let breakingNews = [];
  $$result.css.add(css);
  return `${breakingNews.length > 0 ? `<div class="bg-red-600 text-white py-2 px-4 mb-6 rounded-lg shadow-lg"><div class="flex items-center gap-2">${validate_component(Zap, "Zap").$$render($$result, { class: "w-5 h-5 animate-pulse" }, {}, {})} <div class="overflow-hidden"><div class="animate-marquee whitespace-nowrap svelte-c0c9lo">${each(breakingNews, (news) => {
    return `<span class="mx-4">${escape(news)}</span>`;
  })}</div></div></div></div>` : ``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let activeCategory = "all";
  const categories = [
    { id: "all", name: "All News" },
    { id: "world", name: "World" },
    { id: "india", name: "India" },
    { id: "business", name: "Business" },
    { id: "technology", name: "Technology" },
    { id: "sports", name: "Sports" }
  ];
  return `${$$result.head += `<!-- HEAD_svelte-8cbjr_START -->${$$result.title = `<title>DiplomMap - Your Global News Hub</title>`, ""}<!-- HEAD_svelte-8cbjr_END -->`, ""} <div class="container mx-auto px-4 py-6">${validate_component(BreakingNews, "BreakingNews").$$render($$result, {}, {}, {})}  <div class="flex overflow-x-auto gap-4 mb-6 pb-2">${each(categories, (category) => {
    return `<button class="${"px-4 py-2 rounded-full whitespace-nowrap transition-colors " + escape(
      activeCategory === category.id ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700",
      true
    )}">${escape(category.name)} </button>`;
  })}</div>  ${`<div class="flex justify-center items-center h-64">${validate_component(Circle, "Circle").$$render(
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
