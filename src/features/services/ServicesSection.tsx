import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { ASHEN_SERVICES } from '@/core/constants/ashenServices';
import { CAPABILITY_GROUPS } from '@/content/capabilities';
import { SERVICE_PILLARS } from '@/content/pillars';
import { pathFor, servicePath } from '@/config/routes';
import { useLocale, useT } from '@/hooks/useLocale';

export const ServicesSection: React.FC = () => {
  const t = useT();
  const locale = useLocale();

  return (
    <section id="capabilities" className="border-b border-[var(--color-line)] py-16 md:py-24" aria-labelledby="capabilities-title">
      <Container>
        <div className="mb-10 max-w-2xl">
          <p className="eyebrow mb-3">{t('services.label')}</p>
          <h2 id="capabilities-title" className="font-display text-4xl font-medium">
            {t('services.title')}
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)]">{t('services.subtitle')}</p>
        </div>
        <div className="grid gap-10 lg:grid-cols-2">
          {CAPABILITY_GROUPS.map((group) => {
            const pillar = SERVICE_PILLARS.find((item) => item.id === group.pillarId);
            if (!pillar) return null;
            const rows = [
              ...group.ids.map((id) => ({ id, secondary: false })),
              ...group.secondary.map((id) => ({ id, secondary: true })),
            ];
            return (
              <div key={group.pillarId}>
                <Link to={pathFor(pillar.routeId, locale)} className="font-display text-xl hover:text-[var(--color-accent-primary)]">
                  {t(`pillars.${pillar.id}.title`)}
                </Link>
                <ul className="mt-4 divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
                  {rows.map((row) => {
                    const service = ASHEN_SERVICES.find((item) => item.id === row.id);
                    return (
                      <li key={row.id}>
                        <Link
                          to={servicePath(row.id, locale)}
                          className="flex min-h-11 items-center gap-3 py-2 hover:text-[var(--color-accent-primary)]"
                        >
                          {service ? (
                            <img
                              src={service.image}
                              alt=""
                              width={48}
                              height={48}
                              loading="lazy"
                              decoding="async"
                              className="h-12 w-12 shrink-0 rounded-xl object-cover"
                            />
                          ) : null}
                          <span className="flex-1">{t(`services_data.${row.id}.title`)}</span>
                          {row.secondary ? (
                            <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">
                              {t('services.secondary')}
                            </span>
                          ) : null}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
