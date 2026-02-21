"use client";

import * as React from "react";

import { Button } from "@/components/ui/Button";

export function BadUxExitIntent() {
  const [open, setOpen] = React.useState(false);
  const shownRef = React.useRef(false);

  React.useEffect(() => {
    const onMouseOut = (e: MouseEvent) => {
      if (shownRef.current) return;
      if (e.relatedTarget !== null) return;
      if (e.clientY > 0) return;
      shownRef.current = true;
      setOpen(true);
    };

    window.addEventListener("mouseout", onMouseOut);
    return () => window.removeEventListener("mouseout", onMouseOut);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9996] grid place-items-center bg-black/70 px-4">
      <div className="w-full max-w-md rounded bg-white p-5 text-black shadow-[var(--shadow-lg)] ring-8 ring-[var(--semantic-primary)]">
        <p className="text-[11px] font-black uppercase tracking-[0.2em]">WAIT!!!</p>
        <h3 className="mt-2 text-2xl font-black">Don&rsquo;t leave yet!</h3>
        <p className="mt-2 text-sm">
          We noticed you were about to abandon this experience. Please confirm you actually meant to have free will.
        </p>
        <div className="mt-4 flex items-center gap-3">
          <Button variant="primary" onClick={() => setOpen(false)} className="font-black uppercase tracking-wide">
            Ok fine
          </Button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-[8px] opacity-50 underline hover:opacity-70"
          >
            close
          </button>
        </div>
      </div>
    </div>
  );
}

