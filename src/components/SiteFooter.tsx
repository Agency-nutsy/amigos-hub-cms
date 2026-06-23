import { Link } from "@tanstack/react-router";
import { Instagram, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-charcoal text-cream">
      <div className="h-3 stripe-pillar" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-3xl leading-tight">
            Amigos <span className="text-mustard">Hub</span>
          </div>
          <p className="font-script text-2xl text-mustard mt-2">since 2014</p>
          <p className="mt-4 text-cream/70 max-w-sm text-sm leading-relaxed">
            A tiny, loud, plant-strung corner of Satya Niketan that has been feeding
            DU South Campus on a student budget for over a decade.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <a href="https://www.instagram.com/amigoshub.india/" target="_blank" rel="noreferrer" aria-label="Instagram" className="bg-cream/10 p-3 rounded-full hover:bg-mustard hover:text-ink transition-colors text-cream/80">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://maps.app.goo.gl/FF8mphjaHEt2PKtC7" target="_blank" rel="noreferrer" aria-label="Google Maps" className="bg-cream/10 p-3 rounded-full hover:bg-mustard hover:text-ink transition-colors text-cream/80">
              <MapPin className="w-5 h-5" />
            </a>
            <a href="tel:+919999739766" aria-label="Phone" className="bg-cream/10 p-3 rounded-full hover:bg-mustard hover:text-ink transition-colors text-cream/80">
              <Phone className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-mustard text-sm uppercase tracking-widest mb-3">Visit</h4>
          <p className="text-sm text-cream/80 leading-relaxed">
            96, 1st, Satya Niketan, opposite Venkateshwar college<br />
            Moti Bagh II, New Delhi, Delhi 110021
          </p>
          <p className="text-sm text-cream/80 mt-3">Open daily · 10 AM – 10:30 PM</p>
        </div>
        <div>
          <h4 className="text-mustard text-sm uppercase tracking-widest mb-3">Wander</h4>
          <ul className="space-y-2 text-sm">
            {["/", "/menu", "/about", "/gallery", "/contact"].map((p, i) => (
              <li key={p}>
                <Link to={p} className="hover:text-coral transition-colors">
                  {["Home", "Menu", "About", "Gallery", "Contact"][i]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10 py-4 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} Amigos Hub · Made with chai & late nights in Satya Niketan
      </div>
    </footer>
  );
}