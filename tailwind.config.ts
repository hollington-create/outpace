import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          darkest: "#0a0f1a",
          dark: "#0F172A",
          secondary: "#1E293B",
          teal: "#0891B2",
          cyan: "#06B6D4",
          "cyan-bright": "#22d3ee",
          emerald: "#34d399",
          "emerald-deep": "#10b981",
          text: "#F8FAFC",
          muted: "#94A3B8",
          border: "#334155",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
