# Ashen Software website overhaul — audit

Updated 2026-08-16 after the second production-hardening pass. Status uses **DONE**, **PARTIAL**, or **OPEN**.

## Measurements

Production baseline (`https://ashensoftware.com`, Lighthouse 12.6, mobile emulation, 2026-08-15):

- FCP 2.0s (score 0.84)
- LCP 2.5s (score 0.89)
- TBT 170ms (score 0.93)
- CLS 0
- Category totals were not emitted by that CLI run (`categories: {}`)

Current production, still on the previous deploy (Lighthouse 12.8.2, mobile emulation, 2026-08-16):

- FCP 1.8s
- LCP 2.2s
- TBT 730ms
- CLS 0
- INP: not emitted for this navigation run

Local production preview of this hardening branch (`http://127.0.0.1:4173/`, Lighthouse 12.8.2, mobile emulation):

- FCP 2.0s
- LCP 3.8s
- TBT 390ms
- CLS 0
- Speed Index 2.2s

Do not treat the local LCP/TBT as a production regression. Localhost has no CDN, and Lighthouse category totals were again empty (`categories: {}`). FCP matches the original baseline. CLS remains 0.

Local production build after this pass (Vite 6.3):

- Main JS `index-*.js` 409.98 kB (131.06 kB gzip)
- Previous overhaul main JS 381.88 kB (123.35 kB gzip)
- Delta +28.10 kB / +7.71 kB gzip from `@vercel/analytics` + `@vercel/speed-insights`
- `motion` chunk 122.87 kB (40.70 kB gzip)
- CSS 88.35 kB (13.59 kB gzip)
- Sitemap 42 URLs; 42 prerendered HTML pages plus `404.html`

That bundle delta is expected for the two official Vercel packages and is not a large regression.

## Issues from the first overhaul

| ID | Severity | Bug | Status |
| --- | --- | --- | --- |
| P0-01 | P0 | Contact form never sends leads | DONE |
| P0-02 | P0 | Hero secondary CTA does nothing | DONE |
| P1-01 | P1 | Footer `#work`, `/privacy`, `/terms` are dead | DONE |
| P1-02 | P1 | Placeholder email `contact@ashen.com` | DONE |
| P1-03 | P1 | Wrong GitHub org; generic Twitter | DONE |
| P1-04 | P1 | Sitemap incomplete; not in build | DONE |
| P1-05 | P1 | EN/ES share one URL | DONE |
| P1-06 | P1 | CSR-only metadata | PARTIAL — head metadata + body shell now generated; not React hydration/SSG |
| P1-07 | P1 | No Vercel SPA rewrite / headers | DONE |
| P1-08 | P1 | RAF leaks; no reduced motion | DONE — remaining mobile idle RAF fixed in this pass |
| P1-09 | P1 | Public USD ranges + unverifiable stats | DONE |
| P1-10 | P1 | Soft 404s inherit homepage SEO | PARTIAL — React `noindex` + `404.html`; host HTTP status still depends on platform fallback |
| P2-01 | P2 | Unused Three.js stack | DONE |
| P2-02 | P2 | Unsplash + unused local assets | DONE — no `src/assets` or `*_premium.png` remain in the repo |
| P2-03 | P2 | No skip link / form a11y | DONE |
| P3-01 | P3 | Dead components and hooks | DONE for shipped unused stacks; leftover unused files were re-checked and not deleted by filename |

## Issues found in this hardening pass

| ID | Severity | Bug | Status |
| --- | --- | --- | --- |
| H2-01 | P1 | `window.ashenTrack` never sent events | DONE — Vercel page views always on; custom events gated |
| H2-02 | P1 | No Speed Insights | DONE |
| H2-03 | P1 | Mobile grid still scheduled RAF | DONE — `shouldAnimate = visible && inView && !reduceMotion && !isMobile` |
| H2-04 | P1 | Legal pages mixed EN/ES | DONE — all legal prose in translation files |
| H2-05 | P1 | Privacy claimed Formspree notifies `COMPANY.email` | DONE — generic Formspree wording |
| H2-06 | P1 | Prerender left `#root` empty | DONE — route-specific H1, copy, and internal links |
| H2-07 | P1 | Route lists duplicated in 3 files | DONE — `src/config/site-registry.mjs` |
| H2-08 | P1 | Unknown case studies redirected to the listing | DONE — `NotFoundPage` + `noindex` |
| H2-09 | P2 | No CI | DONE — `.github/workflows/ci.yml` |
| H2-10 | P2 | “bilingual-capable” Trengie claim unsupported | DONE — live site is Spanish; copy updated |
| H2-11 | P2 | `useCanvas` could leak a second RAF in StrictMode | DONE |

