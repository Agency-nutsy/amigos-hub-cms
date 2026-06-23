import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { photos } from "@/lib/photos";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu · Amigos Hub Satya Niketan" },
      { name: "description", content: "Burgers, pizza, pasta, momos, shakes, mojitos, shawarma & coffee — the full Amigos Hub menu. Pocket-friendly comfort food from DU South Campus's favourite cafe since 2014." },
      { property: "og:title", content: "Amigos Hub · Menu" },
      { property: "og:description", content: "The full Amigos Hub menu — burgers, shakes, momos, mojitos & more." },
      { property: "og:image", content: photos.drinkPink },
    ],
  }),
  component: MenuPage,
});

type Item = { name: string; desc?: string; price: string; veg?: boolean; star?: boolean };
type Cat = { id: string; label: string; items: Item[] };

const menu: Cat[] = [
  {
    id: "pasta",
    label: "Pasta",
    items: [
      { name: "Penne Pasta", desc: "Alfredo / Arrabbiata / Mix Sauce", price: "₹190 / ₹220", veg: true },
      { name: "Baked Cheese Pasta", desc: "Alfredo / Arrabbiata / Mix Sauce", price: "₹240 / ₹260", veg: true },
      { name: "Shahi Paneer Pasta", desc: "Our Special", price: "₹200", veg: true, star: true },
      { name: "Butter Chicken Pasta", desc: "Our Special", price: "₹220", veg: false, star: true },
    ]
  },
  {
    id: "pizza",
    label: "Pizza",
    items: [
      { name: "Classic Margherita", desc: "Tomato and mozzarella cheese margherita pizza", price: "₹180", veg: true },
      { name: "Sweetcorn Pizza", desc: "A quick sweetcorn + extra corn", price: "₹190", veg: true },
      { name: "Cheesy Mushroom", desc: "Fresh mushrooms, fresh flavors, fresh pizza", price: "₹190", veg: true },
      { name: "Farm Fresh", desc: "Sweetcorn, capsicum, onion, tomato", price: "₹220", veg: true },
      { name: "Signature Veggie", desc: "Mushroom, jalapeno, onion tomato", price: "₹230", veg: true },
      { name: "Veg. Exotic", desc: "Tandoori paneer onion capsicum tomato olive jalapeno (Our special)", price: "₹260", veg: true, star: true },
      { name: "Shahi Paneer", desc: "Royal flavors, Shahi paneer bites in a pizza (must have)", price: "₹230", veg: true, star: true },
      { name: "Tandoori Chicken Tikka", desc: "Tandoori tender chicken chunks in our signature Tandoori sauce", price: "₹210", veg: false },
      { name: "Keema Cheese", desc: "Fresh to goodness on a cheesy crust (must have)", price: "₹230", veg: false, star: true },
      { name: "Spicy Chicken", desc: "Spicy chicken, mushroom jalapeno tomato onion", price: "₹240", veg: false },
    ]
  },
  {
    id: "burger",
    label: "Burger",
    items: [
      { name: "Cheese Blast Burger", desc: "Patty, molten cheese, the works.", price: "₹220", veg: false, star: true },
      { name: "Double Decker Burger", desc: "Two patties, one very brave bun.", price: "₹260", veg: false, star: true },
      { name: "Kadhai Paneer Burger", desc: "Our no-patty desi-style burger.", price: "₹190", veg: true, star: true },
      { name: "Classic Veggie Burger", desc: "Crispy veg patty, lettuce, mayo.", price: "₹140", veg: true },
    ]
  },
  {
    id: "momo-mia",
    label: "Momo-Mia",
    items: [
      { name: "Crispy Fried", desc: "", price: "₹110 / ₹130", veg: true },
      { name: "Hot Garlic", desc: "", price: "₹140 / ₹150", veg: true },
      { name: "Chilli Cheese", desc: "", price: "₹150 / ₹170", veg: true },
      { name: "Makhani Gravy", desc: "", price: "₹170 / ₹180", veg: true },
      { name: "Pizza Momos", desc: "", price: "₹170 / ₹180", veg: true },
    ]
  },
  {
    id: "shawarmas",
    label: "Shawarmas",
    items: [
      { name: "Paneer Shawarma", desc: "", price: "₹100", veg: true },
      { name: "Chicken Shawarma", desc: "", price: "₹100", veg: false },
    ]
  },
  {
    id: "sandwich",
    label: "Sandwich",
    items: [
      { name: "Veggie Supreme", desc: "", price: "₹100", veg: true },
      { name: "Cheesy Mushroom", desc: "", price: "₹120", veg: true },
      { name: "Cheesy Corn", desc: "", price: "₹120", veg: true },
      { name: "Loaded Paneer", desc: "", price: "₹140", veg: true },
      { name: "Bombay Masala", desc: "special", price: "₹150", veg: true, star: true },
      { name: "Veg. Club Sandwich", desc: "", price: "₹130", veg: true },
      { name: "Chicken Keema", desc: "", price: "₹140", veg: false },
      { name: "Chicken N Cheese", desc: "", price: "₹150", veg: false },
      { name: "Loaded Chicken", desc: "", price: "₹150", veg: false },
      { name: "Chicken Club Sandwich", desc: "", price: "₹160", veg: false },
    ]
  },
  {
    id: "wraps",
    label: "Wraps",
    items: [
      { name: "Veggie Delight Wrap", desc: "", price: "₹110", veg: true },
      { name: "Spicy Paneer Wrap", desc: "", price: "₹120", veg: true },
    ]
  },
  {
    id: "pitchers",
    label: "Pitchers",
    items: [
      { name: "Coke Pitcher", desc: "", price: "₹200", veg: true },
      { name: "Mojito Pitcher", desc: "", price: "₹500", veg: true },
    ]
  },
  {
    id: "beverage",
    label: "Beverage",
    items: [
      { name: "Soft Drinks", desc: "", price: "₹60", veg: true },
      { name: "Red Bull", desc: "", price: "₹150", veg: true },
      { name: "Water Bottle", desc: "", price: "MRP", veg: true },
    ]
  },
  {
    id: "regular-shakes",
    label: "Regular Shakes",
    items: [
      { name: "Choco Dream", desc: "", price: "₹100", veg: true },
      { name: "Mangolicious", desc: "", price: "₹120", veg: true },
      { name: "Strawberry Burst", desc: "", price: "₹120", veg: true },
      { name: "Butterscotch Bliss", desc: "", price: "₹120", veg: true },
      { name: "Blueberry Blast", desc: "", price: "₹130", veg: true },
      { name: "Oreo Cream", desc: "", price: "₹130", veg: true },
      { name: "Kitkat Krunch", desc: "", price: "₹130", veg: true },
    ]
  },
  {
    id: "premium-shakes",
    label: "Premium Shakes",
    items: [
      { name: "Ferrero Fantasy", desc: "", price: "₹180", veg: true, star: true },
    ]
  },
  {
    id: "hot-sips",
    label: "Hot Sips",
    items: [
      { name: "Masala Chai", desc: "", price: "₹50", veg: true },
      { name: "Ginger Tea", desc: "", price: "₹60", veg: true },
      { name: "Green Tea", desc: "", price: "₹60", veg: true },
      { name: "Hot Coffee", desc: "", price: "₹80", veg: true },
      { name: "Black Coffee", desc: "", price: "₹80", veg: true },
      { name: "Hot Chocolate", desc: "", price: "₹90", veg: true },
      { name: "Chocolate Coffee", desc: "", price: "₹100", veg: true },
      { name: "Hazelnut Brew", desc: "", price: "₹110", veg: true },
    ]
  },
  {
    id: "coolers",
    label: "Coolers",
    items: [
      { name: "Fresh Lime Soda", desc: "", price: "₹100", veg: true },
      { name: "Masala Banta", desc: "", price: "₹110", veg: true },
      { name: "Iced Tea", desc: "Peach/Lemon", price: "₹120", veg: true },
      { name: "Strawberry Lemonade", desc: "", price: "₹130", veg: true },
      { name: "Iced Black Coffee", desc: "", price: "₹100", veg: true },
    ]
  },
  {
    id: "mojito",
    label: "Mojito",
    items: [
      { name: "Virgin Mojito", desc: "", price: "₹120", veg: true },
      { name: "Mango Mojito", desc: "", price: "₹130", veg: true },
      { name: "Masala Mojito", desc: "", price: "₹130", veg: true },
      { name: "Strawberry Mojito", desc: "", price: "₹130", veg: true },
      { name: "Watermelon Mojito", desc: "", price: "₹140", veg: true },
      { name: "Blueberry Mojito", desc: "", price: "₹140", veg: true },
      { name: "Green Apple Mojito", desc: "", price: "₹150", veg: true },
      { name: "Cranberry Mojito", desc: "", price: "₹150", veg: true },
    ]
  },
  {
    id: "coffee-holic",
    label: "Coffee-Holic",
    items: [
      { name: "Classic Cold Coffee", desc: "", price: "₹120", veg: true },
      { name: "Caramel Cold Coffee", desc: "", price: "₹130", veg: true },
    ]
  },
  {
    id: "munchies",
    label: "Munchies",
    items: [
      { name: "Veggie Fingers", desc: "", price: "₹110", veg: true },
      { name: "Cheesy Jalapeno Shots", desc: "", price: "₹130", veg: true },
      { name: "Fried Soya Popcorn", desc: "", price: "₹130", veg: true },
      { name: "Hot Garlic Soya Popcorn", desc: "", price: "₹140", veg: true },
      { name: "BBQ Soya Pops", desc: "", price: "₹140", veg: true },
      { name: "Cheese Mushroom Balls", desc: "", price: "₹150", veg: true },
      { name: "Crispy Sweetcorn", desc: "", price: "₹150", veg: true },
      { name: "Onion Rings", desc: "10 pcs", price: "₹130", veg: true },
      { name: "Spring Rolls", desc: "12 pcs", price: "₹130", veg: true },
      { name: "Chicken Popcorn", desc: "", price: "₹180", veg: false },
      { name: "Chicken Hot Garlic", desc: "", price: "₹190", veg: false },
      { name: "BBQ Chicken Bites", desc: "", price: "₹190", veg: false },
      { name: "Cheesy Chicken Feast", desc: "special", price: "₹190", veg: false, star: true },
      { name: "Fried Chicken Wings", desc: "must have", price: "₹200", veg: false, star: true },
      { name: "BBQ Chicken Wings", desc: "", price: "₹220", veg: false },
    ]
  },
  {
    id: "nachos",
    label: "Nachos",
    items: [
      { name: "Nachos With Salsa Dip", desc: "", price: "₹90", veg: true },
      { name: "Nachos With Sweetcorn", desc: "", price: "₹120", veg: true },
      { name: "Cheesy Nachos", desc: "", price: "₹140 / ₹160", veg: true },
    ]
  }
];

