"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#speisekarte", label: "Karte" },
  { href: "#zutaten", label: "Zutaten" },
  { href: "#truck", label: "Truck" },
  { href: "#stimmen", label: "Stimmen" },
];

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8">
      <nav
        className={`mx-auto flex max-w-[1400px] items-center justify-between rounded-full px-3 py-2 transition-all duration-500 ${
          solid
            ? "bg-paper/90 shadow-[0_8px_30px_rgba(23,22,15,0.10)] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        {/* Left — desktop links */}
        <ul className="hidden flex-1 items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-ink/60 transition-colors hover:bg-ink hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile burger */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menü"
          aria-expanded={open}
          className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white md:hidden"
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute left-0 block h-[2px] w-4 bg-current transition-transform duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-[2px] w-4 bg-current transition-opacity duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-[2px] w-4 bg-current transition-transform duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>

        {/* Centre — logo plate */}
        <a
          href="#top"
          className="flex items-center gap-2 rounded-full bg-basil px-5 py-2.5 text-white"
        >
          <span className="font-script text-lg leading-none">Pizza</span>
          <span className="display text-[15px] leading-none">Napoletano</span>
        </a>

        {/* Right — CTA */}
        <div className="flex flex-1 justify-end">
          <a href="#kontakt" className="btn group bg-flame text-white hover:bg-ink">
            <span className="hidden sm:inline">Jetzt anfragen</span>
            <span className="sm:hidden">Anfrage</span>
            <span className="btn-disc bg-white text-flame">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 7h11M7.5 2.5 12 7l-4.5 4.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <div
        className={`mx-auto mt-2 max-w-[1400px] overflow-hidden rounded-3xl bg-paper shadow-[0_8px_30px_rgba(23,22,15,0.10)] transition-all duration-400 md:hidden ${
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="p-3">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="display block rounded-2xl px-4 py-3 text-2xl text-ink hover:bg-cream"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
