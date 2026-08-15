import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, ExternalLink } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { CASE_STUDIES, caseStudyKey } from '@/content/case-studies';
import { pathFor } from '@/config/routes';
import { track } from '@/config/analytics';
import { useLocale, useT } from '@/hooks/useLocale';

export const ProofSection: React.FC = () => {
  const t = useT();
  const locale = useLocale();
  const study = CASE_STUDIES[0];

  if (!study) return null;

  return (
    <Section id="work" fullWidth className="bg-bg-primary py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <Typography variant="small" className="uppercase tracking-widest text-brand-primary font-bold mb-4 inline-flex items-center gap-2">
              <BadgeCheck size={16} />
              {t('proof.label')}
            </Typography>
            <Typography variant="h2" className="mb-4">
              {t('proof.title')}
            </Typography>
            <Typography variant="lead" className="text-text-secondary mb-6 text-lg">
              {t('proof.subtitle')}
            </Typography>
            <h3 className="text-xl font-bold mb-3">{t(caseStudyKey(study.slug, 'title'))}</h3>
            <p className="text-text-secondary leading-relaxed mb-8">{t(caseStudyKey(study.slug, 'summary'))}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to={pathFor('trengie', locale)} onClick={() => track('case_study_open', { slug: study.slug })}>
                <Button variant="primary">
                  {t('proof.cta')} <ArrowRight size={16} />
                </Button>
              </Link>
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('trengie_live_site', { source: 'home' })}
              >
                <Button variant="secondary">
                  {t('proof.visit')} <ExternalLink size={16} />
                </Button>
              </a>
            </div>
          </div>

          <Link
            to={pathFor('trengie', locale)}
            onClick={() => track('case_study_open', { slug: study.slug, source: 'home_preview' })}
            className="block w-full rounded-2xl overflow-hidden border border-[var(--glass-border)] bg-[var(--color-bg-secondary)] shadow-2xl"
          >
            <div className="flex items-center gap-2 px-3 py-2.5 border-b border-[var(--glass-border)]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 truncate text-[11px] text-text-muted">{study.liveUrl.replace(/^https?:\/\//, '')}</span>
            </div>
            <img
              src={study.image}
              alt={t(caseStudyKey(study.slug, 'imageAlt'))}
              width={1200}
              height={750}
              loading="lazy"
              className="w-full h-auto object-contain align-middle"
            />
          </Link>
        </div>
      </Container>
    </Section>
  );
};
