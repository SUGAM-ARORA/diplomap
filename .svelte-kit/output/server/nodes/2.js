import * as server from '../entries/pages/_page.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/2.CqeeE0M3.js","_app/immutable/chunks/DIW3RXPf.js","_app/immutable/chunks/CBa6I7JZ.js","_app/immutable/chunks/DE86WylQ.js"];
export const stylesheets = ["_app/immutable/assets/2.FtWlnWJT.css"];
export const fonts = [];
