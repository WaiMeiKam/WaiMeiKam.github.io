---
name: qa-verifier
description: >
  Verifies that what was built matches what was designed and specified. Reads a spec file
  (specs/{name}.spec.md), walks through acceptance criteria, checks responsive behaviour
  at mobile/tablet/desktop breakpoints, verifies animation timing and reduced-motion fallback,
  checks accessibility (ARIA, keyboard, focus). Reports pass/fail per criterion.
  Uses Code-to-Canvas to capture UI into Figma for visual comparison if available.
  Use when: "check this", "verify against spec", "QA", "does this match", "acceptance criteria",
  "test the component", "review build", "check responsive", "check accessibility".
---

# QA Verifier Skill

## Purpose

Systematic verification that what was built matches what was specified. Not a vibe check — a criterion-by-criterion audit with explicit pass/fail for each item.

The fidelity problem this skill closes: `/component-coder` produces something that looks right in isolation but drifts from the spec in subtle ways. QA Verifier catches those drifts before they become "good enough" debt.

---

## Inputs

### Primary
`specs/{name}.spec.md` — the detailed spec from `/requirements-writer` (detailed mode).

Read the spec fully before starting. If no spec exists, say:
> "I need a detailed spec to verify against. Run `/requirements-writer {name} --detailed` first, or share the acceptance criteria directly."

### Secondary
- The built component file(s)
- The Figma design link (if visual comparison is needed)

---

## Verification Checklist

Work through these sections in order. For each criterion: **PASS**, **FAIL**, or **PARTIAL** (with a note).

---

### 1. Acceptance Criteria (from spec)

Read the acceptance criteria checkboxes at the bottom of the spec. Verify each one against the code.

```
## Acceptance Criteria Verification

[ ] AC-01: [Criterion from spec]
    Result: PASS / FAIL / PARTIAL
    Evidence: [What I found in the code that confirms or contradicts this]

[ ] AC-02: [Criterion from spec]
    Result: PASS
    Evidence: Line 34 in ComponentName.tsx — aria-label="..." matches spec requirement

[ ] AC-03: [Criterion from spec]
    Result: FAIL
    Evidence: Spec requires hover background --semantic-surface with opacity 0.8. Code uses --semantic-surface at full opacity (line 28).
```

---

### 2. Visual Fidelity

Compare the component code against the spec's visual values:

| Property | Spec value | Code value | Result |
|----------|-----------|------------|--------|
| Background | var(--semantic-surface) | var(--semantic-surface) | PASS |
| Text colour | var(--semantic-text) | var(--semantic-text) | PASS |
| Border radius | var(--radius-lg) | var(--radius-md) | FAIL |
| Padding | var(--spacing-lg) all sides | var(--spacing-md) vertical, var(--spacing-lg) horizontal | PARTIAL |
| Shadow | var(--shadow-md) | var(--shadow-sm) | FAIL |
| Font size | var(--font-size-lg) | var(--font-size-base) | FAIL |

Flag all FAIL and PARTIAL rows with the exact line number in the component file.

---

### 3. Responsive Behaviour

Check what the code does at each breakpoint:

**Mobile (default / no prefix):**
- Layout direction from spec vs code
- Padding and spacing from spec vs code
- Font sizes from spec vs code
- Any elements hidden on mobile (spec requirement vs code implementation)

**Tablet (`md:` prefix, 768px):**
- If spec defines distinct tablet behaviour, verify it exists in the code
- If spec says "same as mobile" or doesn't mention tablet, flag if code has unexpected tablet overrides

**Desktop (`lg:` prefix, 1440px):**
- Layout changes (column count, width constraints, side-by-side vs stacked)
- Max-width constraint from spec vs `max-w-*` in code
- Spacing increases from spec vs code

```
## Responsive Verification

### Mobile (default)
- Layout: PASS — single column as spec requires
- Padding: FAIL — spec requires --spacing-md (16px), code uses --spacing-sm (8px)

### Desktop (lg:)
- Layout: PASS — two column as spec requires
- Max-width: PASS — max-w-[1200px] matches spec value of 1200px
- Spacing: PASS
```

---

### 4. Animation and Motion

For each animated property in the spec:

| Animation | Spec value | Code value | Result |
|-----------|-----------|------------|--------|
| Enter duration | 350ms (0.35s) | 0.35s | PASS |
| Enter easing | cubic-bezier(0.25, 0.46, 0.45, 0.94) | [0.25, 0.46, 0.45, 0.94] | PASS |
| Hover scale | 1.02 | 1.02 | PASS |
| Hover duration | 200ms | 0.3s | FAIL — spec says 200ms, code uses 300ms |
| Stagger delay | 80ms per item | 0.08s | PASS |

