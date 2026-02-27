"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

const SPARK_COUNT = 20;

type AmbientSpark = {
  id: number;
  left: string;
  bottom: string;
  size: number;
  delay: number;
  duration: number;
  driftX: number;
  riseY: number;
  opacity: number;
};

function makeAmbientSparks(): AmbientSpark[] {
  return Array.from({ length: SPARK_COUNT }, (_, i) => ({
    id: i,
    left: `${5 + Math.random() * 90}%`,
    bottom: `${Math.random() * 40}%`,
    size: 1 + Math.random() * 2,
    delay: Math.random() * 12,
    duration: 6 + Math.random() * 8,
    driftX: (Math.random() - 0.5) * 30,
    riseY: 60 + Math.random() * 100,
    opacity: 0.12 + Math.random() * 0.20,
  }));
}

export function AmbientSparks() {
  const reduceMotion = useReducedMotion();
  const [sparks] = React.useState(makeAmbientSparks);

  if (reduceMotion) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {sparks.map((spark) => (
        <motion.span
          key={spark.id}
          className="absolute rounded-full"
          style={{
            width: spark.size,
            height: spark.size,
            left: spark.left,
            bottom: spark.bottom,
            backgroundColor: "var(--color-gold)",
          }}
          animate={{
            y: [0, -(spark.riseY)],
            x: [0, spark.driftX],
            opacity: [0, spark.opacity, spark.opacity * 0.6, 0],
          }}
          transition={{
            duration: spark.duration,
            delay: spark.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
