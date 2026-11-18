# Ashen Software — design system

Ashen builds production systems for real operations. The interface should feel like an engineering instrument, not a template for an AI product.

This document is the source of truth for new UI. If a component could be dropped unchanged into a generic purple SaaS landing page, it does not belong here.

## Principles

1. **Evidence before atmosphere.** Show a system, a case, a stack, a constraint. Decoration that does not carry information is removed.
2. **One accent, used as a signal.** Ember marks the action or the live state. It is not a background wash.
3. **Hairlines, not glass.** Depth comes from a change in ink, a 1px rule, or a change in type. Not from blur, glow, or shadow.
4. **Editorial density.** A section may be a diagram, a specification, or a case. It is not required to be a label, a heading, a paragraph, and three equal cards.
5. **Four pillars dominate.** AI Agents, Custom Software, Data & AI, and Integrations are the commercial structure. Older capabilities are an index under those pillars.
6. **Type does the branding.** A serif for statements, a grotesque for UI, a mono for labels and system names. The combination should still read as Ashen if the logo is cropped out.
7. **Motion is optional.** Nothing important depends on animation. `prefers-reduced-motion` removes what little motion exists.

References studied for spacing, type rhythm, borders, and proof — not copied: Linear, Stripe, Vercel, Apple, IBM, NVIDIA, SpaceX, Supabase, Cursor. Ashen takes the restraint and the information density, and rejects purple gradients, glass cards, and product-marketing blobs.

## Color

Dark is the default. Light is a full alternate, not a second brand.

| Token | Dark | Light | Use |
| --- | --- | --- | --- |
| `--bg-primary` | `#101210` | `#f3f0e8` | Page |
| `--color-bg-secondary` | `#171a17` | `#e7e2d6` | Bands, header |
| `--color-bg-tertiary` | `#1e231f` | `#ddd6c6` | Inset panels |
| `--color-text-primary` | `#ece7dc` | `#161815` | Body and headings |
| `--color-text-secondary` | `#c4beb2` | `#3c413c` | Supporting copy |
| `--color-text-muted` | `#9a9488` | `#5c6158` | Meta, captions |
| `--color-accent-primary` | `#e07a3d` | `#9a3e16` | Signal, links, focus |
| `--color-brass` | `#c4a574` | `#7a5b32` | Secondary annotation only |
| `--color-line` | `rgba(236,231,220,0.16)` | `rgba(22,24,21,0.14)` | Rules and panel edges |

Ember on ink, and ink on ember, both clear WCAG 2.2 AA for normal text. Muted text is kept above 4.5:1 on the page background. Do not put ember text on a brass or photo background.

No decorative gradients. No fuchsia. No violet. No glow.

## Typography

- **Display:** Newsreader, 500–600. Statements, H1, H2. `text-wrap: balance`.
- **UI:** Schibsted Grotesk, 400–600. Navigation, body, forms.
- **Meta:** DM Mono, 400–500. Eyebrows, diagram labels, indexes. Uppercase only for short labels, with tracking, never for paragraphs.

Scale:

| Role | Size |
| --- | --- |
| Eyebrow | 12px mono |
| Body | 16–18px / 1.6 |
| Lead | 18–20px |
| H3 | 22–28px |
| H2 | clamp(32px, 4vw, 48px) |
| H1 | clamp(40px, 5vw, 68px) |

Self-hosted Latin woff2 in `public/fonts` (SIL Open Font License, originally packaged by Fontsource). `font-display: swap`. The display face and the body regular face are preloaded. Do not load a second display family.

## Spacing, grid, rhythm

- Page gutter: 20px mobile, 32px tablet, 40px desktop.
- Content width: 1120px. Diagrams and the case may run to 1200px.
- Section padding: 72px mobile, 104px desktop. Do not stack 70vh empty bands.
- Baseline: 8px. Related items sit 8–16px apart. A new idea starts 48px away.
- Grid: 12 columns on desktop. The hero is 5/7. Pillars are not four equal cards. The case is type plus a real screenshot.

## Radius, border, shadow

- Radius is **2px**. Pills, `rounded-2xl`, and `rounded-3xl` are not part of the system.
- Borders are 1px `--color-line`. Hover may strengthen the rule. It does not add a glow.
- Shadows are not used for cards. The header may use a 1px bottom rule only.

## Cards and sections

A card is a specification block: a mono index, a title, one paragraph, and an optional diagram. If four blocks would look identical, change the composition.

Sections alternate ink and a slightly lighter ink. They do not alternate gradient meshes.

## Navigation

- Full-width bar, 64px, hairline bottom. Not a floating glass capsule.
- Primary links: Work, the four pillars (under Services), About, Contact.
- The services menu leads with the four pillars. Capabilities are a secondary list in smaller type.
- One primary action: discuss a project. It goes to `#contact`.
- Language and theme are controls with visible names, not icon-only mysteries. Theme may be icon plus an accessible name.

## CTA hierarchy

1. Ember fill, ink text: the one primary action on a screen.
2. Outline: the secondary action (read the case, visit a live site).
3. Text link with an arrow: in-body references.

Do not place two filled buttons side by side.

## Screenshots and diagrams

- Screenshots are real product or case images with explicit width and height.
- Diagrams are inline SVG of a system Ashen actually talks about: agent/tool/approval, software layers, a data pipeline, an integration map.
- No stock illustrations, no particle fields, no abstract 3D.
- Medellín photography is used with its existing Wikimedia credit, as origin, not as a tourism hero.

## Motion

Allowed: color and border changes under 200ms, and a focus outline.

Not allowed on marketing pages: canvas loops, falling particles, click sparks, infinite marquees that duplicate content, parallax, blur transitions.

## Iconography

Lucide is allowed at 16–18px, inline with a label. Do not put every icon inside a colored rounded square. A diagram replaces an icon when the idea is a system.

## Responsive

Design and check these widths:

- 390×844
- 768×1024
- 1440×1000

Rules:

- No horizontal page scroll.
- Headings wrap. They are not truncated.
- Tap targets are at least 44×44px.
- Diagrams reflow to a vertical stack under 768px.
- The mobile menu is a panel under the bar, scrollable, closable with Escape.

## Dark / light

Default is dark, including the first server render, so HTML and hydration match. A saved theme or `prefers-color-scheme` applies after mount. Both themes use the same layout, type, and radius.

## Accessibility

Target: WCAG 2.2 AA.

- One H1 per page.
- Landmarks: header, nav, main, footer.
- Visible `:focus-visible` outline in ember.
- Form controls have labels. Errors use `aria-live`.
- Color is not the only status signal.
- `prefers-reduced-motion: reduce` cuts animation and smooth scroll.
- Language is set on `<html lang>` from the URL.
