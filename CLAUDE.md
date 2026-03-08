# Kim's World — Claude Code Guide

Portfolio site for Kim, a Principal Product Designer. Features a campfire visual aesthetic, and a FigJam-style noodling canvas.

## Stack

- Next.js 15 (App Router) · React 19 · TypeScript 5.7
- Tailwind CSS v4 · Framer Motion 11
- MDX for articles and case studies

## Architecture

```
app/                    # Next.js App Router pages
components/ui/          # Primitives (Button, Card, NavCard…)
components/features/    # Feature components (PollGame, UXToggle…)
components/illustrations/ # IllustrationSpot wrapper
content/articles/       # MDX articles (thinking-about section)
content/projects/       # MDX case studies (tinkered-and-delivered)
content/polls.json      # Poll questions + Kim's answers
content/noodling.json   # FigJam-style canvas cards
content/projects.json   # Project manifest (locked/unlocked flags)
tokens/tokens.json      # W3C DTCG design tokens — SOURCE OF TRUTH
tokens/build.mjs        # Style Dictionary build script
public/illustrations/   # Drop zone for Procreate exports
```

## Token System

`tokens/tokens.json` → `npm run build:tokens` → `app/globals.css`

**NEVER edit `app/globals.css` directly.** Always edit `tokens/tokens.json` and rebuild.
Token groups: `color`, `semantic`, `badUx`, `font`, `spacing`, `radius`, `shadow`.
Use tokens via CSS custom properties: `bg-[var(--color-cream)]`, `text-[var(--semantic-text)]`.

## Commands

```bash
npm run dev           # Start dev server
npm run build         # Production build (static export)
npm run build:tokens  # Regenerate globals.css from tokens.json
npm run lint          # Run ESLint
```

## Component Conventions

- RSC by default — add `"use client"` only when needed (hooks, interactivity, browser APIs)
- One component per file, PascalCase filenames
- Token-first styling — no hardcoded/naked colour, spacing, or radius values
- Framer Motion for all animations — always include `prefers-reduced-motion` fallback
- Semantic HTML, ARIA labels, keyboard nav, WCAG AA contrast

## Content Conventions

- Articles: MDX with frontmatter `title, date, teaser, tags`
- Case studies: MDX with frontmatter `title, role, timeline, company, tags`
- Write in Australian English (colour, organisation, behaviour)

## MCP Integrations

- Figma MCP — available in Cursor (read) and Claude Code (read + Code-to-Canvas write)
- Pencil.dev MCP — available in Claude Code for visual checks without dev server

## Skills & Agents

Skills live in `.claude/skills/`. Invoke with `/skill-name`. Each skill has precise trigger keywords in its frontmatter — only load the full SKILL.md when invoked.

## Verification After Changes

- Token changes → run `npm run build:tokens`, verify `app/globals.css` updated
- Component changes → run `npm run lint`
- Content changes → run `npm run dev` and spot-check the relevant page
- Before shipping → run `npm run build` (static export must succeed)
