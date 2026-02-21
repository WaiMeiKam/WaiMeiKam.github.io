"use client";

import * as React from "react";

const MAX_PARTICLES = 60;

export function BadUxCursorTrail() {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const container = containerRef.current;
    if (!container) return;

    let particles = 0;

    const onMove = (e: PointerEvent) => {
      if (particles > MAX_PARTICLES) return;

      const el = document.createElement("div");
      particles += 1;

      el.style.position = "absolute";
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
      el.style.width = "10px";
      el.style.height = "10px";
      el.style.borderRadius = "9999px";
      el.style.pointerEvents = "none";
      el.style.background = "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,0,0.7) 35%, rgba(255,0,255,0.0) 70%)";
      el.style.mixBlendMode = "screen";
      el.style.transform = "translate(-50%, -50%)";
      el.style.filter = "blur(0.2px)";
      el.style.opacity = "1";
      el.style.transition = "transform 450ms ease, opacity 450ms ease";

      container.appendChild(el);

      requestAnimationFrame(() => {
        el.style.opacity = "0";
        el.style.transform = "translate(-50%, -50%) scale(2.2) rotate(40deg)";
      });

      window.setTimeout(() => {
        el.remove();
        particles = Math.max(0, particles - 1);
      }, 500);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <div ref={containerRef} className="pointer-events-none fixed inset-0 z-[9990]" />;
}

