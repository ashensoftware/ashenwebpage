import React from 'react';
import { useT } from '@/hooks/useLocale';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Typography } from '@/components/ui/Typography';
import { motion } from 'framer-motion';
import { Building2, Rocket, Target, Users, Zap } from 'lucide-react';

export const ValueProposition: React.FC = () => {
    const t = useT();

    const values = [
        {
            icon: Rocket,
            title: t('values.innovation.title'),
            description: t('values.innovation.desc')
        },
        {
            icon: Target,
            title: t('values.precision.title'),
            description: t('values.precision.desc')
        },
        {
            icon: Users,
            title: t('values.partnership.title'),
            description: t('values.partnership.desc')
        },
        {
            icon: Zap,
            title: t('values.speed.title'),
            description: t('values.speed.desc')
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
                                {t('values.label')}
                            </Typography>
                            <Typography variant="h2" className="mb-6 leading-tight">
                                {t('values.heading')}
                            </Typography>
                            <Typography variant="lead" className="mb-8 text-text-secondary/80">
                                {t('values.subheading')}
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
                            src="/assets/placeholders/engineering.jpg"
                            alt=""
                            width={1200}
                            height={800}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover"
                        />

                        <div className="absolute bottom-12 left-12 lg:left-20 max-w-xs z-30 font-outfit">
                            <div className="glass p-6 rounded-xl border-l-4 border-brand-primary backdrop-blur-md bg-black/40 border border-white/10">
                                <Building2 size={22} className="text-brand-primary mb-3" />
                                <Typography variant="h4" className="mb-3 text-white">{t('values.heading')}</Typography>
                                <Typography variant="small" className="text-white/80 leading-relaxed">
                                    {t('values.subheading')}
                                </Typography>
                            </div>
                        </div>

                    </motion.div>
                </div>
            </div>

        </Section>
    );
};
