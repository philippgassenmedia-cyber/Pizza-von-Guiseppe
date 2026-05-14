"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";

// ── swap for real transparent PNG when available ──
const SLICE_SRC =
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&q=90";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function eio(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function prog(raw: number, s: number, e: number) {
  return eio(Math.max(0, Math.min(1, (raw - s) / (e - s))));
}

// ── Scroll phases (fraction 0–1 of total scroll height) ──
// P1: 3 slices fan → spread apart
// P2: sides fly away, centre slice grows and morphs into Teig image
// P3: Teig text fades in on the right
// Dwell: nothing moves — user reads
const PH = { p1e: 0.38, p2e: 0.65, p3e: 0.86 };

const INGREDIENTS = [
  { name: "Tipo 00 Mehl",      origin: "Mulino Caputo, Neapel" },
  { name: "San Marzano D.O.P.", origin: "Kampanien" },
  { name: "Fior di Latte",      origin: "Agerola, Kampanien" },
  { name: "Naturhefe",          origin: "Eigenherstellung" },
];

export default function HeroMorph() {
  const outerRef  = useRef<HTMLDivElement>(null);
  const outerDivs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const clipDivs  = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const titleRef  = useRef<HTMLDivElement>(null);
  const ctaRef    = useRef<HTMLDivElement>(null);
  const teigRef   = useRef<HTMLDivElement>(null);

  const update = useCallback(() => {
    const outer = outerRef.current;
    if (!outer) return;

    const vh  = window.innerHeight;
    const vw  = window.innerWidth;
    const raw = Math.max(
      0,
      Math.min(1, (window.scrollY - outer.offsetTop) / (outer.offsetHeight - vh))
    );

    const p1 = prog(raw, 0,       PH.p1e);
    const p2 = prog(raw, PH.p1e,  PH.p2e);
    const p3 = prog(raw, PH.p2e,  PH.p3e);

    // responsive unit — 1% of clamped vw
    const u = Math.min(vw, 1400) / 100;

    // actual rendered slice size (mirrors CSS clamp)
    const sliceSize = Math.min(Math.max(130, 0.22 * vw), 280);
    const H   = sliceSize / 2;            // distance centre→tip
    const OFF = H * 0.18;                 // pizza-centre sits slightly below stage-centre
    const θ   = 52 * (Math.PI / 180);

    // ── Phase 1: START positions (tips meet at pizza centre) ──
    const S = [
      { tx:  H * Math.sin(θ), ty: OFF - H * Math.cos(θ), r: -52 },  // left
      { tx:  0,                ty: OFF - H,               r:   0 },  // centre
      { tx: -H * Math.sin(θ), ty: OFF - H * Math.cos(θ), r:  52 },  // right
    ];

    // ── Phase 1: END positions (spread apart) ──
    const E1 = [
      { tx: -19 * u, ty:  9 * u, r: -70 },
      { tx:   0,     ty: 16 * u, r:   2 },
      { tx:  19 * u, ty:  9 * u, r:  70 },
    ];

    // ── Phase 2: side slices continue flying off-screen ──
    const E2side = [
      { tx: -36 * u, ty: 22 * u, r: -92 },  // left
      { tx:  36 * u, ty: 22 * u, r:  92 },  // right
    ];

    // ── Phase 2: centre slice becomes Teig image ──
    const centScale = vh / sliceSize;   // scale to fill viewport height
    const centTx    = -vw * 0.25;       // centre of the left column
    const centTy    = 0;                // vertical centre of stage
    const centR     = 0;

    // ── Update each slice ──
    outerDivs.current.forEach((el, i) => {
      if (!el) return;
      const clip = clipDivs.current[i];

      if (i === 1) {
        // ── CENTRE SLICE ──
        const bTx = lerp(S[1].tx, E1[1].tx, p1);
        const bTy = lerp(S[1].ty, E1[1].ty, p1);
        const bR  = lerp(S[1].r,  E1[1].r,  p1);

        const tx    = p2 > 0 ? lerp(E1[1].tx, centTx,    p2) : bTx;
        const ty    = p2 > 0 ? lerp(E1[1].ty, centTy,    p2) : bTy;
        const r     = p2 > 0 ? lerp(E1[1].r,  centR,     p2) : bR;
        const scale = p2 > 0 ? lerp(1,         centScale, p2) : 1;

        el.style.transform = `translate(${tx}px,${ty}px) scale(${scale}) rotate(${r}deg)`;

        // clip-path morphs: pizza-triangle → full rectangle
        // Both encoded as 4-point polygon so JS can lerp each vertex
        if (clip) {
          const t  = p2;
          // vertex 0: tip-bottom-left  (50%,100%) → (0%,100%)
          // vertex 1: tip-top-left     (50%,100%) → (0%,0%)
          // vertex 2: crust-top-right  (2%,2%)    → (100%,0%)
          // vertex 3: crust-btm-right  (98%,2%)   → (100%,100%)
          const v = [
            [lerp(50, 0,   t), lerp(100, 100, t)],
            [lerp(50, 0,   t), lerp(100, 0,   t)],
            [lerp( 2, 100, t), lerp(  2, 0,   t)],
            [lerp(98, 100, t), lerp(  2, 100, t)],
          ];
          clip.style.clipPath = `polygon(${v.map(([x, y]) => `${x.toFixed(1)}% ${y.toFixed(1)}%`).join(",")})`;
        }
      } else {
        // ── SIDE SLICES ──
        const si  = i === 0 ? 0 : 1;
        const bTx = lerp(S[i].tx, E1[i].tx, p1);
        const bTy = lerp(S[i].ty, E1[i].ty, p1);
        const bR  = lerp(S[i].r,  E1[i].r,  p1);

        const tx = p2 > 0 ? lerp(E1[i].tx, E2side[si].tx, p2) : bTx;
        const ty = p2 > 0 ? lerp(E1[i].ty, E2side[si].ty, p2) : bTy;
        const r  = p2 > 0 ? lerp(E1[i].r,  E2side[si].r,  p2) : bR;

        el.style.transform = `translate(${tx}px,${ty}px) rotate(${r}deg)`;
        el.style.opacity   = String(lerp(1, 0, p2));
      }
    });

    // title & CTAs fade out during phase 2
    if (titleRef.current) {
      titleRef.current.style.opacity   = String(lerp(1, 0, p2));
      titleRef.current.style.transform = `translateY(${lerp(0, -18, p2)}px)`;
    }
    if (ctaRef.current) {
      ctaRef.current.style.opacity = String(lerp(1, 0, p2));
    }

    // Teig text fades in during phase 3
    if (teigRef.current) {
      teigRef.current.style.opacity      = String(p3);
      teigRef.current.style.transform    = `translateY(${lerp(28, 0, p3)}px)`;
      teigRef.current.style.pointerEvents = p3 > 0.5 ? "auto" : "none";
    }
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
  }, [update]);

  // SSR-safe initial transforms (approx. for 1280px desktop)
  const H0  = 140;
  const OFF0 = H0 * 0.18;
  const θ0  = 52 * (Math.PI / 180);
  const initT = [
    `translate(${+(H0 * Math.sin(θ0)).toFixed(1)}px,${+(OFF0 - H0 * Math.cos(θ0)).toFixed(1)}px) rotate(-52deg)`,
    `translate(0px,${+(OFF0 - H0).toFixed(1)}px) rotate(0deg)`,
    `translate(${+(-H0 * Math.sin(θ0)).toFixed(1)}px,${+(OFF0 - H0 * Math.cos(θ0)).toFixed(1)}px) rotate(52deg)`,
  ];

  return (
    // 400vh outer gives enough scroll-room for all phases + dwell
    <div ref={outerRef} style={{ height: "400vh" }}>
      <div className="sticky top-0 h-screen bg-cream overflow-hidden flex flex-col">

        {/* ── Title ── */}
        <div ref={titleRef} className="flex justify-center pt-28 pb-2 relative z-10">
          <h1
            className="font-sans font-black uppercase text-dark text-center leading-none"
            style={{ fontSize: "clamp(1.9rem, 7vw, 6.5rem)", letterSpacing: "-0.025em" }}
          >
            Pizza Napoletano
          </h1>
        </div>

        {/* ── Slice stage ── */}
        <div className="flex-1 relative flex items-center justify-center">

          {/* Pizza slices */}
          {([0, 1, 2] as const).map((i) => (
            <div
              key={i}
              ref={(el) => { outerDivs.current[i] = el; }}
              className="absolute"
              style={{
                width:       "clamp(130px, 22vw, 280px)",
                height:      "clamp(130px, 22vw, 280px)",
                transform:   initT[i],
                willChange:  "transform, opacity",
                zIndex:      i === 1 ? 10 : 5,
              }}
            >
              {/* drop-shadow wraps clipped content so shadow follows the shape */}
              <div
                className="w-full h-full"
                style={{ filter: "drop-shadow(0 10px 32px rgba(26,14,8,0.30))" }}
              >
                <div
                  ref={(el) => { clipDivs.current[i] = el; }}
                  className="w-full h-full relative overflow-hidden"
                  // 4-point triangle (duplicate tip so vertex count matches rectangle)
                  style={{ clipPath: "polygon(50% 100%,50% 100%,2% 2%,98% 2%)" }}
                >
                  <Image
                    src={SLICE_SRC}
                    alt={`Pizza slice ${i + 1}`}
                    fill
                    className="object-cover"
                    priority={i === 1}
                    sizes="(max-width: 640px) 130px, 280px"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* ── Teig text (right column) — fades in during phase 3 ── */}
          <div
            ref={teigRef}
            className="absolute right-0 top-0 h-full w-1/2 flex items-center
                       pl-[7%] pr-[5%] bg-cream"
            style={{ opacity: 0, pointerEvents: "none", zIndex: 20 }}
          >
            <div className="max-w-[360px]">
              <p className="text-[11px] tracking-[0.5em] uppercase text-amber mb-8">
                Der Teig
              </p>
              <h2
                className="font-serif italic text-dark leading-[0.92] mb-10"
                style={{ fontSize: "clamp(1.8rem, 2.8vw, 3rem)" }}
              >
                Handgemacht.<br />Ehrlich.<br />Original Napoletano.
              </h2>
              <p className="text-dark/50 text-sm leading-[1.95] mb-10">
                72 Stunden Naturreife, Tipo&nbsp;00 Mehl aus Neapel, natürliche
                Hefe aus eigener Herstellung — kein Kompromiss, kein Zusatz.
              </p>
              <div className="border-t border-dark/10">
                {INGREDIENTS.map(({ name, origin }) => (
                  <div
                    key={name}
                    className="flex items-center justify-between
                               border-b border-dark/8 py-[14px]"
                  >
                    <span className="text-sm text-dark/80 font-medium">{name}</span>
                    <span className="text-[11px] tracking-[0.1em] text-dark/30">
                      {origin}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* ── CTAs ── */}
        <div
          ref={ctaRef}
          className="pb-10 flex flex-col items-center gap-5 relative z-10"
        >
          <p className="text-[10px] tracking-[0.5em] text-dark/30 uppercase text-center px-4">
            Holzofen · Privatfeiern · Stadtfeste · Bergstraße
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#veranstaltungen"
              className="bg-dark text-cream text-[11px] tracking-[0.3em] uppercase
                         px-8 py-4 text-center hover:bg-it-red transition-colors duration-300"
            >
              Veranstaltungen
            </a>
            <a
              href="#speisekarte"
              className="border border-dark/20 text-dark text-[11px] tracking-[0.3em]
                         uppercase px-8 py-4 text-center hover:bg-dark hover:text-cream
                         transition-colors duration-300"
            >
              Speisekarte
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
