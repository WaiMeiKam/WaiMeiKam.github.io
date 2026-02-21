"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cx, type ClassValue } from "@/lib/utils/cx";
import { useAudio } from "@/lib/hooks/useAudio";

export type AudioToggleProps = {
  className?: ClassValue;
};

const BAR_COUNT = 3;

function SpeakerBars({ playing }: { playing: boolean }) {
  const reduceMotion = useReducedMotion();
  const delays = [0, 0.15, 0.08];
  const heights = playing
    ? [
        [12, 6, 12, 8, 12],
        [8, 12, 6, 12, 8],
        [6, 10, 12, 6, 10],
      ]
    : [[4], [4], [4]];

  return (
    <span className="inline-flex items-end gap-[2px] h-3.5" aria-hidden="true">
      {Array.from({ length: BAR_COUNT }).map((_, i) => (
        <motion.span
          key={i}
          className="inline-block w-[3px] rounded-full bg-current origin-bottom"
          animate={{ height: heights[i].map((h) => `${h}px`) }}
          transition={
            reduceMotion || !playing
              ? { duration: 0.2 }
              : {
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: "mirror" as const,
                  ease: "easeInOut",
                  delay: delays[i],
                }
          }
        />
      ))}
    </span>
  );
}

export function AudioToggle({ className }: AudioToggleProps) {
  const { isPlaying, toggle } = useAudio();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isPlaying}
      aria-label={isPlaying ? "Pause ambient audio" : "Play ambient audio"}
      className={cx(
        "group inline-flex items-center gap-2 rounded-[var(--radius-full)] px-3 py-1.5 text-xs font-medium",
        "text-[var(--semantic-heading)]",
        "bg-black/5 hover:bg-black/8 active:bg-black/12",
        "transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--semantic-background)]",
        className,
      )}
    >
      <SpeakerBars playing={isPlaying} />
      <span className="opacity-70 group-hover:opacity-100 transition-opacity">
        {isPlaying ? "Playing" : "Listen"}
      </span>
    </button>
  );
}
