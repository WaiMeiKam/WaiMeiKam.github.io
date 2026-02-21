import * as React from "react";

import { cx, type ClassValue } from "@/lib/utils/cx";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { className?: ClassValue }) {
  return (
    <div
      className={cx(
        "rounded-[var(--radius-lg)] bg-[var(--semantic-surface)] text-[var(--semantic-text)] shadow-[var(--shadow-sm)]",
        "ring-1 ring-black/5",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { className?: ClassValue }) {
  return <div className={cx("px-6 pt-6", className)} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { className?: ClassValue }) {
  return (
    <h3
      className={cx(
        "text-[var(--semantic-heading)] font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & { className?: ClassValue }) {
  return <p className={cx("mt-1 text-sm opacity-70", className)} {...props} />;
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { className?: ClassValue }) {
  return <div className={cx("px-6 pb-6", className)} {...props} />;
}

