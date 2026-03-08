# Visual Brief: AI Overcooked

**Article:** `ai-overcooked` — AI Has Turned Us All Into Overcooked Chefs  
**Format:** Visual-led essay with 5 illustration spots (1 hero + 4 in-body)  
**Metaphor:** Overcooked (the game) — kitchen, speed, handoffs, chefs burning out

---

## Cohesive Visual Language

### Style direction

Choose **one** style and carry it through all five spots. Consistency matters more than variety.

| Style | Pros | Cons | Fit for Kim's world |
|-------|------|------|---------------------|
| **Clay / sculptural** | Tactile, warm, handcrafted. Overcooked's aesthetic is already playful 3D. Feels human. | Requires 3D modelling or clay photography. | Strong — tactile, warm, campfire-adjacent |
| **Knit / textile** | Unexpected, cosy, human. "Chefs" as knitted figures = instantly relatable. | Very distinctive; may feel too niche. | Good — cosy, campfire vibes |
| **Flat illustration** | Clean, editorial, fast to produce. Matches Kim's existing IllustrationSpot style. | Less distinctive; common in design portfolios. | Safe — fits current aesthetic |
| **Paper cut / collage** | Layered, craft feel. Intricate cutwork. | Can feel busy if not restrained. | Strong — handcrafted, editorial |
| **Pixel art** | Direct Overcooked game reference. Nostalgic, playful. | May feel too literal or game-like. | Moderate — fun but potentially limiting |

**Recommendation:** **Clay or paper cut** — both feel handcrafted, warm, and aligned with Kim's campfire palette. Clay is more playful (Overcooked's native vibe); paper cut is more editorial and distinctive.

### Layout and copy relationship

Each illustration sits **between** sections, not floating. The article layout:

1. **Hero** (`article-ai-overcooked`) — above the fold, before any body copy. Sets the mood. Reader sees this first.
2. **Spot 01** — after the opening paragraph. "Before: a kitchen that breathes."
3. **Spot 02** — after "The productivity paradox." "AI turns up the heat."
4. **Spot 03** — after "Review fatigue." "The weakest handoff decides whether the dish lands."
5. **Spot 04** — after "The boundary collapse." "The chefs are burning out."

**Layout rules:**
- Each illustration is full-width (800×400 in the article body; hero is same aspect ratio).
- Captions are optional but recommended — they anchor the metaphor.
- **Spot 03** is the emotional peak. Consider making this one animated (gif/apng).

### Static vs movement

| Spot | Format | Rationale |
|------|--------|------------|
| **Hero** | Static | First impression. Sets tone without overwhelming. |
| **01** | Static | Calm. Movement would contradict "a kitchen that breathes" (peaceful). |
| **02** | Static or subtle loop | Acceleration could be subtle (e.g. steam rising faster, ingredients appearing). Optional. |
| **03** | **Animated (gif/apng)** | This is the chaos moment. A loop of handoff failure — dropped plate, chef scrambling — sells the intensity. **Prioritise animation here.** |
| **04** | Static | Burnout is heavy, still. A frozen moment of exhaustion lands harder than motion. |

**Summary:** One animated spot (03). The rest static. Don't over-animate — it dilutes the impact.

---

## Palette (Kim's tokens)

Use these from `tokens/tokens.json` (or equivalent hex):

- **ember** — #D4590A (primary, CTAs, flames)
- **flame** — #E76F51 (accent, coral-orange)
- **coal** — #1C0A02 (headings, dark)
- **gold** — #E9C46A (warmth, glow)
- **cream** — #FFF8F0 (background)
- **ash** — #2C1810 (body text)
- **dusk** — #FDEBD0 (subtle fill)

**Overcooked twist:** The game uses bright, saturated colours. You can push slightly more saturated for the chaos spots (02, 03, 04) while keeping the calm spot (01) in the warmer, softer palette.

---

## Individual Briefs

### Hero: `article-ai-overcooked`

**File:** `public/illustrations/article-ai-overcooked.png`  
**Format:** Static  
**Dimensions:** 800×400 (or 2:1 aspect ratio)

**Scene:** A kitchen viewed from above or at an angle — Overcooked-style. One or two chefs. Stations visible (stove, counter, prep). The mood is *before* the rush. Calm but with a hint of what's coming (maybe an order ticket starting to appear, or a timer in the corner). Not chaotic yet.

**Mood:** Anticipation. "The calm before." Warm, inviting.

**Key elements:** Chef(s), kitchen stations, warm lighting. Palette: cream, gold, ember, ash. Avoid neon or harsh edges.

**Style notes:** If clay — soft, rounded forms. If paper cut — layered depth, warm shadows. If flat — editorial, clean.

---

### Spot 01: `ai-overcooked-01`

