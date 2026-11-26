import { describe, expect, it } from 'vitest';
import {
  localeFromAcceptLanguage,
  localeFromCountry,
  LOCALE_COOKIE,
  negotiateLocale,
  readLocaleCookie,
} from '@/config/locale-negotiation';
import { LOCALE_MAX_AGE_SECONDS, persistLocalePreference } from '@/config/locale-preference';

describe('country and language negotiation', () => {
  it('maps the required countries', () => {
    expect(localeFromCountry('JP')).toBe('ja');
    expect(localeFromCountry('co')).toBe('es');
    expect(localeFromCountry('MX')).toBe('es');
    expect(localeFromCountry('AR')).toBe('es');
    expect(localeFromCountry('BR')).toBe('es');
    expect(localeFromCountry('ES')).toBe('es');
    for (const country of ['US', 'CA', 'GB', 'DE', 'FR', 'IT', 'KR', 'CN', 'IN']) {
      expect(localeFromCountry(country)).toBe('en');
    }
    expect(localeFromCountry(null)).toBeNull();
    expect(localeFromCountry('')).toBeNull();
    expect(localeFromCountry('T1')).toBeNull();
  });

  it('respects Accept-Language quality and does not match substrings', () => {
    expect(localeFromAcceptLanguage('ja-JP,ja;q=0.9,en;q=0.4')).toBe('ja');
    expect(localeFromAcceptLanguage('es-CO,es;q=0.8')).toBe('es');
    expect(localeFromAcceptLanguage('en;q=0.1, es;q=0.9')).toBe('es');
    expect(localeFromAcceptLanguage('fr;q=0.9, ja;q=0.2')).toBe('ja');
    expect(localeFromAcceptLanguage('en-JP,ja;q=0.2')).toBe('en');
    expect(localeFromAcceptLanguage('fr-FR,fr;q=0.9')).toBeNull();
    expect(localeFromAcceptLanguage('ja;q=0')).toBeNull();
  });

  it('rejects an invalid locale cookie', () => {
    expect(readLocaleCookie('ashen_locale=fr')).toBeNull();
    expect(readLocaleCookie('ashen_locale=')).toBeNull();
    expect(readLocaleCookie('other=ja')).toBeNull();
    expect(readLocaleCookie('theme=dark; ashen_locale=ja')).toBe('ja');
  });
});

describe('homepage redirect policy', () => {
  function decide(country: string | null, extra: { cookie?: string; acceptLanguage?: string; pathname?: string; search?: string } = {}) {
    return negotiateLocale({
      pathname: extra.pathname ?? '/',
      search: extra.search ?? '',
      country,
      acceptLanguage: extra.acceptLanguage ?? null,
      cookie: extra.cookie ?? null,
    });
  }

  it('sends a first visit from Japan, Colombia, Mexico, Brazil, and Spain to the matching homepage', () => {
    expect(decide('JP')).toMatchObject({ action: 'redirect', location: '/ja', status: 307 });
    expect(decide('CO')).toMatchObject({ action: 'redirect', location: '/es', status: 307 });
    expect(decide('MX')).toMatchObject({ action: 'redirect', location: '/es' });
    expect(decide('BR')).toMatchObject({ action: 'redirect', location: '/es' });
    expect(decide('ES')).toMatchObject({ action: 'redirect', location: '/es' });
  });

  it('keeps the United States and Germany on the English homepage', () => {
    expect(decide('US')).toEqual({ action: 'next' });
    expect(decide('DE')).toEqual({ action: 'next' });
  });

  it('lets a manual preference override the country', () => {
    expect(decide('JP', { cookie: 'ashen_locale=en' })).toEqual({ action: 'next' });
    expect(decide('CO', { cookie: 'ashen_locale=ja' })).toMatchObject({ action: 'redirect', location: '/ja' });
    expect(decide('US', { cookie: 'ashen_locale=es' })).toMatchObject({ action: 'redirect', location: '/es' });
  });

  it('does not rewrite an explicit URL', () => {
    expect(decide('US', { pathname: '/ja/about' })).toEqual({ action: 'next' });
    expect(decide('JP', { pathname: '/ai-agents' })).toEqual({ action: 'next' });
    expect(decide('CO', { pathname: '/es/nosotros' })).toEqual({ action: 'next' });
    expect(decide('JP', { pathname: '/ja' })).toEqual({ action: 'next' });
    expect(decide('CO', { pathname: '/es' })).toEqual({ action: 'next' });
  });

  it('uses Accept-Language only when the country is unavailable', () => {
    expect(decide(null, { acceptLanguage: 'ja' })).toMatchObject({ action: 'redirect', location: '/ja' });
    expect(decide(null, { acceptLanguage: 'es-MX,es;q=0.8' })).toMatchObject({ action: 'redirect', location: '/es' });
    expect(decide(null, { acceptLanguage: 'de-DE,de;q=0.9' })).toEqual({ action: 'next' });
    expect(decide('US', { acceptLanguage: 'ja' })).toEqual({ action: 'next' });
  });

  it('ignores an invalid cookie and preserves campaign parameters', () => {
    expect(decide('JP', { cookie: 'ashen_locale=nope' })).toMatchObject({ location: '/ja' });
    expect(decide(null, { cookie: 'ashen_locale=../../admin', acceptLanguage: 'fr' })).toEqual({ action: 'next' });
    expect(decide('JP', { search: '?utm_source=ads&utm_campaign=spring&ref=partner' })).toMatchObject({
      location: '/ja?utm_source=ads&utm_campaign=spring&ref=partner',
    });
  });

  it('does not redirect static files, sitemap, robots, or the IndexNow key', () => {
    for (const pathname of [
      '/sitemap.xml',
      '/robots.txt',
      '/c0b294412adf4bb1a1fb642da46e2cc9.txt',
      '/assets/logo/Logo-Iso.png',
      '/fonts/outfit-latin-600-normal.woff2',
    ]) {
      expect(decide('JP', { pathname })).toEqual({ action: 'next' });
    }
  });

  it('does not loop between /, /es, and /ja', () => {
    const first = decide('JP');
    expect(first.action).toBe('redirect');
    if (first.action !== 'redirect') return;
    expect(negotiateLocale({ pathname: new URL(first.location, 'https://ashensoftware.com').pathname, country: 'JP' })).toEqual({
      action: 'next',
    });
  });
});

describe('manual locale cookie', () => {
  it('writes only the locale code with a persistent SameSite cookie', () => {
    document.cookie = 'ashen_locale=; Path=/; Max-Age=0';
    persistLocalePreference('ja');
    expect(document.cookie).toContain(`${LOCALE_COOKIE}=ja`);
    expect(LOCALE_MAX_AGE_SECONDS).toBe(60 * 60 * 24 * 365);
  });
});
