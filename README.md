# Kim's World

A portfolio site for Kim, a Principal Product Designer. Built with Next.js 15, React 19, and a warm campfire palette.

## Highlights

- **Good UX / Bad UX demo** — An interactive article in Thinking About that lets you flip between good and bad UX inside a contained preview box. A hands-on teaching piece: feel the contrast, then read why it matters.
- **Design token system** — Single source of truth for colours, typography, spacing, and more. Edit `tokens/tokens.json` and rebuild.
- **Content-driven** — Polls, articles, case studies, and a FigJam-style noodling canvas, all managed via JSON and MDX.

## Tech Stack

- **Next.js 15** (App Router)
- **React 19**
- **Tailwind CSS v4**
- **Framer Motion**
- **TypeScript**

## Getting Started

### Prerequisites

- Node.js 18+
- npm (or yarn/pnpm)

### Install and run

```bash
# Install dependencies
npm install

# Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm start
```

### Other scripts

| Command | Description |
|---------|-------------|
| `npm run lint` | Run ESLint |
| `npm run build:tokens` | Rebuild design tokens (run after editing `tokens/tokens.json`) |

## Project Structure

```
kims-world/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage hub
│   ├── get-to-know-kim/    # Polls game
│   ├── thinking-about/     # Article listing & individual articles
│   ├── noodling-on/        # FigJam-style pannable canvas
│   └── tinkered-and-delivered/  # Project listing & case studies
├── components/
│   ├── ui/                 # Primitives (Button, Card, NavCard, etc.)
│   ├── features/           # Feature components (PollGame, UXDemoBox, etc.)
│   └── illustrations/     # IllustrationSpot placeholder component
├── content/
│   ├── articles/           # MDX storybook articles
│   ├── projects/           # MDX case study files
│   ├── polls.json          # Poll questions and Kim's answers
│   ├── noodling.json       # Noodling-on canvas cards
│   └── projects.json       # Project manifest (locked/unlocked flags)
├── tokens/
│   └── tokens.json         # Design tokens (SOURCE OF TRUTH)
├── lib/
│   ├── hooks/              # useAudio, useScrollReveal
│   └── utils/              # Helpers
└── public/
    ├── illustrations/      # Drop zone for Procreate exports
    └── audio/              # Ambient tracks
```

## Adding Content

| Content type | How to add |
|--------------|------------|
| **New poll** | Add an object to `content/polls.json` |
| **New article** | Create an MDX file in `content/articles/` with frontmatter: `title`, `date`, `teaser`, `tags`. Use `<UXDemoBox />` for interactive Good/Bad UX demos. |
| **New noodling card** | Add an object to `content/noodling.json` with `x`, `y`, `rotation`. Types: `sticky`, `image`, `video`, `link`, `embed` |
| **New project** | Add to `content/projects.json`. If `locked: false`, create an MDX file in `content/projects/` |
| **New illustration** | Export from Procreate and drop into `public/illustrations/` with the matching slot name |

## Design Tokens

**Important:** Never edit `app/globals.css` directly. It's generated from the token system.

1. Edit `tokens/tokens.json` (W3C DTCG format)
2. Run `npm run build:tokens`
3. CSS custom properties and Tailwind theme are regenerated

Token groups: `color`, `semantic`, `badUx` (used by the UX demo), `font`, `spacing`, `radius`, `shadow`.

## Illustration Placeholders

The `IllustrationSpot` component renders a shimmer placeholder until the real asset exists. Drop your file at `/public/illustrations/{name}.png` (or `.gif`, `.apng`) — no code changes needed.

## Accessibility

- Semantic HTML, ARIA labels, keyboard navigation
- `prefers-reduced-motion` disables animations
- WCAG AA colour contrast
- Visible focus indicators

## Licence

Private portfolio project.
