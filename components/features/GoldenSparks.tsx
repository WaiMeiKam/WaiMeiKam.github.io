"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

const SPARK_COUNT = 12;

type Spark = {
  id: number;
  left: string;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
};

function generateSparks(): Spark[] {
  return Array.from({ length: SPARK_COUNT }, (_, i) => ({
    id: i,
    left: `${20 + Math.random() * 60}%`,
    size: 2 + Math.random() * 3,
    delay: Math.random() * 6,
    duration: 4 + Math.random() * 5,
    opacity: 0.25 + Math.random() * 0.35,
  }));
}

export function GoldenSparks() {
  const reduceMotion = useReducedMotion();
  const [sparks] = React.useState(generateSparks);

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
            left: spark.left,
            bottom: "30%",
            width: spark.size,
            height: spark.size,
            backgroundColor: "var(--color-gold)",
          }}
          animate={{
            y: [0, -180 - Math.random() * 120],
            x: [0, (Math.random() - 0.5) * 40],
            opacity: [0, spark.opacity, spark.opacity, 0],
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
