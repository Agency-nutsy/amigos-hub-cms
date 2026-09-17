import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Route } from "./about-Db3bmcOU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-CN_IlO-C.js
var import_jsx_runtime = require_jsx_runtime();
function AboutPage() {
	const data = Route.useLoaderData();
	const { milestones, stats, pressQuote, pressAttribution, seoMeta } = data;
	const heroImage = data.storyTeaserPhoto || seoMeta?.about?.ogImage || "/photos/ai_interior.png";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-5 sm:px-8 pt-16 pb-12 grid md:grid-cols-12 gap-10 items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "md:col-span-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-script text-coral text-3xl",
						children: data.storyTeaserScriptLabel ? data.storyTeaserScriptLabel.replace(/→$/, "").trim() : "our whole deal"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 text-5xl md:text-6xl lg:text-7xl leading-[0.95]",
						children: data.storyTeaserPrefix ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							data.storyTeaserPrefix,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "marker-underline",
								children: data.storyTeaserH2?.[0] || ""
							}),
							",",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-coral",
								children: data.storyTeaserH2?.[1] || ""
							}),
							"."
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							"A tiny cafe",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"with a ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-coral",
								children: "very big"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "marker-underline",
								children: "crush"
							}),
							" on DU."
						] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-7 text-lg text-charcoal/80 max-w-xl leading-relaxed",
						children: data.storyTeaserBody || `${data.name} has been the unofficial canteen, study spot, breakup HQ, and birthday venue of Satya Niketan for over a decade. We're small on purpose.`
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "md:col-span-5 relative h-[420px]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 rounded-md overflow-hidden shadow-2xl rotate-[3deg] tape bg-slate-200",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: heroImage,
						alt: `${data.name} story`,
						className: "h-full w-full object-cover"
					})
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-charcoal text-cream py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-5xl px-5 sm:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-4xl md:text-5xl lg:text-6xl text-mustard",
					children: "A short history."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-14 relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 stripe-pillar -translate-x-1/2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-12",
						children: milestones.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `relative grid md:grid-cols-2 gap-6 items-start ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `pl-12 md:pl-0 ${i % 2 ? "md:text-left md:pl-12" : "md:text-right md:pr-12"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-display text-4xl md:text-5xl text-mustard",
											children: m.year
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-2xl mt-2",
											children: m.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-cream/70 mt-2 text-sm leading-relaxed max-w-md md:inline-block",
											children: m.body
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-4 md:left-1/2 top-2 -translate-x-1/2 h-4 w-4 rounded-full bg-coral border-4 border-charcoal" })
							]
						}, m.year))
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-7xl px-5 sm:px-8 py-24 grid grid-cols-2 md:grid-cols-4 gap-6 text-center",
			children: stats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-md bg-cream border-2 border-charcoal/15 p-6 hover:border-coral transition-colors",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-display text-4xl md:text-5xl text-coral",
					children: s.n
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 text-sm uppercase tracking-widest text-charcoal/70",
					children: s.l
				})]
			}, s.l))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-mustard text-ink py-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-5xl px-5 sm:px-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-script text-2xl text-coral",
						children: "said about us"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mt-2 text-3xl md:text-4xl lg:text-5xl",
						children: [
							"\"",
							pressQuote,
							"\""
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-ink/80",
						dangerouslySetInnerHTML: { __html: pressAttribution }
					})
				]
			})
		})
	] });
}
//#endregion
export { AboutPage as component };
