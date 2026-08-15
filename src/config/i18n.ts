export const LOCALES = ['en', 'es'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export function isLocale(value: string | undefined | null): value is Locale {
  return value === 'en' || value === 'es';
}

export function localeFromPathname(pathname: string): Locale {
  if (pathname === '/es' || pathname.startsWith('/es/')) return 'es';
  return 'en';
}

export function stripLocalePrefix(pathname: string): string {
  if (pathname === '/es') return '/';
  if (pathname.startsWith('/es/')) {
    const rest = pathname.slice(3);
    return rest.startsWith('/') ? rest : `/${rest}`;
  }
  return pathname;
}
