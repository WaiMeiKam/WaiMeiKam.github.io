---
name: geo-optimiser
description: >
  Audits and improves Kim's World for Generative Engine Optimisation (GEO).
  Ensures AI systems (ChatGPT, Claude, Perplexity, Gemini) can accurately find,
  understand, and cite this portfolio. Covers structured data (JSON-LD), metadata
  completeness, llms.txt, sitemap, robots.txt, and content citability patterns.
  Use when: "GEO", "generative engine optimisation", "AI search", "structured data",
  "JSON-LD", "llms.txt", "sitemap", "AI citability", "optimise for AI", "searchability".
---

# GEO Optimiser Skill

## What is GEO (and why it's different from SEO)

Traditional SEO optimises for keyword ranking in link-based search (Google blue links).
GEO optimises for how AI systems *understand, represent, and cite* a site's content
when answering user questions.

AI search engines (Perplexity, ChatGPT search, Gemini, Claude with web access) do not
rank links — they extract, synthesise, and attribute. To be cited well, content must be:

- **Parseable as entities** — AI needs to know who Kim is, what she does, and what she
  stands for. JSON-LD provides this machine-readably.
- **Quotable** — AI models surface short, standalone, confident claims. Buried or hedged
  opinions don't get cited.
- **Structured** — Clear H2/H3 hierarchy, labelled sections, frontloaded thesis statements.
- **Attributed** — Author name and credentials in the content and schema, not just page title.
- **Discoverable by AI crawlers** — `llms.txt`, `sitemap.xml`, `robots.txt`, and
  canonical URLs allow AI crawlers to index correctly without duplication.

---

## Modes

### 1. Audit mode — `/geo-optimiser audit`

Scan the portfolio and produce a GEO health report. Check each of the following.

#### A. Structured Data (JSON-LD)

Read `app/layout.tsx` and `app/thinking-about/[slug]/page.tsx`.

Check for:
- `Person` schema on every page (global in layout) — name, jobTitle, url, sameAs social links
- `WebSite` schema on the root — name, url, description
- `Article` schema on each article page — headline, author, datePublished, description, url
- `BreadcrumbList` on section pages (thinking-about, tinkered-and-delivered)

Report: present / missing / incomplete for each schema type.

#### B. Metadata completeness

For each page in `app/`:
- `title` — present, descriptive, includes Kim's name/role
- `description` — 120–160 chars, factual, includes author identity
- `openGraph.type` — `"article"` on articles, `"website"` on everything else
- `openGraph.authors` — present on articles
- `openGraph.publishedTime` — present on articles (ISO 8601)
- `twitter.card` — `"summary_large_image"` on all pages
- `canonical` — set via `metadataBase`

Report: pass / fail per field per page.

#### C. Content quotability

For each article in `content/articles/`:
- Is there a clear, standalone thesis statement in the first 100 words?
- Does at least one `<KeyInsight>` or `<Callout>` exist? (These are the most quotable)
- Are claims specific (named people, specific examples) vs generic?
- Is Kim's name/role ever mentioned in the body? (author attribution for AI context)
- Word count — articles under 400 words may not have enough substance for AI to cite

Score each article: **GEO-ready** / **Needs work** / **Too thin**.

#### D. llms.txt currency

Read `public/llms.txt`. Compare article slugs in `content/articles/` and project slugs
in `content/projects/` against entries in llms.txt.

Report: which entries are missing, stale, or need description updates.

#### E. Sitemap + robots

Check `app/sitemap.ts` exists and includes all article + project slugs.
Check `app/robots.ts` exists and points to the sitemap.

Output the full audit as a markdown table with pass/fail/fix per item.

---

### 2. Fix mode — `/geo-optimiser fix`

Apply concrete fixes. Always read before writing. Confirm before making changes to
files you haven't audited in this session.

#### Priority order:
1. Missing JSON-LD schemas (highest GEO impact)
2. Missing or thin `description` metadata
3. Missing `openGraph.type: "article"` on article pages
4. Missing `publishedTime` in OG metadata
5. Missing or stale `llms.txt` entries
6. Missing sitemap or robots files

#### JSON-LD patterns to use

**Person + WebSite (in `app/layout.tsx` — global):**
```tsx
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://kimsworld.com/#kim",
      name: "Kim",
      jobTitle: "Principal Product Designer",
      url: "https://kimsworld.com",
      description:
        "Principal Product Designer specialising in systems thinking, UX craft, and product design. Based in Australia.",
      sameAs: [
        // Add LinkedIn, GitHub, etc. when known
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://kimsworld.com/#website",
      name: "Kim's World",
      url: "https://kimsworld.com",
      description:
        "Portfolio of Kim, a Principal Product Designer. Case studies, design thinking, and interactive experiments.",
      author: { "@id": "https://kimsworld.com/#kim" },
    },
  ],
};
```

Add as a `<script>` tag inside the layout's `<html>` element, before `<body>`:
```tsx
<html lang="en">
  <head>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  </head>
  <body>...</body>
</html>
```

**Article schema (in `app/thinking-about/[slug]/page.tsx`):**
```tsx
const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: article.title,
  description: article.teaser,
  datePublished: article.date,
  dateModified: article.date,
  url: `https://kimsworld.com/thinking-about/${article.slug}/`,
  author: {
    "@type": "Person",
    "@id": "https://kimsworld.com/#kim",
    name: "Kim",
  },
  publisher: {
    "@id": "https://kimsworld.com/#website",
  },
  keywords: article.tags.join(", "),
};
```

Inject inside the `<article>` element:
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
/>
```

