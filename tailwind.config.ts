import type { Config } from "tailwindcss";

/**
 * Design tokens extraídos do panfleto:
 *  - brand → magenta do título "OUTUBRO ROSA" e do laço
 *  - navy  → azul-marinho de "TECNOLOGIA" e dos subtítulos
 *  - circuit → ciano dos nós/linhas de circuito do laço
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#FFF4F9",
          100: "#FFE5F1",
          200: "#FFC9E2",
          300: "#FF9CC8",
          400: "#F2619F",
          500: "#DE2F82",
          600: "#C8135F",
          700: "#A50E4D",
          800: "#860F42",
          900: "#6D0F38",
        },
        navy: {
          50: "#F1F5FB",
          100: "#DEE7F5",
          200: "#BCCFEB",
          300: "#8CAAD9",
          400: "#5B80C2",
          500: "#3A5FA6",
          600: "#274A8A",
          700: "#173A73",
          800: "#0E2D5F",
          900: "#0A2350",
          950: "#061739",
        },
        circuit: {
          300: "#7DE3F4",
          400: "#38D0EC",
          500: "#12B5D6",
        },
        snow: "#F8FAFC",
      },
      fontFamily: {
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2rem, 9.4vw, 4.5rem)", { lineHeight: "1", letterSpacing: "-0.035em" }],
        "display-lg": ["clamp(2.25rem, 5vw, 4rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "stat": ["clamp(5rem, 14vw, 11rem)", { lineHeight: "0.9", letterSpacing: "-0.05em" }],
      },
      boxShadow: {
        glass: "0 1px 0 0 rgb(255 255 255 / 0.8) inset, 0 20px 50px -20px rgb(10 35 80 / 0.18)",
        brand: "0 12px 30px -10px rgb(200 19 95 / 0.55)",
        card: "0 1px 2px rgb(10 35 80 / 0.04), 0 24px 48px -24px rgb(10 35 80 / 0.16)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "node-pulse": {
          "0%, 100%": { opacity: "0.35", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.6)" },
        },
        "dash-flow": {
          to: { strokeDashoffset: "-120" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite",
        "node-pulse": "node-pulse 3.2s ease-in-out infinite",
        "dash-flow": "dash-flow 14s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
