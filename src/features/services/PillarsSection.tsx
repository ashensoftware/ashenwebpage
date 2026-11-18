import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { IntegrationDiagram, PipelineDiagram, StackDiagram } from '@/features/diagrams/SystemDiagram';
import { SERVICE_PILLARS } from '@/content/pillars';
import { pathFor } from '@/config/routes';
import { useLocale, useT } from '@/hooks/useLocale';

export const PillarsSection: React.FC = () => {
  const t = useT();
  const locale = useLocale();
  const [lead, ...rest] = SERVICE_PILLARS;

  return (
    <section id="services" className="border-b border-[var(--color-line)] py-16 md:py-24">
      <Container>
        <div className="mb-10 max-w-3xl">
          <p className="eyebrow mb-3">{t('pillars.label')}</p>
          <h2 className="font-display text-4xl font-medium md:text-5xl">{t('pillars.title')}</h2>
          <p className="mt-4 text-lg text-[var(--color-text-secondary)]">{t('pillars.subtitle')}</p>
        </div>

        <Link
          to={pathFor(lead.routeId, locale)}
          className="group grid gap-8 border border-[var(--color-line-strong)] p-6 md:p-8 lg:grid-cols-12"
        >
          <div className="lg:col-span-7">
            <p className="font-mono text-xs text-[var(--color-accent-primary)]">01 — {t('pillars.learn')}</p>
            <h3 className="mt-3 font-display text-3xl font-medium md:text-4xl">{t(`pillars.${lead.id}.title`)}</h3>
            <p className="mt-4 max-w-xl text-[var(--color-text-secondary)] leading-relaxed">
              {t(`pillars.${lead.id}.description`)}
            </p>
          </div>
          <div className="lg:col-span-5">
            <PipelineDiagram
              steps={[t('system.operator'), t('system.agent'), t('system.tools'), t('system.approval')]}
            />
          </div>
        </Link>

        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {rest.map((pillar, index) => (
            <Link
              key={pillar.id}
              to={pathFor(pillar.routeId, locale)}
              className="flex flex-col justify-between border border-[var(--color-line)] p-5 hover:border-[var(--color-line-strong)]"
            >
              <div>
                <p className="font-mono text-xs text-[var(--color-text-muted)]">0{index + 2}</p>
                <h3 className="mt-3 font-display text-2xl font-medium">{t(`pillars.${pillar.id}.title`)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {t(`pillars.${pillar.id}.description`)}
                </p>
              </div>
              <div className="mt-6">
                {pillar.id === 'software' && (
                  <StackDiagram layers={[t('system.ui'), t('system.api'), t('system.data')]} />
                )}
                {pillar.id === 'data-ai' && (
                  <PipelineDiagram steps={[t('system.ingest'), t('system.check'), t('system.model')]} />
                )}
                {pillar.id === 'integrations' && (
                  <IntegrationDiagram nodes={[t('system.crm'), t('system.erp'), t('system.inbox')]} />
                )}
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};
