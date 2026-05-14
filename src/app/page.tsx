import Image from "next/image";

const menuItems = [
  {
    num: "01",
    name: "Margherita",
    desc: "San Marzano · Fior di Latte · Basilikum · Olivenöl E.V.",
    price: "12",
  },
  {
    num: "02",
    name: "Diavola",
    desc: "San Marzano · Fior di Latte · Nduja Calabrese · Peperoncino",
    price: "14",
  },
  {
    num: "03",
    name: "Quattro Formaggi",
    desc: "Mozzarella · Gorgonzola · Pecorino Romano · Parmigiano",
    price: "15",
  },
];

const marqueeText =
  "FRISCH GEBACKEN · HANDGEMACHT · NAPOLI STYLE · PREMIUM ZUTATEN · 72H TEIG · HOLZOFEN · ";
const marqueeContent = Array(6).fill(marqueeText).join("");

export default function Home() {
  return (
    <>
      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-5 bg-cream/95 backdrop-blur-sm border-b border-dark/5">
        <span className="font-serif text-sm tracking-[0.2em] uppercase">
          Pizza von Guiseppe
        </span>
        <ul className="hidden md:flex gap-10 text-[11px] tracking-[0.25em] uppercase text-dark/60">
          <li>
            <a href="#menu" className="hover:text-dark transition-colors">
              Menü
            </a>
          </li>
          <li>
            <a href="#story" className="hover:text-dark transition-colors">
              Über uns
            </a>
          </li>
          <li>
            <a href="#location" className="hover:text-dark transition-colors">
              Standort
            </a>
          </li>
        </ul>
      </nav>

      {/* ── HERO ── */}
      <section className="relative h-screen bg-dark flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1920&q=85"
            alt="Pizza von Guiseppe"
            fill
            className="object-cover opacity-35"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-dark/20" />

        <div className="relative z-10 px-8 md:px-16 pb-24 max-w-6xl">
          <p className="text-accent text-[11px] tracking-[0.45em] uppercase mb-8">
            Pizza Truck · München
          </p>
          <h1 className="font-serif text-white italic leading-[0.88] mb-8" style={{ fontSize: "clamp(4.5rem, 13vw, 11rem)" }}>
            Echte<br />Pizza.
          </h1>
          <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-12 tracking-wide">
            Neapolitanischer Teig, 72 Stunden gereift. Zutaten direkt aus
            Kampanien. Holzofen auf 450 °C.
          </p>
          <a
            href="#menu"
            className="inline-block border border-white/25 text-white text-[11px] tracking-[0.35em] uppercase px-10 py-4 hover:bg-white hover:text-dark transition-all duration-300"
          >
            Zur Speisekarte
          </a>
        </div>

        <div className="absolute bottom-10 right-8 md:right-16 flex flex-col items-center gap-3 text-white/25">
          <div className="w-px h-14 bg-white/15" />
          <span className="text-[9px] tracking-[0.35em] uppercase" style={{ writingMode: "vertical-rl" }}>
            Scroll
          </span>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="bg-cream border-y border-dark/10 py-[18px] overflow-hidden">
        <div className="animate-marquee whitespace-nowrap inline-block">
          <span className="text-[11px] tracking-[0.35em] text-dark/25 uppercase">
            {marqueeContent}
          </span>
          <span className="text-[11px] tracking-[0.35em] text-dark/25 uppercase" aria-hidden>
            {marqueeContent}
          </span>
        </div>
      </div>

      {/* ── MENU ── */}
      <section id="menu" className="bg-cream py-28 md:py-36 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-dark/10 pb-10 mb-0">
            <div>
              <p className="text-[11px] tracking-[0.45em] uppercase text-dark/35 mb-4">
                Handgemacht seit 2019
              </p>
              <h2
                className="font-serif italic text-dark leading-tight"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
              >
                Unsere Pizzen
              </h2>
            </div>
            <a
              href="#"
              className="text-[11px] tracking-[0.3em] uppercase border-b border-dark/40 pb-1 text-dark/60 hover:text-dark hover:border-dark transition-colors self-start md:self-auto"
            >
              Vollständige Karte
            </a>
          </div>

          <div className="grid md:grid-cols-3">
            {menuItems.map((item, i) => (
              <div
                key={item.num}
                className={[
                  "py-14",
                  i < menuItems.length - 1 ? "md:border-r border-dark/10" : "",
                  i > 0 ? "md:px-12" : "md:pr-12",
                  "border-t border-dark/10",
                ].join(" ")}
              >
                <span className="text-[11px] tracking-[0.3em] text-dark/25 uppercase">
                  {item.num}
                </span>
                <h3 className="font-serif text-[1.85rem] italic mt-5 mb-4 leading-tight">
                  {item.name}
                </h3>
                <p className="text-sm text-dark/45 leading-loose mb-10">
                  {item.desc}
                </p>
                <span className="font-serif text-xl text-dark/70">
                  € {item.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STORY ── */}
      <section id="story" className="grid md:grid-cols-2">
        <div className="relative min-h-[55vh] md:min-h-[680px]">
          <Image
            src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=900&q=85"
            alt="Handgemachte Pizza"
            fill
            className="object-cover"
          />
        </div>
        <div className="bg-dark text-white flex items-center px-10 md:px-20 py-20 md:py-28">
          <div className="max-w-sm">
            <p className="text-[11px] tracking-[0.45em] uppercase text-accent mb-10">
              Unsere Geschichte
            </p>
            <h2
              className="font-serif italic text-white leading-[0.95] mb-10"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)" }}
            >
              Pizza ist<br />Handwerk.
            </h2>
            <p className="text-white/45 text-sm leading-[1.9] mb-5">
              Guiseppe wuchs in Neapel auf, wo jede Nonna ihre eigene
              Geheimformel hatte. 2019 brachte er diese Leidenschaft nach
              München — auf vier Rädern, mit eigenem Holzofen.
            </p>
            <p className="text-white/45 text-sm leading-[1.9]">
              Unsere Zutaten kommen direkt aus Kampanien: San Marzano-Tomaten,
              echter Fior di Latte, kaltgepresstes Olivenöl aus Apulien.
            </p>
            <div className="mt-14 pt-8 border-t border-white/10">
              <p className="font-serif italic text-base text-white/40">
                — Guiseppe Ferrara
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOCATION ── */}
      <section id="location" className="bg-[#0D0B08] text-white py-28 md:py-36 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-[11px] tracking-[0.45em] uppercase text-accent mb-8">
              Finden Sie uns
            </p>
            <h2
              className="font-serif italic text-white"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Täglich vor Ort
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 border-t border-white/8 pt-16">
            <div>
              <p className="text-[10px] tracking-[0.45em] uppercase text-white/25 mb-5">
                Standort
              </p>
              <p className="text-white/65 text-sm leading-[1.9]">
                Leopoldstraße 12
                <br />
                80802 München
                <br />
                Maxvorstadt
              </p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.45em] uppercase text-white/25 mb-5">
                Öffnungszeiten
              </p>
              <p className="text-white/65 text-sm leading-[1.9]">
                Mo–Fr · 11:00–22:00
                <br />
                Sa–So · 12:00–23:00
              </p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.45em] uppercase text-white/25 mb-5">
                Kontakt
              </p>
              <p className="text-white/65 text-sm leading-[1.9]">
                @pizzavonguiseppe
                <br />
                info@pizzavonguiseppe.de
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-cream border-t border-dark/8 px-8 md:px-16 py-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="font-serif italic text-sm text-dark/35">
            Pizza von Guiseppe
          </span>
          <span className="text-[10px] tracking-[0.25em] uppercase text-dark/25">
            © 2025 · München
          </span>
        </div>
      </footer>
    </>
  );
}
