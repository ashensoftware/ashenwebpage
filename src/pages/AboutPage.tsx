
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { BackgroundPaths } from '@/features/animations/BackgroundPaths';
import { Rocket, Users, Globe, Target, Zap, Shield, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-bg-primary overflow-x-hidden text-[var(--color-text-primary)]">

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
                {t('about-dna', 'The Ashen DNA')}
              </span>
            </div>

            <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
              {t('about-hero-title-1', 'We Are')} <span className="text-transparent bg-clip-text bg-gradient-to-r dark:from-white from-black dark:via-gray-200 via-gray-700 dark:to-gray-500 to-gray-900">{t('about-hero-title-2', 'Architects')}</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-purple-500">{t('about-hero-title-3', 'Of The Future.')}</span>
            </h1>

            <p className="text-lg md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed font-light">
              {t('about-hero-desc', 'A collective of visionaries, engineers, and creatives dedicated to building technology that transcends boundaries.')}
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
            src="https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=1920&auto=format&fit=crop"
            alt="Background"
            className="w-full h-full object-cover opacity-20"
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
                    {t('about-principles-title-1', 'Guiding principles for')} <span className="text-brand-primary">{t('about-principles-title-2', 'Ashen\'s')}</span> {t('about-principles-title-3', 'commitment.')}
                  </h2>
                  <div className="h-1 w-24 bg-brand-primary rounded-full" />
                </div>

                {/* Images Row - Responsive */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                  {[
                    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600",
                    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600",
                    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600"
                  ].map((src, idx) => (
                    <div key={idx} className={`rounded-3xl overflow-hidden h-[250px] md:h-[350px] relative group ${idx === 1 ? 'md:-translate-y-8' : ''}`}>
                      <img src={src} alt="Culture" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
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
                      <h3 className="text-3xl font-bold">{t('about-mission-title', 'Our Mission')}</h3>
                    </div>
                    <p className="text-text-secondary text-lg leading-relaxed">
                      {t('about-mission-desc', 'To empower businesses by bridging the gap between complex technology and human-centric design.')}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-400">
                        <Globe size={32} />
                      </div>
                      <h3 className="text-3xl font-bold">{t('about-vision-title', 'Our Vision')}</h3>
                    </div>
                    <p className="text-text-secondary text-lg leading-relaxed">
                      {t('about-vision-desc', 'To be the global standard for digital excellence, where code meets creativity.')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats Strip - Full Width inside card */}
              <div className="bg-black/5 dark:bg-white/5 border-t border-black/10 dark:border-white/10 py-10 px-8 md:px-16 overflow-hidden">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <StatItem value={t('about-stat-years-val', '5+')} label={t('about-stat-years-label', 'Years')} icon={Rocket} />
                  <StatItem value={t('about-stat-projects-val', '50+')} label={t('about-stat-projects-label', 'Projects')} icon={Zap} />
                  <StatItem value={t('about-stat-valuation-val', '$2M+')} label={t('about-stat-valuation-label', 'Valuation')} icon={Shield} />
                  <StatItem value={t('about-stat-commitment-val', '100%')} label={t('about-stat-commitment-label', 'Commitment')} icon={Users} />
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
                {t('about-culture-label', 'Culture')}
              </span>
              <h2 className="text-4xl md:text-6xl font-black mb-6">
                {t('about-culture-heading', 'Rooted in Excellence')}
              </h2>
              <p className="text-xl text-text-secondary">
                {t('about-culture-subheading', 'Our values are the bedrock of our innovation.')}
              </p>
            </div>
            <a href="#contact" className="group flex items-center gap-3 text-[var(--color-text-primary)] font-bold bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 px-6 py-3 rounded-full transition-all border border-black/10 dark:border-white/10">
              {t('contact.cta', 'Join Us')} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CultureCard
              title={t('about-culture-transparency-title', 'Transparency')}
              description={t('about-culture-transparency-desc', 'Open code, open communication.')}
              index={0}
            />
            <CultureCard
              title={t('about-culture-innovation-title', 'Innovation')}
              description={t('about-culture-innovation-desc', 'Exploring the new.')}
              index={1}
            />
            <CultureCard
              title={t('about-culture-agility-title', 'Agility')}
              description={t('about-culture-agility-desc', 'Fast execution.')}
              index={2}
            />
            <CultureCard
              title={t('about-culture-empathy-title', 'Empathy')}
              description={t('about-culture-empathy-desc', 'Technology for people.')}
              index={3}
            />
          </div>
        </Container>
      </section>

    </div>
  );
};

const StatItem = ({ value, label, icon: Icon }: { value: string, label: string, icon: any }) => (
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
