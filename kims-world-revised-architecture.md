# Kim's World: Revised Architecture Recommendation

## What I Got Wrong in V1

I assumed a rigid one-way flow (Figma → tokens → code) and pre-built skills without asking you what you actually need. The corrected version starts from your answers and from what's technically possible *today* with your exact tool stack.

---

## My Recommendation: The Design-to-Dev Flow

Based on what's now available with Figma MCP (bidirectional as of Feb 2026), Figma Make, Pencil.dev, and Claude Code, here's what I think works best for your situation:

### The "Figure-Eight" — Not a Pipeline

The old model is linear: design → handoff → code. What actually works with your tools is a figure-eight loop where design and code inform each other continuously:

```
        ┌──────────────────────────────────────────┐
        │           DESIGN SPACE                    │
        │                                           │
        │   Figma Make ──→ Figma Design ──→ Refine  │
        │       ↑              ↑    │               │
        │       │              │    │               │
        │   (prompt to        (capture)  (Figma MCP │
        │    prototype)        │    │     read)      │
        │       │              │    ↓               │
        ├───────┼──────────────┼────────────────────┤
        │       │              │    │               │
        │   (you refine      (code to   (extract    │
        │    on canvas)       canvas)    tokens +    │
        │       │              │    │    components) │
        │       ↑              │    ↓               │
        │   Pencil.dev ←── Claude Code ──→ Cursor   │
        │   (visual check)  (orchestrator) (build)  │
        │                                           │
        │           CODE SPACE                      │
        └──────────────────────────────────────────┘
```

The key insight: **Figma MCP now supports two-way communication.** Claude Code can read your Figma designs AND push coded UIs back to Figma as editable frames (the "Code to Canvas" feature launched Feb 2026). This means:

1. You can start ANYWHERE — Figma, Figma Make, code, a brain dump
2. The loop closes in both directions
3. Figma becomes a collaboration/review surface, not just a starting point

### Specifically, Three Entry Points

**Entry A: "I know what I want visually"**
→ Design in Figma (or generate with Figma Make using your design system)
→ Figma MCP reads it into Claude Code / Cursor
→ Code is generated matching the design
→ Code-to-Canvas captures it back to Figma for review

**Entry B: "I have an idea but not a design"**
→ Brain dump to Claude Code (via /intake-requirements)
→ Claude Code generates light requirements
→ Figma Make generates a first draft from those requirements
→ You refine on canvas
→ Figma MCP reads refined version into code

**Entry C: "I'm building and iterating in code"**
→ Build in Cursor with Claude Code
→ Code-to-Canvas captures UI into Figma
→ Refine in Figma, adjust details
→ Figma MCP reads changes back into code
→ Pencil.dev for quick visual checks without leaving IDE

### Why This Is Better Than One-Way

Your specific problem — "the coding agent interprets the design but gets details wrong" — happens because of *lossy translation*. A one-way pipeline has one chance to get it right. The figure-eight lets you:

- Generate → check → adjust → regenerate
- Start rough → tighten → verify → ship
- Catch sizing/spacing/animation issues in Figma (where you can see them) before they become code bugs

### Where Each Tool Fits

| Tool | Role | When You Use It |
|------|------|-----------------|
| **Figma Make** | Rapid generation from prompts. Uses your design system library. | "I want to explore layouts for this section" |
| **Figma Design** | Refine, annotate, review. Source of visual truth for complex pages. | "Let me adjust this spacing and review the responsive variants" |
| **Figma MCP (read)** | Claude Code / Cursor reads your Figma components, tokens, variables | "Build this component matching my Figma design" |
| **Figma MCP (write/Code-to-Canvas)** | Claude Code pushes working UI back to Figma as editable frames | "Capture what I've built so I can review it on the canvas" |
| **Claude Code** | Orchestrator. Runs skills, talks to MCPs, manages multi-file work. | Requirements, specs, content shaping, multi-step builds |
| **Cursor** | IDE. Daily coding, visual diffs, Figma MCP for read operations | Building components, editing code, running dev server |
| **Pencil.dev** | Quick visual checkpoint in IDE. .pen files in git. | "Does this look right without spinning up dev server?" |

