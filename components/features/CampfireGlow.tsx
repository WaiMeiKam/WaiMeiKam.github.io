"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

const FILTER_ID = "campfire-fire-filter";

export function CampfireGlow() {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = React.useState(false);
  const turbRef = React.useRef<SVGFETurbulenceElement | null>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Evolve turbulence baseFrequency each frame for organic, never-looping fire edge.
  // Direct DOM mutation bypasses React diffing for zero overhead.
  React.useEffect(() => {
    if (!mounted || reduceMotion) return;
    let frame: number;
    let t = 0;

    function tick() {
      t += 0.006;
      const el = turbRef.current;
      if (el) {
        const bf1 = (0.022 + Math.sin(t) * 0.007).toFixed(4);
        const bf2 = (0.013 + Math.sin(t * 0.65 + 1.2) * 0.005).toFixed(4);
        el.setAttribute("baseFrequency", `${bf1} ${bf2}`);
      }
      frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [mounted, reduceMotion]);

  const shouldAnimate = mounted && !reduceMotion;
  const distortStyle = shouldAnimate ? { filter: `url(#${FILTER_ID})` } : {};

  return (
    <div
      className="relative w-full select-none"
      style={{ aspectRatio: "1/1" }}
      aria-hidden="true"
    >
      {/* SVG filter — always in DOM to avoid SSR/hydration mismatch */}
      <svg
        width="0"
        height="0"
        style={{ position: "absolute", overflow: "hidden" }}
        aria-hidden="true"
      >
        <defs>
          <filter
            id={FILTER_ID}
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
            colorInterpolationFilters="sRGB"
          >
            {/* Step 1: fractal noise, evolved by JS loop */}
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0.022 0.013"
              numOctaves={4}
              seed={5}
              result="noise"
            />
            {/* Step 2: displace edges for organic shape */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={20}
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            {/* Step 3: blur the displaced edges so they fade softly instead of tearing */}
            <feGaussianBlur in="displaced" stdDeviation="7 5" />
          </filter>
        </defs>
      </svg>

      {/* Core flame — bright yellow → orange → ember red, distorted + blurred edges */}
      <motion.div
        className="absolute inset-0"
        animate={
          shouldAnimate
            ? { opacity: [0.85, 1, 0.73, 0.96, 0.85] }
            : undefined
        }
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        style={{
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 50% 58%, rgba(255,245,130,0.95) 0%, rgba(252,155,40,0.88) 16%, rgba(231,111,81,0.60) 38%, rgba(196,60,30,0.18) 60%, rgba(196,60,30,0.05) 72%, transparent 82%)",
          transformOrigin: "50% 60%",
          ...distortStyle,
        }}
      />

      {/* Mid halo — deeper orange, evolves at a different rate */}
      <motion.div
        className="absolute inset-0"
        animate={
          shouldAnimate
            ? { opacity: [0.60, 0.88, 0.52, 0.80, 0.60] }
            : undefined
        }
        transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
        style={{
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 50% 60%, rgba(240,120,30,0.42) 0%, rgba(231,111,81,0.28) 32%, rgba(200,60,20,0.12) 58%, rgba(200,60,20,0.03) 70%, transparent 82%)",
          transformOrigin: "50% 62%",
          ...distortStyle,
        }}
      />

      {/* Outer haze — very slow breathe, no distortion so the edge stays clean */}
      <motion.div
        className="absolute inset-0"
        animate={shouldAnimate ? { opacity: [0.38, 0.62, 0.38] } : undefined}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        style={{
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 50% 58%, rgba(233,196,106,0.20) 0%, rgba(233,196,106,0.07) 50%, transparent 78%)",
        }}
      />

    </div>
  );
}
