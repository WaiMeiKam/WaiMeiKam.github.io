# new-article

Scaffolds a new MDX article in `content/articles/` using the content-shaper skill.

## Steps

1. Invoke `/content-shaper article` with any seed content you have
2. Answer the interview questions (one at a time) to shape the idea
3. Review the shaped outline
4. The skill will write the MDX file to `content/articles/{slug}.mdx`
5. Run `npm run dev` and navigate to `/thinking-about/{slug}` to verify

## Frontmatter required

```yaml
---
title: ""
date: "YYYY-MM-DD"
teaser: ""
tags: []
---
```

## Notes

- Australian English throughout (colour, organisation, behaviour)
- Illustration briefs are optional companion files — ask content-shaper to generate one
- UXDemoBox specs can also be generated for interactive demo sections
