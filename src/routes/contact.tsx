import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { photos } from "@/lib/photos";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Reservations · Amigos Hub Satya Niketan" },
      { name: "description", content: "Find Amigos Hub in Satya Niketan, opposite Sri Venkateshwara College. Call us, book a table, or plan a budget birthday." },
      { property: "og:title", content: "Visit Amigos Hub" },
      { property: "og:image", content: photos.ambience2 },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 py-12">
      <div className="max-w-3xl">
        <p className="font-script text-coral text-3xl">say hi</p>
        <h1 className="mt-2 text-6xl lg:text-7xl leading-[0.95]">
          Drop in. Or <span className="marker-underline">drop us a line.</span>
        </h1>
      </div>

      <div className="mt-12 grid lg:grid-cols-12 gap-8">
        {/* Map + info */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-md overflow-hidden border-4 border-charcoal shadow-2xl">
            <iframe
              title="Amigos Hub on Google Maps"
              src="https://www.google.com/maps?q=Amigos+Hub+Satya+Niketan&output=embed"
              className="w-full h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-md bg-cream border-2 border-charcoal/15 p-5">
              <p className="text-xs uppercase tracking-widest text-coral font-bold">Address</p>
              <p className="mt-2 text-charcoal">96, 1st, Satya Niketan, opposite Venkateshwar college, Moti Bagh II, Satya Niketan, South Moti Bagh, New Delhi, Delhi, 110021</p>
            </div>
            <div className="rounded-md bg-cream border-2 border-charcoal/15 p-5">
              <p className="text-xs uppercase tracking-widest text-coral font-bold">Hours</p>
              <p className="mt-2 text-charcoal">10:00 am – 10:30 pm every day</p>
            </div>
            <div className="rounded-md bg-cream border-2 border-charcoal/15 p-5">
              <p className="text-xs uppercase tracking-widest text-coral font-bold">Phone</p>
              <a href="tel:+919999739766" className="mt-2 block font-display text-2xl hover:text-coral">+91 99997 39766</a>
            </div>
            <div className="rounded-md bg-cream border-2 border-charcoal/15 p-5">
              <p className="text-xs uppercase tracking-widest text-coral font-bold">Follow</p>
              <div className="mt-2 flex flex-wrap gap-3">
                <a href="https://www.instagram.com/amigoshub.india/" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-coral">Instagram</a>
                <a href="https://maps.app.goo.gl/FF8mphjaHEt2PKtC7" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-coral">Google Maps</a>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-5">
          <div className="relative rounded-md bg-charcoal text-cream p-7 shadow-2xl">
            <div className="absolute -top-3 left-6 right-6 h-2 stripe-pillar rounded-sm" />
            <h2 className="text-3xl">Reserve a table</h2>
            <p className="text-cream/70 text-sm mt-2">Tell us what's up — birthday, study group, casual hang. We'll text you back.</p>

            {sent ? (
              <div className="mt-8 rounded-md bg-mustard text-ink p-5 font-script text-xl">
                Got it! Sending your request to WhatsApp...
              </div>
            ) : (
              <form
                className="mt-6 grid gap-4"
                onSubmit={(e) => { 
                  e.preventDefault(); 
                  const formData = new FormData(e.currentTarget);
                  const name = formData.get('name');
                  const phone = formData.get('phone');
                  const when = formData.get('when');
                  const guests = formData.get('guests');
                  const message = formData.get('message');
                  
                  const dateStr = new Date(when as string).toLocaleString('en-IN', {
                    weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
                  });

                  const text = `Hi Amigos Hub! 👋\n\nI would like to request a table reservation.\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Date & Time:* ${dateStr}\n*Guests:* ${guests}\n*Occasion/Message:* ${message ? message : 'N/A'}\n\nPlease confirm if this is available. Thanks!`;
                  
                  const encodedText = encodeURIComponent(text);
                  window.open(`https://wa.me/919999739766?text=${encodedText}`, '_blank');
                  
                  setSent(true); 
                }}
              >
                {[
                  { label: "Your name", type: "text", name: "name" },
                  { label: "Phone", type: "tel", name: "phone" },
                ].map((f) => (
                  <label key={f.name} className="block">
                    <span className="text-xs uppercase tracking-widest text-mustard">{f.label}</span>
                    <input required type={f.type} name={f.name} className="mt-1 w-full bg-transparent border-b-2 border-cream/30 focus:border-mustard outline-none py-2 text-cream placeholder:text-cream/30" />
                  </label>
                ))}
                <div className="grid grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-xs uppercase tracking-widest text-mustard">Date & time</span>
                    <input required type="datetime-local" name="when" className="mt-1 w-full bg-transparent border-b-2 border-cream/30 focus:border-mustard outline-none py-2 text-cream" />
                  </label>
                  <label className="block">
                    <span className="text-xs uppercase tracking-widest text-mustard">Guests</span>
                    <input required type="number" min={1} max={40} defaultValue={4} name="guests" className="mt-1 w-full bg-transparent border-b-2 border-cream/30 focus:border-mustard outline-none py-2 text-cream" />
                  </label>
                </div>
                <label className="block">
                  <span className="text-xs uppercase tracking-widest text-mustard">What's the occasion?</span>
                  <textarea name="message" rows={3} className="mt-1 w-full bg-transparent border-b-2 border-cream/30 focus:border-mustard outline-none py-2 text-cream placeholder:text-cream/30" placeholder="Birthday? Surprise? Just hungry?" />
                </label>
                <button type="submit" className="mt-3 rounded-full bg-mustard text-ink px-6 py-3 font-medium hover:bg-coral hover:text-cream transition-colors">
                  Send it →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}