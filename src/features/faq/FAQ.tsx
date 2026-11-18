import React from 'react';
import { Container } from '@/components/ui/Container';
import { Accordion } from '@/components/ui/Accordion';
import { useT } from '@/hooks/useLocale';

export const FAQ: React.FC = () => {
  const t = useT();
  const faqItems = [
    { title: t('faq.q1'), content: t('faq.a1') },
    { title: t('faq.q2'), content: t('faq.a2') },
    { title: t('faq.q3'), content: t('faq.a3') },
    { title: t('faq.q4'), content: t('faq.a4') },
    { title: t('faq.q5'), content: t('faq.a5') },
  ];

  return (
    <section id="faq" className="border-b border-[var(--color-line)] py-16 md:py-24">
      <Container className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow mb-3">{t('faq.label')}</p>
          <h2 className="font-display text-4xl font-medium">{t('faq.title')}</h2>
          <p className="mt-4 text-[var(--color-text-secondary)]">{t('faq.subtitle')}</p>
        </div>
        <div className="lg:col-span-8">
          <Accordion items={faqItems} />
        </div>
      </Container>
    </section>
  );
};
