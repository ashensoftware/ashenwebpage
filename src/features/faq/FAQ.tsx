import React from 'react';
import { useTranslation } from 'react-i18next';
import { Section } from '../../components/ui/Section';
import { Accordion } from '../../components/ui/Accordion';
import { Typography } from '../../components/ui/Typography';
import { motion } from 'framer-motion';

export const FAQ: React.FC = () => {
    const { t } = useTranslation();

    const faqItems = [
        {
            title: t('faq.q1', 'What services do you offer?'),
            content: t('faq.a1', 'We offer a wide range of software development services including web, mobile, and AI solutions.')
        },
        {
            title: t('faq.q2', 'How does the process work?'),
            content: t('faq.a2', 'Our process involves discovery, design, development, testing, and deployment.')
        },
        {
            title: t('faq.q3', 'Do you provide support?'),
            content: t('faq.a3', 'Yes, we provide ongoing support and maintenance for all our projects.')
        },
        {
            title: t('faq.q4', 'What technologies do you use?'),
            content: t('faq.a4', 'We use modern technologies like React, Node.js, Python, and cloud services.')
        },
        {
            title: t('faq.q5', 'Can you sign a NDA?'),
            content: t('faq.a5', 'Absolutely, we respect your privacy and intellectual property.')
        }
    ];

    return (
        <Section id="faq" className="bg-bg-primary relative py-0 overflow-hidden" fullWidth>
            {/* Smooth Top Transition Mask */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-bg-primary to-transparent z-10" />

            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[70vh] relative z-20">
                {/* Questions Content - Left Side */}
                <div className="relative order-2 lg:order-1 flex items-center justify-center lg:justify-end py-24 px-6 lg:pl-0 lg:pr-16 lg:col-span-7">
                    <div className="w-full max-w-3xl">
                        <Accordion items={faqItems} />
                    </div>
                </div>

                {/* Title Content - Right Side */}
                <div className="relative order-1 lg:order-2 flex items-center justify-center lg:justify-start py-24 px-6 lg:pr-0 lg:pl-16 bg-bg-secondary/30 lg:col-span-5">
                    {/* Background Decorative Element */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative z-10 text-center lg:text-left"
                    >
                        <div className="inline-block px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-6">
                            <Typography variant="small" className="uppercase tracking-[0.2em] text-brand-primary font-bold">
                                {t('faq.label', 'Questions')}
                            </Typography>
                        </div>
                        <Typography variant="h2" className="mb-6">
                            {t('faq.title', 'Frequently Asked Questions')}
                        </Typography>
                        <Typography variant="lead" className="max-w-md text-text-secondary/80">
                            {t('faq.subtitle', 'Everything you need to know about our process and how we can help your business grow.')}
                        </Typography>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Smooth Transition Mask */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-bg-primary to-transparent z-10" />
        </Section>
    );
};
