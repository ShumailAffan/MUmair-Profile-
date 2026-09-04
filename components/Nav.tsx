"use client";

import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "standing", label: "Standing" },
  { id: "practice", label: "Practice Areas" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-navy/95 backdrop-blur border-b border-white/10">
      <div className="max-w-content mx-auto px-6 flex items-center justify-between py-4">
        <a href="#top" className="flex items-baseline gap-2.5 text-ivory no-underline">
          <span className="font-display font-bold text-xl">Mian Umair</span>
          <span className="hidden sm:inline text-[0.68rem] tracking-[0.14em] uppercase text-gold border-l border-white/15 pl-2.5">
            Advocate, High Court
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex gap-7 list-none m-0 p-0">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`text-sm font-medium pb-1 border-b-2 transition-colors ${
                    active === item.id
                      ? "text-gold border-gold"
                      : "text-ivory border-transparent hover:text-gold"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-gold text-navyink font-semibold text-sm px-4 py-2.5 rounded-sm hover:bg-gold-deep transition-colors"
          >
            Book a Consultation
          </a>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="lg:hidden w-10 h-10 flex items-center justify-center border border-white/15 rounded-sm text-ivory"
        >
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
            <path d="M0 1H18M0 7H18M0 13H18" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-navyink border-t border-white/10">
          <ul className="list-none m-0 px-6 py-2 pb-5">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-ivory text-sm border-b border-white/10"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
