"use client";

import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/** Surface with a cursor-tracked rim light and soft inner glow. */
export function SpotlightCard({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  return (
    <div onPointerMove={onMove} className={cn("spotlight-card surface", className)} {...rest}>
      {children}
    </div>
  );
}
