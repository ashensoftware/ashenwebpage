import React from 'react';
import { Hero } from '@/features/hero/Hero';
import { ServicesSection } from '@/features/services/ServicesSection';
import { ValueProposition } from '@/features/value-proposition/ValueProposition';
import { FAQ } from '@/features/faq/FAQ';
import { ContactUs } from '@/features/contact/ContactUs';
import { ClickSpark } from '@/features/animations/ClickSpark';

import { AboutPreview } from '@/features/about/AboutPreview';

// Temporarily importing CSS here if removed from main.tsx, but globally it should be in main.
// Assuming Layout is handled in App.tsx, so we don't wrap with Layout here.

import { SectionDivider } from '@/components/ui/SectionDivider';

// ... other imports

import { SEO } from '@/components/SEO';

const HomePage: React.FC = () => {
  return (
    <div className="ashen-home overflow-x-hidden">
      <SEO
        title="Ashen Software | Premium Digital Engineering"
        description="Premium software architecture, AI solutions, and digital engineering for scalable impact."
      />
      <ClickSpark />

      {/* Sections */}
      <Hero />

      {/* Smooth Transition to Services */}
      <div className="relative -mt-2 z-20">
        <SectionDivider variant="curve" color="var(--bg-primary)" />
      </div>

      <ServicesSection />

      <ValueProposition />
      <AboutPreview />

      <FAQ />

      <div id="contact">
        <ContactUs />
      </div>
    </div>
  );
};

export default HomePage;
