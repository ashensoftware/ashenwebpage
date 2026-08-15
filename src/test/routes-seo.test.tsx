import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { alternatePath, pathFor } from '@/config/routes';
import { localeFromPathname } from '@/config/i18n';
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
