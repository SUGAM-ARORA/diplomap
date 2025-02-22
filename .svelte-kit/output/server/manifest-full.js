export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.DLhSb9Fi.js",app:"_app/immutable/entry/app.DtG-ZC1s.js",imports:["_app/immutable/entry/start.DLhSb9Fi.js","_app/immutable/chunks/B7D8bEIE.js","_app/immutable/chunks/C7ClkcwI.js","_app/immutable/chunks/DssUR1h1.js","_app/immutable/entry/app.DtG-ZC1s.js","_app/immutable/chunks/C7ClkcwI.js","_app/immutable/chunks/Z2MeKKqP.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/conflicts",
				pattern: /^\/conflicts\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
