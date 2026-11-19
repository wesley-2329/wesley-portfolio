"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { ease } from "@/lib/motion";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  amount?: number;
};

/** Fades & lifts content in once it enters the viewport. */
export function Reveal({ delay = 0, y = 28, amount = 0.3, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, delay, ease: ease.expo }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
