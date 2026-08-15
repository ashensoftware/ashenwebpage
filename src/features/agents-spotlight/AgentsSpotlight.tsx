import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, ShieldCheck, Workflow } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { pathFor } from '@/config/routes';
import { track } from '@/config/analytics';
import { useLocale, useT } from '@/hooks/useLocale';

const HIGHLIGHTS = [
  { icon: Bot, key: 'agents' },
  { icon: Workflow, key: 'tools' },
  { icon: ShieldCheck, key: 'guardrails' },
] as const;

export const AgentsSpotlight: React.FC = () => {
  const t = useT();
  const locale = useLocale();

  return (
    <Section fullWidth className="bg-bg-primary py-16 md:py-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary text-white">
                <Bot size={20} />
              </span>
              <Typography variant="small" className="uppercase tracking-widest text-brand-primary font-bold">
                {t('spotlight.label')}
              </Typography>
            </div>
            <Typography variant="h2" className="mb-4">
              {t('spotlight.title')}
            </Typography>
            <Typography variant="lead" className="text-text-secondary mb-8 text-lg">
              {t('spotlight.body')}
            </Typography>
            <Link to={pathFor('aiAgents', locale)} onClick={() => track('ai_agents_cta', { source: 'home' })}>
              <Button variant="primary">{t('spotlight.cta')}</Button>
            </Link>
          </div>

          <ul className="lg:col-span-5 flex flex-col gap-4">
            {HIGHLIGHTS.map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.key}
                  className="flex items-center gap-4 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                    <Icon size={20} />
                  </span>
                  <span className="text-[var(--color-text-primary)] font-medium">
                    {t(`spotlight.chips.${item.key}`, item.key)}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </Section>
  );
};
