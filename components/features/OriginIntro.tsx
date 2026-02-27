"use client";

import * as React from "react";
import { Adamina } from "next/font/google";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import { IllustrationSpot } from "@/components/illustrations/IllustrationSpot";
import { TorchCursor } from "@/components/features/TorchCursor";

const adamina = Adamina({ weight: "400", subsets: ["latin"], display: "swap" });

const ILL_WIDTH = 480;
const ILL_ASPECT = 0.625;
/** Explicit width for intro illustrations — prevents collapsing to small size */
const INTRO_ILL_WIDTH = "min(640px, 55vw)";

type TextPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "center";

type SceneColumn = {
  illustration: string;
  textsAbove: string[];
  textsBelow: string[];
};

type Scene = {
  id: string;
  columns: SceneColumn[];
  centerText?: string;
  textPositions?: TextPosition[];
};

const PADDING = "5vw";

const positionStyles: Record<
  TextPosition,
  React.CSSProperties
> = {
  "top-left": { top: PADDING, left: PADDING, textAlign: "left" },
  "top-right": { top: PADDING, right: PADDING, textAlign: "right" },
  "bottom-left": { bottom: PADDING, left: PADDING, textAlign: "left" },
  "bottom-right": { bottom: PADDING, right: PADDING, textAlign: "right" },
  center: {
    left: "50%",
    bottom: PADDING,
    textAlign: "center",
  },
};

const scenes: Scene[] = [
  {
    id: "void",
    columns: [
      {
        illustration: "origin-scene-01",
        textsAbove: [
          "Before language.",
          "Before cities.",
          "Before everything we call civilisation\u00a0— there was darkness.",
        ],
        textsBelow: [
          "Until one night, it started with a spark.",
        ],
      },
    ],
    textPositions: ["top-left", "top-right", "bottom-left", "bottom-right"],
  },
  {
    id: "fire",
    columns: [
      {
        illustration: "scene-2a",
        textsAbove: ["Fire made the night survivable."],
        textsBelow: [],
      },
      {
        illustration: "scene-2b",
        textsAbove: [
          "It was an innovation\u00a0— a spark that set human evolution in motion.",
        ],
        textsBelow: [],
      },
    ],
    textPositions: ["top-left", "top-right"],
  },
  {
    id: "gathering",
    columns: [
      {
        illustration: "scene-3a",
        textsAbove: ["Fire pulled us into circles and formed communities."],
        textsBelow: [],
      },
      {
        illustration: "scene-3b",
        textsAbove: [
          "By firelight we told our first stories and passed down thousands more.",
        ],
        textsBelow: [],
      },
    ],
    textPositions: ["top-left", "top-right"],
  },
  {
    id: "chain",
    columns: [
      {
        illustration: "scene-4a",
        textsAbove: [
          "Every maker and storyteller since has been passing the fire forward.",
        ],
        textsBelow: [],
      },
      {
        illustration: "scene-4b",
        textsAbove: [
          "New tools, new problems, new ways of telling the story.",
        ],
        textsBelow: [],
      },
    ],
    centerText:
      "But the same ancient instinct. Make something, share it, keep the fire alive.",
    textPositions: ["top-left", "top-right", "center"],
  },
];

function countTexts(scene: Scene): number {
  let n = 0;
  for (const col of scene.columns) {
    n += col.textsAbove.length + col.textsBelow.length;
  }
  if (scene.centerText) n++;
  return n;
}

const textClass =
  "absolute max-w-[18rem] text-base font-medium leading-relaxed tracking-wide sm:max-w-xs sm:text-lg";

function getTextPosition(
  scene: Scene,
  idx: number
): TextPosition {
  return scene.textPositions?.[idx] ?? "center";
}

