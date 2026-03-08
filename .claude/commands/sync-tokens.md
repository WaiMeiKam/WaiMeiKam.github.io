# sync-tokens

Rebuilds `app/globals.css` from `tokens/tokens.json`.

## Steps

1. Run `npm run build:tokens`
2. Verify `app/globals.css` was updated (check timestamp)
3. Run `npm run lint` to confirm no broken references
4. Spot-check a component that uses tokens to verify CSS custom properties resolved

## Notes

- Run this any time `tokens/tokens.json` is modified
- NEVER edit `app/globals.css` directly — it is generated output
- If tokens are being synced from Figma, use `/design-system-caretaker` instead
