import React from 'react';
import { Gauge, Handshake, Sparkles, Zap } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { useT } from '@/hooks/useLocale';

export const ValueProposition: React.FC = () => {
  const t = useT();
  const rows = [
    { title: t('values.innovation.title'), description: t('values.innovation.desc'), icon: Sparkles },
    { title: t('values.precision.title'), description: t('values.precision.desc'), icon: Gauge },
    { title: t('values.partnership.title'), description: t('values.partnership.desc'), icon: Handshake },
    { title: t('values.speed.title'), description: t('values.speed.desc'), icon: Zap },
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
          {rows.map((row) => (
            <div key={row.title} className="grid gap-2 border-t border-[var(--color-line)] py-5 md:grid-cols-12">
              <dt className="flex items-center gap-3 font-display text-xl md:col-span-5">
                <row.icon size={18} className="shrink-0 text-[var(--color-accent-primary)]" aria-hidden />
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
