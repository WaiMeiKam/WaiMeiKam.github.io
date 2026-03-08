"use client";

import * as React from "react";
import { Adamina } from "next/font/google";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import { TorchCursor } from "@/components/features/TorchCursor";

const adamina = Adamina({ weight: "400", subsets: ["latin"], display: "swap" });

type SceneIllustration = {
  name: string;
  x: string;
  y: string;
  widthVw: number;
  rotation?: number;
  aspect: number;
};

type TextNode = {
  text: string;
  left: string;
  top: string;
};

type Scene = {
  id: string;
  illustrations: SceneIllustration[];
  textNodes: TextNode[];
};

const scenes: Scene[] = [
  {
    id: "void",
    illustrations: [
      { name: "origin-scene-01", x: "45vw", y: "42vh", widthVw: 40, rotation: -16.57, aspect: 0.602 },
    ],
    textNodes: [
      { text: "Before language.", left: "18vw", top: "22vh" },
      { text: "Before cities.", left: "68vw", top: "38vh" },
      { text: "Before everything we call civilisation\u00a0— there was darkness.", left: "18vw", top: "56vh" },
      { text: "Until one night, it started with a spark \uD83D\uDD25", left: "68vw", top: "82vh" },
    ],
  },
  {
    id: "fire",
    illustrations: [
      { name: "scene-2a", x: "-13vw", y: "-10vh", widthVw: 76, aspect: 0.590 },
      { name: "scene-2b", x: "44vw", y: "25vh", widthVw: 62, rotation: 2.47, aspect: 0.625 },
    ],
    textNodes: [
      { text: "Fire made the night survivable.", left: "16vw", top: "44vh" },
      { text: "It was an innovation\u00a0— a spark that set human evolution in motion.", left: "57vw", top: "73vh" },
    ],
  },
  {
    id: "gathering",
    illustrations: [
      { name: "scene-3a", x: "0", y: "9vh", widthVw: 44, aspect: 0.629 },
      { name: "scene-3b", x: "45vw", y: "28vh", widthVw: 54, aspect: 0.625 },
    ],
    textNodes: [
      { text: "Fire pulled us into circles and formed communities.", left: "11vw", top: "45vh" },
      { text: "By firelight we told our first stories and passed down thousands more.", left: "54vw", top: "74vh" },
    ],
  },
  {
    id: "chain",
    illustrations: [
      { name: "scene-4a", x: "-24vw", y: "20vh", widthVw: 94, aspect: 0.626 },
      { name: "scene-4b", x: "46vw", y: "20vh", widthVw: 46, aspect: 0.354 },
    ],
    textNodes: [
      { text: "Every maker and storyteller since has been passing the fire forward.", left: "16vw", top: "20vh" },
      { text: "New tools, new problems, new ways of telling the story.", left: "57vw", top: "41vh" },
      { text: "But the same ancient instinct. Make something, share it, keep the fire alive.", left: "16vw", top: "74vh" },
    ],
  },
];

// All illustration files are 2880×1800px Procreate exports.
// The drawings occupy only part of the canvas — transparent padding fills the rest.
// We use object-fit: cover with the Pencil rectangle aspect ratio to replicate
// Pencil's "fill" mode: crops the image to fill the container, showing only content.
function SceneIllustrationEl({ ill }: { ill: SceneIllustration }) {
  const [src, setSrc] = React.useState<string | null>(null);

  React.useEffect(() => {
    // scene-4b is a .gif; all others are .png
    const ext = ill.name === "scene-4b" ? "gif" : "png";
    setSrc(`/illustrations/${ill.name}.${ext}`);
  }, [ill.name]);

  if (!src) return null;

  return (
    <div
      className="pointer-events-none absolute overflow-hidden"
      style={{
        left: ill.x,
        top: ill.y,
        width: `${ill.widthVw}vw`,
        // Height derived from Pencil rectangle aspect ratio so cover-crop matches design
        height: `${ill.widthVw * ill.aspect}vw`,
        transform: ill.rotation ? `rotate(${ill.rotation}deg)` : undefined,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
      />
    </div>
  );
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

  const totalTexts = scene.textNodes.length;

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

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden"
    >
      {/* Illustrations — absolutely positioned, clipped by overflow-hidden */}
      {scene.illustrations.map((ill, i) => (
        <SceneIllustrationEl key={i} ill={ill} />
      ))}

      {/* Texts — absolutely positioned, revealed on scroll */}
      {scene.textNodes.map((node, idx) => {
        const isVisible = idx < visibleCount;
        const isNewest = isVisible && idx === visibleCount - 1;

        return (
          <motion.p
            key={`${scene.id}-t${idx}`}
            className="absolute max-w-[18rem] text-base font-medium leading-relaxed tracking-wide sm:max-w-xs sm:text-lg"
            style={{
              color: "var(--color-cream)",
              fontFamily: adamina.style.fontFamily,
              left: node.left,
              top: node.top,
            }}
            animate={
              !isVisible
                ? { opacity: 0, y: 6 }
                : isNewest && !reduceMotion
                  ? {
                      opacity: 1,
                      y: 0,
                      textShadow: [
                        "0 0 32px rgba(233,196,106,0.6)",
                        "0 0 24px rgba(233,196,106,0.3)",
                      ],
                    }
                  : {
                      opacity: 1,
                      y: 0,
                      textShadow: "0 0 24px rgba(233,196,106,0.3)",
                    }
            }
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {node.text}
          </motion.p>
        );
      })}
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
    window.dispatchEvent(new CustomEvent("introComplete"));
    onComplete();
  }

  function handleCTA(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
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
