import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { ServiceCarousel } from '@/features/services/ServiceCarousel';
import { ServicesSection } from '@/features/services/ServicesSection';
import CaseStudyDetailPage from '@/pages/CaseStudyDetailPage';
import { ASHEN_SERVICES } from '@/core/constants/ashenServices';
import '@/i18n';

describe('homepage capabilities', () => {
  it('renders each capability link once', () => {
    const { container } = render(
      <HelmetProvider>
        <MemoryRouter>
          <ServicesSection />
        </MemoryRouter>
      </HelmetProvider>,
    );

    for (const service of ASHEN_SERVICES) {
      const links = container.querySelectorAll(`a[href="/services/${service.id}"]`);
      expect(links).toHaveLength(1);
    }
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(1);
  });

  it('keeps one real carousel link and hides the loop clone from the link list', () => {
    const { container } = render(
      <HelmetProvider>
        <MemoryRouter>
          <ServiceCarousel />
        </MemoryRouter>
      </HelmetProvider>,
    );

    for (const service of ASHEN_SERVICES) {
      expect(container.querySelectorAll(`a[href="/services/${service.id}"]`)).toHaveLength(1);
    }
    expect(container.querySelectorAll('.ashen-marquee-clone a')).toHaveLength(0);
    expect(container.querySelectorAll('.ashen-marquee-clone')).toHaveLength(ASHEN_SERVICES.length);
  });
});

describe('Trengie case study', () => {
  it('prerenders the verified story, not only a summary', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/case-studies/trengie']}>
          <Routes>
            <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>,
    );

    expect(screen.getByRole('heading', { level: 1, name: /trengie/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /^challenge$/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /ux and engineering approach/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /^outcome$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /visit live site/i })).toHaveAttribute('href', 'https://trengie.com');
  });
});
