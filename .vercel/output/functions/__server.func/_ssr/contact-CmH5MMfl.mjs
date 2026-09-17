import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as getRestaurantDataFn } from "./cms-actions-BwAGlJrB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-CmH5MMfl.js
var $$splitComponentImporter = () => import("./contact-CcDvqOAe.mjs");
var Route = createFileRoute("/contact")({
	loader: async () => {
		return await getRestaurantDataFn();
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
