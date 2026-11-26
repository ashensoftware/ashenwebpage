import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import { localeFromPathname, type Locale } from '@/config/i18n';
import { alternatePath, pathFor, type RouteId } from '@/config/routes';

export function useLocale(): Locale {
  const { pathname } = useLocation();
  return localeFromPathname(pathname);
}

/** UI copy always follows the URL locale, not a stale i18n language. */
export function useT(): TFunction {
  const locale = useLocale();
  const { i18n } = useTranslation();
  return useMemo(() => i18n.getFixedT(locale), [i18n, locale]);
}

export function useLocalizedPath() {
  const locale = useLocale();

  return {
    locale,
    to: (id: RouteId) => pathFor(id, locale),
    alternate: (pathname: string, targetLocale: Locale) => alternatePath(pathname, targetLocale),
  };
}
