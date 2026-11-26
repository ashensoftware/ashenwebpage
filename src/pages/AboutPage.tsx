import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { buttonClass } from '@/components/ui/button-styles';
import { SEO } from '@/components/SEO';
import { ProcessSection } from '@/features/process/ProcessSection';
import { ValueProposition } from '@/features/value-proposition/ValueProposition';
import { organizationJsonLd } from '@/config/schema';
import { contactPath, pathFor } from '@/config/routes';
import { useLocale, useT } from '@/hooks/useLocale';

const PHOTOS = [
  { src: '/assets/about/medellin-poblado.jpg', altKey: 'aboutPage.photoPoblado' },
  { src: '/assets/about/medellin-valley.jpg', altKey: 'aboutPage.photoValley' },
  { src: '/assets/about/medellin-centro.jpg', altKey: 'aboutPage.photoCentro' },
] as const;

export const AboutPage: React.FC = () => {
  const t = useT();
  const locale = useLocale();
  const stages = [
    { title: t('aboutPage.transparencyTitle'), body: t('aboutPage.transparencyDesc') },
    { title: t('aboutPage.innovationTitle'), body: t('aboutPage.innovationDesc') },
    { title: t('aboutPage.agilityTitle'), body: t('aboutPage.agilityDesc') },
    { title: t('aboutPage.empathyTitle'), body: t('aboutPage.empathyDesc') },
  ];

  return (
    <article className="bg-[var(--bg-primary)] pb-24">
      <SEO title={t('aboutPage.seoTitle')} description={t('aboutPage.seoDesc')} jsonLd={organizationJsonLd()} />

      <section className="border-b border-[var(--color-line)]">
        <Container className="py-16 md:py-24">
          <p className="eyebrow mb-4">{t('aboutPage.dna')}</p>
          <h1 className="max-w-4xl font-display text-[clamp(2.75rem,6vw,5rem)] font-medium leading-[1.02]">
            {locale === 'ja' ? (
              <>
                {t('aboutPage.heroTitle1')}
                <br />
                {t('aboutPage.heroTitle2')}
                <br />
                {t('aboutPage.heroTitle3')}
              </>
            ) : (
              <>
                {t('aboutPage.heroTitle1')} {t('aboutPage.heroTitle2')} {t('aboutPage.heroTitle3')}
              </>
            )}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[var(--color-text-secondary)]">{t('aboutPage.heroDesc')}</p>
        </Container>
      </section>

      <section className="border-b border-[var(--color-line)] py-16 md:py-24">
        <Container>
          <h2 className="max-w-3xl font-display text-4xl font-medium">
            {locale === 'ja' ? (
              <>
                {t('aboutPage.principles1')}
                <br />
                {t('aboutPage.principles2')}
                {t('aboutPage.principles3')}
              </>
            ) : (
              <>
                {t('aboutPage.principles1')} {t('aboutPage.principles2')} {t('aboutPage.principles3')}
              </>
            )}
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {PHOTOS.map((photo) => (
              <img
                key={photo.src}
                src={photo.src}
                alt={t(photo.altKey)}
                width={800}
                height={600}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
            ))}
          </div>
          <p className="mt-3 font-mono text-[11px] text-[var(--color-text-muted)]">{t('aboutPage.photoCredit')}</p>

          <div className="mt-12 grid gap-10 border-t border-[var(--color-line)] pt-10 md:grid-cols-2">
            <div>
              <h3 className="font-display text-2xl">{t('aboutPage.missionTitle')}</h3>
              <p className="mt-3 text-[var(--color-text-secondary)]">{t('aboutPage.missionDesc')}</p>
            </div>
            <div>
              <h3 className="font-display text-2xl">{t('aboutPage.visionTitle')}</h3>
              <p className="mt-3 text-[var(--color-text-secondary)]">{t('aboutPage.visionDesc')}</p>
            </div>
          </div>

          <h3 className="mt-10 font-display text-2xl">{t('aboutPage.whoTitle')}</h3>
          <p className="mt-3 max-w-3xl text-[var(--color-text-secondary)]">{t('aboutPage.whoDesc')}</p>
          <p className="mt-6 max-w-3xl text-[var(--color-text-secondary)]">
            {t('aboutPage.evidence')}{' '}
            <Link to={pathFor('trengie', locale)} className="text-[var(--color-accent-primary)] underline-offset-2 hover:underline">
              {t('aboutPage.evidenceCta')}
            </Link>
            .
          </p>

          <dl className="mt-10 grid gap-6 border-t border-[var(--color-line)] pt-8 sm:grid-cols-3">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">{t('aboutPage.statLocation')}</dt>
              <dd className="mt-1 font-display text-3xl">Medellín</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">{t('aboutPage.statLanguage')}</dt>
              <dd className="mt-1 font-display text-3xl">EN / ES</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">{t('aboutPage.statRemote')}</dt>
              <dd className="mt-1 font-display text-3xl">{t('hero.meta.remote')}</dd>
            </div>
          </dl>
        </Container>
      </section>

      <ProcessSection />
      <ValueProposition />

      <section className="py-16 md:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow mb-3">{t('aboutPage.cultureLabel')}</p>
              <h2 className="font-display text-4xl font-medium">{t('aboutPage.cultureHeading')}</h2>
              <p className="mt-4 text-[var(--color-text-secondary)]">{t('aboutPage.cultureSubheading')}</p>
            </div>
            <Link to={contactPath(locale)} className={buttonClass({ size: 'md' })}>
              {t('cta.startProject')}
            </Link>
          </div>
          <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stages.map((stage, index) => (
              <li key={stage.title} className="border-t border-[var(--color-accent-primary)] pt-4">
                <p className="font-mono text-xs text-[var(--color-accent-primary)]">0{index + 1}</p>
                <h3 className="mt-2 font-display text-xl">{stage.title}</h3>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{stage.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </article>
  );
};
