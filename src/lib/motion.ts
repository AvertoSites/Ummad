import type { Variants } from "framer-motion";

/**
 * Shared entrance animations. `MotionConfig reducedMotion="user"` (mounted in
 * providers) already strips the transform for motion-sensitive visitors, so
 * these stay simple.
 */

/** Fade + rise. Pass a `custom={i}` index for a stagger. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" },
  }),
};

/** Slightly larger rise for page-header text. */
export const headerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: "easeOut" },
  }),
};

/** Standard in-view trigger config for scroll-revealed blocks. */
export const inViewOnce = { once: true, margin: "-60px" } as const;
