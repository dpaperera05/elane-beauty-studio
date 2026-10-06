"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { fadeUp, revealViewport } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  /** Seconds to wait once in view — use small steps (0.08–0.16) to stagger siblings. */
  delay?: number;
  className?: string;
};

/** Fades content up into place the first time it scrolls into view. */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
    >
      {children}
    </motion.div>
  );
}
