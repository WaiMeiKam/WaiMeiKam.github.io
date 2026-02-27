import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const tokensPath = resolve(__dirname, "tokens.json");
const outputPath = resolve(__dirname, "..", "app", "globals.css");

const raw = JSON.parse(readFileSync(tokensPath, "utf-8"));

function isToken(obj) {
  return obj && typeof obj === "object" && "$value" in obj;
}

function flattenTokens(obj, prefix = "") {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith("$")) continue;
    const path = prefix ? `${prefix}-${key}` : key;
    if (isToken(value)) {
      result[path] = value;
    } else if (typeof value === "object") {
      Object.assign(result, flattenTokens(value, path));
    }
  }
  return result;
}

function resolveValue(val, flat) {
  if (typeof val !== "string") return val;
  return val.replace(/\{([^}]+)\}/g, (_, ref) => {
    const cssName = ref.replace(/\./g, "-");
    const token = flat[cssName];
    return token ? resolveValue(token.$value, flat) : val;
  });
}

const flat = flattenTokens(raw);

const cssVars = Object.entries(flat)
  .map(([name, token]) => {
    const resolved = resolveValue(token.$value, flat);
    return `  --${name}: ${resolved};`;
  })
  .join("\n");

const colorTokens = Object.entries(flat).filter(
  ([, t]) => t.$type === "color"
);
const dimensionTokens = Object.entries(flat).filter(
  ([, t]) => t.$type === "dimension"
);
const shadowTokens = Object.entries(flat).filter(
  ([, t]) => t.$type === "shadow"
);
const fontFamilyTokens = Object.entries(flat).filter(
  ([, t]) => t.$type === "fontFamily"
);
const fontWeightTokens = Object.entries(flat).filter(
  ([, t]) => t.$type === "fontWeight"
);

function themeLines(tokens) {
  return tokens
    .map(([name]) => `    --${name}: var(--${name});`)
    .join("\n");
}

// Only colour and font-family tokens go into @theme — these add new named
// entries to Tailwind's palette (e.g. bg-ember, text-coal) without conflicting
// with Tailwind v4's built-in spacing/sizing scale names (xs, sm, md, lg, xl…).
// Dimension, fontWeight, and shadow tokens live in :root only.
const css = `@import "tailwindcss";

@theme {
${themeLines(colorTokens)}

${themeLines(fontFamilyTokens)}
}

:root {
${cssVars}
}
`;

writeFileSync(outputPath, css, "utf-8");
console.log("Tokens built → app/globals.css");
