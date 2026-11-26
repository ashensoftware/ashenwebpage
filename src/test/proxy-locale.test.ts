import { describe, expect, it } from 'vitest';
import proxy from '../../proxy';

function run(pathname: string, headers: Record<string, string> = {}) {
  return proxy(new Request(`https://ashensoftware.com${pathname}`, { headers }));
}

function expectStay(response: Response) {
  expect(response.headers.get('x-middleware-next')).toBe('1');
  expect(response.status).not.toBe(301);
  expect(response.status).not.toBe(308);
  expect(response.headers.get('location')).toBeNull();
}

function expectTemporary(response: Response, pathAndSearch: string) {
  expect(response.status).toBe(307);
  expect(response.headers.get('location')).toBe(`https://ashensoftware.com${pathAndSearch}`);
  expect(response.headers.get('cache-control')).toContain('private');
  expect(response.headers.get('cache-control')).toContain('no-store');
  expect(response.headers.get('cdn-cache-control')).toBe('no-store');
}

describe('Vercel routing proxy', () => {
  it('redirects Japan, Colombia, and the United States from / using the geo header', async () => {
    expectTemporary(await run('/', { 'x-vercel-ip-country': 'JP' }), '/ja');
    expectTemporary(await run('/', { 'x-vercel-ip-country': 'CO' }), '/es');
    expectStay(await run('/', { 'x-vercel-ip-country': 'US' }));
  });

  it('keeps an explicit page and a manual cookie ahead of the country', async () => {
    expectStay(await run('/ja/about', { 'x-vercel-ip-country': 'US' }));
    expectStay(await run('/ai-agents', { 'x-vercel-ip-country': 'JP' }));
    expectStay(await run('/es/nosotros', { 'x-vercel-ip-country': 'CO' }));
    expectStay(await run('/', { 'x-vercel-ip-country': 'JP', cookie: 'ashen_locale=en' }));
    expectTemporary(await run('/', { 'x-vercel-ip-country': 'CO', cookie: 'ashen_locale=ja' }), '/ja');
  });

  it('falls back safely and does not touch static paths', async () => {
    expectTemporary(await run('/', { 'accept-language': 'ja-JP,ja;q=0.9' }), '/ja');
    expectTemporary(await run('/', { 'accept-language': 'es-419,es;q=0.8,en;q=0.5' }), '/es');
    expectStay(await run('/', { 'accept-language': 'de-DE,de;q=0.9,en;q=0.8' }));
    expectTemporary(await run('/', { cookie: 'ashen_locale=not-a-language', 'x-vercel-ip-country': 'JP' }), '/ja');
    expectTemporary(await run('/?utm_source=ads&utm_campaign=spring&ref=1', { 'x-vercel-ip-country': 'JP' }), '/ja?utm_source=ads&utm_campaign=spring&ref=1');
    expectStay(await run('/sitemap.xml', { 'x-vercel-ip-country': 'JP' }));
    expectStay(await run('/robots.txt', { 'x-vercel-ip-country': 'JP' }));
    expectStay(await run('/assets/og-image.png', { 'x-vercel-ip-country': 'JP' }));
    expectStay(await run('/c0b294412adf4bb1a1fb642da46e2cc9.txt', { 'x-vercel-ip-country': 'JP' }));
  });

  it('stops after one temporary redirect', async () => {
    const first = await run('/', { 'x-vercel-ip-country': 'JP' });
    const nextUrl = first.headers.get('location');
    expect(nextUrl).toBe('https://ashensoftware.com/ja');
    expectStay(await run('/ja', { 'x-vercel-ip-country': 'JP' }));
    expectStay(await run('/es', { 'x-vercel-ip-country': 'CO' }));
  });
});
