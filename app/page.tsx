"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

import { IllustrationSpot } from "@/components/illustrations/IllustrationSpot";
import { NavCard } from "@/components/ui/NavCard";
import { AudioToggle } from "@/components/features/AudioToggle";
import { CurrentlyListening } from "@/components/features/CurrentlyListening";
import { GoldenSparks } from "@/components/features/GoldenSparks";
import { useAudio } from "@/lib/hooks/useAudio";

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

  const motionProps = reduceMotion
    ? {}
    : { variants: stagger, initial: "hidden", animate: "show" };

  const itemProps = reduceMotion ? {} : { variants: fadeUp };
  const fadeProps = reduceMotion ? {} : { variants: fadeIn };

  return (
    <main id="main-content" className="relative min-h-screen overflow-hidden bg-[var(--semantic-background)] text-[var(--semantic-text)] px-6 py-14 sm:py-16">
      <HomepageGlow />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 70%, rgba(38,70,83,0.10) 0%, transparent 55%)",
        }}
      />

      <GoldenSparks />

      <motion.div
        className="relative mx-auto flex w-full max-w-5xl flex-col items-center"
        {...motionProps}
      >
        <motion.header className="w-full text-center" {...itemProps}>
          <p className="text-sm font-semibold uppercase tracking-wide opacity-75">
            Kim&rsquo;s World
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[var(--semantic-heading)] sm:text-6xl">
            Principal Product Designer.
            <br className="hidden sm:block" /> Storyteller. Pineapple-on-pizza defender.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base opacity-75 sm:text-lg">
            A cosy little hub for my work, thoughts, and whatever I&rsquo;m noodling on lately.
          </p>
        </motion.header>

        <motion.div className="mt-10 w-full max-w-sm sm:max-w-md" {...itemProps}>
          <IllustrationSpot
            name="hero-campfire"
            alt="Kim sitting by a campfire"
            width={900}
            height={900}
            priority
            className="shadow-[var(--shadow-glow)]"
          />
        </motion.div>

        <motion.div
          className="mt-6 flex flex-wrap items-center justify-center gap-3"
          {...fadeProps}
        >
          <AudioToggle />
          <CurrentlyListening
            track="Campfire Dreams"
            artist="Lo-fi Mixtape"
            href="https://open.spotify.com"
          />
        </motion.div>

        <motion.nav
          aria-label="Explore Kim's World"
          className="mt-10 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2"
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
            <IllustrationSpot name="footer-wave" alt="" width={440} height={260} />
          </div>
          <p className="mt-3">Built with care.</p>
        </motion.footer>
      </motion.div>
    </main>
  );
}
