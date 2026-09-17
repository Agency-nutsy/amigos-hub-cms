import { o as __toESM } from "../_runtime.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as fetchGoogleReviewsFn, c as uploadPhotoFn, r as cmsLoginFn, s as saveRestaurantDataFn, t as analyzeMenuWithAiFn } from "./cms-actions-BwAGlJrB.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as getGoogleMapsEmbedUrl } from "./restaurant-data-CS6Zqjj-.mjs";
import { i as Textarea, n as Input, r as Label, t as Button } from "./textarea-U50uUx25.mjs";
import { n as slugify } from "./menu-ai-parser-DEQWuH_k.mjs";
import { t as Route } from "./dashboard-x7k2_.quick-DCwJ3jaS.mjs";
import { A as ChevronUp, C as FileText, D as Copy, E as ExternalLink, M as Check, N as CheckCheck, O as CircleCheck, P as ArrowUpRight, S as Globe, T as EyeOff, _ as Layers, a as Trash2, b as Image, c as SlidersHorizontal, d as PhoneCall, f as PanelBottom, g as LoaderCircle, h as Lock, i as Upload, j as ChevronDown, k as CircleAlert, l as Plus, m as MapPin, n as WandSparkles, o as Star, r as UtensilsCrossed, s as Sparkles, t as X, u as Phone, v as KeyRound, w as Eye, x as House, y as Instagram } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-x7k2_.quick-B4t4r1SQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SAMPLE_GOOGLE_MENU = `STARTERS & FRIES
Crispy Peri Peri Fries ₹140
Golden French fries tossed in spicy peri peri seasoning
Cheese Corn Nuggets ₹180
Crispy bites filled with melted cheese and sweet corn
Chicken Popcorn ₹210
Crunchy bite-sized seasoned chicken fritters served with garlic mayo

PIZZAS (10 INCH)
Margherita Classic Pizza ₹240
San Marzano tomato sauce, fresh mozzarella cheese and fresh basil
Overloaded Veggie Pizza ₹290
Bell peppers, golden corn, olives, mushrooms and red onion
Barbeque Chicken Feast Pizza ₹340
Smoky shredded chicken, caramelized onion, jalapenos and BBQ drizzle

PASTA & ITALIAN
Creamy Mix Sauce Pasta ₹240
Penne pasta in rich pink sauce with garlic herbs and parmesan
Spicy Arrabiata Pasta ₹210
Fiery tomato concasse sauce with crushed chili flakes and fresh basil
Alfredo White Sauce Chicken Pasta ₹280
Slow-simmered rich creamy white sauce with grilled chicken

BURGERS & SANDWICHES
Amigos Cheese Blast Burger ₹220
Double cheese patty with molten cheese explosion and house sauce
Crispy Fried Chicken Burger ₹250
Golden crunchy chicken fillet with iceberg lettuce and secret mayo
Paneer Tikka Grilled Sandwich ₹180
Spiced cottage cheese slices grilled between multigrain sourdough

SHAKES & BEVERAGES
KitKat Thick Shake ₹180
Velvety chocolate blend loaded with crunchy KitKat bars and whipped cream
Classic Cold Coffee with Ice Cream ₹150
Chilled espresso shot blended with vanilla bean ice cream
Watermelon Mint Mojito ₹130
Muddled fresh mint sprigs, lime wedges and watermelon syrup with fizz`;
function AiMenuImporter({ data, setData, onSaveSuccess }) {
	const [textMenu, setTextMenu] = (0, import_react.useState)("");
	const [photos, setPhotos] = (0, import_react.useState)([]);
	const [photoDragOver, setPhotoDragOver] = (0, import_react.useState)(false);
	const fileInputRef = (0, import_react.useRef)(null);
	const [apiKey, setApiKey] = (0, import_react.useState)("");
	const [showApiKeyInput, setShowApiKeyInput] = (0, import_react.useState)(false);
	const [showKeyPassword, setShowKeyPassword] = (0, import_react.useState)(false);
	const [analyzing, setAnalyzing] = (0, import_react.useState)(false);
	const [analyzeStep, setAnalyzeStep] = (0, import_react.useState)("");
	const [extractedCategories, setExtractedCategories] = (0, import_react.useState)(null);
	const [extractedPriceRange, setExtractedPriceRange] = (0, import_react.useState)(null);
	const [extractionSummary, setExtractionSummary] = (0, import_react.useState)(null);
	const [extractionSource, setExtractionSource] = (0, import_react.useState)(null);
	const [errorMessage, setErrorMessage] = (0, import_react.useState)(null);
	const [importMode, setImportMode] = (0, import_react.useState)("replace");
	const [publishing, setPublishing] = (0, import_react.useState)(false);
	const [publishSuccess, setPublishSuccess] = (0, import_react.useState)(false);
	const [expandedCats, setExpandedCats] = (0, import_react.useState)({});
	const [activeMenuExpanded, setActiveMenuExpanded] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const savedKey = localStorage.getItem("amigos_ai_api_key");
			if (savedKey) setApiKey(savedKey);
		} catch {}
	}, []);
	const handleSaveApiKey = (key) => {
		setApiKey(key);
		try {
			localStorage.setItem("amigos_ai_api_key", key);
		} catch {}
	};
	const handlePhotoFiles = (files) => {
		if (!files || files.length === 0) return;
		Array.from(files).forEach((file) => {
			if (!file.type.startsWith("image/")) return;
			const reader = new FileReader();
			reader.onload = (e) => {
				const base64 = e.target?.result;
				setPhotos((prev) => [...prev, {
					id: Math.random().toString(36).substring(2, 9),
					name: file.name,
					base64,
					mimeType: file.type || "image/jpeg"
				}]);
			};
			reader.readAsDataURL(file);
		});
	};
	const removePhoto = (id) => {
		setPhotos((prev) => prev.filter((p) => p.id !== id));
	};
	const hasText = Boolean(textMenu.trim().length > 0);
	const hasPhotos = photos.length > 0;
	const hasBoth = hasText && hasPhotos;
	const canAnalyze = hasText || hasPhotos;
	const handleAnalyze = async () => {
		if (!canAnalyze) {
			setErrorMessage("Please paste menu text from Google profile or upload at least one menu photo.");
			return;
		}
		setAnalyzing(true);
		setErrorMessage(null);
		setPublishSuccess(false);
		try {
			if (hasBoth) setAnalyzeStep(`Analyzing BOTH Google text AND ${photos.length} menu photo(s)...`);
			else if (hasPhotos) setAnalyzeStep(`Scanning ${photos.length} menu photo(s) with AI vision...`);
			else setAnalyzeStep("Parsing Google profile menu text & prices...");
			const result = await analyzeMenuWithAiFn({ data: {
				textMenu: textMenu.trim() || void 0,
				photos: photos.map((p) => ({
					base64: p.base64,
					mimeType: p.mimeType,
					filename: p.name
				})),
				apiKey: apiKey.trim() || void 0
			} });
			if (result.success && result.categories.length > 0) {
				setExtractedCategories(result.categories);
				if (result.priceRangeNote) setExtractedPriceRange(result.priceRangeNote);
				setExtractionSummary(result.summary);
				setExtractionSource(result.source);
				const initialExpand = {};
				result.categories.forEach((c) => {
					initialExpand[c.id] = true;
				});
				setExpandedCats(initialExpand);
			} else setErrorMessage(result.error || "Could not detect menu items. Try pasting text with prices or uploading a clear photo.");
		} catch (err) {
			setErrorMessage(err.message || "Failed to analyze menu. Please try again.");
		} finally {
			setAnalyzing(false);
			setAnalyzeStep("");
		}
	};
	const handlePutInRealWebsite = async () => {
		if (!extractedCategories || extractedCategories.length === 0) return;
		setPublishing(true);
		setPublishSuccess(false);
		setErrorMessage(null);
		try {
			let finalMenu = [];
			if (importMode === "replace") finalMenu = [...extractedCategories];
			else {
				const mergedMap = /* @__PURE__ */ new Map();
				data.menu.forEach((cat) => {
					mergedMap.set(cat.id, {
						...cat,
						items: [...cat.items]
					});
				});
				extractedCategories.forEach((newCat) => {
					if (mergedMap.has(newCat.id)) {
						const existing = mergedMap.get(newCat.id);
						const existingItemNames = new Set(existing.items.map((i) => i.name.toLowerCase()));
						const newItems = newCat.items.filter((i) => !existingItemNames.has(i.name.toLowerCase()));
						existing.items = [...existing.items, ...newItems];
					} else mergedMap.set(newCat.id, {
						...newCat,
						items: [...newCat.items]
					});
				});
				finalMenu = Array.from(mergedMap.values());
			}
			const updatedPriceRange = extractedPriceRange && extractedPriceRange.trim() ? extractedPriceRange : data.priceRange;
			const updatedData = {
				...data,
				menu: finalMenu,
				priceRange: updatedPriceRange
			};
			await saveRestaurantDataFn({ data: updatedData });
			setData(updatedData);
			setPublishSuccess(true);
			if (onSaveSuccess) onSaveSuccess();
		} catch (err) {
			setErrorMessage(err.message || "Failed to save to live website.");
		} finally {
			setPublishing(false);
		}
	};
	const updateCategoryLabel = (catIdx, newLabel) => {
		if (!extractedCategories) return;
		const updated = [...extractedCategories];
		updated[catIdx].label = newLabel;
		updated[catIdx].id = slugify(newLabel);
		setExtractedCategories(updated);
	};
	const removeCategory = (catIdx) => {
		if (!extractedCategories) return;
		setExtractedCategories(extractedCategories.filter((_, idx) => idx !== catIdx));
	};
	const addNewCategory = () => {
		const newCat = {
			id: `category-${Date.now()}`,
			label: "New Category",
			items: [{
				name: "New Item",
				price: "₹150",
				veg: true
			}]
		};
		setExtractedCategories((prev) => prev ? [...prev, newCat] : [newCat]);
		setExpandedCats((prev) => ({
			...prev,
			[newCat.id]: true
		}));
	};
	const updateItem = (catIdx, itemIdx, field, value) => {
		if (!extractedCategories) return;
		const updated = [...extractedCategories];
		const cat = updated[catIdx];
		const item = {
			...cat.items[itemIdx],
			[field]: value
		};
		cat.items[itemIdx] = item;
		setExtractedCategories(updated);
	};
	const removeItem = (catIdx, itemIdx) => {
		if (!extractedCategories) return;
		const updated = [...extractedCategories];
		updated[catIdx].items = updated[catIdx].items.filter((_, idx) => idx !== itemIdx);
		setExtractedCategories(updated);
	};
	const addItemToCategory = (catIdx) => {
		if (!extractedCategories) return;
		const updated = [...extractedCategories];
		updated[catIdx].items.push({
			name: "New Dish",
			price: "₹180",
			veg: true
		});
		setExtractedCategories(updated);
	};
	const toggleCategoryExpand = (catId) => {
		setExpandedCats((prev) => ({
			...prev,
			[catId]: !prev[catId]
		}));
	};
	const totalExtractedDishes = extractedCategories ? extractedCategories.reduce((acc, c) => acc + c.items.length, 0) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-orange-500/30 bg-gradient-to-b from-[#131b2e] to-[#0c1222] p-6 sm:p-7 space-y-6 shadow-2xl shadow-orange-950/20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-11 h-11 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 shadow-inner",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-6 h-6 animate-pulse" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-lg font-bold text-white tracking-tight",
									children: "AI Menu Scanner & Importer"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-semibold bg-orange-500/20 text-orange-300 border border-orange-500/30 px-2 py-0.5 rounded-full",
									children: "Text + Photo Vision"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-slate-400 mt-0.5",
								children: [
									"Upload photos, paste Google profile text, or ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-orange-300",
										children: "do both"
									}),
									". The AI analyzes and combines all items and prices."
								]
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "outline",
								size: "sm",
								onClick: () => setShowApiKeyInput(!showApiKeyInput),
								className: `text-xs border-slate-700 ${apiKey ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" : "text-slate-400 hover:text-white"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "w-3.5 h-3.5 mr-1.5" }), apiKey ? "Gemini Key Configured ✓" : "Optional AI Key"]
							})
						})]
					}),
					showApiKeyInput && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									className: "text-xs font-semibold text-slate-300 flex items-center gap-1.5",
									children: ["Google Gemini API Key", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-normal text-slate-400",
										children: "(Free at aistudio.google.com)"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "https://aistudio.google.com/app/apikey",
									target: "_blank",
									rel: "noreferrer",
									className: "text-[11px] text-amber-400 hover:underline flex items-center gap-1",
									children: ["Get free key ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "w-3 h-3" })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: showKeyPassword ? "text" : "password",
									value: apiKey,
									onChange: (e) => handleSaveApiKey(e.target.value),
									placeholder: "AIzaSy... (leave blank to use smart built-in text parser)",
									className: "bg-slate-950 border-slate-800 text-xs pr-10 text-white font-mono"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setShowKeyPassword(!showKeyPassword),
									className: "absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200",
									children: showKeyPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-4 h-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-slate-400",
								children: "⚡ A free Gemini key powers photo OCR vision. For copied Google text, our smart NLP parser runs instantly even without a key!"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-slate-800 bg-slate-950/60 p-4 sm:p-5 space-y-3 flex flex-col justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-7 h-7 rounded-lg bg-orange-500/15 border border-orange-500/25 flex items-center justify-center text-orange-400",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "w-3.5 h-3.5" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-xs font-bold uppercase tracking-wider text-slate-200",
											children: "1. Text Menu (Google Profile / Maps)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-slate-400",
											children: "Copy & paste text from Google or websites"
										})] })]
									}), hasText ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[10px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, { className: "w-3 h-3" }),
											textMenu.length,
											" chars"
										]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-medium bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full",
										children: "Optional"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									value: textMenu,
									onChange: (e) => setTextMenu(e.target.value),
									placeholder: "Paste raw text menu here...\ne.g.\nMargherita Pizza ₹240\nCrispy Peri Peri Fries ₹140\nKitKat Thick Shake ₹180",
									rows: 9,
									className: "bg-slate-900/80 border-slate-800 text-xs text-slate-200 placeholder:text-slate-600 font-mono leading-relaxed focus-visible:ring-orange-500 resize-y"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										variant: "ghost",
										size: "sm",
										onClick: async () => {
											try {
												const clipText = await navigator.clipboard.readText();
												if (clipText) setTextMenu((prev) => prev ? prev + "\n" + clipText : clipText);
											} catch {
												alert("Please use Ctrl+V / Cmd+V to paste directly into the box.");
											}
										},
										className: "text-xs h-7 text-slate-400 hover:text-white hover:bg-slate-800 px-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-3 h-3 mr-1" }), " Paste"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										variant: "outline",
										size: "sm",
										onClick: () => setTextMenu(SAMPLE_GOOGLE_MENU),
										className: "text-xs h-7 border-orange-500/30 text-orange-300 hover:bg-orange-500/10 px-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, { className: "w-3 h-3 mr-1 text-orange-400" }), " Load Sample"]
									})]
								}), hasText && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "ghost",
									size: "sm",
									onClick: () => setTextMenu(""),
									className: "text-xs h-7 text-slate-500 hover:text-red-400 hover:bg-red-500/10 px-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-3 h-3 mr-1" }), " Clear"]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-slate-800 bg-slate-950/60 p-4 sm:p-5 space-y-3 flex flex-col justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-7 h-7 rounded-lg bg-orange-500/15 border border-orange-500/25 flex items-center justify-center text-orange-400",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "w-3.5 h-3.5" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "text-xs font-bold uppercase tracking-wider text-slate-200",
												children: "2. Menu Photos (Cards & Boards)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] text-slate-400",
												children: "Upload paper menu cards or chalkboard photos"
											})] })]
										}), hasPhotos ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[10px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, { className: "w-3 h-3" }),
												photos.length,
												" photo(s)"
											]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-medium bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full",
											children: "Optional"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										onDragOver: (e) => {
											e.preventDefault();
											setPhotoDragOver(true);
										},
										onDragLeave: () => setPhotoDragOver(false),
										onDrop: (e) => {
											e.preventDefault();
											setPhotoDragOver(false);
											handlePhotoFiles(e.dataTransfer.files);
										},
										onClick: () => fileInputRef.current?.click(),
										className: `border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${photoDragOver ? "border-orange-500 bg-orange-500/10" : "border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900/80"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											ref: fileInputRef,
											type: "file",
											accept: "image/*",
											multiple: true,
											onChange: (e) => handlePhotoFiles(e.target.files),
											className: "hidden"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col items-center justify-center space-y-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "w-5 h-5" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-xs font-semibold text-slate-200",
													children: ["Drop photos here, or ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-orange-400 underline",
														children: "browse"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[10px] text-slate-500",
													children: "Menu cards, chalkboards, QR menu screenshots (JPG, PNG, WebP)"
												})
											]
										})]
									}),
									hasPhotos && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between text-[11px] text-slate-400",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												"Attached Photos (",
												photos.length,
												")"
											] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setPhotos([]),
												className: "text-red-400 hover:underline",
												children: "Clear all"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-36 overflow-y-auto pr-1",
											children: photos.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "group relative aspect-square rounded-lg overflow-hidden border border-slate-800 bg-slate-900 shadow-sm",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
														src: p.base64,
														alt: p.name,
														className: "w-full h-full object-cover"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															type: "button",
															onClick: (e) => {
																e.stopPropagation();
																removePhoto(p.id);
															},
															className: "p-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors",
															title: "Remove photo",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-3 h-3" })
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "absolute bottom-0 inset-x-0 bg-slate-950/85 px-1 py-0.5 text-[8px] text-slate-300 truncate",
														children: p.name
													})
												]
											}, p.id))
										})]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Supports multiple menu photos" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "JPG, PNG, WebP" })]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `p-3.5 rounded-xl border flex items-center gap-3 transition-all ${hasBoth ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200" : hasText ? "border-orange-500/30 bg-orange-500/10 text-orange-200" : hasPhotos ? "border-sky-500/30 bg-sky-500/10 text-sky-200" : "border-slate-800 bg-slate-950/60 text-slate-400"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-bold ${hasBoth ? "bg-emerald-500 text-slate-950" : hasText ? "bg-orange-500 text-slate-950" : hasPhotos ? "bg-sky-500 text-slate-950" : "bg-slate-800 text-slate-400"}`,
							children: hasBoth ? "✨" : hasText ? "📄" : hasPhotos ? "📸" : "💡"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1 text-xs",
							children: hasBoth ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-bold text-emerald-300",
								children: "Dual Multimodal Mode Active (Text + Photos)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] text-emerald-400/90 mt-0.5",
								children: [
									"AI will analyze ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "BOTH" }),
									" the pasted Google Profile text and all ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [photos.length, " menu photo(s)"] }),
									" together, cross-referencing and merging all items into a unified menu preview."
								]
							})] }) : hasText ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-bold text-orange-300",
								children: "Text Extraction Mode Active"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] text-orange-400/90 mt-0.5",
								children: ["AI will analyze all dishes and prices from your pasted Google profile text. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "(You can also upload menu photos above if you have any!)" })]
							})] }) : hasPhotos ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-bold text-sky-300",
								children: "Photo Vision OCR Mode Active"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] text-sky-400/90 mt-0.5",
								children: [
									"AI will scan all ",
									photos.length,
									" menu photo(s) with vision OCR. ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "(You can also paste Google text alongside for combined extraction!)" })
								]
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-slate-300",
								children: "Ready for your menu content"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] text-slate-500 mt-0.5",
								children: [
									"Neither is compulsory! You can paste text on the left, upload photos on the right, or provide ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "both" }),
									" together."
								]
							})] })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-800",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-xs text-slate-400",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `w-2 h-2 rounded-full ${canAnalyze ? "bg-emerald-400 animate-pulse" : "bg-slate-600"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: hasBoth ? `Ready to synthesize Text + ${photos.length} Photo(s)` : hasText ? "Ready to extract from Text" : hasPhotos ? `Ready to extract from ${photos.length} Photo(s)` : "Fill text, photos, or both above" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							disabled: analyzing || !canAnalyze,
							onClick: handleAnalyze,
							className: `w-full sm:w-auto font-bold px-7 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 ${canAnalyze ? "bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 shadow-orange-500/25" : "bg-slate-800 text-slate-500 cursor-not-allowed"}`,
							children: analyzing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin text-slate-950" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: analyzeStep || "Analyzing menu..." })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: hasBoth ? "✨ Analyze Both Text & Photos with AI" : hasPhotos ? "✨ Analyze Photos with AI Vision" : "✨ Analyze Text Menu with AI" })] })
						})]
					}),
					errorMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-300 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "w-4 h-4 shrink-0 text-red-400 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold",
							children: "Analysis Notice"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5",
							children: errorMessage
						})] })]
					})
				]
			}),
			extractedCategories && extractedCategories.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-b from-[#0c1c1f] to-[#0a141a] p-6 sm:p-7 space-y-6 shadow-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-emerald-500/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-5 h-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-xl font-bold text-white tracking-tight",
									children: [
										"Extracted ",
										totalExtractedDishes,
										" Dishes across ",
										extractedCategories.length,
										" Categories"
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-emerald-300/80",
								children: [
									extractionSummary,
									" · Source: ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold uppercase",
										children: extractionSource
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800 self-start md:self-auto",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-slate-400 pl-2 font-medium",
									children: "Save mode:"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setImportMode("replace"),
									className: `px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${importMode === "replace" ? "bg-emerald-500 text-slate-950 shadow" : "text-slate-400 hover:text-white"}`,
									children: "Replace Live Menu"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setImportMode("append"),
									className: `px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${importMode === "append" ? "bg-emerald-500 text-slate-950 shadow" : "text-slate-400 hover:text-white"}`,
									children: "Append / Merge"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold uppercase tracking-wider text-slate-300",
								children: "Review & Edit Extracted Categories"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "outline",
								size: "sm",
								onClick: addNewCategory,
								className: "text-xs h-7 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-3 h-3 mr-1" }), " Add Category"]
							})]
						}), extractedCategories.map((cat, catIdx) => {
							const isExpanded = expandedCats[cat.id] ?? true;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-slate-800 bg-slate-950/70 overflow-hidden transition-all",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between p-4 bg-slate-900/80 border-b border-slate-800/80 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 flex-1 min-w-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => toggleCategoryExpand(cat.id),
												className: "text-slate-400 hover:text-white",
												children: isExpanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "w-4 h-4" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												value: cat.label,
												onChange: (e) => updateCategoryLabel(catIdx, e.target.value),
												className: "bg-slate-950 border-slate-800 text-sm font-bold text-white max-w-xs h-8"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-xs text-slate-400 font-medium whitespace-nowrap",
												children: [
													"(",
													cat.items.length,
													" dishes)"
												]
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "button",
											variant: "ghost",
											size: "sm",
											onClick: () => addItemToCategory(catIdx),
											className: "text-xs h-7 text-emerald-400 hover:bg-emerald-500/10",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-3 h-3 mr-1" }), " Add Dish"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => removeCategory(catIdx),
											className: "text-slate-500 hover:text-red-400 p-1",
											title: "Delete category",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" })
										})]
									})]
								}), isExpanded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "p-4 space-y-3",
									children: cat.items.map((item, itemIdx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col sm:flex-row items-start sm:items-center gap-3 p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/60 hover:border-slate-700 transition-colors",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => updateItem(catIdx, itemIdx, "veg", !item.veg),
												className: `w-5 h-5 rounded flex items-center justify-center border shrink-0 transition-transform ${item.veg !== false ? "border-emerald-500 bg-emerald-500/10 text-emerald-400" : "border-red-500 bg-red-500/10 text-red-400"}`,
												title: item.veg !== false ? "Vegetarian (click to switch)" : "Non-Veg (click to switch)",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `w-2.5 h-2.5 rounded-full ${item.veg !== false ? "bg-emerald-400" : "bg-red-400"}` })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												value: item.name,
												onChange: (e) => updateItem(catIdx, itemIdx, "name", e.target.value),
												placeholder: "Dish name",
												className: "bg-slate-950 border-slate-800 text-xs font-semibold text-white h-8 flex-1 min-w-[140px]"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												value: item.desc || "",
												onChange: (e) => updateItem(catIdx, itemIdx, "desc", e.target.value),
												placeholder: "Optional ingredients or description",
												className: "bg-slate-950 border-slate-800 text-xs text-slate-300 h-8 flex-1 min-w-[160px]"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												value: item.price,
												onChange: (e) => updateItem(catIdx, itemIdx, "price", e.target.value),
												placeholder: "₹...",
												className: "bg-slate-950 border-slate-800 text-xs font-bold text-amber-300 w-24 h-8 text-center"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => updateItem(catIdx, itemIdx, "star", !item.star),
												className: `p-1.5 rounded transition-colors ${item.star ? "text-amber-400 bg-amber-400/10" : "text-slate-600 hover:text-slate-400"}`,
												title: "Toggle Bestseller / Star Dish",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "w-4 h-4 fill-current" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => removeItem(catIdx, itemIdx),
												className: "p-1.5 text-slate-500 hover:text-red-400 transition-colors",
												title: "Delete dish",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" })
											})
										]
									}, itemIdx))
								})]
							}, cat.id || catIdx);
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-emerald-950/60 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-base font-bold text-white flex items-center gap-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🚀 Ready to Publish to Live Website?" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-slate-400 mt-0.5",
							children: [
								"This will save the extracted ",
								totalExtractedDishes,
								" items into data/restaurant.json and instantly update /menu."
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-3 w-full sm:w-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								disabled: publishing,
								onClick: handlePutInRealWebsite,
								className: "w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black px-7 py-3 rounded-xl shadow-xl shadow-emerald-500/25 transition-all text-sm flex items-center justify-center gap-2",
								children: publishing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin text-slate-950" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Publishing to /menu..." })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-4 h-4 stroke-[3]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Put in Real Website & Save" })] })
							})
						})]
					}),
					publishSuccess && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 rounded-xl bg-emerald-500/15 border-2 border-emerald-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in zoom-in-95",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-9 h-9 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold",
								children: "✓"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-bold text-emerald-200",
								children: "Live Menu Updated Successfully!"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-emerald-300/80",
								children: [
									"All ",
									totalExtractedDishes,
									" items and categories have been published to your real website."
								]
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "/menu",
							target: "_blank",
							rel: "noreferrer",
							className: "inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs transition-colors shadow",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "View Live Menu (/menu)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "w-3.5 h-3.5" })]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "w-4 h-4 text-orange-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs font-bold text-slate-300 uppercase tracking-wider",
								children: [
									"Currently Active Menu on Site (",
									data.menu.length,
									" Categories ·",
									" ",
									data.menu.reduce((acc, c) => acc + c.items.length, 0),
									" Dishes)"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setActiveMenuExpanded(!activeMenuExpanded),
							className: "text-xs text-slate-400 hover:text-white flex items-center gap-1",
							children: [activeMenuExpanded ? "Hide Details" : "View / Edit Active Menu", activeMenuExpanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "w-3.5 h-3.5" })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2 pt-1",
						children: data.menu.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-medium px-2.5 py-1 rounded-md bg-slate-800/90 text-slate-300 border border-slate-700/60",
							children: [
								c.label,
								" (",
								c.items.length,
								")"
							]
						}, c.id))
					}),
					activeMenuExpanded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pt-3 border-t border-slate-800 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-slate-400",
							children: "Directly edit any existing category or dish on the live site:"
						}), data.menu.map((cat, cIdx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-slate-800 bg-slate-950/70 p-3 space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: cat.label,
									onChange: (e) => {
										const arr = [...data.menu];
										arr[cIdx].label = e.target.value;
										arr[cIdx].id = slugify(e.target.value);
										setData({
											...data,
											menu: arr
										});
									},
									className: "bg-slate-900 border-slate-800 text-xs font-bold text-white max-w-xs h-7"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										variant: "ghost",
										size: "sm",
										onClick: () => {
											const arr = [...data.menu];
											arr[cIdx].items.push({
												name: "New item",
												price: "₹150",
												veg: true
											});
											setData({
												...data,
												menu: arr
											});
										},
										className: "text-xs h-6 text-orange-400 hover:bg-orange-500/10",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-3 h-3 mr-1" }), " Add Dish"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											const arr = data.menu.filter((_, idx) => idx !== cIdx);
											setData({
												...data,
												menu: arr
											});
										},
										className: "text-slate-500 hover:text-red-400 p-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3.5 h-3.5" })
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2",
								children: cat.items.map((it, itIdx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => {
												const arr = [...data.menu];
												arr[cIdx].items[itIdx].veg = !arr[cIdx].items[itIdx].veg;
												setData({
													...data,
													menu: arr
												});
											},
											className: `w-4 h-4 rounded-full border shrink-0 ${it.veg !== false ? "bg-emerald-400 border-emerald-500" : "bg-red-400 border-red-500"}`,
											title: it.veg !== false ? "Vegetarian" : "Non-Veg"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: it.name,
											onChange: (e) => {
												const arr = [...data.menu];
												arr[cIdx].items[itIdx].name = e.target.value;
												setData({
													...data,
													menu: arr
												});
											},
											className: "bg-slate-900 border-slate-800 text-xs text-white h-7 flex-1"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: it.price,
											onChange: (e) => {
												const arr = [...data.menu];
												arr[cIdx].items[itIdx].price = e.target.value;
												setData({
													...data,
													menu: arr
												});
											},
											className: "bg-slate-900 border-slate-800 text-xs text-amber-300 font-semibold h-7 w-20 text-center"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => {
												const arr = [...data.menu];
												arr[cIdx].items = arr[cIdx].items.filter((_, idx) => idx !== itIdx);
												setData({
													...data,
													menu: arr
												});
											},
											className: "text-slate-500 hover:text-red-400 p-1",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3.5 h-3.5" })
										})
									]
								}, itIdx))
							})]
						}, cat.id || cIdx))]
					})
				]
			})
		]
	});
}
function QuickDashboardPage() {
	const { restaurantData, isAuthed } = Route.useLoaderData();
	if (!isAuthed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickLoginForm, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickAdminForm, { initialData: restaurantData });
}
function QuickLoginForm() {
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
				navigate({ to: "/dashboard-x7k2/quick" });
				window.location.reload();
			} else setError(result.error ?? "Login failed.");
		} catch (err) {
			setError("Server error. Please try again.");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6 shadow-2xl shadow-black/60",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-6 h-6" })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-bold tracking-tight text-white",
						children: "Quick CMS"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-slate-400 text-sm",
						children: "Enter operator password to continue."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "password",
							value: password,
							onChange: (e) => setPassword(e.target.value),
							className: "bg-slate-950 border-slate-800 text-white text-center text-lg tracking-widest focus-visible:ring-amber-500",
							placeholder: "••••••••",
							autoFocus: true
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-red-400 text-xs text-center font-medium",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: loading,
							className: "w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold transition-all",
							children: loading ? "Verifying…" : "Unlock Quick CMS"
						})
					]
				})
			]
		})
	});
}
var inputCls = "bg-slate-900/90 border-slate-800 text-white placeholder:text-slate-500 text-sm focus-visible:ring-amber-500 focus-visible:border-amber-500/50";
function FieldRow({ label, children, help }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				className: "text-slate-300 text-xs font-semibold uppercase tracking-wider",
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
function PhotoUpload({ value, onChange, label, help, badge, buttonLabel = "Upload Image", emptyLabel = "No image", placeholder = "/uploads/photo.jpg or /photos/1.webp" }) {
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [dragOver, setDragOver] = (0, import_react.useState)(false);
	const inputRef = (0, import_react.useRef)(null);
	const handleFile = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setUploading(true);
		try {
			onChange(await uploadFile(file));
		} catch {
			alert("Failed to upload image. Please try again.");
		} finally {
			setUploading(false);
		}
	};
	const handleDrop = async (e) => {
		e.preventDefault();
		setDragOver(false);
		const file = e.dataTransfer.files?.[0];
		if (!file) return;
		setUploading(true);
		try {
			onChange(await uploadFile(file));
		} catch {
			alert("Failed to upload image. Please try again.");
		} finally {
			setUploading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					className: "text-slate-300 text-xs font-semibold uppercase tracking-wider",
					children: label
				}), badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] font-medium bg-sky-500/10 text-sky-400 border border-sky-500/20 px-2 py-0.5 rounded-full",
					children: badge
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				onDragOver: (e) => {
					e.preventDefault();
					setDragOver(true);
				},
				onDragLeave: () => setDragOver(false),
				onDrop: handleDrop,
				className: `p-3.5 rounded-xl border transition-all ${dragOver ? "border-amber-500 bg-amber-500/10" : "border-slate-800 bg-slate-900/80 hover:border-slate-700"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row items-start sm:items-center gap-4",
					children: [value ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative group shrink-0 w-20 h-20 rounded-lg bg-slate-950/80 border border-slate-700/80 flex items-center justify-center overflow-hidden p-1 shadow-inner",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: value,
							alt: "Preview",
							className: "w-full h-full object-cover rounded"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => onChange(""),
							className: "absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center text-red-400 transition-opacity",
							title: "Remove image",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" })
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "shrink-0 w-20 h-20 rounded-lg border border-dashed border-slate-700 bg-slate-950/50 flex flex-col items-center justify-center text-slate-500 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "w-5 h-5 mb-1 text-slate-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: emptyLabel })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 space-y-2 w-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								onClick: () => inputRef.current?.click(),
								disabled: uploading,
								className: "bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold h-8 px-3.5 shadow-sm transition-all",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "w-3.5 h-3.5 mr-1.5" }), uploading ? "Uploading…" : value ? `Replace ${buttonLabel.replace("Upload ", "")}` : buttonLabel]
							}), value && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: value,
								target: "_blank",
								rel: "noreferrer",
								className: "text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 px-2.5 py-1.5 rounded-md hover:bg-slate-800 transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "View" })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value,
							onChange: (e) => onChange(e.target.value),
							placeholder,
							className: "bg-slate-950/80 border-slate-800 text-slate-300 text-xs font-mono h-8"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: inputRef,
					type: "file",
					accept: "image/*",
					className: "hidden",
					onChange: handleFile
				})]
			}),
			help && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-slate-500",
				children: help
			})
		]
	});
}
var SECTIONS = [
	{
		id: "loading-screen",
		name: "Loading Screen",
		icon: Sparkles,
		badge: "Global Initial Load"
	},
	{
		id: "homepage",
		name: "Homepage",
		icon: House,
		badge: "Route: /"
	},
	{
		id: "menupage",
		name: "Menu Page",
		icon: UtensilsCrossed,
		badge: "Route: /menu"
	},
	{
		id: "contactpage",
		name: "Contact Page",
		icon: PhoneCall,
		badge: "Route: /contact"
	},
	{
		id: "footer",
		name: "Footer",
		icon: PanelBottom,
		badge: "Global Footer"
	}
];
function QuickAdminForm({ initialData }) {
	const [data, setData] = (0, import_react.useState)(initialData);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [savedSuccess, setSavedSuccess] = (0, import_react.useState)(false);
	const [activeSection, setActiveSection] = (0, import_react.useState)("loading-screen");
	const [googleProfileUrl, setGoogleProfileUrl] = (0, import_react.useState)(initialData.socialLinks?.maps || "https://maps.app.goo.gl/FF8mphjaHEt2PKtC7");
	const [fetchingReviews, setFetchingReviews] = (0, import_react.useState)(false);
	const [fetchSuccessMessage, setFetchSuccessMessage] = (0, import_react.useState)(null);
	const [fetchErrorMessage, setFetchErrorMessage] = (0, import_react.useState)(null);
	const handleFetchGoogleReviews = async () => {
		if (!googleProfileUrl.trim()) {
			setFetchErrorMessage("Please enter a valid Google Profile or Google Maps link.");
			return;
		}
		setFetchingReviews(true);
		setFetchSuccessMessage(null);
		setFetchErrorMessage(null);
		try {
			const res = await fetchGoogleReviewsFn({ data: { url: googleProfileUrl.trim() } });
			if (res.success && res.reviews && res.reviews.length > 0) {
				setData((prev) => ({
					...prev,
					reviews: res.reviews
				}));
				setFetchSuccessMessage(`✓ Successfully fetched and loaded ${res.reviews.length} 5-star reviews for ${res.placeName || "your cafe"}!`);
			} else setFetchErrorMessage("Could not extract reviews from this link. Please check the URL.");
		} catch (err) {
			setFetchErrorMessage(err.message || "Failed to fetch Google reviews. Please try again.");
		} finally {
			setFetchingReviews(false);
		}
	};
	const handleSaveAll = async (e) => {
		if (e) e.preventDefault();
		setSaving(true);
		setSavedSuccess(false);
		try {
			await saveRestaurantDataFn({ data });
			setSavedSuccess(true);
			setTimeout(() => setSavedSuccess(false), 3500);
		} catch (err) {
			alert("Failed to save changes.");
		} finally {
			setSaving(false);
		}
	};
	const scrollToSection = (id) => {
		setActiveSection(id);
		const element = document.getElementById(id);
		if (element) element.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#090d16] text-slate-100 selection:bg-amber-500/30 selection:text-amber-200",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-40 bg-[#0c1220]/95 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5 shadow-lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-7xl mx-auto flex items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm",
							children: "Q"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-base font-bold text-white leading-none",
								children: "Quick CMS"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-semibold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full",
								children: "Section Mode"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-slate-400 mt-0.5",
							children: ["Page-by-page content editor for ", data.name]
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "/dashboard-x7k2",
								className: "text-xs text-slate-400 hover:text-slate-200 hidden sm:flex items-center gap-1 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-800",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "w-3.5 h-3.5" }), "Full CMS"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "/",
								target: "_blank",
								rel: "noreferrer",
								className: "text-xs text-slate-300 hover:text-white flex items-center gap-1 transition-colors px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 hover:bg-slate-800",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "View Site" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "w-3.5 h-3.5 text-slate-400" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: handleSaveAll,
								disabled: saving,
								className: "bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-4 text-xs h-8 shadow-sm transition-all cursor-pointer",
								children: saving ? "Saving…" : savedSuccess ? "✓ Saved" : "Save All Changes"
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "sticky top-[57px] z-30 bg-[#0f172a]/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-w-7xl mx-auto flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5",
					children: SECTIONS.map((sec) => {
						const Icon = sec.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => scrollToSection(sec.id),
							className: `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${activeSection === sec.id ? "bg-amber-500 text-slate-950 shadow font-semibold" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: sec.name })]
						}, sec.id);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12 pb-32",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200/90 text-sm flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-5 h-5 text-amber-400 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold text-amber-300",
							children: "Sections Skeleton Configured!"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-amber-200/70 mt-0.5",
							children: "Each page section has its own dedicated heading below. Review the layout and tell me exactly what inputs, toggles, or photos you want placed in each section."
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "loading-screen",
						className: "scroll-mt-28 bg-[#0f172a]/70 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-5 h-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-xl font-bold text-white tracking-tight",
									children: "1. Loading Screen Section"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-slate-400",
									children: "Controls the initial splash screen animation and brand identity"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 self-start sm:self-auto flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "w-3 h-3" }), "Syncs Globally"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoUpload, {
									label: "1. Cafe Logo Image (Global)",
									badge: "Applies across Entire Website (Nav, Loading, Footer)",
									help: "Upload your cafe's logo. It will automatically update the loading screen, top navbar, footer, and brand elements site-wide.",
									value: data.logoUrl,
									onChange: (url) => setData({
										...data,
										logoUrl: url
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid sm:grid-cols-2 gap-5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
										label: "2. Cafe Name",
										help: "Displayed prominently on the loading splash & header",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: data.name,
											onChange: (e) => setData({
												...data,
												name: e.target.value
											}),
											className: inputCls,
											placeholder: "e.g. Amigos Hub"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
										label: "3. Loading Subtext",
										help: "Script text between pulsing dots on the intro screen",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: data.loadingSubtext ?? "warming up the grill...",
											onChange: (e) => setData({
												...data,
												loadingSubtext: e.target.value
											}),
											className: inputCls,
											placeholder: "e.g. warming up the grill..."
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between mb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-3.5 h-3.5 text-amber-400" }), "Live Loading Screen Preview"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] text-slate-500",
											children: "Updates in real-time as you edit above"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative rounded-2xl overflow-hidden border border-slate-700/60 bg-[#FAF7EE] text-[#1F1E1D] p-8 sm:p-12 flex flex-col items-center justify-center text-center shadow-2xl",
										children: [
											data.logoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: data.logoUrl,
												alt: data.name,
												className: "h-24 sm:h-28 w-auto object-contain mb-4 drop-shadow-md animate-bounce",
												style: { animationDuration: "2s" }
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-20 h-20 rounded-full border-2 border-dashed border-amber-600/40 flex items-center justify-center text-xs text-amber-800 mb-4",
												children: "Logo"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "font-serif font-black text-3xl sm:text-4xl text-[#1F1E1D] tracking-tight uppercase",
												children: data.name || "Cafe Name"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-4 font-serif italic text-xl sm:text-2xl text-[#FF6B6B] flex items-center gap-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-6 h-[3px] bg-[#FF6B6B]/60 rounded-full animate-pulse" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data.loadingSubtext || "warming up the grill..." }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-6 h-[3px] bg-[#FF6B6B]/60 rounded-full animate-pulse" })
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-6 w-48 h-2.5 rounded-full bg-slate-300 overflow-hidden shadow-inner",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "h-full rounded-full bg-gradient-to-r from-[#FF6B6B] via-[#FFA94D] to-[#FF6B6B] animate-pulse",
													style: { width: "80%" }
												})
											})
										]
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "homepage",
						className: "scroll-mt-28 bg-[#0f172a]/70 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "w-5 h-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-xl font-bold text-white tracking-tight",
									children: "2. Homepage Hero Section"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-slate-400",
									children: "Hero headlines, location badge, short story paragraph, and review stats"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60 self-start sm:self-auto",
								children: "Route: /"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
									label: "Location & Timings Badge (Above Headline)",
									help: "e.g. DELHI · 10:00 AM – 10:30 PM EVERY DAY or Satya Niketan · open till 10:30 PM",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: data.heroLocationBadge,
										onChange: (e) => setData({
											...data,
											heroLocationBadge: e.target.value
										}),
										className: inputCls,
										placeholder: "e.g. DELHI · 10:00 AM – 10:30 PM EVERY DAY"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-slate-300 text-xs font-semibold uppercase tracking-wider",
										children: "Big 3-Line Hero Headline"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid sm:grid-cols-3 gap-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
												label: "Line 1 (Dark Bold)",
												help: "First line, e.g. Loud music.",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													value: data.heroHeadline[0] ?? "",
													onChange: (e) => {
														const newHeadline = [
															e.target.value,
															data.heroHeadline[1] ?? "",
															data.heroHeadline[2] ?? ""
														];
														setData({
															...data,
															heroHeadline: newHeadline
														});
													},
													className: inputCls,
													placeholder: "Loud music."
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
												label: "Line 2 (Coral Accent)",
												help: "Second line in coral, e.g. Cheesy burgers.",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													value: data.heroHeadline[1] ?? "",
													onChange: (e) => {
														const newHeadline = [
															data.heroHeadline[0] ?? "",
															e.target.value,
															data.heroHeadline[2] ?? ""
														];
														setData({
															...data,
															heroHeadline: newHeadline
														});
													},
													className: `${inputCls} text-coral font-semibold`,
													placeholder: "Cheesy burgers."
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
												label: "Line 3 (Marker Underline)",
												help: "Third line with yellow line, e.g. Tiny tables.",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													value: data.heroHeadline[2] ?? "",
													onChange: (e) => {
														const newHeadline = [
															data.heroHeadline[0] ?? "",
															data.heroHeadline[1] ?? "",
															e.target.value
														];
														setData({
															...data,
															heroHeadline: newHeadline
														});
													},
													className: inputCls,
													placeholder: "Tiny tables."
												})
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
									label: "Script Text beside Headline",
									help: "Handwritten script annotation, e.g. since 2014",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: data.heroHeadlineSince,
										onChange: (e) => setData({
											...data,
											heroHeadlineSince: e.target.value
										}),
										className: inputCls,
										placeholder: "e.g. since 2014"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
									label: "Short Story Paragraph",
									help: "Appears directly under the big headline",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										rows: 3,
										value: data.heroSubcopy,
										onChange: (e) => setData({
											...data,
											heroSubcopy: e.target.value
										}),
										className: `${inputCls} resize-none`,
										placeholder: "A scrappy little corner of Satya Niketan where DU South Campus has been celebrating birthdays, surviving deadlines, and arguing over the last momo for over a decade."
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-slate-300 text-xs font-semibold uppercase tracking-wider",
											children: "Rating, Reviews & Stat Badges (Below Buttons)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-slate-500",
											children: "Pills displaying reviews, press mentions, price range, etc."
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "button",
											variant: "outline",
											size: "sm",
											onClick: () => setData({
												...data,
												heroStats: [...data.heroStats ?? [], ""]
											}),
											className: "border-slate-700 bg-slate-800/60 text-slate-200 hover:text-white text-xs h-7 px-2.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-3.5 h-3.5 mr-1" }), "Add Stat"]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-2",
										children: data.heroStats.map((stat, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												value: stat,
												onChange: (e) => {
													const newStats = [...data.heroStats];
													newStats[idx] = e.target.value;
													setData({
														...data,
														heroStats: newStats
													});
												},
												className: inputCls,
												placeholder: idx === 0 ? "★ 4.3 · 1,567 reviews" : idx === 1 ? "· Featured in Delhi Times & So Delhi" : "· ₹400–900 for two"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												type: "button",
												variant: "ghost",
												size: "sm",
												onClick: () => {
													const newStats = data.heroStats.filter((_, i) => i !== idx);
													setData({
														...data,
														heroStats: newStats
													});
												},
												className: "text-slate-500 hover:text-red-400 hover:bg-red-500/10 h-8 w-8 p-0 shrink-0",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" })
											})]
										}, idx))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3 pt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-slate-300 text-xs font-semibold uppercase tracking-wider",
											children: "Hero Collage Photos (3 Images)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-slate-500",
											children: "Upload or replace the 3 featured photos displayed in the collage on the right of the homepage hero."
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full",
											children: "3 Photos"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid sm:grid-cols-3 gap-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoUpload, {
												label: "Photo 1 (Tall Portrait / Top Right)",
												help: "Main tall photo at the top right",
												buttonLabel: "Upload Photo 1",
												emptyLabel: "No photo",
												placeholder: "/uploads/hero-1.jpg or /photos/3.webp",
												value: data.heroCollagePhotos?.[0] ?? "",
												onChange: (url) => {
													const next = [
														url,
														data.heroCollagePhotos?.[1] ?? "",
														data.heroCollagePhotos?.[2] ?? ""
													];
													setData({
														...data,
														heroCollagePhotos: next
													});
												}
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoUpload, {
												label: "Photo 2 (Tilted Shot / Middle Left)",
												help: "Horizontal photo tilted left",
												buttonLabel: "Upload Photo 2",
												emptyLabel: "No photo",
												placeholder: "/uploads/hero-2.jpg or /photos/2.webp",
												value: data.heroCollagePhotos?.[1] ?? "",
												onChange: (url) => {
													const next = [
														data.heroCollagePhotos?.[0] ?? "",
														url,
														data.heroCollagePhotos?.[2] ?? ""
													];
													setData({
														...data,
														heroCollagePhotos: next
													});
												}
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoUpload, {
												label: "Photo 3 (Bottom Landscape / Bottom Right)",
												help: "Featured wide photo at the bottom",
												buttonLabel: "Upload Photo 3",
												emptyLabel: "No photo",
												placeholder: "/uploads/hero-3.jpg or /photos/1.webp",
												value: data.heroCollagePhotos?.[2] ?? "",
												onChange: (url) => {
													const next = [
														data.heroCollagePhotos?.[0] ?? "",
														data.heroCollagePhotos?.[1] ?? "",
														url
													];
													setData({
														...data,
														heroCollagePhotos: next
													});
												}
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-4 pt-4 border-t border-slate-800/80",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												className: "text-slate-200 text-sm font-bold uppercase tracking-wider",
												children: "Moving Bar Dishes (5 Dishes)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full",
												children: "★ Auto-Formatted with Stars"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-slate-400 mt-0.5",
											children: "Enter any 5 dishes below. The yellow moving bar on your homepage will immediately replace its text with these 5 dishes separated by ★ stars."
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "button",
											variant: "outline",
											size: "sm",
											onClick: () => {
												const defaultFive = [
													"KitKat Shake",
													"Steamy Momos",
													"Watermelon Mojito",
													"Brownie Fudge",
													"Cheesy Burgers"
												];
												const itemsWithStars = [];
												defaultFive.forEach((d) => {
													itemsWithStars.push(d);
													itemsWithStars.push("★");
												});
												setData({
													...data,
													marqueeDishes: defaultFive,
													marqueeItems: itemsWithStars
												});
											},
											className: "border-slate-700 bg-slate-800/60 text-slate-300 hover:text-white text-xs h-7 self-start sm:self-auto",
											children: "Reset to Popular 5"
										})]
									}), (() => {
										const currentDishes = data.marqueeDishes && data.marqueeDishes.length === 5 ? data.marqueeDishes : (data.marqueeItems || []).filter((item) => item !== "★").slice(0, 5);
										const safeDishes = [
											currentDishes[0] ?? "KitKat Shake",
											currentDishes[1] ?? "Steamy Momos",
											currentDishes[2] ?? "Watermelon Mojito",
											currentDishes[3] ?? "Brownie Fudge",
											currentDishes[4] ?? "Cheesy Burgers"
										];
										const handleDishChange = (index, val) => {
											const newDishes = [...safeDishes];
											newDishes[index] = val;
											const itemsWithStars = [];
											newDishes.forEach((d) => {
												if (d.trim()) {
													itemsWithStars.push(d.trim());
													itemsWithStars.push("★");
												}
											});
											setData({
												...data,
												marqueeDishes: newDishes,
												marqueeItems: itemsWithStars.length > 0 ? itemsWithStars : data.marqueeItems
											});
										};
										const dishPlaceholders = [
											"e.g. KitKat Shake",
											"e.g. Steamy Momos",
											"e.g. Watermelon Mojito",
											"e.g. Brownie Fudge",
											"e.g. Cheesy Burgers"
										];
										return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3",
											children: safeDishes.map((dish, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5 bg-slate-900/60 border border-slate-800 p-3 rounded-xl",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
														className: "text-[11px] font-bold text-amber-400 uppercase tracking-wider",
														children: ["Dish ", i + 1]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] text-slate-500 font-mono",
														children: "★ separator"
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													value: dish,
													onChange: (e) => handleDishChange(i, e.target.value),
													className: `${inputCls} font-medium`,
													placeholder: dishPlaceholders[i]
												})]
											}, i))
										});
									})()]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between mb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-3.5 h-3.5 text-emerald-400" }), "Live Hero Section & Moving Bar Preview"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] text-slate-500",
											children: "Updates live as you edit the fields above"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative rounded-2xl overflow-hidden border border-slate-700/60 bg-[#FAF7EE] text-[#1F1E1D] shadow-2xl",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-6 sm:p-10 grid lg:grid-cols-12 gap-8 items-center text-left",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "lg:col-span-7 space-y-5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2 text-xs font-semibold tracking-widest text-[#1F1E1D]/70 uppercase",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-[#FF6B6B] animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data.heroLocationBadge || "DELHI · 10:00 AM – 10:30 PM EVERY DAY" })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
														className: "font-serif font-black text-3xl sm:text-4xl md:text-5xl leading-[0.92] tracking-tight text-[#1F1E1D]",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: data.heroHeadline[0] || "Loud music." }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "text-[#FF6B6B]",
																children: data.heroHeadline[1] || "Cheesy burgers."
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex items-baseline gap-3 flex-wrap",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																	className: "relative inline-block pb-1",
																	children: [data.heroHeadline[2] || "Tiny tables.", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-0 bottom-0.5 w-full h-[6px] bg-[#F5C242] -z-0 rounded-sm" })]
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "font-serif italic text-xl sm:text-2xl text-[#6B8E23]",
																	children: data.heroHeadlineSince || "since 2014"
																})]
															})
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[#1F1E1D]/80 text-xs sm:text-sm max-w-xl leading-relaxed",
														children: data.heroSubcopy || "A scrappy little corner of Satya Niketan where DU South Campus has been celebrating birthdays, surviving deadlines, and arguing over the last momo for over a decade."
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex flex-wrap gap-2.5 pt-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "inline-flex items-center gap-1.5 rounded-full bg-[#1F1E1D] text-[#FAF7EE] px-4 py-2 text-xs font-medium",
															children: "Eat the menu →"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "inline-flex items-center gap-1.5 rounded-full bg-[#F5C242] border-2 border-[#1F1E1D] text-[#1F1E1D] px-4 py-2 text-xs font-medium",
															children: "Find us / book a table"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "flex flex-wrap items-center gap-x-5 gap-y-1.5 pt-2 text-xs text-[#1F1E1D]/70 font-medium",
														children: data.heroStats.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s }, i))
													})
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "lg:col-span-5 relative h-64 sm:h-72 w-full",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "absolute top-0 right-2 w-32 sm:w-40 h-44 sm:h-52 rounded-md overflow-hidden shadow-xl rotate-[4deg] bg-slate-200 border-2 border-white",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
															src: data.heroCollagePhotos?.[0] || "/photos/3.webp",
															alt: "Hero Collage 1",
															className: "h-full w-full object-cover"
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "absolute top-16 left-2 w-36 sm:w-44 h-28 sm:h-36 rounded-md overflow-hidden shadow-xl -rotate-[5deg] bg-slate-200 border-2 border-white",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
															src: data.heroCollagePhotos?.[1] || "/photos/2.webp",
															alt: "Hero Collage 2",
															className: "h-full w-full object-cover"
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "absolute bottom-2 right-4 w-40 sm:w-48 h-32 sm:h-40 rounded-md overflow-hidden shadow-2xl rotate-[2deg] bg-slate-200 border-2 border-white",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
															src: data.heroCollagePhotos?.[2] || "/photos/1.webp",
															alt: "Hero Collage 3",
															className: "h-full w-full object-cover"
														})
													})
												]
											})]
										}), (() => {
											const previewDishes = data.marqueeDishes && data.marqueeDishes.length === 5 ? data.marqueeDishes.filter((d) => d && d.trim().length > 0) : (data.marqueeItems || []).filter((i) => i !== "★").slice(0, 5);
											const activeDishes = previewDishes.length > 0 ? previewDishes : [
												"KitKat Shake",
												"Steamy Momos",
												"Watermelon Mojito",
												"Brownie Fudge",
												"Cheesy Burgers"
											];
											return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "bg-[#F5C242] text-[#1F1E1D] py-3 px-4 border-t-2 border-[#1F1E1D] overflow-hidden flex items-center font-display font-black text-xs sm:text-sm uppercase tracking-wider",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex items-center gap-6 animate-pulse shrink-0",
													children: Array.from({ length: 2 }).map((_, copyIdx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "flex items-center gap-6 shrink-0",
														children: activeDishes.map((dish, dIdx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "flex items-center gap-6",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "hover:text-coral transition-colors",
																children: dish
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-xs",
																children: "★"
															})]
														}, dIdx))
													}, copyIdx))
												})
											});
										})()]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-6 pt-6 border-t border-slate-800/80",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2 flex-wrap",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														className: "text-slate-200 text-sm font-bold uppercase tracking-wider",
														children: "Homepage Story Teaser (\"Our Whole Thing\")"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] font-semibold bg-coral/20 text-coral border border-coral/30 px-2 py-0.5 rounded-full",
														children: "Below Moving Bar"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-[10px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-full flex items-center gap-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3 h-3 text-rose-400" }), "Auto-Copies to About Page (/about)"]
													})
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-slate-400 mt-0.5",
												children: "Controls the featured story picture, headline, script label, and body subtext shown right below the moving dishes strip. Automatically copies to the About Page hero section as well!"
											})] })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoUpload, {
											label: "Story Teaser Photo",
											help: "Featured picture displayed on the left with decorative stripe accent",
											buttonLabel: "Upload Story Photo",
											emptyLabel: "No story photo",
											placeholder: "/uploads/story.jpg or /photos/4.webp",
											value: data.storyTeaserPhoto ?? "",
											onChange: (url) => setData({
												...data,
												storyTeaserPhoto: url
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
												label: "Script Tagline (Above Headline)",
												help: "e.g. our whole thing →",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													value: data.storyTeaserScriptLabel ?? "",
													onChange: (e) => setData({
														...data,
														storyTeaserScriptLabel: e.target.value
													}),
													className: inputCls,
													placeholder: "our whole thing →"
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													className: "text-slate-300 text-xs font-semibold uppercase tracking-wider",
													children: "Story Headline"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid sm:grid-cols-3 gap-4",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
															label: "Prefix Text",
															help: "e.g. Eleven years of",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																value: data.storyTeaserPrefix ?? "Eleven years of",
																onChange: (e) => setData({
																	...data,
																	storyTeaserPrefix: e.target.value
																}),
																className: inputCls,
																placeholder: "Eleven years of"
															})
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
															label: "Highlight 1 (Yellow Underline)",
															help: "e.g. fairy lights",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																value: data.storyTeaserH2?.[0] ?? "",
																onChange: (e) => {
																	const nextH2 = [e.target.value, data.storyTeaserH2?.[1] ?? ""];
																	setData({
																		...data,
																		storyTeaserH2: nextH2
																	});
																},
																className: inputCls,
																placeholder: "fairy lights"
															})
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
															label: "Highlight 2 (Coral Text)",
															help: "e.g. first-year crushes",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																value: data.storyTeaserH2?.[1] ?? "",
																onChange: (e) => {
																	const nextH2 = [data.storyTeaserH2?.[0] ?? "", e.target.value];
																	setData({
																		...data,
																		storyTeaserH2: nextH2
																	});
																},
																className: `${inputCls} text-coral font-semibold`,
																placeholder: "first-year crushes"
															})
														})
													]
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
											label: "Story Subtext / Paragraph",
											help: "The descriptive story paragraph displayed beside the photo",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
												rows: 4,
												value: data.storyTeaserBody ?? "",
												onChange: (e) => setData({
													...data,
													storyTeaserBody: e.target.value
												}),
												className: `${inputCls} resize-none leading-relaxed`,
												placeholder: "Amigos Hub opened on the first floor of a tiny Satya Niketan building in 2014 with three tables, one speaker, and a wall full of empty space. Today the walls are covered in sticky-note confessions, the speaker is louder, and there are still never quite enough tables on a Friday night."
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "pt-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between mb-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-3.5 h-3.5 text-coral" }), "Live Story Teaser Preview"]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[11px] text-slate-500",
													children: "Matches your homepage story section exactly"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "relative rounded-2xl overflow-hidden border border-slate-700/60 bg-[#FAF7EE] text-[#1F1E1D] p-6 sm:p-10 shadow-2xl",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid md:grid-cols-12 gap-8 items-center text-left",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "md:col-span-5 relative",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-3 -left-3 w-16 h-16 bg-[#F5C242] rounded-md opacity-80 -z-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "relative z-10 rounded-md overflow-hidden shadow-xl border border-black/10 aspect-[4/5] bg-slate-200",
															children: data.storyTeaserPhoto ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
																src: data.storyTeaserPhoto,
																alt: "Story teaser",
																className: "w-full h-full object-cover"
															}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "w-full h-full flex items-center justify-center text-xs text-slate-400",
																children: "No photo selected"
															})
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "md:col-span-7 space-y-4",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "font-serif italic text-coral text-2xl sm:text-3xl",
																children: data.storyTeaserScriptLabel || "our whole thing →"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
																className: "text-3xl sm:text-4xl md:text-5xl font-black font-serif leading-[0.95] text-[#1F1E1D]",
																children: [
																	data.storyTeaserPrefix || "Eleven years of",
																	" ",
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																		className: "relative inline-block pb-1",
																		children: [data.storyTeaserH2?.[0] || "fairy lights", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-0 bottom-0.5 w-full h-[6px] bg-[#F5C242] -z-0 rounded-sm" })]
																	}),
																	" ",
																	"and",
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																		className: "text-coral",
																		children: [" ", data.storyTeaserH2?.[1] || "first-year crushes"]
																	}),
																	"."
																]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-[#1F1E1D]/80 text-xs sm:text-sm leading-relaxed max-w-xl",
																children: data.storyTeaserBody || "Amigos Hub opened on the first floor of a tiny Satya Niketan building in 2014 with three tables, one speaker, and a wall full of empty space. Today the walls are covered in sticky-note confessions, the speaker is louder, and there are still never quite enough tables on a Friday night."
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "pt-2",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "inline-flex items-center gap-1.5 font-semibold text-xs sm:text-sm border-b-2 border-[#1F1E1D] pb-0.5",
																	children: "Read the full story →"
																})
															})
														]
													})]
												})
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-6 pt-6 border-t border-slate-800/80",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													className: "text-slate-200 text-sm font-bold uppercase tracking-wider",
													children: "4 Featured Food Dishes (\"What Everybody Orders\")"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full",
													children: "Homepage Grid (4 Cards)"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-slate-400 mt-0.5",
												children: "Upload 4 food photos along with their dish name and price. These 4 featured dishes appear in the signature dark section on your homepage."
											})] })
										}),
										(() => {
											const defaultFour = [
												{
													name: "Cheese Blast Burger",
													tag: "Fan Favorite",
													price: "₹220",
													img: "/photos/7.jpg",
													veg: false
												},
												{
													name: "Ferrero Fantasy",
													tag: "Bestseller",
													price: "₹180",
													img: "/photos/11.jpg",
													veg: true
												},
												{
													name: "Mix Sauce Pasta",
													tag: "Regulars' Pick",
													price: "₹220",
													img: "/photos/10.jpg",
													veg: true
												},
												{
													name: "Cheesy Chicken Feast",
													tag: "Munchies MVP",
													price: "₹190",
													img: "/photos/12.jpg",
													veg: false
												}
											];
											const dishes = [
												data.signatureDishes?.[0] || defaultFour[0],
												data.signatureDishes?.[1] || defaultFour[1],
												data.signatureDishes?.[2] || defaultFour[2],
												data.signatureDishes?.[3] || defaultFour[3]
											];
											const updateSignatureDish = (index, updatedFields) => {
												const nextDishes = [...dishes];
												nextDishes[index] = {
													...nextDishes[index],
													...updatedFields
												};
												const remaining = (data.signatureDishes || []).slice(4);
												setData({
													...data,
													signatureDishes: [...nextDishes, ...remaining]
												});
											};
											return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid grid-cols-1 md:grid-cols-2 gap-5",
												children: dishes.map((dish, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-slate-700 transition-colors shadow-lg",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center justify-between border-b border-slate-800 pb-3",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex items-center gap-2",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs font-bold font-mono",
																	children: i + 1
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-sm font-bold text-white",
																	children: dish.name || `Featured Dish ${i + 1}`
																})]
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
																type: "button",
																onClick: () => updateSignatureDish(i, { veg: !dish.veg }),
																className: `flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors cursor-pointer ${dish.veg ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20" : "bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500/20"}`,
																title: "Click to toggle Veg / Non-Veg",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `w-2 h-2 rounded-full ${dish.veg ? "bg-emerald-400" : "bg-red-400"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: dish.veg ? "Veg" : "Non-Veg" })]
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoUpload, {
															label: `Dish ${i + 1} Photo`,
															help: "Food picture for this card",
															buttonLabel: "Upload Food Photo",
															emptyLabel: "No food photo",
															placeholder: "/uploads/dish.jpg or /photos/7.jpg",
															value: dish.img ?? "",
															onChange: (url) => updateSignatureDish(i, { img: url })
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "grid grid-cols-2 gap-3",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
																label: "Dish Name",
																help: "e.g. Cheese Blast Burger",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																	value: dish.name,
																	onChange: (e) => updateSignatureDish(i, { name: e.target.value }),
																	className: inputCls,
																	placeholder: "e.g. Cheese Blast Burger"
																})
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
																label: "Price",
																help: "e.g. ₹220",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																	value: dish.price,
																	onChange: (e) => updateSignatureDish(i, { price: e.target.value }),
																	className: inputCls,
																	placeholder: "e.g. ₹220"
																})
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
															label: "Badge Tag (Optional)",
															help: "e.g. Fan Favorite, Bestseller, Regulars' Pick",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																value: dish.tag,
																onChange: (e) => updateSignatureDish(i, { tag: e.target.value }),
																className: inputCls,
																placeholder: "e.g. Bestseller"
															})
														})
													]
												}, i))
											});
										})(),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "pt-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between mb-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-3.5 h-3.5 text-amber-400" }), "Live \"What Everybody Orders\" Preview"]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[11px] text-slate-500",
													children: "Reflects your 4 food photos, names, and prices live"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "relative rounded-2xl overflow-hidden border border-slate-700/60 bg-[#161a24] text-cream p-6 sm:p-10 shadow-2xl",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-700/60 pb-6 mb-8 text-left",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "font-serif italic text-amber-400 text-2xl sm:text-3xl",
														children: "the regulars know"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
														className: "text-2xl sm:text-3xl md:text-4xl font-black font-serif text-white mt-1",
														children: "What everybody orders."
													})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "inline-flex items-center gap-1.5 rounded-full bg-amber-400 text-slate-950 font-bold px-4 py-2 text-xs w-fit",
														children: "See the full menu →"
													})]
												}), (() => {
													const defaultFour = [
														{
															name: "Cheese Blast Burger",
															tag: "Fan Favorite",
															price: "₹220",
															img: "/photos/7.jpg",
															veg: false
														},
														{
															name: "Ferrero Fantasy",
															tag: "Bestseller",
															price: "₹180",
															img: "/photos/11.jpg",
															veg: true
														},
														{
															name: "Mix Sauce Pasta",
															tag: "Regulars' Pick",
															price: "₹220",
															img: "/photos/10.jpg",
															veg: true
														},
														{
															name: "Cheesy Chicken Feast",
															tag: "Munchies MVP",
															price: "₹190",
															img: "/photos/12.jpg",
															veg: false
														}
													];
													return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "grid grid-cols-2 lg:grid-cols-4 gap-4 text-left",
														children: [
															data.signatureDishes?.[0] || defaultFour[0],
															data.signatureDishes?.[1] || defaultFour[1],
															data.signatureDishes?.[2] || defaultFour[2],
															data.signatureDishes?.[3] || defaultFour[3]
														].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: `group relative bg-[#FAF7EE] text-[#1F1E1D] rounded-xl overflow-hidden shadow-xl transition-all duration-300 ${i % 2 === 0 ? "rotate-[-1.5deg]" : "rotate-[1.5deg]"}`,
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "aspect-[4/5] overflow-hidden bg-slate-200",
																children: s.img ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
																	src: s.img,
																	alt: s.name,
																	className: "h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
																}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																	className: "h-full w-full flex items-center justify-center text-xs text-slate-400",
																	children: "No image"
																})
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "p-3.5 space-y-1.5",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "flex items-center justify-between gap-1",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																		className: "inline-flex items-center gap-1 text-[9px] uppercase tracking-wider font-bold text-coral",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `w-2 h-2 rounded-full ${s.veg ? "bg-emerald-500" : "bg-red-500"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s.tag || "Special" })]
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "font-display font-black text-sm text-[#1F1E1D]",
																		children: s.price
																	})]
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
																	className: "text-xs sm:text-sm font-black leading-tight text-[#1F1E1D] line-clamp-2",
																	children: s.name || `Dish ${i + 1}`
																})]
															})]
														}, i))
													});
												})()]
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-6 pt-6 border-t border-slate-800/80",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													className: "text-slate-200 text-sm font-bold uppercase tracking-wider",
													children: "Google Reviews Sticky Notes (\"Things People Actually Said\")"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "w-3 h-3 fill-emerald-300 text-emerald-300" }), "Auto-Fetch Top 10 5-Star Reviews"]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-slate-400 mt-0.5",
												children: "Paste your cafe's Google Maps link below. Click \"Fetch Top 10 5-Star Reviews\" and it will automatically retrieve 10 glowing 5-star customer reviews to replace the sticky notes wall on your homepage!"
											})] })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10 border border-amber-500/30 p-5 rounded-2xl space-y-4 shadow-xl",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-4 h-4" })
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
															className: "text-slate-200 text-xs font-bold uppercase tracking-wider",
															children: "Paste Cafe's Google Profile / Google Maps Link"
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] text-amber-300/80 font-mono",
														children: "Auto 5-Star Extraction"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex flex-col sm:flex-row gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														value: googleProfileUrl,
														onChange: (e) => setGoogleProfileUrl(e.target.value),
														placeholder: "https://maps.app.goo.gl/... or https://www.google.com/maps/place/...",
														className: "flex-1 bg-slate-950 border-amber-500/30 text-amber-200 placeholder:text-slate-600 text-xs font-mono h-10"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														type: "button",
														onClick: handleFetchGoogleReviews,
														disabled: fetchingReviews,
														className: "bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 h-10 shadow-md transition-all cursor-pointer shrink-0",
														children: fetchingReviews ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }), "Fetching 5-Star Reviews…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "w-4 h-4 mr-1.5 fill-slate-950 text-slate-950" }), "Fetch Top 10 5-Star Reviews"] })
													})]
												}),
												fetchingReviews && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2.5 text-xs text-amber-200 bg-amber-500/15 border border-amber-500/30 p-3 rounded-xl animate-pulse",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 text-amber-400 animate-spin shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Connecting to Google profile, resolving cafe details, and extracting top 10 verified 5-star customer reviews… Please wait a few seconds." })]
												}),
												fetchSuccessMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2.5 text-xs text-emerald-200 bg-emerald-500/15 border border-emerald-500/30 p-3.5 rounded-xl",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-5 h-5 text-emerald-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-0.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "font-bold text-emerald-300",
															children: "Reviews Successfully Loaded!"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-emerald-200/90",
															children: fetchSuccessMessage
														})]
													})]
												}),
												fetchErrorMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2.5 text-xs text-red-200 bg-red-500/15 border border-red-500/30 p-3.5 rounded-xl",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5 text-red-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-0.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "font-bold text-red-300",
															children: "Could Not Fetch Reviews"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-red-200/90",
															children: fetchErrorMessage
														})]
													})]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
														className: "text-slate-300 text-xs font-semibold uppercase tracking-wider",
														children: [
															"Loaded Reviews (",
															data.reviews?.length ?? 0,
															" Reviews)"
														]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] text-slate-500",
														children: "Editable below"
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													type: "button",
													variant: "outline",
													size: "sm",
													onClick: () => {
														setData({
															...data,
															reviews: [...data.reviews || [], {
																text: "Amazing cafe and great food!",
																who: "Customer"
															}]
														});
													},
													className: "border-slate-700 bg-slate-800/60 text-slate-300 hover:text-white text-xs h-7",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-3.5 h-3.5 mr-1" }), "Add Review"]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[420px] overflow-y-auto pr-1 no-scrollbar",
												children: (data.reviews || []).map((rev, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 space-y-2.5 hover:border-slate-700 transition-colors shadow",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center justify-between",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex items-center gap-1.5",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																	className: "text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded",
																	children: ["#", idx + 1]
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																	className: "text-[11px] text-amber-400 flex items-center gap-0.5 font-bold",
																	children: ["★★★★★ ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "text-slate-400 font-normal ml-1",
																		children: "5.0"
																	})]
																})]
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
																type: "button",
																variant: "ghost",
																size: "sm",
																onClick: () => {
																	const newReviews = data.reviews.filter((_, i) => i !== idx);
																	setData({
																		...data,
																		reviews: newReviews
																	});
																},
																className: "text-slate-500 hover:text-red-400 hover:bg-red-500/10 h-6 w-6 p-0 shrink-0",
																title: "Delete review",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3.5 h-3.5" })
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
															rows: 2,
															value: rev.text,
															onChange: (e) => {
																const nextReviews = [...data.reviews];
																nextReviews[idx] = {
																	...nextReviews[idx],
																	text: e.target.value
																};
																setData({
																	...data,
																	reviews: nextReviews
																});
															},
															className: `${inputCls} text-xs resize-none leading-relaxed`,
															placeholder: "Review quote..."
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center gap-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-[11px] text-slate-500 uppercase font-semibold",
																children: "Reviewer:"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																value: rev.who,
																onChange: (e) => {
																	const nextReviews = [...data.reviews];
																	nextReviews[idx] = {
																		...nextReviews[idx],
																		who: e.target.value
																	};
																	setData({
																		...data,
																		reviews: nextReviews
																	});
																},
																className: `${inputCls} text-xs h-7`,
																placeholder: "Name (e.g. Simran Gaha)"
															})]
														})
													]
												}, idx))
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "pt-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between mb-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-3.5 h-3.5 text-amber-400" }), "Live Sticky Notes Wall Preview (\"Things People Actually Said\")"]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[11px] text-slate-500",
													children: "Matches your homepage wishes wall"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "relative rounded-2xl overflow-hidden border border-slate-700/60 bg-[#FAF7EE] text-[#1F1E1D] p-6 sm:p-10 shadow-2xl space-y-6",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-left space-y-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "font-serif italic text-[#6B8E23] text-2xl sm:text-3xl",
														children: "straight from the wishes wall"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
														className: "text-3xl sm:text-4xl md:text-5xl font-black font-serif leading-[0.95] text-[#1F1E1D]",
														children: [
															"Things people",
															" ",
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																className: "relative inline-block pb-0.5",
																children: ["actually", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-0 bottom-0.5 w-full h-[6px] bg-[#F5C242] -z-0 rounded-sm" })]
															}),
															" ",
															"said."
														]
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "overflow-x-auto py-4 -my-2 flex gap-5 no-scrollbar",
													children: (data.reviews || []).slice(0, 10).map((r, i) => {
														const rotations = [
															"-2.5deg",
															"1.8deg",
															"-1.2deg",
															"2.2deg",
															"-2deg",
															"1.5deg"
														];
														const rot = rotations[i % rotations.length];
														return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "shrink-0 w-64 sm:w-72 bg-[#FDF3A7] text-[#1F1E1D] p-5 rounded shadow-md border border-[#E8DE8C]/60 flex flex-col justify-between transition-transform hover:scale-105 duration-300",
															style: { transform: `rotate(${rot})` },
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
																className: "font-serif italic text-base leading-snug text-[#1F1E1D]",
																children: [
																	"\"",
																	r.text,
																	"\""
																]
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
																className: "mt-5 text-[11px] uppercase tracking-widest text-[#1F1E1D]/75 font-semibold text-left",
																children: ["— ", r.who]
															})]
														}, i);
													})
												})]
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-6 pt-6 border-t border-slate-800/80",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													className: "text-slate-200 text-sm font-bold uppercase tracking-wider",
													children: "10 Homepage Showcase Photos (\"A Peek Inside\")"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-[10px] font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30 px-2 py-0.5 rounded-full flex items-center gap-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3 h-3 text-sky-400" }), "Auto-Syncs to Gallery \"Everything\""]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-slate-400 mt-0.5",
												children: "Upload or replace the 10 photos displayed in the creative mosaic on your homepage. These 10 photos automatically display on the Gallery page inside the \"Everything\" tab without having to re-upload them!"
											})] })
										}),
										(() => {
											const currentTen = data.homepageGalleryPhotos && data.homepageGalleryPhotos.length >= 10 ? data.homepageGalleryPhotos.slice(0, 10) : [
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
											].map((d, i) => data.homepageGalleryPhotos?.[i] || d);
											const updateHomepagePhoto = (index, url) => {
												const nextPhotos = [...currentTen];
												nextPhotos[index] = url;
												setData({
													...data,
													homepageGalleryPhotos: nextPhotos
												});
											};
											const photoLabels = [
												"Photo 1 (Tall Arch Left)",
												"Photo 2 (Top Oval)",
												"Photo 3 (Rounded Squircle)",
												"Photo 4 (Pill Capsule)",
												"Photo 5 (Arched Top)",
												"Photo 6 (Tall Mosaic Center)",
												"Photo 7 (Diagonal Cut)",
												"Photo 8 (Circle Frame)",
												"Photo 9 (Bottom Arch)",
												"Photo 10 (Accent Cut)"
											];
											return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4",
												children: currentTen.map((photoUrl, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "bg-slate-900/70 border border-slate-800 rounded-xl p-3.5 space-y-3 hover:border-slate-700 transition-colors shadow-md",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between border-b border-slate-800 pb-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "text-xs font-bold text-amber-400",
															children: ["#", i + 1]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[10px] text-slate-400 truncate max-w-[120px]",
															children: photoLabels[i]
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoUpload, {
														buttonLabel: `Upload Photo ${i + 1}`,
														emptyLabel: `No photo ${i + 1}`,
														placeholder: `/photos/${i % 4 + 1}.webp`,
														value: photoUrl,
														onChange: (url) => updateHomepagePhoto(i, url)
													})]
												}, i))
											});
										})(),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "pt-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between mb-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-3.5 h-3.5 text-sky-400" }), "Live \"A Peek Inside\" Mosaic Preview"]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[11px] text-slate-500",
													children: "Matches your homepage geometric mosaic"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "relative rounded-2xl overflow-hidden border border-slate-700/60 bg-[#FAF7EE] text-[#1F1E1D] p-6 sm:p-10 shadow-2xl space-y-6 text-left",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-end justify-between flex-wrap gap-4 border-b border-[#1F1E1D]/10 pb-4",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
														className: "text-3xl sm:text-4xl md:text-5xl font-black font-serif text-[#1F1E1D]",
														children: "A peek inside."
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-semibold text-xs sm:text-sm border-b-2 border-[#1F1E1D] pb-0.5 text-[#1F1E1D]",
														children: "Full gallery →"
													})]
												}), (() => {
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
														"rounded-tl-[2.5rem] rounded-br-[2.5rem] rounded-tr-md rounded-bl-md",
														"rounded-full",
														"rounded-3xl",
														"rounded-[2rem]",
														"rounded-t-full rounded-b-xl",
														"rounded-2xl",
														"rounded-bl-[3rem] rounded-tr-[3rem] rounded-tl-xl rounded-br-xl",
														"rounded-full",
														"rounded-t-full rounded-b-xl",
														"rounded-[2rem]"
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
													return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4",
														children: photos.slice(0, 10).map((src, i) => {
															return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: `group overflow-hidden border-2 border-[#1F1E1D] bg-[#F5C242] shadow-[3px_3px_0px_#1F1E1D] transition-all duration-300 ${i % 4 === 0 || i === 5 ? "row-span-2 aspect-[3/5]" : "aspect-square"} ${radii[i % radii.length]} ${rotations[i % rotations.length]}`,
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
																	src,
																	alt: `Cafe vibe ${i + 1}`,
																	className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 filter contrast-125 saturate-[1.1]"
																})
															}, i);
														})
													});
												})()]
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-6 pt-6 border-t border-slate-800/80",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													className: "text-slate-200 text-sm font-bold uppercase tracking-wider",
													children: "Homepage Location, Hours & Map (\"Find the door with the fairy lights\")"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-[10px] font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30 px-2 py-0.5 rounded-full flex items-center gap-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3 h-3 text-teal-400" }), "Auto-Syncs to Contact Page (/contact)"]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-slate-400 mt-0.5",
												children: "Update your cafe's full address, opening hours, calling phone number (replaces price on the homepage), and Google Maps embed link. Changes here automatically populate the Contact page and Footer — no need to re-enter!"
											})] })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-1 md:grid-cols-2 gap-5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "md:col-span-2",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
														label: "Cafe Address (Full Street Address)",
														help: "Displayed on the Homepage location card and the Contact page",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
															rows: 2,
															value: data.address,
															onChange: (e) => {
																const newAddr = e.target.value;
																setData({
																	...data,
																	address: newAddr,
																	addressShort: data.addressShort || newAddr.split(",")[0] || newAddr
																});
															},
															className: `${inputCls} resize-none`,
															placeholder: "e.g. 96, 1st, Satya Niketan, opposite Venkateshwar college, Moti Bagh II, Satya Niketan, South Moti Bagh, New Delhi, Delhi, 110021"
														})
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
													label: "Operating Hours",
													help: "e.g. 10:00 am – 10:30 pm every day",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														value: data.hours,
														onChange: (e) => setData({
															...data,
															hours: e.target.value,
															hoursShort: data.hoursShort || e.target.value
														}),
														className: inputCls,
														placeholder: "e.g. 10:00 am – 10:30 pm every day"
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
													label: "Phone Number (Replaces Price on Homepage)",
													help: "Displayed directly under Hours on Homepage and on the Contact page",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														value: data.phone,
														onChange: (e) => {
															const newPhone = e.target.value;
															const digits = newPhone.replace(/[^0-9]/g, "");
															setData({
																...data,
																phone: newPhone,
																whatsappNumber: digits || data.whatsappNumber
															});
														},
														className: inputCls,
														placeholder: "e.g. +91 99997 39766"
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
													label: "Google Maps Embed Link / Place Query",
													help: "Paste your Google Maps embed URL (https://www.google.com/maps/embed?...), <iframe> tag, or cafe search query",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														value: data.mapsEmbedQuery,
														onChange: (e) => setData({
															...data,
															mapsEmbedQuery: e.target.value
														}),
														className: `${inputCls} font-mono text-xs`,
														placeholder: "e.g. https://www.google.com/maps/embed?... or Amigos Hub Satya Niketan"
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
													label: "'Open in Google Maps' Button Link",
													help: "Direct Google Maps URL opened when clicking the button on Homepage or Contact page",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														value: data.socialLinks?.maps ?? "",
														onChange: (e) => setData({
															...data,
															socialLinks: {
																...data.socialLinks,
																maps: e.target.value
															}
														}),
														className: `${inputCls} font-mono text-xs`,
														placeholder: "https://maps.app.goo.gl/... or https://goo.gl/maps/..."
													})
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "pt-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between mb-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-3.5 h-3.5 text-teal-400" }), "Live Homepage Location & Map Preview"]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[11px] text-teal-300 font-medium",
													children: "⚡ Auto-synced with Contact Page"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "relative rounded-2xl overflow-hidden border border-slate-700/60 bg-[#FAF7EE] text-[#1F1E1D] p-6 sm:p-10 shadow-2xl space-y-6 text-left",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid md:grid-cols-2 gap-8 items-stretch",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex flex-col justify-between space-y-6",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "font-serif italic text-coral text-3xl",
																children: "come hang"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
																className: "mt-1 text-3xl sm:text-4xl md:text-5xl font-black font-serif text-[#1F1E1D] leading-tight",
																children: "Find the door with the fairy lights."
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
																className: "mt-6 space-y-4 text-[#1F1E1D]/80 text-sm",
																children: [
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
																		className: "text-[#1F1E1D] block font-bold text-xs uppercase tracking-wider",
																		children: "Address"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																		className: "mt-0.5 leading-relaxed",
																		children: data.address || "96, 1st, Satya Niketan, opposite Venkateshwar college..."
																	})] }),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
																		className: "text-[#1F1E1D] block font-bold text-xs uppercase tracking-wider",
																		children: "Hours"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																		className: "mt-0.5",
																		children: data.hours || "10:00 am – 10:30 pm every day"
																	})] }),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
																		className: "bg-teal-500/10 -mx-3 p-3 rounded-lg border border-teal-500/20",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
																			className: "text-[#1F1E1D] block font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 text-teal-700",
																			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneCall, { className: "w-3.5 h-3.5" }), "Phone (Replaces Price)"]
																		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																			className: "mt-0.5 font-bold font-mono text-base text-[#1F1E1D]",
																			children: data.phone || "+91 99997 39766"
																		})]
																	})
																]
															})
														] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "pt-2",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "inline-flex items-center gap-2 rounded-full bg-[#1F1E1D] text-[#FAF7EE] px-5 py-2.5 text-xs font-semibold shadow hover:bg-coral transition-colors cursor-pointer",
																children: "Open in Google Maps →"
															})
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "rounded-xl overflow-hidden shadow-2xl border-4 border-[#1F1E1D] min-h-[300px] sm:min-h-[360px] bg-slate-200",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
															title: "Google Maps Location",
															src: getGoogleMapsEmbedUrl(data.mapsEmbedQuery),
															className: "w-full h-full min-h-[300px] sm:min-h-[360px] border-0",
															loading: "lazy",
															referrerPolicy: "no-referrer-when-downgrade"
														})
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "pt-4 border-t border-[#1F1E1D]/10 flex items-center justify-between flex-wrap gap-2 text-xs text-[#1F1E1D]/70",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "flex items-center gap-1.5 font-medium",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4 text-emerald-600" }),
															"Same Address, Hours, Phone and Map automatically render on ",
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "font-bold text-[#1F1E1D]",
																children: "/contact"
															})
														]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[11px] bg-[#1F1E1D]/5 px-2.5 py-1 rounded-full font-mono",
														children: "No double data-entry required"
													})]
												})]
											})]
										})
									]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "menupage",
						className: "scroll-mt-28 bg-[#0f172a]/70 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UtensilsCrossed, { className: "w-5 h-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-xl font-bold text-white tracking-tight",
									children: "3. Menu Page Section"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-slate-400",
									children: "Categories, signature specials, prices, and menu highlights"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "/menu",
								target: "_blank",
								rel: "noreferrer",
								className: "text-xs font-semibold px-3 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/60 self-start sm:self-auto flex items-center gap-1.5 transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Route: /menu" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "w-3.5 h-3.5 text-slate-400" })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiMenuImporter, {
							data,
							setData,
							onSaveSuccess: () => {
								setSavedSuccess(true);
								setTimeout(() => setSavedSuccess(false), 3500);
							}
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "contactpage",
						className: "scroll-mt-28 bg-[#0f172a]/70 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneCall, { className: "w-5 h-5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-xl font-bold text-white tracking-tight",
										children: "4. Contact Page Section"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-slate-400",
										children: "Phone, WhatsApp, physical address, opening hours, and Google Maps"
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-semibold px-2.5 py-1 rounded-md bg-teal-500/10 text-teal-300 border border-teal-500/20 self-start sm:self-auto flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3.5 h-3.5" }), "Synced from Homepage"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-3.5 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-200/90 text-xs flex items-center gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-4 h-4 text-teal-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Zero duplicate work:" }), " Address, Hours, Phone and Google Maps are automatically shared with the Homepage section. Any changes made here or in the Homepage section stay 100% in sync!"] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid sm:grid-cols-2 gap-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
										label: "Display Phone",
										help: "Calling phone displayed on Contact cards and Homepage",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: data.phone,
											onChange: (e) => {
												const val = e.target.value;
												setData({
													...data,
													phone: val,
													whatsappNumber: val.replace(/[^0-9]/g, "") || data.whatsappNumber
												});
											},
											className: inputCls
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
										label: "WhatsApp Number (digits only)",
										help: "Used for table reservation WhatsApp button",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: data.whatsappNumber,
											onChange: (e) => setData({
												...data,
												whatsappNumber: e.target.value
											}),
											className: inputCls
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "sm:col-span-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
											label: "Full Address",
											help: "Physical address displayed on Contact page and Homepage",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												value: data.address,
												onChange: (e) => setData({
													...data,
													address: e.target.value
												}),
												className: inputCls
											})
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
										label: "Operating Hours",
										help: "Cafe daily schedule",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: data.hours,
											onChange: (e) => setData({
												...data,
												hours: e.target.value
											}),
											className: inputCls
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
										label: "Google Maps Embed Link / Query",
										help: "Google Maps embed URL, iframe code, or query",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: data.mapsEmbedQuery,
											onChange: (e) => setData({
												...data,
												mapsEmbedQuery: e.target.value
											}),
											className: `${inputCls} font-mono text-xs`
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
										label: "Instagram Profile Link",
										help: "Syncs with Footer and Contact page follow card",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												value: data.socialLinks?.instagram ?? "",
												onChange: (e) => setData({
													...data,
													socialLinks: {
														...data.socialLinks,
														instagram: e.target.value
													}
												}),
												className: `${inputCls} pl-9`,
												placeholder: "https://instagram.com/amigos.hub"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" })]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
										label: "Google Maps Profile / Navigation Link",
										help: "Syncs with 'Open in Google Maps' button and Contact page",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												value: data.socialLinks?.maps ?? "",
												onChange: (e) => setData({
													...data,
													socialLinks: {
														...data.socialLinks,
														maps: e.target.value
													}
												}),
												className: `${inputCls} pl-9 font-mono text-xs`,
												placeholder: "https://maps.app.goo.gl/..."
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" })]
										})
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "footer",
						className: "scroll-mt-28 bg-[#0f172a]/70 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelBottom, { className: "w-5 h-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-xl font-bold text-white tracking-tight",
									children: "5. Footer Section"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-slate-400",
									children: "Global footer brand name, bio text, Instagram handle, and auto-synced visit details"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60 self-start sm:self-auto",
								children: "Global Footer"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-200/90 text-xs flex items-center gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-4 h-4 text-indigo-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Auto-Connected:" }), " Address, Hours, Phone, and Google Profile are already auto-filled from your previous sections — zero re-typing required! Changes to Instagram or Phone here also sync automatically to the Contact page."] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid sm:grid-cols-2 gap-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
											label: "Cafe Name in Footer (and Global)",
											help: "The bold brand title shown in the footer and across the site",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												value: data.name,
												onChange: (e) => setData({
													...data,
													name: e.target.value
												}),
												className: inputCls,
												placeholder: "e.g. Amigos Hub"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
											label: "Script Tagline (Under Name)",
											help: "e.g. since 2014",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												value: data.footerTagline,
												onChange: (e) => setData({
													...data,
													footerTagline: e.target.value
												}),
												className: inputCls,
												placeholder: "e.g. since 2014"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "sm:col-span-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
												label: "Text Below Cafe Name (Footer Bio Paragraph)",
												help: "The story paragraph displayed on the left side of the footer",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
													rows: 3,
													value: data.footerBody,
													onChange: (e) => setData({
														...data,
														footerBody: e.target.value
													}),
													className: `${inputCls} resize-none leading-relaxed`,
													placeholder: "A tiny, loud, plant-strung corner of Satya Niketan that has been feeding DU South Campus on a student budget for over a decade."
												})
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
											label: "Instagram Profile Link",
											help: "Opens when visitors click the Instagram icon (also updates Contact page)",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "relative",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													value: data.socialLinks?.instagram ?? "",
													onChange: (e) => setData({
														...data,
														socialLinks: {
															...data.socialLinks,
															instagram: e.target.value
														}
													}),
													className: `${inputCls} pl-9`,
													placeholder: "https://instagram.com/amigos.hub"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" })]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
											label: "Google Profile / Maps Link",
											help: "Auto-taken from Homepage/Reviews. Click to edit.",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "relative",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													value: data.socialLinks?.maps ?? "",
													onChange: (e) => setData({
														...data,
														socialLinks: {
															...data.socialLinks,
															maps: e.target.value
														}
													}),
													className: `${inputCls} pl-9 font-mono text-xs`,
													placeholder: "https://maps.app.goo.gl/..."
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" })]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
											label: "Calling Phone Number",
											help: "Auto-taken from previous info. Click to call from footer icon.",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "relative",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													value: data.phone,
													onChange: (e) => {
														const val = e.target.value;
														setData({
															...data,
															phone: val,
															whatsappNumber: val.replace(/[^0-9]/g, "") || data.whatsappNumber
														});
													},
													className: `${inputCls} pl-9`,
													placeholder: "+91 99997 39766"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" })]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
											label: "Short Address in Footer (Optional)",
											help: "Leave empty to automatically use your full address from Homepage",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												value: data.addressShort,
												onChange: (e) => setData({
													...data,
													addressShort: e.target.value
												}),
												className: inputCls,
												placeholder: data.address || "e.g. 96, 1st, Satya Niketan, Delhi"
											})
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5 text-[11px]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3.5 h-3.5 text-emerald-400" }), "Footer \"VISIT\" Section Data"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-slate-400",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
														className: "text-slate-300",
														children: "Address:"
													}),
													" ",
													data.addressShort || data.address || "96, 1st, Satya Niketan..."
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-slate-400",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
														className: "text-slate-300",
														children: "Hours:"
													}),
													" ",
													data.hoursShort || data.hours || "10:00 am – 10:30 pm every day"
												]
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "shrink-0 text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full",
										children: "Auto-Synced from Homepage"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between mb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-3.5 h-3.5 text-indigo-400" }), "Live Footer Preview"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] text-slate-500",
											children: "Matches your site footer across all pages"
										})]
									}), (() => {
										const trimmedName = data.name?.trim() || "Cafe Name";
										const nameParts = trimmedName.split(" ");
										const nameLast = nameParts.length > 1 ? nameParts.pop() ?? "" : "";
										const nameFirst = nameParts.length > 0 ? nameParts.join(" ") : trimmedName;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative rounded-2xl overflow-hidden border border-slate-700/60 bg-[#1c1b18] text-[#FAF7EE] shadow-2xl text-left",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 w-full bg-gradient-to-r from-[#F5C242] via-[#FF6B6B] to-[#F5C242]" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "p-6 sm:p-10 grid gap-8 md:grid-cols-4",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "md:col-span-2 space-y-3",
															children: [
																data.logoUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
																	src: data.logoUrl,
																	alt: data.name,
																	className: "h-10 w-auto object-contain drop-shadow"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "font-serif font-black text-2xl sm:text-3xl text-white",
																	children: [
																		nameFirst,
																		" ",
																		nameLast && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "text-[#F5C242]",
																			children: nameLast
																		})
																	]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																	className: "font-serif italic text-xl text-[#F5C242]",
																	children: data.footerTagline || "since 2014"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																	className: "text-xs sm:text-sm text-[#FAF7EE]/70 max-w-sm leading-relaxed",
																	children: data.footerBody || "A tiny, loud, plant-strung corner that feeds everyone on a budget."
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "pt-2 flex items-center gap-3",
																	children: [
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
																			href: data.socialLinks?.instagram || "#",
																			target: "_blank",
																			rel: "noreferrer",
																			className: "bg-white/10 p-2.5 rounded-full hover:bg-[#F5C242] hover:text-[#1c1b18] transition-colors text-white/80",
																			title: "Instagram",
																			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "w-4 h-4" })
																		}),
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
																			href: data.socialLinks?.maps || "#",
																			target: "_blank",
																			rel: "noreferrer",
																			className: "bg-white/10 p-2.5 rounded-full hover:bg-[#F5C242] hover:text-[#1c1b18] transition-colors text-white/80",
																			title: "Google Maps",
																			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-4 h-4" })
																		}),
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
																			href: `tel:${data.phone?.replace(/[^+0-9]/g, "") || data.phone}`,
																			className: "bg-white/10 p-2.5 rounded-full hover:bg-[#F5C242] hover:text-[#1c1b18] transition-colors text-white/80",
																			title: "Phone",
																			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "w-4 h-4" })
																		})
																	]
																})
															]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "space-y-2 text-xs",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
																	className: "text-[#F5C242] text-xs font-bold uppercase tracking-widest",
																	children: "Visit"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																	className: "text-[#FAF7EE]/80 leading-relaxed whitespace-pre-line",
																	children: data.addressShort || data.address || "96, 1st, Satya Niketan, opposite Venkateshwar college..."
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																	className: "text-[#FAF7EE]/80 pt-1",
																	children: data.hoursShort || data.hours || "10:00 am – 10:30 pm every day"
																})
															]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "space-y-2 text-xs",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
																className: "text-[#F5C242] text-xs font-bold uppercase tracking-widest",
																children: "Wander"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
																className: "space-y-1.5 text-[#FAF7EE]/70",
																children: [
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Home" }),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Menu" }),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "About" }),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Gallery" }),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Contact" })
																]
															})]
														})
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "border-t border-white/10 py-3 text-center text-[11px] text-white/50",
													children: [
														"© ",
														(/* @__PURE__ */ new Date()).getFullYear(),
														" ",
														data.name || "Cafe Name",
														" · Made with chai & late nights"
													]
												})
											]
										});
									})()]
								})
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 border border-slate-800 shadow-2xl backdrop-blur-md px-5 py-3 rounded-full flex items-center gap-4",
				children: [savedSuccess ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs font-medium text-emerald-400 flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4" }), "Changes saved successfully"]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-slate-400 hidden sm:inline",
					children: "Edits update live site across all pages"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: handleSaveAll,
					disabled: saving,
					className: "bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-5 text-xs h-8 rounded-full shadow transition-all cursor-pointer",
					children: saving ? "Saving…" : "Save All Changes"
				})]
			})
		]
	});
}
//#endregion
export { QuickDashboardPage as component };
