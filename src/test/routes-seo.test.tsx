import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { allCapabilityIds } from '@/content/capabilities';
import { ASHEN_SERVICES } from '@/core/constants/ashenServices';
import { LOCALES, localeFromPathname } from '@/config/i18n';
import { alternatePath, getIndexableRoutes, pathFor, SERVICE_IDS, servicePath } from '@/config/routes';
import { getSitemapPairs } from '@/config/site-registry.mjs';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProofSection } from '@/features/proof/ProofSection';
import '@/i18n';

describe('locale routing', () => {
  it('maps English, Spanish, and Japanese paths', () => {
    expect(pathFor('aiAgents', 'en')).toBe('/ai-agents');
    expect(pathFor('aiAgents', 'es')).toBe('/es/agentes-ia');
    expect(pathFor('aiAgents', 'ja')).toBe('/ja/ai-agents');
    expect(pathFor('home', 'ja')).toBe('/ja');
    expect(pathFor('about', 'ja')).toBe('/ja/about');
    expect(pathFor('trengie', 'en')).toBe('/case-studies/trengie');
    expect(pathFor('trengie', 'es')).toBe('/es/casos/trengie');
    expect(pathFor('trengie', 'ja')).toBe('/ja/case-studies/trengie');
    expect(alternatePath('/ai-agents', 'es')).toBe('/es/agentes-ia');
    expect(alternatePath('/ai-agents', 'ja')).toBe('/ja/ai-agents');
    expect(alternatePath('/ja/case-studies/trengie', 'en')).toBe('/case-studies/trengie');
    expect(alternatePath('/es/nosotros', 'ja')).toBe('/ja/about');
    expect(alternatePath('/services/web-development', 'ja')).toBe('/ja/services/web-development');
    expect(alternatePath('/ja/services/automation', 'es')).toBe('/es/servicios/automation');
    expect(localeFromPathname('/es/casos')).toBe('es');
    expect(localeFromPathname('/ja/about')).toBe('ja');
    expect(localeFromPathname('/about')).toBe('en');
    expect(getIndexableRoutes()).toHaveLength((10 + SERVICE_IDS.length) * LOCALES.length);
  });

  it('generates indexable routes from the shared registry', () => {
    const routes = getIndexableRoutes();
    const paths = routes.map((route) => route.path);

    expect(paths).toContain('/');
    expect(paths).toContain('/es');
    expect(paths).toContain('/ja');
    expect(paths).toContain('/ai-agents');
    expect(paths).toContain('/es/agentes-ia');
    expect(paths).toContain('/ja/ai-agents');
    expect(paths).toContain('/case-studies/trengie');
    expect(paths).toContain('/es/casos/trengie');
    expect(paths).toContain('/ja/case-studies/trengie');
    expect(paths).toContain(servicePath('web-development', 'en'));
    expect(paths).toContain(servicePath('web-development', 'es'));
    expect(paths).toContain(servicePath('web-development', 'ja'));
    expect(routes).toHaveLength((10 + SERVICE_IDS.length) * LOCALES.length);
    expect(getSitemapPairs()).toHaveLength(10 + SERVICE_IDS.length);
    expect(new Set(paths).size).toBe(paths.length);
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

  it('renders Japanese home copy from the URL, not English fallback', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/ja']}>
          <ProofSection />
        </MemoryRouter>
      </HelmetProvider>,
    );
    expect(screen.getByRole('heading', { name: /公開できる仕事/ })).toBeInTheDocument();
    expect(screen.queryByText(/work we can show/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/trabajo que podemos mostrar/i)).not.toBeInTheDocument();
  });

  it('cycles ja to en to es to ja without dropping the page', () => {
    const ja = '/ja/case-studies/trengie';
    const en = alternatePath(ja, 'en');
    const es = alternatePath(en, 'es');
    const back = alternatePath(es, 'ja');
    expect(en).toBe('/case-studies/trengie');
    expect(es).toBe('/es/casos/trengie');
    expect(back).toBe(ja);
  });
});
