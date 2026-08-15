import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { COMPANY, absoluteUrl } from '@/config/company';
import { localeFromPathname, type Locale } from '@/config/i18n';
import { alternatePath, canonicalUrl } from '@/config/routes';

export type JsonLd = Record<string, unknown> | Record<string, unknown>[];

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  noindex?: boolean;
  jsonLd?: JsonLd;
}

function hreflangLinks(pathname: string) {
  const en = alternatePath(pathname, 'en');
  const es = alternatePath(pathname, 'es');
  return [
    { hrefLang: 'en', href: canonicalUrl(en) },
    { hrefLang: 'es', href: canonicalUrl(es) },
    { hrefLang: 'x-default', href: canonicalUrl(en) },
  ];
}

export const SEO: FC<SEOProps> = ({
  title,
  description,
  image = COMPANY.ogImagePath,
  noindex = false,
  jsonLd,
}) => {
  const { pathname } = useLocation();
  const locale: Locale = localeFromPathname(pathname);
  const url = canonicalUrl(pathname);
  const imageUrl = absoluteUrl(image);
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <html lang={locale} />
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      {!noindex && <link rel="canonical" href={url} />}
      {!noindex &&
        hreflangLinks(pathname).map((link) => (
          <link key={link.hrefLang} rel="alternate" hrefLang={link.hrefLang} href={link.href} />
        ))}

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={COMPANY.displayName} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:locale" content={locale === 'es' ? 'es_CO' : 'en_US'} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};
