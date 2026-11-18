import React from 'react';
import { Link } from 'react-router-dom';
import { buttonClass } from '@/components/ui/button-styles';
import { Container } from '@/components/ui/Container';
import { CASE_STUDIES, caseStudyKey } from '@/content/case-studies';
import { pathFor } from '@/config/routes';
import { track } from '@/config/analytics';
import { useLocale, useT } from '@/hooks/useLocale';

export const ProofSection: React.FC = () => {
  const t = useT();
  const locale = useLocale();
  const study = CASE_STUDIES[0];

  if (!study) return null;

  const facts = [
    { label: t('trengie.challenge'), body: t(caseStudyKey(study.slug, 'challenge')) },
    { label: t('trengie.built'), body: t(caseStudyKey(study.slug, 'built')) },
    { label: t('trengie.outcome'), body: t(caseStudyKey(study.slug, 'outcome')) },
  ];

  return (
    <section id="work" className="border-b border-[var(--color-line)] bg-[var(--color-bg-secondary)] py-16 md:py-24">
      <Container>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-3">{t('proof.label')}</p>
            <h2 className="font-display text-4xl font-medium md:text-5xl">{t('proof.title')}</h2>
          </div>
          <p className="max-w-sm text-sm text-[var(--color-text-secondary)]">{t('proof.subtitle')}</p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
              {t(caseStudyKey(study.slug, 'industry'))}
            </p>
            <h3 className="mt-2 font-display text-3xl font-medium">{t(caseStudyKey(study.slug, 'title'))}</h3>
            <p className="mt-4 text-[var(--color-text-secondary)] leading-relaxed">{t(caseStudyKey(study.slug, 'summary'))}</p>
            <dl className="mt-8 space-y-5">
              {facts.map((fact) => (
                <div key={fact.label} className="border-t border-[var(--color-line)] pt-4">
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-accent-primary)]">{fact.label}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">{fact.body}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6">
              <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">{t('trengie.stack')}</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {study.stack.map((item) => (
                  <li key={item} className="border border-[var(--color-line-strong)] px-2 py-1 font-mono text-xs">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to={pathFor('trengie', locale)}
                className={buttonClass({ size: 'md' })}
                onClick={() => track('case_study_open', { slug: study.slug })}
              >
                {t('proof.cta')}
              </Link>
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClass({ variant: 'secondary', size: 'md' })}
                onClick={() => track('trengie_live_site', { source: 'home' })}
              >
                {t('proof.visit')}
              </a>
            </div>
          </div>
          <Link
            to={pathFor('trengie', locale)}
            onClick={() => track('case_study_open', { slug: study.slug, source: 'home_preview' })}
            className="block border border-[var(--color-line-strong)] bg-[var(--bg-primary)] lg:col-span-7"
          >
            <div className="flex items-center justify-between border-b border-[var(--color-line)] px-3 py-2 font-mono text-[11px] text-[var(--color-text-muted)]">
              <span>trengie.com</span>
              <span>{t('proof.liveFrame')}</span>
            </div>
            <img
              src={study.image}
              alt={t(caseStudyKey(study.slug, 'imageAlt'))}
              width={1200}
              height={750}
              loading="lazy"
              decoding="async"
              className="h-auto w-full"
            />
          </Link>
        </div>
      </Container>
    </section>
  );
};
