# Ashen Software — design system

The visual identity is the one already shipping before commit `55fc5da`. This file records that system. It does not replace it.

Ashen is a dark, violet and fuchsia software brand: deep navy-black fields, luminous accents, glass surfaces, and a technical sans display. Motion is part of the brand. The homepage should feel alive in the first second.

## Principles

1. **Keep the existing palette.** Black-blue, violet, and fuchsia are the brand. Orange, brass, warm paper, and editorial serif are not.
2. **Type is technological.** Outfit for statements. Inter for UI. No display serif.
3. **Depth comes from light.** Gradients, glass, and a cursor-linked field carry the atmosphere. They sit behind the content, not instead of it.
4. **The four offers still lead.** AI Agents, Custom Software, Data & AI, and Integrations stay ahead of the older capability index.
5. **Motion is interruptible.** `prefers-reduced-motion` collapses animation. Small screens paint the field once and do not run a frame loop.
6. **The first screen is a composition, not a diagram.** A network of nodes can live in the hero. Five labeled boxes cannot be the first impression.

## Color

Extracted from `src/styles/globals/theme.css` at `a80330c`. Dark is the default.

| Token | Dark | Light | Role |
| --- | --- | --- | --- |
| `--bg-primary` | `#010014` | `#ffffff` | Page |
| `--color-bg-secondary` | `#0a0a1f` | `#f4f4f9` | Bands |
| `--color-bg-tertiary` | `#12122a` | `#e5e5ea` | Insets |
| `--color-text-primary` | `#ffffff` | `#1a1a1a` | Headings and body |
| `--color-text-secondary` | `#cbd5e1` | `#3f3f46` | Supporting copy |
| `--color-text-muted` | `#94a3b8` | `#52525b` | Meta. One step lighter than the historical `#64748b` so it stays above 4.5:1 on `#010014` |
| `--color-accent-primary` | `#8b5cf6` | `#6d28d9` | Violet |
| `--color-accent-secondary` | `#a084ee` | `#7c3aed` | Soft violet |
| `--color-accent-tertiary` | `#d946ef` | `#c026d3` | Fuchsia |
| `--gradient-text` | `#8b5cf6` → `#d946ef` | `#6d28d9` → `#c026d3` | Headline emphasis |
| `--gradient-primary` | `#6d28d9` → `#c026d3` | same | Buttons. The stops are the original violet and fuchsia, darkened so white label text clears WCAG AA |

Glass is `rgba(255,255,255,0.03)` with a 1px white edge at 8% and a 16px blur. Hover borders pick up violet at 45%.

## Typography

- **Display:** Outfit 500–700. Headlines.
- **UI:** Inter 400–600. Navigation, body, forms.
- **Meta:** the platform monospace. Short labels only.

| Role | Size |
| --- | --- |
| Eyebrow | 12px, Outfit, uppercase, 0.18em tracking |
| Body | 16–18px / 1.6 |
| H1 | clamp(43px, 6.4vw, 86px), semibold, tight leading |
| H2 | 36–48px |

Files live in `public/fonts`. `font-display: swap`. Outfit 600 and Inter 400 are preloaded.

## Space, radius, elevation

- Gutter: 20px mobile, 32px from 768px.
- Content width: 80rem.
- Radius: 8 / 16 / 24. Primary actions are pills.
- Section padding: 4–6rem.
- Shadows are violet glows on buttons and hovered glass, not hard drop shadows on every block.

## Navigation and actions

The bar is fixed, translucent, and blurred. Primary action is the violet–fuchsia pill. Secondary action is a glass outline. Both are at least 44px tall. Focus uses a 2px violet ring.

## Hero

Full viewport, content centered, the historical composition. Behind it: a violet radial wash, a grid, and a node network that leans toward the pointer on viewports wider than 767px. The canvas is `aria-hidden`. Reduced motion and phones get one static paint. The headline, proof, and actions are in the HTML whether or not the canvas runs.

## Motion

- Headline block rises once on load.
- Glass cards light their border on hover.
- The hero field uses `requestAnimationFrame`, pauses off-screen and when the tab is hidden, and caps device pixel ratio at 1.5.
- No particle system on the main thread for phones.

## Accessibility

WCAG 2.2 AA for text and controls. Gradient button labels are white on the darkened brand gradient. One H1. The canvas does not carry information. Language and theme controls keep visible text inside the accessible name.
