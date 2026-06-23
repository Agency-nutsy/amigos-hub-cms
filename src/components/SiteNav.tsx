import { Link } from "@tanstack/react-router";
import { useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    setOpen(false);
    window.dispatchEvent(new CustomEvent('nav-click', { detail: { path } }));
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[color-mix(in_oklab,var(--cream)_82%,transparent)] border-b-2 border-charcoal/10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-3 flex items-center justify-between gap-6">
        <Link to="/" onClick={(e) => handleNavClick(e, "/")} className="flex items-center group">
          <img src="/logo.avif" alt="Amigos Hub" className="h-10 sm:h-12 w-auto object-contain drop-shadow-md" />
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={(e) => handleNavClick(e, l.to)}
              className="relative py-1 hover:text-coral transition-colors [&.active]:text-coral"
              activeProps={{ className: "active" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
              <span className="absolute left-0 right-0 -bottom-0.5 h-[3px] bg-mustard origin-left scale-x-0 transition-transform duration-300 group-[.active]:scale-x-100 hover:scale-x-100" />
            </Link>
          ))}
          <Link to="/contact" onClick={(e) => handleNavClick(e, "/contact")} className="rounded-full bg-charcoal text-cream px-4 py-2 text-sm font-medium hover:bg-coral transition-colors">
            Book a table
          </Link>
        </nav>
        <button
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-charcoal/20"
          aria-label="Menu"
          onClick={() => setOpen((s) => !s)}
        >
          <span className="block w-5 h-0.5 bg-ink relative before:content-[''] before:absolute before:-top-1.5 before:left-0 before:right-0 before:h-0.5 before:bg-ink after:content-[''] after:absolute after:top-1.5 after:left-0 after:right-0 after:h-0.5 after:bg-ink" />
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-charcoal/10 bg-cream">
          <div className="px-5 py-3 flex flex-col gap-2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={(e) => handleNavClick(e, l.to)}
                className="py-2 text-base font-medium [&.active]:text-coral"
                activeProps={{ className: "active" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}