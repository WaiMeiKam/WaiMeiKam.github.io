"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

import { pageTransition as variants, duration } from "@/lib/motion";

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
          duration: duration.page,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className="min-h-[calc(100vh-56px)]"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
