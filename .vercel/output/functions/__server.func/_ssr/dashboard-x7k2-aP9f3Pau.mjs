import { N as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as checkCmsAuthFn, o as getRestaurantDataFn } from "./cms-actions-BwAGlJrB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-x7k2-aP9f3Pau.js
/**
* /dashboard-x7k2
*
* Password-gated CMS admin form.
*
* SECURITY MODEL:
*  - If restaurantData.isLocked === true → loader throws notFound() (404 for everyone)
*  - If not authed → renders LoginForm
*  - If authed → renders AdminForm with all editable fields
*
* To unlock a locked site: edit data/restaurant.json directly, set "isLocked": false.
* See CMS_README.md for full operator instructions.
*/
var $$splitComponentImporter = () => import("./dashboard-x7k2-BbddxySe.mjs");
var Route = createFileRoute("/dashboard-x7k2")({
	loader: async () => {
		const restaurantData = await getRestaurantDataFn();
		if (restaurantData.isLocked) throw notFound();
		return {
			restaurantData,
			isAuthed: await checkCmsAuthFn()
		};
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
