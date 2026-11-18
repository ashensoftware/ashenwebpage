import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { buttonClass } from '@/components/ui/button-styles';
import { Container } from '@/components/ui/Container';
import { contactPath, pathFor } from '@/config/routes';
import { track } from '@/config/analytics';
import { useLocale, useT } from '@/hooks/useLocale';

const SignalField = lazy(() => import('@/features/hero/SignalField').then((module) => ({ default: module.SignalField })));

export const Hero: React.FC = () => {
  const t = useT();
  const locale = useLocale();

  return (
    <section id="hero" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.38),transparent_58%),radial-gradient(ellipse_at_80%_80%,rgba(217,70,239,0.22),transparent_46%)]" />
        <Suspense fallback={null}>
          <SignalField />
        </Suspense>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[var(--bg-primary)]" />
      </div>

      <Container className="rise relative z-10 flex flex-col items-center px-4 pb-20 pt-28 text-center">
        <p className="eyebrow mb-5">{t('hero.eyebrow')}</p>
        <h1 className="max-w-5xl font-display text-[clamp(2.7rem,6.4vw,5.4rem)] font-semibold leading-[1.02] tracking-tight">
          {t('hero.titleBefore')}{' '}
          <span className="text-gradient">{t('hero.titleEmphasis')}</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)] md:text-lg">
          {t('hero.subtitle')}
        </p>
        <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          <Link
            to={contactPath(locale)}
            className={buttonClass({ size: 'lg', className: 'w-full sm:w-auto sm:min-w-[200px]' })}
            onClick={() => track('hero_primary_cta', { locale })}
          >
            {t('hero.cta.primary')}
            <ArrowRight size={18} aria-hidden />
          </Link>
          <Link
            to={pathFor('caseStudies', locale)}
            className={buttonClass({ variant: 'secondary', size: 'lg', className: 'w-full sm:w-auto sm:min-w-[200px]' })}
            onClick={() => track('hero_case_studies', { locale })}
          >
            {t('hero.cta.secondary')}
          </Link>
        </div>
        <dl className="mt-12 grid w-full max-w-xl grid-cols-3 gap-2 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-3 py-4 backdrop-blur-md sm:px-6">
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">{t('hero.meta.base')}</dt>
            <dd className="mt-1 text-sm">Medellín</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">{t('hero.meta.delivery')}</dt>
            <dd className="mt-1 text-sm">{t('hero.meta.remote')}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">{t('hero.meta.languages')}</dt>
            <dd className="mt-1 text-sm">EN / ES</dd>
          </div>
        </dl>
      </Container>
    </section>
  );
}
