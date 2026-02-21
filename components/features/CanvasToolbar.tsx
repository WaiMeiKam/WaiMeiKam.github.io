"use client";

import { cx } from "@/lib/utils/cx";

type Props = {
  mode: "explore" | "draw";
  onModeChange: (mode: "explore" | "draw") => void;
  onZoomToFit: () => void;
};

function HandIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 1.5v7M5.5 4v6.5a2 2 0 0 0 2 2h3a3 3 0 0 0 3-3V5.5M5.5 4a1 1 0 1 1 2 0M5.5 4a1 1 0 1 0-2 0v4.5M3.5 8.5a1 1 0 1 0-2 0V10a5 5 0 0 0 5 5h1.5M9 3a1 1 0 1 1 2 0v2M11 4a1 1 0 1 1 2 0v1.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M11.5 1.5l3 3-9 9H2.5v-3l9-9z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9.5 3.5l3 3" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function FitIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M1.5 5.5v-3a1 1 0 0 1 1-1h3M10.5 1.5h3a1 1 0 0 1 1 1v3M14.5 10.5v3a1 1 0 0 1-1 1h-3M5.5 14.5h-3a1 1 0 0 1-1-1v-3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CanvasToolbar({ mode, onModeChange, onZoomToFit }: Props) {
  return (
    <div
      className={cx(
        "absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1",
        "rounded-full bg-white/90 px-2 py-1.5 shadow-lg ring-1 ring-black/8 backdrop-blur-sm",
      )}
      role="toolbar"
      aria-label="Canvas tools"
    >
      <button
        type="button"
        onClick={() => onModeChange("explore")}
        className={cx(
          "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold outline-none transition-colors",
          "focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-white",
          mode === "explore"
            ? "bg-[var(--semantic-primary)] text-white"
            : "text-[var(--semantic-text)] hover:bg-black/5",
        )}
        aria-pressed={mode === "explore"}
        aria-label="Explore mode — pan and zoom the canvas"
      >
        <HandIcon />
        <span className="hidden sm:inline">Explore</span>
      </button>

      <button
        type="button"
        onClick={() => onModeChange("draw")}
        className={cx(
          "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold outline-none transition-colors",
          "focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-white",
          mode === "draw"
            ? "bg-[var(--semantic-primary)] text-white"
            : "text-[var(--semantic-text)] hover:bg-black/5",
        )}
        aria-pressed={mode === "draw"}
        aria-label="Draw mode — sketch on the canvas"
      >
        <PencilIcon />
        <span className="hidden sm:inline">Draw</span>
      </button>

      <div className="mx-0.5 h-5 w-px bg-black/10" aria-hidden="true" />

      <button
        type="button"
        onClick={onZoomToFit}
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-[var(--semantic-text)] outline-none transition-colors hover:bg-black/5 focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        aria-label="Zoom to fit all content"
      >
        <FitIcon />
        <span className="hidden sm:inline">Fit</span>
      </button>
    </div>
  );
}
