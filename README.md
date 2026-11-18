# Ashen Software

Marketing site for [ashensoftware.com](https://ashensoftware.com). English and Spanish. The commercial story is four offers: AI agents, custom software, data and AI engineering, and integrations. Older capabilities stay as a secondary index.

## Scripts

```text
npm ci
npm run dev
npm run type-check
npm run lint
npm test
npm run build
npm run seo:check
npm run preview
```

`npm run build` type-checks, writes the sitemap, builds the client, prerenders every indexable route with React (`renderToString`), and writes `404.html`. The HTML served for each route contains the page content, not a short summary shell. The client hydrates that HTML.

`npm run seo:indexnow` submits the sitemap URLs to IndexNow only when `VERCEL_ENV=production` or `INDEXNOW_FORCE=1`. Production deploys call it from `vercel.json`. A failed submission does not fail the deploy.

## Design and operations

- `DESIGN.md` — visual system
- `docs/website-overhaul-2026.md` — what changed and how it was measured
- `docs/seo-ops.md` — canonical host, crawlers, IndexNow, Bing, Search Console
- `docs/analytics.md` — Vercel Analytics and Speed Insights

## Contact form

The contact form uses Formspree (`@formspree/react`) and the project in `src/config/company.ts`. Do not rename the form fields without updating `formspree.json`.
