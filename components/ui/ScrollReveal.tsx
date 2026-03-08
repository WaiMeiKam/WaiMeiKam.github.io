"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

import { scrollReveal, duration, ease } from "@/lib/motion";
import { cx, type ClassValue } from "@/lib/utils/cx";

export type ScrollRevealProps = {
  children: React.ReactNode;
  /** Delay before this element animates in (seconds). Use for staggering siblings manually. */
  delay?: number;
  className?: ClassValue;
  /** How much of the element must be visible before triggering. Default: 0.15 */
  threshold?: number;
  /** Only animate once. Default: true */
  once?: boolean;
};

/**
 * ScrollReveal — wraps any content in a fade-up entrance animation
 * triggered when the element enters the viewport.
 *
 * Spec: opacity 0→1, y +12→0, duration 500ms, easing: enter.
 * Skipped entirely for prefers-reduced-motion.
 *
 * Usage:
 *   <ScrollReveal>
 *     <p>This fades in when scrolled into view.</p>
 *   </ScrollReveal>
 *
 * For staggered siblings, use <ScrollRevealGroup> instead.
 */
export function ScrollReveal({
  children,
  delay = 0,
  className,
  threshold = 0.15,
  once = true,
}: ScrollRevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(ref, { amount: threshold, once });

  if (reduceMotion) {
    return <div className={cx(className)}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cx(className)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={scrollReveal}
      transition={{
        duration: duration.slow,
        ease: ease.enter,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

export type ScrollRevealGroupProps = {
  children: React.ReactNode;
  /** Stagger delay between children in seconds. Default: 0.06 (60ms) */
  stagger?: number;
  className?: ClassValue;
  threshold?: number;
  once?: boolean;
};

/**
 * ScrollRevealGroup — staggered scroll reveal for a list of siblings.
 * Each direct child animates in with a 60ms offset.
 *
 * Usage:
 *   <ScrollRevealGroup>
 *     <Card />
 *     <Card />
 *     <Card />
 *   </ScrollRevealGroup>
 */
export function ScrollRevealGroup({
  children,
  stagger = 0.06,
  className,
  threshold = 0.1,
  once = true,
}: ScrollRevealGroupProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(ref, { amount: threshold, once });

  if (reduceMotion) {
    return <div className={cx(className)}>{children}</div>;
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={cx(className)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {React.Children.map(children, (child) => (
        <motion.div
          variants={scrollReveal}
          transition={{ duration: duration.slow, ease: ease.enter }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
