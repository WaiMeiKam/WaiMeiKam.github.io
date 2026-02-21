"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { cx, type ClassValue } from "@/lib/utils/cx";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";

export type ProjectCardProps = {
  slug: string;
  title: string;
  teaser?: string;
  locked?: boolean;
  className?: ClassValue;
};

export function ProjectCard({
  slug,
  title,
  teaser,
  locked = false,
  className,
}: ProjectCardProps) {
  const reduceMotion = useReducedMotion();

  const content = (
    <motion.div
      whileHover={
        reduceMotion || locked
          ? undefined
          : { y: -3, scale: 1.01, boxShadow: "0 8px 24px -4px rgba(0,0,0,0.12)" }
      }
      whileTap={reduceMotion || locked ? undefined : { scale: 0.985 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <Card
        className={cx(
          "transition-[ring-color] duration-200",
          locked ? "opacity-80" : "group-hover:ring-1 group-hover:ring-[var(--semantic-glow)]/30",
          className,
        )}
      >
        <CardHeader className="pb-6">
          <div className="flex items-start gap-3">
            <div className="min-w-0">
              <CardTitle className="text-base sm:text-lg">{title}</CardTitle>
              {teaser ? <CardDescription>{teaser}</CardDescription> : null}
            </div>
            <div className="ml-auto flex shrink-0 items-center">
              {locked ? (
                <span
                  className={cx(
                    "inline-flex items-center rounded-[var(--radius-full)] px-3 py-1 text-xs font-semibold",
                    "bg-black/5 text-[var(--semantic-heading)]",
                  )}
                >
                  Locked
                </span>
              ) : (
                <span className="text-xs font-semibold opacity-60 transition-opacity duration-200 group-hover:opacity-100">
                  Read case study →
                </span>
              )}
            </div>
          </div>
          {locked ? (
            <p className="mt-4 text-sm opacity-70">
              I can&rsquo;t share details publicly, but I&rsquo;m happy to chat through it.
            </p>
          ) : null}
        </CardHeader>
      </Card>
    </motion.div>
  );

  if (locked) return content;

  return (
    <Link
      href={`/tinkered-and-delivered/${slug}`}
      className="group block rounded-[var(--radius-lg)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--semantic-background)]"
    >
      {content}
    </Link>
  );
}
