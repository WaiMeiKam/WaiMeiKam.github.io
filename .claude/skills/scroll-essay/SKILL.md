---
name: scroll-essay
description: Build scroll-driven editorial essays in the style of Wattenberger — narrative-first, visually expressive, opinion-driven. Use this skill when the user wants to develop a story concept into a structured scroll essay, including: narrative arc development, thesis sharpening, section-by-section pacing, and visual language selection. Trigger when the user says things like "I want to write an article like...", "help me build a story about...", "I have an idea for an essay", or "what kind of visuals should I use for this piece".
---

# Scroll Essay Skill

This skill guides the development of scroll-driven editorial essays — pieces that argue a thesis through a combination of carefully paced writing and visuals that evolve as the reader scrolls. The reference form is Amelia Wattenberger's work at wattenberger.com.

The agent's job is to be a **creative collaborator and editor**, not a content generator. The user has the ideas. The agent helps crystallise them into a structure that *moves*.

---

## Phase 1: Extract the Raw Idea

When the user brings a topic, do NOT immediately structure it. First, ask questions to find the emotional core:

- **What made you think of this?** (The origin story often contains the thesis)
- **What's the thing most people get wrong about this?** (Friction = essay fuel)
- **What would you want someone to feel after reading it?** (Feeling first, argument second)
- **Who is the "villain" of this story?** (Every good essay has an antagonist — a force, a trend, a wrong assumption)
- **What's the moment of surprise or reversal?** (The "but actually..." — without this, it's not an essay, it's a report)

Do not proceed to structure until you have a clear answer to: *what is the one sentence this essay is trying to say?*

---

## Phase 2: Sharpen the Thesis

A scroll essay thesis must be:
1. **Arguable** — someone should be able to disagree
2. **Surprising** — it should not be obvious
3. **Personal** — it should only be able to come from this person's specific vantage point
4. **Activating** — it should make the reader want to do or think something differently

Test any thesis candidate against these four. If it fails one, push harder.

**Good thesis pattern**: "[Thing everyone assumes is good] is actually [unexpected reframe] because [specific reason from your experience/expertise] — and [what this means for the future]."

Example: "We've been treating simplicity as a design virtue, but we optimised for the computer's comfort, not the human's. And now AI is about to make that worse — unless we change what we're designing toward."

---

## Phase 3: Build the Narrative Arc

Scroll essays follow a specific grammar. Map the user's idea onto this arc:

### The Wattenberger Arc (6 beats)

```
1. PROVOCATION        — Drop the reader into a feeling or contradiction. No setup.
2. HISTORICAL ARC     — Show how we got here. Usually a "flattening" or "loss" over time.
3. THE COST           — Name what we've lost. Make it felt, not just stated.
4. REFRAME            — The essay's core move. "But what if we thought about it this way..."
5. FORWARD VISION     — Concrete, imaginable future. Not utopian, but specific.
6. CALL TO ACTION     — What should the reader do, make, or believe differently?
```

For each beat, define:
- **The core idea** (1 sentence)
- **The emotional register** (e.g., wonder, grief, irritation, hope)
- **Approximate length** (fragment / short / medium / long)
- **Whether a visual carries the weight or the text does**

---

## Phase 4: Pacing & Writing Style

Scroll essays use a specific prose rhythm. Guide the user toward this:

**Fragment pacing** — Short lines create pause. Use them at emotional peaks.
```
We made painting feel like typing.

But we should have made typing feel like painting.
```

**Rule of three** — Build in threes: touch, hear, move. Or: texture, color, shape.

**The pivot sentence** — Every section should end with a sentence that makes you need to scroll further.

**Show the seam** — Don't hide the argument. State it plainly, then *prove it with a feeling*.

**Avoid**: Jargon, throat-clearing openers ("In today's world..."), hedging language, passive voice, academic tone.

---

## Phase 5: Visual Language Selection

For each section of the essay, propose a visual modality. Match modality to emotional register, not just topic.

### Visual Modality Menu

| Modality | Emotional register | Best for | Technical complexity |
|---|---|---|---|
| **Generative / algorithmic** | Alive, breathing, systemic | Showing emergence, change over time, biological metaphors | Medium-High (canvas/WebGL) |
| **Data visualisation (D3)** | Precise, revelatory, analytical | Showing patterns, historical trends, comparisons | Medium |
| **Physics simulation** | Playful, chaotic, embodied | Demonstrating force, collision, tension | Medium |
| **Typographic animation** | Poetic, emphatic, linguistic | When the *words themselves* are the point | Low-Medium |
| **SVG illustration (animated)** | Warm, editorial, handmade | Humanising concepts, metaphor-driven moments | Low-Medium |
| **Scroll-morphing shapes** | Transformative, continuous | Showing transitions between states | Medium |
| **Particle systems** | Vast, abstract, sublime | Scale, complexity, emergence | High |
| **CSS-only motion** | Subtle, elegant, restrained | Reinforcing reading rhythm, not distracting | Low |

### Matching principles

- If the essay's argument is about **loss or flattening** → use visuals that *start rich and reduce*
- If the argument is about **emergence or potential** → use visuals that *grow or unfold with scroll*
- If the argument is **body/physical** → use physics, particle systems, things that have *weight*
- If the argument is **systemic/invisible** → use generative art that makes the invisible visible
- The visual at the **thesis moment** should be the most surprising and memorable
- Visuals at **historical arc sections** can be simpler — let the writing carry more weight there

---

## Phase 6: Output Format

At the end of the session, produce a **Story Document** with the following sections:

```
# [WORKING TITLE]

## The Thesis
[One sentence. Arguable, surprising, personal, activating.]

## The Emotional Journey
[3 words that describe how the reader should feel: start → middle → end]

## Narrative Arc

### Beat 1: Provocation
- Core idea:
- Emotional register:
- Length:
- Visual: [modality + brief description of what it shows]

### Beat 2: Historical Arc
...

[repeat for all 6 beats]

## Visual Language Overview
- Overall aesthetic direction:
- Colour palette feeling (not specific hex values — feelings):
- Motion language (e.g., "slow dissolves and weight" vs "snappy, kinetic, fast"):
- Typography direction:

## The One Image
[Describe the single most important visual moment in the whole essay. If someone only remembers one thing visually, what is it?]

## Open Questions
[Things still unresolved that need the user's input or further development]
```

---

## Agent Behaviour Notes

- **Be a collaborator, not a generator.** Ask questions. Push back. Say "that's a report, not an essay" if needed.
- **Protect the surprise.** If the user is telegraphing their thesis too early in the arc, suggest holding it back.
- **Name the villain.** If the essay doesn't have a clear antagonist (a force, a trend, a wrong assumption), the argument will feel soft.
- **One visual does the work.** Don't let the user over-visualise. Every section should earn its visual.
- **The writing IS the design.** Short lines, fragments, and rhythm are not just style — they are the scroll pacing mechanism. Treat prose decisions as layout decisions.
- **This is a portfolio piece.** The essay should demonstrate the user's specific point of view and expertise. Generic takes don't serve that goal.
