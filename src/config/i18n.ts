export const LOCALES = ['en', 'es', 'ja'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

const PREFIXED_LOCALES = LOCALES.filter((locale) => locale !== DEFAULT_LOCALE);

export function isLocale(value: string | undefined | null): value is Locale {
  return value != null && (LOCALES as readonly string[]).includes(value);
}

function pathnameOnly(pathname: string): string {
  const path = pathname.split(/[?#]/)[0] || '/';
  if (path.length > 1 && path.endsWith('/')) return path.slice(0, -1);
  return path;
}

export function localeFromPathname(pathname: string): Locale {
  const path = pathnameOnly(pathname);
  for (const locale of PREFIXED_LOCALES) {
    if (path === `/${locale}` || path.startsWith(`/${locale}/`)) return locale;
  }
  return DEFAULT_LOCALE;
}

export function stripLocalePrefix(pathname: string): string {
  const path = pathnameOnly(pathname);
  for (const locale of PREFIXED_LOCALES) {
    if (path === `/${locale}`) return '/';
    const prefix = `/${locale}/`;
    if (path.startsWith(prefix)) return `/${path.slice(prefix.length)}`;
  }
  return path;
}
