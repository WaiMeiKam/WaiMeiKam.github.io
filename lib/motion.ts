/**
 * Shared motion constants — single source of truth for animation values.
 * All Framer Motion usage should import from here.
 */

export const spring = {
  /** Cards, NavCards — lift + glow */
  card: { type: "spring", stiffness: 380, damping: 28 },
  /** Buttons — scale */
  button: { type: "spring", stiffness: 500, damping: 28 },
  /** List items — ember bar reveal */
  list: { type: "spring", stiffness: 400, damping: 30 },
} as const;

export const ease = {
  enter: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  exit: [0.4, 0, 1, 0.6] as [number, number, number, number],
} as const;

export const duration = {
  fast: 0.15,
  base: 0.2,
  slow: 0.5,
  page: 0.28,
} as const;

/** Scroll reveal — opacity + y fade-in */
export const scrollReveal = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
} as const;

/** Page transition variants */
export const pageTransition = {
  enter: { opacity: 0, y: 12, filter: "blur(4px)" },
  center: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -8, filter: "blur(4px)" },
} as const;
