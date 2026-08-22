import Image from "next/image";
import Nav from "./components/Nav";
import Marquee from "./components/Marquee";
import Reveal from "./components/Reveal";
import SpinBadge from "./components/SpinBadge";
import MenuSection from "./components/MenuSection";
import Termine from "./components/Termine";

/* ── shared bits ── */

function ArrowIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path
        d="M1 7h11M7.5 2.5 12 7l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Cta({
  href,
  children,
  tone = "flame",
}: {
  href: string;
  children: React.ReactNode;
  tone?: "flame" | "ink" | "white";
}) {
  const map = {
    flame: "bg-flame text-white hover:bg-ink",
    ink: "bg-ink text-white hover:bg-flame",
    white: "bg-white text-ink hover:bg-flame hover:text-white",
  } as const;
  const disc = {
    flame: "bg-white text-flame",
    ink: "bg-flame text-white",
    white: "bg-flame text-white",
  } as const;

  return (
    <a href={href} className={`btn group ${map[tone]}`}>
      {children}
      <span className={`btn-disc ${disc[tone]}`}>
        <ArrowIcon />
      </span>
    </a>
  );
}

const STATS = [
  { val: "20", sub: " Jahre", label: "In Deutschland" },
  { val: "2", sub: " Öfen", label: "Im Truck" },
  { val: "7", sub: " Min", label: "Pro Pizza" },
  { val: "8", sub: " €", label: "Jede Pizza" },
];

/* ── page ── */

