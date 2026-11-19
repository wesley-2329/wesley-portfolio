import type { Config } from "tailwindcss";

/**
 * Design system — "Obsidian Signal"
 * Near-black surfaces, quiet greys, and a restrained aurora accent
 * (violet → cyan) warmed by a sandstone tone taken from the hero photograph.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", md: "2rem", lg: "3rem" },
      screens: { "2xl": "1360px" },
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: "#050507",
          900: "#09090C",
          800: "#0F0F13",
          700: "#16161C",
          600: "#1F1F27",
        },
        fg: {
          DEFAULT: "#EDEDEF",
          muted: "#A1A1AA",
          dim: "#63636E",
        },
        line: {
          DEFAULT: "rgba(255,255,255,0.08)",
          strong: "rgba(255,255,255,0.14)",
        },
        violet: { DEFAULT: "#8E7BFF", soft: "#B5A8FF" },
        cyan: { DEFAULT: "#4FD1E8", soft: "#9BE7F4" },
        sand: { DEFAULT: "#E9C9A1" },
        signal: { DEFAULT: "#5BE49B" },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3.75rem, 14.5vw, 15.5rem)", { lineHeight: "0.82", letterSpacing: "-0.055em" }],
        display: ["clamp(2.75rem, 7vw, 6.5rem)", { lineHeight: "0.95", letterSpacing: "-0.04em" }],
        "heading-lg": ["clamp(2.25rem, 4.6vw, 4.25rem)", { lineHeight: "1.02", letterSpacing: "-0.035em" }],
        heading: ["clamp(1.75rem, 3vw, 2.75rem)", { lineHeight: "1.08", letterSpacing: "-0.03em" }],
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-quart": "cubic-bezier(0.76, 0, 0.24, 1)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translate3d(0,0,0)" },
          to: { transform: "translate3d(-50%,0,0)" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "33%": { transform: "translate3d(6%,-4%,0) scale(1.08)" },
          "66%": { transform: "translate3d(-5%,5%,0) scale(0.96)" },
        },
        pulseRing: {
          "0%": { transform: "scale(1)", opacity: "0.7" },
          "100%": { transform: "scale(2.6)", opacity: "0" },
        },
        scrollCue: {
          "0%": { transform: "translateY(-100%)" },
          "60%, 100%": { transform: "translateY(220%)" },
        },
        shimmer: {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        dash: {
          to: { strokeDashoffset: "0" },
        },
      },
      animation: {
        marquee: "marquee var(--marquee-duration, 40s) linear infinite",
        drift: "drift 22s ease-in-out infinite",
        "drift-slow": "drift 34s ease-in-out infinite reverse",
        "pulse-ring": "pulseRing 2.2s cubic-bezier(0.16,1,0.3,1) infinite",
        "scroll-cue": "scrollCue 2.4s cubic-bezier(0.76,0,0.24,1) infinite",
        shimmer: "shimmer 8s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