function SceneSection({
  scene,
  scrollTop,
  reduceMotion,
}: {
  scene: Scene;
  scrollTop: number;
  reduceMotion: boolean | null;
}) {
  const sectionRef = React.useRef<HTMLElement>(null);
  const [visibleCount, setVisibleCount] = React.useState(0);

  const totalTexts = countTexts(scene);

  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const sectionTop = el.offsetTop;
    const sectionHeight = el.offsetHeight;

    const scrollIntoSection = scrollTop - sectionTop + sectionHeight * 0.45;
    const progress = Math.max(0, Math.min(1, scrollIntoSection / sectionHeight));
    const count = Math.min(
      totalTexts,
      Math.floor(progress * (totalTexts + 0.5)),
    );

    setVisibleCount((prev) => Math.max(prev, count));
  }, [scrollTop, totalTexts]);

  let runningIdx = 0;

  const allTexts: string[] = [];
  for (const col of scene.columns) {
    allTexts.push(...col.textsAbove, ...col.textsBelow);
  }
  if (scene.centerText) allTexts.push(scene.centerText);

  function renderText(text: string) {
    const idx = runningIdx++;
    const isVisible = idx < visibleCount;
    const isNewest = isVisible && idx === visibleCount - 1;
    const pos = getTextPosition(scene, idx);
    const centerOffset = pos === "center" ? { x: "-50%" as const } : {};

    return (
      <motion.p
        key={`${scene.id}-t${idx}`}
        className={textClass}
        style={{
          color: "var(--color-cream)",
          fontFamily: adamina.style.fontFamily,
          ...positionStyles[pos],
        }}
        animate={
          !isVisible
            ? { opacity: 0, y: 6, ...centerOffset }
            : isNewest && !reduceMotion
              ? {
                  opacity: 1,
                  y: 0,
                  ...centerOffset,
                  textShadow: [
                    "0 0 32px rgba(233,196,106,0.6)",
                    "0 0 24px rgba(233,196,106,0.3)",
                  ],
                }
              : {
                  opacity: 1,
                  y: 0,
                  ...centerOffset,
                  textShadow: "0 0 24px rgba(233,196,106,0.3)",
                }
        }
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {text}
      </motion.p>
    );
  }

  const isDual = scene.columns.length > 1;
  const illMaxWidth = isDual ? "40vw" : "50vw";

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 py-14"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        {allTexts.map((t) => renderText(t))}
      </div>

      <div
        className={
          isDual
            ? "flex w-full max-w-5xl items-start justify-center gap-10 sm:gap-14"
            : "flex flex-col items-center gap-4"
        }
      >
        {scene.columns.map((col, colIdx) => (
          <div
            key={colIdx}
            className="flex flex-col items-center gap-3"
            style={{ maxWidth: illMaxWidth }}
          >
            <div
              className="pointer-events-none"
              style={{ width: INTRO_ILL_WIDTH, minWidth: 280 }}
            >
              <IllustrationSpot
                name={col.illustration}
                alt=""
                width={640}
                height={Math.round(640 * ILL_ASPECT)}
                breathing={!reduceMotion}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

type OriginIntroProps = {
  onComplete: (options?: {
    fireBurst?: boolean;
    originX?: number;
    originY?: number;
  }) => void;
};

export function OriginIntro({ onComplete }: OriginIntroProps) {
  const [skipVisible, setSkipVisible] = React.useState(false);
  const [ctaVisible, setCtaVisible] = React.useState(false);
  const [scrollTop, setScrollTop] = React.useState(0);
  const ctaSentinelRef = React.useRef<HTMLDivElement>(null);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    function onScroll() {
      setScrollTop(container!.scrollTop);
    }
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const container = scrollContainerRef.current;
    const el = ctaSentinelRef.current;
    if (!el || !container) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setCtaVisible(true);
      },
      { root: container, threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const timer = setTimeout(() => setSkipVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  function handleSkip() {
    try {
      localStorage.setItem("hasSeenIntro", "true");
    } catch {
      /* localStorage may be unavailable */
    }
    // BUG 4 fix: signal NavBar to reappear
    window.dispatchEvent(new CustomEvent("introComplete"));
    onComplete();
  }

  function handleCTA(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    // BUG 4 fix: mark seen + signal NavBar (was missing from CTA path)
    try {
      localStorage.setItem("hasSeenIntro", "true");
    } catch {
      /* localStorage may be unavailable */
    }
    window.dispatchEvent(new CustomEvent("introComplete"));
    onComplete({
      fireBurst: true,
      originX: rect.left + rect.width / 2,
      originY: rect.top + rect.height / 2,
    });
  }

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-black"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Scrollable scene content */}
      <div
        ref={scrollContainerRef}
        aria-hidden="true"
        className="relative h-full overflow-y-auto"
        style={{ zIndex: 1, scrollbarWidth: "none" }}
      >
        {scenes.map((scene) => (
          <SceneSection
            key={scene.id}
            scene={scene}
            scrollTop={scrollTop}
            reduceMotion={reduceMotion}
          />
        ))}

        {/* Sentinel — triggers CTA when scrolled into view */}
        <div ref={ctaSentinelRef} className="h-[20vh]" aria-hidden="true" />
      </div>

      {/* Torch overlay */}
      <TorchCursor />

      {/* CTA — above torch overlay */}
      <AnimatePresence>
        {ctaVisible && (
          <motion.div
            className="fixed inset-x-0 bottom-0 flex flex-col items-center justify-center gap-6 pb-16 pt-10"
            style={{
              zIndex: 15,
              pointerEvents: "auto",
              background:
                "linear-gradient(to top, rgba(0,0,0,0.92) 60%, transparent 100%)",
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p
              className="text-center text-lg font-medium tracking-wide sm:text-xl"
              style={{ color: "var(--color-gold)" }}
            >
              The fire doesn&rsquo;t stop here.
            </p>
            <button
              onClick={handleCTA}
              className="cursor-pointer rounded-full px-8 py-3 text-base font-semibold tracking-wide sm:text-lg"
              style={{
                pointerEvents: "auto",
                backgroundColor: "var(--color-gold)",
                color: "#1a0a00",
                boxShadow:
                  "0 0 32px rgba(233,196,106,0.5), 0 0 8px rgba(233,196,106,0.3)",
              }}
            >
              Make your first spark &rarr;
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip button — above torch layer */}
      <AnimatePresence>
        {skipVisible && (
          <motion.button
            onClick={handleSkip}
            className="fixed right-6 top-6 cursor-pointer rounded-md px-4 py-2 text-sm font-medium tracking-wide"
            style={{
              color: "var(--color-cream)",
              zIndex: 20,
              pointerEvents: "auto",
              backgroundColor: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ opacity: 1 }}
            aria-label="Skip intro"
          >
            Skip
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
