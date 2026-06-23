import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { photos } from "@/lib/photos";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Amigos Hub · Satya Niketan's loudest, friendliest cafe" },
      { name: "description", content: "Burgers, shakes, mojitos & momos in Satya Niketan since 2014. Graffiti walls, fairy lights, pocket-friendly menus, and the DU South Campus crowd." },
      { property: "og:title", content: "Amigos Hub Cafe · Satya Niketan" },
      { property: "og:description", content: "DU South Campus's beloved hangout — since 2014." },
      { property: "og:image", content: photos.crowd },
      { property: "twitter:image", content: photos.crowd },
    ],
  }),
  component: Home,
});

const signatures = [
  { name: "Cheese Blast Burger", tag: "Fan Favorite", price: "₹220", img: "/photos/7.jpg", veg: false },
  { name: "Ferrero Fantasy", tag: "Bestseller", price: "₹180", img: "/photos/11.jpg", veg: true },
  { name: "Mix Sauce Pasta", tag: "Regulars' Pick", price: "₹220", img: "/photos/10.jpg", veg: true },
  { name: "Cheesy Chicken Feast", tag: "Munchies MVP", price: "₹190", img: "/photos/12.jpg", veg: false },
  { name: "Watermelon Mojito", tag: "Summer Hero", price: "₹140", img: "/photos/8.jpg", veg: true },
  { name: "Veg. Exotic Pizza", tag: "Big Bite", price: "₹260", img: "/photos/5.jpg", veg: true },
  { name: "Makhani Gravy Momos", tag: "Crowd Pleaser", price: "₹170", img: "/photos/6.jpg", veg: true },
  { name: "Bombay Masala Sandwich", tag: "Chef's Special", price: "₹150", img: "/photos/9.jpg", veg: true },
];

const reviews = [
  { text: "Bestest place with affordable food price and taste wise amazing…. Must visit place for sure 😍", who: "Simran Gaha" },
  { text: "Loved the food and ambience. It's like a hidden gem. When you enter the premise you will like the ambience. Since it's opposite venky college..it's more have a youngster vibes . The pizza and pasta was very tasty and value for money. Coffee tiramisu was amazing. Cranberry mocktail was lovely as well.", who: "Subbanshu Jaiin" },
  { text: "An amazing place with happy and calm vibes. The taste of the food was quite good and price of all the items was reasonable. The taste of pasta was delicious and lip smacking. I loved the ambience of the place. Also, There's hookah available for all the hookah lovers out there.", who: "Ankit Dagar" },
  { text: "Visited this place few days back. Nice cafe with positive vibes. Food was also good & fresh  in taste. You can go there with friends and family. Nice experience", who: "Shweta Sharma" },
  { text: "love the vibes at amigo's it's relaxing and calm. The rate of each item is reasonable. The quantity of the food is according to the pricing. The taste is really good. Pasta tasted like melting cheese, perfectly cooked with the right amount of seasonings. Ordered their must try chicken loaded pizza and it was yum too. I prefer thin crust but this being a thick crust did not disappoint me. The fries were not that crispy but i love them so it's fine. We also ordered watermelon mojito and iced tea soda and the amount of sugar in it was exactly how I like it. The ambience is really cool. You can also try hookah I tried fruit blast. ⭕⭕⭕ Over all a happening place, you can visit with your friends or loved ones. Great place for college students.", who: "bhavna chalise" },
  { text: "Nice cafe to have your meal.. wonderful atmosphere. Music and ambience is good. Food is tasty and reasonable price also . Comparatively cheaper than other cafes in satya niketan. Must try white sauce pasta and Veg platter it was really superb in taste and waffle stick was really different that was really good. Must visit Guys.", who: "Kartik Bagh" },
  { text: "I recently visited this beautiful outlet and had an amazing experience. The food was delicious and super affordable. The best part was a student friendly cafe and perfect for the couple's, get together with friends. I tried hookah too, it was reasonable compared to other cafes, only 699/. If you are passing by Satya niketan then do visit this cafe. I am sure you will love it.", who: "Daiz Bori" },
  { text: "Cafe Amigos Hub in South Campus is a delightful spot offering a range of delicious sandwiches and mouthwatering pizzas. The vibe is vibrant and inviting, perfect for enjoying their refreshing mojitos. Whether you're craving a savory meal or a refreshing drink, this cafe has you covered. A must-visit for anyone in the area seeking great food and a lively atmosphere!", who: "Dr. Amreen Sami" },
  { text: "recently visited this outlet and had so many lipsmacking dishes there 😍😍 they have wide variety of of food options to choose from their menu for food lovers 😍 really like their pizza and pasta👍do visit this place with your friends 😅 highly recommended 🙂 …", who: "Garima Aggarwal" },
  { text: "A cute n cozy place at Satya niketan. They serve some lip-smacking and economical delicacies in their well curated menu. Recently went there and tried their baked Alfredo cheese pasta and Barbeque Chicken wings. The chicken wings were succulent and scrumptious. Taste of pasta was up to the mark served with garlic breads. The food hygiene and the quality was also maintained. Their hazelnut cold coffee is also very good. A must visit place.", who: "Ishaan Walia" },
  { text: "This cafe has a beautiful cute ambience and the food served here was exceptionally delicious. Cheesy baked mix sauce pasta is a must try. The KitKat and brownie shakes were so thick and soothing.", who: "Shikha Jaiswal" },
  { text: "Spent amazing time here with my friends. The food we ordered was so delicious and very reasonable in price. I’d definitely recommend this place to everyone who is looking for good cafes with very reasonable prices.", who: "salove bhardwaj" },
  { text: "Perfect spot for college going students. It’s a budget friendly place in Satyaniketan which offers nice seating and great food. Loved their mocktail and makhani momos. Service was slow though!", who: "Shagun Mittal" },
  { text: "The staff was very polite and the food which was served was delicious! I would like to mention nachos specifically because they were super cheesy and yummy! I would love to come again here. Also the Shisha was very reasonable and good.", who: "Apoorva Mittal" },
  { text: "It is located at the second turn to the left from the main lane. This place is a hidden gem. Food - Great Ambience - Amazing Service - Genuine One must try this place. Everything was good. We ordered Pizza, Mix sauce Pasta and shakes, and all was tempting to see and yummy to eat. AC was giving a nice cool and calm to the place. Recommendation - Must try Mix Sauce Pasta This place was upto the mark.", who: "Tapas Pal" }
];

