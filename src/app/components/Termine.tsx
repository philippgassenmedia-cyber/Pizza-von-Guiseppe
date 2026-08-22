import Reveal from "./Reveal";

/* PLATZHALTER — echte Termine hier eintragen. */
const TERMINE = [
  { tag: "12", monat: "Apr", titel: "Frühlingsfest", ort: "Bensheim, Marktplatz", zeit: "11–20 Uhr" },
  { tag: "03", monat: "Mai", titel: "Straßenfest", ort: "Heppenheim, Altstadt", zeit: "12–22 Uhr" },
  { tag: "24", monat: "Mai", titel: "Foodtruck-Festival", ort: "Weinheim, Schlosspark", zeit: "11–21 Uhr" },
  { tag: "14", monat: "Jun", titel: "Weinfest", ort: "Zwingenberg", zeit: "15–23 Uhr" },
];

export default function Termine() {
  return (
    <section id="termine" className="bg-paper px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-5 text-flame">Dove siamo</p>
            <h2 className="display max-w-[14ch] text-[clamp(2.2rem,6vw,5rem)] text-ink">
              Wo wir als <span className="text-flame">Nächstes</span> stehen
            </h2>
          </div>
          <p className="max-w-xs text-[15px] leading-[1.8] text-ink/50">
            Straßen- und Foodfeste an der ganzen Bergstraße. Kommen Sie
            vorbei — anmelden muss sich niemand.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-14">
          <ul className="divide-y divide-ink/10 border-y border-ink/10">
            {TERMINE.map((t) => (
              <li
                key={`${t.tag}-${t.monat}-${t.titel}`}
                className="group flex flex-wrap items-center gap-x-8 gap-y-3 py-6"
              >
                {/* Datumsblock */}
                <div className="flex w-20 flex-none flex-col items-center rounded-2xl bg-flame py-3 text-white">
                  <span className="display text-[1.7rem] leading-none">{t.tag}</span>
                  <span className="eyebrow mt-1 text-white/70">{t.monat}</span>
                </div>

                <div className="min-w-[12rem] flex-1">
                  <h3 className="display text-[clamp(1.3rem,2.6vw,1.8rem)] text-ink transition-colors group-hover:text-flame">
                    {t.titel}
                  </h3>
                  <p className="mt-1 text-[13px] text-ink/45">{t.ort}</p>
                </div>

                <span className="pill flex-none border-ink/15 text-ink/50">
                  {t.zeit}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