**File:** `public/illustrations/ai-overcooked-01.png`  
**Format:** Static  
**Dimensions:** 800×400

**Scene:** Same kitchen as hero, but zoomed in or a different angle. One chef at a station. Clear, organised. No rush. Maybe a single order being prepared with care. "A kitchen that breathes."

**Mood:** Peaceful. Sustainable. Human-paced.

**Caption:** "Before: a kitchen that breathes."

**Key elements:** Single chef, one station, clear workspace. Warm, soft light. Palette: cream, dusk, gold, ash.

---

### Spot 02: `ai-overcooked-02`

**File:** `public/illustrations/ai-overcooked-02.png`  
**Format:** Static (or subtle loop if you want)  
**Dimensions:** 800×400

**Scene:** The kitchen accelerates. More orders. More ingredients. More chefs or the same chef moving. Steam rising. Things starting to overlap. The pace is visibly increasing. Not yet chaos — but the pressure is building.

**Mood:** Building. Intensity. "AI turns up the heat."

**Caption:** "AI turns up the heat."

**Key elements:** Multiple orders, more ingredients, steam, movement implied. Palette: add more flame, ember. Slightly more saturated.

---

### Spot 03: `ai-overcooked-03` (ANIMATED)

**File:** `public/illustrations/ai-overcooked-03.gif` (or `.apng`)  
**Format:** Animated loop  
**Dimensions:** 800×400 (or 2:1)

**Scene:** Handoff chaos. A plate being passed — and dropped. Or a chef reaching, another chef turning away. Missed connection. The moment of failure. Loop: 2–4 seconds. Could be a simple handoff-fail loop or ingredients flying.

**Mood:** Chaos. Frustration. "The weakest handoff decides whether the dish lands."

**Caption:** "The weakest handoff decides whether the dish lands."

**Key elements:** Two chefs, handoff moment, failure (dropped plate, missed pass). Animation: loop smoothly. No jarring cuts. Palette: flame, ember, maybe a hint of red (urgency).

**Animation notes:** Keep it short (2–4 sec). Seamless loop. Avoid distracting from the copy. If clay — stop-motion or 3D animation. If flat — simple keyframe animation.

---

### Spot 04: `ai-overcooked-04`

**File:** `public/illustrations/ai-overcooked-04.png`  
**Format:** Static  
**Dimensions:** 800×400

**Scene:** Kitchen on fire. Literally or metaphorically. Chefs exhausted — slumped, head in hands, or staring at flames. The kitchen is overwhelmed. Smoke, flames, chaos. But the chefs are *still. Burnt out.*

**Mood:** Exhaustion. Burnout. "The chefs are burning out."

**Caption:** "The chefs are burning out."

**Key elements:** Fire, smoke, exhausted chefs. Palette: ember, flame, coal, ash. Darker tones. The warmth has turned to heat.

---

## File naming and placement

| File name | Location | Format |
|-----------|----------|--------|
| `article-ai-overcooked.png` | `public/illustrations/` | Static |
| `ai-overcooked-01.png` | `public/illustrations/` | Static |
| `ai-overcooked-02.png` | `public/illustrations/` | Static |
| `ai-overcooked-03.gif` (or `.apng`) | `public/illustrations/` | Animated |
| `ai-overcooked-04.png` | `public/illustrations/` | Static |

The IllustrationSpot component will auto-detect `.gif` and `.apng` and render them as animated (no extra code).

---

## Reference vibes

- **Overcooked** (game) — the source of the metaphor. Chaotic, colourful, cooperative.
- **Clay animation** — Wallace & Gromit, Kubo and the Two Strings. Tactile, warm.
- **Paper cut** — Lotte Reiniger, intricate layered cutwork. Layered, intricate.
- **Editorial illustration** — The New Yorker, The Atlantic. Clean, metaphorical, readable.

---

## Production notes

- **Procreate:** Export at 2× for retina. Use PNG for static, GIF for animation (or export frames and combine).
- **Figma:** Export as PNG. For animation, consider exporting frames and using a tool to create gif.
- **AI image gen (DALL·E, Midjourney, etc.):** Use the scene descriptions above as prompts. Add "clay style" or "paper cut style" + "warm campfire colour palette" to match Kim's aesthetic.
- **Clay/knit/physical:** Photograph or scan. Ensure consistent lighting and colour grading across all five.

---

## Checklist before finalising

- [ ] All five spots use the same style (clay, paper cut, flat, etc.)
- [ ] Palette aligns with Kim's tokens (ember, flame, gold, cream, ash, coal)
- [ ] Spot 03 is animated (gif or apng)
- [ ] Captions are clear and support the metaphor
- [ ] Files are in `public/illustrations/` with correct names
- [ ] Aspect ratio 2:1 (800×400) for consistency
