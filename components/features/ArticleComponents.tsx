import * as React from "react";

import { cx } from "@/lib/utils/cx";

export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <aside
      className={cx(
        "my-6 rounded-[var(--radius-lg)] border-l-4 border-[var(--semantic-primary)]",
        "bg-[var(--semantic-primary)]/5 px-5 py-4",
      )}
    >
      <div className="text-sm leading-relaxed [&>p]:mb-0">{children}</div>
    </aside>
  );
}

export function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <mark className="rounded-[var(--radius-sm)] bg-[var(--color-gold)]/20 px-1 py-0.5 text-inherit">
      {children}
    </mark>
  );
}

export function KeyInsight({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cx(
        "my-8 rounded-[var(--radius-lg)] bg-[var(--semantic-surface)]",
        "p-6 shadow-[var(--shadow-sm)] ring-1 ring-black/5",
      )}
    >
      {title && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--semantic-primary)]">
          {title}
        </p>
      )}
      <div className="text-base leading-relaxed [&>p]:mb-0">{children}</div>
    </div>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 mt-10 text-xs font-semibold uppercase tracking-widest text-[var(--semantic-primary)] opacity-80">
      {children}
    </p>
  );
}

export function ArticleImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="my-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="w-full rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)]"
        loading="lazy"
      />
      {caption && (
        <figcaption className="mt-2 text-center text-sm opacity-60">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Standard MDX component overrides for consistent article typography.
 */
export const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="mb-4 mt-10 text-3xl font-bold tracking-tight text-[var(--semantic-heading)] sm:text-4xl"
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mb-3 mt-10 text-2xl font-bold tracking-tight text-[var(--semantic-heading)]"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mb-2 mt-8 text-xl font-semibold text-[var(--semantic-heading)]"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-5 leading-relaxed" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-5 list-disc space-y-2 pl-6" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mb-5 list-decimal space-y-2 pl-6" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-6 border-l-4 border-[var(--color-gold)] pl-5 italic opacity-85"
      {...props}
    />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="font-medium text-[var(--semantic-primary)] underline underline-offset-2 transition-opacity hover:opacity-70"
      {...props}
    />
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-10 border-t border-black/10" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="rounded-[var(--radius-sm)] bg-black/5 px-1.5 py-0.5 text-sm font-medium"
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="my-6 overflow-x-auto rounded-[var(--radius-lg)] bg-[var(--color-emerald)] p-5 text-sm text-[var(--color-cream)]"
      {...props}
    />
  ),
  Callout,
  Highlight,
  KeyInsight,
  SectionLabel,
  ArticleImage,
};