function MenuPage() {
  const [active, setActive] = useState<string>(menu[0].id);
  const isClicking = useRef(false);
  const pillContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isClicking.current) return;
        
        let newActive = active;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            newActive = entry.target.id;
          }
        });
        
        if (newActive !== active) {
          setActive(newActive);
          // Scroll the pill container to keep active pill in view
          const activePill = document.getElementById(`pill-${newActive}`);
          if (activePill && pillContainerRef.current) {
            const container = pillContainerRef.current;
            const scrollLeft = activePill.offsetLeft - container.offsetWidth / 2 + activePill.offsetWidth / 2;
            container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    menu.forEach((cat) => {
      const el = document.getElementById(cat.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [active]);

  const handleNavClick = (id: string) => {
    isClicking.current = true;
    setActive(id);
    
    // Scroll the pill container to keep active pill in view
    const activePill = document.getElementById(`pill-${id}`);
    if (activePill && pillContainerRef.current) {
      const container = pillContainerRef.current;
      const scrollLeft = activePill.offsetLeft - container.offsetWidth / 2 + activePill.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }

    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    
    setTimeout(() => {
      isClicking.current = false;
    }, 1000);
  };

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 py-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <p className="font-script text-coral text-3xl">the menu board</p>
        <h1 className="mt-2 text-5xl md:text-6xl lg:text-7xl leading-[0.95]">
          Everything <span className="marker-underline">we make.</span>
        </h1>
        <p className="mt-5 text-charcoal/70 text-lg">
          Prices are pocket-friendly on purpose. Star marks the things our regulars order on autopilot.
        </p>
        <p className="mt-2 text-xs uppercase tracking-widest text-charcoal/50">Prices are indicative · please confirm at the cafe</p>
      </div>

      {/* Category pills */}
      <div 
        ref={pillContainerRef}
        className="mt-10 flex gap-2 overflow-x-auto no-scrollbar sticky top-16 z-20 py-3 bg-cream/85 backdrop-blur-md -mx-5 px-5 sm:-mx-8 sm:px-8 border-y border-charcoal/10"
      >
        {menu.map((c) => (
          <button
            key={c.id}
            id={`pill-${c.id}`}
            onClick={() => handleNavClick(c.id)}
            className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium border-2 transition-all shrink-0 ${
              active === c.id
                ? "bg-charcoal text-cream border-charcoal"
                : "border-charcoal/20 hover:border-charcoal hover:bg-mustard"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Sections */}
      <div className="mt-14 space-y-20">
        {menu.map((cat) => (
          <section key={cat.id} id={cat.id} className="scroll-mt-28">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl">{cat.label}</h2>
              <div className="flex-1 h-1 stripe-pillar rounded-full" />
            </div>
            <div className="grid md:grid-cols-2 gap-x-10 gap-y-6">
              {cat.items.map((it) => (
                <div key={it.name} className="group flex items-baseline gap-4 py-3 border-b border-dashed border-charcoal/20 hover:border-coral transition-colors">
                  <span className={`${it.veg !== false ? "veg-dot" : "nonveg-dot"} translate-y-1 shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-xl font-display tracking-tight">{it.name}</h3>
                      {it.star && <span className="text-xs uppercase tracking-widest bg-mustard text-ink px-2 py-0.5 rounded-sm">Bestseller</span>}
                    </div>
                    {it.desc && <p className="text-sm text-charcoal/70 mt-1">{it.desc}</p>}
                  </div>
                  <span className="font-display text-xl whitespace-nowrap">{it.price}</span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-20 rounded-md bg-charcoal text-cream p-8 md:p-12 grid md:grid-cols-[2fr_1fr] gap-6 items-center">
        <div>
          <p className="font-script text-mustard text-2xl">psst — birthday people</p>
          <h3 className="text-3xl mt-1">Want the balloon wall treatment?</h3>
          <p className="text-cream/80 mt-3 text-sm leading-relaxed">We do budget birthday setups, group bookings, and post-exam blowouts. Tell us what you're celebrating.</p>
        </div>
        <a href="/contact" className="rounded-full bg-mustard text-ink px-6 py-3 font-medium text-center hover:bg-coral hover:text-cream transition-colors w-fit md:justify-self-end">
          Plan it with us →
        </a>
      </div>
    </div>
  );
}