#### Article metadata pattern (rich OG for articles):
```tsx
export async function generateMetadata({ params }) {
  const article = getArticleBySlug(slug);
  return {
    title: `${article.title} — Kim's World`,
    description: article.teaser,
    authors: [{ name: "Kim" }],
    openGraph: {
      type: "article",
      title: article.title,
      description: article.teaser,
      url: `https://kimsworld.com/thinking-about/${slug}/`,
      publishedTime: article.date,
      authors: ["Kim"],
      tags: article.tags,
    },
  };
}
```

---

### 3. Content advisory mode — `/geo-optimiser advise [slug]`

Review a specific article and give GEO improvement suggestions without changing the file.

Check:
1. **Thesis clarity** — Is the main argument stated in the first paragraph?
   - If not: suggest a one-sentence lead-in to add
2. **Quotable callouts** — Is there a `<KeyInsight>` or `<Callout>` that would work as
   a standalone cited snippet? Does it attribute Kim?
   - Ideal pattern: `<KeyInsight title="Kim's take">Statement.</KeyInsight>`
3. **Author presence** — Does the article body mention "I", "Kim", or "Principal Product
   Designer" anywhere? AI models use in-body attribution to anchor citations.
4. **Factual anchors** — Are there named examples, specific tools, companies, or
   research references? Generic claims ("many designers...") are less citeable.
5. **FAQ opportunity** — Is there a natural Q&A section that could be added?
   AI models love surfacing direct answers to questions.

Output: numbered list of specific suggestions with the line/section to change.

---

## llms.txt format

`public/llms.txt` follows the emerging llmstxt.org convention — a plain-text,
markdown-ish file designed for AI crawlers. Keep it under 2000 words.

```
# Kim's World

> Portfolio of Kim, a Principal Product Designer based in Australia.
> Specialises in systems thinking, UX craft, AI-era product design, and design systems.

Kim is a Principal Product Designer with extensive experience shipping products at scale.
She writes about UX craft, AI in product design, and the hard realities of designing at speed.

## Articles (Thinking About)

- [Title](https://kimsworld.com/thinking-about/slug/): One sentence description of the core argument or insight.

## Case Studies (Tinkered & Delivered)

- [Title](https://kimsworld.com/tinkered-and-delivered/slug/): One sentence description of the problem, Kim's role, and outcome.

## About

- [Get to Know Kim](https://kimsworld.com/get-to-know-kim/): An interactive game of polls revealing Kim's design opinions and preferences.
- [Kim's World](https://kimsworld.com/): Portfolio home — design thinking, case studies, and interactive experiments.
```

**Update rules:**
- Add a new line under the correct section whenever a new article or case study is published
- Keep descriptions to one sentence (20–30 words max)
- Lead the description with the core argument/outcome — not a summary of what the page contains
- Use the canonical URL (with trailing slash, matching `trailingSlash: true` in next.config.ts)

---

## sitemap.ts pattern

`app/sitemap.ts` — Next.js generates `/sitemap.xml` from this at build time.

```ts
import type { MetadataRoute } from "next";
import { getAllArticleSlugs } from "@/lib/utils/articles";
import { getAllProjectSlugs } from "@/lib/utils/projects";

const BASE = "https://kimsworld.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE}/thinking-about/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/tinkered-and-delivered/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/get-to-know-kim/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/noodling-on/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
  ];

  const articleRoutes = getAllArticleSlugs().map((slug) => ({
    url: `${BASE}/thinking-about/${slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const projectRoutes = getAllProjectSlugs().map((slug) => ({
    url: `${BASE}/tinkered-and-delivered/${slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...articleRoutes, ...projectRoutes];
}
```

---

## robots.ts pattern

`app/robots.ts` — Next.js generates `/robots.txt` from this.

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://kimsworld.com/sitemap.xml",
  };
}
```

---

## GEO content principles (for new articles)

Remind Kim of these when shaping new content via the content-shaper skill:

1. **Lead with the thesis.** First paragraph = the point. AI extracts opening paragraphs first.
2. **Name yourself in the body.** At least once, write "As a Principal Product Designer..."
   or "I've spent X years..." — AI uses this to attribute citations.
3. **Make callouts standalone.** Every `<KeyInsight>` and `<Callout>` should read as a
   complete, quotable sentence in isolation — no "this" or "it" referencing prior context.
4. **Use specific examples.** "Airbnb's checkout redesign" lands harder than "many companies."
5. **Answer the question directly.** If the article title is a question, answer it in the
   first paragraph. AI surfaces direct answers.
6. **Don't bury the opinion.** "Maybe this is just me, but..." kills citability.
   State opinions as positions: "Boring UX is better UX."

---

## File paths

| File | Purpose |
|------|---------|
| `app/sitemap.ts` | Sitemap generator — update when new pages added |
| `app/robots.ts` | Robots.txt generator — rarely needs changes |
| `public/llms.txt` | AI-readable site index — update after each publish |
| `app/layout.tsx` | Global JSON-LD (Person + WebSite) |
| `app/thinking-about/[slug]/page.tsx` | Per-article JSON-LD (Article schema) |
| `content/articles/*.mdx` | Source of truth for article content |
| `content/projects/*.mdx` | Source of truth for case study content |
