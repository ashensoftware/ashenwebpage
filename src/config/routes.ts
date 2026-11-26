import { COMPANY } from './company';
import { DEFAULT_LOCALE, type Locale, localeFromPathname } from './i18n';
import {
  ROUTE_PATHS as REGISTRY_PATHS,
  SERVICE_IDS,
  canonicalUrl as registryCanonicalUrl,
  caseStudyRoutePattern as registryCaseStudyRoutePattern,
  getIndexableRoutes as registryIndexableRoutes,
  getPrerenderPaths as registryPrerenderPaths,
  servicePath as registryServicePath,
  serviceRoutePattern as registryServiceRoutePattern,
} from './site-registry.mjs';

export type RouteId =
  | 'home'
  | 'aiAgents'
  | 'software'
  | 'dataAi'
  | 'integrations'
  | 'caseStudies'
  | 'trengie'
  | 'about'
  | 'privacy'
  | 'terms';

export type LocalizedPath = Record<Locale, string>;

export const ROUTE_PATHS = REGISTRY_PATHS as Record<RouteId, LocalizedPath>;

export const SERVICE_PILLAR: Record<string, RouteId> = {
  'web-development': 'software',
  'mobile-development': 'software',
  'desktop-apps': 'software',
  'artificial-intelligence': 'aiAgents',
  'machine-learning': 'dataAi',
  'deep-learning': 'dataAi',
  'data-science': 'dataAi',
  automation: 'integrations',
  'iot-solutions': 'integrations',
  blockchain: 'integrations',
  'game-development': 'software',
};

export function pathFor(id: RouteId, locale: Locale): string {
  return ROUTE_PATHS[id][locale];
}

export function servicePath(serviceId: string, locale: Locale): string {
  return registryServicePath(serviceId, locale);
}

export function serviceRoutePattern(locale: Locale): string {
  return registryServiceRoutePattern(locale);
}

export function caseStudyRoutePattern(locale: Locale): string {
  return registryCaseStudyRoutePattern(locale);
}

export function contactPath(locale: Locale): string {
  const home = pathFor('home', locale);
  return home === '/' ? '/#contact' : `${home}#contact`;
}

export function homePath(locale: Locale): string {
  return pathFor('home', locale);
}

export function alternatePath(pathname: string, targetLocale: Locale): string {
  const pathOnly = pathname.split(/[?#]/)[0] || '/';
  const normalized = pathOnly.length > 1 && pathOnly.endsWith('/') ? pathOnly.slice(0, -1) : pathOnly;
  const currentLocale = localeFromPathname(normalized);
  if (currentLocale === targetLocale) return pathname;

  for (const id of Object.keys(ROUTE_PATHS) as RouteId[]) {
    if (ROUTE_PATHS[id][currentLocale] === normalized) {
      return ROUTE_PATHS[id][targetLocale];
    }
  }

  const serviceMatch = normalized.match(/^\/(?:es\/servicios|es\/services|ja\/services|services)\/([^/]+)$/);
  if (serviceMatch) {
    return servicePath(serviceMatch[1], targetLocale);
  }

  return pathFor('home', targetLocale);
}

export function canonicalUrl(pathname: string): string {
  return registryCanonicalUrl(pathname) || `${COMPANY.origin}${pathname}`;
}

export interface IndexableRoute {
  id: string;
  locale: Locale;
  path: string;
  alternate: LocalizedPath;
}

export function getIndexableRoutes(): IndexableRoute[] {
  return registryIndexableRoutes().map(({ id, locale, path, alternate }) => ({
    id,
    locale,
    path,
    alternate,
  }));
}

export function getPrerenderPaths(): string[] {
  return registryPrerenderPaths();
}

export { DEFAULT_LOCALE, SERVICE_IDS };
