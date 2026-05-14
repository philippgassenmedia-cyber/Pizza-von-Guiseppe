import Image from "next/image";

// ── Pizza SVG: one image, divided into N sectors, each offset outward ──
const SLICE_COUNT = 8;
const SVG_SIZE = 500;
const CX = 250;
const CY = 250;
const RADIUS = 244;
const GAP = 9; // px each slice is pushed outward
const PIZZA_IMG =
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=90";

function buildSlices() {
  return Array.from({ length: SLICE_COUNT }, (_, i) => {
    const startA = (i / SLICE_COUNT) * 2 * Math.PI - Math.PI / 2;
    const endA = ((i + 1) / SLICE_COUNT) * 2 * Math.PI - Math.PI / 2;
    const midA = startA + (endA - startA) / 2;

    // outward offset
    const dx = +(GAP * Math.cos(midA)).toFixed(2);
    const dy = +(GAP * Math.sin(midA)).toFixed(2);

    // arc path with many points for a smooth curve
    const steps = 12;
    const pts = Array.from({ length: steps + 1 }, (_, s) => {
      const a = startA + (endA - startA) * (s / steps);
      return `${(CX + RADIUS * Math.cos(a)).toFixed(2)},${(CY + RADIUS * Math.sin(a)).toFixed(2)}`;
    });

    return { path: `M ${CX},${CY} L ${pts.join(" L ")} Z`, dx, dy };
  });
}

const pizzaSlices = buildSlices();

function PizzaSVG() {
  return (
    <svg
      viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
      className="w-full h-full"
      role="img"
      aria-label="Pizza Napoletano"
    >
      <defs>
        {pizzaSlices.map((s, i) => (
          <clipPath key={i} id={`pn-clip-${i}`}>
            <path d={s.path} />
          </clipPath>
        ))}
      </defs>

      {pizzaSlices.map((s, i) => (
        <g key={i} transform={`translate(${s.dx},${s.dy})`}>
          {/* Pizza image clipped to this sector */}
          <image
            href={PIZZA_IMG}
            x="0"
            y="0"
            width={SVG_SIZE}
            height={SVG_SIZE}
            clipPath={`url(#pn-clip-${i})`}
            preserveAspectRatio="xMidYMid slice"
          />
          {/* Thin dark border to separate slices */}
          <path
            d={s.path}
            fill="none"
            stroke="#1a0800"
            strokeWidth="2"
            opacity="0.12"
          />
        </g>
      ))}
    </svg>
  );
}

// ── Page data ──────────────────────────────────────────────────────────────

