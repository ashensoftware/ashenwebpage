import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

describe('Vercel observability components', () => {
  it('renders Analytics and Speed Insights without crashing', () => {
    expect(() =>
      render(
        <MemoryRouter>
          <Analytics />
          <SpeedInsights route="/" />
        </MemoryRouter>,
      ),
    ).not.toThrow();
  });
});
