import { o as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-DE6L5w8F.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ContactPage() {
	const [sent, setSent] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-5 sm:px-8 py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-3xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-script text-coral text-3xl",
				children: "say hi"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "mt-2 text-6xl lg:text-7xl leading-[0.95]",
				children: ["Drop in. Or ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "marker-underline",
					children: "drop us a line."
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-12 grid lg:grid-cols-12 gap-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-7 space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-md overflow-hidden border-4 border-charcoal shadow-2xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
						title: "Amigos Hub on Google Maps",
						src: "https://www.google.com/maps?q=Amigos+Hub+Satya+Niketan&output=embed",
						className: "w-full h-[420px]",
						loading: "lazy",
						referrerPolicy: "no-referrer-when-downgrade"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid sm:grid-cols-2 gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-md bg-cream border-2 border-charcoal/15 p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-widest text-coral font-bold",
								children: "Address"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-charcoal",
								children: "96, 1st, Satya Niketan, opposite Venkateshwar college, Moti Bagh II, Satya Niketan, South Moti Bagh, New Delhi, Delhi, 110021"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-md bg-cream border-2 border-charcoal/15 p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-widest text-coral font-bold",
								children: "Hours"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-charcoal",
								children: "10:00 am – 10:30 pm every day"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-md bg-cream border-2 border-charcoal/15 p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-widest text-coral font-bold",
								children: "Phone"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "tel:+919999739766",
								className: "mt-2 block font-display text-2xl hover:text-coral",
								children: "+91 99997 39766"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-md bg-cream border-2 border-charcoal/15 p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-widest text-coral font-bold",
								children: "Follow"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex flex-wrap gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "https://www.instagram.com/amigoshub.india/",
									target: "_blank",
									rel: "noreferrer",
									className: "underline underline-offset-4 hover:text-coral",
									children: "Instagram"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "https://maps.app.goo.gl/FF8mphjaHEt2PKtC7",
									target: "_blank",
									rel: "noreferrer",
									className: "underline underline-offset-4 hover:text-coral",
									children: "Google Maps"
								})]
							})]
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-span-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative rounded-md bg-charcoal text-cream p-7 shadow-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-3 left-6 right-6 h-2 stripe-pillar rounded-sm" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl",
							children: "Reserve a table"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-cream/70 text-sm mt-2",
							children: "Tell us what's up — birthday, study group, casual hang. We'll text you back."
						}),
						sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 rounded-md bg-mustard text-ink p-5 font-script text-xl",
							children: "Got it! Sending your request to WhatsApp..."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "mt-6 grid gap-4",
							onSubmit: (e) => {
								e.preventDefault();
								const formData = new FormData(e.currentTarget);
								const name = formData.get("name");
								const phone = formData.get("phone");
								const when = formData.get("when");
								const guests = formData.get("guests");
								const message = formData.get("message");
								const text = `Hi Amigos Hub! 👋\n\nI would like to request a table reservation.\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Date & Time:* ${new Date(when).toLocaleString("en-IN", {
									weekday: "short",
									month: "short",
									day: "numeric",
									hour: "numeric",
									minute: "2-digit"
								})}\n*Guests:* ${guests}\n*Occasion/Message:* ${message ? message : "N/A"}\n\nPlease confirm if this is available. Thanks!`;
								const encodedText = encodeURIComponent(text);
								window.open(`https://wa.me/919999739766?text=${encodedText}`, "_blank");
								setSent(true);
							},
							children: [
								[{
									label: "Your name",
									type: "text",
									name: "name"
								}, {
									label: "Phone",
									type: "tel",
									name: "phone"
								}].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs uppercase tracking-widest text-mustard",
										children: f.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										required: true,
										type: f.type,
										name: f.name,
										className: "mt-1 w-full bg-transparent border-b-2 border-cream/30 focus:border-mustard outline-none py-2 text-cream placeholder:text-cream/30"
									})]
								}, f.name)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs uppercase tracking-widest text-mustard",
											children: "Date & time"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											required: true,
											type: "datetime-local",
											name: "when",
											className: "mt-1 w-full bg-transparent border-b-2 border-cream/30 focus:border-mustard outline-none py-2 text-cream"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs uppercase tracking-widest text-mustard",
											children: "Guests"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											required: true,
											type: "number",
											min: 1,
											max: 40,
											defaultValue: 4,
											name: "guests",
											className: "mt-1 w-full bg-transparent border-b-2 border-cream/30 focus:border-mustard outline-none py-2 text-cream"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs uppercase tracking-widest text-mustard",
										children: "What's the occasion?"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										name: "message",
										rows: 3,
										className: "mt-1 w-full bg-transparent border-b-2 border-cream/30 focus:border-mustard outline-none py-2 text-cream placeholder:text-cream/30",
										placeholder: "Birthday? Surprise? Just hungry?"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "mt-3 rounded-full bg-mustard text-ink px-6 py-3 font-medium hover:bg-coral hover:text-cream transition-colors",
									children: "Send it →"
								})
							]
						})
					]
				})
			})]
		})]
	});
}
//#endregion
export { ContactPage as component };
