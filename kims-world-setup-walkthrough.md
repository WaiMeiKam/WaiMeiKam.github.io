# Setting Up Kim's World: Step-by-Step Walkthrough

Use this in order. Each phase builds on the previous one. You're doing this inside your portfolio repo in the terminal with Claude Code.

---

## Phase 0: Figma MCP in Claude Code (do this first)

You already have Figma MCP in Cursor and Pencil MCP in Claude Code. Now add Figma MCP to Claude Code too, for the full bidirectional loop.

### 0A: Add the Remote MCP Server

Open terminal in your portfolio repo directory:

```bash
claude mcp add --scope user --transport http figma https://mcp.figma.com/mcp
```

The `--scope user` flag makes it available across all your projects, not just this one.

### 0B: Authenticate

```
# Inside Claude Code:
/mcp
# Select "figma"
# Select "Authenticate"
# Browser opens → click "Allow Access"
# You should see: "Authentication successful. Connected to figma"
```

### 0C: Verify

```
/mcp
# figma should show as "connected" with tools listed
# You should see tools like: get_design_context, get_screenshot, get_variable_defs
```

### 0D: Code to Canvas (the write direction)

**Important caveat:** The `generate_figma_design` tool (Code to Canvas) is available via the remote MCP server, but some people have had issues with it not showing up. If it doesn't appear in your tool list after setup:

1. Disconnect any previous Figma MCP instances: `/mcp` → select figma → disconnect
2. Remove and re-add: `claude mcp remove figma` then re-run the add command
3. Restart Claude Code completely
4. Check `/mcp` again for `generate_figma_design` in the tool list

If it still doesn't show, the Figma plugin approach works as a fallback:
```bash
claude plugin install figma@claude-plugins-official
```

There's also a community option using Chrome DevTools MCP that gives Claude direct access to the Figma plugin API in the browser — more powerful but requires more trust. You can explore this later once the basics are working.

### 0E: Test the Loop

**Read test:** Select a frame in Figma, then in Claude Code:
```
"Describe the design I have selected in Figma"
```

**Write test (if generate_figma_design is available):**
```
"Start a local server for my app and capture the homepage UI in a new Figma file"
```

If both directions work → you have the full figure-eight. If only read works → you still have a very useful setup, and Code to Canvas is actively being rolled out.

---

## Phase 1: Foundation (CLAUDE.md + Directory Structure)

This is the bones. Do this in a single Claude Code session.

### 1A: Start Claude Code in your repo

```bash
cd /path/to/WaiMeiKam.github.io
claude
```

### 1B: Tell Claude Code to set up the foundation

