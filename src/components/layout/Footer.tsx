import React from 'react';
import { Link } from 'react-router-dom';
import { useLocale, useT } from '@/hooks/useLocale';
import { Github, Instagram, Linkedin } from 'lucide-react';
import { WhatsAppIcon } from '@/components/icons/BrandIcons';
import { Container } from '@/components/ui/Container';
import { Typography } from '@/components/ui/Typography';
import { useTheme } from '@/hooks/useTheme';
import { COMPANY } from '@/config/company';
import { contactPath, pathFor } from '@/config/routes';
import { track } from '@/config/analytics';

export const Footer: React.FC = () => {
  const t = useT();
  const { theme } = useTheme();
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-bg-secondary)] py-16">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <img
              src={theme === 'dark' ? '/assets/logo/Logo-Iso-Horizontal.png' : '/assets/logo/Logo-Iso-Horizontal-black.png'}
              alt="Ashen Software"
              className="h-10 w-auto object-contain self-start"
              width="137"
              height="45"
            />
            <Typography className="max-w-sm text-text-secondary leading-relaxed">
              {t('footer.description')}
            </Typography>
            <div className="flex items-center gap-4">
              {[
                { icon: Github, href: COMPANY.social.github, label: 'GitHub' },
                { icon: Linkedin, href: COMPANY.social.linkedin, label: 'LinkedIn' },
                { icon: Instagram, href: COMPANY.social.instagram, label: 'Instagram' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 min-w-11 items-center justify-center border border-[var(--color-line-strong)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary)]"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h2 className="mb-6 font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)]">{t('footer.company')}</h2>
              <ul className="space-y-4">
                <li><Link to={`${pathFor('home', locale)}#services`} className="text-text-secondary hover:text-brand-primary text-sm">{t('footer.services')}</Link></li>
                <li><Link to={pathFor('about', locale)} className="text-text-secondary hover:text-brand-primary text-sm">{t('footer.about')}</Link></li>
                <li><Link to={pathFor('caseStudies', locale)} className="text-text-secondary hover:text-brand-primary text-sm">{t('footer.work')}</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)]">{t('footer.legal')}</h2>
              <ul className="space-y-4">
                <li><Link to={pathFor('privacy', locale)} className="text-text-secondary hover:text-brand-primary text-sm">{t('footer.privacy')}</Link></li>
                <li><Link to={pathFor('terms', locale)} className="text-text-secondary hover:text-brand-primary text-sm">{t('footer.terms')}</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)]">{t('footer.contact')}</h2>
              <ul className="space-y-4">
                <li>
                  <a href={`mailto:${COMPANY.email}`} className="text-text-secondary hover:text-brand-primary text-sm block">
                    {COMPANY.email}
                  </a>
                </li>
                <li>
                  <a href={`tel:${COMPANY.phoneE164}`} className="text-text-secondary hover:text-brand-primary text-sm">
                    {COMPANY.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={COMPANY.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track('whatsapp_click', { source: 'footer' })}
                    className="text-text-secondary hover:text-brand-primary text-sm inline-flex items-center gap-2"
                  >
                    <WhatsAppIcon size={16} />
                    WhatsApp
                  </a>
                </li>
                <li>
                  <Link to={contactPath(locale)} className="text-text-secondary hover:text-brand-primary text-sm">
                    {t('cta.startProject')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-[var(--color-line)] pt-8 text-xs text-[var(--color-text-muted)] md:flex-row">
          <p>{t('footer.copyright', { year })}</p>
          <p>{t('footer.tagline')}</p>
        </div>
      </Container>
    </footer>
  );
};
