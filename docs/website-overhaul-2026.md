# Website overhaul 2026

Measured 2026-11-18 on the working tree. Production numbers are the site that was live before this change. Local numbers are `vite preview` of this tree at `http://127.0.0.1:4173/`. Lighthouse 12.8.2 did not emit category totals (`categories: {}`); the table uses audit scores. This work is not deployed, and it is not committed.

## Before

### Architecture

Vite 6, React 18, TypeScript, Tailwind 4, React Router 7, i18next, react-helmet-async, Formspree, Vercel Analytics, and Speed Insights. Routes, sitemap, and prerender shared `src/config/site-registry.mjs`: 42 indexable URLs (10 marketing routes and 11 service pages, each in English and Spanish).

`scripts/prerender.mjs` wrote a metadata shell: title, description, canonical, hreflang, one H1, one paragraph, and navigation. `createRoot` replaced `#root` after JavaScript. A crawler without JavaScript did not receive the page.

Production homepage HTML on 2026-11-18 was about 3 KB (`Content-Length: 2961`).

### Host

Checked with `curl -sI` before the code change:

| Request | Result |
| --- | --- |
| `http://ashensoftware.com/` | 308 to `https://ashensoftware.com/` |
| `http://www.ashensoftware.com/` | 308 to `https://www.ashensoftware.com/` |
| `https://www.ashensoftware.com/` | 200, same body as the apex |
| `https://ashensoftware.com/about/` | 308 to `/about` |

`https://www` was a second host, not a redirect. HSTS was present. The content-security policy at that time did not allow the Vercel Analytics or Speed Insights hosts.

### Lighthouse on the live site

Same method as the local run below. Lab only. No field CrUX sample was pulled. INP was not emitted.

| | Mobile | Desktop |
| --- | --- | --- |
| FCP | 1.1 s (1.00) | 0.4 s (1.00) |
| LCP | 3.8 s (0.54) | 0.9 s (0.96) |
| TBT | 460 ms (0.62) | 10 ms (1.00) |
| CLS | 0 (1.00) | 0 (1.00) |
| Speed Index | 1.9 s | 0.6 s |
| Binary fails | color contrast | color contrast, label/name mismatch |

The August audit in `docs/website-overhaul-audit.md` recorded a better mobile LCP (2.2–2.5 s) and a worse TBT on one run (730 ms). Treat both as lab variance, not a second baseline.

Earlier local bundle, from that audit: main JS about 410 kB (131 kB gzip), a Framer Motion chunk about 123 kB (41 kB gzip), CSS 88 kB (14 kB gzip).

### Design and indexing

The visual system was a dark blue field, violet/fuchsia accents, glass panels, glow, an animated grid, falling particles, and repeated rounded cards. The service carousel duplicated the catalog in the DOM for an infinite loop, which is what search snippets were repeating. Game development and blockchain sat at the same visual weight as the four commercial offers.

Service pages were indexable and still are. They were not thin enough to drop, and removing indexed URLs would need a consolidation plan. The prerender shell, the www duplicate, and the carousel were the indexing defects this pass had to close.

## Implemented

### Visual system

`DESIGN.md` is the source for new UI. Dark default: ink `#101210`, paper text `#ece7dc`, ember `#e07a3d` (light-mode accent `#9a3e16`). Secondary brass. Hairline borders, 2 px radius, no glass, no glow, no decorative gradients, no particle field. Type is Newsreader for statements, Schibsted Grotesk for UI, DM Mono for meta.

Font files are Latin woff2 in `public/fonts`. The Tailwind pipeline was inlining `@fontsource` `url()` paths that Vite never emitted, so the faces would have 404’d from `/assets/files/`. The homepage now preloads Newsreader 500 and Schibsted Grotesk 400. `font-display: swap`.

Home order: hero with the operator → agent → tools → records diagram and an approval step, Trengie proof, four pillars with different system views, a single capability index, a delivery rail, a spec list, Medellín, FAQ, contact. Game development and blockchain are labeled Secondary. The carousel, particle canvas, click spark, interactive grid, and Framer Motion are gone.

### Static HTML

`src/entry-server.tsx` renders each route with `renderToString`, `MemoryRouter`, Helmet, and the Formspree provider. The client hydrates when `#root` already has children. Routes are static imports so the server render includes the page, not a loading fallback. Analytics and Speed Insights mount after the first effect so the server HTML and the first client render match. Theme starts dark for the same reason.

