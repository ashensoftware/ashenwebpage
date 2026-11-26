import { negotiateLocale } from './src/config/locale-negotiation';

const PRIVATE_REDIRECT_HEADERS = {
  'Cache-Control': 'private, no-store',
  'CDN-Cache-Control': 'no-store',
  Vary: 'Cookie, Accept-Language',
};

/**
 * Continue signal for Routing Middleware.
 * Inlined on purpose: importing `@vercel/functions` from this file made
 * production `/` return 500 MIDDLEWARE_INVOCATION_FAILED. `geolocation()`
 * only reads `x-vercel-ip-country`, so the header is used directly.
 */
function continueRequest(): Response {
  return new Response(null, {
    headers: { 'x-middleware-next': '1' },
  });
}

function requestUrl(request: Request): URL {
  const raw = request.url || '/';
  try {
    return new URL(raw);
  } catch {
    const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? 'ashensoftware.com';
    const proto = request.headers.get('x-forwarded-proto') ?? 'https';
    return new URL(raw.startsWith('/') ? raw : `/${raw}`, `${proto}://${host}`);
  }
}

/**
 * Vercel Routing Middleware. The matcher in vercel.json is `/` only, so static
 * files, sitemap, robots, IndexNow, and explicit pages never reach this function.
 * The pathname guard below keeps that true even if the matcher is widened.
 * Country comes from the header Vercel sets. IP and coordinates are not read or stored.
 * Any unexpected failure continues to the prerendered English homepage.
 */
export default function proxy(request: Request): Response {
  try {
    const url = requestUrl(request);
    if (url.pathname !== '/') return continueRequest();
    if (request.method !== 'GET' && request.method !== 'HEAD') return continueRequest();

    const decision = negotiateLocale({
      pathname: url.pathname,
      search: url.search,
      country: request.headers.get('x-vercel-ip-country'),
      acceptLanguage: request.headers.get('accept-language'),
      cookie: request.headers.get('cookie'),
    });

    if (decision.action === 'next') return continueRequest();

    return new Response(null, {
      status: decision.status,
      headers: {
        Location: new URL(decision.location, url.origin).toString(),
        ...PRIVATE_REDIRECT_HEADERS,
      },
    });
  } catch {
    return continueRequest();
  }
}
