import React from 'react';
import { Container } from '@/components/ui/Container';
import { useT } from '@/hooks/useLocale';

const STEPS = ['discovery', 'pilot', 'production', 'support'] as const;

export const ProcessSection: React.FC = () => {
  const t = useT();

  return (
    <section className="border-b border-[var(--color-line)] py-16 md:py-24" aria-labelledby="process-title">
      <Container>
        <div className="mb-10 max-w-2xl">
          <p className="eyebrow mb-3">{t('process.label')}</p>
          <h2 id="process-title" className="font-display text-4xl font-medium">
            {t('process.title')}
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)]">{t('process.subtitle')}</p>
        </div>
        <ol className="grid gap-0 md:grid-cols-4">
          {STEPS.map((step, index) => (
            <li key={step} className="relative border-t border-[var(--color-accent-primary)] pt-5 md:pr-6">
              <span className="font-mono text-xs text-[var(--color-accent-primary)]">0{index + 1}</span>
              <h3 className="mt-3 font-display text-2xl font-medium">{t(`process.steps.${step}.title`)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">{t(`process.steps.${step}.body`)}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
};
