import React from 'react';
import { ServiceCarousel } from './ServiceCarousel';

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="relative bg-bg-primary overflow-hidden">
      <div className="w-full">
        <ServiceCarousel />
      </div>
    </section>
  );
};
