import { createFileRoute } from "@tanstack/react-router";
import { photos } from "@/lib/photos";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About · Amigos Hub · A Satya Niketan Original Since 2014" },
      { name: "description", content: "Eleven years of feeding DU South Campus on a student budget. The story of a tiny first-floor cafe in Satya Niketan that became everyone's third place." },
      { property: "og:title", content: "About Amigos Hub" },
      { property: "og:description", content: "11+ years, graffiti walls, fairy lights, and a generation of DU students." },
      { property: "og:image", content: photos.ambience1 },
    ],
  }),
  component: AboutPage,
});

const milestones = [
  { year: "2014", title: "Three tables and a speaker", body: "Amigos Hub opened on a quiet first floor across from Sri Venkateshwara College. Three tables, one playlist, and a menu small enough to memorise." },
  { year: "2016", title: "The wishes wall begins", body: "A regular stuck a sticky note by the door. Then another. Then a hundred. The wall has not had an empty patch since." },
  { year: "2018", title: "Featured in Delhi Times", body: "Suddenly the queue outside started spilling into the staircase. We added the second long table." },
  { year: "2020", title: "We made it through", body: "Quietly delivered cheesy garlic bread and KitKat shakes to locked-down hostels and PGs across South Campus." },
  { year: "2023", title: "So Delhi feature", body: "Called us 'a budget date night institution'. We printed it out and stuck it on the wall." },
  { year: "Today", title: "11+ years, still loud", body: "Same fairy lights, more plants, slightly better coffee. Still pocket-friendly. Still your spot." },
];

function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 pt-16 pb-12 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7">
          <p className="font-script text-coral text-3xl">our whole deal</p>
          <h1 className="mt-2 text-5xl md:text-6xl lg:text-8xl leading-[0.9]">
            A tiny cafe<br />
            with a <span className="text-coral">very big</span><br />
            <span className="marker-underline">crush</span> on DU.
          </h1>
          <p className="mt-7 text-lg text-charcoal/80 max-w-xl leading-relaxed">
            Amigos Hub has been the unofficial canteen, study spot, breakup HQ, and
            birthday venue of Satya Niketan for over a decade. We're small on purpose.
          </p>
        </div>
        <div className="md:col-span-5 relative h-[420px]">
          <div className="absolute inset-0 rounded-md overflow-hidden shadow-2xl rotate-[3deg] tape">
            <img src={photos.ambience1} alt="Amigos Hub interior, lit warm at night" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-charcoal text-cream py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-mustard">A short history.</h2>
          <div className="mt-14 relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 stripe-pillar -translate-x-1/2" />
            <div className="space-y-12">
              {milestones.map((m, i) => (
                <div key={m.year} className={`relative grid md:grid-cols-2 gap-6 items-start ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                  <div className={`pl-12 md:pl-0 ${i % 2 ? "md:text-left md:pl-12" : "md:text-right md:pr-12"}`}>
                    <span className="font-display text-4xl md:text-5xl text-mustard">{m.year}</span>
                    <h3 className="text-2xl mt-2">{m.title}</h3>
                    <p className="text-cream/70 mt-2 text-sm leading-relaxed max-w-md md:inline-block">{m.body}</p>
                  </div>
                  <div />
                  <span className="absolute left-4 md:left-1/2 top-2 -translate-x-1/2 h-4 w-4 rounded-full bg-coral border-4 border-charcoal" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Counters */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-24 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {[
          { n: "11+", l: "Years on this street" },
          { n: "3k+", l: "Reviews · 4.1★ avg" },
          { n: "70+", l: "Things on the menu" },
          { n: "∞", l: "Sticky notes on the wall" },
        ].map((s) => (
          <div key={s.l} className="rounded-md bg-cream border-2 border-charcoal/15 p-6 hover:border-coral transition-colors">
            <div className="font-display text-4xl md:text-5xl text-coral">{s.n}</div>
            <div className="mt-2 text-sm uppercase tracking-widest text-charcoal/70">{s.l}</div>
          </div>
        ))}
      </section>

      {/* Press */}
      <section className="bg-mustard text-ink py-16">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 text-center">
          <p className="font-script text-2xl text-coral">said about us</p>
          <h2 className="mt-2 text-3xl md:text-4xl lg:text-5xl">"A budget date-night institution."</h2>
          <p className="mt-4 text-ink/80">As featured in <strong>Delhi Times</strong> & <strong>So Delhi</strong>.</p>
        </div>
      </section>
    </div>
  );
}