---

## The Agent System You Actually Need

Based on your answers (all agents resonated + requirements writer), here's the revised roster. The key change from V1: **the requirements writer is a first-class agent**, not buried inside interaction-spec.

### Agent 1: Requirements Writer
**Job:** Takes any input (brain dump, sketch, reference, voice note transcript) and produces structured functional + non-functional requirements BEFORE design begins.

**Two modes:**
- **Light mode** (pre-design): "Here's what this page/section needs to do, who it's for, and the constraints." Output: a 1-page brief.
- **Detailed mode** (post-design): "Here are the exact dimensions, animations, states, responsive rules, and acceptance criteria." Output: full interaction spec.

**Why first-class:** This is the agent that prevents "the coding agent gets details wrong." If the requirements are precise, the coder has no room to guess.

### Agent 2: Design Generator
**Job:** Takes requirements and generates designs — either in Figma Make (via prompt) or as a Pencil.dev .pen file.

**Specifically:**
- Translates light requirements into Figma Make prompts that reference your design system
- Can generate component variants (hover, active, loading, error, empty)
- Produces responsive frames (mobile 390px, desktop 1440px) per Pencil.dev best practice

### Agent 3: Component Coder
**Job:** Takes a confirmed design (via Figma MCP) OR a detailed spec (from requirements writer) and builds the React component.

**Key rule:** If something isn't in the spec/design, it ASKS — it never guesses. This is the core fix for your fidelity problem.

### Agent 4: Content Shaper
**Job:** Interviews you, shapes raw ideas into MDX articles/projects.

**Handles any input format:** conversation, notes, transcripts, sketches. Produces structured MDX with frontmatter, outlines, illustration briefs, and UXDemoBox specs.

### Agent 5: Design System Caretaker
**Job:** Keeps tokens, components, and Figma in sync.

**Specifically:**
- Audits for hardcoded values (the "naked values" scan)
- Syncs tokens between Figma variables and tokens.json
- Flags component drift between Figma and code
- Manages the build:tokens pipeline

### Agent 6: QA Verifier
**Job:** Checks if what was built matches what was designed/specified.

**Specifically:**
- Walks through acceptance criteria from the spec
- Uses Code-to-Canvas to capture built UI into Figma for visual comparison
- Checks responsive behaviour at each breakpoint
- Verifies animation timing, reduced motion, accessibility
- Reports pass/fail per criterion

---

## Context Efficiency Architecture

You raised a critical point: as things grow, Cursor consumes too much context just to digest info. Here's how to architect for efficiency:

### 1. CLAUDE.md Hierarchy (Progressive Disclosure)

```
CLAUDE.md (root, <80 lines)
  → WHAT the project is, HOW to build/verify
  → Does NOT contain: detailed component specs, content rules, token lists

.claude/skills/*/SKILL.md (loaded on-demand)
  → Each skill's frontmatter: name + description only (minimal tokens)
  → Full SKILL.md loaded ONLY when skill is invoked
  → Supporting files (templates, examples) loaded only when referenced

specs/*.spec.md (loaded on-demand per component)
  → Never loaded unless working on that specific component
```

**Key principle:** Root CLAUDE.md is the only thing loaded every session. Everything else is loaded on-demand via skill invocation or file reference. This keeps base context under 2K tokens.

### 2. Cursor Rules (.mdc) with Precise Globs

```
.cursor/rules/
├── portfolio-conventions.mdc    → globs: **/*.tsx, **/*.ts
├── component-patterns.mdc      → globs: components/**/*.tsx
├── content-patterns.mdc        → globs: content/**/*.mdx
├── token-rules.mdc             → globs: tokens/**
└── animation-patterns.mdc      → globs: components/features/**/*.tsx
```

