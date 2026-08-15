import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import InteractiveGridBackground from '../animations/InteractiveGridBackground';
import { FallingParticles } from '../animations/FallingParticles';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { Container } from '@/components/ui/Container';
import { pathFor } from '@/config/routes';
import { contactPath } from '@/config/routes';
import { track } from '@/config/analytics';
import { useLocale, useT } from '@/hooks/useLocale';
import { ArrowRight, Briefcase } from 'lucide-react';

export const Hero: React.FC = () => {
  const t = useT();
  const locale = useLocale();

  return (
    <section
      className="relative w-full min-h-svh -mt-20 flex items-center justify-center overflow-hidden bg-bg-primary"
      id="hero"
    >
      <div className="absolute inset-0 z-0">
        <InteractiveGridBackground
          gridSize={40}
          effectColor="#000000"
          darkEffectColor="#ffffff"
          trailLength={4}
          idleSpeed={0.01}
          glow={true}
          glowRadius={25}
          fadeIntensity={15}
          idleRandomCount={8}
          showFade={false}
          className="w-full h-full opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-primary/50 to-[var(--bg-primary)] pointer-events-none" />
        <FallingParticles />
      </div>

      <Container className="relative z-10 flex flex-col items-center text-center px-4 pt-20 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Typography variant="small" className="uppercase tracking-[0.2em] text-brand-primary mb-3 font-bold">
            {t('hero.eyebrow')}
          </Typography>

          <Typography variant="h1" className="mb-4 max-w-4xl mx-auto leading-tight text-4xl md:text-5xl lg:text-6xl">
            {t('hero.titleBefore')}{' '}
            <span className="text-gradient">{t('hero.titleEmphasis')}</span>
          </Typography>

          <Typography variant="lead" className="max-w-2xl mx-auto mb-6 text-base md:text-lg text-text-secondary">
            {t('hero.subtitle')}
          </Typography>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              to={contactPath(locale)}
              onClick={() => track('hero_primary_cta', { locale })}
            >
              <Button size="lg" variant="primary" className="min-w-[180px]">
                {t('hero.cta.primary')}
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link
              to={pathFor('caseStudies', locale)}
              onClick={() => track('hero_case_studies', { locale })}
            >
              <Button size="lg" variant="secondary" className="min-w-[180px]">
                <Briefcase size={18} />
                {t('hero.cta.secondary')}
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
