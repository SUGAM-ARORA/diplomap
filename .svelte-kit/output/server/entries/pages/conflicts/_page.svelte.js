import { c as create_ssr_component, i as subscribe, o as onDestroy, h as add_attribute, e as escape, v as validate_component } from "../../../chunks/ssr.js";
import { t as theme } from "../../../chunks/theme.js";
import "leaflet";
import "leaflet.heat";
import "d3";
const css = {
  code: "div.svelte-ovu7ng{position:relative}",
  map: '{"version":3,"file":"Globe.svelte","sources":["Globe.svelte"],"sourcesContent":["```svelte\\n<script lang=\\"ts\\">import { onMount, onDestroy } from \\"svelte\\";\\nimport GlobeGL from \\"globe.gl\\";\\nimport { theme } from \\"$lib/stores/theme\\";\\nexport let conflicts = [];\\nexport let tensionZones = [];\\nexport let displacements = [];\\nlet container;\\nlet globe;\\nconst GLOBE_BG_COLOR = \\"#000011\\";\\nconst GLOBE_HIGHLIGHT_COLOR = \\"#ffffff\\";\\nonMount(() => {\\n  globe = GlobeGL()(container).globeImageUrl(\\"//unpkg.com/three-globe/example/img/earth-dark.jpg\\").backgroundColor(GLOBE_BG_COLOR).atmosphereColor(GLOBE_HIGHLIGHT_COLOR).atmosphereAltitude(0.25).pointsData(conflicts.map((conflict) => ({\\n    lat: conflict.location.lat,\\n    lng: conflict.location.lng,\\n    size: conflict.intensity === \\"major\\" ? 0.5 : 0.2,\\n    color: conflict.status === \\"active\\" ? \\"#ff0000\\" : \\"#ffa500\\"\\n  }))).pointAltitude(0.1).pointColor(\\"color\\").pointRadius(\\"size\\").arcsData(displacements.map((d) => ({\\n    startLat: d.from.lat,\\n    startLng: d.from.lng,\\n    endLat: d.to.lat,\\n    endLng: d.to.lng,\\n    color: d.status === \\"ongoing\\" ? \\"#ff0000\\" : \\"#ffffff\\"\\n  }))).arcColor(\\"color\\").arcDashLength(0.5).arcDashGap(0.1).arcDashAnimateTime(2e3).ringsData(tensionZones.map((zone) => ({\\n    lat: zone.location.lat,\\n    lng: zone.location.lng,\\n    radius: zone.radius,\\n    color: `rgba(255, 0, 0, ${zone.intensity / 100})`\\n  }))).ringColor(\\"color\\").ringMaxRadius(\\"radius\\").ringPropagationSpeed(1).ringRepeatPeriod(1e3);\\n  globe.controls().autoRotate = true;\\n  globe.controls().autoRotateSpeed = 0.5;\\n  const handleResize = () => {\\n    globe.width(container.clientWidth);\\n    globe.height(container.clientHeight);\\n  };\\n  window.addEventListener(\\"resize\\", handleResize);\\n  return () => {\\n    window.removeEventListener(\\"resize\\", handleResize);\\n  };\\n});\\n$: if (globe && $theme) {\\n  globe.backgroundColor($theme === \\"dark\\" ? GLOBE_BG_COLOR : \\"#ffffff\\");\\n}\\nonDestroy(() => {\\n  if (globe) {\\n    globe.dispose();\\n  }\\n});\\n<\/script>\\n\\n<div\\n  bind:this={container}\\n  class=\\"w-full h-full\\"\\n  style=\\"min-height: 500px;\\"\\n></div>\\n\\n<style>\\n  div {\\n    position: relative;\\n  }\\n</style>\\n```"],"names":[],"mappings":"AAyDE,iBAAI,CACF,QAAQ,CAAE,QACZ"}'
};
const Globe = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_theme;
  $$unsubscribe_theme = subscribe(theme, (value) => value);
  let { conflicts = [] } = $$props;
  let { tensionZones = [] } = $$props;
  let { displacements = [] } = $$props;
  let container;
  onDestroy(() => {
  });
  if ($$props.conflicts === void 0 && $$bindings.conflicts && conflicts !== void 0) $$bindings.conflicts(conflicts);
  if ($$props.tensionZones === void 0 && $$bindings.tensionZones && tensionZones !== void 0) $$bindings.tensionZones(tensionZones);
  if ($$props.displacements === void 0 && $$bindings.displacements && displacements !== void 0) $$bindings.displacements(displacements);
  $$result.css.add(css);
  $$unsubscribe_theme();
  return `\`\`\`svelte
 <div class="w-full h-full svelte-ovu7ng" style="min-height: 500px;"${add_attribute("this", container, 0)}></div> 
\`\`\``;
});
const eventPrefix = /^on/;
const events = [];
Object.keys(globalThis).forEach((key) => {
  if (eventPrefix.test(key)) {
    events.push(key.replace(eventPrefix, ""));
  }
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let conflicts = [];
  let tensionZones = [];
  let displacements = [];
  return `\`\`\`svelte
 <div class="min-h-screen bg-gray-50 dark:bg-gray-900"><div class="container mx-auto px-4 py-8"> <div class="flex gap-4 mb-8 overflow-x-auto pb-2"><button class="${"px-4 py-2 rounded-full whitespace-nowrap transition-colors " + escape(
    "bg-blue-600 text-white",
    true
  )}">3D Globe View</button> <button class="${"px-4 py-2 rounded-full whitespace-nowrap transition-colors " + escape(
    "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700",
    true
  )}">Tension Heat Map</button> <button class="${"px-4 py-2 rounded-full whitespace-nowrap transition-colors " + escape(
    "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700",
    true
  )}">Alliance Network</button> <button class="${"px-4 py-2 rounded-full whitespace-nowrap transition-colors " + escape(
    "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700",
    true
  )}">Economic Impact</button> <button class="${"px-4 py-2 rounded-full whitespace-nowrap transition-colors " + escape(
    "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700",
    true
  )}">Population Displacement</button></div>  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden" style="height: 80vh;">${`<div class="h-full">${validate_component(Globe, "Globe").$$render($$result, { conflicts, tensionZones, displacements }, {}, {})}</div>`}</div></div></div>
\`\`\``;
});
export {
  Page as default
};
