"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cx, type ClassValue } from "@/lib/utils/cx";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: ClassValue;
  /** Trigger threshold: 0 = any pixel visible, 1 = fully visible */
  threshold?: number;
  /** Delay before the reveal animation starts (seconds) */
  delay?: number;
  /** Which direction to reveal from */
  direction?: "up" | "down" | "left" | "right" | "none";
  /** Trigger once or every time it enters the viewport */
  once?: boolean;
};

function getVariants(direction: ScrollRevealProps["direction"], distance = 24): Variants {
  const offsets: Record<string, { x?: number; y?: number }> = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };
  const offset = offsets[direction ?? "up"];

  return {
    hidden: { opacity: 0, ...offset },
    visible: { opacity: 1, x: 0, y: 0 },
  };
}

export function ScrollReveal({
  children,
  className,
  threshold = 0.15,
  delay = 0,
  direction = "up",
  once = true,
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();
  const variants = React.useMemo(() => getVariants(direction), [direction]);

  if (reduceMotion) {
    return <div className={cx(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cx(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
