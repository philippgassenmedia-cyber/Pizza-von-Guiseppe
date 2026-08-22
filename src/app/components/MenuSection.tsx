"use client";

import Image from "next/image";
import { useState } from "react";
import Reveal from "./Reveal";

type Cat = "Pizza" | "Antipasti" | "Dolci" | "Drinks";

const ITEMS: {
  name: string;
  desc: string;
  price: string;
  cat: Cat;
  img: string;
}[] = [
  {
    name: "Margherita D.O.P.",
    desc: "San Marzano · Fior di Latte · Basilikum",
    price: "11",
    cat: "Pizza",
    img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80",
  },
  {
    name: "Diavola",
    desc: "Nduja Calabrese · Peperoncino · Mozzarella",
    price: "14",
    cat: "Pizza",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
  },
  {
    name: "Quattro Formaggi",
    desc: "Gorgonzola · Pecorino · Parmigiano · Mozzarella",
    price: "15",
    cat: "Pizza",
    img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
  },
  {
    name: "Prosciutto e Funghi",
    desc: "Parmaschinken · Champignons · Mozzarella",
    price: "13",
    cat: "Pizza",
    img: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=800&q=80",
  },
  {
    name: "Bruschetta Classica",
    desc: "Holzofenbrot · Tomaten · Knoblauch · Olivenöl",
    price: "6",
    cat: "Antipasti",
    img: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=800&q=80",
  },
  {
    name: "Antipasti Misti",
    desc: "Oliven · Sardellen · gegrilltes Gemüse",
    price: "9",
    cat: "Antipasti",
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
  },
  {
    name: "Tiramisù della Casa",
    desc: "Mascarpone · Espresso · Kakao",
    price: "5",
    cat: "Dolci",
    img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80",
  },
  {
    name: "Limonata Siciliana",
    desc: "Zitrone aus Sizilien · hausgemacht",
    price: "4",
    cat: "Drinks",
    img: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=800&q=80",
  },
];

const TABS = ["Alle", "Pizza", "Antipasti", "Dolci", "Drinks"] as const;

export default function MenuSection() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Alle");
  const shown = tab === "Alle" ? ITEMS : ITEMS.filter((i) => i.cat === tab);

  return (
    <section id="speisekarte" className="bg-cream px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        {/* Headline */}
        <Reveal className="text-center">
          <p className="eyebrow mb-5 text-flame">La Nostra Carta</p>
          <h2 className="display mx-auto max-w-[16ch] text-[clamp(2.3rem,6.4vw,5.2rem)] text-ink">
            Unsere Karte — <span className="text-flame">was wir</span> servieren
          </h2>
        </Reveal>

        {/* Tabs */}
        <Reveal delay={80} className="mt-10 flex flex-wrap justify-center gap-2">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pill ${
                tab === t
                  ? "border-ink bg-ink text-white"
                  : "border-ink/15 bg-transparent text-ink/55 hover:border-ink/40 hover:text-ink"
              }`}
            >
              {t}
            </button>
          ))}
        </Reveal>

        {/* Grid */}
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((item, i) => (
            <Reveal
              as="li"
              key={item.name}
              delay={(i % 3) * 90}
              className="group overflow-hidden rounded-[28px] bg-paper p-4 transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(23,22,15,0.10)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-cream">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  sizes="(max-width:640px) 92vw, (max-width:1024px) 46vw, 30vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
                />
                <span className="absolute left-3 top-3 rounded-full bg-basil px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                  {item.cat}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4 px-2 pt-5">
                <div>
                  <h3 className="display text-[1.55rem] text-ink">{item.name}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-ink/45">
                    {item.desc}
                  </p>
                </div>
                <span className="display flex-none text-[1.7rem] text-flame">
                  €{item.price}
                </span>
              </div>

              <a
                href="#kontakt"
                className="pill mt-5 w-full border-ink/12 text-ink/60 hover:border-ink hover:bg-ink hover:text-white"
              >
                Für mein Event anfragen
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
