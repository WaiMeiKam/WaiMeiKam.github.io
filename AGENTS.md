# AGENTS.md

## Cursor Cloud specific instructions

**Kim's World** is a static Next.js 15 portfolio site (App Router, React 19, Tailwind CSS v4, Framer Motion). No database, Docker, or external services needed.

### Running the app

- `npm run dev` starts the Next.js dev server on port 3000 (hot-reload enabled).
- `npm run build:tokens` regenerates `app/globals.css` from `tokens/tokens.json`. Run this if tokens change. **Never edit `app/globals.css` directly.**
- `npm run build` produces a static export to `out/`.

### Lint

- **Known issue (as of Feb 2026):** `package.json` pins ESLint v10 but the repo still uses `.eslintrc.json` (legacy format). ESLint v10 requires `eslint.config.js` (flat config). Running `npm run lint` will fail until the config is migrated. The `next build` step also warns about ESLint options but still completes successfully.

### Key caveats

- The site uses `output: "export"` in `next.config.ts`, so all pages are statically generated. Dynamic server features (API routes, server actions) are not available.
- The dev server may pick a different port if 3000 is occupied — check the terminal output.
- The UX toggle persists state in `localStorage`. To reset, clear site data in DevTools.
