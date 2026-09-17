import { o as __toESM } from "../_runtime.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as uploadPhotoFn, i as cmsLogoutFn, r as cmsLoginFn, s as saveRestaurantDataFn } from "./cms-actions-BwAGlJrB.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Route } from "./dashboard-x7k2-aP9f3Pau.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as cn, i as Textarea, n as Input, r as Label, t as Button } from "./textarea-U50uUx25.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/@radix-ui/react-switch+[...].mjs";
import { t as Root } from "../_libs/radix-ui__react-separator.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-x7k2-BbddxySe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = Switch$1.displayName;
var badgeVariants = cva("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
		secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
		destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
		outline: "text-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
var Separator = import_react.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	decorative,
	orientation,
	className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className),
	...props
}));
Separator.displayName = Root.displayName;
/**
* /dashboard-x7k2
*
* Password-gated CMS admin form.
*
* SECURITY MODEL:
*  - If restaurantData.isLocked === true → loader throws notFound() (404 for everyone)
*  - If not authed → renders LoginForm
*  - If authed → renders AdminForm with all editable fields
*
* To unlock a locked site: edit data/restaurant.json directly, set "isLocked": false.
* See CMS_README.md for full operator instructions.
*/
function DashboardPage() {
	const { restaurantData, isAuthed } = Route.useLoaderData();
	if (!isAuthed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginForm, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminForm, { initialData: restaurantData });
}
function LoginForm() {
	const navigate = useNavigate();
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		try {
			const result = await cmsLoginFn({ data: { password } });
			if (result.success) {
				navigate({ to: "/dashboard-x7k2" });
				window.location.reload();
			} else setError(result.error ?? "Login failed.");
		} catch (err) {
			setError("Server error. Please try again.");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-slate-950 flex items-center justify-center p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center mb-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "inline-block text-4xl mb-3",
							children: "🔐"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-bold text-white",
							children: "CMS Access"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-slate-400 text-sm mt-1",
							children: "Enter the admin password to continue"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "cms-password",
							className: "text-slate-300",
							children: "Password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "cms-password",
							type: "password",
							value: password,
							onChange: (e) => setPassword(e.target.value),
							placeholder: "Admin password",
							required: true,
							autoFocus: true,
							className: "mt-1 bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
						})] }),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-red-400 text-sm",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: loading,
							className: "w-full bg-blue-600 hover:bg-blue-500",
							children: loading ? "Checking..." : "Unlock CMS →"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center text-xs text-slate-600 mt-6",
					children: "Set CMS_ADMIN_PASSWORD env var to configure the password."
				})
			]
		})
	});
}
function FieldRow({ label, children, help }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				className: "text-slate-200 font-medium",
				children: label
			}),
			children,
			help && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-slate-500",
				children: help
			})
		]
	});
}
function SectionTitle({ children, autoGenerated }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3 border-b border-slate-700 pb-2 mb-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "text-lg font-semibold text-white",
			children
		}), autoGenerated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			variant: "outline",
			className: "text-amber-400 border-amber-400/50",
			children: "Auto-generated"
		})]
	});
}
function AddBtn({ onClick, label = "Add item" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		type: "button",
		variant: "outline",
		size: "sm",
		onClick,
		className: "border-dashed border-slate-600 text-slate-400 hover:text-white hover:border-slate-400",
		children: ["+ ", label]
	});
}
function RemoveBtn({ onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		type: "button",
		variant: "ghost",
		size: "sm",
		onClick,
		className: "text-red-400 hover:text-red-300 hover:bg-red-950 px-2 shrink-0",
		children: "✕"
	});
}
/** Upload a file and call onUrl with the resulting URL */
async function uploadFile(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = async (e) => {
			try {
				const base64 = e.target?.result;
				resolve((await uploadPhotoFn({ data: {
					base64,
					filename: file.name
				} })).url);
			} catch (err) {
				reject(err);
			}
		};
		reader.onerror = () => reject(/* @__PURE__ */ new Error("FileReader error"));
		reader.readAsDataURL(file);
	});
}
function PhotoUpload({ value, onChange, label }) {
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)(null);
	const inputRef = (0, import_react.useRef)(null);
	const handleFile = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setUploading(true);
		setErr(null);
		try {
			onChange(await uploadFile(file));
		} catch {
			setErr("Upload failed. Try again.");
		} finally {
			setUploading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [
			label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				className: "text-slate-200",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value,
						onChange: (e) => onChange(e.target.value),
						placeholder: "/photos/example.jpg or /uploads/uuid.webp",
						className: "bg-slate-900 border-slate-700 text-white flex-1 text-sm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						onClick: () => inputRef.current?.click(),
						disabled: uploading,
						className: "shrink-0 border-slate-600 text-slate-300 hover:text-white",
						children: uploading ? "Uploading…" : "Upload"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: inputRef,
						type: "file",
						accept: "image/*",
						className: "hidden",
						onChange: handleFile
					})
				]
			}),
			err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-red-400",
				children: err
			}),
			value && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: value,
				alt: "preview",
				className: "h-16 w-auto rounded border border-slate-700 object-cover"
			})
		]
	});
}
function AdminForm({ initialData }) {
	const navigate = useNavigate();
	const [form, setForm] = (0, import_react.useState)(initialData);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [saveMsg, setSaveMsg] = (0, import_react.useState)(null);
	const set = (0, import_react.useCallback)((key, value) => {
		setForm((f) => ({
			...f,
			[key]: value
		}));
	}, []);
	const setNested = (0, import_react.useCallback)((path, value) => {
		setForm((f) => {
			const copy = { ...f };
			let cur = copy;
			for (let i = 0; i < path.length - 1; i++) {
				cur[path[i]] = { ...cur[path[i]] };
				cur = cur[path[i]];
			}
			cur[path[path.length - 1]] = value;
			return copy;
		});
	}, []);
	const addItem = (0, import_react.useCallback)((key, item) => {
		setForm((f) => ({
			...f,
			[key]: [...f[key], item]
		}));
	}, []);
	const removeItem = (0, import_react.useCallback)((key, idx) => {
		setForm((f) => {
			const arr = [...f[key]];
			arr.splice(idx, 1);
			return {
				...f,
				[key]: arr
			};
		});
	}, []);
	const updateItem = (0, import_react.useCallback)((key, idx, value) => {
		setForm((f) => {
			const arr = [...f[key]];
			arr[idx] = value;
			return {
				...f,
				[key]: arr
			};
		});
	}, []);
	const handleSave = async () => {
		setSaving(true);
		setSaveMsg(null);
		try {
			const payload = {
				...form,
				autoGeneratedFields: []
			};
			await saveRestaurantDataFn({ data: payload });
			setForm(payload);
			setSaveMsg({
				ok: true,
				text: "Saved! Changes are live."
			});
		} catch (err) {
			setSaveMsg({
				ok: false,
				text: "Save failed. Are you still logged in?"
			});
		} finally {
			setSaving(false);
		}
	};
	const handleLogout = async () => {
		await cmsLogoutFn();
		navigate({ to: "/dashboard-x7k2" });
		window.location.reload();
	};
	const inputCls = "bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 text-sm";
	const textareaCls = "bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 text-sm resize-y";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-slate-950 text-white",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 z-10 bg-slate-900 border-b border-slate-800 px-6 py-3 flex items-center justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xl",
					children: "⚙️"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-bold text-white leading-none",
					children: "CMS"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-slate-400",
					children: form.name
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [
					saveMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `text-sm ${saveMsg.ok ? "text-green-400" : "text-red-400"}`,
						children: saveMsg.text
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: handleSave,
						disabled: saving,
						className: "bg-blue-600 hover:bg-blue-500",
						children: saving ? "Saving…" : "Save changes"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: handleLogout,
						className: "text-slate-400 hover:text-white",
						children: "Logout"
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-5xl mx-auto px-6 py-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "general",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsList, {
						className: "bg-slate-900 flex flex-wrap h-auto gap-1 mb-8",
						children: [
							"general",
							"hero",
							"social-seo",
							"about",
							"menu",
							"signatures",
							"reviews",
							"gallery",
							"lock"
						].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: t,
							className: "text-slate-400 data-[state=active]:text-white data-[state=active]:bg-slate-700 capitalize text-sm",
							children: t.replace("-", " / ")
						}, t))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "general",
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: "Identity" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid sm:grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
									label: "Restaurant name",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: form.name,
										onChange: (e) => set("name", e.target.value),
										className: inputCls
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
									label: "Founded year",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: form.foundedYear,
										onChange: (e) => set("foundedYear", e.target.value),
										className: inputCls
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
								label: "Tagline (short)",
								help: "Shown in page title",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.tagline,
									onChange: (e) => set("tagline", e.target.value),
									className: inputCls
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoUpload, {
								label: "Logo URL / upload",
								value: form.logoUrl,
								onChange: (url) => set("logoUrl", url)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "border-slate-800" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: "Contact" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
								label: "Full address (contact page)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									value: form.address,
									onChange: (e) => set("address", e.target.value),
									className: textareaCls,
									rows: 2
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
								label: "Short address (footer)",
								help: "Use newline for line break",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									value: form.addressShort,
									onChange: (e) => set("addressShort", e.target.value),
									className: textareaCls,
									rows: 2
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid sm:grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
									label: "Phone (display)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: form.phone,
										onChange: (e) => set("phone", e.target.value),
										className: inputCls,
										placeholder: "+91 99997 39766"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
									label: "WhatsApp number",
									help: "Digits only, with country code",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: form.whatsappNumber,
										onChange: (e) => set("whatsappNumber", e.target.value),
										className: inputCls,
										placeholder: "919999739766"
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid sm:grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
									label: "Hours (full)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: form.hours,
										onChange: (e) => set("hours", e.target.value),
										className: inputCls
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
									label: "Hours (short, footer)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: form.hoursShort,
										onChange: (e) => set("hoursShort", e.target.value),
										className: inputCls
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
								label: "Price range",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.priceRange,
									onChange: (e) => set("priceRange", e.target.value),
									className: inputCls
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
								label: "Google Maps embed query",
								help: "Used in iframe src: https://www.google.com/maps?q=THIS_VALUE&output=embed",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.mapsEmbedQuery,
									onChange: (e) => set("mapsEmbedQuery", e.target.value),
									className: inputCls
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "border-slate-800" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: "Footer" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid sm:grid-cols-2 gap-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
									label: "Footer tagline",
									help: "e.g. \"since 2014\"",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: form.footerTagline,
										onChange: (e) => set("footerTagline", e.target.value),
										className: inputCls
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
								label: "Footer body text",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									value: form.footerBody,
									onChange: (e) => set("footerBody", e.target.value),
									className: textareaCls,
									rows: 2
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "border-slate-800" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: "Marquee strip" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-slate-400",
								children: "Items shown in the scrolling marquee band. Use \"★\" for decorative stars."
							}),
							form.marqueeItems.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: item,
									onChange: (e) => {
										const arr = [...form.marqueeItems];
										arr[idx] = e.target.value;
										set("marqueeItems", arr);
									},
									className: inputCls
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RemoveBtn, { onClick: () => removeItem("marqueeItems", idx) })]
							}, idx)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddBtn, { onClick: () => addItem("marqueeItems", "New item") })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "hero",
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
								autoGenerated: form.autoGeneratedFields?.includes("hero"),
								children: "Hero Section"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
								label: "Location badge",
								help: "Small text next to pulsing dot. e.g. \"Satya Niketan · open till 10:30 PM\"",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.heroLocationBadge,
									onChange: (e) => set("heroLocationBadge", e.target.value),
									className: inputCls
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-slate-200",
										children: "Headline (3 lines)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-slate-500",
										children: "Line 1 = plain, Line 2 = coral colour, Line 3 = marker-underline"
									}),
									[
										0,
										1,
										2
									].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: form.heroHeadline[i],
										onChange: (e) => {
											const h = [...form.heroHeadline];
											h[i] = e.target.value;
											set("heroHeadline", h);
										},
										placeholder: `Line ${i + 1}`,
										className: inputCls
									}, i))
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
								label: "\"Since year\" script annotation",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.heroHeadlineSince,
									onChange: (e) => set("heroHeadlineSince", e.target.value),
									className: inputCls
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
								label: "Hero subtext paragraph",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									value: form.heroSubcopy,
									onChange: (e) => set("heroSubcopy", e.target.value),
									className: textareaCls,
									rows: 3
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-slate-200",
										children: "Hero stats (small pills below CTA)"
									}),
									form.heroStats.map((s, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: s,
											onChange: (e) => {
												const arr = [...form.heroStats];
												arr[idx] = e.target.value;
												set("heroStats", arr);
											},
											className: inputCls
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RemoveBtn, { onClick: () => removeItem("heroStats", idx) })]
									}, idx)),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddBtn, {
										onClick: () => addItem("heroStats", "New stat"),
										label: "Add stat"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "border-slate-800" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: "Collage Photos (3 images)" }),
							[
								0,
								1,
								2
							].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 p-4 bg-slate-900 rounded-lg",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm font-medium text-slate-300",
										children: ["Photo ", i + 1]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoUpload, {
										value: form.heroCollagePhotos[i],
										onChange: (url) => {
											const photos = [...form.heroCollagePhotos];
											photos[i] = url;
											set("heroCollagePhotos", photos);
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
										label: "Alt text",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: form.heroCollageAlts[i],
											onChange: (e) => {
												const alts = [...form.heroCollageAlts];
												alts[i] = e.target.value;
												set("heroCollageAlts", alts);
											},
											className: inputCls
										})
									})
								]
							}, i)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
								label: "Handwritten annotation on collage",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.heroCollageAnnotation,
									onChange: (e) => set("heroCollageAnnotation", e.target.value),
									className: inputCls
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "border-slate-800" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: "Story Teaser Section" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoUpload, {
								label: "Teaser photo",
								value: form.storyTeaserPhoto,
								onChange: (url) => set("storyTeaserPhoto", url)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
								label: "Teaser photo alt text",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.storyTeaserPhotoAlt,
									onChange: (e) => set("storyTeaserPhotoAlt", e.target.value),
									className: inputCls
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
								label: "Script label (top of teaser)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.storyTeaserScriptLabel,
									onChange: (e) => set("storyTeaserScriptLabel", e.target.value),
									className: inputCls
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-slate-200",
										children: "Headline parts (H2)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-slate-500",
										children: "Part 1 = marker-underline. Part 2 = coral colour."
									}),
									[0, 1].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: form.storyTeaserH2[i],
										onChange: (e) => {
											const h = [...form.storyTeaserH2];
											h[i] = e.target.value;
											set("storyTeaserH2", h);
										},
										placeholder: i === 0 ? "fairy lights" : "first-year crushes",
										className: inputCls
									}, i))
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
								label: "Teaser body paragraph",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									value: form.storyTeaserBody,
									onChange: (e) => set("storyTeaserBody", e.target.value),
									className: textareaCls,
									rows: 4
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "social-seo",
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: "Social Links" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
								label: "Instagram URL",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.socialLinks.instagram,
									onChange: (e) => setNested(["socialLinks", "instagram"], e.target.value),
									className: inputCls
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
								label: "Google Maps URL",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.socialLinks.maps,
									onChange: (e) => setNested(["socialLinks", "maps"], e.target.value),
									className: inputCls
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "border-slate-800" }),
							[
								"home",
								"menu",
								"about",
								"contact",
								"gallery"
							].map((page) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionTitle, {
										autoGenerated: form.autoGeneratedFields?.includes("seoMeta"),
										children: [
											"SEO — ",
											page.charAt(0).toUpperCase() + page.slice(1),
											" page"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
										label: "Page title",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: form.seoMeta[page].title,
											onChange: (e) => setNested([
												"seoMeta",
												page,
												"title"
											], e.target.value),
											className: inputCls
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
										label: "Meta description",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											value: form.seoMeta[page].description,
											onChange: (e) => setNested([
												"seoMeta",
												page,
												"description"
											], e.target.value),
											className: textareaCls,
											rows: 2
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoUpload, {
										label: "OG image",
										value: form.seoMeta[page].ogImage ?? "",
										onChange: (url) => setNested([
											"seoMeta",
											page,
											"ogImage"
										], url)
									})
								]
							}, page))
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "about",
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
								autoGenerated: form.autoGeneratedFields?.includes("milestones"),
								children: "Milestones (timeline)"
							}),
							form.milestones.map((m, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 bg-slate-900 rounded-lg space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
											variant: "outline",
											className: "text-slate-400 border-slate-700",
											children: ["#", idx + 1]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RemoveBtn, { onClick: () => removeItem("milestones", idx) })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid sm:grid-cols-2 gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
											label: "Year",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												value: m.year,
												onChange: (e) => updateItem("milestones", idx, {
													...m,
													year: e.target.value
												}),
												className: inputCls
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
											label: "Title",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												value: m.title,
												onChange: (e) => updateItem("milestones", idx, {
													...m,
													title: e.target.value
												}),
												className: inputCls
											})
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
										label: "Body",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											value: m.body,
											onChange: (e) => updateItem("milestones", idx, {
												...m,
												body: e.target.value
											}),
											className: textareaCls,
											rows: 2
										})
									})
								]
							}, idx)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddBtn, {
								onClick: () => addItem("milestones", {
									year: "2025",
									title: "New milestone",
									body: "Describe it here."
								}),
								label: "Add milestone"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "border-slate-800" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
								autoGenerated: form.autoGeneratedFields?.includes("stats"),
								children: "Stats (counter grid)"
							}),
							form.stats.map((s, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3 items-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: s.n,
										onChange: (e) => updateItem("stats", idx, {
											...s,
											n: e.target.value
										}),
										placeholder: "Number",
										className: "bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 text-sm w-28"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: s.l,
										onChange: (e) => updateItem("stats", idx, {
											...s,
											l: e.target.value
										}),
										placeholder: "Label",
										className: inputCls
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RemoveBtn, { onClick: () => removeItem("stats", idx) })
								]
							}, idx)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddBtn, {
								onClick: () => addItem("stats", {
									n: "0",
									l: "New stat"
								}),
								label: "Add stat"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "border-slate-800" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: "Press quote" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
								label: "Quote text",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.pressQuote,
									onChange: (e) => set("pressQuote", e.target.value),
									className: inputCls
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
								label: "Attribution",
								help: "HTML allowed e.g. As featured in <strong>Delhi Times</strong>",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.pressAttribution,
									onChange: (e) => set("pressAttribution", e.target.value),
									className: inputCls
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "menu",
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
								autoGenerated: form.autoGeneratedFields?.includes("menu"),
								children: "Menu categories"
							}),
							form.menu.map((cat, cIdx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
								className: "bg-slate-900 rounded-lg",
								open: cIdx === 0,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
									className: "flex items-center justify-between p-4 cursor-pointer select-none",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-medium text-white",
										children: [
											cat.label,
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-slate-400 text-sm",
												children: [
													"(",
													cat.items.length,
													" items)"
												]
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RemoveBtn, { onClick: () => removeItem("menu", cIdx) })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "px-4 pb-4 space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid sm:grid-cols-2 gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
												label: "Category ID",
												help: "URL-safe slug, no spaces",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													value: cat.id,
													onChange: (e) => {
														const arr = [...form.menu];
														arr[cIdx] = {
															...cat,
															id: e.target.value
														};
														set("menu", arr);
													},
													className: inputCls
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
												label: "Category label",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													value: cat.label,
													onChange: (e) => {
														const arr = [...form.menu];
														arr[cIdx] = {
															...cat,
															label: e.target.value
														};
														set("menu", arr);
													},
													className: inputCls
												})
											})]
										}),
										cat.items.map((item, iIdx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-3 bg-slate-800 rounded-md space-y-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-xs text-slate-400",
														children: ["Item ", iIdx + 1]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RemoveBtn, { onClick: () => {
														const arr = [...form.menu];
														const items = [...cat.items];
														items.splice(iIdx, 1);
														arr[cIdx] = {
															...cat,
															items
														};
														set("menu", arr);
													} })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid sm:grid-cols-2 gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														value: item.name,
														onChange: (e) => {
															const arr = [...form.menu];
															const items = [...cat.items];
															items[iIdx] = {
																...item,
																name: e.target.value
															};
															arr[cIdx] = {
																...cat,
																items
															};
															set("menu", arr);
														},
														placeholder: "Item name",
														className: inputCls
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														value: item.price,
														onChange: (e) => {
															const arr = [...form.menu];
															const items = [...cat.items];
															items[iIdx] = {
																...item,
																price: e.target.value
															};
															arr[cIdx] = {
																...cat,
																items
															};
															set("menu", arr);
														},
														placeholder: "₹150",
														className: inputCls
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													value: item.desc ?? "",
													onChange: (e) => {
														const arr = [...form.menu];
														const items = [...cat.items];
														items[iIdx] = {
															...item,
															desc: e.target.value
														};
														arr[cIdx] = {
															...cat,
															items
														};
														set("menu", arr);
													},
													placeholder: "Description (optional)",
													className: inputCls
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex gap-4 items-center flex-wrap",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
														className: "flex items-center gap-2 text-sm text-slate-300 cursor-pointer",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
															checked: item.veg !== false,
															onCheckedChange: (v) => {
																const arr = [...form.menu];
																const items = [...cat.items];
																items[iIdx] = {
																	...item,
																	veg: v
																};
																arr[cIdx] = {
																	...cat,
																	items
																};
																set("menu", arr);
															}
														}), "Vegetarian"]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
														className: "flex items-center gap-2 text-sm text-slate-300 cursor-pointer",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
															checked: !!item.star,
															onCheckedChange: (v) => {
																const arr = [...form.menu];
																const items = [...cat.items];
																items[iIdx] = {
																	...item,
																	star: v
																};
																arr[cIdx] = {
																	...cat,
																	items
																};
																set("menu", arr);
															}
														}), "Bestseller ⭐"]
													})]
												})
											]
										}, iIdx)),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddBtn, {
											onClick: () => {
												const arr = [...form.menu];
												arr[cIdx] = {
													...cat,
													items: [...cat.items, {
														name: "New item",
														price: "₹100",
														veg: true
													}]
												};
												set("menu", arr);
											},
											label: "Add item"
										})
									]
								})]
							}, cat.id)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddBtn, {
								onClick: () => addItem("menu", {
									id: `category-${Date.now()}`,
									label: "New Category",
									items: []
								}),
								label: "Add category"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "signatures",
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: "Signature dishes (homepage showcase)" }),
							form.signatureDishes.map((dish, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 bg-slate-900 rounded-lg space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
											variant: "outline",
											className: "text-slate-400 border-slate-700",
											children: ["#", idx + 1]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RemoveBtn, { onClick: () => removeItem("signatureDishes", idx) })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid sm:grid-cols-2 gap-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
												label: "Name",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													value: dish.name,
													onChange: (e) => updateItem("signatureDishes", idx, {
														...dish,
														name: e.target.value
													}),
													className: inputCls
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
												label: "Tag",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													value: dish.tag,
													onChange: (e) => updateItem("signatureDishes", idx, {
														...dish,
														tag: e.target.value
													}),
													className: inputCls
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
												label: "Price",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													value: dish.price,
													onChange: (e) => updateItem("signatureDishes", idx, {
														...dish,
														price: e.target.value
													}),
													className: inputCls
												})
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoUpload, {
										label: "Dish photo",
										value: dish.img,
										onChange: (url) => updateItem("signatureDishes", idx, {
											...dish,
											img: url
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex items-center gap-2 text-sm text-slate-300 cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
											checked: dish.veg,
											onCheckedChange: (v) => updateItem("signatureDishes", idx, {
												...dish,
												veg: v
											})
										}), "Vegetarian"]
									})
								]
							}, idx)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddBtn, {
								onClick: () => addItem("signatureDishes", {
									name: "New Dish",
									tag: "Must Try",
									price: "₹150",
									img: "",
									veg: true
								}),
								label: "Add dish"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "reviews",
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
								autoGenerated: form.autoGeneratedFields?.includes("reviews"),
								children: "Customer reviews (scrolling wishes wall)"
							}),
							form.reviews.map((r, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 bg-slate-900 rounded-lg space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-sm text-slate-400",
											children: ["Review ", idx + 1]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RemoveBtn, { onClick: () => removeItem("reviews", idx) })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
										label: "Review text",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											value: r.text,
											onChange: (e) => updateItem("reviews", idx, {
												...r,
												text: e.target.value
											}),
											className: textareaCls,
											rows: 3
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
										label: "Reviewer name",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: r.who,
											onChange: (e) => updateItem("reviews", idx, {
												...r,
												who: e.target.value
											}),
											className: inputCls
										})
									})
								]
							}, idx)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddBtn, {
								onClick: () => addItem("reviews", {
									text: "Great place!",
									who: "Happy Customer"
								}),
								label: "Add review"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "gallery",
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
								autoGenerated: form.autoGeneratedFields?.includes("galleryPhotos"),
								children: "Gallery photos"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-slate-400",
								children: "These appear on the /gallery page. Category filters: ambience, food, drinks."
							}),
							form.galleryPhotos.map((p, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 bg-slate-900 rounded-lg space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "outline",
											className: "text-slate-400 border-slate-700",
											children: p.cat
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RemoveBtn, { onClick: () => removeItem("galleryPhotos", idx) })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoUpload, {
										value: p.src,
										onChange: (url) => updateItem("galleryPhotos", idx, {
											...p,
											src: url
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid sm:grid-cols-2 gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
											label: "Caption",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												value: p.caption,
												onChange: (e) => updateItem("galleryPhotos", idx, {
													...p,
													caption: e.target.value
												}),
												className: inputCls
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
											label: "Category",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												value: p.cat,
												onChange: (e) => updateItem("galleryPhotos", idx, {
													...p,
													cat: e.target.value
												}),
												className: `${inputCls} w-full rounded-md border px-3 py-2`,
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "ambience",
														children: "ambience"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "food",
														children: "food"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "drinks",
														children: "drinks"
													})
												]
											})
										})]
									})
								]
							}, idx)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddBtn, {
								onClick: () => addItem("galleryPhotos", {
									src: "",
									cat: "ambience",
									caption: "New photo"
								}),
								label: "Add photo"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "lock",
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: "Security" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-6 bg-slate-900 rounded-lg space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold text-white",
										children: "Lock this site"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-slate-400 mt-1",
										children: "When ON, the /dashboard-x7k2 URL returns 404 to everyone — including you, even with the correct password. Use this when handing over a finalized site to a client."
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										checked: form.isLocked,
										onCheckedChange: (v) => set("isLocked", v)
									})]
								}), form.isLocked && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-4 bg-red-950 border border-red-800 rounded-md text-red-300 text-sm space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold",
										children: "⚠️ This will lock you out!"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
										"After saving, this URL will return 404. To unlock later, SSH into the server and edit ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
											className: "bg-red-900 px-1 rounded",
											children: "data/restaurant.json"
										}),
										" — set ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
											className: "bg-red-900 px-1 rounded",
											children: "\"isLocked\": false"
										}),
										". See ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "CMS_README.md" }),
										" for the full procedure."
									] })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-6 bg-slate-900 rounded-lg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-white",
									children: "Password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-slate-400 mt-1",
									children: [
										"The admin password is read from the ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
											className: "bg-slate-800 px-1 rounded",
											children: "CMS_ADMIN_PASSWORD"
										}),
										" environment variable on the server. To change it, update the env var and restart the server — all existing sessions are instantly invalidated."
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-6 bg-slate-900 rounded-lg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-white mb-3",
									children: "Session"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									onClick: handleLogout,
									className: "border-slate-700 text-slate-300 hover:text-white",
									children: "Logout"
								})]
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 flex justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: handleSave,
					disabled: saving,
					size: "lg",
					className: "bg-blue-600 hover:bg-blue-500",
					children: saving ? "Saving…" : "Save all changes"
				})
			})]
		})]
	});
}
//#endregion
export { DashboardPage as component };
