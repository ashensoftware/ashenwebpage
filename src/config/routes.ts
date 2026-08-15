import { COMPANY } from './company';
import { DEFAULT_LOCALE, type Locale, localeFromPathname } from './i18n';
import { ASHEN_SERVICES } from '@/core/constants/ashenServices';

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

export const ROUTE_PATHS: Record<RouteId, LocalizedPath> = {
  home: { en: '/', es: '/es' },
  aiAgents: { en: '/ai-agents', es: '/es/agentes-ia' },
  software: { en: '/software-development', es: '/es/desarrollo-software' },
  dataAi: { en: '/data-ai-engineering', es: '/es/datos-ia' },
  integrations: { en: '/integrations', es: '/es/integraciones' },
  caseStudies: { en: '/case-studies', es: '/es/casos' },
  trengie: { en: '/case-studies/trengie', es: '/es/casos/trengie' },
  about: { en: '/about', es: '/es/nosotros' },
  privacy: { en: '/privacy', es: '/es/privacidad' },
  terms: { en: '/terms', es: '/es/terminos' },
};

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
  return locale === 'es' ? `/es/servicios/${serviceId}` : `/services/${serviceId}`;
}

export function contactPath(locale: Locale): string {
  return locale === 'es' ? '/es#contact' : '/#contact';
}

export function homePath(locale: Locale): string {
  return pathFor('home', locale);
}

export function alternatePath(pathname: string, targetLocale: Locale): string {
  const currentLocale = localeFromPathname(pathname);
  if (currentLocale === targetLocale) return pathname;

  for (const id of Object.keys(ROUTE_PATHS) as RouteId[]) {
    if (ROUTE_PATHS[id][currentLocale] === pathname) {
      return ROUTE_PATHS[id][targetLocale];
    }
  }

  const serviceMatch = pathname.match(/^\/(?:es\/servicios|services)\/([^/]+)$/);
  if (serviceMatch) {
    return servicePath(serviceMatch[1], targetLocale);
  }

  return pathFor('home', targetLocale);
}

export function canonicalUrl(pathname: string): string {
  if (pathname === '/') return `${COMPANY.origin}/`;
  return `${COMPANY.origin}${pathname}`;
}

export interface IndexableRoute {
  id: string;
  locale: Locale;
  path: string;
  alternate: LocalizedPath;
}

export function getIndexableRoutes(): IndexableRoute[] {
  const routes: IndexableRoute[] = [];

  (Object.keys(ROUTE_PATHS) as RouteId[]).forEach((id) => {
    (['en', 'es'] as Locale[]).forEach((locale) => {
      routes.push({
        id: `${id}:${locale}`,
        locale,
        path: ROUTE_PATHS[id][locale],
        alternate: ROUTE_PATHS[id],
      });
    });
  });

  ASHEN_SERVICES.forEach((service) => {
    (['en', 'es'] as Locale[]).forEach((locale) => {
      const paths = {
        en: servicePath(service.id, 'en'),
        es: servicePath(service.id, 'es'),
      };
      routes.push({
        id: `service:${service.id}:${locale}`,
        locale,
        path: paths[locale],
        alternate: paths,
      });
    });
  });

  return routes;
}

export function getPrerenderPaths(): string[] {
  return getIndexableRoutes().map((route) => route.path);
}

export { DEFAULT_LOCALE };