**Reduced motion check:**
- `useReducedMotion()` hook present: YES / NO
- When `prefersReducedMotion` is true: translate/scale animations disabled: YES / NO
- Opacity transitions still present (acceptable under reduced motion): YES / NO
- Duration set to 0 or near-0 under reduced motion: YES / NO

```
## Animation Verification
useReducedMotion: PASS — hook imported and used
Reduced motion branch: PASS — y:0, duration:0 when prefersReducedMotion true
Enter duration: PASS — 0.35s matches spec
Hover duration: FAIL — spec requires 0.2s, code has 0.3s (line 47)
Easing: PASS — cubic-bezier matches spec exactly
```

---

### 5. Accessibility

Check against the spec's accessibility requirements:

**ARIA:**
```
## ARIA Verification
- aria-label on [element]: PASS — "Description from spec" present (line 23)
- aria-label on [element]: FAIL — missing, spec requires aria-label="..."
- role="list" on ul: PASS
- aria-pressed on toggle button: FAIL — not implemented
```

**Keyboard interaction:**
- Tab focus reachable: verify the element has no `tabIndex={-1}` unless spec says so
- Enter/Space triggers action: verify `onKeyDown` handler exists on interactive elements
- Escape dismisses modal/dropdown: verify if spec requires it
- Arrow key navigation: verify if spec requires it (lists, sliders, tabs)

**Focus ring:**
- Visible focus ring: check for `focus:` or `focus-visible:` styles
- Custom focus ring style matches spec (or uses browser default if spec allows)

**Contrast:**
- Verify colour combinations against spec — flag any text-on-background pairings to check at WCAG AA (4.5:1 for normal text, 3:1 for large text)

---

### 6. Token Compliance

Verify no naked values slipped in during implementation:

- Any hex colours not using `var(--*)`: flag each one
- Any hardcoded spacing (px, rem, Tailwind scale) not using `var(--spacing-*)`: flag
- Any hardcoded radius not using `var(--radius-*)`: flag
- Any hardcoded shadows not using `var(--shadow-*)`: flag

This is a quick scan — cross-reference with the design-system-caretaker audit if a full sweep is needed.

---

### 7. Component States

For each state required by the spec, verify the implementation:

| State | Required by spec | Implemented | Correct |
|-------|-----------------|-------------|---------|
| Default | YES | YES | PASS |
| Hover | YES | YES | FAIL — wrong colour |
| Active | YES | NO | FAIL — not implemented |
| Focus | YES | YES | PASS |
| Loading | YES | YES | PASS |
| Error | YES | NO | FAIL — not implemented |
| Empty | NO | — | N/A |
| Disabled | YES | YES | PASS |

---

### 8. Visual Comparison (if Figma MCP available)

If a Figma frame link was provided or is available:

1. Use Figma MCP to read the design frame
2. Use Code-to-Canvas to capture the built component into a new Figma frame (if available)
3. Compare the two frames side by side in the report

```
## Visual Comparison
Figma frame: [frame name]
Code capture: [captured via Code-to-Canvas / not available]

Visible differences:
- Card shadow appears lighter in code than Figma
- Heading size looks smaller in code than Figma (matches FAIL in visual fidelity check)
- Spacing between elements appears correct
```

If Code-to-Canvas is not available: note it and rely on the code-level checks above.

---

## Final Report Format

```
# QA Report: {ComponentName}
Spec: specs/{name}.spec.md
Date: {date}
Build: {file path to component}

## Overall Result
PASS / FAIL / PARTIAL

## Summary
- Acceptance criteria: {n} PASS, {n} FAIL, {n} PARTIAL
- Visual fidelity: {n} PASS, {n} FAIL
- Responsive: PASS / FAIL / PARTIAL
- Animation: PASS / FAIL / PARTIAL
- Accessibility: PASS / FAIL / PARTIAL
- Token compliance: PASS / FAIL
- Component states: {n}/{total} implemented correctly

## Issues to Fix (priority order)

### Critical
1. [Issue] — [File:line] — [What spec requires vs what code does]

### High
2. [Issue] — [File:line] — [What to fix]

### Low
3. [Issue] — [File:line] — [What to fix]

## What's Working
- [List PASS items briefly]
```

After the report, offer:
> "Want me to fix the critical and high issues now?"
