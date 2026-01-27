import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import InteractiveGridBackground from '../animations/InteractiveGridBackground';
import { FallingParticles } from '../animations/FallingParticles';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { Container } from '@/components/ui/Container';

export const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="relative w-full h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-bg-primary" id="hero">
      {/* Background Layer */}
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

      {/* Content Layer */}
      <Container className="relative z-10 flex flex-col items-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <Typography variant="small" className="uppercase tracking-[0.2em] text-brand-primary mb-4 font-bold">
            Software Development & Engineering
          </Typography>

          <Typography variant="h1" className="mb-6 max-w-4xl mx-auto leading-tight">
            <span dangerouslySetInnerHTML={{ __html: t('hero.title') }} />
          </Typography>

          <Typography variant="lead" className="max-w-2xl mx-auto mb-10 text-text-secondary">
            {t('hero.subtitle', 'Premium software architecture, artificial intelligence, and digital solutions designed for scalability and impact.')}
          </Typography>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="https://wa.me/573105602568" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="primary" className="min-w-[180px]">
                {t('hero.cta.primary', 'Start Project')}
              </Button>
            </a>
            <Button size="lg" variant="secondary" className="min-w-[180px]">
              {t('hero.cta.secondary', 'View Services')}
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
