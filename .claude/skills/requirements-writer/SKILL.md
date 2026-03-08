---
name: requirements-writer
description: >
  Writes functional and non-functional requirements for components, pages, and sections.
  Use when: "requirements", "what should this do", "spec out", "new page", "new section",
  "before I design", "acceptance criteria", "I want to build", "it doesn't look right",
  "it doesn't feel right", "the sizing is off", "interaction spec", "detailed spec".
  Two modes: light (pre-design brief) and detailed (post-design interaction spec with exact values).
---

# Requirements Writer

This skill turns ambiguous ideas into concrete, buildable requirements. It has two modes — choose based on where you are in the design process.

**Rule that applies to both modes:** If a requirement contains the words "appropriate", "nice", "feels right", or "looks good" — it's not done. Every value must be concrete and testable.

---

## Mode Detection

**Light mode** — use when:
- "I want to build [thing]"
- "new page / new section / new component"
- "requirements for..."
- "before I design"
- "what should this do"

**Detailed mode** — use when:
- "spec this out" / "interaction spec" / "detailed spec"
- "the sizing is off" / "it doesn't feel right" / "it doesn't look right"
- A brief already exists and you're moving into design or code
- Post-design, before handing to `/component-coder`

If unclear, ask: "Are you starting from scratch (brief) or refining a design that exists (detailed spec)?"

---

## Light Mode — Pre-Design Brief

Interview the user **one question at a time**. Do not fire all questions at once. Wait for each answer before asking the next.

### Question sequence

1. **What is this?**
   "What is this page / section / component? Give me the simplest description."

2. **Who is it for and what should they feel?**
   "Who lands here and what should they feel — not think, feel — within the first 5 seconds?"

3. **What content lives here?**
   "What content does this contain? List everything that needs to appear."

4. **What must it DO?**
   "What are the functional requirements — the things it must actually do? (e.g. filters, animations, interactions, state changes)"

5. **What are the constraints?**
   "Any non-functional requirements? (Performance, accessibility, responsive breakpoints, reduced motion, connection speed)"

6. **References or inspiration?**
   "Any references, screenshots, or sites that are in the right direction? (Optional)"

### Output

Save as `specs/{name}.brief.md` using the brief template. Tell the user the file path.

---

## Detailed Mode — Post-Design Interaction Spec

Check if a brief exists at `specs/{name}.brief.md` — if so, read it and use it as context.

Interview **one question at a time**:

1. **Dimensions**
   "What are the exact dimensions at each breakpoint?
   - Mobile (390px): width, height, padding, margin
   - Tablet (768px): same
   - Desktop (1440px): same
   Give px or rem values — not 'full width' or 'medium'."

2. **Typography**
   "What text appears and at what sizes? Map each text element to a token:
   - font-size: `--font-size-{xs|sm|base|lg|xl|2xl|3xl|4xl|5xl}`
   - font-weight: `--font-weight-{normal|medium|semibold|bold}`"

3. **Colour**
   "What colours are used? Map each to a token:
   - `--color-{ember|flame|coal|gold|cream|ash|dusk}`
   - `--semantic-{primary|accent|background|surface|text|heading|glow}`"

4. **Spacing & radius**
   "What spacing and border-radius values? Use tokens:
   - spacing: `--spacing-{xs|sm|md|lg|xl|2xl|3xl}`
   - radius: `--radius-{sm|md|lg|full}`"

5. **Animation**
   "Describe every animation:
   - What triggers it? (mount, scroll-into-view, hover, click)
   - What properties animate? (opacity, transform, scale, y-position)
   - Duration in ms?
   - Easing curve? (easeIn, easeOut, easeInOut, linear, spring)
   - Repeat? (once, loop, mirror)
   - Reduced-motion fallback: what happens when `prefers-reduced-motion: reduce` is set?"

6. **States**
   "List every state this component can be in and describe how it looks in each:
   - Default
   - Hover (if interactive)
   - Active / pressed (if interactive)
   - Focus (keyboard — what does the focus ring look like?)
   - Loading (if async)
   - Error (if fallible)
   - Empty (if data-driven)"

7. **Images & illustrations**
   "For any images or illustration slots:
   - Exact size (w x h in px at each breakpoint)
   - object-fit value (cover, contain, fill)
   - Aspect ratio (e.g. 16:9, 1:1, 4:3)
   - IllustrationSpot name (e.g. `hero-campfire`)"

8. **Accessibility**
   "Accessibility requirements:
   - What is the ARIA role of this component?
   - What ARIA labels are needed and what do they say?
   - What is the keyboard interaction? (Tab order, Enter, Escape, arrow keys)
   - What is the focus order through the component?"

9. **Performance**
   "Any performance requirements?
   - Lazy-loaded? (below the fold)
   - Should images use `loading='lazy'`?
   - Are any animations GPU-composited only? (opacity + transform only — no layout props)"

### Output

Save as `specs/{name}.spec.md` using the spec template. Tell the user the file path.

After saving, say: "Ready for `/component-coder {name}` — or run `/qa-verifier {name}` to check an existing build against this spec."

---

## Follow-up Rule

If the user says "it doesn't feel right" about something already built — do NOT guess what's wrong. Ask:

> "Is it the timing? The size? The position? The easing? The colour? Walk me to the exact thing that's off and I'll spec it precisely."

Then update the relevant section of the spec.

---

## Token Reference (for all specs)

### Colour
`--color-ember` (#D4590A) · `--color-flame` (#E76F51) · `--color-coal` (#1C0A02)
`--color-gold` (#E9C46A) · `--color-cream` (#FFF8F0) · `--color-ash` (#2C1810) · `--color-dusk` (#FDEBD0)

Semantic aliases: `--semantic-primary` · `--semantic-accent` · `--semantic-background`
`--semantic-surface` · `--semantic-text` · `--semantic-heading` · `--semantic-glow`

### Font size
`--font-size-xs` (12px) · `--font-size-sm` (14px) · `--font-size-base` (16px)
`--font-size-lg` (18px) · `--font-size-xl` (20px) · `--font-size-2xl` (24px)
`--font-size-3xl` (30px) · `--font-size-4xl` (36px) · `--font-size-5xl` (48px)

### Font weight
`--font-weight-normal` (400) · `--font-weight-medium` (500)
`--font-weight-semibold` (600) · `--font-weight-bold` (700)

### Spacing
`--spacing-xs` (4px) · `--spacing-sm` (8px) · `--spacing-md` (16px)
`--spacing-lg` (24px) · `--spacing-xl` (32px) · `--spacing-2xl` (48px) · `--spacing-3xl` (64px)

### Radius
`--radius-sm` (4px) · `--radius-md` (8px) · `--radius-lg` (16px) · `--radius-full` (pill)

### Shadow
`--shadow-sm` · `--shadow-md` · `--shadow-lg` · `--shadow-glow` (campfire gold glow)
