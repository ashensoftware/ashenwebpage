import React from 'react';
import { useT } from '@/hooks/useLocale';
import { FlaskConical, LifeBuoy, Rocket, Search } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Typography } from '@/components/ui/Typography';

const STEPS = [
  { id: 'discovery', icon: Search },
  { id: 'pilot', icon: FlaskConical },
  { id: 'production', icon: Rocket },
  { id: 'support', icon: LifeBuoy },
] as const;

export const ProcessSection: React.FC = () => {
  const t = useT();

  return (
    <Section className="bg-bg-primary pt-8 pb-24">
      <Container>
        <div className="max-w-3xl mb-14 border-t border-[var(--glass-border)] pt-16">
          <Typography variant="small" className="uppercase tracking-widest text-brand-primary font-bold mb-4">
            {t('process.label')}
          </Typography>
          <Typography variant="h2" className="mb-4">
            {t('process.title')}
          </Typography>
          <Typography variant="lead" className="text-text-secondary">
            {t('process.subtitle')}
          </Typography>
        </div>
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <li
                key={step.id}
                className="p-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)]"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                    <Icon size={20} />
                  </span>
                  <span className="text-brand-primary font-black text-sm tracking-widest">0{index + 1}</span>
                </div>
                <h3 className="text-lg font-bold mt-1 mb-2">{t(`process.steps.${step.id}.title`)}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{t(`process.steps.${step.id}.body`)}</p>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
};
