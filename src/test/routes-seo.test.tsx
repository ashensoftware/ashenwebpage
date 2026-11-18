import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { allCapabilityIds } from '@/content/capabilities';
import { ASHEN_SERVICES } from '@/core/constants/ashenServices';
import { alternatePath, getIndexableRoutes, pathFor, SERVICE_IDS, servicePath } from '@/config/routes';
import { localeFromPathname } from '@/config/i18n';
import { getSitemapPairs } from '@/config/site-registry.mjs';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProofSection } from '@/features/proof/ProofSection';
import '@/i18n';

describe('locale routing', () => {
  it('maps primary English and Spanish paths', () => {
    expect(pathFor('aiAgents', 'en')).toBe('/ai-agents');
    expect(pathFor('aiAgents', 'es')).toBe('/es/agentes-ia');
    expect(pathFor('trengie', 'en')).toBe('/case-studies/trengie');
    expect(pathFor('trengie', 'es')).toBe('/es/casos/trengie');
    expect(alternatePath('/ai-agents', 'es')).toBe('/es/agentes-ia');
    expect(localeFromPathname('/es/casos')).toBe('es');
    expect(localeFromPathname('/about')).toBe('en');
  });

  it('generates indexable routes from the shared registry', () => {
    const routes = getIndexableRoutes();
    const paths = routes.map((route) => route.path);

    expect(paths).toContain('/');
    expect(paths).toContain('/es');
    expect(paths).toContain('/ai-agents');
    expect(paths).toContain('/es/agentes-ia');
    expect(paths).toContain('/case-studies/trengie');
    expect(paths).toContain('/es/casos/trengie');
    expect(paths).toContain(servicePath('web-development', 'en'));
    expect(paths).toContain(servicePath('web-development', 'es'));
    expect(routes).toHaveLength((10 + SERVICE_IDS.length) * 2);
    expect(getSitemapPairs()).toHaveLength(10 + SERVICE_IDS.length);
  });

  it('keeps service IDs aligned with service content', () => {
    expect([...SERVICE_IDS]).toEqual(ASHEN_SERVICES.map((service) => service.id));
    expect(allCapabilityIds().sort()).toEqual([...SERVICE_IDS].sort());
  });

  it('renders a noindex 404', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/this-is-not-a-page']}>
          <Routes>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>,
    );
    expect(screen.getByRole('heading', { name: /page not found/i })).toBeInTheDocument();
  });

  it('renders proof copy in Spanish on /es', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/es']}>
          <ProofSection />
        </MemoryRouter>
      </HelmetProvider>,
    );
    expect(screen.getByRole('heading', { name: /trabajo que podemos mostrar/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /leer el caso/i })).toBeInTheDocument();
    expect(screen.queryByText(/work we can show/i)).not.toBeInTheDocument();
  });
});
