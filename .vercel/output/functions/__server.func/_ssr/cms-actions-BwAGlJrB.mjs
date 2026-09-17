import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-hlAxRECD.mjs";
import { i as TSS_SERVER_FUNCTION, l as createServerFn } from "./esm-Dova13aH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cms-actions-BwAGlJrB.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
/**
* cms-actions.ts
*
* TanStack Start server functions for the CMS.
* These are the only public API surface — routes and the dashboard
* should import from here, never from cms-store.ts directly.
*
* Auth strategy:
*   - Password compared against CMS_ADMIN_PASSWORD env var (plain string compare).
*   - On success, an HMAC token is stored in an httpOnly cookie `cms_session`.
*   - Subsequent requests verify the cookie matches the expected token.
*   - Token is deterministic: HMAC-SHA256(password, 'amigos-cms-salt').
*     If you rotate the password, all existing sessions instantly invalidate.
*/
/** Compute the expected cookie value for the current password. */
/** Read cms_session cookie from the current request. */
/** Set the cms_session cookie on the response. */
/** Delete the cms_session cookie. */
/** Fetch the current restaurant data (public — no auth required). */
var getRestaurantDataFn = createServerFn({ method: "GET" }).handler(createSsrRpc("947636dd72e17e1aee7e558178ff810356416fb2ecf9b09edf95042af0e0f415"));
/** Persist a partial or full update (requires valid cms_session cookie). */
var saveRestaurantDataFn = createServerFn({ method: "POST" }).validator((raw) => raw).handler(createSsrRpc("46e7e77a10c5972bbd193c1ee1d0a5aebc424561a5f359e6a2b48510e43f9889"));
/** Upload a photo (base64) to public/uploads/ and return the URL. */
var uploadPhotoFn = createServerFn({ method: "POST" }).validator((raw) => raw).handler(createSsrRpc("353f42ea3b157861d8c44bc9c55449ebabd954ea5162094a38c045513533dcd9"));
/** Verify the submitted password and set the session cookie on success. */
var cmsLoginFn = createServerFn({ method: "POST" }).validator((raw) => raw).handler(createSsrRpc("e56027201cad64dc8e406d26e995131a4a778ee22e5ead23ef9ad54bc9c54313"));
/** Clear the session cookie (logout). */
var cmsLogoutFn = createServerFn({ method: "POST" }).handler(createSsrRpc("72b464b771d083cea5010fe289ea6adfc4655d724c49555498132509428a205f"));
/** Returns true if the current request carries a valid cms_session cookie. */
var checkCmsAuthFn = createServerFn({ method: "GET" }).handler(createSsrRpc("eeda6ced0604f01b1499b6b702dd89703d1d80048eb8e8d060e943b0a62f15cb"));
/** Auto-fetch top 10 5-star reviews from a Google Maps profile link. */
var fetchGoogleReviewsFn = createServerFn({ method: "POST" }).validator((raw) => raw).handler(createSsrRpc("40ca33d7ac62dc7fee3029dd99ae71b931ba5d3c12eb30ea863c3d509a54fdc5"));
/** Analyze menu from text and/or photos using Multimodal AI / Smart NLP */
var analyzeMenuWithAiFn = createServerFn({ method: "POST" }).validator((raw) => raw).handler(createSsrRpc("ec91751fec250775b96fedb7336f8a609ab7322dedafde36887ed30c04ecb725"));
//#endregion
export { fetchGoogleReviewsFn as a, uploadPhotoFn as c, cmsLogoutFn as i, checkCmsAuthFn as n, getRestaurantDataFn as o, cmsLoginFn as r, saveRestaurantDataFn as s, analyzeMenuWithAiFn as t };
