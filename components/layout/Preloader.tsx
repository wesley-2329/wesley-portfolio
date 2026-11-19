"use client";

import { AnimatePresence, animate, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useApp } from "@/components/providers/AppProviders";
import { ease } from "@/lib/motion";

const NAME = "JOHN WESLEY";

/**
 * Cinematic opening: a counter climbs to 100 while the name assembles,
 * then a two-layer curtain lifts to hand off to the hero.
 * Shortened on repeat visits; skipped for reduced-motion users.
 */
export function Preloader() {
  const { completeIntro, reducedMotion } = useApp();
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (mq) {
      setVisible(false);
      completeIntro();
      return;
    }
    const seen = sessionStorage.getItem("jw-intro") === "1";
    const controls = animate(0, 100, {
      duration: seen ? 0.7 : 1.9,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        sessionStorage.setItem("jw-intro", "1");
        setTimeout(() => {
          setVisible(false);
          // Let the hero start choreographing while the curtain is mid-lift.
          setTimeout(completeIntro, 420);
        }, seen ? 80 : 260);
      },
    });
    return () => controls.stop();
  }, [completeIntro]);

  return (
    <AnimatePresence onExitComplete={completeIntro}>
      {visible && !reducedMotion && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden"
          exit={{ pointerEvents: "none" }}
          transition={{ duration: 1.2 }}
          aria-hidden
        >
          {/* Accent layer lifts a beat later for depth */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-violet/40 via-ink-700 to-ink-800"
            exit={{ y: "-100%" }}
            transition={{ duration: 1.1, delay: 0.12, ease: ease.quart }}
          />
          <motion.div
            className="absolute inset-0 bg-ink"
            exit={{ y: "-100%" }}
            transition={{ duration: 1, ease: ease.quart }}
          >
            <div className="absolute inset-0 bg-grid opacity-40 mask-radial" />
          </motion.div>

          <motion.div
            className="relative z-10 flex items-center justify-between px-6 pt-6 md:px-10 md:pt-8"
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <span className="eyebrow">Portfolio — {new Date().getFullYear()}</span>
            <span className="eyebrow hidden sm:inline">Software · AI/ML · Full-Stack</span>
          </motion.div>

          <motion.div
            className="relative z-10 flex flex-1 items-center justify-center"
            exit={{ opacity: 0, y: -60 }}
            transition={{ duration: 0.6, ease: ease.quart }}
          >
            <p className="flex overflow-hidden text-[clamp(1.75rem,6vw,4.5rem)] font-semibold tracking-[-0.04em]">
              {NAME.split("").map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, delay: 0.1 + i * 0.045, ease: ease.expo }}
                  className="inline-block"
                >
                  {ch === " " ? " " : ch}
                </motion.span>
              ))}
            </p>
          </motion.div>

          <motion.div
            className="relative z-10 px-6 pb-6 md:px-10 md:pb-8"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-end justify-between">
              <span className="eyebrow">Loading experience</span>
              <span className="font-mono text-5xl font-light tabular-nums text-fg md:text-7xl">
                {String(count).padStart(3, "0")}
              </span>
            </div>
            <div className="mt-4 h-px w-full bg-line">
              <div
                className="h-px bg-gradient-to-r from-violet via-cyan to-sand"
                style={{ width: `${count}%` }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
