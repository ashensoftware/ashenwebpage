import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const vercelTrack = vi.fn();

vi.mock('@vercel/analytics', () => ({
  track: (...args: unknown[]) => vercelTrack(...args),
}));

import {
  areCustomEventsEnabled,
  sanitizeAnalyticsProps,
  sanitizeSourcePath,
  track,
} from '@/config/analytics';

describe('analytics adapter', () => {
  const originalAshenTrack = window.ashenTrack;

  beforeEach(() => {
    vercelTrack.mockReset();
    window.ashenTrack = undefined;
  });

  afterEach(() => {
    window.ashenTrack = originalAshenTrack;
  });

  it('strips query and hash from source paths', () => {
    expect(sanitizeSourcePath('/ai-agents?utm_source=x#contact')).toBe('/ai-agents');
    expect(sanitizeSourcePath('https://ashensoftware.com/es/agentes-ia?ref=1')).toBe('/es/agentes-ia');
  });

  it('drops contact-form PII keys', () => {
    const clean = sanitizeAnalyticsProps({
      locale: 'en',
      source: '/contact?email=ada@example.com',
      email: 'ada@example.com',
      phone: '+573000000000',
      name: 'Ada',
      message: 'Please call me',
      company: 'Acme',
    });

    expect(clean).toEqual({
      locale: 'en',
      source: '/contact',
    });
    expect(sanitizeAnalyticsProps({ source: 'hero' })).toEqual({ source: 'hero' });
    expect(JSON.stringify(clean)).not.toMatch(/ada@example.com|Please call me|\+573000000000|Ada|Acme/i);
  });

  it('does not send custom Vercel events when the flag is off', () => {
    expect(areCustomEventsEnabled()).toBe(false);
    track('hero_primary_cta', { locale: 'en' });
    expect(vercelTrack).not.toHaveBeenCalled();
  });

  it('can send custom events when the flag is explicitly enabled', () => {
    vi.stubEnv('VITE_ENABLE_VERCEL_CUSTOM_EVENTS', 'true');
    track('service_cta', { service: 'ai-agents', source: 'hero' });
    expect(vercelTrack).toHaveBeenCalledWith('service_cta', {
      service: 'ai-agents',
      source: 'hero',
    });
    vi.unstubAllEnvs();
  });

  it('does not crash when a local hook throws or analytics is unavailable', () => {
    window.ashenTrack = () => {
      throw new Error('local hook failed');
    };
    expect(() => track('contact_form_success', { locale: 'en', source: '/ai-agents' })).not.toThrow();
  });
});
