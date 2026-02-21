"use client";

import { cx, type ClassValue } from "@/lib/utils/cx";

export type CurrentlyListeningProps = {
  track: string;
  artist: string;
  href?: string;
  className?: ClassValue;
};

export function CurrentlyListening({
  track,
  artist,
  href,
  className,
}: CurrentlyListeningProps) {
  const inner = (
    <>
      <span className="shrink-0 text-xs opacity-50">♫</span>
      <span className="truncate">
        <span className="font-medium">{track}</span>
        <span className="opacity-50"> · </span>
        <span className="opacity-60">{artist}</span>
      </span>
    </>
  );

  const shared = cx(
    "inline-flex items-center gap-2 rounded-[var(--radius-full)] px-3 py-1.5",
    "text-xs text-[var(--semantic-text)]",
    "bg-black/3",
    className,
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cx(
          shared,
          "hover:bg-black/6 transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--semantic-background)]",
        )}
      >
        {inner}
      </a>
    );
  }

  return <span className={shared}>{inner}</span>;
}
