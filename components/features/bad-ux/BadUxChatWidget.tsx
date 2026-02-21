"use client";

import * as React from "react";

export function BadUxChatWidget() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="fixed bottom-3 right-3 z-[9997]">
      {isOpen ? (
        <div className="w-[260px] rounded bg-white p-3 text-[10px] text-black shadow-[var(--shadow-lg)] ring-4 ring-[var(--semantic-accent)]">
          <p className="font-black uppercase tracking-widest">Totally human chat</p>
          <p className="mt-2">
            Hi!!! I noticed you are looking at the website. Do you want to sign up for 12 newsletters?
          </p>
          <div className="mt-3 flex justify-between gap-2">
            <button
              type="button"
              className="h-7 flex-1 rounded bg-[var(--semantic-primary)] px-2 font-black text-white"
              onClick={() => setIsOpen(false)}
            >
              YES
            </button>
            <button
              type="button"
              className="h-7 w-10 rounded bg-black/10 px-2 text-[8px] opacity-60 hover:opacity-80"
              onClick={() => setIsOpen(false)}
            >
              no
            </button>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Open chat widget"
        className="mt-2 grid h-12 w-12 place-items-center rounded-full bg-[var(--semantic-primary)] text-white shadow-[var(--shadow-lg)] ring-4 ring-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        style={{
          animation:
            typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
              ? undefined
              : "kimsWorldWobble 900ms ease-in-out infinite",
        }}
      >
        <span className="text-xl leading-none">💬</span>
      </button>
    </div>
  );
}

