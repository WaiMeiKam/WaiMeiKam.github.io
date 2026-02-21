"use client";

import * as React from "react";

import { Button } from "@/components/ui/Button";
import { cx } from "@/lib/utils/cx";

const OPTIONS = [
  "Strictly Necessary Cookies (cannot be turned off)",
  "Performance Cookies",
  "Functional Cookies",
  "Targeting Cookies",
  "Tracking Cookies",
  "Third‑Party Cookies",
  "Invasive Analytics Cookies",
  "Cross‑Device Profiling Cookies",
  "Probably-Spying Cookies",
  "Cookies for the vibes",
  "Cookies for my dog (Kim doesn't have a dog)",
  "Cookies that remember what you dreamt last night",
];

export function BadUxCookieWall() {
  const [open, setOpen] = React.useState(true);
  const [checked, setChecked] = React.useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const option of OPTIONS) initial[option] = true;
    return initial;
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] grid place-items-center bg-black/80 px-3 py-6">
      <div
        className={cx(
          "w-full max-w-2xl rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-lg)]",
          "bg-[var(--semantic-surface)] text-[var(--semantic-text)]",
          "ring-4 ring-[var(--semantic-primary)]",
        )}
      >
        <p className="text-xs font-bold uppercase tracking-widest text-[var(--semantic-heading)]">
          Cookie consent (mandatory)
        </p>
        <h2 className="mt-2 text-2xl font-black text-[var(--semantic-heading)]">
          We value your privacy (so much we&rsquo;ll take all of it)
        </h2>
        <p className="mt-2 text-sm opacity-80">
          Please review 12 categories of cookies. If you don&rsquo;t consent, the site may become more usable, which we cannot allow.
        </p>

        <div className="mt-4 max-h-[40vh] overflow-auto rounded-[var(--radius-md)] bg-black/15 p-3">
          <fieldset>
            <legend className="sr-only">Cookie options</legend>
            <div className="space-y-2">
              {OPTIONS.map((option) => (
                <label key={option} className="flex items-start gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={checked[option] ?? false}
                    onChange={(e) => setChecked((prev) => ({ ...prev, [option]: e.target.checked }))}
                    className="mt-1 h-4 w-4 accent-[var(--semantic-primary)]"
                  />
                  <span className="leading-snug">{option}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Button
            variant="primary"
            className="text-base font-black uppercase tracking-wide"
            onClick={() => setOpen(false)}
          >
            Accept All
          </Button>

          <Button
            variant="secondary"
            className="text-base font-black uppercase tracking-wide"
            onClick={() => {
              const everything: Record<string, boolean> = {};
              for (const option of OPTIONS) everything[option] = true;
              setChecked(everything);
            }}
          >
            Accept All Again
          </Button>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="ml-auto text-[8px] opacity-40 underline hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)]"
          >
            Reject all (not recommended)
          </button>
        </div>
      </div>
    </div>
  );
}

