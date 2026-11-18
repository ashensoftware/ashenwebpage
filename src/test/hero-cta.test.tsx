import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Hero } from '@/features/hero/Hero';
import '@/i18n';

describe('Hero CTAs', () => {
  it('links the primary CTA to contact and See Our Work to case studies', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <Hero />
        </MemoryRouter>
      </HelmetProvider>,
    );

    expect(screen.getByRole('link', { name: /discuss your project/i })).toHaveAttribute('href', '/#contact');
    expect(screen.getByRole('link', { name: /see our work/i })).toHaveAttribute('href', '/case-studies');
  });
});
