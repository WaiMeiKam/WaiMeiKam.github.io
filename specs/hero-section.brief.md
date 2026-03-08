# Brief: Homepage Hero Section
**Created:** 2026-03-07
**Status:** Ready for design iteration

---

## What is it?

The homepage is the entry point to Kim's World — a routing hub that orients visitors and directs them deeper into the site. It's not a static landing page or a business card. It's an arrival. The visitor steps into Kim's world and is invited to explore it.

---

## Who is it for and what should they feel?

**Audience:** Recruiters and people who are curious about Kim — who she is, how she thinks, what she makes.

**Emotional target (first 5 seconds):**
- Welcomed — like arriving somewhere intentional, not a generic portfolio
- Inspired — there's energy and originality here
- Curious — I want to know more about this person

**The underlying feeling:** *It's her world and I'm living in it.* The visitor is a guest, not a user.

---

## Content

### Text
- **Greeting:** RotatingHello — cycles "Hello" in different languages, followed by "I'm Kim"
- **Subtitle:** ⚠️ TBD — "Storyteller. Systems thinker. Curator." is a placeholder. Needs words that capture how Kim thinks, not a job title or designer label. Kim to define.
- **Tagline:** "A fireside for my work, thoughts, and whatever I'm noodling on lately." (keep as-is)

### Visuals
- **CampfireGlow** — the animated campfire illustration. Central visual. Handcrafted by Kim in Procreate.
- **Photo of Kim** — to be added. Sits behind or beside the "Hello / I'm Kim" heading, slightly layered. Adds the human face to the welcome. Photo asset TBD.
- **OriginIntro overlay** — cinematic first-visit experience using Kim's hand-drawn illustrations. Sets the world before the hero is revealed.

### Navigation
- **4 NavCards** — routes to: Get to Know Kim, What I'm Thinking About, What I'm Noodling On, What I've Tinkered and Delivered
- **Scroll CTA** — subtle bouncing arrow anchoring to #explore. Disappears after scroll or click.

### Audio
- **AudioToggle** — ambient lo-fi music toggle. Campfire Dreams / Lo-fi Mixtape.

### Removed
- ~~Footer illustration (handprint logo)~~ — cut. Competed with CampfireGlow, not earning its space.

---

## Functional Requirements

| Requirement | Detail |
|------------|--------|
| First-visit overlay | OriginIntro shows on first visit only (localStorage gate). Plays through Kim's hand-drawn cinematic sequence. Completion triggers FireBurst particle effect. |
| Campfire glow animation | Radial gold gradient, pulses when audio is playing (opacity 0.85 → 1 → 0.85, 4s loop). Static when audio is off. |
| Ambient sparks | Floating spark particles above campfire (AmbientSparks). Always present, subtle. |
| RotatingHello | Cycles "Hello" in multiple languages, then lands on English before "I'm Kim" |
| Staggered entry | All hero elements fade up in sequence after OriginIntro completes (or on direct load for returning visitors) |
| Scroll CTA | Fixed bottom-centre. Appears with 1.4s delay. Hides when user scrolls past 80px OR clicks it. Bounces on loop. |
| Audio toggle | Plays/pauses ambient track. Glow animation responds to play state. |
| Photo of Kim | Layered behind or beside the heading. Exact treatment TBD in detailed spec. |

---

## Non-Functional Requirements

| Requirement | Detail |
|------------|--------|
| Reduced motion | All animations must have `prefers-reduced-motion` fallback. Framer Motion `useReducedMotion()` hook already in use — extend to all new elements. |
| Accessibility | Keyboard navigable. All interactive elements reachable by Tab. ARIA labels on AudioToggle, ScrollCTA, NavCards, nav landmark. |
| WCAG AA | All text on campfire glow background must meet 4.5:1 contrast ratio. |
| Performance | All animations GPU-composited only (opacity + transform — no layout-triggering props). CampfireGlow SVG/canvas preferred over heavy DOM animation. Photo should be next/image with appropriate sizing. |
| Mobile vs desktop | ⚠️ **Primary design constraint.** Layout behaviour at mobile (390px) vs desktop (1440px) is the most important decision. Specific breakpoint treatments to be defined in detailed spec. |
| Static export | Site exports as static (next export). No server-only APIs. |

---

## Aesthetic Direction

**Campfire warmth** — not a dark cinematic night scene, not a corporate bright white. The warm middle ground: cream backgrounds, ember and gold accents, soft glow. Like sitting close to a fire, not looking at it from far away.

**Cinematic but personal.** The OriginIntro is the cinematic moment. The hero itself should feel warm and human — not slick or overproduced. The hand-drawn illustrations are a feature, not incidental.

**Reference energy (not direct copies):**
- Awwwards "Immersive Branding Portfolio" — *"not meant to be scrolled but paused and felt — through a cinematic brand experience where elements, design and sound merge into essence"*
- The feeling of arriving at a place, not loading a page

---

## Open Questions (resolve before detailed spec)

- [ ] **Subtitle copy** — what three words (or phrase) replaces "Storyteller. Systems thinker. Curator."? Kim to decide.
- [ ] **Photo of Kim** — which photo? What mood/crop? Where exactly does it sit relative to the heading?
- [ ] **Mobile layout** — does the photo appear on mobile? Does the layout stack differently? What gets deprioritised at small screens?
- [ ] **Desktop layout** — is this a centred single-column or does it open up into a wider composition at 1440px?

---

## Acceptance Criteria

- [ ] Visitor lands and feels welcomed within 3 seconds, before any scroll
- [ ] On first visit, OriginIntro plays before the hero is visible
- [ ] CampfireGlow is the dominant visual — nothing competes with it
- [ ] All 4 NavCards are reachable without scrolling on desktop (or with minimal scroll on mobile)
- [ ] AudioToggle works and glow responds to play state
- [ ] Photo of Kim is present and contributes to the human/welcome feeling
- [ ] Footer illustration does not appear
- [ ] All animations disabled when `prefers-reduced-motion: reduce` is set
- [ ] Keyboard navigation reaches all interactive elements in logical order
- [ ] Build passes `npm run build` (static export)
