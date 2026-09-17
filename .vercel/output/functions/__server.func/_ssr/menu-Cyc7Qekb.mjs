import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Route } from "./menu-ClreXQx0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/menu-Cyc7Qekb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MenuPage() {
	const { menu } = Route.useLoaderData();
	const [active, setActive] = (0, import_react.useState)(menu[0]?.id ?? "");
	const isClicking = (0, import_react.useRef)(false);
	const pillContainerRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!menu[0]) return;
		setActive(menu[0].id);
	}, [menu]);
	(0, import_react.useEffect)(() => {
		const observer = new IntersectionObserver((entries) => {
			if (isClicking.current) return;
			let newActive = active;
			entries.forEach((entry) => {
				if (entry.isIntersecting) newActive = entry.target.id;
			});
			if (newActive !== active) {
				setActive(newActive);
				const activePill = document.getElementById(`pill-${newActive}`);
				if (activePill && pillContainerRef.current) {
					const container = pillContainerRef.current;
					const scrollLeft = activePill.offsetLeft - container.offsetWidth / 2 + activePill.offsetWidth / 2;
					container.scrollTo({
						left: scrollLeft,
						behavior: "smooth"
					});
				}
			}
		}, { rootMargin: "-20% 0px -70% 0px" });
		menu.forEach((cat) => {
			const el = document.getElementById(cat.id);
			if (el) observer.observe(el);
		});
		return () => observer.disconnect();
	}, [active, menu]);
	const handleNavClick = (id) => {
		isClicking.current = true;
		setActive(id);
		const activePill = document.getElementById(`pill-${id}`);
		if (activePill && pillContainerRef.current) {
			const container = pillContainerRef.current;
			const scrollLeft = activePill.offsetLeft - container.offsetWidth / 2 + activePill.offsetWidth / 2;
			container.scrollTo({
				left: scrollLeft,
				behavior: "smooth"
			});
		}
		const el = document.getElementById(id);
		if (el) {
			const y = el.getBoundingClientRect().top + window.scrollY - 100;
			window.scrollTo({
				top: y,
				behavior: "smooth"
			});
		}
		setTimeout(() => {
			isClicking.current = false;
		}, 1e3);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-5 sm:px-8 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center max-w-3xl mx-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-script text-coral text-3xl",
						children: "the menu board"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-2 text-5xl md:text-6xl lg:text-7xl leading-[0.95]",
						children: ["Everything ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "marker-underline",
							children: "we make."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-charcoal/70 text-lg",
						children: "Prices are pocket-friendly on purpose. Star marks the things our regulars order on autopilot."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs uppercase tracking-widest text-charcoal/50",
						children: "Prices are indicative · please confirm at the cafe"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: pillContainerRef,
				className: "mt-10 flex gap-2 overflow-x-auto no-scrollbar sticky top-20 sm:top-24 z-20 py-3 bg-cream/85 backdrop-blur-md -mx-5 px-5 sm:-mx-8 sm:px-8 border-y border-charcoal/10",
				children: menu.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					id: `pill-${c.id}`,
					onClick: () => handleNavClick(c.id),
					className: `whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium border-2 transition-all shrink-0 ${active === c.id ? "bg-charcoal text-cream border-charcoal" : "border-charcoal/20 hover:border-charcoal hover:bg-mustard"}`,
					children: c.label
				}, c.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-14 space-y-20",
				children: menu.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					id: cat.id,
					className: "scroll-mt-28",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4 mb-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl md:text-4xl lg:text-5xl",
							children: cat.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 h-1 stripe-pillar rounded-full" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid md:grid-cols-2 gap-x-10 gap-y-6",
						children: cat.items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "group flex items-baseline gap-4 py-3 border-b border-dashed border-charcoal/20 hover:border-coral transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `${it.veg !== false ? "veg-dot" : "nonveg-dot"} translate-y-1 shrink-0` }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-baseline gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-xl font-display tracking-tight",
											children: it.name
										}), it.star && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs uppercase tracking-widest bg-mustard text-ink px-2 py-0.5 rounded-sm",
											children: "Bestseller"
										})]
									}), it.desc && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-charcoal/70 mt-1",
										children: it.desc
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-xl whitespace-nowrap",
									children: it.price
								})
							]
						}, it.name))
					})]
				}, cat.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-20 rounded-md bg-charcoal text-cream p-8 md:p-12 grid md:grid-cols-[2fr_1fr] gap-6 items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-script text-mustard text-2xl",
						children: "psst — birthday people"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-3xl mt-1",
						children: "Want the balloon wall treatment?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-cream/80 mt-3 text-sm leading-relaxed",
						children: "We do budget birthday setups, group bookings, and post-exam blowouts. Tell us what you're celebrating."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/contact",
					className: "rounded-full bg-mustard text-ink px-6 py-3 font-medium text-center hover:bg-coral hover:text-cream transition-colors w-fit md:justify-self-end",
					children: "Plan it with us →"
				})]
			})
		]
	});
}
//#endregion
export { MenuPage as component };
