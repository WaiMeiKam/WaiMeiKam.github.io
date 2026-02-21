"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

import { cx } from "@/lib/utils/cx";
import { PollCard } from "@/components/features/PollCard";
import { Button } from "@/components/ui/Button";
import { IllustrationSpot } from "@/components/illustrations/IllustrationSpot";

type Poll = {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
  kimsAnswer: "a" | "b";
  quip?: string;
};

type PollGameProps = {
  polls: Poll[];
};

const cardVariants = {
  enter: { opacity: 0, x: 60, scale: 0.97 },
  center: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -60, scale: 0.97 },
};

export function PollGame({ polls }: PollGameProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<number, "a" | "b">>({});
  const [canAdvance, setCanAdvance] = React.useState(false);

  const isFinished = currentIndex >= polls.length;
  const poll = polls[currentIndex] as Poll | undefined;
  const progress = Math.min(Object.keys(answers).length, polls.length);
  const matchCount = Object.entries(answers).filter(
    ([idx, answer]) => polls[Number(idx)]?.kimsAnswer === answer,
  ).length;

  function handleAnswered(selection: "a" | "b") {
    setAnswers((prev) => ({ ...prev, [currentIndex]: selection }));
    setCanAdvance(true);
  }

  function handleNext() {
    setCanAdvance(false);
    setCurrentIndex((i) => i + 1);
  }

  function handleRestart() {
    setCurrentIndex(0);
    setAnswers({});
    setCanAdvance(false);
  }

  return (
    <div className="flex w-full flex-col items-center">
      {/* Progress bar */}
      <div className="mb-8 w-full max-w-lg" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={polls.length} aria-label={`Poll ${progress} of ${polls.length}`}>
        <div className="flex items-center justify-between text-sm opacity-75 mb-2">
          <span>{progress} of {polls.length}</span>
          {!isFinished && <span>{polls.length - progress} to go</span>}
        </div>
        <div className="h-2 w-full overflow-hidden rounded-[var(--radius-full)] bg-black/5">
          <motion.div
            className="h-full rounded-[var(--radius-full)] bg-[var(--semantic-primary)]"
            initial={{ width: 0 }}
            animate={{ width: `${(progress / polls.length) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Poll cards / End screen */}
      <div className="relative w-full max-w-lg" style={{ minHeight: 320 }}>
        <AnimatePresence mode="wait">
          {!isFinished && poll ? (
            <motion.div
              key={poll.id}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <PollCard
                question={poll.question}
                optionA={poll.optionA}
                optionB={poll.optionB}
                kimsAnswer={poll.kimsAnswer}
                quip={poll.quip}
                reactionIllustrationName={
                  answers[currentIndex]
                    ? answers[currentIndex] === poll.kimsAnswer
                      ? "poll-reaction-yes"
                      : "poll-reaction-no"
                    : undefined
                }
                onAnswered={handleAnswered}
              />

              {canAdvance && (
                <motion.div
                  className="mt-6 flex justify-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Button onClick={handleNext} variant="primary" size="lg">
                    {currentIndex < polls.length - 1 ? "Next question →" : "See results →"}
                  </Button>
                </motion.div>
              )}
            </motion.div>
          ) : isFinished ? (
            <motion.div
              key="results"
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="text-center"
            >
              <EndScreen
                matchCount={matchCount}
                totalCount={polls.length}
                onRestart={handleRestart}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

function EndScreen({
  matchCount,
  totalCount,
  onRestart,
}: {
  matchCount: number;
  totalCount: number;
  onRestart: () => void;
}) {
  const percentage = Math.round((matchCount / totalCount) * 100);

  const { headline, message } = React.useMemo(() => {
    if (percentage >= 80) {
      return {
        headline: "Kindred spirit!",
        message: "We're practically the same person. Pull up a seat by the campfire.",
      };
    }
    if (percentage >= 50) {
      return {
        headline: "Pretty aligned!",
        message: "We've got heaps in common. Enough to have a good yarn over laksa.",
      };
    }
    if (percentage >= 30) {
      return {
        headline: "Interesting mix!",
        message: "Different perspectives make for the best conversations, I reckon.",
      };
    }
    return {
      headline: "Opposites attract!",
      message: "We clearly see the world differently — but hey, at least we can argue about pineapple on pizza.",
    };
  }, [percentage]);

  return (
    <div className={cx(
      "rounded-[var(--radius-lg)] bg-[var(--semantic-surface)] p-8 sm:p-10",
      "shadow-[var(--shadow-md)] ring-1 ring-black/5",
    )}>
      <div className="mx-auto mb-6 w-32">
        <IllustrationSpot
          name={percentage >= 50 ? "poll-reaction-yes" : "poll-reaction-no"}
          alt=""
          width={256}
          height={256}
        />
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 20 }}
      >
        <p className="text-5xl font-bold text-[var(--semantic-heading)]">
          {matchCount}/{totalCount}
        </p>
      </motion.div>

      <h2 className="mt-4 text-2xl font-bold text-[var(--semantic-heading)]">
        {headline}
      </h2>
      <p className="mt-2 text-base opacity-75">{message}</p>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Button variant="ghost" size="md" onClick={onRestart}>
          Play again
        </Button>
        <Button
          variant="primary"
          size="md"
          onClick={() => window.location.assign("/")}
        >
          Keep exploring →
        </Button>
      </div>
    </div>
  );
}
