import React from 'react';
import { useLocale, useT } from '@/hooks/useLocale';
import { Link } from 'react-router-dom';
import { Bot, Code, Database, Workflow, ArrowRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Typography } from '@/components/ui/Typography';
import { SERVICE_PILLARS } from '@/content/pillars';
import { pathFor } from '@/config/routes';

const ICONS = {
  bot: Bot,
  code: Code,
  database: Database,
  workflow: Workflow,
};

export const PillarsSection: React.FC = () => {
  const t = useT();
  const locale = useLocale();

  return (
    <Section id="services" className="bg-bg-primary py-24">
      <Container>
        <div className="max-w-3xl mb-14">
          <Typography variant="small" className="uppercase tracking-widest text-brand-primary font-bold mb-4">
            {t('pillars.label')}
          </Typography>
          <Typography variant="h2" className="mb-4">
            {t('pillars.title')}
          </Typography>
          <Typography variant="lead" className="text-text-secondary">
            {t('pillars.subtitle')}
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICE_PILLARS.map((pillar) => {
            const Icon = ICONS[pillar.icon];
            return (
              <Link
                key={pillar.id}
                to={pathFor(pillar.routeId, locale)}
                className="group p-8 rounded-3xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] hover:border-brand-primary/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                  <Icon size={22} />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-brand-primary transition-colors">
                  {t(`pillars.${pillar.id}.title`)}
                </h3>
                <p className="text-text-secondary leading-relaxed mb-6">
                  {t(`pillars.${pillar.id}.description`)}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary">
                  {t('pillars.learn')} <ArrowRight size={16} />
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};
