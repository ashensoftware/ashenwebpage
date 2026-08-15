# Ashen Software website overhaul — audit

Baseline recorded 2026-08-15 against the pre-overhaul Vite/React SPA. Status is updated as work lands.

## Measurements

Production baseline (`https://ashensoftware.com`, Lighthouse 12.6, mobile emulation, 2026-08-15):

- FCP 2.0s (score 0.84)
- LCP 2.5s (score 0.89)
- TBT 170ms (score 0.93)
- CLS 0
- Category totals were not emitted by this CLI run (`categories: {}`)

Local production build after the overhaul (Vite 6.3):

- Main JS `index-*.js` 381.88 kB (123.35 kB gzip)
- `motion` chunk 122.87 kB (40.70 kB gzip)
- CSS 86.83 kB (13.36 kB gzip)
- Route chunks: About 9.06 kB, AI Agents 4.27 kB, case study 2.58 kB
- Three.js / R3F / timeline removed from the install
- Sitemap 42 URLs; 42 prerendered HTML shells

Contact: Formspree CLI deploy succeeded; one controlled POST to `contactForm` returned HTTP 200.

## Issues

| ID | Severity | Bug | Files | Impact | Solution | Status |
| --- | --- | --- | --- | --- | --- | --- |
| P0-01 | P0 | Contact form never sends leads | `src/features/contact/ContactUs.tsx` | Lost inbound demand | Formspree React + CLI `contactForm` | In progress |
| P0-02 | P0 | Hero secondary CTA does nothing | `src/features/hero/Hero.tsx` | Broken conversion path | Link to case studies / services | In progress |
| P1-01 | P1 | Footer `#work`, `/privacy`, `/terms` are dead | `src/components/layout/Footer.tsx` | 404s and broken trust | Real routes + legal pages | In progress |
| P1-02 | P1 | Placeholder email `contact@ashen.com` | Footer | Leads go nowhere | Centralize `softwareashen@gmail.com` | In progress |
| P1-03 | P1 | Wrong GitHub org; generic Twitter | Footer | Fake social proof | Real profiles only | In progress |
| P1-04 | P1 | Sitemap incomplete; not in build | `scripts/generate-sitemap.js` | Thin indexing | Generate from route registry | In progress |
| P1-05 | P1 | EN/ES share one URL | `src/i18n.js`, Navbar | Duplicate/unindexable locales | URL locales + hreflang | In progress |
| P1-06 | P1 | CSR-only metadata | `SEO.tsx`, `index.html` | Wrong unfurls / thin crawl | Route registry + prerender | In progress |
| P1-07 | P1 | No Vercel SPA rewrite / headers | `vercel.json` | Refresh 404 risk | Rewrites + security headers | In progress |
| P1-08 | P1 | RAF leaks; no reduced motion | Grid / ClickSpark / particles | CPU on idle tabs | Cancel, pause, reduce | In progress |
| P1-09 | P1 | Public USD ranges + unverifiable stats | Services / About | Weak positioning | Delivery model; drop invented metrics | In progress |
| P1-10 | P1 | Soft 404s inherit homepage SEO | `NotFoundPage`, invalid service | Indexable junk URLs | `noindex` + shared 404 | In progress |
| P2-01 | P2 | Unused Three.js stack | `package.json` | Bundle weight | Remove unused deps | In progress |
| P2-02 | P2 | Unsplash + unused local assets | services, `src/assets` | CLS / bytes / dead files | Local images; delete dead assets | In progress |
| P2-03 | P2 | No skip link / form a11y | Layout, contact | WCAG gaps | Labels, live regions, skip nav | In progress |
| P3-01 | P3 | Dead components and hooks | About, Particles, legacy footer | Noise | Delete after import check | In progress |

## Architecture decision

Keep Vite + React Router. Add URL locales and build-time HTML for canonical routes instead of a Next.js rewrite. See the implementation plan for trade-offs.
