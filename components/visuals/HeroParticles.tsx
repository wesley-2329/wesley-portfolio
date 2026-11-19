"use client";

import { useEffect, useRef } from "react";

/**
 * Sparse, slow "dust in a light beam" particles. Capped count, DPR-limited,
 * paused while off-screen, disabled for reduced motion.
 */
export function HeroParticles({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0,
      h = 0,
      raf = 0,
      running = true;
    const mouse = { x: -9999, y: -9999 };
    const count = window.innerWidth < 768 ? 34 : 70;
    const palette = ["181,168,255", "155,231,244", "233,201,161", "237,237,239"];
    const pts = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00012,
      vy: -Math.random() * 0.00022 - 0.00004,
      r: Math.random() * 1.3 + 0.3,
      a: Math.random() * 0.5 + 0.15,
      c: palette[Math.floor(Math.random() * palette.length)],
      ox: 0,
      oy: 0,
    }));

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const tick = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -0.02) p.y = 1.02;
        if (p.x < -0.02) p.x = 1.02;
        if (p.x > 1.02) p.x = -0.02;
        const px = p.x * w,
          py = p.y * h;
        const dx = px - mouse.x,
          dy = py - mouse.y;
        const d2 = dx * dx + dy * dy;
        const push = d2 < 22000 ? (1 - d2 / 22000) * 18 : 0;
        const len = Math.sqrt(d2) || 1;
        p.ox += ((dx / len) * push - p.ox) * 0.08;
        p.oy += ((dy / len) * push - p.oy) * 0.08;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.c},${p.a})`;
        ctx.arc(px + p.ox, py + p.oy, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const io = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (running) raf = requestAnimationFrame(tick);
    });
    io.observe(canvas);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
