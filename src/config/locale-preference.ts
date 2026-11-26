import type { Locale } from './i18n';
import { LOCALE_COOKIE } from './locale-negotiation';

/** One year. The cookie stores only `en`, `es`, or `ja`. */
export const LOCALE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export function persistLocalePreference(locale: Locale): void {
  if (typeof document === 'undefined') return;
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${LOCALE_COOKIE}=${locale}; Path=/; Max-Age=${LOCALE_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
}

export function locationWithPath(path: string, search: string, hash: string): string {
  return `${path}${search}${hash}`;
}
