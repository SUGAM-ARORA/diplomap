import * as universal from '../entries/pages/_layout.ts.js';
import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.j8T2zSLo.js","_app/immutable/chunks/C7ClkcwI.js","_app/immutable/chunks/Z2MeKKqP.js","_app/immutable/chunks/B7D8bEIE.js","_app/immutable/chunks/DssUR1h1.js","_app/immutable/chunks/DLd0XH4X.js","_app/immutable/chunks/CjCnN1yX.js","_app/immutable/chunks/tchU5JaB.js"];
export const stylesheets = ["_app/immutable/assets/0.ud3bvIrx.css"];
export const fonts = [];
