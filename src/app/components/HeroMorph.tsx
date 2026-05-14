"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";

// ── swap this src once the real slice PNG is uploaded ──
const SLICE_SRC =
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=90";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// ease-in-out cubic for a natural feel
function ease(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function HeroMorph() {
  const outerRef = useRef<HTMLDivElement>(null);
  // stable mutable ref — no state, direct DOM writes for 60fps
  const sliceRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);

  const updateSlices = useCallback(() => {
    const outer = outerRef.current;
    if (!outer) return;

    const vh = window.innerHeight;
    const raw = Math.max(
      0,
      Math.min(1, (window.scrollY - outer.offsetTop) / (outer.offsetHeight - vh))
    );
    const t = ease(raw);

    // 1 unit = 1% of viewport width (capped so huge screens don't explode)
    const u = Math.min(window.innerWidth, 1400) / 100;

    // ── START: tips meeting at pizza centre (maths: tx = H·sin θ, ty = –H·cos θ + offset)
    // H = half-height of slice = 11u,  offset = 1.5u downward from stage centre
    // Left θ=-52°, Centre θ=0°, Right θ=52°
    const S = [
      { tx: -8.7 * u, ty: -4.5 * u, r: -52 },
      { tx: 0,         ty: -9.5 * u, r: 0   },
      { tx:  8.7 * u, ty: -4.5 * u, r:  52 },
    ];

    // ── END: slices spread apart ──
    const E = [
      { tx: -19 * u, ty:  9 * u, r: -70 },
      { tx:   0,     ty: 16 * u, r:   2 },
      { tx:  19 * u, ty:  9 * u, r:  70 },
    ];

    sliceRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.transform = `translate(${lerp(S[i].tx, E[i].tx, t)}px, ${lerp(S[i].ty, E[i].ty, t)}px) rotate(${lerp(S[i].r, E[i].r, t)}deg)`;
    });
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(updateSlices); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateSlices);
    updateSlices();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateSlices);
      cancelAnimationFrame(raf);
    };
  }, [updateSlices]);

  // SSR-safe initial transforms (approximated for ~1280px viewport)
  const initTransforms = [
    "translate(-111px, -58px) rotate(-52deg)",
    "translate(0px, -122px) rotate(0deg)",
    "translate(111px, -58px) rotate(52deg)",
  ];

  return (
    // tall outer div — gives scroll room for the morph animation
    <div ref={outerRef} style={{ height: "240vh" }}>
      <div className="sticky top-0 h-screen bg-cream overflow-hidden flex flex-col">

        {/* ── Title ── */}
        <div className="flex justify-center pt-28 pb-2 relative z-10">
          <h1
            className="font-sans font-black uppercase text-dark text-center leading-none"
            style={{ fontSize: "clamp(1.9rem, 7vw, 6.5rem)", letterSpacing: "-0.025em" }}
          >
            Pizza Napoletano
          </h1>
        </div>

        {/* ── Slice stage ── */}
        <div className="flex-1 relative flex items-center justify-center">
          {([0, 1, 2] as const).map((i) => (
            <div
              key={i}
              ref={(el) => { sliceRefs.current[i] = el; }}
              className="absolute"
              style={{
                width:  "clamp(130px, 22vw, 280px)",
                height: "clamp(130px, 22vw, 280px)",
                transform: initTransforms[i],
                willChange: "transform",
              }}
            >
              {/* outer div carries drop-shadow so it hugs the clipped shape */}
              <div
                className="w-full h-full"
                style={{ filter: "drop-shadow(0 10px 28px rgba(26,14,8,0.28))" }}
              >
                <div
                  className="w-full h-full relative overflow-hidden"
                  style={{ clipPath: "polygon(50% 100%, 2% 2%, 98% 2%)" }}
                >
                  <Image
                    src={SLICE_SRC}
                    alt={`Pizza slice ${i + 1}`}
                    fill
                    className="object-cover"
                    priority={i === 1}
                    sizes="280px"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA area ── */}
        <div className="pb-10 flex flex-col items-center gap-5 relative z-10">
          <p className="text-[10px] tracking-[0.5em] text-dark/30 uppercase text-center px-4">
            Holzofen · Privatfeiern · Stadtfeste · Bergstraße
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#veranstaltungen"
              className="bg-dark text-cream text-[11px] tracking-[0.3em] uppercase px-8 py-4 text-center hover:bg-it-red transition-colors duration-300"
            >
              Veranstaltungen
            </a>
            <a
              href="#speisekarte"
              className="border border-dark/20 text-dark text-[11px] tracking-[0.3em] uppercase px-8 py-4 text-center hover:bg-dark hover:text-cream transition-colors duration-300"
            >
              Speisekarte
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
