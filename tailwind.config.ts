import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#F7F6F2",
        charcoal: "#171717",
        taupe: "#B6A18B",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        arabic: ["var(--font-plex)", "sans-serif"],
      },
      letterSpacing: { widest2: "0.35em" },
    },
  },
  plugins: [],
};
export default config;
