import React from 'react';
import { Link } from 'react-router-dom';
import { buttonClass } from '@/components/ui/button-styles';
import { Container } from '@/components/ui/Container';
import { SystemDiagram } from '@/features/diagrams/SystemDiagram';
import { contactPath, pathFor } from '@/config/routes';
import { track } from '@/config/analytics';
import { useLocale, useT } from '@/hooks/useLocale';

export const Hero: React.FC = () => {
  const t = useT();
  const locale = useLocale();

  return (
    <section id="hero" className="border-b border-[var(--color-line)]">
      <Container className="grid items-end gap-10 py-12 md:py-20 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-5">{t('hero.eyebrow')}</p>
          <h1 className="font-display text-[clamp(2.5rem,5vw,4.25rem)] leading-[1.02] font-medium text-[var(--color-text-primary)]">
            {t('hero.titleBefore')}{' '}
            <span className="text-[var(--color-accent-primary)]">{t('hero.titleEmphasis')}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-text-secondary)]">{t('hero.subtitle')}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to={contactPath(locale)}
              className={buttonClass({ size: 'lg' })}
              onClick={() => track('hero_primary_cta', { locale })}
            >
              {t('hero.cta.primary')}
            </Link>
            <Link
              to={pathFor('caseStudies', locale)}
              className={buttonClass({ variant: 'secondary', size: 'lg' })}
              onClick={() => track('hero_case_studies', { locale })}
            >
              {t('hero.cta.secondary')}
            </Link>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-[var(--color-line)] pt-5 text-sm">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">{t('hero.meta.base')}</dt>
              <dd className="mt-1">Medellín</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">{t('hero.meta.delivery')}</dt>
              <dd className="mt-1">{t('hero.meta.remote')}</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">{t('hero.meta.languages')}</dt>
              <dd className="mt-1">EN / ES</dd>
            </div>
          </dl>
        </div>
        <div className="lg:col-span-7">
          <SystemDiagram
            label={t('system.label')}
            operator={t('system.operator')}
            agent={t('system.agent')}
            tools={t('system.tools')}
            records={t('system.records')}
            approval={t('system.approval')}
            caption={t('system.caption')}
          />
        </div>
      </Container>
    </section>
  );
};
