import React from 'react';
import { ServiceCarousel } from './ServiceCarousel';

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="relative overflow-hidden bg-bg-primary">
      <ServiceCarousel />
    </section>
  );
};
