
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ServiceCarousel } from './ServiceCarousel';

export const ServicesSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="services" className="relative bg-bg-primary overflow-hidden">
      {/* We remove the container here to allow full width for the carousel */}
      <div className="w-full">
        <ServiceCarousel />
      </div>
    </section>
  );
};
