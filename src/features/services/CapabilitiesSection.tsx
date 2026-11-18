import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { CAPABILITY_GROUPS } from '@/content/capabilities';
import { SERVICE_PILLARS } from '@/content/pillars';
import { pathFor, servicePath } from '@/config/routes';
import { useLocale, useT } from '@/hooks/useLocale';

export const CapabilitiesSection: React.FC = () => {
  const t = useT();
  const locale = useLocale();

  return (
    <section id="capabilities" className="border-b border-[var(--color-line)] py-16 md:py-24" aria-labelledby="capabilities-title">
      <Container>
        <div className="mb-10 grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-3">{t('services.label')}</p>
            <h2 id="capabilities-title" className="font-display text-4xl font-medium">
              {t('services.title')}
            </h2>
          </div>
          <p className="text-[var(--color-text-secondary)] lg:col-span-5 lg:pt-8">{t('services.secondaryNote')}</p>
        </div>

        <div className="divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
          {CAPABILITY_GROUPS.map((group) => {
            const pillar = SERVICE_PILLARS.find((item) => item.id === group.pillarId);
            if (!pillar) return null;
            const rows = [
              ...group.ids.map((id) => ({ id, secondary: false })),
              ...group.secondary.map((id) => ({ id, secondary: true })),
            ];
            return (
              <div key={group.pillarId} className="grid gap-4 py-6 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-4">
                  <Link to={pathFor(pillar.routeId, locale)} className="font-display text-xl hover:text-[var(--color-accent-primary)]">
                    {t(`pillars.${pillar.id}.title`)}
                  </Link>
                </div>
                <ul className="md:col-span-8">
                  {rows.map((row) => (
                    <li key={row.id} className="border-t border-[var(--color-line)] first:border-t-0">
                      <Link
                        to={servicePath(row.id, locale)}
                        className="flex min-h-11 items-baseline justify-between gap-4 py-3 hover:text-[var(--color-accent-primary)]"
                      >
                        <span>{t(`services_data.${row.id}.title`)}</span>
                        {row.secondary ? (
                          <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">
                            {t('services.secondary')}
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
