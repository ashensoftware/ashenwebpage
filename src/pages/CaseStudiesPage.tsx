import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { SEO } from '@/components/SEO';
import { breadcrumbJsonLd } from '@/config/schema';
import { CASE_STUDIES, caseStudyKey } from '@/content/case-studies';
import { pathFor } from '@/config/routes';
import { useLocale, useT } from '@/hooks/useLocale';
import { track } from '@/config/analytics';

export default function CaseStudiesPage() {
  const t = useT();
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-bg-primary pt-32 pb-24">
      <SEO
        title={t('cases.seoTitle')}
        description={t('cases.seoDesc')}
        jsonLd={breadcrumbJsonLd([
          { name: 'Ashen Software', path: pathFor('home', locale) },
          { name: t('cases.title'), path: pathFor('caseStudies', locale) },
        ])}
      />
      <Container>
        <h1 className="text-4xl md:text-6xl font-black mb-6">{t('cases.title')}</h1>
        <p className="text-xl text-text-secondary max-w-3xl mb-12">{t('cases.subtitle')}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CASE_STUDIES.map((study) => (
            <Link
              key={study.slug}
              to={pathFor('trengie', locale)}
              onClick={() => track('case_study_open', { slug: study.slug, source: 'index' })}
              className="rounded-3xl overflow-hidden border border-[var(--glass-border)] hover:border-brand-primary/40"
            >
              <img
                src={study.image}
                alt={t(caseStudyKey(study.slug, 'imageAlt'))}
                width={1200}
                height={750}
                loading="lazy"
                className="w-full h-auto object-contain bg-[var(--color-bg-secondary)]"
              />
              <div className="p-6">
                <p className="text-sm text-brand-primary mb-2">{t(caseStudyKey(study.slug, 'industry'))}</p>
                <h2 className="text-2xl font-bold mb-3">{t(caseStudyKey(study.slug, 'title'))}</h2>
                <p className="text-text-secondary text-sm leading-relaxed">{t(caseStudyKey(study.slug, 'summary'))}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
