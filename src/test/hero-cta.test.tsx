import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { Hero } from '@/features/hero/Hero';
import '@/i18n';

vi.mock('@/features/animations/InteractiveGridBackground', () => ({
  default: () => null,
}));
vi.mock('@/features/animations/FallingParticles', () => ({
  FallingParticles: () => null,
}));

describe('Hero CTAs', () => {
  it('links Start a Project to contact and See Our Work to case studies', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <Hero />
        </MemoryRouter>
      </HelmetProvider>,
    );

    expect(screen.getByRole('link', { name: /start a project/i })).toHaveAttribute('href', '/#contact');
    expect(screen.getByRole('link', { name: /see our work/i })).toHaveAttribute('href', '/case-studies');
  });
});