`npm run build` type-checks, writes the sitemap, builds the client, builds the server bundle to `.ssr` (gitignored), and prerenders 42 routes plus `404.html`. Each indexable file must contain an H1 and at least 400 characters of text. Homepage HTML in this build is 50.7 kB and includes the hero, Trengie, the four pillars, the capability list once, the delivery model, FAQ answers, and the contact fields.

### SEO, crawlers, IndexNow

- Canonical host `https://ashensoftware.com`. `vercel.json` permanently redirects `www.ashensoftware.com` to the apex. Trailing slash stays off. Query strings are not a second canonical and are not stripped.
- Sitemap `lastmod` comes from `git log` on content paths (`scripts/content-lastmod.mjs`). This tree still reports `2026-08-15` because the overhaul is uncommitted. The date is not the build clock.
- `npm run seo:check` fails the build output on a missing or extra H1, colliding titles or descriptions, bad canonicals, non-reciprocal hreflang, thin HTML, sitemap drift, indexable 404s, broken homepage links, unparsed JSON-LD, a missing IndexNow key file, OG image, favicon, display font, or `OAI-SearchBot` rule. CI runs it after `npm run build`.
- `public/robots.txt` allows `OAI-SearchBot` (ChatGPT Search), `GPTBot` (training; this matches the previous `User-agent: *` allow and is documented as such), and `ChatGPT-User`. `public/llms.txt` is marked experimental and is not described as a Google ranking factor.
- IndexNow key `c0b294412adf4bb1a1fb642da46e2cc9` is a public file, not a secret. `npm run seo:indexnow` posts to `https://api.indexnow.org/indexnow` only when `VERCEL_ENV=production` or `INDEXNOW_FORCE=1`. The production build command calls it. Non-200 responses, including 400, 403, 422, and 429, are logged and do not fail the deploy. The default submit is the full indexable set because a shared layout or translation change rewrites every page. `INDEXNOW_URLS` can narrow it.
- Organization JSON-LD keeps Medellín and Colombia, `knowsLanguage` en/es, and the existing `sameAs` profiles. No street address and no `LocalBusiness`. Legal pages have no invented schema. Structured data is checked against the visible page by the audit script parsing the same HTML.

### Analytics and contact

Vercel Analytics and Speed Insights stay. The content-security policy now allows `https://va.vercel-scripts.com` and `https://vitals.vercel-insights.com`. Custom events stay gated by `VITE_ENABLE_VERCEL_CUSTOM_EVENTS` (off by default). Existing funnel events are unchanged and do not send name, email, phone, or message. The contact form still uses `@formspree/react` with the same field names.

### Accessibility checks that were fixed in this pass

The language control’s accessible name now includes the visible “EN / ES”. Lighthouse no longer reports a label/name mismatch or a color-contrast failure on the new homepage. Local preview still logs 404s for `/_vercel/insights/script.js` and `/_vercel/speed-insights/script.js`. Those paths exist on Vercel, not on `vite preview`.

## After

### Lighthouse

Local preview, Lighthouse 12.8.2, 2026-11-18, after the font and footer pass. `vite preview` does not compress responses, so the text-compression audit fails here and the lab times are slower than a Vercel response will be.

| | Mobile | Desktop |
| --- | --- | --- |
| FCP | 2.3 s (0.76) | 0.5 s (1.00) |
| LCP | 2.9 s (0.80) | 0.6 s (0.99) |
| TBT | 60 ms (1.00) | 0 ms (1.00) |
| CLS | 0 (1.00) | 0 (1.00) |
| Speed Index | 2.3 s | 0.5 s |
| Interactive | 3.3 s | 0.6 s |
| Max potential FID | 160 ms | 50 ms |
| Binary fails | console errors (local Vercel scripts) | console errors (local Vercel scripts) |

Against the live site measured the same day: mobile LCP 3.8 s → 2.9 s, mobile TBT 460 ms → 60 ms, CLS still 0, contrast and label/name failures gone. Desktop LCP 0.9 s → 0.6 s. Mobile FCP is slower in this lab (1.1 s → 2.3 s) because the first paint now waits on a full document and self-hosted fonts, and the preview server is not compressing. Field LCP at the 75th percentile was not measured. Lab mobile LCP is still above 2.5 s. Desktop lab LCP and both CLS and TBT numbers meet the stated targets. INP was not in the run; max potential FID is not INP.

Lighthouse CI was not added. These runs already vary, and a required CI job would be flaky.

### Bundle

Client output after this pass:

