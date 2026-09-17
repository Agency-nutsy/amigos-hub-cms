import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as getRestaurantDataFn } from "./cms-actions-BwAGlJrB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gallery-BJzP_5ZZ.js
var $$splitComponentImporter = () => import("./gallery-CJnW_MiW.mjs");
var Route = createFileRoute("/gallery")({
	loader: async () => {
		return await getRestaurantDataFn();
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
