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

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import type { RestaurantData } from "./restaurant-data";
import { defaultRestaurantData } from "./restaurant-data";

// ── Paths ─────────────────────────────────────────────────────────────────────

const DATA_DIR = join(process.cwd(), "data");
const DATA_FILE = join(DATA_DIR, "restaurant.json");
const UPLOADS_DIR = join(process.cwd(), "public", "uploads");

// ── Read ──────────────────────────────────────────────────────────────────────

/**
 * Returns the current restaurant data.
 * Falls back to seed defaults when data/restaurant.json does not yet exist.
 * Merges with defaults so new fields added in future code updates are always present.
 */
export async function getRestaurantData(): Promise<RestaurantData> {
  try {
    const raw = await readFile(DATA_FILE, "utf-8");
    const saved = JSON.parse(raw) as Partial<RestaurantData>;
    // Deep merge: saved values win; any fields missing in the file fall back to defaults.
    return { ...defaultRestaurantData, ...saved };
  } catch {
    // ENOENT or invalid JSON → return seed defaults unchanged
    return { ...defaultRestaurantData };
  }
}

// ── Write ─────────────────────────────────────────────────────────────────────

/**
 * Persists a full or partial update to data/restaurant.json.
 * Creates the data/ directory if it doesn't exist.
 */
export async function saveRestaurantData(
  update: Partial<RestaurantData>
): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  const current = await getRestaurantData();
  const updated: RestaurantData = { ...current, ...update };
  await writeFile(DATA_FILE, JSON.stringify(updated, null, 2), "utf-8");
}

// ── Photo upload ──────────────────────────────────────────────────────────────

/**
 * Saves a base64-encoded image to public/uploads/ and returns the public URL.
 * The base64 string may include a data-URL prefix (e.g. "data:image/jpeg;base64,...").
 *
 * Returns a URL like "/uploads/<uuid>.<ext>" — served as a static file by Vite/Nitro.
 */
export async function savePhotoToUploads(
  base64: string,
  originalFilename: string
): Promise<string> {
  await mkdir(UPLOADS_DIR, { recursive: true });

  const ext = (originalFilename.split(".").pop() ?? "jpg")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
  const safeExt = ["jpg", "jpeg", "png", "webp", "gif", "avif"].includes(ext)
    ? ext
    : "jpg";

  const filename = `${randomUUID()}.${safeExt}`;
  const filepath = join(UPLOADS_DIR, filename);

  // Strip data-URL prefix if present ("data:image/jpeg;base64,<data>")
  const base64Data = base64.includes(",") ? base64.split(",")[1] : base64;
  const buffer = Buffer.from(base64Data, "base64");

  await writeFile(filepath, buffer);
  return `/uploads/${filename}`;
}
