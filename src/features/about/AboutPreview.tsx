import React from 'react';
import { useTranslation } from 'react-i18next';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';

export const AboutPreview: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Section id="about-preview" className="bg-bg-secondary py-0 relative overflow-hidden" fullWidth>
            {/* Smooth Top Transition Mask (from previous section) */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-bg-primary/20 to-transparent z-10" />

            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[70vh]">
                {/* Visual Content - Left Side Edge-to-Edge */}
                <div className="relative order-2 lg:order-1 h-[60vh] lg:h-auto overflow-hidden group lg:col-span-7">
                    <div className="absolute inset-0 bg-brand-primary/10 mix-blend-overlay z-10" />
                    <div className="absolute inset-0 bg-gradient-to-l from-bg-secondary via-transparent to-transparent z-20" />
                    <img
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070"
                        alt="Team collaboration"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                </div>

                {/* Text Content - Right Side */}
                <div className="relative order-1 lg:order-2 flex items-center justify-center lg:justify-start py-24 px-6 lg:pr-0 lg:pl-16 bg-bg-secondary lg:col-span-5">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />

                    <Container className="w-full max-w-2xl mx-auto lg:mx-0">
                        <Typography variant="small" className="uppercase tracking-widest text-brand-primary font-bold mb-4">
                            {t('about.label', 'Who We Are')}
                        </Typography>
                        <Typography variant="h2" className="mb-6 relative z-10">
                            {t('about.title', 'More Than Just Code')}
                        </Typography>
                        <Typography variant="lead" className="mb-8 relative z-10">
                            {t('about.subtitle', 'We are a collective of visionaries, engineers, and creatives dedicated to building the future.')}
                        </Typography>

                        <Typography className="mb-8 text-text-secondary/80 leading-relaxed relative z-10">
                            {t('about.description', 'At Ashen Software, we believe in the power of technology to transform lives and businesses. Our culture is built on innovation, transparency, and a relentless pursuit of excellence.')}
                        </Typography>

                        <Link to="/about" className="relative z-10 inline-block pointer-events-auto">
                            <Button variant="outline" size="lg" className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white">
                                {t('about.cta', 'Meet the Team')}
                            </Button>
                        </Link>
                    </Container>
                </div>
            </div>
            {/* Bottom Smooth Transition */}
            <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-bg-primary to-transparent z-20 pointer-events-none" />
        </Section>
    );
};