function Home() {
  return (
    <>
      {/* HERO — typographic-led, asymmetric, with collage of real photos */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-6 pb-12 lg:pt-10 lg:pb-16">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7 fade-up">
              <div className="flex items-center gap-3 text-sm font-medium">
                <span className="h-2 w-2 rounded-full bg-coral animate-pulse" />
                <span className="uppercase tracking-[0.2em] text-charcoal/70">Satya Niketan · open till 10:30 PM</span>
              </div>
              <h1 className="mt-5 font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.88] tracking-tight">
                Loud music.<br />
                <span className="text-coral">Cheesy burgers.</span><br />
                <span className="marker-underline">Tiny tables.</span>{" "}
                <span className="font-script text-sage text-[0.55em] inline-block wiggle">since 2014</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg text-charcoal/80 leading-relaxed">
                A scrappy little corner of <strong>Satya Niketan</strong> where DU
                South Campus has been celebrating birthdays, surviving deadlines,
                and arguing over the last momo for over a decade.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/menu" className="group inline-flex items-center gap-2 rounded-full bg-charcoal text-cream px-6 py-3 font-medium hover:bg-coral transition-colors">
                  Eat the menu
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border-2 border-charcoal px-6 py-3 font-medium hover:bg-mustard transition-colors">
                  Find us / book a table
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-charcoal/70">
                <span>★ 4.3 · 1,567 reviews</span>
                <span>· Featured in Delhi Times & So Delhi</span>
                <span>· ₹400–900 for two</span>
              </div>
            </div>

            {/* Collage */}
            <div className="lg:col-span-5 relative h-[440px] lg:h-[560px]">
              <div className="absolute top-0 right-4 w-56 h-72 rounded-md overflow-hidden shadow-xl rotate-[4deg] hover:rotate-0 transition-transform duration-500 tape">
                <img src="/photos/3.webp" alt="Cafe interior with yellow striped counter" className="h-full w-full object-cover" />
              </div>
              <div className="absolute top-32 left-0 w-60 h-44 rounded-md overflow-hidden shadow-xl -rotate-[5deg] hover:rotate-0 transition-transform duration-500 tape">
                <img src="/photos/2.webp" alt="Brightly lit seating area decorated with red balloons" className="h-full w-full object-cover" />
              </div>
              <div className="absolute bottom-0 right-0 w-72 h-56 rounded-md overflow-hidden shadow-2xl rotate-[2deg] hover:rotate-0 transition-transform duration-500 tape">
                <img src="/photos/1.webp" alt="Dimly lit cafe full of people dining" className="h-full w-full object-cover" />
              </div>
              <div className="absolute bottom-16 left-8 hidden lg:block font-script text-sage text-2xl rotate-[-8deg]">
                ↑ packed house every weekend
              </div>
            </div>
          </div>
        </div>

        {/* Edison bulb string */}
        <div className="pointer-events-none absolute top-0 inset-x-0 flex justify-around opacity-80">
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} className="bulb -mt-2 text-amber-400" style={{ animationDelay: `${i * 0.3}s` }}>
              <svg width="14" height="22" viewBox="0 0 14 22"><line x1="7" y1="0" x2="7" y2="8" stroke="currentColor" strokeWidth="0.8" /><ellipse cx="7" cy="14" rx="6" ry="7" fill="#f5c45a" /></svg>
            </span>
          ))}
        </div>
      </section>

      {/* MARQUEE strip */}
      <section className="bg-mustard text-charcoal py-4 border-y-2 border-charcoal overflow-hidden">
        <div className="flex marquee-track whitespace-nowrap font-display text-2xl uppercase">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-10 px-5 shrink-0">
              {["Cheese Blast Burger", "★", "KitKat Shake", "★", "Steamy Momos", "★", "Watermelon Mojito", "★", "Brownie Fudge", "★", "Cheesy Chicken Feast", "★", "Veggie Supreme", "★"].map((w, j) => (
                <span key={j}>{w}</span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* STORY teaser */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-24 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-5 relative">
          <div className="absolute -top-6 -left-6 w-24 h-24 stripe-pillar rounded-md -z-10" />
          <img src="/photos/4.webp" alt="Amigos Hub cafe interior with hanging plants and warm Edison bulbs" className="rounded-md shadow-2xl w-full" />
        </div>
        <div className="md:col-span-7">
          <p className="font-script text-coral text-3xl">our whole thing →</p>
          <h2 className="mt-2 text-5xl lg:text-6xl leading-[0.95]">
            Eleven years of <span className="marker-underline">fairy lights</span> and
            <span className="text-coral"> first-year crushes</span>.
          </h2>
          <p className="mt-6 text-lg text-charcoal/80 leading-relaxed max-w-2xl">
            Amigos Hub opened on the first floor of a tiny Satya Niketan building in
            2014 with three tables, one speaker, and a wall full of empty space. Today
            the walls are covered in sticky-note confessions, the speaker is louder,
            and there are still never quite enough tables on a Friday night.
          </p>
          <Link to="/about" className="mt-7 inline-flex items-center gap-2 font-medium border-b-2 border-charcoal pb-1 hover:border-coral hover:text-coral transition-colors">
            Read the full story →
          </Link>
        </div>
      </section>

      {/* SIGNATURE MENU — staggered scattered cards */}
      <section className="bg-charcoal text-cream py-24 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="font-script text-mustard text-3xl">the regulars know</p>
              <h2 className="text-5xl lg:text-6xl mt-2">What everybody orders.</h2>
            </div>
            <Link to="/menu" className="inline-flex items-center gap-2 rounded-full bg-mustard text-ink px-6 py-3 font-medium hover:bg-coral hover:text-cream transition-colors w-fit">
              See the full menu →
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {signatures.map((s, i) => (
              <article
                key={s.name}
                className={`group relative bg-cream text-ink rounded-md overflow-hidden shadow-xl transition-all duration-500 hover:-translate-y-2 hover:rotate-0 ${
                  i % 2 === 0 ? "lg:translate-y-8 rotate-[-1.5deg]" : "rotate-[1.5deg]"
                }`}
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={s.img} alt={s.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-coral">
                      <span className={s.veg ? "veg-dot" : "nonveg-dot"} /> {s.tag}
                    </span>
                    <span className="font-display text-lg">{s.price}</span>
                  </div>
                  <h3 className="mt-2 text-lg leading-tight">{s.name}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS sticky-note wall */}
      <section className="py-24 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="font-script text-sage text-3xl">straight from the wishes wall</p>
            <h2 className="mt-2 text-5xl lg:text-6xl">
              Things people <span className="marker-underline">actually</span> said.
            </h2>
          </div>
        </div>

        <div className="mt-14 overflow-hidden py-10 -my-10 w-full relative">
          <div className="flex marquee-track w-max hover:[animation-play-state:paused]" style={{ animationDuration: '60s' }}>
            {Array.from({ length: 2 }).map((_, copyIndex) => (
              <div key={copyIndex} className="flex gap-6 shrink-0 pr-6">
                {reviews.map((r, i) => (
                  <div
                    key={`${copyIndex}-${i}`}
                    className="sticky-note p-6 rounded-sm w-[340px] shrink-0 whitespace-normal flex flex-col justify-between"
                    style={{ ["--rot" as never]: `${[-3, 2, -1, 3][i % 4]}deg` }}
                  >
                    <p className="font-script text-xl text-ink leading-snug">"{r.text}"</p>
                    <p className="mt-6 text-xs uppercase tracking-widest text-ink/70">— {r.who}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY teaser */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
          <h2 className="text-5xl lg:text-6xl">A peek inside.</h2>
          <Link to="/gallery" className="font-medium border-b-2 border-charcoal pb-1 hover:text-coral hover:border-coral">Full gallery →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            "/photos/1.webp",
            "/photos/4.webp",
            "/photos/3.webp",
            "/photos/2.webp",
            "/photos/2.webp",
            "/photos/1.webp",
            "/photos/4.webp",
            "/photos/3.webp",
          ].map((src, i) => {
            const isTall = i % 3 === 0;
            const radii = [
              "rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-md rounded-bl-md",
              "rounded-full",
              "rounded-3xl",
              "rounded-[2rem] md:rounded-[4rem]",
              "rounded-t-full rounded-b-xl",
              "rounded-2xl",
              "rounded-bl-[4rem] rounded-tr-[4rem] rounded-tl-xl rounded-br-xl",
              "rounded-full"
            ];
            const rotations = [
              "rotate-[-2deg]",
              "rotate-[3deg]",
              "rotate-[-1deg]",
              "rotate-[2deg]",
              "rotate-[-3deg]",
              "rotate-[1deg]",
              "rotate-[2deg]",
              "rotate-[-2deg]"
            ];
            
            return (
              <div
                key={i}
                className={`group overflow-hidden border-2 border-charcoal bg-mustard shadow-[4px_4px_0px_#1a1a1a] hover:shadow-[6px_6px_0px_#f26b5b] hover:-translate-y-1 transition-all duration-300 ${isTall ? "row-span-2 aspect-[3/5]" : "aspect-square"} ${radii[i]} ${rotations[i]}`}
              >
                <img 
                  src={src} 
                  alt="Amigos Hub vibes" 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-[-2deg] filter contrast-125 saturate-[1.1]" 
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* LOCATION */}
      <section className="bg-cream border-t-2 border-charcoal/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 grid md:grid-cols-2 gap-10 items-stretch">
          <div>
            <p className="font-script text-coral text-3xl">come hang</p>
            <h2 className="mt-2 text-5xl lg:text-6xl">Find the door with the fairy lights.</h2>
            <ul className="mt-8 space-y-4 text-charcoal/80">
              <li><strong className="text-ink block">Address</strong>96, 1st, Satya Niketan, opposite Venkateshwar college, Moti Bagh II, Satya Niketan, South Moti Bagh, New Delhi, Delhi, 110021</li>
              <li><strong className="text-ink block">Hours</strong>10:00 am – 10:30 pm every day</li>
              <li><strong className="text-ink block">Price</strong>Approx ₹400–900 for two · cards & UPI accepted</li>
            </ul>
            <a
              href="https://maps.app.goo.gl/FF8mphjaHEt2PKtC7"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-charcoal text-cream px-6 py-3 font-medium hover:bg-coral transition-colors"
            >
              Open in Google Maps →
            </a>
          </div>
          <div className="rounded-md overflow-hidden shadow-2xl border-4 border-charcoal min-h-[380px]">
            <iframe
              title="Amigos Hub location"
              src="https://www.google.com/maps?q=Amigos+Hub+Satya+Niketan&output=embed"
              className="w-full h-full min-h-[380px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
