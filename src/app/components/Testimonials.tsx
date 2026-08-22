"use client";

import Image from "next/image";
import { useState } from "react";

const VOICES = [
  {
    quote:
      "Wir hatten den Truck auf unserer Hochzeit — 120 Gäste, alle satt und begeistert. Der Teig war unglaublich luftig, und das Team hat den Abend über einfach durchgebacken. Absolute Empfehlung.",
    name: "Sarah & Julian Kremer",
    role: "Hochzeit, Heppenheim",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  },
  {
    quote:
      "Zum Firmensommerfest haben wir Pizza Napoletano gebucht. Pünktlich, professionell, und der Holzofen war der Hingucker des Abends. Unsere Leute reden heute noch davon.",
    name: "Michael Bergmann",
    role: "Firmenevent, Bensheim",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
  },
  {
    quote:
      "Wir stehen mit dem Truck jedes Jahr auf unserem Straßenfest. Die Schlange reißt nie ab — und das sagt bei einem Weinfest schon einiges. Echte neapolitanische Qualität.",
    name: "Anna Lechner",
    role: "Straßenfest, Zwingenberg",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
  },
  {
    quote:
      "Der 72-Stunden-Teig macht wirklich den Unterschied. Ich bin selbst Koch und war skeptisch — nach der ersten Margherita nicht mehr.",
    name: "Tobias Wenz",
    role: "Geburtstag, Lorsch",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    quote:
      "Unkomplizierte Absprache, faire Preise, und am Ende standen 200 zufriedene Gäste da. Genau so wünscht man sich einen Caterer.",
    name: "Petra Hoffmann",
    role: "Vereinsjubiläum, Bürstadt",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  },
];

function Stars() {
  return (
    <div className="flex gap-1" aria-label="5 von 5 Sternen">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="#F0522A">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 15l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function Arrow({ dir }: { dir: "l" | "r" }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 14 14"
      fill="none"
      className={dir === "l" ? "rotate-180" : ""}
    >
      <path
        d="M1 7h11M7.5 2.5 12 7l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Testimonials() {
  const [i, setI] = useState(2);
  const active = VOICES[i];

  const go = (d: number) => setI((v) => (v + d + VOICES.length) % VOICES.length);

  return (
    <section id="stimmen" className="bg-cream px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="display text-[clamp(2.1rem,5.6vw,4.4rem)] text-ink">
          Was unsere <span className="text-flame">Gäste</span> sagen
        </h2>

        {/* Avatar rail — the active face grows, the rest recede */}
        <div className="mt-14 flex items-center justify-center gap-3 sm:gap-5">
          {VOICES.map((v, idx) => {
            const on = idx === i;
            return (
              <button
                key={v.name}
                onClick={() => setI(idx)}
                aria-label={v.name}
                className={`relative overflow-hidden rounded-full transition-all duration-500 ${
                  on
                    ? "h-20 w-20 opacity-100 ring-4 ring-flame ring-offset-4 ring-offset-cream sm:h-24 sm:w-24"
                    : "h-12 w-12 opacity-40 grayscale hover:opacity-70 sm:h-14 sm:w-14"
                }`}
              >
                <Image
                  src={v.img}
                  alt=""
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>

        {/* Quote card */}
        <div className="relative mt-12">
          <div className="rounded-[32px] bg-paper px-6 py-12 sm:px-14">
            <p
              key={active.name}
              className="mx-auto max-w-2xl text-[clamp(1rem,1.6vw,1.2rem)] leading-[1.85] text-ink/70"
            >
              „{active.quote}"
            </p>

            <div className="mt-9 flex flex-col items-center gap-3">
              <Stars />
              <p className="display text-[1.35rem] text-ink">{active.name}</p>
              <p className="eyebrow text-ink/35">{active.role}</p>
            </div>
          </div>

          {/* Prev / next */}
          <button
            onClick={() => go(-1)}
            aria-label="Vorherige Stimme"
            className="absolute -left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-ink text-white transition-colors hover:bg-flame sm:-left-6"
          >
            <Arrow dir="l" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Nächste Stimme"
            className="absolute -right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-ink text-white transition-colors hover:bg-flame sm:-right-6"
          >
            <Arrow dir="r" />
          </button>
        </div>
      </div>
    </section>
  );
}
