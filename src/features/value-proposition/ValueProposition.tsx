import React from 'react';
import { Container } from '@/components/ui/Container';
import { useT } from '@/hooks/useLocale';

export const ValueProposition: React.FC = () => {
  const t = useT();
  const rows = [
    { title: t('values.innovation.title'), description: t('values.innovation.desc') },
    { title: t('values.precision.title'), description: t('values.precision.desc') },
    { title: t('values.partnership.title'), description: t('values.partnership.desc') },
    { title: t('values.speed.title'), description: t('values.speed.desc') },
  ];

  return (
    <section id="values" className="border-b border-[var(--color-line)] py-16 md:py-24">
      <Container className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow mb-3">{t('values.label')}</p>
          <h2 className="font-display text-4xl font-medium">{t('values.heading')}</h2>
          <p className="mt-4 text-[var(--color-text-secondary)]">{t('values.subheading')}</p>
        </div>
        <dl className="lg:col-span-8">
          {rows.map((row, index) => (
            <div key={row.title} className="grid gap-2 border-t border-[var(--color-line)] py-5 md:grid-cols-12">
              <dt className="font-display text-xl md:col-span-5">
                <span className="mr-3 font-mono text-xs text-[var(--color-text-muted)]">0{index + 1}</span>
                {row.title}
              </dt>
              <dd className="text-[var(--color-text-secondary)] md:col-span-7">{row.description}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
};
