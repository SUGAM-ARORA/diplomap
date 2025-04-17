import * as universal from '../entries/pages/_layout.ts.js';
import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.ZDWehvCi.js","_app/immutable/chunks/Bu-Z9Ww-.js","_app/immutable/chunks/CACKcR36.js","_app/immutable/chunks/DcjcOXWM.js","_app/immutable/chunks/Cqhikt5H.js","_app/immutable/chunks/biKtb2jR.js","_app/immutable/chunks/Ds1iR5GE.js","_app/immutable/chunks/8ZfysL4F.js","_app/immutable/chunks/D5OnJT81.js"];
export const stylesheets = ["_app/immutable/assets/0.BX-YK2iK.css"];
export const fonts = [];
