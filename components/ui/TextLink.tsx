import * as React from "react";
import Link from "next/link";

import { cx, type ClassValue } from "@/lib/utils/cx";

type TextLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: ClassValue;
  external?: boolean;
};

/**
 * TextLink — inline text link with ember colour shift on hover.
 *
 * Spec: text colour shifts to --semantic-primary (ember) on hover.
 * Transition: 200ms. No underline by default (use `underline` className if needed).
 * Focus: 2px ember ring, 2px offset, cream offset colour.
 *
 * Usage:
 *   <TextLink href="/thinking-about">Read more</TextLink>
 *   <TextLink href="https://example.com" external>External site</TextLink>
 */
export function TextLink({ href, children, className, external }: TextLinkProps) {
  const classes = cx(
    "text-[var(--semantic-heading)] transition-colors duration-200",
    "hover:text-[var(--semantic-primary)]",
    "focus-visible:outline-none focus-visible:rounded-sm",
    "focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)]",
    "focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--semantic-background)]",
    className,
  );

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
