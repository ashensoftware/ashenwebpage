
import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { BackgroundPaths } from '@/features/animations/BackgroundPaths';
import { Link } from 'react-router-dom';
import { Rocket, Users, Globe, Target, ArrowRight } from 'lucide-react';

import { SEO } from '@/components/SEO';
import { organizationJsonLd } from '@/config/schema';
import { contactPath } from '@/config/routes';
import { useLocale, useT } from '@/hooks/useLocale';

export const AboutPage: React.FC = () => {
  const t = useT();
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-bg-primary overflow-x-hidden text-[var(--color-text-primary)]">
      <SEO
        title={t('aboutPage.seoTitle')}
        description={t('aboutPage.seoDesc')}
        jsonLd={organizationJsonLd()}
      />

      {/* --- HERO SECTION ---
                Clean, dark, focused on the main slogan.
            */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <BackgroundPaths className="absolute inset-0 h-full opacity-30" />
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand-primary/10 blur-[120px] rounded-full pointer-events-none" />

        <Container className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
              <span className="text-xs font-bold tracking-widest uppercase text-[var(--color-text-primary)]">
                {t('aboutPage.dna')}
              </span>
            </div>

            <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
              {t('aboutPage.heroTitle1')} <span className="text-transparent bg-clip-text bg-gradient-to-r dark:from-white from-black dark:via-gray-200 via-gray-700 dark:to-gray-500 to-gray-900">{t('aboutPage.heroTitle2')}</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-purple-500">{t('aboutPage.heroTitle3')}</span>
            </h1>

            <p className="text-lg md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed font-light">
              {t('aboutPage.heroDesc')}
            </p>
          </motion.div>
        </Container>
      </section>


      {/* --- PRINCIPLES SECTION (Parallax Background) ---
                Dramatically separates content with a rich visual background.
            */}
      <section className="relative py-20 md:py-32">
        {/* Background Image with Parallax-like feel */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/og-image.png"
            alt=""
            className="w-full h-full object-cover opacity-20"
            width="1200"
            height="800"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-primary/80 to-bg-primary" />
        </div>

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            {/* The Glass Card */}
            <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-white/5">

              <div className="p-8 md:p-16">
                <div className="max-w-4xl mb-16">
                  <h2 className="text-3xl md:text-6xl font-bold leading-tight mb-6">
                    {t('aboutPage.principles1')} <span className="text-brand-primary">{t('aboutPage.principles2')}</span> {t('aboutPage.principles3')}
                  </h2>
                  <div className="h-1 w-24 bg-brand-primary rounded-full" />
                </div>

                {/* Images Row - Responsive */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                  {[
                    "/assets/og-image.png",
                    "/assets/logo/Logo-Iso.png",
                    "/assets/logo/Logo-Iso-Slogan.png"
                  ].map((src, idx) => (
                    <div key={idx} className={`rounded-3xl overflow-hidden h-[250px] md:h-[350px] relative group ${idx === 1 ? 'md:-translate-y-8' : ''}`}>
                      <img
                        src={src}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                        width="400"
                        height="300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
                    </div>
                  ))}
                </div>

                {/* Mission / Vision Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 border-t border-white/10 pt-16">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-2xl bg-brand-primary/20 text-brand-primary">
                        <Target size={32} />
                      </div>
                      <h3 className="text-3xl font-bold">{t('aboutPage.missionTitle')}</h3>
                    </div>
                    <p className="text-text-secondary text-lg leading-relaxed">
                      {t('aboutPage.missionDesc')}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-400">
                        <Globe size={32} />
                      </div>
                      <h3 className="text-3xl font-bold">{t('aboutPage.visionTitle')}</h3>
                    </div>
                    <p className="text-text-secondary text-lg leading-relaxed">
                      {t('aboutPage.visionDesc')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats Strip - Full Width inside card */}
              <div className="bg-black/5 dark:bg-white/5 border-t border-black/10 dark:border-white/10 py-10 px-8 md:px-16 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <StatItem value="Medellín" label="Colombia" icon={Globe} />
                  <StatItem value="EN / ES" label="Delivery" icon={Users} />
                  <StatItem value="Remote" label="International" icon={Rocket} />
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>


      {/* --- CULTURE SECTION ---
                Distinct dark background to separate from the previous section.
            */}
      <section className="py-20 md:py-32 bg-bg-secondary relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent" />

        <Container>
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-16">
            <div className="max-w-2xl">
              <span className="text-brand-primary font-bold tracking-widest uppercase text-sm mb-4 block">
                {t('aboutPage.cultureLabel')}
              </span>
              <h2 className="text-4xl md:text-6xl font-black mb-6">
                {t('aboutPage.cultureHeading')}
              </h2>
              <p className="text-xl text-text-secondary">
                {t('aboutPage.cultureSubheading')}
              </p>
            </div>
            <Link to={contactPath(locale)} className="group flex items-center gap-3 text-[var(--color-text-primary)] font-bold bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 px-6 py-3 rounded-full transition-all border border-black/10 dark:border-white/10">
              {t('cta.startProject')} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CultureCard
              title={t('aboutPage.transparencyTitle')}
              description={t('aboutPage.transparencyDesc')}
              index={0}
            />
            <CultureCard
              title={t('aboutPage.innovationTitle')}
              description={t('aboutPage.innovationDesc')}
              index={1}
            />
            <CultureCard
              title={t('aboutPage.agilityTitle')}
              description={t('aboutPage.agilityDesc')}
              index={2}
            />
            <CultureCard
              title={t('aboutPage.empathyTitle')}
              description={t('aboutPage.empathyDesc')}
              index={3}
            />
          </div>
        </Container>
      </section>

    </div>
  );
};

const StatItem = ({ value, label, icon: Icon }: { value: string, label: string, icon: React.ComponentType<{ size?: number; className?: string }> }) => (
  <div className="flex flex-col">
    <div className="flex items-center gap-3 mb-2 text-[var(--color-text-primary)]">
      <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5">
        <Icon size={18} className="text-brand-primary" />
      </div>
      <span className="text-3xl md:text-4xl font-black tracking-tight">{value}</span>
    </div>
    <span className="text-sm font-medium text-text-secondary uppercase tracking-widest pl-1">{label}</span>
  </div>
);

const CultureCard = ({ title, description, index }: { title: string, description: string, index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    whileHover={{ y: -5 }}
    className="p-8 rounded-[2rem] bg-gradient-to-br from-black/[0.03] dark:from-white/[0.03] to-black/[0.01] dark:to-white/[0.01] border border-black/5 dark:border-white/5 hover:border-brand-primary/40 transition-all duration-300 group"
  >
    <div className="w-12 h-12 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center mb-6 group-hover:bg-brand-primary/20 group-hover:text-brand-primary transition-colors">
      <span className="font-bold text-xl text-[var(--color-text-primary)]">0{index + 1}</span>
    </div>
    <h4 className="text-xl font-bold text-[var(--color-text-primary)] mb-4 group-hover:text-brand-primary transition-colors">{title}</h4>
    <p className="text-base text-text-secondary leading-relaxed">{description}</p>
  </motion.div>
);
