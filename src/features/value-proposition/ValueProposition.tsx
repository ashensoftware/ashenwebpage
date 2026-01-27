import React from 'react';
import { useTranslation } from 'react-i18next';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Typography } from '@/components/ui/Typography';
import { motion } from 'framer-motion';
import { Rocket, Target, Users, Zap } from 'lucide-react';

export const ValueProposition: React.FC = () => {
    const { t } = useTranslation();

    const values = [
        {
            icon: Rocket,
            title: t('values.innovation.title', 'Innovation First'),
            description: t('values.innovation.desc', 'We stay ahead of the curve, implementing the latest technologies to give you a competitive edge.')
        },
        {
            icon: Target,
            title: t('values.precision.title', 'Engineering Precision'),
            description: t('values.precision.desc', 'Clean code, scalable architecture, and robust solutions that stand the test of time.')
        },
        {
            icon: Users,
            title: t('values.partnership.title', 'True Partnership'),
            description: t('values.partnership.desc', 'We work as an extension of your team, aligned with your goals and success.')
        },
        {
            icon: Zap,
            title: t('values.speed.title', 'Speed to Market'),
            description: t('values.speed.desc', 'Agile methodologies ensuring rapid delivery without compromising quality.')
        }
    ];

    return (
        <Section id="values" className="bg-bg-primary py-0 relative overflow-hidden" fullWidth>
            {/* Smooth Top Transition Mask */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-bg-primary to-transparent z-10" />

            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-dark/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-brand-secondary/10 to-transparent pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[70vh]">
                {/* Text Content - Left Side */}
                <div className="relative flex items-center justify-center lg:justify-end py-24 px-6 lg:pl-0 lg:pr-16 lg:col-span-5">
                    <Container className="w-full max-w-2xl mx-auto lg:mx-0 lg:mr-0">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <Typography variant="small" className="uppercase tracking-widest text-brand-primary font-bold mb-4">
                                {t('values.label', 'Why Ashen Software')}
                            </Typography>
                            <Typography variant="h2" className="mb-6 leading-tight">
                                {t('values.heading', 'Technology That Drives Business Results')}
                            </Typography>
                            <Typography variant="lead" className="mb-8 text-text-secondary/80">
                                {t('values.subheading', 'We combine technical expertise with business acumen to deliver solutions that matter.')}
                            </Typography>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                                {values.map((value, idx) => (
                                    <div key={idx} className="flex flex-col gap-3 group">
                                        <div className="p-3 bg-brand-primary/10 rounded-lg w-fit text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                                            <value.icon size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-[var(--color-text-primary)] font-bold text-lg mb-2">{value.title}</h3>
                                            <p className="text-text-secondary text-sm leading-relaxed opacity-80">{value.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </Container>
                </div>

                {/* Visual Content - Right Side Edge-to-Edge */}
                <div className="relative h-[60vh] lg:h-auto overflow-hidden lg:col-span-7">
                    <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0"
                    >
                        <div className="absolute inset-0 bg-brand-dark/40 mix-blend-multiply z-10" />
                        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-transparent to-transparent z-20" />

                        <img
                            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070"
                            alt="Technology Innovation"
                            className="w-full h-full object-cover"
                        />

                        {/* Stats Overlay */}
                        <div className="absolute bottom-12 left-12 lg:left-20 max-w-xs z-30 font-outfit">
                            <div className="glass p-6 rounded-xl border-l-4 border-brand-primary backdrop-blur-md bg-white/5 dark:bg-white/5 border border-black/5 dark:border-white/10">
                                <Typography variant="h3" className="mb-1 text-[var(--color-text-primary)]">{t('values.stats.projects.val', '100+')}</Typography>
                                <Typography variant="h4" className="mb-3 text-brand-accent">{t('values.stats.projects.label', 'Projects Delivered')}</Typography>
                                <Typography variant="small" className="text-text-secondary leading-relaxed">
                                    {t('values.stats.projects.desc', 'Helping startups and enterprises scale through technology.')}
                                </Typography>
                            </div>
                        </div>

                    </motion.div>
                </div>
            </div>

            {/* Bottom Smooth Transition */}
            <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-bg-secondary to-transparent z-20 pointer-events-none" />
        </Section>
    );
};
