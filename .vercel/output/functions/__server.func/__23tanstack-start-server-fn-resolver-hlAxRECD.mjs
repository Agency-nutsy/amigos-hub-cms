//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-hlAxRECD.js
var manifest = {
	"353f42ea3b157861d8c44bc9c55449ebabd954ea5162094a38c045513533dcd9": {
		functionName: "uploadPhotoFn_createServerFn_handler",
		importer: () => import("./_ssr/cms-actions-B74GREQH.mjs")
	},
	"40ca33d7ac62dc7fee3029dd99ae71b931ba5d3c12eb30ea863c3d509a54fdc5": {
		functionName: "fetchGoogleReviewsFn_createServerFn_handler",
		importer: () => import("./_ssr/cms-actions-B74GREQH.mjs")
	},
	"46e7e77a10c5972bbd193c1ee1d0a5aebc424561a5f359e6a2b48510e43f9889": {
		functionName: "saveRestaurantDataFn_createServerFn_handler",
		importer: () => import("./_ssr/cms-actions-B74GREQH.mjs")
	},
	"72b464b771d083cea5010fe289ea6adfc4655d724c49555498132509428a205f": {
		functionName: "cmsLogoutFn_createServerFn_handler",
		importer: () => import("./_ssr/cms-actions-B74GREQH.mjs")
	},
	"947636dd72e17e1aee7e558178ff810356416fb2ecf9b09edf95042af0e0f415": {
		functionName: "getRestaurantDataFn_createServerFn_handler",
		importer: () => import("./_ssr/cms-actions-B74GREQH.mjs")
	},
	"e56027201cad64dc8e406d26e995131a4a778ee22e5ead23ef9ad54bc9c54313": {
		functionName: "cmsLoginFn_createServerFn_handler",
		importer: () => import("./_ssr/cms-actions-B74GREQH.mjs")
	},
	"ec91751fec250775b96fedb7336f8a609ab7322dedafde36887ed30c04ecb725": {
		functionName: "analyzeMenuWithAiFn_createServerFn_handler",
		importer: () => import("./_ssr/cms-actions-B74GREQH.mjs")
	},
	"eeda6ced0604f01b1499b6b702dd89703d1d80048eb8e8d060e943b0a62f15cb": {
		functionName: "checkCmsAuthFn_createServerFn_handler",
		importer: () => import("./_ssr/cms-actions-B74GREQH.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
