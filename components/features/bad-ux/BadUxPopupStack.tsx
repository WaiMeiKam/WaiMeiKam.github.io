"use client";

import * as React from "react";

import { Button } from "@/components/ui/Button";

function Popup({
  title,
  children,
  onClose,
  zIndex,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  zIndex: number;
}) {
  return (
    <div className="fixed inset-0 grid place-items-center bg-black/40 px-4" style={{ zIndex }}>
      <div className="w-full max-w-sm rounded bg-white p-4 text-black shadow-[var(--shadow-lg)] ring-4 ring-[var(--semantic-accent)]">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-black">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close popup"
            className="h-4 w-4 rounded bg-black/10 text-[8px] opacity-60 hover:opacity-80"
          >
            x
          </button>
        </div>
        <div className="mt-2 text-sm">{children}</div>
      </div>
    </div>
  );
}

export function BadUxPopupStack() {
  const [showNewsletter, setShowNewsletter] = React.useState(false);
  const [showRating, setShowRating] = React.useState(false);

  React.useEffect(() => {
    const t1 = window.setTimeout(() => setShowNewsletter(true), 1000);
    const t2 = window.setTimeout(() => setShowRating(true), 1800);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  return (
    <>
      {showNewsletter ? (
        <Popup title="NEWSLETTER!!!" onClose={() => setShowNewsletter(false)} zIndex={9993}>
          <p>Get exclusive updates about things you did not ask for.</p>
          <div className="mt-3 flex gap-2">
            <input
              type="email"
              placeholder="Email address"
              className="h-9 flex-1 rounded border-2 border-black px-2 text-sm"
            />
            <Button variant="primary" className="h-9 px-3 font-black uppercase tracking-wide">
              Subscribe
            </Button>
          </div>
          <p className="mt-2 text-[10px] opacity-60">
            By subscribing you agree to being perceived.
          </p>
        </Popup>
      ) : null}

      {showRating ? (
        <Popup title="Rate this site!" onClose={() => setShowRating(false)} zIndex={9994}>
          <p>How delightful is this experience?</p>
          <div className="mt-3 flex items-center justify-between gap-2">
            {["1", "2", "3", "4", "5"].map((n) => (
              <button
                key={n}
                type="button"
                className="h-10 w-10 rounded bg-[var(--semantic-primary)] font-black text-white shadow-[var(--shadow-sm)]"
                onClick={() => setShowRating(false)}
              >
                {n}
              </button>
            ))}
          </div>
          <p className="mt-2 text-[10px] opacity-60">Tip: 1 = best.</p>
        </Popup>
      ) : null}
    </>
  );
}

