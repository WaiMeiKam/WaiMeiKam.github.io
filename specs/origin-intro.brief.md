# Brief: Origin Intro
**Created:** 2026-03-07
**Status:** Ready for detailed spec

---

## What is it?

A full-screen, scroll-driven cinematic intro shown only on a visitor's first visit. It tells the story of fire — from darkness, to the first spark, to human evolution, to Kim's work today. It runs in front of everything (z-index 200), then dissolves into the homepage with a FireBurst particle effect when the viewer reaches the end.

Gated by `localStorage("hasSeenIntro")`. Never shown twice.

---

## Who is it for and what should they feel?

**Audience:** First-time visitors — recruiters, curious people landing on Kim's World for the first time.

**Emotional arc:**
- Scene 1 (Void): Mysterious, ancient — darkness before light
- Scene 2 (Fire): Warmth emerging — fire as the first innovation
- Scene 3 (Gathering): Community, storytelling — fire as the first social technology
- Scene 4 (Chain): Continuity — Kim is part of a long line of makers passing the fire forward
- Finale CTA: Invitation — "Make your first spark" — you're being welcomed in

**The torch cursor** makes the visitor an active participant — they literally illuminate the story with their movement.

---

## Content

### Scenes

| Scene | Illustrations | Texts |
|-------|--------------|-------|
| 1: Void | `origin-scene-01` (handprint) — rotated -16.57°, right-center | "Before language." · "Before cities." · "Before everything we call civilisation — there was darkness." · "Until one night, it started with a spark 🔥" |
| 2: Fire | `scene-2a` (campfire, large, bleeds left) · `scene-2b` (evolution chart, right, rotated 2.47°) | "Fire made the night survivable." · "It was an innovation — a spark that set human evolution in motion." |
| 3: Gathering | `scene-3a` (figures around fire) · `scene-3b` (cave paintings/hunt) | "Fire pulled us into circles and formed communities." · "By firelight we told our first stories and passed down thousands more." |
| 4: Chain | `scene-4a` (figures passing fire) · `scene-4b` (AI sparks, .gif) | "Every maker and storyteller since has been passing the fire forward." · "New tools, new problems, new ways of telling the story." |

### Typography
- **Story text:** Adamina 400 (serif), 18px, cream, letter-spacing 0.5px
- **Subtitle/CTA context text:** "The fire doesn't stop here." — gold, 18px
- **CTA button:** "Make your first spark →" — gold pill button, dark text

### Controls
- **Skip button:** Top-right, appears after 1s. Dismisses intro without FireBurst.
- **Scroll hint:** Bottom-center chevron + "scroll" label. Fades out after scrolling.
- **TorchCursor:** Follows mouse/touch. Reveals content through a radial mask in the darkness.

### Finale CTA
Appears via IntersectionObserver when a sentinel div at the end scrolls into view. Gradient fade at bottom of screen. "Make your first spark →" button triggers FireBurst + intro dismiss.

---

## Functional Requirements

| Requirement | Detail |
|------------|--------|
| First-visit only | `localStorage.getItem("hasSeenIntro")` gate. Set to "true" on skip OR CTA completion. |
| Torch cursor | `TorchCursor` component — radial mask follows mouse/touch at 60fps via rAF. On load: centred, radius 350px. After first move: radius 220px. |
| Text reveal | Texts fade in progressively as user scrolls into each scene. Each text is individually timed based on scroll progress within its section. |
| Skip button | Fixed top-right, z-20. Appears 1s after mount. Dismisses without FireBurst. Dispatches `introComplete` CustomEvent for NavBar. |
| CTA button | Fixed bottom, appears when scroll sentinel is in view. Dismisses WITH FireBurst, passing button centre coordinates as originX/Y. Dispatches `introComplete` CustomEvent. |
| FireBurst | Particle effect triggered from CTA button position on completion. |
| NavBar | NavBar listens for `introComplete` CustomEvent to reappear after intro dismisses. |
| Reduced motion | All Framer Motion animations must degrade gracefully. `useReducedMotion()` already used — extend to illustration breathing. |

---

## Non-Functional Requirements

| Requirement | Detail |
|------------|--------|
| Performance | Torch cursor uses rAF loop with direct DOM mutation — no React state per frame. All illustration animations GPU-composited (opacity + transform only). |
| Accessibility | `aria-hidden="true"` on scroll container (decorative). Skip button has `aria-label="Skip intro"`. CTA is keyboard reachable. |
| Static export | No server APIs used. `localStorage` wrapped in try/catch. |
| Mobile | Touch events handled in TorchCursor. Scene layout needs to work at 390px. |

---

## Open Questions (resolve in detailed spec)

- [ ] **Scene height:** Should each scene be exactly `100svh`, or `min-h-screen` (allows taller on short content)?
- [ ] **Scene 2 illustration bleed:** Pencil shows `scene-2a` (campfire) starting at x=-13vw, bleeding off left edge. Is this the intended feel, or should it sit fully within the viewport?
- [ ] **Scene 3 & 4 illustration positions:** No Pencil designs exist for these scenes yet. Should they match Scene 2's loose, large, bleeding style, or be more contained?
- [ ] **Mobile layout:** Do the absolute-positioned large illustrations stack/resize gracefully at 390px, or does mobile need a different layout (centred single illustration per scene)?
- [ ] **Scene 4 (chain) - `scene-4b.gif`:** This is an animated GIF (AI sparks). Should it be large and prominent or a smaller accent?

---

## Acceptance Criteria

- [ ] Scene 1 handprint renders at ~40vw wide, positioned right-centre, visibly rotated ~-17°
- [ ] Scene 2 campfire illustration is large and bleeds towards the left edge
- [ ] Scene 2 evolution chart sits right-of-centre, slightly rotated
- [ ] Each scene feels like a full viewport "moment" (no cramped 60vh sections)
- [ ] Text reveals progressively as user scrolls into each scene
- [ ] TorchCursor follows mouse/touch — content visible through the light circle
- [ ] Skip button appears at 1s and dismisses cleanly
- [ ] Scrolling to end reveals "Make your first spark →" CTA
- [ ] CTA click triggers FireBurst and transitions to homepage
- [ ] All animations off when `prefers-reduced-motion: reduce` is set
- [ ] Build passes `npm run build`
