"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { site } from "@/data";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useApp } from "@/components/providers/AppProviders";

/**
 * Arched portrait — the shape echoes the carved sandstone window in the photograph.
 * Reveals with a rising clip-path, then tilts subtly with the cursor.
 * Falls back to a designed placeholder when no photo is configured.
 */
export function HeroPortrait({ show, className }: { show: boolean; className?: string }) {
  const { reducedMotion } = useApp();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 18 });
  const ix = useSpring(useTransform(mx, [-0.5, 0.5], [12, -12]), { stiffness: 120, damping: 20 });
  const iy = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 20 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  const { photo } = site;

  return (
    <div className={cn("relative [perspective:1200px]", className)} onPointerMove={onMove} onPointerLeave={reset}>
      {/* Halo behind the portrait */}
      <motion.div
        aria-hidden
        className="absolute -inset-[18%] rounded-full bg-[radial-gradient(closest-side,rgba(142,123,255,0.35),rgba(79,209,232,0.12)_55%,transparent)] blur-2xl"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={show ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 2, delay: 0.5, ease: ease.expo }}
      />

      <motion.div style={{ rotateX: rx, rotateY: ry }} className="relative [transform-style:preserve-3d]">
        <motion.div
          className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[999px] rounded-b-[2rem] border border-white/10 bg-ink-700 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.04)]"
          initial={{ clipPath: "inset(100% 0% 0% 0% round 999px 999px 32px 32px)" }}
          animate={show ? { clipPath: "inset(0% 0% 0% 0% round 999px 999px 32px 32px)" } : {}}
          transition={{ duration: reducedMotion ? 0 : 1.6, delay: reducedMotion ? 0 : 0.25, ease: ease.quart }}
        >
          {photo.src ? (
            <motion.div
              className="absolute -inset-6"
              style={{ x: ix, y: iy }}
              initial={{ scale: 1.35 }}
              animate={show ? { scale: 1 } : {}}
              transition={{ duration: 2.2, delay: 0.25, ease: ease.expo }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                priority
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 80vw"
                className="object-cover object-[52%_62%]"
              />
            </motion.div>
          ) : (
            <PortraitPlaceholder />
          )}
          {/* Cinematic grade: vignette + bottom fade + faint accent wash */}
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/10" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-violet/10 via-transparent to-cyan/10 mix-blend-overlay" />
          <div aria-hidden className="absolute inset-0 shadow-[inset_0_0_80px_rgba(5,5,7,0.65)]" />
        </motion.div>

        {/* Floating caption chips (z-lifted for depth) */}
        <motion.div
          className="absolute -left-4 top-[18%] hidden [transform:translateZ(60px)] sm:block md:-left-10"
          initial={{ opacity: 0, x: -20 }}
          animate={show ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 1.5, ease: ease.expo }}
        >
          <span className="chip border-white/10 bg-ink/70 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-violet" /> AI / ML
          </span>
        </motion.div>
        <motion.div
          className="absolute -right-3 top-[46%] hidden [transform:translateZ(80px)] sm:block md:-right-8"
          initial={{ opacity: 0, x: 20 }}
          animate={show ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 1.65, ease: ease.expo }}
        >
          <span className="chip border-white/10 bg-ink/70 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" /> Full-Stack
          </span>
        </motion.div>
        <motion.div
          className="absolute bottom-5 left-5 right-5 flex items-end justify-between [transform:translateZ(40px)]"
          initial={{ opacity: 0, y: 10 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.8, ease: ease.expo }}
        >
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-fg/70">ABV-IIITM · ’27</span>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-fg/70">Fig. 01</span>
        </motion.div>
      </motion.div>
    </div>
  );
}

function PortraitPlaceholder() {
  return (
    <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(120%_80%_at_50%_0%,#1f1f27,#0a0a0d)]">
      <div className="absolute inset-0 bg-grid opacity-50 mask-radial" />
      <div className="relative flex flex-col items-center gap-4 text-center">
        <span className="font-serif text-7xl italic text-gradient">JW</span>
        <span className="eyebrow">Portrait coming soon</span>
      </div>
    </div>
  );
}
