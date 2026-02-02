import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Code, DollarSign, ArrowRight } from 'lucide-react';
import { getServiceById, getRelatedServices } from '@/core/constants/ashenServices';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { BackgroundPaths } from '@/features/animations/BackgroundPaths';

export const ServiceDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation();
    const service = getServiceById(id || '');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bg-primary text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
                    <Link to="/#services" className="text-brand-primary hover:underline">
                        Return to Services
                    </Link>
                </div>
            </div>
        );
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
                url={`https://ashensoftware.com/services/${service.id}`}
                image={service.image}
            />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
                <BackgroundPaths className="absolute inset-0 h-full opacity-30" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/10 blur-[100px] rounded-full pointer-events-none" />

                <Container className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <Link to="/#services" className="inline-flex items-center gap-2 text-text-secondary hover:text-brand-primary transition-colors">
                            <ArrowLeft size={20} />
                            <span>{t('services.back', 'Back to Services')}</span>
                        </Link>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                                {title}
                            </h1>
                            <p className="text-xl text-text-secondary mb-8 leading-relaxed">
                                {description}
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <a href="https://wa.me/573105602568" target="_blank" rel="noopener noreferrer">
                                    <Button variant="primary" size="lg" className="rounded-xl shadow-brand-glow">
                                        {t('services.cta', 'Get a Quote')}
                                    </Button>
                                </a>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl relative aspect-video">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent" />
                            </div>
                        </motion.div>
                    </div>
                </Container>
            </section>

            {/* Details Section */}
            <section className="py-20 bg-black/20">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Features */}
                        <div className="md:col-span-2 space-y-8">
                            <div className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-3xl p-8">
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                    <CheckCircle className="text-brand-primary" />
                                    {t('services.features-label', 'Key Features')}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {features.map((feature: string, idx: number) => (
                                        <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                                            <div className="w-2 h-2 rounded-full bg-brand-primary mt-2" />
                                            <span className="text-text-secondary">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-3xl p-8">
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                    <Code className="text-purple-400" />
                                    {t('services.tech-label', 'Technologies')}
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {service.technologies.map((tech, idx) => (
                                        <span key={idx} className="px-4 py-2 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Pricing Card */}
                        <div className="md:col-span-1">
                            <div className="sticky top-24 bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                                <div className="w-12 h-12 rounded-xl bg-brand-primary/20 flex items-center justify-center mb-6 text-brand-primary">
                                    <DollarSign size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-text-secondary">
                                    {t('services.pricing-label', 'Estimated Investment')}
                                </h3>
                                {service.priceRange && (
                                    <div className="mb-6">
                                        <div className="text-3xl font-black text-white">
                                            {service.priceRange.currency} ${service.priceRange.min}
                                        </div>
                                        <div className="text-sm text-text-secondary mb-2">
                                            - ${service.priceRange.max}
                                        </div>
                                    </div>
                                )}

                                <p className="text-xs text-text-secondary mb-8 italic opacity-60">
                                    {t('services.pricing-disclaimer', '*Final price depends on project scope and requirements.')}
                                </p>

                                <a href="https://wa.me/573105602568" target="_blank" rel="noopener noreferrer" className="block">
                                    <Button variant="primary" className="w-full justify-center">
                                        {t('services.cta', 'Get a Quote')}
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Related Services Section */}
            <section className="py-20 border-t border-white/5">
                <Container>
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl font-bold">{t('services.related', 'You might also be interested in')}</h2>
                        <Link to="/#services" className="hidden md:flex items-center gap-2 text-brand-primary hover:text-white transition-colors">
                            {t('services.view-all', 'View All Services')} <ArrowRight size={20} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {getRelatedServices(service.id).map((related) => {
                            const relTitle = t(`services_data.${related.id}.title`, related.title);
                            const relDesc = t(`services_data.${related.id}.description`, related.description);

                            return (
                                <Link
                                    key={related.id}
                                    to={`/services/${related.id}`}
                                    className="group bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.05] transition-all hover:-translate-y-1 block"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors">
                                            <Code size={24} />
                                        </div>
                                        <ArrowRight size={20} className="text-white/20 group-hover:text-brand-primary -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-brand-primary transition-colors">{relTitle}</h3>
                                    <p className="text-sm text-text-secondary line-clamp-2">{relDesc}</p>
                                </Link>
                            );
                        })}
                    </div>

                    <div className="mt-8 text-center md:hidden">
                        <Link to="/#services" className="inline-flex items-center gap-2 text-brand-primary hover:text-white transition-colors">
                            {t('services.view-all', 'View All Services')} <ArrowRight size={20} />
                        </Link>
                    </div>
                </Container>
            </section>
        </div>
    );
};
