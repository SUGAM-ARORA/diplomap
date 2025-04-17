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
		client: {start:"_app/immutable/entry/start.BOhNvB0M.js",app:"_app/immutable/entry/app.CQ2skfdf.js",imports:["_app/immutable/entry/start.BOhNvB0M.js","_app/immutable/chunks/DcjcOXWM.js","_app/immutable/chunks/Bu-Z9Ww-.js","_app/immutable/entry/app.CQ2skfdf.js","_app/immutable/chunks/Bu-Z9Ww-.js","_app/immutable/chunks/CACKcR36.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			
		],
		routes: [
			
		],
		prerendered_routes: new Set(["/","/__data.json","/conflicts","/markets","/saved","/trending"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
