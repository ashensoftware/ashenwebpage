const LOCALE_COOKIE = 'ashen_locale';
const LOCALES = ['en', 'es', 'ja'];
const SPANISH = new Set([
  'CO', 'MX', 'AR', 'CL', 'PE', 'EC', 'VE', 'BO', 'PY', 'UY',
  'CR', 'PA', 'GT', 'HN', 'SV', 'NI', 'DO', 'CU', 'PR', 'ES', 'GQ',
  'BR', 'BZ', 'GY', 'SR', 'HT',
]);

const PRIVATE_REDIRECT_HEADERS = {
  'Cache-Control': 'private, no-store',
  'CDN-Cache-Control': 'no-store',
  Vary: 'Cookie, Accept-Language',
};

/**
 * Routing Middleware for `/` only.
 * This file imports nothing. The Node middleware crashed in production
 * (MIDDLEWARE_INVOCATION_FAILED) when it imported `@vercel/functions`
 * or another local module. Country comes from `x-vercel-ip-country`.
 * IP and coordinates are not read. A failure continues to the English page.
 */

function continueRequest(): Response {
  return new Response(null, {
    headers: { 'x-middleware-next': '1' },
  });
}

function header(request: Request, name: string): string | null {
  try {
    const headers = request.headers;
    if (headers && typeof headers.get === 'function') return headers.get(name);
    const raw = (headers as unknown as Record<string, string | string[] | undefined> | undefined)?.[name];
    if (Array.isArray(raw)) return raw.join(', ');
    return raw ?? null;
  } catch {
    return null;
  }
}

function isLocale(value: string | null | undefined): value is 'en' | 'es' | 'ja' {
  return value != null && LOCALES.includes(value);
}

function localeFromCountry(country: string | null): 'en' | 'es' | 'ja' | null {
  if (!country) return null;
  const code = country.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(code)) return null;
  if (code === 'JP') return 'ja';
  if (SPANISH.has(code)) return 'es';
  return 'en';
}

function localeFromAcceptLanguage(headerValue: string | null): 'en' | 'es' | 'ja' | null {
  if (!headerValue) return null;
  const ranked: { locale: 'en' | 'es' | 'ja'; q: number; index: number }[] = [];
  headerValue.split(',').forEach((part, index) => {
    const [tagRaw, ...params] = part.trim().split(';');
    const tag = tagRaw?.trim().toLowerCase() ?? '';
    if (!tag || tag === '*') return;
    let q = 1;
    for (const param of params) {
      const [key, rawValue] = param.split('=');
      if (key?.trim().toLowerCase() !== 'q') continue;
      const parsed = Number(rawValue);
      q = Number.isFinite(parsed) ? parsed : 0;
    }
    if (q <= 0) return;
    const primary = tag.split('-')[0];
    if (!isLocale(primary)) return;
    ranked.push({ locale: primary, q, index });
  });
  ranked.sort((a, b) => b.q - a.q || a.index - b.index);
  return ranked[0]?.locale ?? null;
}

function readLocaleCookie(cookie: string | null): 'en' | 'es' | 'ja' | null {
  if (!cookie) return null;
  let found: 'en' | 'es' | 'ja' | null = null;
  for (const part of cookie.split(';')) {
    const trimmed = part.trim();
    const prefix = `${LOCALE_COOKIE}=`;
    if (!trimmed.startsWith(prefix)) continue;
    let value = trimmed.slice(prefix.length).trim();
    try {
      value = decodeURIComponent(value);
    } catch {
      found = null;
      continue;
    }
    found = isLocale(value) ? value : null;
  }
  return found;
}

function requestUrl(request: Request): URL {
  const raw = request.url || '/';
  try {
    return new URL(raw);
  } catch {
    const host = header(request, 'x-forwarded-host') ?? header(request, 'host') ?? 'ashensoftware.com';
    const proto = header(request, 'x-forwarded-proto') ?? 'https';
    const path = raw.startsWith('/') ? raw : `/${raw}`;
    return new URL(path, `${proto}://${host}`);
  }
}

export default function proxy(request: Request): Response {
  try {
    const url = requestUrl(request);
    if (url.pathname !== '/') return continueRequest();
    const method = request.method || 'GET';
    if (method !== 'GET' && method !== 'HEAD') return continueRequest();

    const cookieLocale = readLocaleCookie(header(request, 'cookie'));
    const countryLocale = localeFromCountry(header(request, 'x-vercel-ip-country'));
    const locale =
      cookieLocale ?? countryLocale ?? localeFromAcceptLanguage(header(request, 'accept-language')) ?? 'en';
    if (locale === 'en') return continueRequest();

    const search = url.search && url.search !== '?' ? url.search : '';
    return new Response(null, {
      status: 307,
      headers: {
        Location: new URL(locale === 'ja' ? '/ja' : '/es', url.origin).toString() + search,
        ...PRIVATE_REDIRECT_HEADERS,
      },
    });
  } catch (error) {
    console.error('locale proxy failed', error);
    return continueRequest();
  }
}
