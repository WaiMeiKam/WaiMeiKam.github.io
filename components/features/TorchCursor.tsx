"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

export function TorchCursor() {
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const glowRef = React.useRef<HTMLDivElement>(null);
  const [hasMoved, setHasMoved] = React.useState(false);
  const [ready, setReady] = React.useState(false);
  const [isTouch, setIsTouch] = React.useState(false);

  const posRef = React.useRef({ x: 0, y: 0 });
  const pendingRef = React.useRef<{ x: number; y: number } | null>(null);
  const hasMovedRef = React.useRef(false);
  const rafRef = React.useRef(0);

  function applyMask(x: number, y: number, moved: boolean) {
    if (!overlayRef.current) return;
    const radius = moved ? 220 : 350;
    const fade = moved ? "rgba(0,0,0,0.97)" : "rgba(0,0,0,0.85)";
    const g = `radial-gradient(circle ${radius}px at ${x}px ${y}px, transparent 35%, ${fade} 100%)`;
    overlayRef.current.style.setProperty("-webkit-mask-image", g);
    overlayRef.current.style.setProperty("mask-image", g);

    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(circle 180px at ${x}px ${y}px, rgba(233,196,106,0.12) 0%, transparent 100%)`;
    }
  }

  React.useEffect(() => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    posRef.current = { x: cx, y: cy };
    setIsTouch("ontouchstart" in window);
    setReady(true);
    applyMask(cx, cy, false);
  }, []);

  React.useEffect(() => {
    function tick() {
      if (pendingRef.current) {
        posRef.current = pendingRef.current;
        pendingRef.current = null;
        applyMask(posRef.current.x, posRef.current.y, hasMovedRef.current);
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  React.useEffect(() => {
    function handleMove(x: number, y: number) {
      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
        setHasMoved(true);
      }
      pendingRef.current = { x, y };
    }

    function onMouse(e: MouseEvent) {
      handleMove(e.clientX, e.clientY);
    }
    function onTouch(e: TouchEvent) {
      const t = e.touches[0];
      if (t) handleMove(t.clientX, t.clientY);
    }

    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  if (!ready) return null;

  const hintX = posRef.current.x;
  const hintY = posRef.current.y;

  return (
    <>
      <div
        ref={glowRef}
        className="pointer-events-none fixed inset-0"
        style={{ zIndex: 9 }}
        aria-hidden="true"
      />
      <div
        ref={overlayRef}
        className="pointer-events-none fixed inset-0"
        style={{ backgroundColor: "#000", zIndex: 10 }}
        aria-hidden="true"
      />
      <AnimatePresence>
        {!hasMoved && (
          <motion.p
            key="torch-hint"
            className="pointer-events-none fixed text-sm tracking-wide whitespace-nowrap"
            style={{
              color: "var(--color-cream)",
              left: hintX,
              top: hintY + 60,
              transform: "translateX(-50%)",
              zIndex: 11,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            aria-hidden="true"
          >
            {isTouch ? "Touch and drag to explore" : "Move your cursor to explore"}
          </motion.p>
        )}
      </AnimatePresence>
    </>
  );
}
