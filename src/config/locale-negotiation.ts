import { isLocale, type Locale } from './i18n';

/** Preference cookie. Value is only a locale code, never personal data. */
export const LOCALE_COOKIE = 'ashen_locale';

/**
 * Spanish-speaking markets. Spain stays Spanish even though the rest of Europe
 * defaults to English. Equatorial Guinea is included because Spanish is an
 * official language there, not because it is in Latin America.
 */
export const SPANISH_SPEAKING_COUNTRIES = [
  'CO',
  'MX',
  'AR',
  'CL',
  'PE',
  'EC',
  'VE',
  'BO',
  'PY',
  'UY',
  'CR',
  'PA',
  'GT',
  'HN',
  'SV',
  'NI',
  'DO',
  'CU',
  'PR',
  'ES',
  'GQ',
] as const;

/**
 * Commercial Latin America choice. These countries are routed to Spanish even
 * though Spanish is not the primary language:
 * BR Portuguese, BZ English, GY English, SR Dutch, HT French and Creole.
 * This is not a claim that those countries speak Spanish.
 * English-speaking Caribbean countries outside this list stay on English.
 */
export const COMMERCIAL_LATAM_COUNTRIES = ['BR', 'BZ', 'GY', 'SR', 'HT'] as const;

const SPANISH = new Set<string>([...SPANISH_SPEAKING_COUNTRIES, ...COMMERCIAL_LATAM_COUNTRIES]);

export type NegotiationInput = {
  pathname: string;
  search?: string;
  country?: string | null;
  acceptLanguage?: string | null;
  cookie?: string | null;
};

export type NegotiationDecision =
  | { action: 'next' }
  | { action: 'redirect'; location: string; status: 307 };

/**
 * Country is used only when Vercel actually provides a two-letter code.
 * Missing, blank, or non-alpha codes are "unavailable" and fall through to
 * Accept-Language. A known country that is not Japan or the Spanish list
 * resolves to English and does not consult the browser language.
 */
export function localeFromCountry(country: string | null | undefined): Locale | null {
  if (!country) return null;
  const code = country.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(code)) return null;
  if (code === 'JP') return 'ja';
  if (SPANISH.has(code)) return 'es';
  return 'en';
}

/**
 * Parses Accept-Language with quality values. Matches the primary language
 * subtag only, so `en-JP` stays English and `ja` is not found inside another tag.
 */
export function localeFromAcceptLanguage(header: string | null | undefined): Locale | null {
  if (!header) return null;
  const ranked: { locale: Locale; q: number; index: number }[] = [];

  header.split(',').forEach((part, index) => {
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

/** Returns the last valid ashen_locale value, or null when missing or invalid. */
export function readLocaleCookie(header: string | null | undefined): Locale | null {
  if (!header) return null;
  let found: Locale | null = null;

  for (const part of header.split(';')) {
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

/**
 * Geo redirect policy: only the unprefixed homepage is eligible.
 * An explicit localized URL, a static asset, or any other path is left alone.
 * Manual cookie wins over country. Country wins over Accept-Language.
 * English stays on `/` so the prerendered canonical homepage is unchanged.
 */
export function negotiateLocale(input: NegotiationInput): NegotiationDecision {
  const pathname = input.pathname || '/';
  if (pathname !== '/') return { action: 'next' };

  const cookieLocale = readLocaleCookie(input.cookie);
  const countryLocale = localeFromCountry(input.country);
  const locale: Locale =
    cookieLocale ?? countryLocale ?? localeFromAcceptLanguage(input.acceptLanguage) ?? 'en';

  if (locale === 'en') return { action: 'next' };

  const search = normalizeSearch(input.search);
  return {
    action: 'redirect',
    location: `${locale === 'ja' ? '/ja' : '/es'}${search}`,
    status: 307,
  };
}

function normalizeSearch(search: string | undefined): string {
  if (!search || search === '?') return '';
  return search.startsWith('?') ? search : `?${search}`;
}
