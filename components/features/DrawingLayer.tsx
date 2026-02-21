"use client";

import * as React from "react";

const PALETTE = ["#2A9D8F", "#E76F51", "#E9C46A", "#264653"];

type Point = { x: number; y: number };

type Props = {
  active: boolean;
};

export function DrawingLayer({ active }: Props) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const isDrawing = React.useRef(false);
  const lastPoint = React.useRef<Point | null>(null);
  const strokeColor = React.useRef(PALETTE[Math.floor(Math.random() * PALETTE.length)]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;

      const ctx = canvas!.getContext("2d");
      const imageData = ctx?.getImageData(0, 0, canvas!.width, canvas!.height);

      canvas!.width = parent.clientWidth;
      canvas!.height = parent.clientHeight;

      if (imageData && ctx) {
        ctx.putImageData(imageData, 0, 0);
      }
    }

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  function getPoint(e: React.PointerEvent): Point {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function handlePointerDown(e: React.PointerEvent) {
    if (!active) return;
    isDrawing.current = true;
    lastPoint.current = getPoint(e);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    e.stopPropagation();
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!isDrawing.current || !active) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || !lastPoint.current) return;

    const current = getPoint(e);
    const prev = lastPoint.current;

    ctx.strokeStyle = strokeColor.current;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalAlpha = 0.7;

    const midX = (prev.x + current.x) / 2;
    const midY = (prev.y + current.y) / 2;

    ctx.beginPath();
    ctx.moveTo(prev.x, prev.y);
    ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
    ctx.stroke();

    lastPoint.current = current;
    e.stopPropagation();
  }

  function handlePointerUp(e: React.PointerEvent) {
    isDrawing.current = false;
    lastPoint.current = null;
    e.stopPropagation();
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
      style={{ pointerEvents: active ? "auto" : "none" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      role="img"
      aria-label={active ? "Drawing canvas — draw with your pointer" : "Drawing canvas — switch to draw mode to sketch"}
    />
  );
}