Paste this prompt (adjust anything that doesn't match your current repo):

```
I need you to set up the foundational agent architecture for my portfolio site. Here's what to create:

1. A root CLAUDE.md file (keep it under 80 lines). It should describe:
   - Stack: Next.js 15, React 19, Tailwind v4, Framer Motion, TypeScript
   - Architecture: app/, components/ui/, components/features/, content/, tokens/
   - Token system: tokens.json is source of truth, npm run build:tokens generates CSS
   - Content system: MDX articles and projects, JSON manifests
   - Illustration pipeline: IllustrationSpot component, Procreate exports to public/illustrations/
   - MCP integrations: Figma (Claude Code + Cursor), Pencil.dev (Claude Code)
   - Commands: dev, build:tokens, lint, build
   - Verification: what to run after changes
   - NEVER edit app/globals.css directly

2. Directory structure (create empty directories and stub files):
   .claude/skills/requirements-writer/SKILL.md
   .claude/skills/design-generator/SKILL.md
   .claude/skills/component-coder/SKILL.md
   .claude/skills/content-shaper/SKILL.md
   .claude/skills/design-system-caretaker/SKILL.md
   .claude/skills/qa-verifier/SKILL.md
   .claude/agents/content-shaper-agent.md
   .claude/agents/design-system-agent.md
   .claude/commands/sync-tokens.md
   .claude/commands/new-article.md
   .cursor/rules/portfolio-conventions.mdc
   .cursor/rules/component-patterns.mdc
   .cursor/rules/content-patterns.mdc
   specs/README.md

3. For each SKILL.md stub, write ONLY the frontmatter (name + description).
   Keep descriptions precise with trigger keywords for efficient routing.
   Do NOT write the full skill content yet — just the metadata.

4. For .cursor/rules/*.mdc files, include the glob patterns so Cursor
   only loads them for relevant file types.

5. Migrate anything still useful from .cursorrules into the new .mdc files.
   Then we can deprecate the old .cursorrules later.

6. The specs/ directory should have a README explaining that specs
   are created by /requirements-writer and consumed by /component-coder.

Read the existing README.md and .cursorrules first to understand current conventions.
```

### 1C: Review what Claude Code created

```
# Check the structure
ls -la .claude/skills/
ls -la .claude/agents/
ls -la .cursor/rules/
cat CLAUDE.md
```

### 1D: Commit

```bash
git add -A
git commit -m "feat: add agent architecture foundation (CLAUDE.md, skills stubs, cursor rules)"
```

---

## Phase 2: Build the Requirements Writer (Agent #1)

This is the most important agent — it's upstream of everything. Do this in a fresh Claude Code session (use /clear first).

### 2A: Prompt Claude Code to build the skill

```
Read CLAUDE.md and .claude/skills/requirements-writer/SKILL.md (the stub).

Now flesh out the full SKILL.md for the requirements-writer skill. This agent has TWO modes:

**Light mode (pre-design):**
- Triggered when I say things like "I want to build...", "new page", "new section", "requirements for..."
- Interviews me (one question at a time) about:
  - What is this page/section/component for?
  - Who is it for and what should they feel?
  - What content goes in it?
  - What are the functional requirements (what it must DO)?
  - What are the non-functional requirements (performance, accessibility, responsive)?
  - Any references or inspiration?
- Output: a 1-page brief saved to specs/{name}.brief.md

**Detailed mode (post-design):**
- Triggered when I say things like "spec this out", "interaction spec", "the sizing is off", "it doesn't feel right"
- Reads the existing brief if one exists
- Interviews me with precise questions about:
  - Exact dimensions at each breakpoint (mobile, tablet, desktop)
  - Exact animation timing, easing curves, triggers
  - Image/illustration sizing, object-fit, aspect ratios
  - All component states (default, hover, active, loading, error, empty)
  - Accessibility requirements (keyboard, ARIA, focus)
  - Performance requirements (lazy loading, GPU compositing)
- Output: a detailed spec saved to specs/{name}.spec.md

Key rules for this skill:
- If a spec contains "appropriate", "nice", or "feels right" — it's not done. Every value must be concrete.
- If I say "it doesn't feel right" — don't guess. Ask: "Is it the timing? The size? The position? The easing?"
- All spacing/colour/radius values must reference design tokens from tokens.json
- Include acceptance criteria as checkboxes at the end of every spec

Also create template files:
- .claude/skills/requirements-writer/template-brief.md
- .claude/skills/requirements-writer/template-spec.md
```

### 2B: Test it

```
/requirements-writer hero-section
```

Run through the interview for your homepage hero. See if the questions feel right and the output is useful. If something's off, tell Claude Code to adjust the skill.

### 2C: Commit

```bash
git add .claude/skills/requirements-writer/
git commit -m "feat: add requirements-writer skill (light + detailed modes)"
```

---

## Phase 3: Build the Content Shaper (Agent #4)

Fresh session (/clear). This one handles your multi-format input problem.

### 3A: Prompt Claude Code

```
Read CLAUDE.md and .claude/skills/content-shaper/SKILL.md (the stub).

Build the full content-shaper skill. This is for portfolio content intake.

Key context about me:
- I'm a product designer who thinks in metaphors (cooking, biology, sports, gaming)
- I have ADHD — I move fast between ideas, my input is associative not linear
- My ideas arrive as: brain dumps in chat, rough notes, voice note transcripts,
  Figma/Procreate sketches, or just a feeling I want to explore
- I write in Australian English (colour, organisation, behaviour)

The skill should:
1. Accept ANY input format — conversation, pasted notes, a link, a description
2. Interview me (one question at a time) to shape the idea:
   - What's the core hook/metaphor?
   - What should the reader feel after?
   - A specific story or moment that makes it real?
   - What format? (essay, interactive UXDemoBox demo, visual story, data piece)
   - Any illustration ideas?
3. Shape it into an MDX file with correct frontmatter for my site
4. Write in MY voice — conversational, punchy, metaphor-rich. Not corporate.
5. Output a structured outline (not full prose) that I can then flesh out
6. Optionally generate companion files (illustration brief, UXDemoBox spec)

Content types:
- Articles → content/articles/{slug}.mdx (for "Thinking About" section)
- Projects → content/projects.json entry + content/projects/{slug}.mdx (for "Tinkered & Delivered")

Create template files too:
- .claude/skills/content-shaper/template-article.mdx
- .claude/skills/content-shaper/template-project.mdx

Reference the existing content/ directory structure for format conventions.
```

### 3B: Test it with the Overcooked article

```
/content-shaper article

"AI has often made me feel like we're playing Overcooked — everything intensifies
and handoffs matter so much — and the skills of the people doing the handoffs
matter to what we deliver to people."
```

See if the shaped output captures your energy. Iterate if it doesn't.

### 3C: Commit

```bash
git add .claude/skills/content-shaper/
git commit -m "feat: add content-shaper skill for article and project intake"
```

---

## Phase 4: Build the Remaining Skills

Do each in a fresh session. The pattern is the same:
1. Tell Claude Code to read CLAUDE.md and the stub
2. Give it the context for what that skill needs to do
3. Test it on a real task
4. Commit

### Design Generator
```
Build .claude/skills/design-generator/SKILL.md

This skill takes a brief from specs/{name}.brief.md and:
- Generates Figma Make prompts that reference my design system
- OR creates Pencil.dev .pen specifications
- Produces responsive frames (mobile 390px + desktop 1440px)
- Includes all component states as separate frames

It should understand my Peranakan/campfire aesthetic and token palette.
Read tokens/tokens.json to understand available design values.
```

### Component Coder
```
Build .claude/skills/component-coder/SKILL.md

This skill takes EITHER:
- A Figma frame link (reads via Figma MCP)
- A detailed spec from specs/{name}.spec.md

And builds a React component that:
- Uses tokens exclusively (no magic numbers)
- Uses Framer Motion for animation with exact values from spec
- Handles prefers-reduced-motion
- Includes all ARIA attributes from spec
- Follows mobile-first responsive pattern

KEY RULE: If anything is ambiguous or missing from the spec/design, ASK. Never guess.
This is the most important rule — it's what prevents the fidelity gap.
```

### Design System Caretaker
```
Build .claude/skills/design-system-caretaker/SKILL.md

This skill:
- Syncs tokens between Figma variables (via MCP) and tokens.json
- Audits components for hardcoded "naked" values
- Flags drift between Figma designs and coded components
- Manages npm run build:tokens pipeline
- Reports token coverage across components
```

### QA Verifier
```
Build .claude/skills/qa-verifier/SKILL.md

This skill:
- Reads a spec from specs/{name}.spec.md
- Walks through each acceptance criterion
- Checks responsive behaviour at mobile/tablet/desktop
- Verifies animation timing and reduced motion fallback
- Checks accessibility (ARIA, keyboard, focus)
- Uses Code to Canvas to capture UI into Figma for visual comparison (if available)
- Reports pass/fail per criterion
```

---

## Phase 5: Test the Full Loop

Once all skills are built, test the complete figure-eight on ONE real page:

### The Test: Homepage Hero Section

```
# 1. Requirements (light brief)
/requirements-writer hero-section
# → Answer the interview questions
# → Produces specs/hero-section.brief.md

# 2. Design generation
/design-generator hero-section
# → Produces Figma Make prompts OR generates directly
# → You refine in Figma

# 3. Requirements (detailed spec from design)
/requirements-writer hero-section --detailed
# → Reads the brief, interviews you about exact values
# → Produces specs/hero-section.spec.md

# 4. Build the component
/component-coder hero-section
# → Reads spec + Figma MCP
# → Builds the component

# 5. QA
/qa-verifier hero-section
# → Checks against spec acceptance criteria
# → Reports pass/fail

# 6. Code to Canvas (if available)
"Capture the homepage hero section and send it to my Figma file [paste link]"
# → You can now compare in Figma
```

If this loop works smoothly for the hero, you've proved the system. Scale to other pages.

---

## Ongoing: Context Efficiency Tips

As your repo grows, keep these habits:

1. **Fresh sessions per task.** `/clear` between unrelated work. Don't let context accumulate.

2. **One skill per session.** Don't invoke 4 skills in one session — each one loads context.

3. **Specs as boundaries.** The spec file IS the handoff document. The coder reads ONLY the spec for the component it's building.

4. **CLAUDE.md stays lean.** If it grows past 80 lines, move details into skills or specs. Ask: "Would removing this line cause Claude to make mistakes?" If not, cut it.

5. **Cursor rules stay scoped.** The glob patterns mean Cursor only loads relevant rules. Don't use `**/*` globs unless the rule truly applies everywhere.

6. **Compact proactively.** If a session is getting long, use `/compact` before hitting 50% context usage.

---

## What to Do with the V1 Files

The V1 starter files I generated earlier? You can:
- **Use the directory structure** (it's the same in V2)
- **Ignore the SKILL.md content** (you're writing better versions with Claude Code)
- **Reference the CLAUDE.md** as a starting point when Claude Code asks what to put in it
- **Use the .cursor/rules/*.mdc files** as-is — those are still accurate

The V1 PRPs are superseded by this walkthrough. You don't need separate PRP documents because **Claude Code IS the executor** — each phase above is essentially a PRP being executed live.

---

## Quick Reference: Your Tool Map

| I want to... | Use this |
|---------------|----------|
| Explore a layout idea quickly | Figma Make (prompt with design system) |
| Refine a design precisely | Figma Design |
| Write requirements before designing | `/requirements-writer` in Claude Code |
| Write a detailed spec after designing | `/requirements-writer --detailed` in Claude Code |
| Generate a component from spec/Figma | `/component-coder` in Claude Code or Cursor |
| Shape an article from a brain dump | `/content-shaper` in Claude Code |
| Check if build matches spec | `/qa-verifier` in Claude Code |
| Sync tokens from Figma to code | `/design-system-caretaker` in Claude Code |
| Quickly check visuals in IDE | Pencil.dev (.pen file in Cursor) |
| Push built UI back to Figma | Code to Canvas via Figma MCP |
| Quick token rebuild | `/sync-tokens` command in Claude Code |
