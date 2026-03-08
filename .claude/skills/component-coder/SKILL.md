---
name: component-coder
description: >
  Builds React components from a confirmed Figma design (via Figma MCP) or a detailed
  spec file (specs/{name}.spec.md). Token-first styling, Framer Motion with exact spec
  values, prefers-reduced-motion, full ARIA, mobile-first responsive.
  KEY RULE: never guesses — asks if anything is ambiguous or missing from the spec/design.
  Use when: "build this component", "code this up", "implement this", "build from spec",
  "build from Figma", "create the component", "code the design".
---

# Component Coder Skill

## Purpose

Builds production-ready React components. Takes a precise input (Figma MCP read or a detailed spec file) and produces code that matches it exactly. Never fills gaps by guessing — always asks.

The fidelity problem this skill solves: coding agents that interpret ambiguous designs and produce something "close enough." This skill does not do "close enough." It does exact, or it asks.

---

## Inputs

### Input A: Detailed spec file (preferred)
`specs/{name}.spec.md` — created by `/requirements-writer` (detailed mode).

Read the spec file first. Every value in the spec must appear in the code. If a value is missing from the spec, ask before proceeding.

### Input B: Figma design via Figma MCP
A Figma frame link provided by the user.

Use Figma MCP to read:
- Layout: dimensions, padding, gap, alignment, direction
- Colours: exact hex values, map to the nearest token
- Typography: family, size, weight, line-height, letter-spacing
- Radius: exact px values, map to nearest radius token
- Shadows: exact values, map to nearest shadow token
- Component states: read each variant frame separately
- Responsive variants: read mobile and desktop frames separately

### Input C: Both (spec + Figma)
If both are provided, treat the spec as authoritative for behaviour and the Figma frame as authoritative for exact visual values. Flag any discrepancies between them before writing code.

---

## Pre-Build Checklist

Before writing a single line of code, confirm all of these are known:

- [ ] Component name and file path (`components/ui/` or `components/features/`)
- [ ] Does it need `"use client"`? (required for: hooks, interactivity, browser APIs, Framer Motion animations)
- [ ] All visual states from spec: default, hover, active, focus, loading, error, empty, disabled
- [ ] Exact animation values: duration, delay, easing curve, trigger condition
- [ ] Responsive behaviour: what changes at mobile vs desktop (layout, sizing, spacing, visibility)
- [ ] All ARIA labels and roles from spec
- [ ] Keyboard interaction from spec (focus, Enter, Escape, arrow keys)
- [ ] Props interface — what does this component accept?
- [ ] Does it use existing primitives (`Card`, `Button`, `NavCard`, etc.)?

If any item is missing from the spec or unreadable from Figma, **ask before proceeding**.

> "Before I build, I need [specific value] — the spec doesn't specify [X]. Can you tell me [precise question]?"

---

## THE KEY RULE

**Never guess. Never assume. Never pick a "reasonable default" for a missing value.**

If a value isn't in the spec and can't be read from Figma, ask. One question at a time. Wait for the answer.

