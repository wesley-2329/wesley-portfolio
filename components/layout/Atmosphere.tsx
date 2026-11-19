"use client";

import { useEffect, useRef } from "react";

/**
 * Page-wide atmosphere: film grain plus a soft light that trails the cursor.
 * The light is driven by CSS variables written in rAF — no React re-renders.
 */
export function Atmosphere() {
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    let tx = window.innerWidth / 2,
      ty = window.innerHeight / 2,
      x = tx,
      y = ty,
      raf = 0;
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (glow.current) glow.current.style.opacity = "1";
    };
    const tick = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      glow.current?.style.setProperty("transform", `translate3d(${x - 300}px, ${y - 300}px, 0)`);
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      <div
        ref={glow}
        className="absolute left-0 top-0 h-[600px] w-[600px] rounded-full opacity-0 mix-blend-screen transition-opacity duration-700"
        style={{
          background: "radial-gradient(circle, rgba(142,123,255,0.10) 0%, rgba(79,209,232,0.05) 35%, transparent 65%)",
        }}
      />
      <div className="grain" />
    </div>
  );
}
