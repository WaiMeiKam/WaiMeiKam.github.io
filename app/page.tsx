"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import { IllustrationSpot } from "@/components/illustrations/IllustrationSpot";
import { NavCard } from "@/components/ui/NavCard";
import { AudioToggle } from "@/components/features/AudioToggle";
import { CampfireGlow } from "@/components/features/CampfireGlow";
import { OriginIntro } from "@/components/features/OriginIntro";
import { FireBurst } from "@/components/features/FireBurst";
import { RotatingHello } from "@/components/features/RotatingHello";
import { useAudio } from "@/lib/hooks/useAudio";
import { useIntro } from "@/lib/context/IntroContext";

const navCards = [
  {
    href: "/get-to-know-kim",
    title: "Get to Know Kim",
    subtitle: "A game of polls",
  },
  {
    href: "/thinking-about",
    title: "What I'm Thinking About",
    subtitle: "Stories and ideas",
  },
  {
    href: "/noodling-on",
    title: "What I'm Noodling On",
    subtitle: "Always making things",
  },
  {
    href: "/tinkered-and-delivered",
    title: "What I've Tinkered and Delivered",
    subtitle: "The work",
  },
];

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

function HomepageGlow() {
  const { isPlaying } = useAudio();
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <motion.div
      className="pointer-events-none absolute inset-0"
      animate={
        isPlaying
          ? { opacity: [0.85, 1, 0.85] }
          : { opacity: 1 }
      }
      transition={
        isPlaying
          ? { duration: 4, repeat: Infinity, ease: "easeInOut" }
          : { duration: 0.6 }
      }
      style={{
        background:
          "radial-gradient(circle at 50% 32%, rgba(233,196,106,0.50) 0%, rgba(233,196,106,0.16) 22%, transparent 60%)",
      }}
    />
  );
}

export default function Home() {
  const reduceMotion = useReducedMotion();
  const { setIntroActive } = useIntro();
  const [showIntro, setShowIntro] = React.useState(false);
  const [fireBurst, setFireBurst] = React.useState<{
    originX?: number;
    originY?: number;
  } | null>(null);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    try {
      const shouldShow = !localStorage.getItem("hasSeenIntro");
      setShowIntro(shouldShow);
      setIntroActive(shouldShow);
    } catch {
      /* localStorage may be unavailable */
    }
    return () => setIntroActive(false);
  }, [setIntroActive]);

  React.useEffect(() => {
    setIntroActive(showIntro);
  }, [showIntro, setIntroActive]);

  React.useEffect(() => {
    function onScroll() {
      if (window.scrollY > 80) setScrolled(true);
    }
    if (window.scrollY > 80) setScrolled(true);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleIntroComplete = React.useCallback(
    (options?: {
      fireBurst?: boolean;
      originX?: number;
      originY?: number;
    }) => {
      setShowIntro(false);
      if (options?.fireBurst) {
        setFireBurst({
          originX: options.originX,
          originY: options.originY,
        });
      }
    },
    [],
  );

  const motionProps = reduceMotion
    ? {}
    : { variants: stagger, initial: "hidden", animate: "show" };

  const itemProps = reduceMotion ? {} : { variants: fadeUp };
  const fadeProps = reduceMotion ? {} : { variants: fadeIn };

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <OriginIntro key="origin-intro" onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      {fireBurst && (
        <FireBurst
          originX={fireBurst.originX}
          originY={fireBurst.originY}
          onComplete={() => setFireBurst(null)}
        />
      )}

      <main id="main-content" className="relative min-h-screen overflow-hidden bg-[var(--semantic-background)] text-[var(--semantic-text)] px-6 py-14 sm:py-16">
        <HomepageGlow />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 70%, rgba(38,70,83,0.10) 0%, transparent 55%)",
        }}
      />

      <motion.div
        className="relative mx-auto flex w-full max-w-5xl flex-col items-center"
        {...motionProps}
      >
        <motion.header className="w-full text-center" {...itemProps}>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[var(--semantic-heading)] sm:text-6xl">
            <RotatingHello /> I&rsquo;m Kim.
          </h1>
          <h2 className="mt-2 text-xl font-bold tracking-tight text-[var(--semantic-text)] opacity-80 sm:text-2xl">
            Storyteller. Systems thinker. Curator.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base opacity-75 sm:text-lg">
            A fireside for my work, thoughts, and whatever I&rsquo;m noodling on lately.
          </p>
        </motion.header>

        <motion.div className="mt-10 w-full max-w-sm sm:max-w-md" {...itemProps}>
          <CampfireGlow />
        </motion.div>

        <motion.div
          className="mt-4 flex items-center justify-center"
          {...fadeProps}
        >
          <AudioToggle track="Campfire Dreams" artist="Lo-fi Mixtape" />
        </motion.div>

        <motion.nav
          id="explore"
          aria-label="Explore Kim's World"
          className="mt-8 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2"
          {...motionProps}
        >
          {navCards.map((card) => (
            <motion.div key={card.href} {...itemProps}>
              <NavCard href={card.href} title={card.title} subtitle={card.subtitle} />
            </motion.div>
          ))}
        </motion.nav>

        <motion.footer className="mt-12 text-center text-sm opacity-75" {...fadeProps}>
          <div className="mx-auto w-full max-w-[220px] opacity-90">
            <IllustrationSpot
              name="origin-scene-01"
              alt="Kim's World handprint logo"
              width={512}
              height={320}
            />
          </div>
          <p className="mt-3">Built with care.</p>
        </motion.footer>
      </motion.div>

        {/* Fixed scroll CTA — visible on landing, hides after scrolling or clicking */}
        <AnimatePresence>
          {!scrolled && !reduceMotion && (
            <motion.a
              key="scroll-cta"
              href="#explore"
              onClick={() => setScrolled(true)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8, transition: { duration: 0.3 } }}
              transition={{ delay: 1.4, duration: 0.5, ease: "easeOut" }}
              aria-label="Scroll down to explore"
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-[var(--semantic-heading)] opacity-40 hover:opacity-75 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2 rounded-sm"
            >
              <span className="text-[10px] font-semibold uppercase tracking-widest">
                Explore
              </span>
              <motion.span
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
                className="text-sm"
              >
                ↓
              </motion.span>
            </motion.a>
          )}
        </AnimatePresence>
    </main>
    </>
  );
}
