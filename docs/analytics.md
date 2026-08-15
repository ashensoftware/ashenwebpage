# Analytics

The site exposes `track(event, props)` from `src/config/analytics.ts`. Conversion events are already wired. Nothing is sent to a vendor until you assign `window.ashenTrack` or add a provider.

Recommended next step (needs an account):

1. Enable [Vercel Analytics](https://vercel.com/docs/analytics) on the existing project, or
2. Add [Plausible](https://plausible.io) if you want a privacy-first third party.

Do not add more than one analytics system.
