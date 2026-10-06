import type { Transition, Variants } from "motion/react";

/**
 * Motion conventions for ÉLANE. Keep movement short-travel and slow-settling:
 * it should read as calm and editorial, never playful.
 *
 * CSS equivalents: `ease-editorial` (globals.css) with `duration-500`/`duration-700`
 * for hover states.
 */

/** Matches the CSS --ease-editorial token. */
export const easeEditorial = [0.22, 1, 0.36, 1] as const;

export const duration = {
  /** Hover / state changes. */
  hover: 0.5,
  /** Standard scroll reveal. */
  reveal: 0.8,
  /** Image clip / scale reveals. */
  image: 1.2,
} as const;

/** Stagger between siblings in a reveal group. */
export const stagger = 0.08;

export const revealTransition: Transition = {
  duration: duration.reveal,
  ease: easeEditorial,
};

/** Fade up ~24px. Pass a delay in seconds through the `custom` prop. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { ...revealTransition, delay },
  }),
};

/** Viewport trigger shared by scroll reveals: once, slightly before fully in view. */
export const revealViewport = { once: true, margin: "0px 0px -10% 0px" } as const;
