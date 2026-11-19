"use client";

import { motion } from "framer-motion";
import { Fragment, type ElementType } from "react";
import { cn } from "@/lib/utils";
import { ease } from "@/lib/motion";

type SplitTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  /** Words rendered in the italic serif with the accent gradient. */
  emphasis?: string[];
  /** "inView" animates when scrolled into view; a boolean animates when true. */
  trigger?: "inView" | boolean;
  delay?: number;
  stagger?: number;
  by?: "word" | "char";
  id?: string;
};

const normalise = (w: string) => w.toLowerCase().replace(/[^a-z0-9]/g, "");

/**
 * Masked typographic reveal: every word (or character) rises out of its own
 * clipping box. Screen readers get the full sentence via aria-label.
 */
export function SplitText({
  text,
  as: Tag = "span",
  className,
  emphasis = [],
  trigger = "inView",
  delay = 0,
  stagger = 0.06,
  by = "word",
  id,
}: SplitTextProps) {
  const emph = new Set(emphasis.map(normalise));
  const words = text.split(" ");

  const animateProps =
    trigger === "inView"
      ? { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.5 } }
      : { initial: "hidden", animate: trigger ? "show" : "hidden" };

  const unit = {
    hidden: { y: "110%", rotate: 4 },
    show: { y: "0%", rotate: 0, transition: { duration: 1.05, ease: ease.expo } },
  };

  return (
    <Tag id={id} className={className} aria-label={text}>
      <motion.span
        aria-hidden
        className="inline"
        variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
        {...animateProps}
      >
        {words.map((word, i) => {
          const isEmph = emph.has(normalise(word));
          const pieces = by === "char" ? Array.from(word) : [word];
          return (
            <Fragment key={`${word}-${i}`}>
              <span className="inline-flex overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
                {pieces.map((p, j) => (
                  <motion.span
                    key={j}
                    variants={unit}
                    className={cn(
                      "inline-block origin-bottom-left will-change-transform",
                      isEmph && "font-serif italic font-normal tracking-normal text-gradient pr-[0.06em]"
                    )}
                  >
                    {p}
                  </motion.span>
                ))}
              </span>
              {i < words.length - 1 && " "}
            </Fragment>
          );
        })}
      </motion.span>
    </Tag>
  );
}
