import { o as __toESM } from "../_runtime.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as getGoogleMapsEmbedUrl } from "./restaurant-data-CS6Zqjj-.mjs";
import { t as Route } from "./routes-Dbt018uu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D9RyNXjY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const data = Route.useLoaderData();
	const { heroLocationBadge, heroHeadline, heroHeadlineSince, heroSubcopy, heroStats, heroCollagePhotos, heroCollageAlts, heroCollageAnnotation, marqueeItems, storyTeaserPhoto, storyTeaserPhotoAlt, storyTeaserScriptLabel, storyTeaserPrefix, storyTeaserH2, storyTeaserBody, signatureDishes, reviews, address, hours, phone, priceRange, mapsEmbedQuery, socialLinks } = data;
	const displayMarquee = (0, import_react.useMemo)(() => {
		let dishes = [];
		if (data.marqueeDishes && data.marqueeDishes.length > 0) dishes = data.marqueeDishes.filter((d) => Boolean(d && d.trim().length > 0));
		if (dishes.length === 0 && data.marqueeItems && data.marqueeItems.length > 0) dishes = data.marqueeItems.filter((item) => Boolean(item && item.trim().length > 0 && item !== "★"));
		if (dishes.length === 0) dishes = [
			"KitKat Shake",
			"Steamy Momos",
			"Watermelon Mojito",
			"Brownie Fudge",
			"Cheesy Burgers"
		];
		const itemsWithStars = [];
		dishes.forEach((dish) => {
			itemsWithStars.push(dish.trim().toUpperCase());
			itemsWithStars.push("★");
		});
		return itemsWithStars;
	}, [data.marqueeDishes, data.marqueeItems]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-7xl px-5 sm:px-8 pt-6 pb-12 lg:pt-10 lg:pb-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid lg:grid-cols-12 gap-8 items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-7 fade-up",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 text-sm font-medium",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-coral animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "uppercase tracking-[0.2em] text-charcoal/70",
									children: heroLocationBadge
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mt-5 font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.88] tracking-tight",
								children: [
									heroHeadline[0],
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-coral",
										children: heroHeadline[1]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "marker-underline",
										children: heroHeadline[2]
									}),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-script text-sage text-[0.55em] inline-block wiggle",
										children: heroHeadlineSince
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-7 max-w-xl text-lg text-charcoal/80 leading-relaxed",
								children: heroSubcopy
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-wrap gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/menu",
									className: "group inline-flex items-center gap-2 rounded-full bg-charcoal text-cream px-6 py-3 font-medium hover:bg-coral transition-colors",
									children: ["Eat the menu", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"aria-hidden": true,
										className: "transition-transform group-hover:translate-x-1",
										children: "→"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/contact",
									className: "inline-flex items-center gap-2 rounded-full border-2 border-charcoal px-6 py-3 font-medium hover:bg-mustard transition-colors",
									children: "Find us / book a table"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-charcoal/70",
								children: heroStats.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s }, i))
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-5 relative h-[380px] sm:h-[440px] lg:h-[560px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute top-0 right-0 sm:right-4 w-40 sm:w-56 h-56 sm:h-72 rounded-md overflow-hidden shadow-xl rotate-[4deg] hover:rotate-0 transition-transform duration-500 tape",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: heroCollagePhotos[0],
									alt: heroCollageAlts[0],
									className: "h-full w-full object-cover"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute top-28 sm:top-32 left-0 w-48 sm:w-60 h-36 sm:h-44 rounded-md overflow-hidden shadow-xl -rotate-[5deg] hover:rotate-0 transition-transform duration-500 tape",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: heroCollagePhotos[1],
									alt: heroCollageAlts[1],
									className: "h-full w-full object-cover"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute bottom-0 right-0 w-52 sm:w-72 h-44 sm:h-56 rounded-md overflow-hidden shadow-2xl rotate-[2deg] hover:rotate-0 transition-transform duration-500 tape",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: heroCollagePhotos[2],
									alt: heroCollageAlts[2],
									className: "h-full w-full object-cover"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute bottom-16 left-8 hidden lg:block font-script text-sage text-2xl rotate-[-8deg]",
								children: heroCollageAnnotation
							})
						]
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute top-0 inset-x-0 flex justify-around opacity-80",
				children: Array.from({ length: 9 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "bulb -mt-2 text-amber-400",
					style: { animationDelay: `${i * .3}s` },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						width: "14",
						height: "22",
						viewBox: "0 0 14 22",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: "7",
							y1: "0",
							x2: "7",
							y2: "8",
							stroke: "currentColor",
							strokeWidth: "0.8"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
							cx: "7",
							cy: "14",
							rx: "6",
							ry: "7",
							fill: "#f5c45a"
						})]
					})
				}, i))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-mustard text-charcoal py-3.5 sm:py-4 border-y-2 border-charcoal overflow-hidden shadow-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex marquee-track whitespace-nowrap font-display text-xl sm:text-2xl font-black uppercase tracking-wider",
				children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-8 sm:gap-10 px-5 shrink-0 items-center",
					children: displayMarquee.map((w, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: w === "★" ? "text-charcoal/80 text-lg sm:text-xl font-sans" : "hover:text-coral transition-colors",
						children: w
					}, j))
				}, i))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-5 sm:px-8 py-24 grid md:grid-cols-12 gap-12 items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "md:col-span-5 relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-6 -left-6 w-24 h-24 stripe-pillar rounded-md -z-10" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: storyTeaserPhoto,
					alt: storyTeaserPhotoAlt,
					className: "rounded-md shadow-2xl w-full"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "md:col-span-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-script text-coral text-3xl",
						children: storyTeaserScriptLabel
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mt-2 text-4xl md:text-5xl lg:text-6xl leading-[0.95]",
						children: [
							storyTeaserPrefix || "Eleven years of",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "marker-underline",
								children: storyTeaserH2[0]
							}),
							" and",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-coral",
								children: [" ", storyTeaserH2[1]]
							}),
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-lg text-charcoal/80 leading-relaxed max-w-2xl",
						children: storyTeaserBody
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/about",
						className: "mt-7 inline-flex items-center gap-2 font-medium border-b-2 border-charcoal pb-1 hover:border-coral hover:text-coral transition-colors",
						children: "Read the full story →"
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-charcoal text-cream py-24 relative overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-5 sm:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col md:flex-row md:items-end md:justify-between gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-script text-mustard text-3xl",
						children: "the regulars know"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-4xl md:text-5xl lg:text-6xl mt-2",
						children: "What everybody orders."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/menu",
						className: "inline-flex items-center gap-2 rounded-full bg-mustard text-ink px-6 py-3 font-medium hover:bg-coral hover:text-cream transition-colors w-fit",
						children: "See the full menu →"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-14 grid grid-cols-2 lg:grid-cols-4 gap-6",
					children: (signatureDishes || []).slice(0, 4).map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: `group relative bg-cream text-ink rounded-md overflow-hidden shadow-xl transition-all duration-500 hover:-translate-y-2 hover:rotate-0 ${i % 2 === 0 ? "lg:translate-y-8 rotate-[-1.5deg]" : "rotate-[1.5deg]"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "aspect-[4/5] overflow-hidden bg-slate-200",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: s.img || "/photos/7.jpg",
								alt: s.name,
								className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-coral",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: s.veg ? "veg-dot" : "nonveg-dot" }),
										" ",
										s.tag || "Special"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-lg font-bold",
									children: s.price
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 text-lg leading-tight font-black",
								children: s.name
							})]
						})]
					}, s.name || i))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "py-24 relative overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-7xl px-5 sm:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-script text-sage text-3xl",
						children: "straight from the wishes wall"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mt-2 text-4xl md:text-5xl lg:text-6xl",
						children: [
							"Things people ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "marker-underline",
								children: "actually"
							}),
							" said."
						]
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-14 overflow-hidden py-10 -my-10 w-full relative",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex marquee-track w-max hover:[animation-play-state:paused]",
					style: { animationDuration: "60s" },
					children: Array.from({ length: 2 }).map((_, copyIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-6 shrink-0 pr-6",
						children: reviews.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "sticky-note p-6 rounded-sm w-[340px] shrink-0 whitespace-normal flex flex-col justify-between",
							style: { ["--rot"]: `${[
								-3,
								2,
								-1,
								3
							][i % 4]}deg` },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-script text-xl text-ink leading-snug",
								children: [
									"\"",
									r.text,
									"\""
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-6 text-xs uppercase tracking-widest text-ink/70",
								children: ["— ", r.who]
							})]
						}, `${copyIndex}-${i}`))
					}, copyIndex))
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-5 sm:px-8 py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between flex-wrap gap-4 mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-4xl md:text-5xl lg:text-6xl",
					children: "A peek inside."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/gallery",
					className: "font-medium border-b-2 border-charcoal pb-1 hover:text-coral hover:border-coral",
					children: "Full gallery →"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6",
				children: (() => {
					const photos = data.homepageGalleryPhotos && data.homepageGalleryPhotos.length > 0 ? data.homepageGalleryPhotos.filter(Boolean) : [
						"/photos/1.webp",
						"/photos/4.webp",
						"/photos/3.webp",
						"/photos/2.webp",
						"/photos/2.webp",
						"/photos/1.webp",
						"/photos/4.webp",
						"/photos/3.webp",
						"/photos/1.webp",
						"/photos/2.webp"
					];
					const radii = [
						"rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-md rounded-bl-md",
						"rounded-full",
						"rounded-3xl",
						"rounded-[2rem] md:rounded-[4rem]",
						"rounded-t-full rounded-b-xl",
						"rounded-2xl",
						"rounded-bl-[4rem] rounded-tr-[4rem] rounded-tl-xl rounded-br-xl",
						"rounded-full",
						"rounded-t-full rounded-b-xl",
						"rounded-[2rem] md:rounded-[3rem]"
					];
					const rotations = [
						"rotate-[-2deg]",
						"rotate-[3deg]",
						"rotate-[-1deg]",
						"rotate-[2deg]",
						"rotate-[-3deg]",
						"rotate-[1deg]",
						"rotate-[2deg]",
						"rotate-[-2deg]",
						"rotate-[1.5deg]",
						"rotate-[-1.5deg]"
					];
					return photos.slice(0, 10).map((src, i) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `group overflow-hidden border-2 border-charcoal bg-mustard shadow-[4px_4px_0px_#1a1a1a] hover:shadow-[6px_6px_0px_#f26b5b] hover:-translate-y-1 transition-all duration-300 ${i % 4 === 0 || i === 5 ? "row-span-2 aspect-[3/5]" : "aspect-square"} ${radii[i % radii.length]} ${rotations[i % rotations.length]}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src,
								alt: `Cafe vibe ${i + 1}`,
								className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-[-2deg] filter contrast-125 saturate-[1.1]"
							})
						}, i);
					});
				})()
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-cream border-t-2 border-charcoal/10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-5 sm:px-8 py-20 grid md:grid-cols-2 gap-10 items-stretch",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-script text-coral text-3xl",
						children: "come hang"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 text-4xl md:text-5xl lg:text-6xl",
						children: "Find the door with the fairy lights."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-8 space-y-4 text-charcoal/80",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-ink block",
								children: "Address"
							}), address] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-ink block",
								children: "Hours"
							}), hours] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-ink block",
								children: "Phone"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `tel:${phone?.replace(/[^+0-9]/g, "") || phone}`,
								className: "hover:text-coral transition-colors font-medium",
								children: phone
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: socialLinks.maps,
						target: "_blank",
						rel: "noreferrer",
						className: "mt-8 inline-flex items-center gap-2 rounded-full bg-charcoal text-cream px-6 py-3 font-medium hover:bg-coral transition-colors",
						children: "Open in Google Maps →"
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-md overflow-hidden shadow-2xl border-4 border-charcoal min-h-[380px]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
						title: `${data.name} location`,
						src: getGoogleMapsEmbedUrl(mapsEmbedQuery),
						className: "w-full h-full min-h-[380px]",
						loading: "lazy",
						referrerPolicy: "no-referrer-when-downgrade"
					})
				})]
			})
		})
	] });
}
//#endregion
export { Home as component };
