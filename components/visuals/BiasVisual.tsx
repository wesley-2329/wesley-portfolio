"use client";

import { motion } from "framer-motion";

/**
 * Illustration for the media-bias research: the word "news" in several
 * Indian languages drifting toward a balanced centre, over a framing spectrum.
 */
const words = [
  { t: "समाचार", lang: "Hindi", x: "12%", y: "20%" },
  { t: "செய்தி", lang: "Tamil", x: "64%", y: "14%" },
  { t: "সংবাদ", lang: "Bengali", x: "72%", y: "48%" },
  { t: "వార్త", lang: "Telugu", x: "8%", y: "54%" },
  { t: "ಸುದ್ದಿ", lang: "Kannada", x: "38%", y: "34%" },
  { t: "വാർത്ത", lang: "Malayalam", x: "44%", y: "62%" },
];

export function BiasVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[radial-gradient(110%_90%_at_50%_0%,#1a1726,#050507)]">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-30 mask-radial" />

      {words.map((w, i) => (
        <motion.span
          key={w.t}
          className="absolute select-none text-[clamp(1.25rem,2.6vw,2.25rem)] font-medium text-fg/80"
          style={{ left: w.x, top: w.y }}
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            className="block"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
          >
            {w.t}
          </motion.span>
          <span className="mt-1 block font-mono text-[0.55rem] uppercase tracking-[0.2em] text-fg-dim">{w.lang}</span>
        </motion.span>
      ))}

      {/* Framing spectrum with a marker settling toward balance */}
      <div className="absolute inset-x-6 bottom-12 md:inset-x-10">
        <div className="mb-3 flex justify-between font-mono text-[0.6rem] uppercase tracking-[0.2em] text-fg-dim">
          <span>Skewed</span>
          <span className="text-fg-muted">Balanced</span>
          <span>Skewed</span>
        </div>
        <div className="relative h-[3px] rounded-full bg-gradient-to-r from-[#ff8a7a]/70 via-signal/80 to-[#ff8a7a]/70">
          <motion.span
            className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink bg-fg shadow-[0_0_20px_rgba(255,255,255,0.6)]"
            animate={{ left: ["14%", "78%", "38%", "60%", "50%", "50%", "14%"] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", times: [0, 0.2, 0.4, 0.55, 0.7, 0.9, 1] }}
          />
        </div>
        <div className="mt-4 flex justify-center gap-6 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-fg-muted">
          <span>Detect</span>
          <span className="text-fg-dim">→</span>
          <span>Analyse</span>
          <span className="text-fg-dim">→</span>
          <span>Mitigate</span>
        </div>
      </div>
      <p className="absolute right-5 top-5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-fg-dim">Illustration</p>
    </div>
  );
}
