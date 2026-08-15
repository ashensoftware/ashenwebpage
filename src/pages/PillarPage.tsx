import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SEO } from '@/components/SEO';
import { breadcrumbJsonLd } from '@/config/schema';
import { ServiceHeroBackdrop } from '@/components/ui/ServiceHeroBackdrop';
import { ContactUs } from '@/features/contact/ContactUs';
import { ASHEN_SERVICES } from '@/core/constants/ashenServices';
import { contactPath, pathFor, servicePath, SERVICE_PILLAR, type RouteId } from '@/config/routes';
import { useLocale, useT } from '@/hooks/useLocale';
import { track } from '@/config/analytics';

interface PillarPageProps {
  routeId: RouteId;
  copyKey: 'softwarePage' | 'dataPage' | 'integrationsPage';
  serviceIds: string[];
}

const PILLAR_HERO: Record<PillarPageProps['copyKey'], string> = {
  softwarePage: '/assets/services/web.jpg',
  dataPage: '/assets/services/data.jpg',
  integrationsPage: '/assets/services/automation.jpg',
};

export function PillarPage({ routeId, copyKey, serviceIds }: PillarPageProps) {
  const t = useT();
  const locale = useLocale();
  const capabilities = ASHEN_SERVICES.filter((service) => serviceIds.includes(service.id));
  const outcomes = t(`${copyKey}.outcomes`, { returnObjects: true }) as string[];
  const work = t(`${copyKey}.work`, { returnObjects: true }) as { title: string; body: string }[];
  const faq = t(`${copyKey}.faq`, { returnObjects: true }) as { q: string; a: string }[];

  return (
    <div className="min-h-screen bg-bg-primary overflow-x-hidden">
      <SEO
        title={t(`${copyKey}.seoTitle`)}
        description={t(`${copyKey}.seoDesc`)}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: t(`${copyKey}.title`),
            provider: { '@type': 'Organization', name: 'Ashen Software' },
            description: t(`${copyKey}.seoDesc`),
          },
          breadcrumbJsonLd([
            { name: 'Ashen Software', path: pathFor('home', locale) },
            { name: t(`${copyKey}.title`), path: pathFor(routeId, locale) },
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
        <ServiceHeroBackdrop src={PILLAR_HERO[copyKey]} />
        <Container className="relative z-10 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-black mb-6">{t(`${copyKey}.title`)}</h1>
          <p className="text-xl text-text-secondary mb-8">{t(`${copyKey}.subtitle`)}</p>
          <Link to={contactPath(locale)} onClick={() => track('service_cta', { routeId })}>
            <Button variant="primary" size="lg">{t('cta.startProject')}</Button>
          </Link>
        </Container>
      </section>

      <section className="py-20">
        <Container className="max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">{t(`${copyKey}.outcomesTitle`)}</h2>
          <ul className="space-y-3 text-text-secondary">
            {outcomes.map((item) => (
              <li key={item} className="pl-4 border-l-2 border-brand-primary/40">{item}</li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-20 bg-bg-secondary">
        <Container>
          <h2 className="text-3xl font-bold mb-10">{t(`${copyKey}.workTitle`)}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {work.map((item) => (
              <article key={item.title} className="p-6 rounded-2xl border border-black/10 dark:border-white/10">
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{item.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <h2 className="text-3xl font-bold mb-8">{t('services.label')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capabilities.map((service) => (
              <Link
                key={service.id}
                to={servicePath(service.id, locale)}
                className="p-6 rounded-2xl border border-black/10 dark:border-white/10 hover:border-brand-primary/40"
              >
                <h3 className="text-xl font-bold mb-2">{t(`services_data.${service.id}.title`)}</h3>
                <p className="text-text-secondary text-sm">{t(`services_data.${service.id}.description`)}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 bg-bg-secondary">
        <Container className="max-w-3xl space-y-10">
          <div>
            <h2 className="text-3xl font-bold mb-4">{t(`${copyKey}.approachTitle`)}</h2>
            <p className="text-text-secondary leading-relaxed">{t(`${copyKey}.approach`)}</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">{t(`${copyKey}.qualityTitle`)}</h2>
            <p className="text-text-secondary leading-relaxed">{t(`${copyKey}.quality`)}</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">{t(`${copyKey}.deliveryTitle`)}</h2>
            <p className="text-text-secondary leading-relaxed">{t(`${copyKey}.delivery`)}</p>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="max-w-3xl">
          <h2 className="text-3xl font-bold mb-8">{t(`${copyKey}.faqTitle`)}</h2>
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

      <section className="py-20 bg-bg-secondary">
        <Container className="max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">{t(`${copyKey}.ctaTitle`)}</h2>
          <p className="text-text-secondary mb-8">{t(`${copyKey}.ctaBody`)}</p>
          <Link to={contactPath(locale)} onClick={() => track('service_cta', { routeId, source: 'cta' })}>
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

export function SoftwareDevelopmentPage() {
  return (
    <PillarPage
      routeId="software"
      copyKey="softwarePage"
      serviceIds={Object.entries(SERVICE_PILLAR).filter(([, pillar]) => pillar === 'software').map(([id]) => id)}
    />
  );
}

export function DataAiEngineeringPage() {
  return (
    <PillarPage
      routeId="dataAi"
      copyKey="dataPage"
      serviceIds={Object.entries(SERVICE_PILLAR).filter(([, pillar]) => pillar === 'dataAi').map(([id]) => id)}
    />
  );
}

export function IntegrationsPage() {
  return (
    <PillarPage
      routeId="integrations"
      copyKey="integrationsPage"
      serviceIds={Object.entries(SERVICE_PILLAR).filter(([, pillar]) => pillar === 'integrations').map(([id]) => id)}
    />
  );
}
