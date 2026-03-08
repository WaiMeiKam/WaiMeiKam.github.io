---
name: design-generator
description: >
  Generates design artefacts from a requirements brief — Figma Make prompts referencing
  the design system, or Pencil.dev .pen file specifications. Produces responsive frames
  (mobile 390px + desktop 1440px) and all component states as separate frames.
  Use when: "generate a design", "create frames", "Figma prompt", "design this section",
  "layout ideas", "explore layouts", "generate variants", "Pencil design", "visualise this".
---

# Design Generator Skill

## Purpose

Takes a requirements brief (`specs/{name}.brief.md`) and generates ready-to-use design artefacts — either Figma Make prompts or Pencil.dev `.pen` specifications. The output bridges the gap between written requirements and visual design without losing design system fidelity.

---

## Inputs

### Primary (preferred)
- `specs/{name}.brief.md` — created by `/requirements-writer`. Read this first.

### Fallback (if no brief exists)
- A description of what to design, given directly in the conversation.
- If there's no brief, offer to create one first: "Want me to run `/requirements-writer` first to get a proper brief? Or I can work from what you've given me."

---

## Output Modes

Ask which output format is wanted if not specified:

> "Should I generate a Figma Make prompt (for exploring in Figma) or a Pencil.dev spec (for a quick visual in the IDE)? Or both?"

### Mode A: Figma Make Prompt

Produces a structured prompt ready to paste into Figma Make. The prompt must:

1. Reference the design system library by name ("Kim's World design system")
2. Specify exact token values so Figma Make uses the right colours, spacing, radius
3. Define all required frames explicitly
4. Describe all component states that need frames

**Prompt structure:**
```
# Figma Make Prompt: {component-name}

## Design System Context
Use the Kim's World design system. Colour palette:
- Primary action: #D4590A (ember) — CTAs, links, active states
- Accent: #E76F51 (flame) — highlights, hover, emphasis
- Background: #FFF8F0 (cream) — page backgrounds
- Surface: #FDEBD0 (dusk) — card and section fills
- Text: #2C1810 (ash) — body copy
- Headings: #1C0A02 (coal) — heading text
- Glow accent: #E9C46A (gold) — badges, callouts, campfire warmth

Typography: Inter. Weights: 400 (body), 600 (subheadings), 700 (headings).
Corner radius: 4px (subtle), 8px (default cards), 16px (prominent), 9999px (pills).
Aesthetic: Campfire warmth. Think campfire light, not corporate blue.
Mood: [warm/intimate/focused — derived from brief]

## Frames to Generate

### Frame 1: Mobile — Default State (390px wide)
[Detailed description of layout, hierarchy, content]

### Frame 2: Desktop — Default State (1440px wide)
[Detailed description of layout, hierarchy, content]

### Frame 3: [Component name] — Hover State
[What changes on hover: colour, shadow, scale, cursor]

### Frame 4: [Component name] — Active / Selected State
[Active state visual treatment]

[Add more states as required by the brief: loading, error, empty, focus, disabled]

## Layout Rules
- Mobile: single column, 16px horizontal padding, [spacing from brief]
- Desktop: [columns and grid from brief], 48px horizontal padding max-width [from brief]
- Use auto-layout for all frames
- 8px grid
```

### Mode B: Pencil.dev Specification

Produces a written specification for Pencil.dev `.pen` file generation. Structure:

```
# Pencil.dev Spec: {component-name}

## Canvas Layout
- Frame: {component-name}-mobile (390 × auto)
- Frame: {component-name}-desktop (1440 × auto)

## Colour Variables (map to Kim's World tokens)
- $primary: #D4590A
- $accent: #E76F51
- $bg: #FFF8F0
- $surface: #FDEBD0
- $text: #2C1810
- $heading: #1C0A02
- $glow: #E9C46A

## Mobile Frame: {component-name}-mobile
[Element-by-element description: container, children, sizing, colour, typography, spacing]

## Desktop Frame: {component-name}-desktop
[Element-by-element description at 1440px]

## State Frames
[One frame per state: hover, active, loading, error, empty, focus]

## Notes for Pencil
- All spacing in multiples of 4px (4, 8, 12, 16, 24, 32, 48, 64)
- Corner radius: sm=4px, md=8px, lg=16px
- Shadow: card shadow = 0 4px 6px -1px rgba(0,0,0,0.1)
- Glow shadow: 0 0 30px 10px rgba(233,196,106,0.3)
```

---

## Aesthetic Guidelines (always apply)

### Campfire Aesthetic

The design system has a specific mood. All generated frames must feel consistent with it:

- **Warmth, not brightness.** Backgrounds are warm cream (#FFF8F0), never white. Fills are warm dusk (#FDEBD0), never grey.
- **Ember, not blue.** Primary actions use ember (#D4590A) or flame (#E76F51). Never a generic blue.
- **Soft glow.** Use the gold (#E9C46A) glow shadow for elevated or focal elements. `0 0 30px 10px rgba(233,196,106,0.3)`.
- **Organic but considered.** Rounded corners (8px default), soft shadows, but not bubbly or childish.
- **Typography is calm.** Inter at normal weight for body. Bold only for headings and strong emphasis. No decorative fonts except in Bad UX mode.

### Campfire Bad UX Mode (only generate if brief requires it)

When generating frames for the Bad UX toggle state:
- Background: #FF00FF (neon magenta)
- Text: #00FF00 (neon green)
- Accent: #FFFF00 (neon yellow)
- Font: Comic Sans MS / Papyrus
- Overcrowded, jarring, maximally uncomfortable

---

## Responsive Frame Rules

Always generate at minimum:

| Frame | Width | Notes |
|-------|-------|-------|
| Mobile | 390px | iPhone 14 viewport. Single column. Generous tap targets (44px min). |
| Desktop | 1440px | Standard desktop. Use max-width constraint from brief. |

Add tablet (768px) only if the brief specifies distinct tablet behaviour.

---

## Component States to Generate

Check the brief for required states. Default set for interactive components:

| State | When to generate |
|-------|-----------------|
| Default | Always |
| Hover | Any interactive element |
| Active / Pressed | Buttons, clickable cards |
| Focus | Any interactive element (keyboard ring) |
| Loading | Any async data or action |
| Error | Any form or async operation |
| Empty | Any list or data-driven component |
| Disabled | Any form control or action that can be unavailable |

---

## Clarification Rules

Before generating, verify these are covered in the brief. If not, ask:

1. **Content:** What text/data actually appears in the component? (Don't design with Lorem Ipsum — use real content from brief or ask for examples.)
2. **States:** Which component states are required?
3. **Interactions:** What happens on hover, click, focus?
4. **Constraints:** Max-width, min-height, overflow behaviour?
5. **Context:** Where does this live on the page? Above the fold? In a list? In a modal?

If any of these are unanswered and the brief doesn't cover them, ask before generating — not after.

---

## Output Format

After generating, provide:

1. The Figma Make prompt or Pencil spec (formatted and ready to use)
2. A brief summary of the frames generated and states covered
3. Offer next steps:
   > "Once you've refined the design in Figma, run `/requirements-writer {name} --detailed` to capture exact values, then `/component-coder {name}` to build it."
