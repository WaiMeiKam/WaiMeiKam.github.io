"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { cx, type ClassValue } from "@/lib/utils/cx";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";

export type NavCardProps = {
  href: string;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  className?: ClassValue;
};

export function NavCard({ href, title, subtitle, eyebrow, className }: NavCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <Link
      href={href}
      className={cx(
        "group block outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--semantic-background)] rounded-[var(--radius-lg)]",
        className,
      )}
    >
      <motion.div
        className="rounded-[var(--radius-lg)] overflow-hidden"
        whileHover={
          reduceMotion
            ? undefined
            : {
                y: -3,
                boxShadow:
                  "0 10px 28px -6px rgba(38,70,83,0.16), 0 0 0 1.5px rgba(233,196,106,0.35)",
              }
        }
        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
      >
        <Card
          style={{ backgroundColor: "white" }}
          className="h-full ring-1 ring-black/[0.06] shadow-[0_1px_3px_0_rgba(0,0,0,0.06)]"
        >
          <CardHeader className="pb-6">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                {eyebrow ? (
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide opacity-50">
                    {eyebrow}
                  </p>
                ) : null}
                <CardTitle className="text-base sm:text-lg transition-colors duration-200 group-hover:text-[var(--semantic-primary)]">
                  {title}
                </CardTitle>
                {subtitle ? <CardDescription>{subtitle}</CardDescription> : null}
              </div>
              <span
                className="mt-0.5 shrink-0 text-base text-[var(--semantic-heading)] opacity-25 transition-all duration-300 group-hover:opacity-60 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </div>
          </CardHeader>
        </Card>
      </motion.div>
    </Link>
  );
}
