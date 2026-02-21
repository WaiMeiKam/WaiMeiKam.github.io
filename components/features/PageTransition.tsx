"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

const variants = {
  enter: { opacity: 0, y: 12, filter: "blur(4px)" },
  center: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -8, filter: "blur(4px)" },
};

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={reduceMotion ? undefined : variants}
        initial={reduceMotion ? undefined : "enter"}
        animate={reduceMotion ? undefined : "center"}
        exit={reduceMotion ? undefined : "exit"}
        transition={{
          duration: 0.28,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className="min-h-[calc(100vh-56px)]"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
