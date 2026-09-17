import { N as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as checkCmsAuthFn, o as getRestaurantDataFn } from "./cms-actions-BwAGlJrB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-x7k2_.quick-DCwJ3jaS.js
var $$splitComponentImporter = () => import("./dashboard-x7k2_.quick-B4t4r1SQ.mjs");
var Route = createFileRoute("/dashboard-x7k2_/quick")({
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
