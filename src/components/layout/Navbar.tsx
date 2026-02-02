
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export const Navbar: React.FC = () => {
    const { t, i18n } = useTranslation();
    const { theme, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'es' : 'en';
        i18n.changeLanguage(newLang);
    };

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('/#')) {
            const id = href.split('#')[1];
            const element = document.getElementById(id);
            if (element) {
                e.preventDefault();
                element.scrollIntoView({ behavior: 'smooth' });
                window.history.pushState(null, '', href);
            }
        }
        setMobileMenuOpen(false);
    };

    const navLinks = [
        { name: t('nav.services', 'Services'), href: '/#services' },
        { name: t('nav.about', 'About'), href: '/about' },
        { name: t('nav.contact', 'Contact'), href: '/#contact' },
    ];

    return (
        <header
            className={`fixed top-4 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-0`}
        >
            <div className={`mx-auto max-w-6xl rounded-2xl transition-all duration-300 ${scrolled
                ? 'bg-bg-primary/80 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-lg py-3 px-6'
                : 'bg-transparent py-4 px-4'
                }`}>
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="z-50 relative flex items-center">
                        <img
                            src={theme === 'dark' ? "/assets/logo/Logo-Iso-Horizontal.png" : "/assets/logo/Logo-Iso-Horizontal-black.png"}
                            alt="ASHEN Logo"
                            className="h-8 md:h-9 w-auto hover:opacity-80 transition-opacity"
                            width="137"
                            height="45"
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <div key={link.name} className="relative group">
                                <Link
                                    to={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className={`text-sm font-medium px-4 py-2 rounded-full transition-all relative z-10 ${location.pathname === link.href || location.hash === link.href.split('/')[1]
                                        ? 'text-[var(--color-text-primary)]'
                                        : 'text-text-secondary hover:text-[var(--color-text-primary)]'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                                <span className="absolute inset-0 bg-black/5 dark:bg-white/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-200 ease-out -z-0" />
                            </div>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-text-secondary hover:text-[var(--color-text-primary)] dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-all font-outfit"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        {/* Language Toggle */}
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold tracking-wider rounded-lg bg-white/5 border border-white/10 text-text-secondary hover:text-white hover:bg-white/10 transition-all uppercase"
                            aria-label="Toggle Language"
                        >
                            <span className={i18n.language === 'es' ? 'text-brand-primary' : ''}>ES</span>
                            <span className="opacity-30">/</span>
                            <span className={i18n.language === 'en' ? 'text-brand-primary' : ''}>EN</span>
                        </button>

                        <a href="https://wa.me/573105602568" target="_blank" rel="noopener noreferrer">
                            <Button variant="primary" size="sm" className="rounded-xl px-5 shadow-brand-glow">
                                {t('nav.cta', 'Agendar Demo')} <ArrowRight size={16} className="ml-2" />
                            </Button>
                        </a>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden text-[var(--color-text-primary)] z-50 p-2 bg-black/5 dark:bg-white/10 rounded-lg hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-4 right-4 mt-2 bg-bg-secondary/95 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden md:hidden p-6 flex flex-col gap-6"
                    >
                        <nav className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className="text-xl font-bold text-white hover:text-brand-primary transition-colors flex items-center justify-between group"
                                >
                                    {link.name}
                                    <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand-primary" />
                                </Link>
                            ))}
                        </nav>

                        <div className="h-px w-full bg-white/10" />

                        <div className="flex flex-col gap-4">
                            <button
                                onClick={toggleLanguage}
                                className="flex items-center gap-2 text-text-secondary hover:text-white"
                            >
                                <span className="bg-white/10 p-2 rounded-lg text-xs font-bold">
                                    {i18n.language.toUpperCase()}
                                </span>
                                <span className="text-sm">Cambiar Idioma</span>
                            </button>

                            <a href="https://wa.me/573105602568" target="_blank" rel="noopener noreferrer">
                                <Button variant="primary" className="w-full justify-between group">
                                    {t('nav.cta', 'Start Project')}
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};
