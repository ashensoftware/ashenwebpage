export const SITE_ORIGIN: string;
export const LOCALES: readonly ['en', 'es'];
export type Locale = (typeof LOCALES)[number];
export type LocalizedPath = Record<Locale, string>;

export const SERVICE_IDS: readonly string[];
export const ROUTE_IDS: string[];
export const ROUTE_PATHS: Record<string, LocalizedPath>;

export interface MarketingRouteDef {
  id: string;
  indexable: boolean;
  paths: LocalizedPath;
  titles?: LocalizedPath;
  titleKey?: string;
  descKey: string;
  h1Key?: string;
  h1Keys?: string[];
  bodyKey: string;
  linkIds?: string[];
  serviceId?: string;
}

export const MARKETING_ROUTES: readonly MarketingRouteDef[];

export function servicePath(serviceId: string, locale: Locale): string;
export function canonicalUrl(pathname: string): string;
export function getMarketingRoute(id: string): MarketingRouteDef | undefined;
export function getServiceRouteDefs(): MarketingRouteDef[];
export function getIndexableRoutes(): Array<{
  id: string;
  locale: Locale;
  path: string;
  alternate: LocalizedPath;
  def: MarketingRouteDef;
}>;
export function getPrerenderPaths(): string[];
export function getSitemapPairs(): LocalizedPath[];
