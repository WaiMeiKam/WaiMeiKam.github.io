"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { cx, type ClassValue } from "@/lib/utils/cx";

export type ArticleCardProps = {
  href: string;
  title: string;
  teaser?: string;
  date?: string;
  tags?: string[];
  className?: ClassValue;
};

export function ArticleCard({
  href,
  title,
  teaser,
  date,
  tags,
  className,
}: ArticleCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <Link
      href={href}
      className={cx(
        "group block rounded-[var(--radius-lg)] outline-none",
        "focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--semantic-background)]",
        className,
      )}
    >
      <motion.article
        className={cx(
          "border-b border-black/5 py-6 transition-colors duration-200",
          "group-hover:border-[var(--semantic-primary)]/20",
        )}
        whileHover={reduceMotion ? undefined : { x: 6 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h2
              className={cx(
                "text-lg font-semibold text-[var(--semantic-heading)] transition-colors duration-200 sm:text-xl",
                "group-hover:text-[var(--semantic-primary)]",
              )}
            >
              {title}
              <span className="ml-2 inline-block opacity-0 transition-opacity duration-200 group-hover:opacity-60">
                →
              </span>
            </h2>
            {teaser && (
              <p className="mt-1.5 text-sm leading-relaxed opacity-70 sm:text-base">
                {teaser}
              </p>
            )}
            {tags && tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-[var(--radius-full)] bg-black/5 px-2.5 py-0.5 text-xs font-medium opacity-60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          {date && (
            <time
              dateTime={date}
              className="shrink-0 text-sm tabular-nums opacity-50"
            >
              {formatDate(date)}
            </time>
          )}
        </div>
      </motion.article>
    </Link>
  );
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-AU", {
      year: "numeric",
      month: "short",
    });
  } catch {
    return dateStr;
  }
}
