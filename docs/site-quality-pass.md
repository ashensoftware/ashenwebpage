# Site quality pass

Incremental pass on the restored Ashen identity. No palette change, no type change, no new visual system.

Branch: `improve/site-quality-pass`
Base: `222a124f0b44571a9aebb8581d21fd1ba54449ce` (`main`, merge of PR #5)

Screenshots and Lighthouse JSON live in `docs/qa/`, which is gitignored. They are local review artifacts, not production assets.

Lab and field data are separate. Every Lighthouse number below is a lab run against the local uncompressed Vite preview at `http://127.0.0.1:4173/`. Chrome 157, Lighthouse 12.8.2, simulated throttling.

## Baseline

Measured on `222a124` before any edit in this branch.

Checks on that SHA: `npm ci`, `type-check`, `lint`, `test` (24), `build`, `seo:check` (42 routes). All passed.

### Bundle

| Asset | Raw | Gzip |
| --- | --- | --- |
| CSS `index-VVep63Mz.css` | 70.16 kB | 12.19 kB |
| JS `index-cx9bWaAN.js` | 450.32 kB | 138.51 kB |
| JS `SignalField-Dv4AoWsZ.js` | 2.59 kB | 1.32 kB |

### Lighthouse

The first CLI invocation stored `categories: {}` because PowerShell collapsed `--only-categories=performance,accessibility` into one unknown category name. The metric audits were still recorded. Performance scores below are reconstructed with the Lighthouse 12 weights from the later scored run (FCP 10, SI 10, LCP 25, TBT 30, CLS 25). Accessibility is the weighted pass rate of the same accessibility audits. Both reconstructions match the official after scores when applied to the after audits.

| | Mobile | Desktop |
| --- | --- | --- |
| Performance | 71 | 98 |
| Accessibility | 100 | 100 |
| FCP | 2.7 s | 0.6 s |
| LCP | 6.0 s | 1.1 s |
| Speed Index | 4.2 s | 0.9 s |
| TBT | 110 ms | 0 ms |
| CLS | 0 | 0.001 |
| TTI | 6.3 s | 1.1 s |

LCP element, both form factors: the homepage H1, “Custom Software & AI Agents Built for Real Operations” (`div.ashen-home > section#hero > div.container-width > h1`).

Observed mobile LCP phases, before simulated throttling: TTFB 9 ms, element render delay 1,665 ms. There is no resource-load phase because the LCP node is text. Diagnostics: 1,075,946 bytes discovered, 5 fonts, 534 ms of main-thread tasks. Local TTFB is not a production TTFB.

These numbers replace the older lab recollection (mobile LCP ~3.1 s, TBT ~140 ms, desktop LCP ~0.7 s). That recollection is not this baseline.

### Screenshots

`docs/qa/before/`, captured by `scripts/capture-quality.mjs`.

Viewports: 390×844, 768×1024, 1440×1000, 1920×1080. Routes: `/`, `/es`, `/ai-agents`, `/software-development`, `/data-ai-engineering`, `/integrations`, `/case-studies/trengie`, `/about`, `/#contact`. Plus light mode for home and AI Agents at 1440, the mobile menu, and the Services dropdown. No horizontal overflow.

### Issues reproduced

The prerendered homepage contained two full copies of the historical capability catalog. `href="/services/web-development"` appeared three times: once in the navbar and twice in the marquee (`[...ASHEN_SERVICES, ...ASHEN_SERVICES]`, each copy a real `Link`). The same pattern applied to every capability.

## Confirmed bugs

1. **Duplicate semantic catalog.** Confirmed in `dist/index.html` on `222a124`. The marquee clones were real links in the SSR HTML, so each capability was indexable and exposed to assistive technology twice, on top of the navbar entry.

Not a bug: `/case-studies/trengie` is not a thin page. The prerendered HTML has one H1, the challenge, the UX and engineering approach, the outcome, the live URL `https://trengie.com`, canonical, hreflang, and valid JSON-LD. It was not rewritten.

Not a bug: `formspree.json` already requires `name`, `email`, and `message`, and leaves `company`, `service`, and `phone` optional. Field names were not changed.

## Implemented

1. **One catalog.** Removed `ServiceCarousel`, `ServiceCard`, and the marquee CSS. The homepage now renders one grouped list under the four pillars (`#capabilities`). Each capability is one link. Secondary items (game development, blockchain) stay in the list and are labeled “Secondary”. Routes, titles, and canonicals are unchanged. The navbar still lists each capability once, so a full homepage count of two links is expected: navigation plus catalog.

2. **Proof before the catalog.** Homepage order is now Hero → Selected work / Trengie → Four core offers → Additional capabilities → Delivery model → Why Ashen / About → FAQ → Contact. Trengie stays a project block with its screenshot and the documented stack (React, TypeScript, Responsive UI). It is not a logo strip.

3. **Hero, same composition.** `min-height: 100svh` remains on desktop viewports that are at least 800px tall. Shorter windows and phones use `88svh`, so the minimum stage does not lock a full viewport when the content is already short. A text link, “Selected work — Trengie”, sits under the two existing CTAs. The headline, palette, SignalField, and centered layout stay.

4. **SignalField, same drawing.** The static violet grid moved from the per-frame canvas stroke to a CSS background (`.hero-grid`). Node glow is a cached 18×18 sprite instead of `shadowBlur` on every node every frame. Link distance uses squared distance and one square root for edges inside reach. The ambient loop skips frames closer than 33 ms (about 30 fps). Phones, `prefers-reduced-motion`, off-screen intersection, and `document.hidden` still skip the loop. DPR stays capped at 1 on mobile and 1.5 on desktop. The canvas stays `aria-hidden`. No labels, no Three.js, no particle system.

5. **Funnel properties.** `hero_primary_cta`, `hero_case_studies`, `case_study_open` from the hero, and the contact start / submit / success / error events now include `cta_location` (`hero` or `contact`) plus the existing `locale`. Name, email, phone, company, and message are still dropped. Custom Vercel events stay off unless `VITE_ENABLE_VERCEL_CUSTOM_EVENTS=true`.

6. **Regression checks.** `src/test/home-quality.test.tsx` fails if the capabilities section renders a capability link twice, and fails if the Trengie page is missing the challenge, approach, outcome, or live link. `scripts/seo-audit.mjs` fails if the prerendered EN or ES homepage lists a capability any number of times other than once inside `#capabilities` and twice on the page, if any id is duplicated, or if either Trengie HTML file is under 1,200 characters of text or missing `https://trengie.com`. Existing SEO checks still cover one H1, thin pages, canonical, hreflang, noindex, and internal links. The analytics test now asserts that `route`, `offer`, and `cta_location` survive sanitization while contact PII does not.

## Design decisions

Deliberately unchanged:

- Palette `#010014`, `#8b5cf6`, `#d946ef`, and the darkened button stops `#6d28d9` → `#c026d3`.
- Outfit for display, Inter for UI, monospace only on short meta labels.
- SignalField as a 2D canvas. Not replaced with an image or Three.js.
- Trengie copy, stack, and the client’s own screenshot. No conversion rate, revenue, traffic, team size, dates, or testimonials.
- Formspree form id, field names, and the required/optional split. The existing success copy already says what happens next and does not promise a reply window.
- SEO architecture: prerender, canonical, hreflang, sitemap URLs, IndexNow, robots, OAI-SearchBot, JSON-LD, www → apex. Sitemap file was restored so this branch does not touch it.
- Indexed capability URLs and the homepage title “Ashen Software”.
- Light mode. It was reviewed, not restyled. The light homepage still reads as Ashen: white field, violet grid, the same gradient headline, glass cards, and the violet button.
- No blog and no invented claims.

The Services control still points at `/#services`, which is the four-offer section.

## Performance

Same preview, same Lighthouse flags. The after run used repeated `--only-categories` flags so the category scores are the ones Lighthouse stored.

| | Mobile before | Mobile after | Desktop before | Desktop after |
| --- | --- | --- | --- | --- |
| Performance | 71 | 90 | 98 | 98 |
| Accessibility | 100 | 100 | 100 | 100 |
| FCP | 2.7 s | 2.3 s | 0.6 s | 0.6 s |
| LCP | 6.0 s | 3.2 s | 1.1 s | 1.0 s |
| Speed Index | 4.2 s | 2.3 s | 0.9 s | 0.8 s |
| TBT | 110 ms | 90 ms | 0 ms | 0 ms |
| CLS | 0 | 0 | 0.001 | 0.001 |

After bundle: CSS 63.72 kB / gzip 11.42 kB, main JS 448.23 kB / gzip 137.89 kB, SignalField 2.69 kB / gzip 1.41 kB.

LCP element is still the homepage H1. After observed mobile phases: TTFB 5 ms, element render delay 514 ms. Simulated LCP is 3.2 s because Lantern applies 4× CPU and slow-4G on top of that trace. The preview does not gzip. SignalField is a separate lazy chunk and is not the LCP node. Mobile never starts its frame loop, so the 30 fps cap cannot be the cause of the mobile LCP number.

What did change the lab: removing the duplicated catalog dropped discovered mobile bytes from 1,075,946 to 414,978 and main-thread task time in the trace from 534 ms to 285 ms. Render-blocking resources were not the LCP gap (estimated savings 0 ms on the resource audit). Fonts are self-hosted; Outfit 600 and Inter 400 stay preloaded. Four font files are still requested.

The 2.5 s lab LCP target is not met on this uncompressed simulated-mobile run. CLS is inside 0.1. TBT is inside a comfortable lab range. INP was not measured.

### Field data

The PageSpeed Insights API returned “Quota exceeded” for `pagespeedonline.googleapis.com`. No CrUX metrics were retrieved. There is no field LCP, INP, or CLS to report, and the lab numbers above must not be read as field data.

### ChatGPT traffic

Vercel Web Analytics already records the page referrer. A visit from ChatGPT shows up as a referrer host such as `chatgpt.com` or `chat.openai.com`, or as `utm_source` on the landing URL if a link was tagged. This pass does not add Google Analytics or another tracker. Custom events strip query strings from `source`, so campaign parameters stay on the pageview referrer rather than in event properties, and form fields are not part of either.

## Accessibility

- Lighthouse accessibility score 100 mobile and desktop, before and after, on the homepage lab run.
- Prerendered EN and ES homepages have no duplicated `id`.
- Each capability in `#capabilities` is one anchor with `min-h-11` (44px).
- The Services control opens on focus as well as hover (`onFocus` + `aria-expanded`).
- SignalField remains `aria-hidden`. Phones and `prefers-reduced-motion` paint once and do not run the frame loop. The loop also stops off-screen and when `document.hidden`.
- The marquee is gone, so there is no drag gesture that needs a separate button.
- Screenshot pass reported no horizontal overflow at the four review viewports, in light mode, with the menu open, or with the dropdown open.
- A screen reader pass was not run.

## SEO

`npm run seo:check` passed for 42 indexable routes after the prerender, including the new catalog and Trengie guards. Canonical, hreflang, sitemap URLs, robots, IndexNow key file, and JSON-LD parsing were not loosened. No route was removed. No `llms.txt`, extra schema, or programmatic page was added.

## Visual QA

Local files, gitignored:

- Before: `docs/qa/before/`
- After: `docs/qa/after/`

Same page and viewport set as the baseline, plus `docs/qa/after/home-en-laptop-short-dark.png` at 1280×720 (viewport, not full page).

What the after captures show:

- After the hero, the next section is the Trengie project, then the four offers, then the compact capability list.
- The primary CTA is the filled violet–fuchsia pill. “See Our Work” stays the outline button. “Selected work — Trengie” is a quiet text link.
- On a 1280×720 laptop the hero content is about 792px tall, so `88svh` is not what sets the height. The headline, both CTAs, and the Trengie link fit. The meta strip is clipped by the fold, and the Trengie section starts at about 856px, one short scroll down.
- Light mode at 1440 keeps the same hierarchy, the grid, the gradient headline, and readable form text.
- EN and ES both use the new order.

## Editorial proposal

Not published. These are topics the current site already speaks to, so a later page could be written from the existing delivery model and the Trengie build without inventing metrics:

- Human approval on an agent that can call tools.
- What “production” means for a tool-calling workflow: source of truth, failure, and who sees the output.
- Modernizing an integration without replacing the system that already holds the data.
- How a technical B2B offer stays readable on a phone, using Trengie as the concrete example.

## Follow-up after review

The service carousel is back immediately after the hero, with the same cards, pillar chips, and “Engineering for operations” title. The loop still paints a second set of cards so the motion is continuous. Those clones are not links and are `aria-hidden`. With reduced motion they are not rendered. The capabilities list stays one link per capability.

Automation now sits with AI Agents, next to Artificial Intelligence. Integrations keeps IoT and blockchain.

The delivery model and Why Ashen sections moved from the homepage to About.

## Remaining hypotheses

- No Chrome performance trace was captured before editing SignalField. The grid stroke and `shadowBlur` were visible in the frame loop, so they were removed. The 30 fps cap and the squared-distance check were applied in that same edit and were not A/B measured. Desktop TBT stayed at 0–10 ms, so they did not show up as a lab regression.
- Field INP and CrUX are unknown until a quota-backed or Search Console lookup is available.
- A further reduction of hero padding below 800px height might bring the Trengie image onto a 720px-tall laptop. It was not done, because the current short-laptop frame still reads as the Ashen hero and the proof is the next section.
- Gradient headline contrast was reviewed on the screenshots. The white part of the H1 carries the contrast; the violet–fuchsia emphasis is the existing brand treatment and was not recolored.
