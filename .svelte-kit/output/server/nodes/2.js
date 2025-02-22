import * as server from '../entries/pages/_page.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/2.x8wUzYY9.js","_app/immutable/chunks/C7ClkcwI.js","_app/immutable/chunks/Z2MeKKqP.js","_app/immutable/chunks/DLd0XH4X.js","_app/immutable/chunks/DpFqx4rb.js","_app/immutable/chunks/tchU5JaB.js"];
export const stylesheets = ["_app/immutable/assets/2.FtWlnWJT.css"];
export const fonts = [];
