import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as getRestaurantDataFn } from "./cms-actions-BwAGlJrB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/menu-ClreXQx0.js
var $$splitComponentImporter = () => import("./menu-Cyc7Qekb.mjs");
var Route = createFileRoute("/menu")({
	loader: async () => {
		return await getRestaurantDataFn();
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