Cursor only loads the relevant .mdc file when you're editing a file matching its glob. Working on an MDX article? Only content-patterns loads. Working on a component? component-patterns + portfolio-conventions load. No wasted context.

### 3. Skill Frontmatter as Routing Keywords

Each SKILL.md frontmatter should have precise `description` keywords that act as routing signals:

```yaml
# GOOD — specific trigger keywords
description: >
  Writes functional and non-functional requirements for components and pages.
  Use when: "requirements", "what should this do", "spec out",
  "before I design", "acceptance criteria", "it doesn't look right"

# BAD — vague, will trigger on everything
description: Helps with design and development
```

The agent reads ALL frontmatter descriptions at session start (cheap — just names + descriptions). It only loads the full SKILL.md when triggered. The more precise your description keywords, the less false-loading.

### 4. Spec Files as Context Boundaries

Instead of one massive CLAUDE.md with all component specs:

```
specs/
├── hero-illustration.spec.md       → only loaded when working on hero
├── nav-card.spec.md                → only loaded when working on nav
├── poll-game.spec.md               → only loaded when working on polls
└── ux-demo-box.spec.md             → only loaded when working on demos
```

Each spec is a self-contained document. The coding agent reads ONLY the spec for the component it's building. This prevents "agent reads 4000 tokens of specs for components it's not touching."

---

## Revised PRP Sequence

### PRP-001: Foundation (Context-Efficient Architecture)
- Root CLAUDE.md (<80 lines)
- .claude/ directory with skill stubs (frontmatter only — descriptions precise for routing)
- .cursor/rules/ with glob-scoped .mdc files
- specs/ directory structure
- Migrate relevant .cursorrules content into .mdc files

### PRP-002: Requirements Writer Agent
- Light mode (pre-design brief) + Detailed mode (post-design interaction spec)
- Template for functional/non-functional requirements
- Template for detailed interaction specs
- Integration point: feeds into Design Generator AND Component Coder

### PRP-003: Design Generator Agent
- Figma Make prompt templates (referencing your design system)
- Pencil.dev .pen generation for quick visual exploration
- Responsive frame generation (390px + 1440px)
- Integration: reads from Requirements Writer output, generates for Figma/Pencil

### PRP-004: Component Coder Agent
- Reads from Figma MCP (design) OR spec file (requirements)
- Strict "no guessing" rule — asks if anything is ambiguous
- Token-first styling (no naked values)
- Animation with exact values from spec
- Accessibility and reduced motion built-in

### PRP-005: Content Shaper Agent
- Multi-format intake (brain dump, notes, transcripts, sketches)
- Interview flow for articles and projects
- MDX output with frontmatter, outline, companion files
- Illustration brief generation
- UXDemoBox spec generation

### PRP-006: Design System Caretaker
- Token sync between Figma variables and tokens.json
- Naked value audit across all components
- Component drift detection (Figma vs code)
- Build pipeline management

### PRP-007: QA Verifier
- Acceptance criteria verification
- Code-to-Canvas capture for visual comparison
- Responsive spot-check at breakpoints
- Animation/accessibility/performance checks

---

## Open Questions (Genuine This Time)

1. **Figma MCP setup**: You have Figma MCP in Cursor. Do you also want it in Claude Code? The bidirectional (Code-to-Canvas) feature currently works with Claude Code specifically. Setting it up in both tools gives you the full figure-eight.

2. **Figma Make usage**: Have you used Figma Make with your design system library loaded? The experience is significantly better when it can pull your actual components vs generating generic ones.

3. **First test case**: What page or section of the portfolio would you want to run through the new workflow first? The hero/intro page with the illustration issues sounds like a natural candidate, but you might have a different priority.

4. **The .cursorrules and plan.md**: Are these still relevant context, or should we start fresh with the new architecture?

5. **Anything I'm still missing?** I want to make sure I'm not assuming again.
