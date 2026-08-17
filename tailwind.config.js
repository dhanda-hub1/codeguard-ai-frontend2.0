/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0B0E14",
        panel: "#10141D",
        border: "#1E2430",
        risk: {
          safe: "#34D399",
          warn: "#F5A623",
          high: "#F0553F",
          critical: "#8C1F2B",
        },
        accent: {
          indigo: "#6C7BFF",
          violet: "#A970FF",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
