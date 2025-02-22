import { c as create_ssr_component, v as validate_component, e as escape, j as each } from "../../chunks/ssr.js";
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
const css$1 = {
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
  $$result.css.add(css$1);
  return `<div class="${["circle svelte-1dj7i4o", pause ? "pause-animation" : ""].join(" ").trim()}" style="${"--size: " + escape(size, true) + escape(unit, true) + "; --color: " + escape(color, true) + "; --duration: " + escape(duration, true)}"></div>`;
});
[
  {
    id: "1",
    title: "Global Economic Summit Begins",
    description: "World leaders gather to discuss economic challenges",
    source: "World News",
    url: "https://example.com/news/1",
    publishedAt: (/* @__PURE__ */ new Date()).toISOString(),
    category: "world",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "2",
    title: "Tech Innovation Summit 2024",
    description: "Leading companies showcase latest technologies",
    source: "Tech News",
    url: "https://example.com/news/2",
    publishedAt: (/* @__PURE__ */ new Date()).toISOString(),
    category: "technology",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000"
  }
];
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
