"use client";

import * as React from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

import { cx, type ClassValue } from "@/lib/utils/cx";
import { useUXMode } from "@/lib/hooks/useUXMode";

export type UXToggleProps = {
  className?: ClassValue;
  size?: "sm" | "md";
};

export function UXToggle({ className, size = "md" }: UXToggleProps) {
  const { mode, toggleMode } = useUXMode();
  const reduceMotion = useReducedMotion();
  const [flash, setFlash] = React.useState(false);

  const isBad = mode === "bad";
  const dims = size === "sm" ? { track: "h-8 w-[92px]", knob: "h-6 w-6" } : { track: "h-9 w-[108px]", knob: "h-7 w-7" };

  function handleToggle() {
    if (!reduceMotion) {
      setFlash(true);
      requestAnimationFrame(() => {
        setTimeout(() => setFlash(false), 400);
      });
    }
    toggleMode();
  }

  return (
    <>
      <button
        type="button"
        role="switch"
        aria-checked={isBad}
        aria-label="Toggle Good UX / Bad UX"
        onClick={handleToggle}
        className={cx(
          "relative inline-flex items-center justify-between rounded-[var(--radius-full)] px-3",
          "bg-black/5 text-[var(--semantic-heading)] ring-1 ring-black/10",
          "hover:bg-black/10 active:bg-black/15",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--semantic-background)]",
          "select-none",
          dims.track,
          className,
        )}
      >
        <span className={cx("text-[11px] font-semibold uppercase tracking-wide", isBad ? "opacity-40" : "opacity-80")}>
          Good
        </span>
        <span className={cx("text-[11px] font-semibold uppercase tracking-wide", isBad ? "opacity-80" : "opacity-40")}>
          Bad
        </span>

        <motion.span
          aria-hidden="true"
          className={cx(
            "absolute left-1 top-1 grid place-items-center rounded-full",
            "bg-[var(--semantic-background)] shadow-[var(--shadow-sm)]",
            "ring-1 ring-black/10",
            dims.knob,
          )}
          animate={
            reduceMotion
              ? undefined
              : {
                  x: isBad ? (size === "sm" ? 54 : 66) : 0,
                  rotate: isBad ? [0, -8, 12, -4, 0] : [0, 4, -8, 2, 0],
                }
          }
          transition={{ type: "spring", stiffness: 520, damping: 28 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isBad ? "bad" : "good"}
              initial={reduceMotion ? undefined : { scale: 0, opacity: 0 }}
              animate={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
              exit={reduceMotion ? undefined : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-[10px] font-bold leading-none"
            >
              {isBad ? "!" : "✓"}
            </motion.span>
          </AnimatePresence>
        </motion.span>
      </button>

      {/* Flash overlay for a dramatic mode switch */}
      <AnimatePresence>
        {flash && !reduceMotion && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-[9999]"
            style={{ backgroundColor: isBad ? "rgba(255,0,255,0.15)" : "rgba(233,196,106,0.2)" }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
