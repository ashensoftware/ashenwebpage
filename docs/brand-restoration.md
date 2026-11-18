# Brand restoration

The visual system introduced in `55fc5da` is rejected. This branch puts the Ashen identity from `a80330c` back in place and keeps the prerender, SEO, and commercial structure that landed after it. Production is unchanged until this branch is approved.

## Restored from Git

Tokens, type, and the hero composition come from `a80330c`, not from a new palette.

- Page field `#010014`, secondary `#0a0a1f`, tertiary `#12122a`.
- Violet `#8b5cf6`, soft violet `#a084ee`, fuchsia `#d946ef`.
- Text gradient `#8b5cf6` → `#d946ef`.
- Inter for UI, Outfit for display. Self-hosted in `public/fonts`.
- Centered full-viewport hero, glass surfaces, pill actions, violet hover edges.
- `DESIGN.md` now documents this system. Ember, brass, warm paper, Newsreader, and the 2px radius rule are gone.

Button fills use the original light-mode stops `#6d28d9` → `#c026d3` so white labels clear WCAG AA. Muted text is `#94a3b8` on the dark field for the same reason. The glows and headline gradient stay on `#8b5cf6` and `#d946ef`.

## Rebuilt, not copied

`InteractiveGridBackground` and `FallingParticles` were not restored as written. They painted a full grid every frame and listened on `window` without a mobile cap.

`SignalField` keeps the violet grid and adds a fuchsia node network:

- lazy chunk, about 1.3 kB gzip, loaded after the page HTML;
- static paint on phones and when `prefers-reduced-motion` is set;
- animation only while the hero is on screen and the tab is visible;
- device pixel ratio capped at 1.5 on desktop and 1 on mobile;
- 36 nodes on desktop, 16 on mobile;
- pointer attraction through a window listener, so the field reacts without covering the buttons;
- canvas buffer released on unmount.

Three.js and React Three Fiber are not used. The historical identity was a canvas field, and a 3D scene would add a large client chunk without making the brand more specific.

`SystemDiagram` is no longer the homepage hero. On the AI agents page it sits in the architecture section, after the headline.

## Motion

The headline rises once, without fading, so the first paint is not delayed. Glass cards light a violet edge on hover. Section bands use the violet and fuchsia washes. Reduced motion collapses animation duration.

## What stayed

Full HTML for 42 indexable routes, canonicals, hreflang, sitemap, IndexNow, robots rules for OAI-SearchBot, JSON-LD, Formspree fields, Analytics, Speed Insights, the four pillars, bilingual copy, and the Trengie case. The commercial line is still “Custom Software & AI Agents — Built for Real Operations.”

## Performance

Measured with Lighthouse against the local preview (`vite preview` does not gzip, so these times are pessimistic). The rejected design’s local mobile baseline was LCP 2.9 s, TBT 60 ms, CLS 0.

| | FCP | LCP | TBT | CLS |
| --- | --- | --- | --- | --- |
| Mobile, this branch | 2.3 s | 3.1 s | 140 ms | 0 |
| Desktop, this branch | 0.6 s | 0.7 s | 0 ms | 0.001 |

Main JS is 440 kB (136 kB gzip). CSS is 61 kB (11 kB gzip). The canvas is a separate chunk. CLS stayed at 0 on mobile. Lab LCP did not beat 2.9 s on this uncompressed preview; desktop stayed under 1 s. A second mobile run on the same machine moved TBT between 100 ms and 140 ms, so the gap versus 60 ms is inside local noise and still inside the “good” band.

## Visual check

Compared with the live ember homepage and with local captures at 390, 768, 1440, and 1920. Shots are in `docs/qa/screenshots/` (not committed).

- Color: orange and serif are gone. The field is navy-black with a violet grid and a fuchsia headline gradient.
- Hero: centered, with two clear actions. The five-box diagram is not the first screen.
- Navigation, mobile menu, and the primary action were exercised, not only stills.
- No horizontal overflow on the captured routes.

## Tests

`npm run type-check`, `lint`, `test` (24), `build`, and `seo:check` (42 routes) passed on this branch.

## Still open

- This branch is not merged and not promoted. IndexNow and the webmaster tools were not run again.
- A push may create a Vercel preview. That preview is not production.
- The architecture diagram on the AI agents page is still a set of labeled boxes. It is no longer the first impression.
- Light mode uses the historical light tokens and was not the focus of the screenshot pass.
