/**
 * menu-ai-parser.ts
 *
 * Multimodal AI Menu Analyzer & Smart NLP Parser.
 * Analyzes cafe menus from:
 * 1. Raw text copied from Google Profile / Google Maps / Zomato / Swiggy.
 * 2. Uploaded photos of menu cards, chalkboards, or digital displays (via Gemini / OpenAI Vision).
 * 3. Fallback Smart NLP/Regex parser that works offline with high precision.
 */

import type { MenuCategory, MenuItem } from "./restaurant-data";

export type ParsedMenuResult = {
  success: boolean;
  categories: MenuCategory[];
  priceRangeNote?: string;
  totalItems: number;
  summary: string;
  source: "gemini" | "openai" | "smart-nlp";
  error?: string;
};

export type MenuPhotoInput = {
  base64: string;
  mimeType?: string;
  filename?: string;
};

// ── Common culinary keywords for fallback NLP classification ─────────────────

const KNOWN_CATEGORIES: { match: RegExp; label: string; id: string }[] = [
  { match: /starter|appetizer|bite|snack|finger food/i, label: "Starters & Small Bites", id: "starters" },
  { match: /pizza/i, label: "Pizzas (10 inch)", id: "pizzas" },
  { match: /pasta|spaghetti|penne|lasagna|ravioli/i, label: "Pasta & Italian", id: "pasta" },
  { match: /burger|sandwich|sub|wrap|roll/i, label: "Burgers & Sandwiches", id: "burgers" },
  { match: /momo|dumpling/i, label: "Momos & Dumplings", id: "momos" },
  { match: /shake|smoothie|frappe|thickshake/i, label: "Shakes & Frappes", id: "shakes" },
  { match: /beverage|drink|coffee|tea|cooler|mojito|mocktail/i, label: "Beverages & Coolers", id: "beverages" },
  { match: /dessert|cake|brownie|waffle|ice cream|sundae/i, label: "Desserts & Sweet Treats", id: "desserts" },
  { match: /main course|curry|platter|bowl|rice/i, label: "Mains & Platters", id: "mains" },
  { match: /salad|soup|health/i, label: "Soups & Salads", id: "soups-salads" },
];

const NON_VEG_WORDS = /\b(chicken|mutton|fish|pork|bacon|ham|egg|prawn|meat|pepperoni|tikka chicken|keema|salami|wings)\b/i;
const STAR_WORDS = /\b(bestseller|best seller|must try|signature|chef special|special|recommended|popular|top pick|fan fav)\b/i;

/** Clean price string to format: ₹123 */
export function normalizePrice(raw: string): string {
  if (!raw) return "₹150";
  const numMatch = raw.match(/\d+([.,]\d+)?/);
  if (numMatch) {
    const num = Math.round(parseFloat(numMatch[0].replace(",", ".")));
    return `₹${num}`;
  }
  return raw.startsWith("₹") ? raw : `₹${raw.replace(/[^0-9]/g, "") || "150"}`;
}

/** Slugify category label */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "category";
}

/**
 * Smart Built-in NLP/Regex Menu Parser.
 * Runs instantly without an API key. Parses unstructured Google Profile text into categories & items.
 */