- JS `index-CBJIx9YB.js` 428.5 kB, gzip 132.0 kB
- CSS `index-aSyIGJuk.css` 55.4 kB, gzip 10.1 kB
- Homepage HTML 50.7 kB

The Motion chunk is gone. Gzip JS is about the same as the previous main file alone and well under main-plus-Motion. CSS is smaller. Seven woff2 files in `public/fonts` add about 152 kB uncompressed and are cached separately. The display and body-regular faces are preloaded.

### Screenshots and interaction

`node scripts/capture-screenshots.mjs` wrote full-page captures for home EN, home ES, AI Agents, Software, Data & AI, Integrations, Trengie, and About at 390×844, 768×1024, and 1440×1000. No page reported horizontal overflow. Files are in `docs/qa/screenshots/`, which is gitignored.

Reviewed: home EN desktop and mobile, home ES mobile, AI Agents desktop and mobile, Software desktop, Data & AI desktop, Integrations mobile, Trengie desktop, About desktop. The homepage reads as a specification: split hero, ember actions, a ruled system diagram, Trengie with the real screenshot, then pillars that are not four identical icon cards. Spanish headlines wrap onto extra lines and stay inside the viewport. Interior pillar pages share one editorial template (ruled lists, FAQ, contact). That is consistent, and it is less specific than the homepage.

A headless Chrome pass on the preview confirmed: the mobile menu opens (`Close menu`), the theme class becomes `light-mode`, the language switch sets `lang=es` and replaces the H1 with “Software a medida y agentes de IA para operaciones reales”, and the contact form still exposes `_gotcha`, `source`, `locale`, `name`, `company`, `email`, `phone`, `service`, and `message`. No React page error was logged. The form was not submitted, so Formspree delivery was not exercised against the live endpoint.

### SEO and tests

`npm run lint`, `npm test` (24 tests), and `npm run seo:check` (42 routes) passed on the final tree. `npm run build` includes `tsc --noEmit`. The SEO audit checks one H1, unique titles and descriptions, canonical, reciprocal hreflang plus `x-default`, meaningful initial HTML, homepage links, sitemap equality with the route list, no sitemap redirects or query strings, `404.html` noindex, JSON-LD parse, OG image, favicon, display font preload, and `OAI-SearchBot`.

## Manual actions required

These need an account this environment cannot see. None of them is claimed as done.

1. Deploy, then confirm `https://www.ashensoftware.com/` is one hop to `https://ashensoftware.com/` and that `http://www` is only the platform HTTP→HTTPS hop plus that host redirect. Set the apex as the primary domain in Vercel if it is not already.
2. Google Search Console: inspect the homepage, an ES URL, and a service URL; confirm the rendered HTML is the full page; submit `https://ashensoftware.com/sitemap.xml`.
3. Bing Webmaster Tools: verify the domain, import from Search Console if you want, submit the same sitemap, and after the first production deploy check the IndexNow dashboard. The first production build will submit. A 202 means the key is still being validated.
4. In the Vercel firewall, confirm Attack Challenge Mode or a bot rule is not challenging `OAI-SearchBot`. `robots.txt` cannot override that.
5. Leave Formspree field names as they are. Run `npm run formspree:deploy` only if the form configuration itself changes.
6. Turn on `VITE_ENABLE_VERCEL_CUSTOM_EVENTS` only if the Vercel plan can record custom events. Page views stay on without it.

## Remaining limitations

- Lab mobile LCP is 2.9 s on an uncompressed preview. Field p75 and true INP are unknown until the deploy has traffic.
- Medellín JPEGs are still about 370–500 kB. `public/assets/services/*_premium.png` files are about 650 kB–1.1 MB and are not referenced by the current pages, so they are still deployed. `src/assets/logo.png` is about 1.3 MB and is not the file the pages use.
- Pillar interiors share one template. Service detail pages still use a darkened photo backdrop.
- `lastmod` stays `2026-08-15` until a commit touches the content paths the script reads.
- `http://www` remains two hops because Vercel upgrades TLS on the same host before `vercel.json` can strip `www`.
- React Router `Link` logs `useLayoutEffect` warnings during prerender. The build still exits 0. Hydration did not throw in the Chrome pass above.
- Legal pages have no JSON-LD on purpose. `prose-invert` on those pages was not rechecked in light mode.
- Lighthouse CI is intentionally absent.
- `npm audit` reports 43 vulnerabilities. They were not force-fixed.
- Bing Webmaster Tools, Google Search Console, the IndexNow dashboard, and the Vercel firewall were not opened from here.
- The contact form was not submitted to Formspree.
