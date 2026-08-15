import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import CaseStudyDetailPage from '@/pages/CaseStudyDetailPage';
import '@/i18n';

describe('unknown case studies', () => {
  it('renders the not-found page instead of redirecting to the listing', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/case-studies/not-real']}>
          <Routes>
            <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>,
    );

    expect(screen.getByRole('heading', { name: /page not found/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /case studies/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /trengie/i })).not.toBeInTheDocument();
  });
});
