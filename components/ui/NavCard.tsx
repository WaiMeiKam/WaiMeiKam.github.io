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
        whileHover={
          reduceMotion
            ? undefined
            : { y: -4, scale: 1.015, boxShadow: "0 0 40px 14px rgba(233,196,106,0.35)" }
        }
        whileTap={reduceMotion ? undefined : { scale: 0.985 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <Card
          className={cx(
            "h-full transition-[box-shadow,ring-color] duration-200",
            "group-hover:ring-1 group-hover:ring-[var(--semantic-glow)]/30",
          )}
        >
          <CardHeader className="pb-6">
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-wide opacity-60">
                {eyebrow}
              </p>
            ) : null}
            <CardTitle className="text-base sm:text-lg transition-colors duration-200 group-hover:text-[var(--semantic-primary)]">
              {title}
            </CardTitle>
            {subtitle ? <CardDescription>{subtitle}</CardDescription> : null}
          </CardHeader>
        </Card>
      </motion.div>
    </Link>
  );
}
