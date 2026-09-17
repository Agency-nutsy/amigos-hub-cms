import { Link } from "@tanstack/react-router";
import { useState } from "react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

type SiteNavProps = {
  name: string;
  logoUrl: string;
};

export function SiteNav({ name, logoUrl }: SiteNavProps) {
  const [open, setOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    setOpen(false);
    window.dispatchEvent(new CustomEvent("nav-click", { detail: { path } }));
  };

  return (
    <header className="fixed top-3 sm:top-4 inset-x-0 z-50 px-3 sm:px-6 pointer-events-none transition-all">
      <div className="mx-auto w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] max-w-7xl backdrop-blur-xl bg-[color-mix(in_oklab,var(--cream)_78%,transparent)] border border-charcoal/15 shadow-[0_10px_30px_rgba(31,30,29,0.08),0_1px_2px_rgba(255,255,255,0.7)_inset] rounded-full px-5 sm:px-8 py-2 sm:py-2.5 flex items-center justify-between gap-6 pointer-events-auto">
        {/* Brand Logo & Name */}
        <Link
          to="/"
          onClick={(e) => handleNavClick(e, "/")}
          className="flex items-center gap-3 group shrink-0"
        >
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={name}
              className="h-10 sm:h-12 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-charcoal">
              {name}
            </span>
          )}
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-charcoal/90">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={(e) => handleNavClick(e, l.to)}
              className="relative py-1 hover:text-coral transition-colors [&.active]:text-coral font-medium"
              activeProps={{ className: "active" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
              <span className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-coral rounded-full origin-left scale-x-0 transition-transform duration-300 group-[.active]:scale-x-100 hover:scale-x-100" />
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={(e) => handleNavClick(e, "/contact")}
            className="rounded-full bg-charcoal text-cream px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium hover:bg-coral transition-all duration-200 shadow-sm hover:shadow hover:-translate-y-0.5"
          >
            Book a table
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full bg-charcoal/5 border border-charcoal/15 text-charcoal hover:bg-charcoal/10 transition-colors"
          aria-label="Toggle menu"
          onClick={() => setOpen((s) => !s)}
        >
          <span className="block w-5 h-0.5 bg-charcoal relative before:content-[''] before:absolute before:-top-1.5 before:left-0 before:right-0 before:h-0.5 before:bg-charcoal after:content-[''] after:absolute after:top-1.5 after:left-0 after:right-0 after:h-0.5 after:bg-charcoal transition-all" />
        </button>
      </div>

      {/* Floating Mobile Dropdown */}
      {open && (
        <div className="md:hidden mt-2 mx-auto w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] max-w-[96rem] rounded-3xl border border-charcoal/15 bg-[color-mix(in_oklab,var(--cream)_92%,transparent)] backdrop-blur-2xl shadow-2xl p-4 pointer-events-auto animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={(e) => handleNavClick(e, l.to)}
                className="px-4 py-3 rounded-full text-base font-medium text-charcoal hover:bg-charcoal/10 [&.active]:bg-charcoal/10 [&.active]:text-coral transition-colors"
                activeProps={{ className: "active" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={(e) => handleNavClick(e, "/contact")}
              className="mt-2 rounded-full bg-charcoal text-cream text-center py-3 text-base font-medium hover:bg-coral transition-colors shadow"
            >
              Book a table
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}