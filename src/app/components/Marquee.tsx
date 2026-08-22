type Props = {
  /** Words placed between the arrow discs */
  words?: string[];
  tone?: "basil" | "flame" | "ink";
  reverse?: boolean;
};

function ArrowDisc({ className }: { className: string }) {
  return (
    <span
      className={`grid h-9 w-9 flex-none place-items-center rounded-full ${className}`}
      aria-hidden
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M1 7h11M7.5 2.5 12 7l-4.5 4.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function Marquee({
  words = ["Originale Italia", "Forno a Legna", "Bergstraße"],
  tone = "basil",
  reverse = false,
}: Props) {
  const bg =
    tone === "basil" ? "bg-basil" : tone === "flame" ? "bg-flame" : "bg-ink";
  const disc =
    tone === "basil"
      ? "bg-flame text-white"
      : tone === "flame"
        ? "bg-ink text-white"
        : "bg-flame text-white";

  // One "run" of the track — duplicated once so the loop is seamless at -50%
  const run = (key: string) => (
    <div key={key} className="flex flex-none items-center">
      {Array.from({ length: 4 }).flatMap((_, r) =>
        words.map((w) => (
          <span
            key={`${key}-${r}-${w}`}
            className="flex flex-none items-center gap-6 pr-6"
          >
            <span className="display whitespace-nowrap text-[clamp(1.6rem,3.6vw,2.9rem)] text-white">
              {w}
            </span>
            <ArrowDisc className={disc} />
          </span>
        ))
      )}
    </div>
  );

  return (
    <div className={`${bg} overflow-hidden py-4`}>
      <div
        className={`flex w-max ${reverse ? "animate-marquee-r" : "animate-marquee-l"}`}
      >
        {run("a")}
        {run("b")}
      </div>
    </div>
  );
}
