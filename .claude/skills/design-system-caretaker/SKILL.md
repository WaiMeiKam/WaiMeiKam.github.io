---
name: design-system-caretaker
description: >
  Keeps design tokens, components, and Figma in sync. Audits for hardcoded "naked" values
  (colours, spacing, radius not using CSS custom properties). Syncs tokens between
  Figma variables (via MCP) and tokens.json. Flags drift between Figma designs and
  coded components. Manages the build:tokens pipeline and reports token coverage.
  Use when: "sync tokens", "audit tokens", "naked values", "token drift", "hardcoded values",
  "tokens out of sync", "design system audit", "token coverage", "Figma variables".
---

# Design System Caretaker Skill

## Purpose

Keeps `tokens/tokens.json` as the single source of truth. Audits the codebase for places where that truth has been violated — hardcoded values, stale CSS, missing token references. Syncs with Figma when needed. Reports clearly so fixes are obvious.

---

## Modes

Determine which mode from the user's request:

| Trigger phrase | Mode |
|---------------|------|
| "audit tokens", "naked values", "hardcoded values" | **Audit Mode** |
| "sync tokens", "Figma variables", "tokens out of sync" | **Sync Mode** |
| "build tokens", "rebuild CSS", "regenerate" | **Build Mode** |
| "token coverage", "token report" | **Coverage Mode** |
| "drift", "Figma vs code", "design system audit" | **Drift Mode** |

---

## Mode A: Audit — Naked Value Scan

Scans all component files for hardcoded values that should be tokens.

### What to scan for

**Naked colour values** — any hex, rgb, hsl, or named colour not using a CSS custom property:
```tsx
// NAKED — flag these
className="bg-[#FDEBD0]"
className="text-orange-600"
style={{ color: "#2C1810" }}
className="bg-amber-100"
```

**Naked spacing values** — any px, rem, or Tailwind spacing scale not using a token:
```tsx
// NAKED — flag these
className="p-4"          // should be p-[var(--spacing-md)]
className="gap-6"        // should be gap-[var(--spacing-lg)]
style={{ padding: "16px" }}
style={{ marginTop: "1.5rem" }}
```

**Naked radius values** — any hardcoded border-radius:
```tsx
// NAKED — flag these
className="rounded-lg"   // should be rounded-[var(--radius-lg)]
className="rounded-[8px]"
style={{ borderRadius: "8px" }}
```

**Naked shadow values** — any hardcoded box-shadow:
```tsx
// NAKED — flag these
style={{ boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
className="shadow-md"    // should be shadow-[var(--shadow-md)]
```

### Scan targets
```
components/ui/**/*.tsx
components/features/**/*.tsx
components/illustrations/**/*.tsx
app/**/*.tsx
```

Do NOT scan:
- `app/globals.css` (this IS the generated token output)
- `tokens/tokens.json` (this is the source)
- `tokens/build.mjs` (this is the build script)

### Report format

```
# Naked Value Audit — {date}

## Summary
- Files scanned: {n}
- Files with violations: {n}
- Total violations: {n}

## Violations

### components/features/SomeComponent.tsx
| Line | Violation | Should be |
|------|-----------|-----------|
| 24 | `className="bg-[#FDEBD0]"` | `bg-[var(--semantic-surface)]` |
| 31 | `className="p-4"` | `p-[var(--spacing-md)]` |
| 45 | `style={{ borderRadius: "8px" }}` | `style={{ borderRadius: "var(--radius-md)" }}` |

### components/ui/AnotherComponent.tsx
[...]

## Token Reference
[List all available tokens and their values for quick reference]
```

After reporting, offer:
> "Want me to fix these violations now? I'll replace each naked value with the correct token."

---

## Mode B: Sync — Figma Variables ↔ tokens.json

Compares Figma variable values (read via Figma MCP) with `tokens/tokens.json`.

### Process

1. Read `tokens/tokens.json` — build a flat map of all token names and values
2. Read Figma variables via Figma MCP — build a matching flat map
3. Compare the two maps and categorise each difference

### Difference categories

| Category | Meaning | Action |
|----------|---------|--------|
| **In code, not Figma** | Token exists in tokens.json but not in Figma variables | Flag — may need to add to Figma |
| **In Figma, not code** | Figma variable exists but not in tokens.json | Flag — may need to add to tokens.json |
| **Value mismatch** | Same name, different value | Flag — ask Kim which is authoritative |
| **In sync** | Name and value match exactly | No action needed |

### Report format

```
# Token Sync Report — {date}

## Summary
- tokens.json tokens: {n}
- Figma variables: {n}
- In sync: {n}
- Mismatches: {n}
- Code only: {n}
- Figma only: {n}

## Value Mismatches (requires decision)
| Token | tokens.json | Figma | Recommendation |
|-------|-------------|-------|----------------|
| color.ember | #D4590A | #D45A0B | 1px difference — likely rounding. Which is authoritative? |

## In Code Only
- spacing.4xl — exists in tokens.json, not in Figma

## In Figma Only
- color.terracotta — exists in Figma, not in tokens.json

## In Sync
{n} tokens matched exactly.
```