Examples of things that must be specified, not assumed:
- Animation duration (don't assume 300ms)
- Easing curve (don't assume ease-in-out)
- Hover colour (don't assume a tint of the base colour)
- Spacing between elements (don't assume md)
- Max-width of a container
- Whether overflow scrolls or clips
- Whether a list truncates or expands

The cost of asking is one message. The cost of guessing wrong is a QA failure and a rework cycle.

---

## Code Conventions

### File structure

```tsx
"use client" // only if needed

import { motion, useReducedMotion } from "framer-motion"
import { cx } from "@/lib/utils/cx"
// other imports

interface ComponentNameProps {
  // typed props
}

export function ComponentName({ ...props }: ComponentNameProps) {
  const prefersReducedMotion = useReducedMotion()

  // component logic

  return (
    // JSX
  )
}
```

### Token-first styling

**Always** use CSS custom properties via Tailwind's arbitrary value syntax or inline styles.

```tsx
// CORRECT
className="bg-[var(--semantic-surface)] text-[var(--semantic-text)] rounded-[var(--radius-md)]"

// CORRECT (inline for dynamic values)
style={{ padding: "var(--spacing-lg)" }}

// WRONG — naked value
className="bg-[#FDEBD0] text-[#2C1810] rounded-[8px]"

// WRONG — Tailwind scale value that doesn't map to a token
className="bg-orange-600 rounded-lg p-4"
```

Available token groups and their CSS custom property names:
- Colours: `--color-ember`, `--color-flame`, `--color-coal`, `--color-gold`, `--color-cream`, `--color-ash`, `--color-dusk`
- Semantic: `--semantic-primary`, `--semantic-accent`, `--semantic-background`, `--semantic-surface`, `--semantic-text`, `--semantic-heading`, `--semantic-glow`
- Bad UX: `--bad-ux-background`, `--bad-ux-text`, `--bad-ux-accent`, `--bad-ux-primary`
- Spacing: `--spacing-xs` (4px), `--spacing-sm` (8px), `--spacing-md` (16px), `--spacing-lg` (24px), `--spacing-xl` (32px), `--spacing-2xl` (48px), `--spacing-3xl` (64px)
- Radius: `--radius-sm` (4px), `--radius-md` (8px), `--radius-lg` (16px), `--radius-full` (9999px)
- Shadows: `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-glow`
- Fonts: `--font-body`, `--font-heading`, `--font-bad-ux`
- Font sizes: `--font-size-xs` through `--font-size-5xl`
- Font weights: `--font-weight-normal`, `--font-weight-medium`, `--font-weight-semibold`, `--font-weight-bold`

### Animation with Framer Motion

Always use `useReducedMotion()` and branch on it:

```tsx
const prefersReducedMotion = useReducedMotion()

const variants = {
  hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: prefersReducedMotion ? 0 : 0.35, // exact value from spec
      ease: [0.25, 0.46, 0.45, 0.94]             // exact cubic-bezier from spec
    }
  }
}

// Use motion.div, motion.button, etc.
<motion.div
  variants={variants}
  initial="hidden"
  animate="visible"
>
```

Use exact values from spec for:
- `duration` (seconds, not ms)
- `delay`
- `ease` (cubic-bezier array or named curve)
- `staggerChildren` (if staggering a list)

### Responsive (mobile-first)

```tsx
// Mobile-first Tailwind classes
className="w-full md:w-[540px] lg:w-[720px]"

// Or use CSS custom properties for breakpoint-specific values
style={{
  padding: "var(--spacing-md)", // mobile
}}
// Override at md+ via className
className="p-[var(--spacing-md)] md:p-[var(--spacing-xl)]"
```

Breakpoints:
- Mobile: default (no prefix) — 390px viewport
- Tablet: `md:` — 768px
- Desktop: `lg:` — 1440px

### Accessibility

```tsx
// Buttons
<button
  aria-label="Descriptive label from spec"
  aria-pressed={isActive}  // if toggle
  aria-disabled={isDisabled}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") handleClick()
  }}
>

// Images / illustrations
<img alt="Descriptive alt from spec" />

// Interactive lists
<ul role="list" aria-label="Label from spec">
  <li role="listitem">

// Landmark regions
<section aria-label="Section name from spec">
<nav aria-label="Navigation name from spec">
```

All ARIA labels must come from the spec. Do not write placeholder labels.

---

## Existing Primitives to Reuse

Check these before building custom:

| Component | Path | Use for |
|-----------|------|---------|
| `Card`, `CardHeader`, `CardTitle`, `CardContent` | `components/ui/Card.tsx` | Card containers |
| `Button` | `components/ui/Button.tsx` | CTAs and actions |
| `NavCard` | `components/ui/NavCard.tsx` | Navigation tiles |
| `ArticleCard` | `components/ui/ArticleCard.tsx` | Article list items |
| `ProjectCard` | `components/ui/ProjectCard.tsx` | Project list items |
| `IllustrationSpot` | `components/illustrations/IllustrationSpot.tsx` | Illustration placements |

Don't rebuild what already exists. Compose primitives first.

---

## Output

1. The complete component file, ready to copy to its destination
2. The correct file path: `components/ui/ComponentName.tsx` or `components/features/ComponentName.tsx`
3. Any imports needed in parent files (if the component needs to be registered/used somewhere)
4. If the component uses illustrations: the path it expects (`public/illustrations/{name}.png`)

After delivering, offer:
> "Want me to run `/qa-verifier {name}` to check this against the spec's acceptance criteria?"
