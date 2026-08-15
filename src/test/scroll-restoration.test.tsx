import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ScrollToHash } from '@/components/layout/ScrollToHash';

describe('route scroll restoration', () => {
  beforeEach(() => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('scrolls to the top when navigating to a page without a hash', () => {
    render(
      <MemoryRouter initialEntries={['/privacy']}>
        <ScrollToHash />
        <Routes>
          <Route path="/privacy" element={<div>Privacy</div>} />
        </Routes>
      </MemoryRouter>,
    );

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'auto' });
  });

  it('scrolls to a hash target instead of the top', () => {
    const target = document.createElement('div');
    target.id = 'contact';
    target.scrollIntoView = vi.fn();
    document.body.appendChild(target);

    render(
      <MemoryRouter initialEntries={['/#contact']}>
        <ScrollToHash />
        <Routes>
          <Route path="/" element={<div>Home</div>} />
        </Routes>
      </MemoryRouter>,
    );

    expect(target.scrollIntoView).toHaveBeenCalled();
    expect(window.scrollTo).not.toHaveBeenCalled();
    target.remove();
  });
});
