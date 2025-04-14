import * as universal from '../entries/pages/_layout.ts.js';
import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.BwnzJ0Rn.js","_app/immutable/chunks/DIW3RXPf.js","_app/immutable/chunks/CBa6I7JZ.js","_app/immutable/chunks/CiYcmXgD.js","_app/immutable/chunks/DE86WylQ.js","_app/immutable/chunks/BFM2IxHV.js"];
export const stylesheets = ["_app/immutable/assets/0.BYRyZI4M.css"];
export const fonts = [];
