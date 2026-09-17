import { o as __toESM } from "../_runtime.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useRouterState, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as getRestaurantDataFn } from "./cms-actions-BwAGlJrB.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Route$1 } from "./about-Db3bmcOU.mjs";
import { t as defaultRestaurantData } from "./restaurant-data-CS6Zqjj-.mjs";
import { t as Route$2 } from "./contact-CmH5MMfl.mjs";
import { t as Route$3 } from "./dashboard-x7k2-aP9f3Pau.mjs";
import { t as Route$4 } from "./dashboard-x7k2_.quick-DCwJ3jaS.mjs";
import { m as MapPin, p as MessageCircle, u as Phone, y as Instagram } from "../_libs/lucide-react.mjs";
import { t as Route$5 } from "./gallery-BJzP_5ZZ.mjs";
import { t as Route$6 } from "./menu-ClreXQx0.mjs";
import { t as Route$7 } from "./routes-Dbt018uu.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DNfPO9f4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-B0C6W3Nd.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
var navLinks = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/menu",
		label: "Menu"
	},
	{
		to: "/about",
		label: "About"
	},
	{
		to: "/gallery",
		label: "Gallery"
	},
	{
		to: "/contact",
		label: "Contact"
	}
];
function SiteNav({ name, logoUrl }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const handleNavClick = (e, path) => {
		e.preventDefault();
		setOpen(false);
		window.dispatchEvent(new CustomEvent("nav-click", { detail: { path } }));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "fixed top-3 sm:top-4 inset-x-0 z-50 px-3 sm:px-6 pointer-events-none transition-all",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] max-w-7xl backdrop-blur-xl bg-[color-mix(in_oklab,var(--cream)_78%,transparent)] border border-charcoal/15 shadow-[0_10px_30px_rgba(31,30,29,0.08),0_1px_2px_rgba(255,255,255,0.7)_inset] rounded-full px-5 sm:px-8 py-2 sm:py-2.5 flex items-center justify-between gap-6 pointer-events-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					onClick: (e) => handleNavClick(e, "/"),
					className: "flex items-center gap-3 group shrink-0",
					children: logoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: logoUrl,
						alt: name,
						className: "h-10 sm:h-12 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-200"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg sm:text-xl font-bold tracking-tight text-charcoal",
						children: name
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-charcoal/90",
					children: [navLinks.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: l.to,
						onClick: (e) => handleNavClick(e, l.to),
						className: "relative py-1 hover:text-coral transition-colors [&.active]:text-coral font-medium",
						activeProps: { className: "active" },
						activeOptions: { exact: l.to === "/" },
						children: [l.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-0 right-0 -bottom-0.5 h-[2px] bg-coral rounded-full origin-left scale-x-0 transition-transform duration-300 group-[.active]:scale-x-100 hover:scale-x-100" })]
					}, l.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contact",
						onClick: (e) => handleNavClick(e, "/contact"),
						className: "rounded-full bg-charcoal text-cream px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium hover:bg-coral transition-all duration-200 shadow-sm hover:shadow hover:-translate-y-0.5",
						children: "Book a table"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full bg-charcoal/5 border border-charcoal/15 text-charcoal hover:bg-charcoal/10 transition-colors",
					"aria-label": "Toggle menu",
					onClick: () => setOpen((s) => !s),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block w-5 h-0.5 bg-charcoal relative before:content-[''] before:absolute before:-top-1.5 before:left-0 before:right-0 before:h-0.5 before:bg-charcoal after:content-[''] after:absolute after:top-1.5 after:left-0 after:right-0 after:h-0.5 after:bg-charcoal transition-all" })
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "md:hidden mt-2 mx-auto w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] max-w-[96rem] rounded-3xl border border-charcoal/15 bg-[color-mix(in_oklab,var(--cream)_92%,transparent)] backdrop-blur-2xl shadow-2xl p-4 pointer-events-auto animate-in fade-in slide-in-from-top-2 duration-200",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-1.5",
				children: [navLinks.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: l.to,
					onClick: (e) => handleNavClick(e, l.to),
					className: "px-4 py-3 rounded-full text-base font-medium text-charcoal hover:bg-charcoal/10 [&.active]:bg-charcoal/10 [&.active]:text-coral transition-colors",
					activeProps: { className: "active" },
					activeOptions: { exact: l.to === "/" },
					children: l.label
				}, l.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/contact",
					onClick: (e) => handleNavClick(e, "/contact"),
					className: "mt-2 rounded-full bg-charcoal text-cream text-center py-3 text-base font-medium hover:bg-coral transition-colors shadow",
					children: "Book a table"
				})]
			})
		})]
	});
}
function SiteFooter({ name, logoUrl, footerTagline, footerBody, addressShort, address, hoursShort, hours, phone, socialLinks }) {
	const trimmedName = name?.trim() || "Cafe Name";
	const nameParts = trimmedName.split(" ");
	const nameLast = nameParts.length > 1 ? nameParts.pop() ?? "" : "";
	const nameFirst = nameParts.length > 0 ? nameParts.join(" ") : trimmedName;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-24 bg-charcoal text-cream",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 stripe-pillar" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-5 sm:px-8 py-14 grid gap-12 md:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-2",
						children: [
							logoUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: logoUrl,
								alt: name,
								className: "h-12 w-auto object-contain mb-4 drop-shadow-md"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-display text-3xl leading-tight",
								children: [
									nameFirst,
									" ",
									nameLast && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-mustard",
										children: nameLast
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-script text-2xl text-mustard mt-2",
								children: footerTagline
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-cream/70 max-w-sm text-sm leading-relaxed",
								children: footerBody
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex items-center gap-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: socialLinks.instagram,
										target: "_blank",
										rel: "noreferrer",
										"aria-label": "Instagram",
										className: "bg-cream/10 p-3 rounded-full hover:bg-mustard hover:text-ink transition-colors text-cream/80",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "w-5 h-5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: socialLinks.maps,
										target: "_blank",
										rel: "noreferrer",
										"aria-label": "Google Maps",
										className: "bg-cream/10 p-3 rounded-full hover:bg-mustard hover:text-ink transition-colors text-cream/80",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-5 h-5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: `tel:${phone?.replace(/[^+0-9]/g, "") || phone}`,
										"aria-label": "Phone",
										className: "bg-cream/10 p-3 rounded-full hover:bg-mustard hover:text-ink transition-colors text-cream/80",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "w-5 h-5" })
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-mustard text-sm uppercase tracking-widest mb-3",
							children: "Visit"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-cream/80 leading-relaxed whitespace-pre-line",
							children: addressShort || address
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-cream/80 mt-3",
							children: hoursShort || hours
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-mustard text-sm uppercase tracking-widest mb-3",
						children: "Wander"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2 text-sm",
						children: [
							"/",
							"/menu",
							"/about",
							"/gallery",
							"/contact"
						].map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: p,
							className: "hover:text-coral transition-colors",
							children: [
								"Home",
								"Menu",
								"About",
								"Gallery",
								"Contact"
							][i]
						}) }, p))
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-cream/10 py-4 text-center text-xs text-cream/50",
				children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" ",
					name,
					" · Made with chai & late nights"
				]
			})
		]
	});
}
function FloatingWidgets({ mapsLink, whatsappNumber }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed bottom-6 right-6 z-[90] flex flex-col gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: mapsLink,
			target: "_blank",
			rel: "noreferrer",
			className: "flex items-center justify-center w-14 h-14 bg-charcoal text-cream rounded-full shadow-lg hover:scale-110 transition-transform hover:bg-mustard hover:text-charcoal",
			"aria-label": "Get Directions",
			title: "Get Directions",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { size: 28 })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: `https://wa.me/${whatsappNumber}`,
			target: "_blank",
			rel: "noreferrer",
			className: "flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 transition-transform hover:bg-[#1ebe5d]",
			"aria-label": "Chat on WhatsApp",
			title: "Chat on WhatsApp",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { size: 28 })
		})]
	});
}
var CMS_PATH = "/dashboard-x7k2";
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route = createRootRouteWithContext()({
	loader: async () => {
		try {
			return await getRestaurantDataFn();
		} catch {
			return { ...defaultRestaurantData };
		}
	},
	head: ({ match }) => {
		const data = match.loaderData;
		const meta = data?.seoMeta?.home ?? defaultRestaurantData.seoMeta.home;
		return {
			meta: [
				{ charSet: "utf-8" },
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1"
				},
				{ title: meta.title },
				{
					name: "description",
					content: meta.description
				},
				{
					name: "author",
					content: data?.name ?? defaultRestaurantData.name
				},
				{
					property: "og:title",
					content: meta.title
				},
				{
					property: "og:description",
					content: meta.description
				},
				{
					property: "og:type",
					content: "website"
				},
				...meta.ogImage ? [{
					property: "og:image",
					content: meta.ogImage
				}] : [],
				{
					name: "twitter:card",
					content: "summary"
				}
			],
			links: [
				{
					rel: "stylesheet",
					href: styles_default
				},
				{
					rel: "preconnect",
					href: "https://fonts.googleapis.com"
				},
				{
					rel: "preconnect",
					href: "https://fonts.gstatic.com",
					crossOrigin: "anonymous"
				},
				{
					rel: "stylesheet",
					href: "https://fonts.googleapis.com/css2?family=Bowlby+One&family=Caveat:wght@500;700&family=DM+Sans:wght@400;500;700&display=swap"
				}
			]
		};
	},
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function GlobalLoadingScreen({ name, logoUrl, loadingSubtext }) {
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 2800);
		return () => clearTimeout(timer);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { y: 0 },
		exit: {
			y: "-100%",
			transition: {
				duration: .8,
				ease: [
					.76,
					0,
					.24,
					1
				]
			}
		},
		className: "fixed inset-0 z-[100] bg-cream flex flex-col items-center justify-center overflow-hidden grain",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10 flex flex-col items-center text-center px-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					animate: { y: [
						0,
						-20,
						0
					] },
					transition: {
						repeat: Infinity,
						duration: 2,
						ease: "easeInOut"
					},
					className: "mb-6 drop-shadow-xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: logoUrl,
						alt: name,
						className: "h-32 sm:h-40 w-auto object-contain"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h1, {
					initial: {
						opacity: 0,
						scale: .8,
						y: 20
					},
					animate: {
						opacity: 1,
						scale: 1,
						y: 0
					},
					transition: {
						duration: .6,
						ease: "easeOut",
						delay: .2
					},
					className: "font-display text-5xl md:text-7xl text-charcoal tracking-tight uppercase",
					children: name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					transition: {
						delay: .8,
						duration: .5
					},
					className: "mt-6 font-script text-3xl text-coral flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-8 h-[3px] bg-coral/50 rounded-full animate-pulse" }),
						loadingSubtext || "warming up the grill...",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-8 h-[3px] bg-coral/50 rounded-full animate-pulse" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: { width: 0 },
					animate: { width: "240px" },
					transition: {
						duration: 2.2,
						ease: "easeInOut"
					},
					className: "mt-10 h-3 rounded-full stripe-pillar shadow-inner"
				})
			]
		})
	}, "loader") });
}
function CircleTransition() {
	const [phase, setPhase] = (0, import_react.useState)("idle");
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		const handleNav = (e) => {
			const { path } = e.detail;
			if (phase !== "idle") return;
			setPhase("closing");
			setTimeout(() => {
				window.scrollTo(0, 0);
				if (router.state.location.pathname !== path) router.navigate({ to: path });
				setPhase("opening");
				setTimeout(() => {
					setPhase("idle");
				}, 700);
			}, 600);
		};
		window.addEventListener("nav-click", handleNav);
		return () => window.removeEventListener("nav-click", handleNav);
	}, [router, phase]);
	if (phase === "idle") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[100] pointer-events-none",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			width: "100%",
			height: "100%",
			className: "absolute inset-0 block",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mask", {
				id: "holeMask",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					width: "100%",
					height: "100%",
					fill: "white"
				}), phase === "opening" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.circle, {
					cx: "50%",
					cy: "50%",
					fill: "black",
					initial: { r: 0 },
					animate: { r: "150vmax" },
					transition: {
						duration: .7,
						ease: [
							.76,
							0,
							.24,
							1
						]
					}
				})]
			}) }), phase === "closing" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.circle, {
				cx: "50%",
				cy: "50%",
				fill: "#FF6B6B",
				initial: { r: 0 },
				animate: { r: "150vmax" },
				transition: {
					duration: .6,
					ease: [
						.76,
						0,
						.24,
						1
					]
				}
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "100%",
				height: "100%",
				fill: "#FF6B6B",
				mask: "url(#holeMask)"
			})]
		})
	});
}
function RootComponent() {
	const { queryClient } = Route.useRouteContext();
	const data = Route.useLoaderData();
	if (useRouterState({ select: (s) => s.location.pathname }).startsWith(CMS_PATH)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobalLoadingScreen, {
				name: data.name,
				logoUrl: data.logoUrl,
				loadingSubtext: data.loadingSubtext
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleTransition, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-screen flex-col bg-cream text-charcoal",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {
						name: data.name,
						logoUrl: data.logoUrl
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "flex-1 pt-20 sm:pt-24",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {
						name: data.name,
						logoUrl: data.logoUrl,
						footerTagline: data.footerTagline,
						footerBody: data.footerBody,
						addressShort: data.addressShort,
						address: data.address,
						hoursShort: data.hoursShort,
						hours: data.hours,
						phone: data.phone,
						whatsappNumber: data.whatsappNumber,
						socialLinks: data.socialLinks
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingWidgets, {
				mapsLink: data.socialLinks.maps,
				whatsappNumber: data.whatsappNumber
			})
		]
	});
}
var MenuRoute = Route$6.update({
	id: "/menu",
	path: "/menu",
	getParentRoute: () => Route
});
var GalleryRoute = Route$5.update({
	id: "/gallery",
	path: "/gallery",
	getParentRoute: () => Route
});
var DashboardX7k2Route = Route$3.update({
	id: "/dashboard-x7k2",
	path: "/dashboard-x7k2",
	getParentRoute: () => Route
});
var ContactRoute = Route$2.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route
});
var AboutRoute = Route$1.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route
});
var rootRouteChildren = {
	IndexRoute: Route$7.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route
	}),
	AboutRoute,
	ContactRoute,
	DashboardX7k2Route,
	GalleryRoute,
	MenuRoute,
	DashboardX7k2QuickRoute: Route$4.update({
		id: "/dashboard-x7k2_/quick",
		path: "/dashboard-x7k2/quick",
		getParentRoute: () => Route
	})
};
var routeTree = Route._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
