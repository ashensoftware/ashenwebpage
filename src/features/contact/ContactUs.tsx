import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Section } from '../../components/ui/Section';
import { Button } from '../../components/ui/Button';
import { Container } from '../../components/ui/Container';
import { Typography } from '../../components/ui/Typography';
import { useTranslation } from 'react-i18next';
import { Linkedin, Instagram } from 'lucide-react';

export const ContactUs: React.FC = () => {
    const { t } = useTranslation();
    const [formState, setFormState] = useState({
        name: '',
        project: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Gracias por tu interés. Nos pondremos en contacto pronto.');
    };

    const InputGroup = ({ label, name, type = "text", placeholder, required = false }: any) => (
        <div className="flex flex-col gap-2">
            <label className="text-sm text-text-secondary font-medium">{label}</label>
            <input
                type={type}
                name={name}
                value={(formState as any)[name]}
                onChange={handleChange}
                className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg px-4 py-3 text-[var(--color-text-primary)] dark:text-white placeholder-text-muted focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 transition-all"
                placeholder={placeholder}
                required={required}
            />
        </div>
    );

    return (
        <Section id="contact-us" className="bg-bg-secondary relative py-0" fullWidth>
            {/* Smooth Top Transition Mask */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-bg-primary to-transparent z-10" />

            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
                {/* Text Content - Left Side */}
                <div className="relative flex items-center justify-center lg:justify-end py-24 px-6 lg:px-12">
                    <Container className="relative z-10 w-full max-w-xl mx-auto lg:mx-0">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="lg:text-right"
                        >
                            <div className="inline-block p-4 rounded-2xl bg-brand-primary/10 mb-8 border border-brand-primary/20">
                                <span className="text-4xl">👋</span>
                            </div>

                            <Typography variant="h2" className="mb-6">
                                {t('contact-title', "Let's Build Something Amazing")}
                            </Typography>

                            <Typography variant="lead" className="mb-8 text-text-secondary/80">
                                {t('contact-description', "Ready to transform your business? Send us a message and let's discuss your project.")}
                            </Typography>

                            <div className="flex gap-4 justify-center lg:justify-end">
                                <a href="https://www.linkedin.com/company/ashen-software" target="_blank" rel="noopener noreferrer"
                                    className="p-3 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all duration-300">
                                    <Linkedin size={24} />
                                </a>
                                <a href="https://www.instagram.com/ashensoftware" target="_blank" rel="noopener noreferrer"
                                    className="p-3 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:bg-brand-secondary hover:text-white hover:border-brand-secondary transition-all duration-300">
                                    <Instagram size={24} />
                                </a>
                            </div>
                        </motion.div>
                    </Container>
                </div>

                {/* Form Content - Right Side Edge-to-Edgeish */}
                <div className="relative flex items-center justify-center lg:justify-start py-24 px-6 lg:px-12 bg-bg-primary/20">
                    {/* Decorative Background for Form area */}
                    <div className="absolute inset-0 bg-brand-primary/5 blur-[120px] rounded-full -z-10" />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="glass-card p-8 lg:p-12 rounded-2xl w-full max-w-xl border-black/5 dark:border-white/5 shadow-2xl relative z-10"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputGroup label={t('contact-name-label', 'Name')} name="name" placeholder="John Doe" required />
                                <InputGroup label={t('contact-project-label', 'Project Type')} name="project" placeholder="Web App, Mobile, AI..." />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputGroup label={t('contact-phone-label', 'Phone')} name="phone" type="tel" placeholder="+1 234 567 890" required />
                                <InputGroup label={t('contact-email-label', 'Email')} name="email" type="email" placeholder="john@example.com" required />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-text-secondary font-medium">{t('contact-message-label', 'Message')}</label>
                                <textarea
                                    name="message"
                                    value={formState.message}
                                    onChange={handleChange}
                                    className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg px-4 py-3 text-[var(--color-text-primary)] dark:text-white placeholder-text-muted focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 transition-all min-h-[120px] resize-none"
                                    placeholder={t('contact-message-placeholder', 'Tell us about your project...')}
                                    required
                                />
                            </div>

                            <Button type="submit" size="lg" variant="primary" className="w-full py-4 text-lg font-bold bg-gradient-to-r from-brand-primary to-brand-secondary hover:opacity-90 shadow-lg shadow-brand-primary/20">
                                {t('contact-button', 'Send Message')}
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Smooth Transition to Footer */}
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-bg-secondary to-transparent z-20 pointer-events-none" />
        </Section>
    )
}
