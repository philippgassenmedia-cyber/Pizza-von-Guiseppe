import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-anton)", "Impact", "sans-serif"],
        sans: ["var(--font-archivo)", "system-ui", "sans-serif"],
        script: ["var(--font-caveat)", "cursive"],
      },
      colors: {
        // warm off-white page ground
        cream: "#F1F0EA",
        paper: "#FAFAF7",
        // near-black with a warm cast
        ink: "#17160F",
        ink2: "#22211A",
        // primary accent
        flame: {
          DEFAULT: "#F0522A",
          light: "#FF6E42",
          dark: "#D33F1B",
        },
        // italian green
        basil: {
          DEFAULT: "#0F6B3C",
          light: "#178B4F",
          dark: "#0A4D2B",
        },
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      animation: {
        "marquee-l": "marquee-l 34s linear infinite",
        "marquee-r": "marquee-r 34s linear infinite",
        "spin-slow": "spin 16s linear infinite",
        float: "float 7s ease-in-out infinite",
      },
      keyframes: {
        "marquee-l": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-r": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0) rotate(var(--tw-rotate,0deg))" },
          "50%": { transform: "translateY(-16px) rotate(var(--tw-rotate,0deg))" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
