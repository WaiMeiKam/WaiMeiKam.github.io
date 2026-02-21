"use client";

import * as React from "react";

function pad(num: number, length: number) {
  return String(num).padStart(length, "0");
}

export function BadUxVisitorCounter() {
  const [count, setCount] = React.useState<number>(() => {
    const seed = Math.floor(Date.now() / 1000) % 1000000;
    return 347 + (seed % 90000);
  });

  React.useEffect(() => {
    const id = window.setInterval(() => setCount((c) => c + 1), 8000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="fixed bottom-2 left-2 z-[9995] rounded bg-black/60 px-2 py-1 text-[10px] font-black text-white/90 ring-2 ring-white/40">
      You are visitor #{pad(count, 7)} • Best viewed in Internet Explorer 6.0 • 800×600
    </div>
  );
}

