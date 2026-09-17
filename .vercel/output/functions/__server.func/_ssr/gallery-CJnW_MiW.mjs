import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Route } from "./gallery-BJzP_5ZZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gallery-CJnW_MiW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GalleryPage() {
	const data = Route.useLoaderData();
	const items = data.galleryPhotos || [];
	const [cat, setCat] = (0, import_react.useState)("all");
	const [zoom, setZoom] = (0, import_react.useState)(null);
	const homepageItems = (data.homepageGalleryPhotos || []).filter((src) => Boolean(src && src.trim().length > 0)).map((src, i) => ({
		src,
		cat: "ambience",
		caption: `Cafe moments #${i + 1}`
	}));
	const visible = cat === "all" ? [...homepageItems, ...items.filter((item) => !homepageItems.some((h) => h.src === item.src))] : items.filter((i) => i.cat === cat);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-5 sm:px-8 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-script text-coral text-3xl",
						children: "come look around"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-2 text-5xl md:text-6xl lg:text-7xl leading-[0.95]",
						children: ["The ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "marker-underline",
							children: "gallery."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-charcoal/70 text-lg",
						children: "All photos taken inside the cafe. No stock images, no styled shoots — just our regular Tuesday."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 flex flex-wrap gap-2",
				children: [
					"all",
					"ambience",
					"food",
					"drinks"
				].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setCat(c),
					className: `rounded-full px-4 py-2 text-sm font-medium border-2 capitalize transition-all ${cat === c ? "bg-charcoal text-cream border-charcoal" : "border-charcoal/20 hover:border-charcoal hover:bg-mustard"}`,
					children: c === "all" ? "Everything" : c
				}, c))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 columns-2 md:columns-3 lg:columns-4 gap-4 [column-fill:_balance]",
				children: [visible.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setZoom(p.src),
					className: "mb-4 group block w-full break-inside-avoid relative rounded-md overflow-hidden shadow-md hover:shadow-2xl transition-shadow",
					style: { transform: `rotate(${i % 2 ? .6 : -.6}deg)` },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: p.src,
						alt: p.caption,
						className: "w-full transition-transform duration-500 group-hover:scale-105"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute bottom-0 inset-x-0 bg-gradient-to-t from-charcoal/80 to-transparent text-cream p-3 text-sm font-script opacity-0 group-hover:opacity-100 transition-opacity",
						children: p.caption
					})]
				}, p.src + i)), visible.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-charcoal/60 italic",
					children: "No photos in this category yet — check back soon."
				})]
			}),
			zoom && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 bg-charcoal/90 backdrop-blur-sm z-[100] flex items-center justify-center p-6 cursor-zoom-out animate-[fade-up_.2s_ease-out]",
				onClick: () => setZoom(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: zoom,
					alt: "",
					className: "max-h-[90vh] max-w-[95vw] rounded-md shadow-2xl"
				})
			})
		]
	});
}
//#endregion
export { GalleryPage as component };
