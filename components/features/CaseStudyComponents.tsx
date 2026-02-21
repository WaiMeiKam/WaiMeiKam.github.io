import * as React from "react";

import { cx } from "@/lib/utils/cx";
import {
  mdxComponents,
  Callout,
  Highlight,
  KeyInsight,
  SectionLabel,
  ArticleImage,
} from "./ArticleComponents";

function SectionBlock({
  label,
  color,
  children,
}: {
  label: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <section className="my-10">
      <div className="mb-4 flex items-center gap-3">
        <span
          className="inline-block h-2 w-2 rounded-full"
          style={{ backgroundColor: color }}
          aria-hidden="true"
        />
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color }}>
          {label}
        </p>
      </div>
      <div className="leading-relaxed [&>h2]:mt-6 [&>h2]:mb-3 [&>h3]:mt-5 [&>h3]:mb-2 [&>p]:mb-4 [&>ul]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-1 [&>ol]:mb-4 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-1">
        {children}
      </div>
    </section>
  );
}

export function Problem({ children }: { children: React.ReactNode }) {
  return (
    <SectionBlock label="The Problem" color="var(--color-rosepink)">
      {children}
    </SectionBlock>
  );
}

export function Process({ children }: { children: React.ReactNode }) {
  return (
    <SectionBlock label="The Process" color="var(--color-jade)">
      {children}
    </SectionBlock>
  );
}

export function KeyDecision({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cx(
        "my-10 rounded-[var(--radius-lg)] border-l-4 border-[var(--color-gold)]",
        "bg-[var(--color-gold)]/8 p-6",
      )}
    >
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[var(--color-gold)]">
        Key Decision
      </p>
      {title && (
        <p className="mb-3 text-lg font-semibold text-[var(--semantic-heading)]">
          {title}
        </p>
      )}
      <div className="leading-relaxed [&>p]:mb-3 [&>p:last-child]:mb-0">{children}</div>
    </div>
  );
}

export function Outcome({ children }: { children: React.ReactNode }) {
  return (
    <SectionBlock label="The Outcome" color="var(--color-jade)">
      {children}
    </SectionBlock>
  );
}

export function Reflection({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cx(
        "my-10 rounded-[var(--radius-lg)]",
        "bg-[var(--semantic-surface)] p-6 shadow-[var(--shadow-sm)] ring-1 ring-black/5",
      )}
    >
      <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[var(--semantic-primary)]">
        Reflection
      </p>
      <div className="leading-relaxed italic opacity-85 [&>p]:mb-3 [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}

export const caseStudyMdxComponents = {
  ...mdxComponents,
  Problem,
  Process,
  KeyDecision,
  Outcome,
  Reflection,
  Callout,
  Highlight,
  KeyInsight,
  SectionLabel,
  ArticleImage,
};
