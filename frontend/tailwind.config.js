/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Sora", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["JetBrains Mono", "Cascadia Code", "monospace"],
      },
      colors: {
        gray: {
          950: "#030712",
          900: "#0f172a",
          800: "#1e293b",
        },
      },
      animation: {
        "slide-in": "slide-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "fade-in": "fade-in 0.4s ease-out forwards",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        "slide-in": {
          from: { opacity: 0, transform: "translateX(100%) scale(0.95)" },
          to: { opacity: 1, transform: "translateX(0) scale(1)" },
        },
        "fade-in": {
          from: { opacity: 0, transform: "translateY(12px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(20,184,166,0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(20,184,166,0.4)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      backdropBlur: { xs: "2px" },
      backgroundOpacity: { 3: "0.03", 8: "0.08" },
    },
  },
  plugins: [],
};
