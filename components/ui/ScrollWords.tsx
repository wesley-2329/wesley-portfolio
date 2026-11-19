"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const normalise = (w: string) => w.toLowerCase().replace(/[^a-z0-9]/g, "");

/** A paragraph whose words light up one by one as it scrolls through view. */
export function ScrollWords({
  text,
  emphasis = [],
  className,
}: {
  text: string;
  emphasis?: string[];
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  const emph = new Set(emphasis.map(normalise));

  return (
    <p ref={ref} className={cn("flex flex-wrap", className)} aria-label={text}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]} emphasised={emph.has(normalise(word))}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  emphasised,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  emphasised: boolean;
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <span aria-hidden className="relative mr-[0.25em] mt-[0.1em]">
      <motion.span
        style={{ opacity }}
        className={cn(emphasised && "font-serif italic font-normal tracking-normal text-gradient pr-[0.04em]")}
      >
        {children}
      </motion.span>
    </span>
  );
}
