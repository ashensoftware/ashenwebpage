import React from 'react';
import { Link } from 'react-router-dom';
import { buttonClass } from '@/components/ui/button-styles';
import { Container } from '@/components/ui/Container';
import { pathFor } from '@/config/routes';
import { useLocale, useT } from '@/hooks/useLocale';

export const AboutPreview: React.FC = () => {
  const t = useT();
  const locale = useLocale();

  return (
    <section id="about-preview" className="border-b border-[var(--color-line)] py-16 md:py-24">
      <Container className="grid items-center gap-8 lg:grid-cols-12">
        <figure className="lg:col-span-6">
          <img
            src="/assets/about/medellin-valley.jpg"
            alt={t('aboutPage.photoValley')}
            width={1200}
            height={800}
            loading="lazy"
            decoding="async"
            className="aspect-[16/10] w-full rounded-3xl object-cover ring-1 ring-[var(--glass-border)]"
          />
          <figcaption className="mt-2 font-mono text-[11px] text-[var(--color-text-muted)]">{t('aboutPage.photoCredit')}</figcaption>
        </figure>
        <div className="lg:col-span-6">
          <p className="eyebrow mb-3">{t('about.label')}</p>
          <h2 className="font-display text-4xl font-medium">{t('about.title')}</h2>
          <p className="mt-4 text-lg text-[var(--color-text-secondary)]">{t('about.subtitle')}</p>
          <p className="mt-4 text-[var(--color-text-secondary)]">{t('about.description')}</p>
          <Link to={pathFor('about', locale)} className={`${buttonClass({ variant: 'secondary', size: 'md' })} mt-8`}>
            {t('about.cta')}
          </Link>
        </div>
      </Container>
    </section>
  );
};
