import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Bot, ChevronDown, Code, Database, Menu, Moon, Sun, Workflow, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/hooks/useTheme';
import { useLocale, useT } from '@/hooks/useLocale';
import { alternatePath, contactPath, pathFor } from '@/config/routes';
import { SERVICE_PILLARS } from '@/content/pillars';
import { FlagEN, FlagES } from '@/components/icons/BrandIcons';

const PILLAR_ICONS = {
  bot: Bot,
  code: Code,
  database: Database,
  workflow: Workflow,
};

export const Navbar: React.FC = () => {
  const t = useT();
  const { theme, toggleTheme } = useTheme();
  const locale = useLocale();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);

  const openServices = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };

  const scheduleCloseServices = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setServicesOpen(false), 180);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileMenuOpen]);

  const switchLocale = () => {
    navigate(alternatePath(location.pathname, locale === 'en' ? 'es' : 'en'));
  };

  const navLinks = [
    { name: t('nav.work'), href: pathFor('caseStudies', locale) },
    { name: t('nav.about'), href: pathFor('about', locale) },
    { name: t('nav.contact'), href: contactPath(locale) },
  ];

  return (
    <header className="fixed top-2 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-0">
      <div
        className={`mx-auto max-w-6xl rounded-2xl transition-all duration-300 ${
          scrolled
            ? 'bg-bg-primary/80 backdrop-blur-xl border border-[var(--glass-border)] shadow-lg py-2 px-6'
            : 'bg-transparent py-2 px-4'
        }`}
      >
        <div className="flex items-center justify-between">
          <Link to={pathFor('home', locale)} className="z-50 relative flex items-center">
            <img
              src={theme === 'dark' ? '/assets/logo/Logo-Iso-Horizontal.png' : '/assets/logo/Logo-Iso-Horizontal-black.png'}
              alt="Ashen Software"
              className="h-8 md:h-9 w-auto hover:opacity-80 transition-opacity"
              width="137"
              height="45"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
            <div
              className="relative"
              onMouseEnter={openServices}
              onMouseLeave={scheduleCloseServices}
            >
              <Link
                to={`${pathFor('home', locale)}#services`}
                className="text-sm font-medium px-4 py-2 rounded-full text-text-secondary hover:text-[var(--color-text-primary)] flex items-center gap-1"
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                onFocus={openServices}
              >
                {t('nav.services')}
                <ChevronDown size={14} className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </Link>
              <div
                className={`absolute top-full left-0 pt-3 w-[min(28rem,calc(100vw-2rem))] z-50 transition-all duration-200 ${
                  servicesOpen
                    ? 'opacity-100 translate-y-0 pointer-events-auto visible'
                    : 'opacity-0 -translate-y-1 pointer-events-none invisible'
                }`}
                onMouseEnter={openServices}
                onMouseLeave={scheduleCloseServices}
              >
                <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--color-bg-secondary)]/95 backdrop-blur-2xl shadow-2xl p-2">
                  {SERVICE_PILLARS.map((pillar) => {
                    const Icon = PILLAR_ICONS[pillar.icon];
                    return (
                      <Link
                        key={pillar.id}
                        to={pathFor(pillar.routeId, locale)}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-[var(--glass-bg)] transition-colors"
                      >
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                          <Icon size={18} />
                        </span>
                        <span>
                          <span className="block font-bold text-[var(--color-text-primary)] text-sm">
                            {t(`pillars.${pillar.id}.title`)}
                          </span>
                          <span className="block text-xs text-text-secondary leading-relaxed mt-1">
                            {t(`pillars.${pillar.id}.description`)}
                          </span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-medium px-4 py-2 rounded-full text-text-secondary hover:text-[var(--color-text-primary)]"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] text-text-secondary"
              aria-label={t('a11y.theme')}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={switchLocale}
              className="flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold tracking-wider rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] text-text-secondary uppercase"
              aria-label={t('a11y.language')}
            >
              <span className={`inline-flex items-center gap-1.5 ${locale === 'es' ? 'text-brand-primary' : 'opacity-50'}`}>
                <FlagES size={14} />
                ES
              </span>
              <span className="opacity-30">/</span>
              <span className={`inline-flex items-center gap-1.5 ${locale === 'en' ? 'text-brand-primary' : 'opacity-50'}`}>
                <FlagEN size={14} />
                EN
              </span>
            </button>
            <Link to={contactPath(locale)}>
              <Button variant="primary" size="sm" className="rounded-xl px-5">
                {t('nav.cta')} <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden text-[var(--color-text-primary)] z-50 p-2 bg-[var(--glass-bg)] rounded-lg"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? t('a11y.closeMenu') : t('a11y.menu')}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="absolute top-full left-4 right-4 mt-2 bg-bg-secondary/95 backdrop-blur-2xl rounded-2xl border border-[var(--glass-border)] shadow-2xl md:hidden p-6 flex flex-col gap-5"
          >
            <nav className="flex flex-col gap-3" aria-label="Mobile">
              <button
                className="text-left text-xl font-bold text-[var(--color-text-primary)] flex items-center justify-between"
                onClick={() => setServicesOpen((open) => !open)}
                aria-expanded={servicesOpen}
              >
                {t('nav.services')}
                <ChevronDown size={18} className={servicesOpen ? 'rotate-180' : ''} />
              </button>
              {servicesOpen &&
                SERVICE_PILLARS.map((pillar) => {
                  const Icon = PILLAR_ICONS[pillar.icon];
                  return (
                    <Link
                      key={pillar.id}
                      to={pathFor(pillar.routeId, locale)}
                      className="pl-1 text-text-secondary flex items-center gap-2"
                    >
                      <Icon size={16} className="text-brand-primary" />
                      {t(`pillars.${pillar.id}.title`)}
                    </Link>
                  );
                })}
              {navLinks.map((link) => (
                <Link key={link.name} to={link.href} className="text-xl font-bold text-[var(--color-text-primary)]">
                  {link.name}
                </Link>
              ))}
            </nav>
            <button onClick={switchLocale} className="text-sm text-text-secondary text-left inline-flex items-center gap-2">
              {locale === 'en' ? <FlagES size={16} /> : <FlagEN size={16} />}
              {locale === 'en' ? 'Español' : 'English'}
            </button>
            <Link to={contactPath(locale)}>
              <Button variant="primary" className="w-full justify-between">
                {t('nav.cta')}
                <ArrowRight size={18} />
              </Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
