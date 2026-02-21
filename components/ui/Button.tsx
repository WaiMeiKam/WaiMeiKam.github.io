"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cx, type ClassValue } from "@/lib/utils/cx";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary: cx(
    "bg-[var(--semantic-primary)] text-[var(--semantic-background)]",
    "hover:brightness-95 active:brightness-90",
    "shadow-[var(--shadow-sm)]",
  ),
  secondary: cx(
    "bg-[var(--semantic-surface)] text-[var(--semantic-heading)]",
    "hover:bg-black/5 active:bg-black/10",
    "shadow-[var(--shadow-sm)] ring-1 ring-black/5",
  ),
  ghost: cx(
    "bg-transparent text-[var(--semantic-heading)]",
    "hover:bg-black/5 active:bg-black/10",
  ),
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-base",
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: ClassValue;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  type,
  ...props
}: ButtonProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="inline-flex"
      whileHover={reduceMotion ? undefined : { scale: 1.025 }}
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    >
      <button
        type={type ?? "button"}
        className={cx(
          "inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-full)]",
          "font-medium transition-[filter,background-color] duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--semantic-background)]",
          "disabled:pointer-events-none disabled:opacity-50",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      />
    </motion.div>
  );
}
