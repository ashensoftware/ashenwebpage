import React from 'react';
import { useT } from '@/hooks/useLocale';
import { Hero } from '@/features/hero/Hero';
import { PillarsSection } from '@/features/services/PillarsSection';
import { ServiceCarousel } from '@/features/services/ServiceCarousel';
import { ServicesSection } from '@/features/services/ServicesSection';
import { ProofSection } from '@/features/proof/ProofSection';
import { AboutPreview } from '@/features/about/AboutPreview';
import { FAQ } from '@/features/faq/FAQ';
import { ContactUs } from '@/features/contact/ContactUs';
import { SEO } from '@/components/SEO';
import { organizationJsonLd, websiteJsonLd } from '@/config/schema';

const HomePage: React.FC = () => {
  const t = useT();

  return (
    <div className="ashen-home">
      <SEO
        title={t('hero.seoTitle')}
        description={t('hero.subtitle')}
        jsonLd={[organizationJsonLd(), websiteJsonLd()]}
      />
      <Hero />
      <ServiceCarousel />
      <ProofSection />
      <PillarsSection />
      <ServicesSection />
      <AboutPreview />
      <FAQ />
      <div id="contact">
        <ContactUs />
      </div>
    </div>
  );
};

export default HomePage;
