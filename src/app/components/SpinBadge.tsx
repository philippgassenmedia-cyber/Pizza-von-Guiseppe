/** Rotating circular stamp — the small "handmade" seal that sits on the hero. */
export default function SpinBadge({
  text = "SEIT 2018 · HOLZOFEN 450° · BERGSTRASSE · ",
  className = "",
}: {
  text?: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`} aria-hidden>
      <svg viewBox="0 0 200 200" className="h-full w-full animate-spin-slow">
        <defs>
          <path
            id="badge-arc"
            d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0"
            fill="none"
          />
        </defs>
        <circle cx="100" cy="100" r="98" fill="#17160F" />
        <text
          fill="#F1F0EA"
          fontSize="17"
          fontWeight="700"
          letterSpacing="3.4"
          fontFamily="var(--font-archivo), sans-serif"
        >
          <textPath href="#badge-arc" startOffset="0">
            {text.repeat(2)}
          </textPath>
        </text>
      </svg>

      {/* Static centre mark */}
      <span className="absolute inset-0 grid place-items-center">
        <svg width="34%" height="34%" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2 15 9l7 .6-5.3 4.6L18.3 21 12 17.3 5.7 21l1.6-6.8L2 9.6 9 9l3-7Z"
            fill="#F0522A"
          />
        </svg>
      </span>
    </div>
  );
}
