"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cx, type ClassValue } from "@/lib/utils/cx";
import { useAudio } from "@/lib/hooks/useAudio";

export type AudioToggleProps = {
  track?: string;
  artist?: string;
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

function SpeakerIcon() {
  return (
    <svg
      viewBox="0 0 18 18"
      fill="none"
      className="w-3.5 h-3.5 shrink-0"
      aria-hidden="true"
    >
      <path
        d="M8 3.5 4.5 6.5H2v5h2.5L8 14.5V3.5Z"
        fill="currentColor"
      />
      <path
        d="M11.5 6.5c.9.7 1.5 1.7 1.5 2.5s-.6 1.8-1.5 2.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="11"
        y1="5"
        x2="16"
        y2="13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="opacity-0 [.muted_&]:opacity-100"
      />
    </svg>
  );
}

function MutedIcon() {
  return (
    <svg
      viewBox="0 0 18 18"
      fill="none"
      className="w-3.5 h-3.5 shrink-0"
      aria-hidden="true"
    >
      <path
        d="M8 3.5 4.5 6.5H2v5h2.5L8 14.5V3.5Z"
        fill="currentColor"
        opacity="0.5"
      />
      <path
        d="M12 7l3 3m0-3-3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AudioToggle({ track, artist, className }: AudioToggleProps) {
  const { isPlaying, toggle, audioAvailable } = useAudio();

  const label = isPlaying ? "Mute ambient audio" : "Play ambient audio";

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={!audioAvailable}
      aria-pressed={isPlaying}
      aria-label={label}
      title={!audioAvailable ? "No audio file found — drop ambient.mp3 into /public/audio/" : label}
      className={cx(
        "group inline-flex items-center gap-2 rounded-[var(--radius-full)] px-3 py-1.5 text-xs font-medium",
        "text-[var(--semantic-heading)]",
        "bg-black/5 hover:bg-black/8 active:bg-black/12",
        "transition-colors duration-200",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--semantic-background)]",
        className,
      )}
    >
      {isPlaying ? (
        <SpeakerBars playing />
      ) : (
        <MutedIcon />
      )}

      {track ? (
        <span className="flex items-baseline gap-1 max-w-[180px] truncate">
          <span className={cx("transition-opacity", isPlaying ? "opacity-100" : "opacity-60 group-hover:opacity-90")}>
            {track}
          </span>
          {artist && (
            <>
              <span className="opacity-30">·</span>
              <span className="opacity-50 truncate">{artist}</span>
            </>
          )}
        </span>
      ) : (
        <span className="opacity-70 group-hover:opacity-100 transition-opacity">
          {isPlaying ? "Playing" : "Listen"}
        </span>
      )}
    </button>
  );
}
