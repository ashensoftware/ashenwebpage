# Analytics

The site uses Vercel Web Analytics and Vercel Speed Insights. App code never imports Vercel tracking APIs directly. Components call `track()` from `src/config/analytics.ts`.

## Vercel Web Analytics

Enabled in the Vercel project dashboard and mounted once in `src/App.tsx`:

```tsx
import { Analytics } from '@vercel/analytics/react';
```

`<Analytics />` is rendered inside the React Router tree so SPA navigations are recorded as page views.

After deploy, the collector loads from same-origin `/_vercel/insights/*`. Page views, visitors, referrers, UTM data, countries, and devices appear in the project **Analytics** tab.

`beforeSend` strips query strings and hashes from page-view URLs so campaign or user data in the query is not stored.

Local `vite preview` and `vite dev` do not emit production `/_vercel/insights` requests. Confirm page views on a Vercel Preview or Production deployment.

## Custom events

Semantic conversion events already exist and must stay in UI code:

- `hero_primary_cta`
- `hero_case_studies`
- `ai_agents_cta`
- `service_cta`
- `case_study_open`
- `trengie_live_site`
- `contact_form_start`
- `contact_form_submit`
- `contact_form_success`
- `contact_form_error`
- `whatsapp_click`

Allowed dimensions are low-cardinality and non-PII: `locale`, `source`, `service`, `route`, `slug`. Path-like `source` values are stripped to pathname only. Label sources such as `hero` or `footer` are left as-is.

`track()` never forwards:

- email
- phone
- name
- message
- company
- other contact-form field values

### Current plan limitation

Official Vercel docs (quickstart, 2026-06-08) state that **Pro and Enterprise** plans can add custom events, and the custom-events page requires the **Custom Events** permission. The current project dashboard requires a Pro team upgrade to view Events.

The docs do **not** say Hobby/unpermissioned accounts can send custom events and have them safely ignored. This repo therefore does **not** send them by default.

### Enabling later

When the Vercel team can view Custom Events, set:

```
VITE_ENABLE_VERCEL_CUSTOM_EVENTS=true
```

in the Vercel project environment (and locally if you want to test the adapter). This is a feature toggle, not a secret.

Until then, `track()` still runs, still sanitizes props, and still no-ops the Vercel custom-event adapter. Page views stay enabled regardless of this flag.

Do not add a second analytics vendor.

## Speed Insights

Mounted once in `src/App.tsx`:

```tsx
import { SpeedInsights } from '@vercel/speed-insights/react';
```

`<SpeedInsights route={pathname} />` uses the current React Router path. After deploy, the collector loads from same-origin `/_vercel/speed-insights/*`.

View real-user Core Web Vitals in the project **Speed Insights** tab. Values appear after real traffic, not immediately after deploy.

CSP was not widened. Official docs add same-origin routes under `/_vercel/insights/*` and `/_vercel/speed-insights/*`, which are already allowed by `connect-src 'self'`.
