# Design System Agent

Stub — full agent definition to be written in Phase 4 of the setup walkthrough.

## Purpose

Keeps tokens, components, and Figma in sync. Audits for naked values, syncs Figma variables to tokens.json, flags component drift, manages the build:tokens pipeline.

## Invoke via

`/design-system-caretaker` in Claude Code

## References

- Full skill: `.claude/skills/design-system-caretaker/SKILL.md`
- Token source of truth: `tokens/tokens.json`
- Build script: `tokens/build.mjs`
- Generated output: `app/globals.css` (never edit directly)