After reporting, ask:
> "For each mismatch, which source is authoritative — tokens.json or Figma?"

Then make the approved changes and offer to run the build.

---

## Mode C: Build — Regenerate globals.css

Runs the token build pipeline.

```bash
npm run build:tokens
```

Then verify the output:
1. Read `app/globals.css` and confirm it contains all tokens from `tokens.json`
2. Check that CSS custom properties are on `:root`
3. Spot-check 3–5 specific token values match expected hex/rem values

Report:
```
# Token Build — {date}

Build: SUCCESS / FAILED

## Verification
- :root block present: YES
- --color-ember: #D4590A ✓
- --semantic-surface: #FDEBD0 ✓
- --spacing-md: 1rem ✓
[...]

## Warning (if any)
[Any tokens in tokens.json not found in the built CSS]
```

If build fails, report the full error and suggest likely causes (syntax error in tokens.json, build script issue).

---

## Mode D: Coverage — Token Usage Report

Reports which tokens are used across the codebase and which are unused.

Scan all component and page files for `var(--{token-name})` references.

```
# Token Coverage Report — {date}

## Used Tokens (referenced in components)
- --color-ember: 12 references (Button.tsx, NavCard.tsx, ...)
- --semantic-surface: 8 references (Card.tsx, ...)
[...]

## Unused Tokens (in tokens.json, never referenced)
- --color-coal: 0 references — only used as base for --semantic-heading
- --font-bad-ux: 0 direct references (applied via class)

## Coverage: {n}/{total} tokens referenced at least once
```

Note: Some base tokens (like `--color-coal`) are only used as references inside `tokens.json` itself, not directly in components. Flag these separately from truly unused tokens.

---

## Mode E: Drift — Figma vs Code Comparison

Detects when a coded component no longer matches its Figma design.

### Process

1. Read the component file
2. Read the corresponding Figma frame via Figma MCP (ask for the frame link if not provided)
3. Compare property by property:
   - Background colour
   - Text colour and size
   - Spacing and padding
   - Border radius
   - Shadows
   - Layout direction and gap
   - Font weight
   - Component states (hover, active, etc.)

### Report format

```
# Drift Report: {ComponentName} — {date}

## Status: DRIFT DETECTED / IN SYNC

## Differences
| Property | Figma | Code | Severity |
|----------|-------|------|----------|
| Card padding | 24px | 16px (--spacing-md) | Medium |
| Hover background | #E8D5B0 | --semantic-surface | Low — close but not exact |
| Heading weight | 700 | semibold (600) | High — visible difference |

## In Sync
- Background colour ✓
- Border radius ✓
- Shadow ✓
```

After reporting, offer:
> "Want me to update the code to match Figma, or flag this for a spec update first?"

---

## Token Reference (always available)

| Token | CSS property | Value |
|-------|-------------|-------|
| color.ember | --color-ember | #D4590A |
| color.flame | --color-flame | #E76F51 |
| color.coal | --color-coal | #1C0A02 |
| color.gold | --color-gold | #E9C46A |
| color.cream | --color-cream | #FFF8F0 |
| color.ash | --color-ash | #2C1810 |
| color.dusk | --color-dusk | #FDEBD0 |
| semantic.primary | --semantic-primary | {color.ember} |
| semantic.accent | --semantic-accent | {color.flame} |
| semantic.background | --semantic-background | {color.cream} |
| semantic.surface | --semantic-surface | {color.dusk} |
| semantic.text | --semantic-text | {color.ash} |
| semantic.heading | --semantic-heading | {color.coal} |
| semantic.glow | --semantic-glow | {color.gold} |
| spacing.xs | --spacing-xs | 0.25rem (4px) |
| spacing.sm | --spacing-sm | 0.5rem (8px) |
| spacing.md | --spacing-md | 1rem (16px) |
| spacing.lg | --spacing-lg | 1.5rem (24px) |
| spacing.xl | --spacing-xl | 2rem (32px) |
| spacing.2xl | --spacing-2xl | 3rem (48px) |
| spacing.3xl | --spacing-3xl | 4rem (64px) |
| radius.sm | --radius-sm | 0.25rem |
| radius.md | --radius-md | 0.5rem |
| radius.lg | --radius-lg | 1rem |
| radius.full | --radius-full | 9999px |
| shadow.sm | --shadow-sm | 0 1px 2px 0 rgba(0,0,0,0.05) |
| shadow.md | --shadow-md | 0 4px 6px -1px rgba(0,0,0,0.1), ... |
| shadow.lg | --shadow-lg | 0 10px 15px -3px rgba(0,0,0,0.1), ... |
| shadow.glow | --shadow-glow | 0 0 30px 10px rgba(233,196,106,0.3) |
