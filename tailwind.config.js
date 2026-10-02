/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geist", "Segoe UI", "system-ui", "sans-serif"],
        mono: ["Geist Mono", "ui-monospace", "monospace"],
      },
      colors: {
        canvas: "#F5F6F8",
        ink: "#16202A",
        muted: "#5F6B7A",
        line: "#E3E7EC",
        brand: {
          50: "#E6F4F1",
          100: "#C8E6E0",
          600: "#0F766E",
          700: "#0B5F58",
        },
        risk: {
          high: "#B42318",
          highbg: "#FDECEA",
          mid: "#A15C07",
          midbg: "#FEF3DC",
          low: "#1B7A43",
          lowbg: "#E4F4EA",
        },
      },
    },
  },
  plugins: [],
};
