import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { SERVICE_PILLARS } from '@/content/pillars';
import { pathFor } from '@/config/routes';
import { useLocale, useT } from '@/hooks/useLocale';

export const PillarsSection: React.FC = () => {
  const t = useT();
  const locale = useLocale();
  const [lead, ...rest] = SERVICE_PILLARS;

  return (
    <section id="services" className="section-wash border-b border-[var(--color-line)] py-16 md:py-24">
      <Container>
        <div className="mb-10 max-w-3xl">
          <p className="eyebrow mb-3">{t('pillars.label')}</p>
          <h2 className="font-display text-4xl font-medium md:text-5xl">{t('pillars.title')}</h2>
          <p className="mt-4 text-lg text-[var(--color-text-secondary)]">{t('pillars.subtitle')}</p>
        </div>

        <Link
          to={pathFor(lead.routeId, locale)}
          className="glass-card group grid gap-8 p-6 md:p-8 lg:grid-cols-12"
        >
          <div className="lg:col-span-7">
            <p className="font-mono text-xs text-[var(--color-accent-primary)]">01 — {t('pillars.learn')}</p>
            <h3 className="mt-3 font-display text-3xl font-medium md:text-4xl">{t(`pillars.${lead.id}.title`)}</h3>
            <p className="mt-4 max-w-xl text-[var(--color-text-secondary)] leading-relaxed">
              {t(`pillars.${lead.id}.description`)}
            </p>
          </div>
          <div className="relative min-h-48 overflow-hidden rounded-2xl border border-[var(--glass-border)] bg-[radial-gradient(circle_at_30%_30%,rgba(139,92,246,0.55),transparent_55%),radial-gradient(circle_at_72%_68%,rgba(217,70,239,0.45),transparent_48%)] lg:col-span-5" aria-hidden="true">
            <span className="absolute left-[22%] top-[28%] h-3 w-3 rounded-full bg-white shadow-[0_0_18px_#d946ef]" />
            <span className="absolute left-[48%] top-[46%] h-2 w-2 rounded-full bg-[#d946ef]" />
            <span className="absolute left-[68%] top-[30%] h-2.5 w-2.5 rounded-full bg-[#c4b5fd]" />
            <span className="absolute left-[34%] top-[62%] h-2 w-2 rounded-full bg-[#8b5cf6]" />
          </div>
        </Link>

        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {rest.map((pillar, index) => (
            <Link
              key={pillar.id}
              to={pathFor(pillar.routeId, locale)}
              className="glass-card flex flex-col justify-between p-5"
            >
              <div>
                <h3 className="font-display text-2xl font-medium">{t(`pillars.${pillar.id}.title`)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {t(`pillars.${pillar.id}.description`)}
                </p>
              </div>
              <p className="mt-6 font-display text-4xl font-semibold text-gradient">0{index + 2}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};
