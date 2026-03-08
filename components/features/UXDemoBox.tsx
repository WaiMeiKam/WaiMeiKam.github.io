"use client";

import * as React from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

import { cx } from "@/lib/utils/cx";

type UXDemoMode = "good" | "bad";

/**
 * Self-contained Good UX / Bad UX demo for use inside articles.
 * Scoped to a contained preview box — does not affect the rest of the page.
 */
export function UXDemoBox() {
  const [mode, setMode] = React.useState<UXDemoMode>("good");
  const reduceMotion = useReducedMotion();

  const toggleMode = React.useCallback(() => {
    setMode((prev) => (prev === "good" ? "bad" : "good"));
  }, []);

  const isBad = mode === "bad";

  return (
    <div
      className="my-10 rounded-[var(--radius-lg)] border border-black/10 bg-[var(--semantic-background)] p-6 shadow-[var(--shadow-md)]"
      role="region"
      aria-label="Good UX vs Bad UX interactive demo"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-[var(--semantic-heading)]">
          Try it yourself — flip the switch to see the difference.
        </p>
        <button
          type="button"
          role="switch"
          aria-checked={isBad}
          aria-label="Toggle between Good UX and Bad UX preview"
          onClick={toggleMode}
          className={cx(
            "relative inline-flex h-9 w-[108px] items-center justify-between rounded-[var(--radius-full)] px-3",
            "bg-black/5 text-[var(--semantic-heading)] ring-1 ring-black/10",
            "hover:bg-black/10 active:bg-black/15",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--semantic-background)]",
            "select-none",
          )}
        >
          <span
            className={cx(
              "text-[11px] font-semibold uppercase tracking-wide",
              isBad ? "opacity-40" : "opacity-80",
            )}
          >
            Good
          </span>
          <span
            className={cx(
              "text-[11px] font-semibold uppercase tracking-wide",
              isBad ? "opacity-80" : "opacity-40",
            )}
          >
            Bad
          </span>
          <motion.span
            aria-hidden="true"
            className={cx(
              "absolute left-1 top-1 grid h-7 w-7 place-items-center rounded-full",
              "bg-[var(--semantic-background)] shadow-[var(--shadow-sm)]",
              "ring-1 ring-black/10",
            )}
            animate={
              reduceMotion
                ? undefined
                : {
                    x: isBad ? 66 : 0,
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
      </div>

      {/* Scoped preview — only this box changes with the toggle */}
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={reduceMotion ? undefined : { opacity: 0.7 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0.7 }}
          transition={{ duration: 0.25 }}
          className={cx(
            "overflow-hidden rounded-[var(--radius-md)] p-5 transition-colors duration-300",
            isBad
              ? "bg-[var(--badUx-background)] font-[var(--font-family-badUx)] text-[var(--badUx-text)]"
              : "bg-[var(--semantic-surface)] text-[var(--semantic-text)]",
          )}
          style={
            isBad
              ? {
                  letterSpacing: "0.02em",
                  textShadow: "1px 1px 0 rgba(0,0,0,0.35)",
                }
              : undefined
          }
        >
          <h3
            className={cx(
              "mb-2 text-lg font-bold",
              isBad ? "text-[var(--badUx-accent)]" : "text-[var(--semantic-heading)]",
            )}
          >
            {isBad ? "🔥 LIMITED TIME OFFER!!! 🔥" : "Stay in the loop"}
          </h3>
          <p className="mb-4 text-sm leading-relaxed opacity-90">
            {isBad
              ? "CLICK HERE NOW!!! Get our AMAZING newsletter with 1000% more content you didn't ask for!!! Don't miss out!!!"
              : "Thoughtful design takes time. Get occasional updates on what I'm thinking about and making."}
          </p>
          <button
            type="button"
            className={cx(
              "rounded-[var(--radius-md)] px-4 py-2 text-sm font-semibold",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              isBad
                ? "bg-[var(--badUx-primary)] text-white focus-visible:ring-[var(--badUx-accent)]"
                : "bg-[var(--semantic-primary)] text-white hover:opacity-90 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-[var(--semantic-surface)]",
            )}
          >
            {isBad ? "SUBSCRIBE NOW!!!" : "Subscribe"}
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
