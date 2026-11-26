import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bot, ChevronDown, Code, Database, Menu, Moon, Sun, Workflow, X } from 'lucide-react';
import { buttonClass } from '@/components/ui/button-styles';
import { useTheme } from '@/hooks/useTheme';
import { useLocale, useT } from '@/hooks/useLocale';
import { contactPath, pathFor, servicePath } from '@/config/routes';
import { ASHEN_SERVICES } from '@/core/constants/ashenServices';
import { SERVICE_PILLARS } from '@/content/pillars';
import { LocaleSwitcher } from './LocaleSwitcher';

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
      if (event.key !== 'Escape') return;
      if (document.querySelector('[data-locale-open="true"]')) return;
      setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: t('nav.work'), href: pathFor('caseStudies', locale) },
    { name: t('nav.about'), href: pathFor('about', locale) },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--glass-border)] bg-[var(--nav-bg)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
        <Link to={pathFor('home', locale)} className="flex items-center">
          <img
            src={theme === 'dark' ? '/assets/logo/Logo-Iso-Horizontal.png' : '/assets/logo/Logo-Iso-Horizontal-black.png'}
            alt="Ashen Software"
            className="h-8 w-auto"
            width="137"
            height="45"
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          <div className="relative" onMouseEnter={openServices} onMouseLeave={scheduleCloseServices}>
            <Link
              to={`${pathFor('home', locale)}#services`}
              className="inline-flex min-h-11 cursor-pointer items-center gap-1 px-3 text-sm"
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              onFocus={openServices}
            >
              {t('nav.services')}
              <ChevronDown size={14} className={servicesOpen ? 'rotate-180' : ''} aria-hidden />
            </Link>
            <div
              className={`absolute left-0 top-full z-50 w-[min(36rem,calc(100vw-2rem))] pt-2 ${
                servicesOpen ? 'visible' : 'invisible pointer-events-none'
              }`}
              onMouseEnter={openServices}
              onMouseLeave={scheduleCloseServices}
            >
              <div className="max-h-[70vh] overflow-y-auto rounded-2xl border border-[var(--glass-border)] bg-[var(--color-bg-secondary)] p-3 shadow-2xl">
                {SERVICE_PILLARS.map((pillar) => {
                  const Icon = PILLAR_ICONS[pillar.icon];
                  return (
                    <Link key={pillar.id} to={pathFor(pillar.routeId, locale)} className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-2 hover:bg-[var(--glass-bg)] hover:text-[var(--color-accent-primary)]">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent-primary)]/15 text-[var(--color-accent-primary)]">
                        <Icon size={18} aria-hidden />
                      </span>
                      <span className="text-sm">{t(`pillars.${pillar.id}.title`)}</span>
                    </Link>
                  );
                })}
                <p className="mt-2 border-t border-[var(--color-line)] px-2 pt-3 font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">
                  {t('services.label')}
                </p>
                <div className="mt-1 grid grid-cols-2">
                  {ASHEN_SERVICES.map((service) => (
                    <Link
                      key={service.id}
                      to={servicePath(service.id, locale)}
                      className="px-2 py-1.5 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                    >
                      {t(`services_data.${service.id}.title`)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {navLinks.map((link) => (
            <Link key={link.name} to={link.href} className="inline-flex min-h-11 cursor-pointer items-center px-3 text-sm">
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <button type="button" onClick={toggleTheme} className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-lg border border-[var(--glass-border)] bg-[var(--color-bg-secondary)]" aria-label={t('a11y.theme')}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <LocaleSwitcher />
          <Link to={contactPath(locale)} className={buttonClass({ size: 'sm' })}>
            {t('nav.cta')}
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center md:hidden"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? t('a11y.closeMenu') : t('a11y.menu')}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileMenuOpen ? (
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-[var(--color-line)] bg-[var(--color-bg-secondary)] px-5 py-4 md:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            <button
              type="button"
              className="flex min-h-11 items-center justify-between text-left text-lg"
              onClick={() => setServicesOpen((open) => !open)}
              aria-expanded={servicesOpen}
            >
              {t('nav.services')}
              <ChevronDown size={16} className={servicesOpen ? 'rotate-180' : ''} />
            </button>
            {servicesOpen ? (
              <div className="mb-3 border-l border-[var(--color-line)] pl-3">
                {SERVICE_PILLARS.map((pillar) => (
                  <Link key={pillar.id} to={pathFor(pillar.routeId, locale)} className="flex min-h-11 items-center text-sm">
                    {t(`pillars.${pillar.id}.title`)}
                  </Link>
                ))}
                <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">{t('services.label')}</p>
                {ASHEN_SERVICES.map((service) => (
                  <Link key={service.id} to={servicePath(service.id, locale)} className="flex min-h-11 items-center text-sm text-[var(--color-text-secondary)]">
                    {t(`services_data.${service.id}.title`)}
                  </Link>
                ))}
              </div>
            ) : null}
            {navLinks.map((link) => (
              <Link key={link.name} to={link.href} className="flex min-h-11 items-center text-lg">
                {link.name}
              </Link>
            ))}
            <Link to={contactPath(locale)} className="flex min-h-11 items-center text-lg">
              {t('nav.contact')}
            </Link>
          </nav>
          <div className="mt-4 flex flex-col gap-3">
            <LocaleSwitcher variant="mobile" />
            <button type="button" onClick={toggleTheme} className="inline-flex min-h-11 cursor-pointer items-center gap-2 font-mono text-sm" aria-label={t('a11y.theme')}>
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
};