const menu = [
  {
    num: "01",
    name: "Margherita",
    desc: "San Marzano D.O.P. · Fior di Latte · Basilikum · Olivenöl E.V.",
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
  {
    num: "04",
    name: "Prosciutto e Funghi",
    desc: "San Marzano · Mozzarella · Schinken · Champignons",
    price: "13",
  },
];

const privateEvents = [
  "Geburtstagsfeiern",
  "Hochzeiten & Empfänge",
  "Firmenevents",
  "Gartenfeste & Jubiläen",
];

const publicEvents = [
  "Stadtfeste & Straßenfeste",
  "Weihnachts- & Jahrmärkte",
  "Weinfeste der Region",
  "Open-Air-Festivals",
];

const marqueeText =
  "AUTENTICA NAPOLETANA · HOLZOFEN 450°C · HANDGEMACHT · 72H TEIG · PRIVATFEIERN · STADTFESTE · ";
const marqueeContent = Array(6).fill(marqueeText).join("");

// ── Page ───────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-5 bg-cream/96 backdrop-blur-sm border-b border-dark/5">
        <span className="font-serif text-sm tracking-[0.2em] uppercase text-dark">
          Pizza Napoletano
        </span>
        <ul className="hidden md:flex gap-10 text-[11px] tracking-[0.25em] uppercase text-dark/50">
          <li>
            <a href="#speisekarte" className="hover:text-dark transition-colors">
              Speisekarte
            </a>
          </li>
          <li>
            <a
              href="#veranstaltungen"
              className="hover:text-dark transition-colors"
            >
              Veranstaltungen
            </a>
          </li>
          <li>
            <a href="#standort" className="hover:text-dark transition-colors">
              Standort
            </a>
          </li>
        </ul>
        <a
          href="#kontakt"
          className="hidden md:block text-[11px] tracking-[0.3em] uppercase bg-dark text-cream px-6 py-2.5 hover:bg-it-red transition-colors duration-300"
        >
          Anfrage
        </a>
      </nav>

      {/* ── HERO ── */}
      <section className="min-h-screen bg-cream flex flex-col items-center justify-center px-6 pt-28 pb-16">
        {/* Label */}
        <p className="text-[10px] tracking-[0.55em] text-dark/30 uppercase mb-8 text-center">
          La Pizza Autentica · Bergstraße
        </p>

        {/* Headline */}
        <h1
          className="font-serif italic text-dark text-center leading-[0.88] mb-10 md:mb-14"
          style={{ fontSize: "clamp(3.2rem, 11vw, 9rem)" }}
        >
          Pizza<br />Napoletano.
        </h1>

        {/* SVG Pizza — the centrepiece */}
        <div
          className="w-full max-w-[360px] md:max-w-[520px] aspect-square"
          style={{
            filter:
              "drop-shadow(0px 24px 56px rgba(26,14,8,0.22)) drop-shadow(0px 4px 16px rgba(26,14,8,0.12))",
          }}
        >
          <PizzaSVG />
        </div>

        {/* Subline */}
        <p className="text-[11px] tracking-[0.45em] text-dark/35 uppercase mt-10 mb-10 text-center">
          Holzofen · Privatfeiern · Stadtfeste
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#veranstaltungen"
            className="bg-dark text-cream text-[11px] tracking-[0.3em] uppercase px-10 py-4 text-center hover:bg-it-red transition-colors duration-300"
          >
            Veranstaltungen
          </a>
          <a
            href="#speisekarte"
            className="border border-dark/20 text-dark text-[11px] tracking-[0.3em] uppercase px-10 py-4 text-center hover:bg-dark hover:text-cream transition-colors duration-300"
          >
            Speisekarte
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center gap-2 mt-16 text-dark/20">
          <div className="w-px h-10 bg-dark/15" />
          <span
            className="text-[9px] tracking-[0.35em] uppercase"
            style={{ writingMode: "vertical-rl" }}
          >
            Scroll
          </span>
        </div>
      </section>

      {/* ── TEIG SEKTION — transmorphism transition ── */}
      <section className="bg-cream overflow-hidden">
        <div className="grid md:grid-cols-2 min-h-[90vh]">

          {/* Left: zoomed slice — clip-path morphs from circle as user scrolls in */}
          <div className="relative min-h-[55vw] md:min-h-0 overflow-hidden teig-morph">
            {/* swap src here once real slice photo is uploaded */}
            <Image
              src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=900&q=90"
              alt="Handgemachter Pizzateig"
              fill
              className="object-cover"
              style={{ objectPosition: "22% center" }}
            />
            {/* subtle dark vignette on the right edge to blend into text panel */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-cream/60" />
          </div>

          {/* Right: Teig text */}
          <div className="flex items-center px-10 md:px-20 py-20 md:py-28 teig-text">
            <div className="max-w-sm">
              <p className="text-[11px] tracking-[0.5em] uppercase text-amber mb-8">
                Der Teig
              </p>
              <h2
                className="font-serif italic text-dark leading-[0.92] mb-10"
                style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)" }}
              >
                Handgemacht.<br />Ehrlich.<br />Original Napoletano.
              </h2>
              <p className="text-dark/50 text-sm leading-[1.95] mb-12 max-w-[30ch]">
                Unser Teig entsteht in eigener Herstellung — 72 Stunden
                Naturreife, Tipo&nbsp;00 Mehl aus der Mühle Caputo in Neapel,
                natürliche Hefe. Kein Kompromiss, kein Zusatz.
              </p>

              {/* Ingredient table */}
              <div className="space-y-0 border-t border-dark/10">
                {[
                  { name: "Tipo 00 Mehl", origin: "Mulino Caputo, Neapel" },
                  { name: "San Marzano D.O.P.", origin: "Kampanien" },
                  { name: "Fior di Latte", origin: "Agerola, Kampanien" },
                  { name: "Olivenöl E.V.", origin: "Apulien" },
                  { name: "Naturhefe", origin: "Eigenherstellung" },
                ].map(({ name, origin }) => (
                  <div
                    key={name}
                    className="flex items-center justify-between border-b border-dark/8 py-4"
                  >
                    <span className="text-sm text-dark/80 font-medium">
                      {name}
                    </span>
                    <span className="text-[11px] tracking-[0.15em] text-dark/30 text-right">
                      {origin}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="bg-cream border-y border-dark/8 py-[18px] overflow-hidden">
        <div className="animate-marquee whitespace-nowrap inline-block">
          <span className="text-[11px] tracking-[0.35em] text-dark/25 uppercase">
            {marqueeContent}
          </span>
          <span
            className="text-[11px] tracking-[0.35em] text-dark/25 uppercase"
            aria-hidden
          >
            {marqueeContent}
          </span>
        </div>
      </div>

      {/* ── VERANSTALTUNGEN ── */}
      <section id="veranstaltungen" className="grid md:grid-cols-2">
        {/* Privatfeiern — Italian Red */}
        <div className="bg-it-red text-white px-10 md:px-20 py-24 md:py-32">
          <p className="text-[11px] tracking-[0.45em] uppercase text-white/35 mb-8">
            01 · Privatfeiern
          </p>
          <h2
            className="font-serif italic text-white leading-[0.95] mb-8"
            style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)" }}
          >
            Ihr Fest.<br />Unsere Pizza.
          </h2>
          <p className="text-white/55 text-sm leading-[1.9] mb-10 max-w-xs">
            Von der eleganten Hochzeit bis zum ausgelassenen Geburtstag — wir
            kommen zu Ihnen. Frisch gebacken im Holzofen, direkt vor Ort.
          </p>
          <ul className="space-y-3 mb-12">
            {privateEvents.map((e) => (
              <li
                key={e}
                className="flex items-center gap-3 text-sm text-white/50"
              >
                <span className="w-1 h-1 rounded-full bg-white/30 flex-none" />
                {e}
              </li>
            ))}
          </ul>
          <a
            href="#kontakt"
            className="inline-block border border-white/25 text-white text-[11px] tracking-[0.3em] uppercase px-8 py-4 hover:bg-white hover:text-it-red transition-all duration-300"
          >
            Termin anfragen
          </a>
        </div>

        {/* Stadtfeste — Italian Green */}
        <div className="bg-it-green text-white px-10 md:px-20 py-24 md:py-32">
          <p className="text-[11px] tracking-[0.45em] uppercase text-white/35 mb-8">
            02 · Stadtfeste & Märkte
          </p>
          <h2
            className="font-serif italic text-white leading-[0.95] mb-8"
            style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)" }}
          >
            Für die<br />große Bühne.
          </h2>
          <p className="text-white/55 text-sm leading-[1.9] mb-10 max-w-xs">
            Wir sind auf den beliebtesten Festen der Region Bergstraße dabei.
            Unser Truck wird zum Herzstück jedes Markts und Stadtfests.
          </p>
          <ul className="space-y-3 mb-12">
            {publicEvents.map((e) => (
              <li
                key={e}
                className="flex items-center gap-3 text-sm text-white/50"
              >
                <span className="w-1 h-1 rounded-full bg-white/30 flex-none" />
                {e}
              </li>
            ))}
          </ul>
          <a
            href="#kontakt"
            className="inline-block border border-white/25 text-white text-[11px] tracking-[0.3em] uppercase px-8 py-4 hover:bg-white hover:text-it-green transition-all duration-300"
          >
            Buchung anfragen
          </a>
        </div>
      </section>

      {/* ── SPEISEKARTE ── */}
      <section id="speisekarte" className="bg-cream py-28 md:py-36 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-dark/10 pb-10">
            <div>
              <p className="text-[11px] tracking-[0.45em] uppercase text-dark/30 mb-4">
                Dal forno a legna
              </p>
              <h2
                className="font-serif italic text-dark leading-tight"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
              >
                La Nostra Pizza
              </h2>
            </div>
            <p className="text-xs text-dark/35 leading-relaxed hidden md:block text-right">
              Alle Pizzen werden im Holzofen<br />bei 450 °C gebacken.
            </p>
          </div>

          <div className="grid md:grid-cols-4">
            {menu.map((item, i) => (
              <div
                key={item.num}
                className={[
                  "py-12 border-t border-dark/10",
                  i < menu.length - 1 ? "md:border-r border-dark/10" : "",
                  i > 0 ? "md:px-8" : "md:pr-8",
                ].join(" ")}
              >
                <span className="text-[10px] tracking-[0.3em] text-dark/20 uppercase">
                  {item.num}
                </span>
                <h3 className="font-serif text-[1.45rem] italic mt-4 mb-3 leading-tight">
                  {item.name}
                </h3>
                <p className="text-xs text-dark/40 leading-loose mb-8">
                  {item.desc}
                </p>
                <span className="font-serif text-xl text-dark/60">
                  € {item.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STORIA ── */}
      <section className="grid md:grid-cols-2">
        <div className="bg-dark text-white flex items-center px-10 md:px-20 py-20 md:py-28 order-2 md:order-1">
          <div className="max-w-sm">
            <p className="text-[11px] tracking-[0.45em] uppercase text-amber mb-10">
              La Nostra Storia
            </p>
            <h2
              className="font-serif italic text-white leading-[0.95] mb-10"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)" }}
            >
              Authentizität<br />seit der ersten<br />Pizza.
            </h2>
            <p className="text-white/45 text-sm leading-[1.9] mb-5">
              Die Kunst der neapolitanischen Pizza liegt im Teig. 72 Stunden
              Reifezeit, Tipo 00-Mehl und natürliche Fermentation — das ist das
              Fundament jeder Pizza Napoletano.
            </p>
            <p className="text-white/45 text-sm leading-[1.9]">
              Unsere Zutaten kommen direkt aus Kampanien: San Marzano D.O.P.
              Tomaten, echter Fior di Latte, kaltgepresstes Olivenöl aus
              Apulien.
            </p>
            <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-3 gap-4">
              {[
                { val: "72h", label: "Teig-Reife" },
                { val: "450°", label: "Holzofen" },
                { val: "100%", label: "Handgemacht" },
              ].map(({ val, label }) => (
                <div key={label}>
                  <p className="font-serif italic text-2xl text-white mb-1">
                    {val}
                  </p>
                  <p className="text-[9px] tracking-[0.3em] uppercase text-white/25">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="relative min-h-[55vh] md:min-h-[700px] order-1 md:order-2">
          <Image
            src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=900&q=85"
            alt="Pizza Napoletana aus dem Holzofen"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* ── STANDORT ── */}
      <section
        id="standort"
        className="bg-amber py-28 md:py-36 px-8 md:px-16 relative overflow-hidden"
      >
        <div
          className="absolute inset-0 flex items-center justify-center overflow-hidden select-none pointer-events-none"
          aria-hidden
        >
          <span
            className="font-serif font-black leading-none tracking-tight"
            style={{ fontSize: "26vw", color: "rgba(100,50,8,0.12)" }}
          >
            BERGSTR.
          </span>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <p className="text-[11px] tracking-[0.45em] uppercase text-white/55 mb-8 text-center">
            Finden Sie uns
          </p>
          <h2
            className="font-serif italic text-white text-center mb-20"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            Täglich vor Ort
          </h2>

          <div className="grid md:grid-cols-3 gap-12 border-t border-white/20 pt-16">
            <div>
              <p className="text-[10px] tracking-[0.45em] uppercase text-white/35 mb-5">
                Standort
              </p>
              <p className="text-white/75 text-sm leading-[1.9]">
                Region Bergstraße<br />
                Hessen / Baden-Württemberg
              </p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.45em] uppercase text-white/35 mb-5">
                Präsenz
              </p>
              <p className="text-white/75 text-sm leading-[1.9]">
                Auf regionalen Märkten<br />& Stadtfesten<br />sowie bei
                Privatbuchungen
              </p>
            </div>
            <div id="kontakt">
              <p className="text-[10px] tracking-[0.45em] uppercase text-white/35 mb-5">
                Kontakt & Buchung
              </p>
              <p className="text-white/75 text-sm leading-[1.9]">
                @pizzanapoletano.bergstrasse<br />
                info@pizza-napoletano.de
              </p>
              <a
                href="mailto:info@pizza-napoletano.de"
                className="mt-8 inline-block bg-white text-dark text-[11px] tracking-[0.3em] uppercase px-8 py-4 hover:bg-cream transition-colors duration-300"
              >
                Jetzt anfragen
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-dark px-8 md:px-16 py-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="font-serif italic text-sm text-white/25">
            Pizza Napoletano
          </span>
          <div className="flex items-center gap-0.5" aria-label="Bandiera italiana">
            <div className="w-5 h-3 bg-[#009246] opacity-60" />
            <div className="w-5 h-3 bg-white/40" />
            <div className="w-5 h-3 bg-[#CE2B37] opacity-60" />
          </div>
          <span className="text-[10px] tracking-[0.25em] uppercase text-white/20">
            © 2025 · Bergstraße
          </span>
        </div>
      </footer>
    </>
  );
}
