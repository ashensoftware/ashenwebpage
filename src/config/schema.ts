import { COMPANY, COMPANY_SAME_AS, assetUrl } from './company';
import { canonicalUrl } from './routes';

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: COMPANY.legalName,
    url: COMPANY.origin,
    logo: assetUrl(COMPANY.logoPath),
    email: COMPANY.email,
    telephone: COMPANY.phoneE164,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Medellín',
      addressCountry: 'CO',
    },
    sameAs: [...COMPANY_SAME_AS],
    knowsLanguage: ['en', 'es'],
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: COMPANY.displayName,
    url: COMPANY.origin,
    inLanguage: ['en', 'es', 'ja'],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  };
}
