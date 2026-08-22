import Reveal from "./Reveal";

/* Alle Pizzen 8 € — einzige Ausnahme: Peperoni 9 €. */
const PIZZE = [
  { name: "Margherita", desc: "Tomate · Mozzarella · Basilikum", price: "8" },
  { name: "Marinara", desc: "Tomate · Knoblauch · Oregano", price: "8" },
  { name: "Funghi", desc: "Tomate · Mozzarella · Champignons", price: "8" },
  { name: "Prosciutto", desc: "Tomate · Mozzarella · Schinken", price: "8" },
  { name: "Calabrese", desc: "Tomate · Mozzarella · Nduja", price: "8" },
  { name: "Peperoni", desc: "Tomate · Mozzarella · Salami", price: "9" },
];

export default function MenuSection() {
  return (
    <section id="karte" className="bg-cream px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="text-center">
          <p className="eyebrow mb-5 text-flame">La Carta</p>
          <h2 className="display text-[clamp(2.6rem,9vw,7rem)] text-ink">
            Jede Pizza <span className="text-flame">8 €</span>
          </h2>
          <p className="mt-5 text-[15px] text-ink/50">
            Nur die Peperoni kostet 9 €. Das war&apos;s an Kleingedrucktem.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-16">
          <ul className="mx-auto max-w-3xl divide-y divide-ink/10 border-y border-ink/10">
            {PIZZE.map((p) => (
              <li
                key={p.name}
                className="group flex items-baseline justify-between gap-6 py-6"
              >
                <div>
                  <h3 className="display text-[clamp(1.4rem,3vw,2rem)] text-ink transition-colors group-hover:text-flame">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-[13px] text-ink/45">{p.desc}</p>
                </div>
                <span className="display flex-none text-[clamp(1.4rem,3vw,2rem)] text-flame">
                  €{p.price}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
