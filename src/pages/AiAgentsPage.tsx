import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SEO } from '@/components/SEO';
import { breadcrumbJsonLd } from '@/config/schema';
import { ServiceHeroBackdrop } from '@/components/ui/ServiceHeroBackdrop';
import { ContactUs } from '@/features/contact/ContactUs';
import { contactPath, pathFor } from '@/config/routes';
import { useLocale, useT } from '@/hooks/useLocale';
import { track } from '@/config/analytics';

export default function AiAgentsPage() {
  const t = useT();
  const locale = useLocale();
  const outcomes = t('aiAgents.outcomes', { returnObjects: true }) as string[];
  const workflows = t('aiAgents.workflows', { returnObjects: true }) as { title: string; body: string }[];
  const faq = t('aiAgents.faq', { returnObjects: true }) as { q: string; a: string }[];

  return (
    <div className="min-h-screen bg-bg-primary overflow-x-hidden">
      <SEO
        title={t('aiAgents.seoTitle')}
        description={t('aiAgents.seoDesc')}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: t('aiAgents.eyebrow'),
            provider: { '@type': 'Organization', name: 'Ashen Software' },
            description: t('aiAgents.seoDesc'),
            areaServed: ['CO', 'LATAM', 'Worldwide'],
          },
          breadcrumbJsonLd([
            { name: 'Ashen Software', path: pathFor('home', locale) },
            { name: t('aiAgents.eyebrow'), path: pathFor('aiAgents', locale) },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faq.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: { '@type': 'Answer', text: item.a },
            })),
          },
        ]}
      />

      <section className="relative min-h-[70vh] flex items-center pt-28 pb-20 overflow-hidden">
        <ServiceHeroBackdrop src="/assets/services/ai.jpg" />
        <Container className="relative z-10 max-w-4xl">
          <p className="text-brand-primary font-bold tracking-widest uppercase text-sm mb-4">{t('aiAgents.eyebrow')}</p>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">{t('aiAgents.title')}</h1>
          <p className="text-xl text-text-secondary mb-8">{t('aiAgents.subtitle')}</p>
          <Link to={contactPath(locale)} onClick={() => track('ai_agents_cta', { source: 'hero' })}>
            <Button variant="primary" size="lg">{t('cta.startProject')}</Button>
          </Link>
        </Container>
      </section>

      <section className="py-20">
        <Container className="max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">{t('aiAgents.outcomesTitle')}</h2>
          <ul className="space-y-3 text-text-secondary">
            {outcomes.map((item) => (
              <li key={item} className="pl-4 border-l-2 border-brand-primary/40">{item}</li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-20 bg-bg-secondary">
        <Container>
          <h2 className="text-3xl font-bold mb-10">{t('aiAgents.workflowsTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflows.map((item) => (
              <article key={item.title} className="p-6 rounded-2xl border border-black/10 dark:border-white/10">
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{item.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="max-w-3xl space-y-10">
          <div>
            <h2 className="text-3xl font-bold mb-4">{t('aiAgents.architectureTitle')}</h2>
            <p className="text-text-secondary leading-relaxed">{t('aiAgents.architecture')}</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">{t('aiAgents.securityTitle')}</h2>
            <p className="text-text-secondary leading-relaxed">{t('aiAgents.security')}</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">{t('aiAgents.evalTitle')}</h2>
            <p className="text-text-secondary leading-relaxed">{t('aiAgents.eval')}</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">{t('aiAgents.deliveryTitle')}</h2>
            <p className="text-text-secondary leading-relaxed">{t('aiAgents.delivery')}</p>
          </div>
        </Container>
      </section>

      <section className="py-20 bg-bg-secondary">
        <Container className="max-w-3xl">
          <h2 className="text-3xl font-bold mb-8">{t('aiAgents.faqTitle')}</h2>
          <dl className="space-y-6">
            {faq.map((item) => (
              <div key={item.q}>
                <dt className="font-bold mb-2">{item.q}</dt>
                <dd className="text-text-secondary">{item.a}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="py-20">
        <Container className="max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">{t('aiAgents.ctaTitle')}</h2>
          <p className="text-text-secondary mb-8">{t('aiAgents.ctaBody')}</p>
          <Link to={contactPath(locale)}>
            <Button variant="primary" size="lg">{t('cta.startProject')}</Button>
          </Link>
        </Container>
      </section>

      <div id="contact">
        <ContactUs />
      </div>
    </div>
  );
}
