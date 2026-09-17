import { t as defaultRestaurantData } from "./restaurant-data-CS6Zqjj-.mjs";
import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
//#region node_modules/.nitro/vite/services/ssr/assets/cms-store-FNPBhPoM.js
/**
* cms-store.ts
*
* Server-side persistence layer — reads/writes data/restaurant.json.
* Uses Node.js built-ins (fs, path, crypto). Import ONLY from inside
* createServerFn handlers so it is never bundled for the client.
*
* Data directory: <project_root>/data/restaurant.json
* Uploads directory: <project_root>/public/uploads/
*
* NOTE: On Vercel Serverless Functions the filesystem is read-only outside /tmp.
* For production deployments on Vercel, replace getRestaurantData / saveRestaurantData
* with a Vercel KV (Redis) or Postgres-backed store. For local dev and Node.js servers
* this file-based approach works without any external services.
*/
var DATA_DIR = join(process.cwd(), "data");
var DATA_FILE = join(DATA_DIR, "restaurant.json");
var UPLOADS_DIR = join(process.cwd(), "public", "uploads");
/**
* Returns the current restaurant data.
* Falls back to seed defaults when data/restaurant.json does not yet exist.
* Merges with defaults so new fields added in future code updates are always present.
*/
async function getRestaurantData() {
	try {
		const raw = await readFile(DATA_FILE, "utf-8");
		const saved = JSON.parse(raw);
		return {
			...defaultRestaurantData,
			...saved
		};
	} catch {
		return { ...defaultRestaurantData };
	}
}
/**
* Persists a full or partial update to data/restaurant.json.
* Creates the data/ directory if it doesn't exist.
*/
async function saveRestaurantData(update) {
	await mkdir(DATA_DIR, { recursive: true });
	const updated = {
		...await getRestaurantData(),
		...update
	};
	await writeFile(DATA_FILE, JSON.stringify(updated, null, 2), "utf-8");
}
/**
* Saves a base64-encoded image to public/uploads/ and returns the public URL.
* The base64 string may include a data-URL prefix (e.g. "data:image/jpeg;base64,...").
*
* Returns a URL like "/uploads/<uuid>.<ext>" — served as a static file by Vite/Nitro.
*/
async function savePhotoToUploads(base64, originalFilename) {
	await mkdir(UPLOADS_DIR, { recursive: true });
	const ext = (originalFilename.split(".").pop() ?? "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
	const safeExt = [
		"jpg",
		"jpeg",
		"png",
		"webp",
		"gif",
		"avif"
	].includes(ext) ? ext : "jpg";
	const filename = `${randomUUID()}.${safeExt}`;
	const filepath = join(UPLOADS_DIR, filename);
	const base64Data = base64.includes(",") ? base64.split(",")[1] : base64;
	await writeFile(filepath, Buffer.from(base64Data, "base64"));
	return `/uploads/${filename}`;
}
//#endregion
export { getRestaurantData, savePhotoToUploads, saveRestaurantData };
