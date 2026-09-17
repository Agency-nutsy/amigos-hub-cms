import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as getRestaurantDataFn } from "./cms-actions-BwAGlJrB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Dbt018uu.js
var $$splitComponentImporter = () => import("./routes-D9RyNXjY.mjs");
var Route = createFileRoute("/")({
	loader: async () => {
		return await getRestaurantDataFn();
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
