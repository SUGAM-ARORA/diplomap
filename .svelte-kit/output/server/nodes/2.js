import * as server from '../entries/pages/_page.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/2.JLMmFoPI.js","_app/immutable/chunks/Bu-Z9Ww-.js","_app/immutable/chunks/CACKcR36.js","_app/immutable/chunks/Cqhikt5H.js","_app/immutable/chunks/DMwXLexJ.js","_app/immutable/chunks/DrODZuoJ.js","_app/immutable/chunks/D5OnJT81.js","_app/immutable/chunks/Dj3ERaIp.js"];
export const stylesheets = ["_app/immutable/assets/2.CcyUwhrA.css","_app/immutable/assets/ArrowUp.CIRyELHb.css"];
export const fonts = [];
