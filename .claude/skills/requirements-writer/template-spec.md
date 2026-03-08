# Spec: {name}

**Created:** {date}
**Brief:** specs/{name}.brief.md
**Status:** Draft

---

## Dimensions

| Element | Mobile (390px) | Tablet (768px) | Desktop (1440px) |
|---------|---------------|----------------|-----------------|
| Container width | | | |
| Container height | | | |
| Padding (top/bottom) | | | |
| Padding (left/right) | | | |
| Gap between elements | | | |

---

## Typography

| Text element | Font size token | Font weight token | Colour token |
|--------------|----------------|------------------|-------------|
| | `--font-size-` | `--font-weight-` | `--semantic-` |
| | `--font-size-` | `--font-weight-` | `--semantic-` |

---

## Colour

| Element | Token | Hex |
|---------|-------|-----|
| Background | `--semantic-background` | #FFF8F0 |
| | | |

---

## Spacing & Radius

| Property | Token | Value |
|----------|-------|-------|
| Padding | `--spacing-` | |
| Gap | `--spacing-` | |
| Border radius | `--radius-` | |
| Shadow | `--shadow-` | |

---

## Animation

### {Animation name}

| Property | Value |
|----------|-------|
| Trigger | mount / scroll-into-view / hover / click |
| Animates | opacity · transform · scale · y |
| From | |
| To | |
| Duration | ms |
| Easing | easeIn / easeOut / easeInOut / linear / spring |
| Repeat | once / Infinity / mirror |
| Delay | ms |
| Reduced-motion fallback | {what to show/do when prefers-reduced-motion: reduce} |

---

## States

### Default
{Description of the default rendered state.}

### Hover
{Only if interactive. What changes and how?}

### Active / Pressed
{Only if interactive. What changes and how?}

### Focus (keyboard)
{What does the focus ring look like? Colour, width, offset.}
Token: `--color-ember` · Width: 2px · Offset: 2px

### Loading
{Only if async. Skeleton, spinner, or shimmer?}

### Error
{Only if fallible. What does the error state look like?}

### Empty
{Only if data-driven. What does zero-state look like?}

---

## Images & Illustrations

| Slot | IllustrationSpot name | Mobile size | Desktop size | object-fit | Aspect ratio |
|------|----------------------|------------|-------------|------------|-------------|
| | `{name}` | | | cover | |

---

## Accessibility

| Requirement | Value |
|-------------|-------|
| ARIA role | |
| ARIA label | |
| Keyboard: Tab | {what Tab focuses} |
| Keyboard: Enter/Space | {what activates} |
| Keyboard: Escape | {what dismisses} |
| Focus order | {numbered sequence through interactive elements} |
| Screen reader announcement | {what gets announced on key interactions} |

---

## Performance

| Requirement | Decision |
|-------------|----------|
| Lazy load component | Yes / No |
| Image loading | `loading="lazy"` / eager |
| GPU-composited animations only | Yes / No (opacity + transform only) |
| Intersection Observer threshold | % |

---

## Acceptance Criteria

- [ ] Renders correctly at mobile (390px), tablet (768px), and desktop (1440px)
- [ ] All colours use CSS custom property tokens — no naked values
- [ ] All animations respect `prefers-reduced-motion: reduce`
- [ ] All interactive elements are keyboard accessible
- [ ] All interactive elements have visible focus indicators
- [ ] ARIA labels are present and correct
- [ ] WCAG AA colour contrast on all text/background combinations
- [ ] {Add component-specific criteria here}
- [ ]
- [ ]