export default function Home() {
  return (
    <>
      <Nav />

      {/* ══ HERO ══ */}
      <section
        id="top"
        className="relative overflow-hidden bg-cream px-4 pb-16 pt-28 md:px-8 md:pt-36"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="relative">
            <h1 className="display text-flame text-[clamp(3.6rem,15.5vw,15rem)]">
              <span className="block">Holzofen</span>
              <span className="block">Pizza</span>
              <span className="block text-ink">Bergstraße</span>
            </h1>

            {/* Hero photo — overlaps the type */}
            <div className="pointer-events-none absolute right-0 top-[6%] hidden w-[38%] max-w-[520px] md:block">
              <div className="animate-float relative aspect-square rotate-[-7deg] overflow-hidden rounded-[40px] shadow-[0_40px_90px_rgba(23,22,15,0.28)]">
                <Image
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&q=85"
                  alt="Frisch gebackene Pizza aus dem Holzofen"
                  fill
                  priority
                  sizes="40vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Mobile hero photo */}
          <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-[32px] md:hidden">
            <Image
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900&q=85"
              alt="Frisch gebackene Pizza aus dem Holzofen"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="mt-10 flex flex-col gap-10 md:mt-16 md:flex-row md:items-end md:justify-between">
            <div className="flex items-center gap-6">
              <Cta href="#termine">Nächste Termine</Cta>
              <SpinBadge className="hidden h-24 w-24 sm:block" />
            </div>

            <div className="max-w-md md:text-right">
              <p className="eyebrow mb-3 text-basil">Straßenfeste & Privatfeiern</p>
              <p className="text-[15px] leading-[1.8] text-ink/55">
                Zwei Holzöfen, ein Truck, Giuseppes geheimer Teig. Sieben
                Minuten von der Bestellung bis zur Pizza. Jede für 8 €.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ GIUSEPPE ══ */}
      <section id="giuseppe" className="bg-paper px-4 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <Reveal className="text-center">
            <p className="eyebrow mb-5 text-flame">Il Padrone</p>
            <h2 className="display mx-auto max-w-[18ch] text-[clamp(2.2rem,6vw,5.2rem)] text-ink">
              Giuseppe kam aus Kalabrien.{" "}
              <span className="text-flame">Der Teig kam mit.</span>
            </h2>
          </Reveal>

          <Reveal delay={100} className="relative mt-14">
            <div className="relative mx-auto aspect-[16/9] max-w-4xl overflow-hidden rounded-[40px]">
              <Image
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1400&q=85"
                alt="Pizzateig wird von Hand ausgezogen"
                fill
                sizes="(max-width:1024px) 100vw, 900px"
                className="object-cover"
              />
            </div>

            <div className="relative z-10 mx-auto -mt-10 flex w-fit items-baseline gap-3 rounded-3xl bg-basil px-10 py-6 shadow-[0_20px_50px_rgba(15,107,60,0.30)]">
              <span className="font-script text-3xl leading-none text-white/80">
                Pizza
              </span>
              <span className="display text-[clamp(1.6rem,3.4vw,2.6rem)] text-white">
                Napoletano
              </span>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-12 lg:grid-cols-[1.1fr_1.4fr] lg:gap-20">
            <Reveal>
              <h3 className="display mb-5 text-[1.9rem] text-ink">
                Ein Rezept, das niemand kennt.
              </h3>
              <p className="mb-8 text-[15px] leading-[1.9] text-ink/55">
                Vor 20 Jahren zog Giuseppe seiner Frau nach Deutschland. Zwei
                Kinder später steht er an der Bergstraße am Ofen — die Wurzeln
                aber liegen weiter in Kalabrien. Von dort kommen die Zutaten,
                und von dort kommt der Teig: sein eigenes Rezept, das er
                niemandem verrät.
              </p>
              <Cta href="#truck" tone="ink">
                Der Truck
              </Cta>
            </Reveal>

            <Reveal delay={120}>
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[28px] bg-ink/10">
                {STATS.map((s) => (
                  <div key={s.label} className="bg-paper px-6 py-10 text-center">
                    <dd className="display text-[clamp(2.4rem,5vw,3.6rem)] text-ink">
                      {s.val}
                      <span className="text-[0.4em] text-ink/30">{s.sub}</span>
                    </dd>
                    <dt className="eyebrow mt-2 text-ink/40">{s.label}</dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ DARK BAND — der Teig ══ */}
      <section className="relative isolate overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=1800&q=85"
          alt="Pizza im lodernden Holzofen"
          fill
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/92 via-ink/70 to-ink/25" />

        <div className="mx-auto flex max-w-[1400px] flex-col gap-10 px-4 py-28 md:flex-row md:items-end md:justify-between md:px-8 md:py-40">
          <Reveal>
            <h2 className="display max-w-[12ch] text-[clamp(2.4rem,7vw,6rem)] text-white">
              Das Rezept bleibt geheim.
            </h2>
          </Reveal>

          <Reveal delay={120} className="max-w-sm">
            <p className="font-script mb-6 text-4xl text-flame">Giuseppe</p>
            <p className="mb-8 text-[15px] leading-[1.9] text-white/60">
              Frisch ausgerollt, von Hand belegt, im Holzofen gebacken. Original
              italienische Zutaten — mehr wird nicht verraten.
            </p>
            <Cta href="#karte">Zur Karte</Cta>
          </Reveal>
        </div>
      </section>

      <Marquee words={["Originale Italia", "Forno a Legna", "Fatto a Mano"]} />

      {/* ══ KARTE ══ */}
      <MenuSection />

      {/* ══ TERMINE ══ */}
      <Termine />

      <Marquee
        words={["Straßenfeste", "Foodfeste", "Privatfeiern", "Ganzjährig"]}
        tone="flame"
        reverse
      />

      {/* ══ TRUCK ══ */}
      <section
        id="truck"
        className="relative overflow-hidden bg-ink px-4 py-24 md:px-8 md:py-32"
      >
        <span
          className="display ghost-text pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap text-center text-[19vw] leading-none"
          aria-hidden
        >
          Due Forni
        </span>

        <div className="relative mx-auto max-w-[1400px]">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow mb-5 text-flame">Il Nostro Truck</p>
            <h2 className="display text-[clamp(2.2rem,6vw,5rem)] text-white">
              Zwei Öfen.{" "}
              <span className="text-flame">Zehn Pizzen gleichzeitig.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-md text-[15px] leading-[1.85] text-white/55">
              Deshalb dauert es bei uns sieben Minuten statt einer halben
              Stunde — auch wenn die Schlange lang ist.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {[
              {
                n: "01",
                title: "Auf dem Fest",
                copy: "Wir stehen das ganze Jahr auf Straßen- und Foodfesten an der Bergstraße. Einfach vorbeikommen.",
                items: ["Straßenfeste", "Foodtruck-Festivals", "Wein- & Stadtfeste"],
                bg: "bg-flame",
                cta: "Termine ansehen",
                href: "#termine",
              },
              {
                n: "02",
                title: "Privat gebucht",
                copy: "Hochzeit, Geburtstag, Firmenfeier — der Truck kommt zu Ihnen. Ein Flatpreis, keine versteckten Posten, das ganze Jahr über.",
                items: ["Hochzeiten", "Geburtstage & Jubiläen", "Firmenfeiern"],
                bg: "bg-basil",
                cta: "Anfragen",
                href: "#kontakt",
              },
            ].map((b, i) => (
              <Reveal
                as="article"
                key={b.n}
                delay={i * 110}
                className={`${b.bg} rounded-[32px] p-8 text-white md:p-12`}
              >
                <p className="eyebrow mb-6 text-white/45">
                  {b.n} — {b.title}
                </p>
                <h3 className="display mb-5 text-[clamp(1.8rem,3.4vw,2.8rem)]">
                  {b.title}
                </h3>
                <p className="mb-8 max-w-sm text-[15px] leading-[1.85] text-white/70">
                  {b.copy}
                </p>
                <ul className="mb-10 space-y-2.5">
                  {b.items.map((it) => (
                    <li
                      key={it}
                      className="flex items-center gap-3 text-[14px] text-white/60"
                    >
                      <span className="h-1.5 w-1.5 flex-none rounded-full bg-white/40" />
                      {it}
                    </li>
                  ))}
                </ul>
                <Cta href={b.href} tone="white">
                  {b.cta}
                </Cta>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ KONTAKT ══ */}
      <section
        id="kontakt"
        className="relative overflow-hidden bg-basil px-4 pt-24 md:px-8 md:pt-32"
      >
        <div className="mx-auto max-w-[1400px]">
          <Reveal className="text-center">
            <p className="eyebrow mb-6 text-white/45">Buchung & Kontakt</p>
            <h2 className="display mx-auto max-w-[15ch] text-[clamp(2.4rem,8vw,7rem)] text-flame">
              Truck buchen,<br />
              <span className="font-script lowercase tracking-normal text-white">
                zum Flatpreis
              </span>
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-px overflow-hidden rounded-[32px] bg-white/15 sm:grid-cols-3">
            {[
              { k: "Region", v: "Bergstraße\nHessen & Baden-Württemberg" },
              { k: "Telefon", v: "06251 · 000 000\nMo–Fr 10–18 Uhr" },
              {
                k: "E-Mail",
                v: "info@pizza-napoletano.de\n@pizzanapoletano.bergstrasse",
              },
            ].map((c, i) => (
              <Reveal key={c.k} delay={i * 90} className="bg-basil px-8 py-10">
                <p className="eyebrow mb-4 text-white/40">{c.k}</p>
                <p className="whitespace-pre-line text-[15px] leading-[1.85] text-white/85">
                  {c.v}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal
            delay={120}
            className="mt-6 flex flex-col gap-4 rounded-[32px] bg-paper p-6 sm:flex-row sm:items-center sm:p-4 sm:pl-9"
          >
            <p className="display flex-1 text-[1.35rem] text-ink">
              Termin anfragen
            </p>
            <form
              className="flex flex-1 items-center gap-2 rounded-full bg-cream p-2 pl-6"
              action="mailto:info@pizza-napoletano.de"
              method="post"
              encType="text/plain"
            >
              <label htmlFor="mail" className="sr-only">
                E-Mail-Adresse
              </label>
              <input
                id="mail"
                name="email"
                type="email"
                required
                placeholder="Ihre E-Mail-Adresse"
                className="min-w-0 flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-ink/35"
              />
              <button
                type="submit"
                aria-label="Anfrage senden"
                className="grid h-11 w-11 flex-none place-items-center rounded-full bg-flame text-white transition-colors hover:bg-ink"
              >
                <ArrowIcon size={15} />
              </button>
            </form>
          </Reveal>

          <div className="relative mt-20 h-[26vw] min-h-[150px] overflow-hidden rounded-t-[40px]">
            <Image
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1600&q=85"
              alt="Frisch gebackene Pizza"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="bg-ink px-4 py-8 md:px-8">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-6 md:flex-row md:justify-between">
          <a href="#top" className="flex items-baseline gap-2">
            <span className="font-script text-2xl leading-none text-flame">
              Pizza
            </span>
            <span className="display text-lg leading-none text-white">
              Napoletano
            </span>
          </a>

          <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
            {[
              ["#karte", "Karte"],
              ["#termine", "Termine"],
              ["#truck", "Truck"],
              ["#giuseppe", "Giuseppe"],
              ["#kontakt", "Kontakt"],
            ].map(([href, label]) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40 transition-colors hover:text-flame"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <span
              className="flex overflow-hidden rounded-sm"
              aria-label="Bandiera italiana"
            >
              <span className="h-3 w-4 bg-[#009246]" />
              <span className="h-3 w-4 bg-white" />
              <span className="h-3 w-4 bg-[#CE2B37]" />
            </span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-white/25">
              © 2026 Bergstraße
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
