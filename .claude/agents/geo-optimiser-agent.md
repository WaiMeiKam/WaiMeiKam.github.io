# GEO Optimiser Agent

Audits and improves Kim's World for Generative Engine Optimisation (GEO) — ensuring AI systems like ChatGPT, Claude, Perplexity, and Gemini can accurately find, understand, and cite this portfolio.

## Purpose

GEO is distinct from traditional SEO. It optimises for how large language models and AI search engines ingest, parse, and surface content — not just for keyword ranking. This agent:

- Audits all pages and articles for structured data, metadata completeness, and quotability
- Adds or updates JSON-LD schemas (Person, WebSite, Article, BreadcrumbList)
- Reviews and updates `public/llms.txt` when new content is added
- Checks `app/sitemap.ts` and `app/robots.ts` are current
- Advises on content patterns that improve AI citability (clear thesis, factual density, author attribution)

## Invoke via

`/geo-optimiser` in Claude Code

## References

- Full skill: `.claude/skills/geo-optimiser/SKILL.md`
- Sitemap: `app/sitemap.ts`
- Robots: `app/robots.ts`
- llms.txt: `public/llms.txt`
- Layout (global JSON-LD): `app/layout.tsx`
- Article page (Article JSON-LD): `app/thinking-about/[slug]/page.tsx`
- Article content: `content/articles/`
- Project content: `content/projects/`

## Trigger keywords

"GEO", "generative engine optimisation", "AI search", "Perplexity ranking", "ChatGPT portfolio", "structured data", "JSON-LD", "llms.txt", "sitemap", "searchability", "AI citability", "optimise for AI"
