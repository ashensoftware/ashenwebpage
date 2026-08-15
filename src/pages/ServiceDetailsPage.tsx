import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle, Code } from 'lucide-react';
import { getRelatedServices, getServiceById } from '@/core/constants/ashenServices';
import { SEO } from '@/components/SEO';
import { breadcrumbJsonLd } from '@/config/schema';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { ServiceHeroBackdrop } from '@/components/ui/ServiceHeroBackdrop';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { contactPath, pathFor, servicePath } from '@/config/routes';
import { useLocale, useT } from '@/hooks/useLocale';
import { track } from '@/config/analytics';

export const ServiceDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const t = useT();
  const locale = useLocale();
  const service = getServiceById(id || '');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!service) {
    return <NotFoundPage />;
  }

  const title = t(`services_data.${service.id}.title`, service.title);
  const description = t(`services_data.${service.id}.description`, service.description);
  const featuresRaw = t(`services_data.${service.id}.features`, { returnObjects: true });
  const features = Array.isArray(featuresRaw) ? featuresRaw : service.features;

  return (
    <div className="min-h-screen bg-bg-primary overflow-x-hidden text-[var(--color-text-primary)]">
      <SEO
        title={`${title} | Ashen Software`}
        description={description}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: title,
            description,
            provider: { '@type': 'Organization', name: 'Ashen Software' },
          },
          breadcrumbJsonLd([
            { name: 'Ashen Software', path: pathFor('home', locale) },
            { name: title, path: servicePath(service.id, locale) },
          ]),
        ]}
      />

      <section className="relative min-h-[70vh] flex items-center pt-28 pb-20 md:pt-32 md:pb-28 overflow-hidden">
        <ServiceHeroBackdrop src={service.image} />
        <Container className="relative z-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
            <Link to={`${pathFor('home', locale)}#services`} className="inline-flex items-center gap-2 text-text-secondary hover:text-brand-primary">
              <ArrowLeft size={20} />
              <span>{t('services.back')}</span>
            </Link>
          </motion.div>

          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">{title}</h1>
            <p className="text-xl text-text-secondary mb-8 leading-relaxed">{description}</p>
            <Link to={contactPath(locale)} onClick={() => track('service_cta', { service: service.id })}>
              <Button variant="primary" size="lg">{t('services.cta')}</Button>
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-20 bg-black/20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <CheckCircle className="text-brand-primary" />
                  {t('services.features-label')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {features.map((feature: string) => (
                    <div key={feature} className="flex items-start gap-3 p-4 rounded-xl bg-white/5">
                      <div className="w-2 h-2 rounded-full bg-brand-primary mt-2" />
                      <span className="text-text-secondary">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Code className="text-purple-400" />
                  {t('services.tech-label')}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {service.technologies.map((tech) => (
                    <span key={tech} className="px-4 py-2 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="md:col-span-1">
              <div className="sticky top-24 bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 rounded-3xl p-8">
                <h2 className="text-xl font-bold mb-3">{t('services.delivery-label')}</h2>
                <p className="text-sm text-text-secondary mb-8">{t('services.delivery-body')}</p>
                <Link to={contactPath(locale)} className="block" onClick={() => track('service_cta', { service: service.id, source: 'sidebar' })}>
                  <Button variant="primary" className="w-full justify-center">{t('services.cta')}</Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 border-t border-white/5">
        <Container>
          <h2 className="text-3xl font-bold mb-12">{t('services.related')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getRelatedServices(service.id).map((related) => (
              <Link
                key={related.id}
                to={servicePath(related.id, locale)}
                className="group bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.05] block"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                    <Code size={24} />
                  </div>
                  <ArrowRight size={20} className="text-white/20 group-hover:text-brand-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{t(`services_data.${related.id}.title`, related.title)}</h3>
                <p className="text-sm text-text-secondary line-clamp-2">{t(`services_data.${related.id}.description`, related.description)}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
};
