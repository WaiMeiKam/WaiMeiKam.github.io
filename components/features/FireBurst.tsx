"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const SPARK_COUNT = 24;
const DEEP_CRIMSON = "#8B1A00";

type SparkParticle = {
  id: number;
  angle: number;
  distance: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
};

function generateSparkBurst(): SparkParticle[] {
  return Array.from({ length: SPARK_COUNT }, (_, i) => {
    const angle = (Math.PI * 2 * i) / SPARK_COUNT + (Math.random() - 0.5) * 0.4;
    return {
      id: i,
      angle,
      distance: 200 + Math.random() * 400,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 0.3,
      duration: 0.6 + Math.random() * 0.6,
      opacity: 0.5 + Math.random() * 0.5,
    };
  });
}

type FireBurstProps = {
  originX?: number;
  originY?: number;
  onComplete: () => void;
};

export function FireBurst({
  originX,
  originY,
  onComplete,
}: FireBurstProps) {
  const reduceMotion = useReducedMotion();
  const [sparks] = React.useState(generateSparkBurst);
  const [phase, setPhase] = React.useState<"burst" | "fade" | "done">("burst");

  const cx = originX ?? (typeof window !== "undefined" ? window.innerWidth / 2 : 960);
  const cy = originY ?? (typeof window !== "undefined" ? window.innerHeight / 2 : 540);

  React.useEffect(() => {
    try {
      localStorage.setItem("hasSeenIntro", "true");
    } catch {
      // localStorage may be unavailable in some contexts
    }
  }, []);

  React.useEffect(() => {
    if (phase === "done") {
      onComplete();
    }
  }, [phase, onComplete]);

  if (reduceMotion) {
    return (
      <AnimatePresence>
        {phase !== "done" && (
          <motion.div
            className="fixed inset-0 z-[250] bg-black"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onAnimationComplete={() => setPhase("done")}
          />
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[250]"
          initial={{ opacity: 1 }}
          animate={phase === "fade" ? { opacity: 0 } : { opacity: 1 }}
          transition={phase === "fade" ? { duration: 0.6, ease: "easeOut" } : {}}
          onAnimationComplete={() => {
            if (phase === "fade") setPhase("done");
          }}
        >
          {/* Radial fire gradient expanding from origin */}
          <motion.div
            className="absolute inset-0"
            initial={{
              background: `radial-gradient(circle 0px at ${cx}px ${cy}px, var(--color-gold) 0%, var(--color-rosepink) 40%, ${DEEP_CRIMSON} 80%, black 100%)`,
            }}
            animate={{
              background: [
                `radial-gradient(circle 0px at ${cx}px ${cy}px, var(--color-gold) 0%, var(--color-rosepink) 40%, ${DEEP_CRIMSON} 80%, black 100%)`,
                `radial-gradient(circle 600px at ${cx}px ${cy}px, var(--color-gold) 0%, var(--color-rosepink) 40%, ${DEEP_CRIMSON} 80%, black 100%)`,
                `radial-gradient(circle 2000px at ${cx}px ${cy}px, var(--color-gold) 0%, var(--color-rosepink) 35%, ${DEEP_CRIMSON} 70%, ${DEEP_CRIMSON} 100%)`,
              ],
            }}
            transition={{ duration: 1.0, ease: "easeOut", times: [0, 0.5, 1] }}
            onAnimationComplete={() => {
              if (phase === "burst") setPhase("fade");
            }}
          />

          {/* SparkBurst — particles radiate outward from the origin */}
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            aria-hidden="true"
          >
            {sparks.map((spark) => {
              const dx = Math.cos(spark.angle) * spark.distance;
              const dy = Math.sin(spark.angle) * spark.distance;

              return (
                <motion.span
                  key={spark.id}
                  className="absolute rounded-full"
                  style={{
                    left: cx,
                    top: cy,
                    width: spark.size,
                    height: spark.size,
                    backgroundColor: "var(--color-gold)",
                    marginLeft: -spark.size / 2,
                    marginTop: -spark.size / 2,
                  }}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
                  animate={{
                    x: dx,
                    y: dy,
                    opacity: [0, spark.opacity, spark.opacity, 0],
                    scale: [0.5, 1.2, 0.8, 0],
                  }}
                  transition={{
                    duration: spark.duration,
                    delay: spark.delay,
                    ease: "easeOut",
                  }}
                />
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