## Prerender architecture

**What the old script did:** copy `dist/index.html` and replace title, description, canonical, hreflang, and OG tags. `#root` stayed empty.

**Limitation:** that is metadata-shell generation, not React SSG.

**Options considered:**

- A. Real build-time React prerender / `hydrateRoot`
- B. SSR/SSG Vite architecture
- C. Static HTML body injection from the route registry + translations (chosen)
- D. Next.js/Astro migration — rejected; unjustified rewrite risk

**Chosen solution:** C. After `vite build`, `scripts/prerender.mjs` reads the shared registry and locale JSON, then writes route-specific `<article>` HTML into `#root` (H1, major copy, internal links) plus head metadata.

**Migration cost / deploy risk:** low. No framework change. `createRoot` still replaces `#root` after JS loads, so this is a crawler/no-JS content shell, not hydrated SSG. A brief replace flash is possible.

**SEO benefit:** canonical marketing URLs now contain meaningful pre-JS body text instead of an empty root.

## Route source of truth

`src/config/site-registry.mjs` is framework-neutral. React (`src/config/routes.ts`), `scripts/generate-sitemap.js`, and `scripts/prerender.mjs` all consume it. Service URLs are generated from `SERVICE_IDS`, which tests keep aligned with `ASHEN_SERVICES`.

## 404 behavior

- Invalid services already rendered `NotFoundPage`.
- Invalid case-study slugs now render `NotFoundPage` instead of redirecting to the listing.
- Generated `404.html` is `noindex`, has no homepage canonical, and has no home hreflang.
- `vite preview` serves each prerendered `index.html` for known paths and `404.html` with HTTP 404 for unknown paths, so the Vite SPA fallback cannot attach homepage SEO to junk URLs locally.
- On Vercel, `404.html` is used when the filesystem miss is not rewritten to `index.html`. If the Vite framework preset injects an SPA fallback, unknown URLs can still be HTTP 200 until client JS renders the 404. That host limitation cannot be fully eliminated in this SPA/static architecture.

## Analytics and Speed Insights

See `docs/analytics.md`.

- `<Analytics />` and `<SpeedInsights />` mount once in `App.tsx`.
- Custom Vercel events default off (`VITE_ENABLE_VERCEL_CUSTOM_EVENTS=false`) because official docs require Pro/Enterprise Custom Events permission to use/view them, and they do not say Hobby accounts can send them safely.
- Page views stay enabled.
- Form PII is stripped in the adapter.

## Legal

Privacy and terms body copy lives in `src/languages/en/translation.json` and `src/languages/es/translation.json`. The attorney-review disclaimer remains. Formspree is described as the processor that lets Ashen receive and respond to inquiries. `FORMSPREE_NOTIFICATION_EMAIL` is not exposed to the client.

## Trengie claims

Verified against the live site `https://trengie.com` (Spanish public marketing site: signaling, electrification, telecommunications, rolling stock, project consulting, ISO/CENELEC/RAMS/SIL4, PMI/IPMA). Removed “bilingual-capable” and unverified “Vite”. Kept React, TypeScript, and Responsive UI as the delivered stack Ashen shipped. No invented performance, revenue, or conversion numbers.

## CI

`.github/workflows/ci.yml` runs on pull requests and pushes to `main`: `npm ci`, type-check, lint, test, build. It does not use Formspree or Vercel credentials.

## Remaining items that cannot be finished in this repository

- Vercel Pro/team upgrade if you want Custom Events in the dashboard
- Enable Speed Insights in the Vercel project UI if it is not already enabled
- Confirm `/_vercel/insights/view` and Speed Insights requests on a deployed Preview/Production URL
- Attorney review of privacy/terms
- Google Search Console property, sitemap submit, and hreflang monitoring
- Formspree CLI deploy (`FORMSPREE_DEPLOY_KEY`, `FORMSPREE_NOTIFICATION_EMAIL`) when the form config changes
- True React hydration/SSG, if you later want pixel-identical HTML before `createRoot`
- Host-level HTTP 404 if Vercel’s Vite preset forces an SPA fallback
