"use client";

import * as React from "react";

import { StickyNote } from "./StickyNote";
import { CanvasCard } from "./CanvasCard";
import { DrawingLayer } from "./DrawingLayer";
import { CanvasToolbar } from "./CanvasToolbar";

export type NoodlingItem = {
  id: string;
  type: "sticky" | "video" | "image" | "embed" | "link";
  x: number;
  y: number;
  rotation: number;
  tags: string[];
  content?: string;
  color?: string;
  title?: string;
  thumbnail?: string;
  link?: string | null;
  embedUrl?: string;
  width?: number;
};

type Transform = { x: number; y: number; scale: number };

const DRAG_THRESHOLD = 5;
const MIN_SCALE = 0.15;
const MAX_SCALE = 4;
const ZOOM_STEP = 1.08;
const DOT_GAP = 24;

export function NoodlingCanvas({ items }: { items: NoodlingItem[] }) {
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const [transform, setTransform] = React.useState<Transform>({ x: 0, y: 0, scale: 1 });
  const transformRef = React.useRef(transform);
  transformRef.current = transform;

  const [mode, setMode] = React.useState<"explore" | "draw">("explore");
  const [isPanning, setIsPanning] = React.useState(false);

  const panStart = React.useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const hasDragged = React.useRef(false);
  const activePointers = React.useRef(new Set<number>());

  const zoomToFit = React.useCallback(() => {
    const el = viewportRef.current;
    if (!el || items.length === 0) return;

    const { clientWidth, clientHeight } = el;

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (const item of items) {
      const w = item.width ?? 220;
      const h = item.type === "sticky" ? 160 : 200;
      minX = Math.min(minX, item.x);
      minY = Math.min(minY, item.y);
      maxX = Math.max(maxX, item.x + w);
      maxY = Math.max(maxY, item.y + h);
    }

    const contentW = maxX - minX;
    const contentH = maxY - minY;
    const padding = 100;

    const scaleX = (clientWidth - padding * 2) / contentW;
    const scaleY = (clientHeight - padding * 2) / contentH;
    const scale = Math.min(scaleX, scaleY, 1.5);

    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;

    setTransform({
      x: clientWidth / 2 - cx * scale,
      y: clientHeight / 2 - cy * scale,
      scale,
    });
  }, [items]);

  React.useEffect(() => {
    requestAnimationFrame(zoomToFit);
  }, [zoomToFit]);

  // Scroll-wheel zoom (native listener so we can use passive: false)
  React.useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    function onWheel(e: WheelEvent) {
      e.preventDefault();
      const t = transformRef.current;
      const rect = el!.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      const factor = e.deltaY < 0 ? ZOOM_STEP : 1 / ZOOM_STEP;
      const newScale = Math.min(Math.max(t.scale * factor, MIN_SCALE), MAX_SCALE);
      const ratio = newScale / t.scale;

      setTransform({
        x: mx - (mx - t.x) * ratio,
        y: my - (my - t.y) * ratio,
        scale: newScale,
      });
    }

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Pinch-to-zoom (native touch events for multi-touch)
  React.useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    let lastDist = 0;

    function onTouchStart(e: TouchEvent) {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        lastDist = Math.sqrt(dx * dx + dy * dy);
      }
    }

    function onTouchMove(e: TouchEvent) {
      if (e.touches.length !== 2) return;
      e.preventDefault();

      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (lastDist === 0) {
        lastDist = dist;
        return;
      }

      const t = transformRef.current;
      const factor = dist / lastDist;
      const newScale = Math.min(Math.max(t.scale * factor, MIN_SCALE), MAX_SCALE);
      const ratio = newScale / t.scale;

      const rect = el!.getBoundingClientRect();
      const cx = (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left;
      const cy = (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top;

      setTransform({
        x: cx - (cx - t.x) * ratio,
        y: cy - (cy - t.y) * ratio,
        scale: newScale,
      });

      lastDist = dist;
    }

    function onTouchEnd() {
      lastDist = 0;
    }

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  function handlePointerDown(e: React.PointerEvent) {
    activePointers.current.add(e.pointerId);
    if (mode !== "explore" || activePointers.current.size > 1) return;

    panStart.current = { x: e.clientX, y: e.clientY, tx: transform.x, ty: transform.y };
    hasDragged.current = false;
    setIsPanning(true);
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!isPanning || mode !== "explore") return;

    if (activePointers.current.size > 1) {
      setIsPanning(false);
      return;
    }

    const dx = e.clientX - panStart.current.x;
    const dy = e.clientY - panStart.current.y;

    if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) {
      hasDragged.current = true;
    }

    setTransform((prev) => ({
      ...prev,
      x: panStart.current.tx + dx,
      y: panStart.current.ty + dy,
    }));
  }

  function handlePointerUp(e: React.PointerEvent) {
    activePointers.current.delete(e.pointerId);
    setIsPanning(false);
  }

  function handleClickCapture(e: React.MouseEvent) {
    if (hasDragged.current) {
      e.preventDefault();
      e.stopPropagation();
      hasDragged.current = false;
    }
  }

  const scaledGap = DOT_GAP * transform.scale;
  const dotRadius = Math.max(0.75, transform.scale * 0.75);

  function handleKeyDown(e: React.KeyboardEvent) {
    const PAN_STEP = 60;
    const ZOOM_IN = 1.15;
    const ZOOM_OUT = 1 / 1.15;

    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        setTransform((t) => ({ ...t, y: t.y + PAN_STEP }));
        break;
      case "ArrowDown":
        e.preventDefault();
        setTransform((t) => ({ ...t, y: t.y - PAN_STEP }));
        break;
      case "ArrowLeft":
        e.preventDefault();
        setTransform((t) => ({ ...t, x: t.x + PAN_STEP }));
        break;
      case "ArrowRight":
        e.preventDefault();
        setTransform((t) => ({ ...t, x: t.x - PAN_STEP }));
        break;
      case "+":
      case "=": {
        e.preventDefault();
        const el = viewportRef.current;
        if (!el) break;
        const cx = el.clientWidth / 2;
        const cy = el.clientHeight / 2;
        setTransform((t) => {
          const ns = Math.min(t.scale * ZOOM_IN, MAX_SCALE);
          const r = ns / t.scale;
          return { x: cx - (cx - t.x) * r, y: cy - (cy - t.y) * r, scale: ns };
        });
        break;
      }
      case "-": {
        e.preventDefault();
        const el = viewportRef.current;
        if (!el) break;
        const cx = el.clientWidth / 2;
        const cy = el.clientHeight / 2;
        setTransform((t) => {
          const ns = Math.max(t.scale * ZOOM_OUT, MIN_SCALE);
          const r = ns / t.scale;
          return { x: cx - (cx - t.x) * r, y: cy - (cy - t.y) * r, scale: ns };
        });
        break;
      }
      case "0":
        e.preventDefault();
        zoomToFit();
        break;
    }
  }

  return (
    <div
      ref={viewportRef}
      className="relative h-full w-full select-none overflow-hidden bg-[var(--semantic-background)]"
      role="region"
      aria-label="Interactive canvas with sticky notes and cards. Use arrow keys to pan, plus and minus to zoom, and 0 to fit all content."
      tabIndex={0}
      style={{
        touchAction: "none",
        cursor: mode === "explore" ? (isPanning ? "grabbing" : "grab") : "crosshair",
        backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.08) ${dotRadius}px, transparent ${dotRadius}px)`,
        backgroundSize: `${scaledGap}px ${scaledGap}px`,
        backgroundPosition: `${transform.x % scaledGap}px ${transform.y % scaledGap}px`,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClickCapture={handleClickCapture}
      onKeyDown={handleKeyDown}
    >
      <div
        className="absolute left-0 top-0 origin-[0_0]"
        style={{
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
          willChange: "transform",
        }}
      >
        {items.map((item) =>
          item.type === "sticky" ? (
            <StickyNote
              key={item.id}
              content={item.content!}
              color={item.color ?? "gold"}
              x={item.x}
              y={item.y}
              rotation={item.rotation}
            />
          ) : (
            <CanvasCard
              key={item.id}
              type={item.type}
              title={item.title ?? ""}
              thumbnail={item.thumbnail}
              link={item.link}
              embedUrl={item.embedUrl}
              x={item.x}
              y={item.y}
              rotation={item.rotation}
              width={item.width}
            />
          ),
        )}
      </div>

      <DrawingLayer active={mode === "draw"} />

      <CanvasToolbar mode={mode} onModeChange={setMode} onZoomToFit={zoomToFit} />

      <ul className="sr-only" aria-label="Canvas items">
        {items.map((item) => (
          <li key={item.id}>
            {item.type === "sticky"
              ? item.content
              : `${item.title ?? ""} (${item.type})`}
          </li>
        ))}
      </ul>
    </div>
  );
}
