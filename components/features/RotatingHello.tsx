"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const hellos = [
  { word: "Hello", lang: "en" },
  { word: "Bonjour", lang: "fr" },
  { word: "Hola", lang: "es" },
  { word: "你好", lang: "zh" },
  { word: "Ciao", lang: "it" },
];

export function RotatingHello() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % hellos.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const current = hellos[index];

  if (reduceMotion) {
    return (
      <span lang={current.lang} aria-live="polite" aria-atomic="true">
        {current.word}
      </span>
    );
  }

  return (
    <span
      aria-live="polite"
      aria-atomic="true"
      className="inline-block"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={current.word}
          lang={current.lang}
          initial={{ opacity: 0, y: "60%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-60%" }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {current.word}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
