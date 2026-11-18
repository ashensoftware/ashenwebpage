/**
 * Framework-neutral site registry.
 * Consumed by React (via routes.ts) and Node build scripts.
 * Do not import React, DOM, or i18n here.
 */

export const SITE_ORIGIN = 'https://ashensoftware.com';

export const LOCALES = /** @type {const} */ (['en', 'es']);

export const SERVICE_IDS = /** @type {const} */ ([
  'web-development',
  'mobile-development',
  'desktop-apps',
  'iot-solutions',
  'game-development',
  'artificial-intelligence',
  'machine-learning',
  'deep-learning',
  'data-science',
  'blockchain',
  'automation',
]);

/** @typedef {'en' | 'es'} Locale */
/** @typedef {{ en: string, es: string }} LocalizedPath */

/**
 * Canonical marketing routes. Service pages are generated from SERVICE_IDS.
 * @type {readonly {
 *   id: string,
 *   indexable: boolean,
 *   paths: LocalizedPath,
 *   titles?: LocalizedPath,
 *   titleKey?: string,
 *   descKey: string,
 *   h1Key?: string,
 *   h1Keys?: string[],
 *   bodyKey: string,
 *   linkIds?: string[],
 * }[]}
 */
export const MARKETING_ROUTES = [
  {
    id: 'home',
    indexable: true,
    paths: { en: '/', es: '/es' },
    titles: {
      en: 'Custom Software & AI Agents | Ashen Software',
      es: 'Software a medida y agentes de IA | Ashen Software',
    },
    descKey: 'hero.subtitle',
    h1Keys: ['hero.titleBefore', 'hero.titleEmphasis'],
    bodyKey: 'hero.subtitle',
    linkIds: ['aiAgents', 'caseStudies', 'about'],
  },
  {
    id: 'aiAgents',
    indexable: true,
    paths: { en: '/ai-agents', es: '/es/agentes-ia' },
    titleKey: 'aiAgents.seoTitle',
    descKey: 'aiAgents.seoDesc',
    h1Key: 'aiAgents.title',
    bodyKey: 'aiAgents.subtitle',
    linkIds: ['caseStudies', 'about'],
  },
  {
    id: 'software',
    indexable: true,
    paths: { en: '/software-development', es: '/es/desarrollo-software' },
    titleKey: 'softwarePage.seoTitle',
    descKey: 'softwarePage.seoDesc',
    h1Key: 'softwarePage.title',
    bodyKey: 'softwarePage.subtitle',
    linkIds: ['aiAgents', 'dataAi'],
  },
  {
    id: 'dataAi',
    indexable: true,
    paths: { en: '/data-ai-engineering', es: '/es/datos-ia' },
    titleKey: 'dataPage.seoTitle',
    descKey: 'dataPage.seoDesc',
    h1Key: 'dataPage.title',
    bodyKey: 'dataPage.subtitle',
    linkIds: ['aiAgents', 'integrations'],
  },
  {
    id: 'integrations',
    indexable: true,
    paths: { en: '/integrations', es: '/es/integraciones' },
    titleKey: 'integrationsPage.seoTitle',
    descKey: 'integrationsPage.seoDesc',
    h1Key: 'integrationsPage.title',
    bodyKey: 'integrationsPage.subtitle',
    linkIds: ['software', 'aiAgents'],
  },
  {
    id: 'caseStudies',
    indexable: true,
    paths: { en: '/case-studies', es: '/es/casos' },
    titleKey: 'cases.seoTitle',
    descKey: 'cases.seoDesc',
    h1Key: 'cases.title',
    bodyKey: 'cases.subtitle',
    linkIds: ['trengie', 'about'],
  },
  {
    id: 'trengie',
    indexable: true,
    paths: { en: '/case-studies/trengie', es: '/es/casos/trengie' },
    titleKey: 'trengie.seoTitle',
    descKey: 'trengie.seoDesc',
    h1Key: 'cases.items.trengie.title',
    bodyKey: 'cases.items.trengie.summary',
    linkIds: ['caseStudies', 'about'],
  },
  {
    id: 'about',
    indexable: true,
    paths: { en: '/about', es: '/es/nosotros' },
    titleKey: 'aboutPage.seoTitle',
    descKey: 'aboutPage.seoDesc',
    h1Keys: ['aboutPage.heroTitle1', 'aboutPage.heroTitle2', 'aboutPage.heroTitle3'],
    bodyKey: 'aboutPage.seoDesc',
    linkIds: ['caseStudies', 'aiAgents'],
  },
  {
    id: 'privacy',
    indexable: true,
    paths: { en: '/privacy', es: '/es/privacidad' },
    titleKey: 'legal.privacyTitle',
    descKey: 'legal.privacyDesc',
    h1Key: 'footer.privacy',
    bodyKey: 'legal.privacy.collects',
    linkIds: ['terms', 'about'],
  },
  {
    id: 'terms',
    indexable: true,
    paths: { en: '/terms', es: '/es/terminos' },
    titleKey: 'legal.termsTitle',
    descKey: 'legal.termsDesc',
    h1Key: 'footer.terms',
    bodyKey: 'legal.terms.services',
    linkIds: ['privacy', 'about'],
  },
];

export const ROUTE_IDS = MARKETING_ROUTES.map((route) => route.id);

/** @type {Record<string, LocalizedPath>} */
export const ROUTE_PATHS = Object.fromEntries(
  MARKETING_ROUTES.map((route) => [route.id, route.paths]),
);

/**
 * @param {string} serviceId
 * @param {Locale} locale
 */
export function servicePath(serviceId, locale) {
  return locale === 'es' ? `/es/servicios/${serviceId}` : `/services/${serviceId}`;
}

/**
 * @param {string} pathname
 */
export function canonicalUrl(pathname) {
  if (pathname === '/') return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${pathname}`;
}

/**
 * @param {string} id
 */
export function getMarketingRoute(id) {
  return MARKETING_ROUTES.find((route) => route.id === id);
}

export function getServiceRouteDefs() {
  return SERVICE_IDS.map((id) => ({
    id: `service:${id}`,
    serviceId: id,
    indexable: true,
    paths: {
      en: servicePath(id, 'en'),
      es: servicePath(id, 'es'),
    },
    titleKey: `services_data.${id}.title`,
    descKey: `services_data.${id}.description`,
    h1Key: `services_data.${id}.title`,
    bodyKey: `services_data.${id}.description`,
    linkIds: ['aiAgents', 'caseStudies'],
  }));
}

/**
 * Indexable locale+path rows for sitemap, prerender, and React SEO.
 * @returns {{ id: string, locale: Locale, path: string, alternate: LocalizedPath, def: object }[]}
 */
export function getIndexableRoutes() {
  const defs = [...MARKETING_ROUTES, ...getServiceRouteDefs()];
  /** @type {{ id: string, locale: Locale, path: string, alternate: LocalizedPath, def: object }[]} */
  const routes = [];

  for (const def of defs) {
    if (!def.indexable) continue;
    for (const locale of LOCALES) {
      routes.push({
        id: `${def.id}:${locale}`,
        locale,
        path: def.paths[locale],
        alternate: def.paths,
        def,
      });
    }
  }

  return routes;
}

export function getPrerenderPaths() {
  return getIndexableRoutes().map((route) => route.path);
}

export function getSitemapPairs() {
  const defs = [...MARKETING_ROUTES, ...getServiceRouteDefs()];
  return defs.filter((def) => def.indexable).map((def) => def.paths);
}
