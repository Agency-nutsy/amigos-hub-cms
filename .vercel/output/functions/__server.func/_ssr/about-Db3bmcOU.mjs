import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as getRestaurantDataFn } from "./cms-actions-BwAGlJrB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-Db3bmcOU.js
var $$splitComponentImporter = () => import("./about-CN_IlO-C.mjs");
var Route = createFileRoute("/about")({
	loader: async () => {
		return await getRestaurantDataFn();
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
