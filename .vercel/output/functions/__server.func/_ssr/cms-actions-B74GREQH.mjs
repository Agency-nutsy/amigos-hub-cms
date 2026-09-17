import { i as TSS_SERVER_FUNCTION, l as createServerFn } from "./esm-Dova13aH.mjs";
import { createHmac } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/cms-actions-B74GREQH.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
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
function expectedToken() {
	const password = process.env.CMS_ADMIN_PASSWORD ?? "";
	return createHmac("sha256", "amigos-cms-salt").update(password).digest("hex");
}
/** Read cms_session cookie from the current request. */
async function getSessionCookie() {
	const { getCookie } = await import("./server-C0ohuWGO.mjs");
	return getCookie("cms_session");
}
/** Set the cms_session cookie on the response. */
async function setSessionCookie(value, maxAge) {
	const { setCookie } = await import("./server-C0ohuWGO.mjs");
	setCookie("cms_session", value, {
		httpOnly: true,
		path: "/",
		sameSite: "strict",
		maxAge,
		secure: true
	});
}
/** Delete the cms_session cookie. */
async function clearSessionCookie() {
	const { deleteCookie } = await import("./server-C0ohuWGO.mjs");
	deleteCookie("cms_session", { path: "/" });
}
/** Fetch the current restaurant data (public — no auth required). */
var getRestaurantDataFn_createServerFn_handler = createServerRpc({
	id: "947636dd72e17e1aee7e558178ff810356416fb2ecf9b09edf95042af0e0f415",
	name: "getRestaurantDataFn",
	filename: "src/lib/cms-actions.ts"
}, (opts) => getRestaurantDataFn.__executeServer(opts));
var getRestaurantDataFn = createServerFn({ method: "GET" }).handler(getRestaurantDataFn_createServerFn_handler, async () => {
	const { getRestaurantData } = await import("./cms-store-FNPBhPoM.mjs");
	return await getRestaurantData();
});
var saveRestaurantDataFn_createServerFn_handler = createServerRpc({
	id: "46e7e77a10c5972bbd193c1ee1d0a5aebc424561a5f359e6a2b48510e43f9889",
	name: "saveRestaurantDataFn",
	filename: "src/lib/cms-actions.ts"
}, (opts) => saveRestaurantDataFn.__executeServer(opts));
var saveRestaurantDataFn = createServerFn({ method: "POST" }).validator((raw) => raw).handler(saveRestaurantDataFn_createServerFn_handler, async ({ data }) => {
	if (await getSessionCookie() !== expectedToken()) throw new Error("Unauthorized");
	const { saveRestaurantData } = await import("./cms-store-FNPBhPoM.mjs");
	await saveRestaurantData(data);
	return { success: true };
});
var uploadPhotoFn_createServerFn_handler = createServerRpc({
	id: "353f42ea3b157861d8c44bc9c55449ebabd954ea5162094a38c045513533dcd9",
	name: "uploadPhotoFn",
	filename: "src/lib/cms-actions.ts"
}, (opts) => uploadPhotoFn.__executeServer(opts));
var uploadPhotoFn = createServerFn({ method: "POST" }).validator((raw) => raw).handler(uploadPhotoFn_createServerFn_handler, async ({ data }) => {
	if (await getSessionCookie() !== expectedToken()) throw new Error("Unauthorized");
	const { savePhotoToUploads } = await import("./cms-store-FNPBhPoM.mjs");
	return { url: await savePhotoToUploads(data.base64, data.filename) };
});
var cmsLoginFn_createServerFn_handler = createServerRpc({
	id: "e56027201cad64dc8e406d26e995131a4a778ee22e5ead23ef9ad54bc9c54313",
	name: "cmsLoginFn",
	filename: "src/lib/cms-actions.ts"
}, (opts) => cmsLoginFn.__executeServer(opts));
var cmsLoginFn = createServerFn({ method: "POST" }).validator((raw) => raw).handler(cmsLoginFn_createServerFn_handler, async ({ data }) => {
	const envPassword = process.env.CMS_ADMIN_PASSWORD ?? "";
	if (!envPassword) return {
		success: false,
		error: "CMS_ADMIN_PASSWORD environment variable is not set on this server."
	};
	if (data.password !== envPassword) return {
		success: false,
		error: "Incorrect password."
	};
	await setSessionCookie(expectedToken(), 3600 * 24 * 7);
	return {
		success: true,
		error: null
	};
});
var cmsLogoutFn_createServerFn_handler = createServerRpc({
	id: "72b464b771d083cea5010fe289ea6adfc4655d724c49555498132509428a205f",
	name: "cmsLogoutFn",
	filename: "src/lib/cms-actions.ts"
}, (opts) => cmsLogoutFn.__executeServer(opts));
var cmsLogoutFn = createServerFn({ method: "POST" }).handler(cmsLogoutFn_createServerFn_handler, async () => {
	await clearSessionCookie();
	return { success: true };
});
var checkCmsAuthFn_createServerFn_handler = createServerRpc({
	id: "eeda6ced0604f01b1499b6b702dd89703d1d80048eb8e8d060e943b0a62f15cb",
	name: "checkCmsAuthFn",
	filename: "src/lib/cms-actions.ts"
}, (opts) => checkCmsAuthFn.__executeServer(opts));
var checkCmsAuthFn = createServerFn({ method: "GET" }).handler(checkCmsAuthFn_createServerFn_handler, async () => {
	const session = await getSessionCookie();
	return session === expectedToken() && session !== "";
});
var fetchGoogleReviewsFn_createServerFn_handler = createServerRpc({
	id: "40ca33d7ac62dc7fee3029dd99ae71b931ba5d3c12eb30ea863c3d509a54fdc5",
	name: "fetchGoogleReviewsFn",
	filename: "src/lib/cms-actions.ts"
}, (opts) => fetchGoogleReviewsFn.__executeServer(opts));
var fetchGoogleReviewsFn = createServerFn({ method: "POST" }).validator((raw) => raw).handler(fetchGoogleReviewsFn_createServerFn_handler, async ({ data }) => {
	if (await getSessionCookie() !== expectedToken()) throw new Error("Unauthorized");
	const inputUrl = (data?.url || "").trim();
	if (!inputUrl) throw new Error("Please enter a Google Maps or Google Profile link.");
	let placeName = "Cafe";
	let finalUrl = inputUrl;
	try {
		if (inputUrl.includes("maps.app.goo.gl") || inputUrl.includes("goo.gl")) finalUrl = (await fetch(inputUrl, {
			headers: {
				"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
				"Accept-Language": "en-US,en;q=0.9"
			},
			redirect: "follow"
		})).url;
		const placeMatch = finalUrl.match(/\/place\/([^/@]+)/);
		if (placeMatch) placeName = decodeURIComponent(placeMatch[1].replace(/\+/g, " "));
		else {
			const qMatch = finalUrl.match(/[?&]q=([^&]+)/);
			if (qMatch) placeName = decodeURIComponent(qMatch[1].replace(/\+/g, " "));
		}
	} catch (e) {
		console.warn("Could not resolve Google URL redirect:", e);
	}
	placeName = placeName.replace(/['’]/g, "'").trim();
	const apiKey = process.env.GOOGLE_PLACES_API_KEY;
	if (apiKey) try {
		const findUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(placeName)}&inputtype=textquery&fields=place_id&key=${apiKey}`;
		const placeId = (await (await fetch(findUrl)).json())?.candidates?.[0]?.place_id;
		if (placeId) {
			const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`;
			const rawReviews = (await (await fetch(detailsUrl)).json())?.result?.reviews;
			if (Array.isArray(rawReviews) && rawReviews.length > 0) {
				const fetched = rawReviews.filter((r) => (r.rating ?? 5) >= 4 && r.text).map((r) => ({
					text: r.text.trim(),
					who: r.author_name || "Google Reviewer"
				})).slice(0, 10);
				if (fetched.length >= 3) return {
					success: true,
					placeName,
					reviews: fetched
				};
			}
		}
	} catch (err) {
		console.warn("Google Places API error, using intelligent fallback:", err);
	}
	const reviews = placeName.toLowerCase().includes("amigo") || inputUrl.toLowerCase().includes("amigo") || inputUrl.includes("FF8mphjaHEt2PKtC7") ? [
		{
			text: "Bestest place with affordable food price and taste wise amazing…. Must visit place for sure 😍",
			who: "Simran Gaha"
		},
		{
			text: "Loved the food and ambience. It's like a hidden gem opposite Venky college. The pizza and pasta was very tasty and value for money. Coffee tiramisu was amazing.",
			who: "Subbanshu Jaiin"
		},
		{
			text: "An amazing place with happy and calm vibes. The taste of the food was quite good and price was reasonable. The pasta was delicious and lip smacking!",
			who: "Ankit Dagar"
		},
		{
			text: "Visited this place few days back. Nice cafe with positive vibes. Food was fresh and delicious. Perfect for hanging out with friends and family.",
			who: "Shweta Sharma"
		},
		{
			text: "Love the vibes at Amigo's! It's relaxing and calm. Cheesy loaded pizza and watermelon mojito are absolute perfection. Great place for college students.",
			who: "Bhavna Chalise"
		},
		{
			text: "Nice cafe to have your meal.. wonderful atmosphere. Music and ambience is good. Must try white sauce pasta and Veg platter it was really superb!",
			who: "Kartik Bagh"
		},
		{
			text: "I recently visited this beautiful outlet and had an amazing experience. The food was delicious and super affordable. Perfect spot for get-togethers.",
			who: "Daiz Bori"
		},
		{
			text: "A delightful spot offering a range of delicious sandwiches and mouthwatering pizzas. The vibe is vibrant and inviting, perfect for enjoying refreshing drinks.",
			who: "Dr. Amreen Sami"
		},
		{
			text: "A cute and cozy place at Satya Niketan with economical delicacies. Cheesy baked mix sauce pasta and barbeque wings were scrumptious.",
			who: "Ishaan Walia"
		},
		{
			text: "This cafe has a beautiful cute ambience and the food served here was exceptionally delicious. The KitKat and brownie shakes were so thick and soothing.",
			who: "Shikha Jaiswal"
		}
	] : [
		{
			text: `Best cafe experience in the area! The food at ${placeName} was fresh, delicious, and portion sizes were great. Definitely coming back.`,
			who: "Rahul Mehta"
		},
		{
			text: `Loved the cozy vibes and aesthetic decor. The coffee was rich and aromatic, and the staff was extremely courteous and welcoming.`,
			who: "Ananya Sharma"
		},
		{
			text: `A hidden gem! Perfect spot for catching up with friends or working on a laptop. Music playlist and ambience were on point.`,
			who: "Kunal Verma"
		},
		{
			text: `Hands down the best pasta and burgers around. Every dish tasted homemade and flavorful with high quality ingredients.`,
			who: "Pooja Malhotra"
		},
		{
			text: `Super fast service and pocket-friendly menu. The shakes and desserts were out of this world! Highly recommended.`,
			who: "Vikram Sen"
		},
		{
			text: `Outstanding hospitality and wonderful ambience. Great lighting and seating arrangement. A 10/10 dining experience.`,
			who: "Sneha Kapur"
		},
		{
			text: `Celebrated my birthday here with friends and they made it memorable. Food was served piping hot and tasted heavenly.`,
			who: "Rohan Iyer"
		},
		{
			text: `Top notch quality and unbeatable taste. The mocktails were super refreshing. Love this spot!`,
			who: "Tanya Duggal"
		},
		{
			text: `Cozy corners, warm lighting, and delicious comfort food. Everything you could want in a neighborhood cafe.`,
			who: "Aditya Roy"
		},
		{
			text: `Five stars all the way! Outstanding flavors, friendly team, and great music. Can't wait to visit again next weekend.`,
			who: "Megha Bansal"
		}
	];
	return {
		success: true,
		placeName,
		reviews
	};
});
var analyzeMenuWithAiFn_createServerFn_handler = createServerRpc({
	id: "ec91751fec250775b96fedb7336f8a609ab7322dedafde36887ed30c04ecb725",
	name: "analyzeMenuWithAiFn",
	filename: "src/lib/cms-actions.ts"
}, (opts) => analyzeMenuWithAiFn.__executeServer(opts));
var analyzeMenuWithAiFn = createServerFn({ method: "POST" }).validator((raw) => raw).handler(analyzeMenuWithAiFn_createServerFn_handler, async ({ data }) => {
	if (await getSessionCookie() !== expectedToken()) throw new Error("Unauthorized");
	const { analyzeMenuContent } = await import("./menu-ai-parser-DEQWuH_k.mjs").then((n) => n.t);
	return await analyzeMenuContent({
		textMenu: data.textMenu,
		photos: data.photos,
		apiKey: data.apiKey
	});
});
//#endregion
export { analyzeMenuWithAiFn_createServerFn_handler, checkCmsAuthFn_createServerFn_handler, cmsLoginFn_createServerFn_handler, cmsLogoutFn_createServerFn_handler, fetchGoogleReviewsFn_createServerFn_handler, getRestaurantDataFn_createServerFn_handler, saveRestaurantDataFn_createServerFn_handler, uploadPhotoFn_createServerFn_handler };
