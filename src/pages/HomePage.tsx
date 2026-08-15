import React from 'react';
import { useT } from '@/hooks/useLocale';
import { Hero } from '@/features/hero/Hero';
import { ServicesSection } from '@/features/services/ServicesSection';
import { ProofSection } from '@/features/proof/ProofSection';
import { AgentsSpotlight } from '@/features/agents-spotlight/AgentsSpotlight';
import { ProcessSection } from '@/features/process/ProcessSection';
import { ValueProposition } from '@/features/value-proposition/ValueProposition';
import { FAQ } from '@/features/faq/FAQ';
import { ContactUs } from '@/features/contact/ContactUs';
import { ClickSpark } from '@/features/animations/ClickSpark';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { SEO } from '@/components/SEO';
import { organizationJsonLd, websiteJsonLd } from '@/config/schema';

const HomePage: React.FC = () => {
  const t = useT();

  return (
    <div className="ashen-home overflow-x-hidden">
      <SEO
        title="Ashen Software"
        description={t('hero.subtitle')}
        jsonLd={[organizationJsonLd(), websiteJsonLd()]}
      />
      <ClickSpark />
      <Hero />
      <div className="relative -mt-2 z-20">
        <SectionDivider variant="curve" color="var(--bg-primary)" />
      </div>
      <ServicesSection />
      <ProofSection />
      <AgentsSpotlight />
      <ValueProposition />
      <ProcessSection />
      <FAQ />
      <div id="contact">
        <ContactUs />
      </div>
    </div>
  );
};

export default HomePage;
