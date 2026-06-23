import { o as __toESM } from "../_runtime.mjs";
import { t as photos } from "./photos-B6f4nZtu.mjs";
import { n as require_react, r as require_jsx_runtime, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { c as HeadContent, d as Outlet, f as lazyRouteComponent, g as useRouter, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { i as Instagram, n as MessageCircle, r as MapPin, t as Phone } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-ZNlIRXbd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-ChpIfkgh.css";
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
var links = [
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
function SiteNav() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const handleNavClick = (e, path) => {
		e.preventDefault();
		setOpen(false);
		window.dispatchEvent(new CustomEvent("nav-click", { detail: { path } }));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-50 backdrop-blur-md bg-[color-mix(in_oklab,var(--cream)_82%,transparent)] border-b-2 border-charcoal/10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-5 sm:px-8 py-3 flex items-center justify-between gap-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					onClick: (e) => handleNavClick(e, "/"),
					className: "flex items-center group",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/logo.avif",
						alt: "Amigos Hub",
						className: "h-10 sm:h-12 w-auto object-contain drop-shadow-md"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "hidden md:flex items-center gap-7 text-sm font-medium",
					children: [links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: l.to,
						onClick: (e) => handleNavClick(e, l.to),
						className: "relative py-1 hover:text-coral transition-colors [&.active]:text-coral",
						activeProps: { className: "active" },
						activeOptions: { exact: l.to === "/" },
						children: [l.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-0 right-0 -bottom-0.5 h-[3px] bg-mustard origin-left scale-x-0 transition-transform duration-300 group-[.active]:scale-x-100 hover:scale-x-100" })]
					}, l.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contact",
						onClick: (e) => handleNavClick(e, "/contact"),
						className: "rounded-full bg-charcoal text-cream px-4 py-2 text-sm font-medium hover:bg-coral transition-colors",
						children: "Book a table"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-charcoal/20",
					"aria-label": "Menu",
					onClick: () => setOpen((s) => !s),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block w-5 h-0.5 bg-ink relative before:content-[''] before:absolute before:-top-1.5 before:left-0 before:right-0 before:h-0.5 before:bg-ink after:content-[''] after:absolute after:top-1.5 after:left-0 after:right-0 after:h-0.5 after:bg-ink" })
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "md:hidden border-t border-charcoal/10 bg-cream",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-5 py-3 flex flex-col gap-2",
				children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: l.to,
					onClick: (e) => handleNavClick(e, l.to),
					className: "py-2 text-base font-medium [&.active]:text-coral",
					activeProps: { className: "active" },
					activeOptions: { exact: l.to === "/" },
					children: l.label
				}, l.to))
			})
		})]
	});
}
function SiteFooter() {
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-display text-3xl leading-tight",
								children: ["Amigos ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-mustard",
									children: "Hub"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-script text-2xl text-mustard mt-2",
								children: "since 2014"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-cream/70 max-w-sm text-sm leading-relaxed",
								children: "A tiny, loud, plant-strung corner of Satya Niketan that has been feeding DU South Campus on a student budget for over a decade."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex items-center gap-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "https://www.instagram.com/amigoshub.india/",
										target: "_blank",
										rel: "noreferrer",
										"aria-label": "Instagram",
										className: "bg-cream/10 p-3 rounded-full hover:bg-mustard hover:text-ink transition-colors text-cream/80",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "w-5 h-5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "https://maps.app.goo.gl/FF8mphjaHEt2PKtC7",
										target: "_blank",
										rel: "noreferrer",
										"aria-label": "Google Maps",
										className: "bg-cream/10 p-3 rounded-full hover:bg-mustard hover:text-ink transition-colors text-cream/80",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-5 h-5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "tel:+919999739766",
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-cream/80 leading-relaxed",
							children: [
								"96, 1st, Satya Niketan, opposite Venkateshwar college",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Moti Bagh II, New Delhi, Delhi 110021"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-cream/80 mt-3",
							children: "Open daily · 10 AM – 10:30 PM"
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
					" Amigos Hub · Made with chai & late nights in Satya Niketan"
				]
			})
		]
	});
}
function FloatingWidgets() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed bottom-6 right-6 z-[90] flex flex-col gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: "https://maps.app.goo.gl/FF8mphjaHEt2PKtC7",
			target: "_blank",
			rel: "noreferrer",
			className: "flex items-center justify-center w-14 h-14 bg-charcoal text-cream rounded-full shadow-lg hover:scale-110 transition-transform hover:bg-mustard hover:text-charcoal",
			"aria-label": "Get Directions",
			title: "Get Directions",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { size: 28 })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: "https://wa.me/919999739766",
			target: "_blank",
			rel: "noreferrer",
			className: "flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 transition-transform hover:bg-[#1ebe5d]",
			"aria-label": "Chat on WhatsApp",
			title: "Chat on WhatsApp",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { size: 28 })
		})]
	});
}
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
var Route$5 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Amigos Hub — Satya Niketan's loudest, friendliest cafe since 2014" },
			{
				name: "description",
				content: "Burgers, shakes, mojitos and momos in the heart of DU South Campus. Graffiti walls, fairy lights, and pocket-friendly comfort food since 2014."
			},
			{
				name: "author",
				content: "Amigos Hub"
			},
			{
				property: "og:title",
				content: "Amigos Hub Cafe · Satya Niketan"
			},
			{
				property: "og:description",
				content: "DU South Campus's beloved hangout — burgers, shakes, momos & mojitos since 2014."
			},
			{
				property: "og:type",
				content: "website"
			},
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
	}),
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
function GlobalLoadingScreen() {
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
						src: "/logo.avif",
						alt: "Amigos Hub Logo",
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
					children: "Amigos Hub"
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
						"warming up the grill...",
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
	const { queryClient } = Route$5.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobalLoadingScreen, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleTransition, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-screen flex-col bg-charcoal",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 flex flex-col bg-cream",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingWidgets, {})
		]
	});
}
var $$splitComponentImporter$4 = () => import("./menu-CZP-qzSK.mjs");
var Route$4 = createFileRoute("/menu")({
	head: () => ({ meta: [
		{ title: "Menu · Amigos Hub Satya Niketan" },
		{
			name: "description",
			content: "Burgers, pizza, pasta, momos, shakes, mojitos, shawarma & coffee — the full Amigos Hub menu. Pocket-friendly comfort food from DU South Campus's favourite cafe since 2014."
		},
		{
			property: "og:title",
			content: "Amigos Hub · Menu"
		},
		{
			property: "og:description",
			content: "The full Amigos Hub menu — burgers, shakes, momos, mojitos & more."
		},
		{
			property: "og:image",
			content: photos.drinkPink
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./gallery-BC3s_RSs.mjs");
var Route$3 = createFileRoute("/gallery")({
	head: () => ({ meta: [
		{ title: "Gallery · Amigos Hub Cafe Satya Niketan" },
		{
			name: "description",
			content: "Real photos of Amigos Hub — the graffiti walls, fairy lights, sticky-note wishes wall, our food, our drinks, and the crowd that makes it all happen."
		},
		{
			property: "og:title",
			content: "Gallery · Amigos Hub"
		},
		{
			property: "og:image",
			content: photos.stickyWall
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./contact-DE6L5w8F.mjs");
var Route$2 = createFileRoute("/contact")({
	head: () => ({ meta: [
		{ title: "Contact & Reservations · Amigos Hub Satya Niketan" },
		{
			name: "description",
			content: "Find Amigos Hub in Satya Niketan, opposite Sri Venkateshwara College. Call us, book a table, or plan a budget birthday."
		},
		{
			property: "og:title",
			content: "Visit Amigos Hub"
		},
		{
			property: "og:image",
			content: photos.ambience2
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./about-x1Wx-qc-.mjs");
var Route$1 = createFileRoute("/about")({
	head: () => ({ meta: [
		{ title: "About · Amigos Hub · A Satya Niketan Original Since 2014" },
		{
			name: "description",
			content: "Eleven years of feeding DU South Campus on a student budget. The story of a tiny first-floor cafe in Satya Niketan that became everyone's third place."
		},
		{
			property: "og:title",
			content: "About Amigos Hub"
		},
		{
			property: "og:description",
			content: "11+ years, graffiti walls, fairy lights, and a generation of DU students."
		},
		{
			property: "og:image",
			content: photos.ambience1
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./routes-D2Z_ObEE.mjs");
var Route = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Amigos Hub · Satya Niketan's loudest, friendliest cafe" },
		{
			name: "description",
			content: "Burgers, shakes, mojitos & momos in Satya Niketan since 2014. Graffiti walls, fairy lights, pocket-friendly menus, and the DU South Campus crowd."
		},
		{
			property: "og:title",
			content: "Amigos Hub Cafe · Satya Niketan"
		},
		{
			property: "og:description",
			content: "DU South Campus's beloved hangout — since 2014."
		},
		{
			property: "og:image",
			content: photos.crowd
		},
		{
			property: "twitter:image",
			content: photos.crowd
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var MenuRoute = Route$4.update({
	id: "/menu",
	path: "/menu",
	getParentRoute: () => Route$5
});
var GalleryRoute = Route$3.update({
	id: "/gallery",
	path: "/gallery",
	getParentRoute: () => Route$5
});
var ContactRoute = Route$2.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$5
});
var AboutRoute = Route$1.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$5
});
var rootRouteChildren = {
	IndexRoute: Route.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$5
	}),
	AboutRoute,
	ContactRoute,
	GalleryRoute,
	MenuRoute
};
var routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
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
