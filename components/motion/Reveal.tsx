"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

/**
 * The single scroll-reveal pattern used across the whole site (fade + 16px
 * rise, triggered once on entering the viewport). Centralizing it here
 * means every section animates identically instead of six components each
 * re-implementing their own variant — and it's the one place reduced-motion
 * needs to be handled.
 *
 * Implementation note: `whileInView` always targets the same real,
 * fully-visible state (`{ opacity: 1, y: 0 }`) regardless of the
 * reduced-motion setting. Framer Motion's `useReducedMotion()` resolves
 * asynchronously relative to first paint — if `whileInView` were swapped to
 * `undefined` once reduced motion is detected (the more "obvious" way to
 * write this), any element whose hidden `initial` state had already been
 * applied before that swap is left permanently uncontrolled at
 * `opacity: 0`, since removing an animate/whileInView target doesn't reset
 * previously-applied values. Reduced motion instead only changes the
 * starting point (skip straight to visible) and collapses the duration to
 * ~0, so the element is always driven toward a defined, visible target.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.6,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
