import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { getRestaurantDataFn } from "@/lib/cms-actions";
import type { RestaurantData, GalleryPhoto } from "@/lib/restaurant-data";

type Cat = "all" | "ambience" | "food" | "drinks";

export const Route = createFileRoute("/gallery")({
  loader: async (): Promise<RestaurantData> => {
    return await getRestaurantDataFn();
  },
  component: GalleryPage,
});

function GalleryPage() {
  const data = Route.useLoaderData() as RestaurantData;
  const items: GalleryPhoto[] = data.galleryPhotos || [];

  const [cat, setCat] = useState<Cat>("all");
  const [zoom, setZoom] = useState<string | null>(null);

  // 10 Homepage photos mapped for the "Everything" tab
  const homepageItems: GalleryPhoto[] = (data.homepageGalleryPhotos || [])
    .filter((src): src is string => Boolean(src && src.trim().length > 0))
    .map((src, i) => ({
      src,
      cat: "ambience" as const,
      caption: `Cafe moments #${i + 1}`,
    }));

  // "Everything" includes homepage photos without needing to reupload; other categories remain untouched
  const visible =
    cat === "all"
      ? [
          ...homepageItems,
          ...items.filter((item) => !homepageItems.some((h) => h.src === item.src)),
        ]
      : items.filter((i) => i.cat === cat);

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 py-12">
      <div className="max-w-3xl">
        <p className="font-script text-coral text-3xl">come look around</p>
        <h1 className="mt-2 text-5xl md:text-6xl lg:text-7xl leading-[0.95]">The <span className="marker-underline">gallery.</span></h1>
        <p className="mt-5 text-charcoal/70 text-lg">All photos taken inside the cafe. No stock images, no styled shoots — just our regular Tuesday.</p>
      </div>

      <div className="mt-10 flex flex-wrap gap-2">
        {(["all", "ambience", "food", "drinks"] as Cat[]).map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full px-4 py-2 text-sm font-medium border-2 capitalize transition-all ${
              cat === c ? "bg-charcoal text-cream border-charcoal" : "border-charcoal/20 hover:border-charcoal hover:bg-mustard"
            }`}
          >
            {c === "all" ? "Everything" : c}
          </button>
        ))}
      </div>

      <div className="mt-10 columns-2 md:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
        {visible.map((p, i) => (
          <button
            key={p.src + i}
            onClick={() => setZoom(p.src)}
            className="mb-4 group block w-full break-inside-avoid relative rounded-md overflow-hidden shadow-md hover:shadow-2xl transition-shadow"
            style={{ transform: `rotate(${i % 2 ? 0.6 : -0.6}deg)` }}
          >
            <img src={p.src} alt={p.caption} className="w-full transition-transform duration-500 group-hover:scale-105" />
            <span className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-charcoal/80 to-transparent text-cream p-3 text-sm font-script opacity-0 group-hover:opacity-100 transition-opacity">
              {p.caption}
            </span>
          </button>
        ))}
        {visible.length === 0 && (
          <p className="text-charcoal/60 italic">No photos in this category yet — check back soon.</p>
        )}
      </div>

      {zoom && (
        <div
          className="fixed inset-0 bg-charcoal/90 backdrop-blur-sm z-[100] flex items-center justify-center p-6 cursor-zoom-out animate-[fade-up_.2s_ease-out]"
          onClick={() => setZoom(null)}
        >
          <img src={zoom} alt="" className="max-h-[90vh] max-w-[95vw] rounded-md shadow-2xl" />
        </div>
      )}
    </div>
  );
}