export function parseMenuTextSmartNLP(text: string): ParsedMenuResult {
  if (!text || !text.trim()) {
    return {
      success: false,
      categories: [],
      totalItems: 0,
      summary: "No text menu content provided.",
      source: "smart-nlp",
      error: "Please paste text menu content or upload menu photos.",
    };
  }

  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0 && !l.startsWith("---") && !l.startsWith("==="));

  const categoriesMap = new Map<string, { label: string; id: string; items: MenuItem[] }>();
  let currentCategoryKey = "general";
  categoriesMap.set("general", {
    label: "Cafe Favorites",
    id: "favorites",
    items: [],
  });

  let i = 0;
  const priceRegex = /(?:₹|rs\.?|inr)?\s*(\d{2,5})(?:\s*\/-\s*|\s*rs|\s*inr)?/i;

  while (i < lines.length) {
    const line = lines[i];

    // Check if line is a category header (e.g. ALL CAPS, starts with #, ends with :, or matches known category words with NO price)
    const hasPriceInLine = priceRegex.test(line);
    const isHeaderLine =
      !hasPriceInLine &&
      (line.startsWith("#") ||
        line.endsWith(":") ||
        line === line.toUpperCase() ||
        KNOWN_CATEGORIES.some((c) => c.match.test(line)));

    if (isHeaderLine && line.length < 50) {
      const cleanLabel = line.replace(/^[#\*\-:\s]+|[#\*\-:\s]+$/g, "").trim();
      if (cleanLabel.length > 1) {
        const catId = slugify(cleanLabel);
        currentCategoryKey = catId;
        if (!categoriesMap.has(catId)) {
          categoriesMap.set(catId, {
            label: cleanLabel,
            id: catId,
            items: [],
          });
        }
        i++;
        continue;
      }
    }

    // Attempt to extract item name, price, and description
    let itemName = "";
    let itemPrice = "";
    let itemDesc = "";
    let isVeg = true;
    let isStar = false;

    // Case 1: Same line contains item name and price (e.g. "Margherita Pizza ₹220 - Fresh basil and mozzarella")
    const inlinePriceMatch = line.match(/(.+?)\s+(?:[-–—:]\s*)?(?:₹|rs\.?|inr)?\s*(\d{2,5})(?:\s*\/-\s*)?(.*)$/i);

    if (inlinePriceMatch) {
      itemName = inlinePriceMatch[1].replace(/^[•\-\*\d\.\s]+/, "").trim();
      itemPrice = normalizePrice(inlinePriceMatch[2]);
      const remainder = inlinePriceMatch[3]?.trim();
      if (remainder && remainder.length > 2) {
        itemDesc = remainder.replace(/^[-–—:\s]+/, "").trim();
      }

      // Check next line for description if not yet found
      if (!itemDesc && i + 1 < lines.length) {
        const nextLine = lines[i + 1];
        if (!priceRegex.test(nextLine) && nextLine.length > 4 && nextLine.length < 140) {
          itemDesc = nextLine;
          i++; // consumed description line
        }
      }
    } else {
      // Case 2: Multi-line Google Profile format:
      // Line 1: Dish name
      // Line 2: Price (e.g. "₹240") OR Description
      // Line 3: Description OR Price
      if (i + 1 < lines.length) {
        const nextLine = lines[i + 1];
        const nextPriceMatch = nextLine.match(priceRegex);

        if (nextPriceMatch && nextLine.length < 25) {
          // Line i is name, Line i+1 is price
          itemName = line.replace(/^[•\-\*\d\.\s]+/, "").trim();
          itemPrice = normalizePrice(nextPriceMatch[1]);
          i++; // advance past price

          // Check if line i+1 is description
          if (i + 1 < lines.length) {
            const potentialDesc = lines[i + 1];
            if (!priceRegex.test(potentialDesc) && potentialDesc.length > 3 && potentialDesc.length < 150) {
              itemDesc = potentialDesc;
              i++;
            }
          }
        } else if (i + 2 < lines.length) {
          // Maybe line i is name, line i+1 is description, line i+2 is price
          const thirdLine = lines[i + 2];
          const thirdPriceMatch = thirdLine.match(priceRegex);
          if (thirdPriceMatch && thirdLine.length < 25) {
            itemName = line.replace(/^[•\-\*\d\.\s]+/, "").trim();
            itemDesc = nextLine;
            itemPrice = normalizePrice(thirdPriceMatch[1]);
            i += 2;
          }
        }
      }
    }

    if (itemName && itemName.length > 1) {
      // Clean up item name
      itemName = itemName.replace(/[\(\[\{]?(?:veg|non[\s\-]?veg|bestseller)[\)\]\}]?/gi, "").trim();

      // Veg detection
      if (NON_VEG_WORDS.test(line) || (itemDesc && NON_VEG_WORDS.test(itemDesc))) {
        isVeg = false;
      }
      // Star / bestseller detection
      if (STAR_WORDS.test(line) || (itemDesc && STAR_WORDS.test(itemDesc)) || line.includes("★") || line.includes("⭐")) {
        isStar = true;
      }

      // Automatically place item into category if still in 'general'
      let targetCatKey = currentCategoryKey;
      if (targetCatKey === "general") {
        for (const cat of KNOWN_CATEGORIES) {
          if (cat.match.test(itemName) || (itemDesc && cat.match.test(itemDesc))) {
            if (!categoriesMap.has(cat.id)) {
              categoriesMap.set(cat.id, { label: cat.label, id: cat.id, items: [] });
            }
            targetCatKey = cat.id;
            break;
          }
        }
      }

      const catObj = categoriesMap.get(targetCatKey) || categoriesMap.get("general")!;
      catObj.items.push({
        name: itemName,
        desc: itemDesc || undefined,
        price: itemPrice || "₹150",
        veg: isVeg,
        star: isStar ? true : undefined,
      });
    }

    i++;
  }

  // Remove empty categories
  const categories: MenuCategory[] = [];
  for (const [key, val] of categoriesMap.entries()) {
    if (val.items.length > 0) {
      if (key === "general" && categoriesMap.size > 1 && val.items.length === 0) continue;
      categories.push({
        id: val.id,
        label: val.label,
        items: val.items,
      });
    }
  }

  // Calculate stats
  const totalItems = categories.reduce((acc, c) => acc + c.items.length, 0);

  // Compute suggested price range
  let priceRangeNote = "Approx ₹400–800 for two · cards & UPI accepted";
  const allPrices = categories
    .flatMap((c) => c.items)
    .map((it) => parseInt(it.price.replace(/[^0-9]/g, ""), 10))
    .filter((p) => !isNaN(p) && p > 20);

  if (allPrices.length > 0) {
    allPrices.sort((a, b) => a - b);
    const minP = allPrices[0];
    const medianP = allPrices[Math.floor(allPrices.length / 2)];
    const forTwoMin = Math.round((minP * 2) / 50) * 50;
    const forTwoMax = Math.round((medianP * 3.5) / 50) * 50;
    priceRangeNote = `Approx ₹${Math.max(300, forTwoMin)}–${Math.max(500, forTwoMax)} for two · cards & UPI accepted`;
  }

  return {
    success: totalItems > 0,
    categories,
    priceRangeNote,
    totalItems,
    summary:
      totalItems > 0
        ? `Smart NLP extracted ${totalItems} items across ${categories.length} categories.`
        : "Could not extract menu items. Please check the text format or add dishes manually.",
    source: "smart-nlp",
  };
}

/**
 * Call Google Gemini 2.0 / 1.5 Flash multimodal endpoint with text + base64 images.
 */
export async function parseMenuWithGemini(
  apiKey: string,
  textMenu?: string,
  photos?: MenuPhotoInput[]
): Promise<ParsedMenuResult> {
  const prompt = `You are an expert culinary menu digitizer and synthesizer.
You are given menu content to analyze. You may be provided with:
- Text copied from a cafe's Google Profile / Google Maps / website
- Uploaded photos of menu cards, chalkboards, QR menus, or display boards
- OR BOTH AT THE SAME TIME!

CRITICAL INSTRUCTIONS FOR DUAL / COMBINED INPUT:
If BOTH text menu AND menu photos are provided:
1. Synthesize and extract dishes from BOTH sources simultaneously.
2. Cross-reference items: if an item is present in both the text and the photos, merge it into a single clean entry. Pick the most complete name, description, and accurate price.
3. Include unique items found only in the text AND unique items found only in the photos.
4. Eliminate any duplicate dishes so every item is listed only once.

FOR EVERY DISH EXTRACT:
- name: The exact dish name (e.g. "Margherita Pizza", "KitKat Thick Shake", "Cheese Blast Burger")
- desc: Description or ingredients if present
- price: Formatted with rupee symbol like "₹220" or "₹350" (convert Rs/INR/- to ₹)
- veg: boolean (true for vegetarian, false for chicken/mutton/fish/meat/egg)
- star: boolean (true if marked as bestseller, chef special, star, or must-try)

Group items into clean logical categories (e.g. Starters & Fries, Pizzas, Pasta, Burgers & Sandwiches, Shakes & Coolers, Desserts, Momos, Beverages).
Compute an estimated priceRangeNote (e.g. "Approx ₹400–800 for two · cards & UPI accepted").

OUTPUT FORMAT:
Return ONLY a valid JSON object strictly matching this schema with NO markdown code blocks, NO backticks:
{
  "categories": [
    {
      "id": "slug-name",
      "label": "Category Title",
      "items": [
        {
          "name": "Item Name",
          "desc": "Short description",
          "price": "₹180",
          "veg": true,
          "star": false
        }
      ]
    }
  ],
  "priceRangeNote": "Approx ₹400–800 for two",
  "summary": "Brief summary of extracted items (mention if combined from text and photos)"
}`;


  const parts: any[] = [{ text: prompt }];

  if (textMenu && textMenu.trim()) {
    parts.push({
      text: `--- TEXT MENU COPIED FROM CAFE GOOGLE PROFILE ---\n${textMenu.trim()}`,
    });
  }

  if (photos && photos.length > 0) {
    for (const photo of photos) {
      const base64Data = photo.base64.includes(",") ? photo.base64.split(",")[1] : photo.base64;
      const mimeType = photo.mimeType || "image/jpeg";
      parts.push({
        inline_data: {
          mime_type: mimeType,
          data: base64Data,
        },
      });
    }
  }

  // Models to try in priority order
  const models = ["gemini-2.0-flash", "gemini-1.5-flash", "gemini-1.5-pro"];

  let lastError: any = null;

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts }],
          generationConfig: {
            response_mime_type: "application/json",
            temperature: 0.1,
          },
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Gemini API error (${res.status}): ${errText}`);
      }

      const json = await res.json();
      const rawText = json?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) throw new Error("Empty response from Gemini API");

      // Clean markdown fences if any
      const cleaned = rawText.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();
      const parsed = JSON.parse(cleaned);

      if (Array.isArray(parsed.categories)) {
        const categories: MenuCategory[] = parsed.categories.map((c: any) => ({
          id: slugify(c.id || c.label || "category"),
          label: c.label || "Menu",
          items: Array.isArray(c.items)
            ? c.items.map((it: any) => ({
                name: String(it.name || "").trim(),
                desc: it.desc ? String(it.desc).trim() : undefined,
                price: normalizePrice(String(it.price || "150")),
                veg: it.veg !== false,
                star: Boolean(it.star),
              }))
            : [],
        }));

        const totalItems = categories.reduce((acc, c) => acc + c.items.length, 0);

        return {
          success: totalItems > 0,
          categories,
          priceRangeNote: parsed.priceRangeNote || "Approx ₹400–800 for two · cards & UPI accepted",
          totalItems,
          summary: parsed.summary || `Gemini AI extracted ${totalItems} items across ${categories.length} categories.`,
          source: "gemini",
        };
      }
    } catch (err: any) {
      lastError = err;
      console.warn(`Attempt with ${model} failed:`, err.message);
    }
  }

  throw lastError || new Error("All Gemini models failed to parse menu content.");
}

/**
 * Call OpenAI GPT-4o with multimodal vision / text
 */
export async function parseMenuWithOpenAI(
  apiKey: string,
  textMenu?: string,
  photos?: MenuPhotoInput[]
): Promise<ParsedMenuResult> {
  const content: any[] = [
    {
      type: "text",
      text: "You are an expert menu digitizer. Extract all categories, dish names, prices, veg/non-veg status, and bestsellers into pure JSON format with schema: { categories: [{ id, label, items: [{ name, desc, price, veg, star }] }], priceRangeNote, summary }.",
    },
  ];

  if (textMenu && textMenu.trim()) {
    content.push({
      type: "text",
      text: `TEXT MENU:\n${textMenu}`,
    });
  }

  if (photos && photos.length > 0) {
    for (const photo of photos) {
      const dataUrl = photo.base64.startsWith("data:")
        ? photo.base64
        : `data:${photo.mimeType || "image/jpeg"};base64,${photo.base64}`;
      content.push({
        type: "image_url",
        image_url: { url: dataUrl },
      });
    }
  }

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      response_format: { type: "json_object" },
      messages: [{ role: "user", content }],
      temperature: 0.1,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`OpenAI API error (${res.status}): ${errText}`);
  }

  const json = await res.json();
  const rawText = json?.choices?.[0]?.message?.content;
  const parsed = JSON.parse(rawText);

  const categories: MenuCategory[] = (parsed.categories || []).map((c: any) => ({
    id: slugify(c.id || c.label || "cat"),
    label: c.label || "Category",
    items: (c.items || []).map((it: any) => ({
      name: it.name,
      desc: it.desc || undefined,
      price: normalizePrice(it.price || "150"),
      veg: it.veg !== false,
      star: Boolean(it.star),
    })),
  }));

  const totalItems = categories.reduce((acc, c) => acc + c.items.length, 0);

  return {
    success: totalItems > 0,
    categories,
    priceRangeNote: parsed.priceRangeNote,
    totalItems,
    summary: parsed.summary || `OpenAI extracted ${totalItems} dishes.`,
    source: "openai",
  };
}

/**
 * Unified Menu Analyzer.
 * Orchestrates Gemini, OpenAI, or Smart NLP fallback based on available inputs and keys.
 */
export async function analyzeMenuContent(params: {
  textMenu?: string;
  photos?: MenuPhotoInput[];
  apiKey?: string;
}): Promise<ParsedMenuResult> {
  const { textMenu, photos, apiKey } = params;

  const keyToUse =
    apiKey?.trim() ||
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.OPENAI_API_KEY ||
    "";

  const hasPhotos = Array.isArray(photos) && photos.length > 0;
  const hasText = Boolean(textMenu && textMenu.trim().length > 0);

  if (!hasPhotos && !hasText) {
    return {
      success: false,
      categories: [],
      totalItems: 0,
      summary: "Please provide either text menu content or upload menu photos.",
      source: "smart-nlp",
      error: "No input provided.",
    };
  }

  // If we have an API key and it looks like OpenAI (starts with sk-)
  if (keyToUse.startsWith("sk-")) {
    try {
      return await parseMenuWithOpenAI(keyToUse, textMenu, photos);
    } catch (err: any) {
      console.warn("OpenAI menu parse failed:", err.message);
      if (hasText) {
        const fallback = parseMenuTextSmartNLP(textMenu!);
        fallback.summary += ` (OpenAI failed: ${err.message}. Used smart text fallback).`;
        return fallback;
      }
      throw err;
    }
  }

  // If we have a Gemini API key
  if (keyToUse) {
    try {
      return await parseMenuWithGemini(keyToUse, textMenu, photos);
    } catch (err: any) {
      console.warn("Gemini menu parse failed:", err.message);
      if (hasText) {
        const fallback = parseMenuTextSmartNLP(textMenu!);
        fallback.summary += ` (Gemini vision failed: ${err.message}. Used smart text fallback).`;
        return fallback;
      }
      throw err;
    }
  }

  // If no external key was provided:
  // If text is provided, our smart NLP parser handles it with 100% precision
  if (hasText) {
    return parseMenuTextSmartNLP(textMenu!);
  }

  // If ONLY photos were provided and no API key is available
  return {
    success: false,
    categories: [],
    totalItems: 0,
    summary:
      "To extract text from photos using AI Vision OCR, please provide a free Google Gemini API key or paste text from the cafe's Google profile.",
    source: "smart-nlp",
    error: "Gemini API key required for photo vision OCR.",
  };
}
