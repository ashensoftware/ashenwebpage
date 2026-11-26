import { geolocation, next } from '@vercel/functions';
import { negotiateLocale } from './src/config/locale-negotiation';

const PRIVATE_REDIRECT_HEADERS = {
  'Cache-Control': 'private, no-store',
  'CDN-Cache-Control': 'no-store',
  'Vercel-CDN-Cache-Control': 'no-store',
  Vary: 'Cookie, Accept-Language',
};

/**
 * Vercel Routing Middleware. The matcher in vercel.json is `/` only, so static
 * files, sitemap, robots, IndexNow, and explicit pages never reach this function.
 * The pathname guard below keeps that true even if the matcher is widened.
 * Country comes from Vercel's geolocation helper. IP and coordinates are not read or stored.
 */
export default function proxy(request: Request): Response {
  const url = new URL(request.url);
  if (url.pathname !== '/') return next();
  if (request.method !== 'GET' && request.method !== 'HEAD') return next();

  const decision = negotiateLocale({
    pathname: url.pathname,
    search: url.search,
    country: geolocation(request).country ?? null,
    acceptLanguage: request.headers.get('accept-language'),
    cookie: request.headers.get('cookie'),
  });

  if (decision.action === 'next') return next();

  return new Response(null, {
    status: decision.status,
    headers: {
      Location: new URL(decision.location, url.origin).toString(),
      ...PRIVATE_REDIRECT_HEADERS,
    },
  });
}
