# SEO operations

Canonical host: `https://ashensoftware.com` (no www, no trailing slash).

This document is the runbook. It does not claim that Google Search Console or Bing Webmaster Tools are already configured. Those accounts were not available from the repository.

## What the build checks

`npm run seo:check` reads `dist/` after `npm run build` and fails if:

- an indexable route is missing, thin, or has not exactly one H1
- titles or descriptions collide
- canonical or reciprocal hreflang/`x-default` is wrong
- JSON-LD is missing on commercial pages or fails to parse
- a homepage internal link is not a known route
- the sitemap does not match the indexable route list
- `404.html` is indexable or listed in the sitemap
- the IndexNow key file, OG image, favicon, or `OAI-SearchBot` rule is missing

`lastmod` comes from `git log` of content paths (`scripts/content-lastmod.mjs`). It is omitted when git history is unavailable. It is not the build clock. A commit that does not touch those paths does not change `lastmod`.

## Host and redirects

Checked against production on 2026-11-18, before this change:

- `http://ashensoftware.com/` → `308` `https://ashensoftware.com/`
- `http://www.ashensoftware.com/` → `308` `https://www.ashensoftware.com/`
- `https://www.ashensoftware.com/` → `200` with the same body as the apex
- `https://ashensoftware.com/about/` → `308` `/about`

`vercel.json` now adds a permanent host redirect from `www.ashensoftware.com` to `https://ashensoftware.com/:path*`. Trailing slashes stay off via `trailingSlash: false`.

`http://www` still takes two hops: Vercel upgrades HTTP to HTTPS on the same host, then this redirect removes `www`. That first hop is the platform TLS redirect. After deploy, confirm:

```text
curl -sI https://www.ashensoftware.com/
curl -sI http://www.ashensoftware.com/
curl -sI https://ashensoftware.com/about/
```

Expect one hop from `https://www` to the apex, and no chain longer than the platform HTTP→HTTPS hop plus that host redirect.

Canonical tags ignore query strings, so `utm_*` and similar parameters do not create a second canonical URL. They are not stripped with a redirect, because that would drop campaign parameters.

In the Vercel project, set `ashensoftware.com` as the primary domain if it is not already. The `vercel.json` rule covers `www` even if the dashboard domain list is wrong. If the dashboard also redirects `www`, confirm the result is still a single hop.

## Crawlers

`public/robots.txt` names three OpenAI agents separately, matching [OpenAI's crawler documentation](https://developers.openai.com/api/docs/bots):

| Token | Role | This site |
| --- | --- | --- |
| `OAI-SearchBot` | ChatGPT Search | `Allow: /` |
| `GPTBot` | Training-related crawling | `Allow: /` |
| `ChatGPT-User` | User-triggered fetches | `Allow: /` |

`GPTBot` was already allowed by `User-agent: *`. The explicit rule keeps that policy. It is not an opt-in to a new use. Search eligibility is `OAI-SearchBot`, not `GPTBot`. OpenAI says `robots.txt` may not be enforced for `ChatGPT-User`.

Nothing in this repo enables Vercel Attack Challenge Mode or a WAF rule. Those can block a bot even when `robots.txt` allows it. After deploy, check the Vercel firewall settings and confirm `OAI-SearchBot` is not challenged. Published IP ranges are on `https://openai.com/searchbot.json`.

`public/llms.txt` is an experimental pointer for clients that look for it. It is not a Google ranking signal. Google’s current guidance is that AI Overviews and AI Mode do not require special markup.

## IndexNow

Protocol: [IndexNow documentation](https://www.indexnow.org/documentation). Endpoint: `https://api.indexnow.org/indexnow`. A successful post is shared with participating engines, including Bing. The key file is `https://ashensoftware.com/c0b294412adf4bb1a1fb642da46e2cc9.txt` and contains that key. The key is a public ownership proof, not a credential.

```text
npm run seo:indexnow
```

The script exits immediately unless `VERCEL_ENV=production` or `INDEXNOW_FORCE=1`. Production builds call it from `vercel.json` `buildCommand`. A non-200 response, including 400, 403, 422, and 429, is logged and does not fail the deployment. 202 means the list was accepted and key validation is still pending.

Submission is the full indexable set. The site is small, and a shared layout or translation change rewrites every page, so a partial diff is a poor signal. Set `INDEXNOW_URLS` to a comma-separated list when you know the affected URLs.

Do not resubmit on 429. Fix the key file before resubmitting a 403 or 422.

## Bing Webmaster Tools

Do these in the Bing account. This repository cannot see that account.

1. Open [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. Add `https://ashensoftware.com`. Prefer the domain or URL-prefix property that matches the apex, not `www`.
3. Verify with the DNS CNAME or the XML file Bing provides. Do not commit a secret verification token if Bing offers a meta tag instead; a meta tag can be added later.
4. If Google Search Console already has the apex property, use Bing’s import. Import does not replace verification.
5. Submit `https://ashensoftware.com/sitemap.xml`.
6. After the first production deploy of this change, open the IndexNow section and confirm the key and a recent submission.
7. Use URL Inspection on `/`, `/es`, `/ai-agents`, `/es/agentes-ia`, and `/case-studies/trengie`.
8. Check that `www` URLs are not indexed as a second host once the redirect is live.

## Google Search Console

1. Property: `https://ashensoftware.com` (URL-prefix or domain). Do not keep a separate `www` property as canonical.
2. Submit the same sitemap.
3. Inspect `/` and `/es` and confirm the rendered HTML already contains the H1 without relying on the rendered-page screenshot alone. View source.
4. Watch the hreflang report for EN/ES pairs.
5. Request indexing only for URLs whose content actually changed.

## Structured data

Pages emit Organization, WebSite, BreadcrumbList, Service, CreativeWork, or FAQPage only where that content is visible. There is no LocalBusiness and no street address. FAQ markup is for the visible questions. It is not assumed to produce a FAQ rich result.

## Analytics

Vercel Web Analytics and Speed Insights stay mounted. Custom events stay behind `VITE_ENABLE_VERCEL_CUSTOM_EVENTS` because the dashboard view requires Vercel Pro. Event names: `hero_primary_cta`, `hero_case_studies`, `case_study_open`, `trengie_live_site`, `ai_agents_cta`, `service_cta`, `whatsapp_click`, `contact_form_start`, `contact_form_submit`, `contact_form_success`, `contact_form_error`. Properties are locale, slug, route, or a path. Names, email, phone, and message are stripped.
