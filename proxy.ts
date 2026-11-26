import { negotiateLocale } from './src/config/locale-negotiation';

const PRIVATE_REDIRECT_HEADERS = {
  'Cache-Control': 'private, no-store',
  'CDN-Cache-Control': 'no-store',
  Vary: 'Cookie, Accept-Language',
};

type Geolocation = (request: Request) => { country?: string | null };

/**
 * Continue signal for Routing Middleware. Kept local so a failure inside
 * `@vercel/functions` cannot take the homepage down.
 */
function continueRequest(): Response {
  return new Response(null, {
    headers: { 'x-middleware-next': '1' },
  });
}

/**
 * `@vercel/functions` is a CommonJS barrel. Importing it from this Node
 * middleware made production return MIDDLEWARE_INVOCATION_FAILED on `/`.
 * Load only the headers entry, and only when the call runs. If that module
 * cannot be resolved or `geolocation()` throws (its city header is decoded
 * with decodeURIComponent), read the same country header it uses.
 */
async function countryOf(request: Request): Promise<string | null> {
  try {
    const { geolocation } = (await import('@vercel/functions/headers')) as {
      geolocation?: Geolocation;
    };
    if (typeof geolocation === 'function') {
      return geolocation(request).country ?? null;
    }
  } catch {
    // Fall through to the header Vercel already set on the request.
  }
  return request.headers.get('x-vercel-ip-country');
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
 * Country comes from Vercel's geolocation helper. IP and coordinates are not read or stored.
 * Any unexpected failure continues to the prerendered English homepage.
 */
export default async function proxy(request: Request): Promise<Response> {
  try {
    const url = requestUrl(request);
    if (url.pathname !== '/') return continueRequest();
    if (request.method !== 'GET' && request.method !== 'HEAD') return continueRequest();

    const decision = negotiateLocale({
      pathname: url.pathname,
      search: url.search,
      country: await countryOf(request),
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
