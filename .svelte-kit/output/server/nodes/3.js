

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/conflicts/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.BcdKbuKJ.js","_app/immutable/chunks/Bu-Z9Ww-.js","_app/immutable/chunks/CACKcR36.js"];
export const stylesheets = [];
export const fonts = [];
