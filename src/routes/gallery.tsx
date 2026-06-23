import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { photos } from "@/lib/photos";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery · Amigos Hub Cafe Satya Niketan" },
      { name: "description", content: "Real photos of Amigos Hub — the graffiti walls, fairy lights, sticky-note wishes wall, our food, our drinks, and the crowd that makes it all happen." },
      { property: "og:title", content: "Gallery · Amigos Hub" },
      { property: "og:image", content: photos.stickyWall },
    ],
  }),
  component: GalleryPage,
});

type Cat = "all" | "ambience" | "food" | "drinks";
const items: { src: string; cat: Exclude<Cat, "all">; caption: string }[] = [
  { src: photos.ambience1, cat: "ambience", caption: "Friday night, full house" },
  { src: photos.crowd, cat: "ambience", caption: "The long table" },
  { src: photos.yellowStripe, cat: "ambience", caption: "Our yellow striped corner" },
  { src: photos.stickyWall, cat: "ambience", caption: "The wishes wall" },
  { src: photos.artWall, cat: "ambience", caption: "Hanging plant + framed art" },
  { src: photos.balloons, cat: "ambience", caption: "Birthday balloon setup" },
  { src: photos.ambience2, cat: "ambience", caption: "Edison bulbs at dinner" },
  { src: photos.interior1, cat: "ambience", caption: "Quiet afternoon shift" },
  { src: photos.mojito, cat: "drinks", caption: "Watermelon mojito" },
  { src: photos.drinkPink, cat: "drinks", caption: "Cranberry cooler" },
];

function GalleryPage() {
  const [cat, setCat] = useState<Cat>("all");
  const [zoom, setZoom] = useState<string | null>(null);
  const visible = cat === "all" ? items : items.filter((i) => i.cat === cat);

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