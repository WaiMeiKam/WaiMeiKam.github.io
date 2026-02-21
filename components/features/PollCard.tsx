"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import { cx, type ClassValue } from "@/lib/utils/cx";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { IllustrationSpot } from "@/components/illustrations/IllustrationSpot";

export type PollCardProps = {
  question: string;
  optionA: string;
  optionB: string;
  kimsAnswer: "a" | "b";
  quip?: string;
  reactionIllustrationName?: string;
  className?: ClassValue;
  onAnswered?: (selection: "a" | "b") => void;
};

export function PollCard({
  question,
  optionA,
  optionB,
  kimsAnswer,
  quip,
  reactionIllustrationName,
  className,
  onAnswered,
}: PollCardProps) {
  const [selection, setSelection] = React.useState<"a" | "b" | null>(null);
  const reduceMotion = useReducedMotion();

  function choose(value: "a" | "b") {
    setSelection(value);
    onAnswered?.(value);
  }

  const isRevealed = selection !== null;
  const matched = selection ? selection === kimsAnswer : false;

  return (
    <Card className={cx("overflow-hidden", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg sm:text-xl">{question}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {isRevealed
            ? `Kim's answer: ${kimsAnswer === "a" ? optionA : optionB}. ${matched ? "You matched!" : "No match."} ${quip ?? ""}`
            : ""}
        </div>
        <AnimatePresence mode="wait" initial={false}>
          {!isRevealed ? (
            <motion.div
              key="options"
              initial={reduceMotion ? undefined : { opacity: 0, rotateX: -12 }}
              animate={reduceMotion ? undefined : { opacity: 1, rotateX: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, rotateX: 12, scale: 0.96 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              style={{ perspective: 800 }}
            >
              <Button variant="secondary" size="lg" onClick={() => choose("a")}>
                {optionA}
              </Button>
              <Button variant="secondary" size="lg" onClick={() => choose("b")}>
                {optionB}
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="reveal"
              initial={reduceMotion ? undefined : { opacity: 0, rotateX: -12, scale: 0.96 }}
              animate={reduceMotion ? undefined : { opacity: 1, rotateX: 0, scale: 1 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                scale: { type: "spring", stiffness: 300, damping: 22 },
              }}
              className="rounded-[var(--radius-lg)] bg-black/5 p-4"
              style={{ perspective: 800, transformOrigin: "center top" }}
            >
              <p className="text-sm opacity-70">Kim&rsquo;s answer</p>
              <motion.p
                className="mt-1 font-semibold text-[var(--semantic-heading)]"
                initial={reduceMotion ? undefined : { opacity: 0, y: 6 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.3 }}
              >
                {kimsAnswer === "a" ? optionA : optionB}
              </motion.p>
              <motion.p
                className="mt-3 text-sm"
                initial={reduceMotion ? undefined : { opacity: 0 }}
                animate={reduceMotion ? undefined : { opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.3 }}
              >
                {matched ? (
                  <span className="font-semibold text-[var(--semantic-primary)]">
                    You matched.
                  </span>
                ) : (
                  <span className="font-semibold text-[var(--semantic-accent)]">
                    No match.
                  </span>
                )}{" "}
                <span className="opacity-80">({selection === "a" ? optionA : optionB})</span>
              </motion.p>
              {quip ? (
                <motion.p
                  className="mt-3 text-sm opacity-80"
                  initial={reduceMotion ? undefined : { opacity: 0 }}
                  animate={reduceMotion ? undefined : { opacity: 0.8 }}
                  transition={{ delay: 0.35, duration: 0.3 }}
                >
                  &ldquo;{quip}&rdquo;
                </motion.p>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>

        {isRevealed && reactionIllustrationName ? (
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, scale: 0.92 }}
            animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
          >
            <IllustrationSpot
              name={reactionIllustrationName}
              alt=""
              width={420}
              height={280}
              className={cx("w-full", matched ? "shadow-[var(--shadow-glow)]" : undefined)}
            />
          </motion.div>
        ) : null}
      </CardContent>
    </Card>
  );
}
