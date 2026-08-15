import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SEO } from '@/components/SEO';
import { breadcrumbJsonLd } from '@/config/schema';
import { caseStudyKey, getCaseStudy } from '@/content/case-studies';
import { pathFor } from '@/config/routes';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { useLocale, useT } from '@/hooks/useLocale';
import { track } from '@/config/analytics';

export default function CaseStudyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const t = useT();
  const locale = useLocale();
  const study = getCaseStudy(slug || '');

  if (!study) {
    return <NotFoundPage />;
  }

  const title = t(caseStudyKey(study.slug, 'title'));
  const summary = t(caseStudyKey(study.slug, 'summary'));

  return (
    <article className="min-h-screen bg-bg-primary pt-32 pb-24">
      <SEO
        title={t('trengie.seoTitle')}
        description={t('trengie.seoDesc')}
        image={study.image}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: title,
            description: summary,
            url: `https://ashensoftware.com${pathFor('trengie', locale)}`,
            creator: { '@type': 'Organization', name: 'Ashen Software' },
            about: t(caseStudyKey(study.slug, 'industry')),
          },
          breadcrumbJsonLd([
            { name: 'Ashen Software', path: pathFor('home', locale) },
            { name: t('cases.title'), path: pathFor('caseStudies', locale) },
            { name: title, path: pathFor('trengie', locale) },
          ]),
        ]}
      />
      <Container className="max-w-4xl">
        <p className="text-sm text-brand-primary mb-3">{t(caseStudyKey(study.slug, 'industry'))}</p>
        <h1 className="text-4xl md:text-5xl font-black mb-6">{title}</h1>
        <p className="text-xl text-text-secondary mb-10">{summary}</p>
        <img
          src={study.image}
          alt={t(caseStudyKey(study.slug, 'imageAlt'))}
          width={1200}
          height={750}
          className="w-full rounded-3xl border border-[var(--glass-border)] mb-12"
        />

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3">{t('trengie.challenge')}</h2>
          <p className="text-text-secondary leading-relaxed">{t(caseStudyKey(study.slug, 'challenge'))}</p>
        </section>
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3">{t('trengie.built')}</h2>
          <p className="text-text-secondary leading-relaxed">{t(caseStudyKey(study.slug, 'built'))}</p>
        </section>
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3">{t('trengie.approach')}</h2>
          <p className="text-text-secondary leading-relaxed">{t(caseStudyKey(study.slug, 'approach'))}</p>
        </section>
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3">{t('trengie.stack')}</h2>
          <ul className="flex flex-wrap gap-2">
            {study.stack.map((item) => (
              <li key={item} className="px-3 py-1 rounded-lg bg-white/5 text-sm">{item}</li>
            ))}
          </ul>
        </section>
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3">{t('trengie.outcome')}</h2>
          <p className="text-text-secondary leading-relaxed">{t(caseStudyKey(study.slug, 'outcome'))}</p>
        </section>
        <a
          href={study.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('trengie_live_site', { source: 'case_study' })}
        >
          <Button variant="primary" size="lg">{t('trengie.live')}</Button>
        </a>
      </Container>
    </article>
  );
}
