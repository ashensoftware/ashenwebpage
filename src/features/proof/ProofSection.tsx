import React from 'react';
import { Link } from 'react-router-dom';
import { Atom, FileCode2, MonitorSmartphone } from 'lucide-react';
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
  const stackIcons = [Atom, FileCode2, MonitorSmartphone];

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

        <div className="grid items-stretch gap-8 lg:grid-cols-12">
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
          <div className="flex h-full flex-col gap-4 lg:col-span-7">
            <Link
              to={pathFor('trengie', locale)}
              onClick={() => track('case_study_open', { slug: study.slug, source: 'home_preview' })}
              className="glass-card block overflow-hidden bg-[var(--bg-primary)]"
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
            <div className="relative min-h-56 flex-1 overflow-hidden rounded-3xl border border-[var(--glass-border)] bg-[var(--color-bg-tertiary)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(139,92,246,0.55),transparent_42%),radial-gradient(circle_at_82%_78%,rgba(217,70,239,0.4),transparent_46%)]" aria-hidden="true" />
              <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 640 280" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <g stroke="rgba(217,70,239,0.55)" strokeWidth="1.2" fill="none">
                  <path d="M70 70 L210 150 L360 90 L520 170" />
                  <path d="M210 150 L250 220 L430 210" />
                  <path d="M360 90 L430 210" />
                </g>
                <g fill="#c4b5fd">
                  <circle cx="70" cy="70" r="4" />
                  <circle cx="210" cy="150" r="5" />
                  <circle cx="360" cy="90" r="4" />
                  <circle cx="520" cy="170" r="5" />
                  <circle cx="250" cy="220" r="3.5" />
                  <circle cx="430" cy="210" r="4" />
                </g>
              </svg>
              <div className="relative flex h-full flex-col justify-between gap-6 p-5 sm:p-6">
                <p className="font-mono text-[11px] uppercase tracking-wider text-white/80">{t('trengie.stack')}</p>
                <ul className="grid gap-3 sm:grid-cols-3">
                  {study.stack.map((item, index) => {
                    const Icon = stackIcons[index] ?? Atom;
                    return (
                      <li key={item} className="rounded-2xl border border-white/15 bg-black/25 px-3 py-3 backdrop-blur-md">
                        <Icon size={18} className="text-[#d946ef]" aria-hidden />
                        <p className="mt-3 font-display text-sm text-white">{item}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
