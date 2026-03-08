# Specs

Component and page specifications for Kim's World.

Specs are created by `/requirements-writer` and consumed by `/component-coder` and `/qa-verifier`.

---

## File Naming

| Type | Filename pattern | Created by |
|------|-----------------|------------|
| Light brief (pre-design) | `{name}.brief.md` | `/requirements-writer` (light mode) |
| Detailed spec (post-design) | `{name}.spec.md` | `/requirements-writer` (detailed mode) |

---

## What goes in a brief

A 1-page document covering:
- What the component/page is and who it's for
- Functional requirements (what it must DO)
- Non-functional requirements (performance, accessibility, responsive)
- References or inspiration

## What goes in a spec

A detailed document covering:
- Exact dimensions at each breakpoint (mobile 390px, tablet 768px, desktop 1440px)
- Exact animation timing, easing curves, and triggers
- Image/illustration sizing, object-fit, aspect ratios
- All component states (default, hover, active, loading, error, empty)
- Accessibility requirements (keyboard behaviour, ARIA labels, focus order)
- Performance requirements (lazy loading, GPU compositing)
- Acceptance criteria as checkboxes

---

## The Rule

If a spec contains "appropriate", "nice", or "feels right" — it's not done.
Every value in a spec must be concrete. Abstract language is a placeholder, not a spec.

---

## Current Specs

*(None yet — run `/requirements-writer {component-name}` to create the first one)*
