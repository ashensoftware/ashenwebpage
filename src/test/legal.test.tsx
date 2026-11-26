import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import LegalPage from '@/pages/LegalPage';
import '@/i18n';

function renderLegal(path: string, kind: 'privacy' | 'terms') {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>
        <LegalPage kind={kind} />
      </MemoryRouter>
    </HelmetProvider>,
  );
}

describe('legal localization', () => {
  it('renders English privacy copy on /privacy', () => {
    renderLegal('/privacy', 'privacy');
    expect(screen.getByRole('heading', { name: /privacy/i })).toBeInTheDocument();
    expect(screen.getByText(/formspree processes that contact-form data/i)).toBeInTheDocument();
    expect(screen.getByText(/has not been reviewed by an attorney/i)).toBeInTheDocument();
    expect(screen.queryByText(/procesa esos datos del formulario/i)).not.toBeInTheDocument();
  });

  it('renders Spanish privacy copy on /es/privacidad', () => {
    renderLegal('/es/privacidad', 'privacy');
    expect(screen.getByRole('heading', { name: /privacidad/i })).toBeInTheDocument();
    expect(screen.getByText(/formspree procesa esos datos del formulario/i)).toBeInTheDocument();
    expect(screen.getByText(/no ha sido revisada por un abogado/i)).toBeInTheDocument();
    expect(screen.queryByText(/formspree processes that contact-form data/i)).not.toBeInTheDocument();
  });

  it('renders Spanish terms copy on /es/terminos', () => {
    renderLegal('/es/terminos', 'terms');
    expect(screen.getByRole('heading', { name: /términos/i })).toBeInTheDocument();
    expect(screen.getByText(/el contenido es informativo/i)).toBeInTheDocument();
    expect(screen.queryByText(/content is informational/i)).not.toBeInTheDocument();
  });

  it('renders Japanese privacy copy without inventing a Japanese support promise', () => {
    renderLegal('/ja/privacy', 'privacy');
    expect(screen.getByRole('heading', { name: /プライバシーポリシー/ })).toBeInTheDocument();
    expect(screen.getByText(/Formspreeがそのお問い合わせデータを処理し/)).toBeInTheDocument();
    expect(screen.getByText(/弁護士の確認も受けていません/)).toBeInTheDocument();
    expect(screen.queryByText(/\{\{legalName\}\}/)).not.toBeInTheDocument();
    expect(screen.queryByText(/\{\{domain\}\}/)).not.toBeInTheDocument();
    expect(screen.queryByText(/formspree processes that contact-form data/i)).not.toBeInTheDocument();
  });
});
