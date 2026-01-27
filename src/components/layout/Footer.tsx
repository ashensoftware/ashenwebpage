import React from 'react';
import { Container } from '@/components/ui/Container';
import { Typography } from '@/components/ui/Typography';
import { useTranslation } from 'react-i18next';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export const Footer: React.FC = () => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-bg-secondary border-t border-black/5 dark:border-white/10 pt-24 pb-12 relative z-10 shadow-[0_-20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        <img
                            src={theme === 'dark' ? "/assets/logo/Logo-Iso-Horizontal.png" : "/assets/logo/Logo-Iso-Horizontal-black.png"}
                            alt="ASHEN Logo"
                            className="h-10 w-auto object-contain self-start"
                        />
                        <Typography className="max-w-sm text-text-secondary leading-relaxed">
                            {t('footer.description', 'We build technology that trascends. Premium software architecture and digital solutions.')}
                        </Typography>

                        {/* Socials */}
                        <div className="flex items-center gap-4 mt-2">
                            {[
                                { icon: Github, href: "https://github.com/ashen-software", label: "GitHub" },
                                { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                                { icon: Linkedin, href: "https://linkedin.com/company/ashen-software", label: "LinkedIn" }
                            ].map((Social, index) => (
                                <a
                                    key={index}
                                    href={Social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-text-muted hover:text-white hover:bg-brand-primary hover:border-brand-primary transition-all duration-300"
                                    aria-label={Social.label}
                                >
                                    <Social.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
                        <div>
                            <Typography variant="h4" className="mb-6 font-bold">{t('footer.company', 'Company')}</Typography>
                            <ul className="space-y-4">
                                <li><a href="#services" className="text-text-secondary hover:text-brand-primary transition-colors text-sm">{t('footer.services', 'Services')}</a></li>
                                <li><a href="/about" className="text-text-secondary hover:text-brand-primary transition-colors text-sm">{t('footer.about', 'About Us')}</a></li>
                                <li><a href="#work" className="text-text-secondary hover:text-brand-primary transition-colors text-sm">{t('footer.work', 'Our Work')}</a></li>
                            </ul>
                        </div>

                        <div>
                            <Typography variant="h4" className="mb-6 font-bold">{t('footer.legal', 'Legal')}</Typography>
                            <ul className="space-y-4">
                                <li><a href="/privacy" className="text-text-secondary hover:text-brand-primary transition-colors text-sm">{t('footer.privacy', 'Privacy Policy')}</a></li>
                                <li><a href="/terms" className="text-text-secondary hover:text-brand-primary transition-colors text-sm">{t('footer.terms', 'Terms of Service')}</a></li>
                            </ul>
                        </div>

                        <div>
                            <Typography variant="h4" className="mb-6 font-bold">{t('footer.contact', 'Contact')}</Typography>
                            <ul className="space-y-4">
                                <li>
                                    <a href="mailto:contact@ashen.com" className="text-text-secondary hover:text-brand-primary transition-colors text-sm block">
                                        contact@ashen.com
                                    </a>
                                </li>
                                <li className="text-text-secondary text-sm">
                                    +57 310 560 2568
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted">
                    <p>{t('footer.copyright', '© {{year}} Ashen Software. All rights reserved.', { year: currentYear })}</p>
                    <p>{t('footer.tagline', 'Designed for Impact.')}</p>
                </div>
            </Container>
        </footer>
    );
};
