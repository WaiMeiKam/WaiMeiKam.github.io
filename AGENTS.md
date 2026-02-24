# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

Kim's World is a Next.js 15 static portfolio site (App Router, `output: "export"`). No backend, no database, no environment variables required. All content is static JSON/MDX.

### Running the dev server

```
npm run dev
```

Starts on port 3000. Hot reloading works out of the box.

### Key commands

| Task | Command |
|------|---------|
| Dev server | `npm run dev` |
| Lint | `npm run lint` |
| Build (static export) | `npm run build` |
| Rebuild design tokens | `npm run build:tokens` |

### Non-obvious caveats

- **Never edit `app/globals.css` directly.** It is generated from `tokens/tokens.json` via `npm run build:tokens`. Edit tokens in `tokens/tokens.json` and rebuild.
- **Bad UX mode cookie popup** is intentionally impossible to dismiss via normal UI interaction. When testing the Bad UX toggle, use the browser console to toggle back: click the GOOD/BAD toggle button programmatically or call the React context's `toggleMode()`.
- The site uses `output: "export"` (fully static), so there are no API routes or server-side features.
- Refer to `.cursorrules` for comprehensive component conventions, naming, folder structure, and content format details.
