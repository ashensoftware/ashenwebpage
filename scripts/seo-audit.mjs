import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { canonicalUrl, getIndexableRoutes, SERVICE_IDS, servicePath } from '../src/config/site-registry.mjs';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(rootDir, 'dist');
const failures = [];

function fail(message) {
  failures.push(message);
}

function pageFile(urlPath) {
  return urlPath === '/' ? path.join(distDir, 'index.html') : path.join(distDir, urlPath, 'index.html');
}

function read(urlPath) {
  const file = pageFile(urlPath);
  if (!fs.existsSync(file)) {
    fail(`Missing HTML for ${urlPath}`);
    return '';
  }
  return fs.readFileSync(file, 'utf8');
}

function attr(html, pattern) {
  const match = html.match(pattern);
  return match?.[1] ?? '';
}

function text(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** CJK characters carry more meaning per code point, so Japanese pages are not rejected for being shorter than English. */
function contentWeight(value) {
  let weight = 0;
  for (const char of value) {
    weight += /[\u3040-\u30ff\u3400-\u9fff]/.test(char) ? 2 : 1;
  }
  return weight;
}

const HREFLANGS = ['en', 'es', 'ja', 'x-default'];
const ENGLISH_LEAKS = [
  'Built for Real Operations',
  'Work we can show',
  'Discuss Your Project',
  'Frequently asked questions',
  'Page not found',
];

const routes = getIndexableRoutes();
const titles = new Map();
const descriptions = new Map();

for (const route of routes) {
  const html = read(route.path);
  if (!html) continue;
  const h1s = html.match(/<h1[\s>]/gi) || [];
  if (h1s.length !== 1) fail(`${route.path} has ${h1s.length} H1 elements`);
  const visible = text(html);
  if (contentWeight(visible) < 400) fail(`${route.path} initial HTML is too thin`);
  if (/prerender-shell/.test(html)) fail(`${route.path} still uses the summary shell`);
  const htmlLang = attr(html, /<html[^>]*lang="([^"]+)"/i);
  if (htmlLang !== route.locale) fail(`${route.path} html lang is ${htmlLang || 'missing'}`);

  const title = attr(html, /<title[^>]*>([^<]*)<\/title>/i);
  const description = attr(html, /<meta[^>]*name="description"[^>]*content="([^"]*)"/i)
    || attr(html, /<meta[^>]*content="([^"]*)"[^>]*name="description"/i);
  const canonical = attr(html, /<link[^>]*rel="canonical"[^>]*href="([^"]+)"/i)
    || attr(html, /<link[^>]*href="([^"]+)"[^>]*rel="canonical"/i);
  const robots = attr(html, /<meta[^>]*name="robots"[^>]*content="([^"]*)"/i);

  if (!title) fail(`${route.path} missing title`);
  if (!description) fail(`${route.path} missing description`);
  const previousTitlePath = titles.get(title);
  const sharedHomeTitle = title === 'Ashen Software' && ['/', '/es'].includes(route.path) && ['/', '/es'].includes(previousTitlePath);
  if (previousTitlePath && !sharedHomeTitle) fail(`Duplicate title "${title}" on ${route.path} and ${previousTitlePath}`);
  else if (!previousTitlePath) titles.set(title, route.path);
  if (descriptions.has(description)) fail(`Duplicate description on ${route.path} and ${descriptions.get(description)}`);
  else descriptions.set(description, route.path);
  if (canonical !== canonicalUrl(route.path)) fail(`${route.path} canonical is ${canonical}`);
  if (/noindex/i.test(robots)) fail(`${route.path} is noindex`);

  for (const lang of HREFLANGS) {
    const href = attr(html, new RegExp(`<link[^>]*hreflang="${lang}"[^>]*href="([^"]+)"`, 'i'))
      || attr(html, new RegExp(`<link[^>]*href="([^"]+)"[^>]*hreflang="${lang}"`, 'i'));
    const expected = lang === 'x-default' || lang === 'en'
      ? canonicalUrl(route.alternate.en)
      : canonicalUrl(route.alternate[lang]);
    if (href !== expected) fail(`${route.path} hreflang ${lang} is ${href || 'missing'}`);
  }

  if (route.locale === 'ja') {
    const jpChars = (visible.match(/[\u3040-\u30ff\u3400-\u9fff]/g) || []).length;
    if (jpChars < 80) fail(`${route.path} has too little Japanese text (${jpChars})`);
    for (const leak of ENGLISH_LEAKS) {
      if (visible.includes(leak)) fail(`${route.path} still contains English copy: ${leak}`);
    }
    if (/\b(?:hero|nav|services_data|aboutPage)\.[a-zA-Z]/.test(visible)) {
      fail(`${route.path} has an unresolved i18n key`);
    }
  }

  const scripts = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  const schemaExpected = !/\/(privacy|terms|privacidad|terminos)$/.test(route.path);
  if (schemaExpected && scripts.length === 0) fail(`${route.path} has no JSON-LD`);
  for (const script of scripts) {
    try {
      JSON.parse(script[1]);
    } catch {
      fail(`${route.path} has invalid JSON-LD`);
    }
  }
}

const home = read('/');
const internal = [...home.matchAll(/href="(\/[^"#?]*)/g)].map((match) => match[1]);
for (const href of internal) {
  if (href.startsWith('/assets') || href.startsWith('/src') || href.startsWith('/fonts')) continue;
  const normalized = href.length > 1 ? href.replace(/\/$/, '') : href;
  const known = routes.some((route) => route.path === normalized) || normalized === '/404';
  if (!known) fail(`Homepage links to unknown route ${href}`);
}

const sitemap = fs.readFileSync(path.join(distDir, 'sitemap.xml'), 'utf8');
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const expected = routes.map((route) => canonicalUrl(route.path)).sort();
const actual = [...locs].sort();
if (actual.join('\n') !== expected.join('\n')) fail('Sitemap URLs do not match indexable routes');
if (!sitemap.includes('hreflang="ja"') || !sitemap.includes('hreflang="x-default"')) fail('Sitemap missing ja or x-default');
if (locs.some((loc) => loc.includes('?'))) fail('Sitemap contains a query string');

const notFound = fs.readFileSync(path.join(distDir, '404.html'), 'utf8');
if (!/noindex/i.test(notFound)) fail('404.html is not noindex');
if (locs.some((loc) => loc.endsWith('/404'))) fail('404 is in the sitemap');

const key = 'c0b294412adf4bb1a1fb642da46e2cc9';
const keyFile = path.join(distDir, `${key}.txt`);
if (!fs.existsSync(keyFile) || fs.readFileSync(keyFile, 'utf8').trim() !== key) {
  fail('IndexNow key file is not in the build output');
}
if (!fs.existsSync(path.join(distDir, 'assets/og-image.png'))) fail('OG image missing from dist');
const displayFont = path.join(distDir, 'fonts/outfit-latin-600-normal.woff2');
if (!fs.existsSync(displayFont)) fail('Display font missing from dist/fonts');
const homeHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
if (!homeHtml.includes('/fonts/outfit-latin-600-normal.woff2')) fail('Homepage does not preload the display font');
if (!fs.existsSync(path.join(distDir, 'assets/logo/Logo-Iso.png'))) fail('Favicon file missing from dist');
if (!fs.existsSync(path.join(distDir, 'robots.txt')) || !fs.readFileSync(path.join(distDir, 'robots.txt'), 'utf8').includes('OAI-SearchBot')) {
  fail('robots.txt does not mention OAI-SearchBot');
}

function assertSingleCapabilityCatalog(urlPath, locale) {
  const html = read(urlPath);
  const start = html.indexOf('id="capabilities"');
  if (start < 0) {
    fail(`${urlPath} is missing the capabilities section`);
    return;
  }
  const end = html.indexOf('<section', start + 20);
  const section = end < 0 ? html.slice(start) : html.slice(start, end);
  for (const id of SERVICE_IDS) {
    const href = servicePath(id, locale);
    const inSection = section.split(`href="${href}"`).length - 1;
    const inPage = html.split(`href="${href}"`).length - 1;
    if (inSection !== 1) fail(`${urlPath} lists ${href} ${inSection} times inside capabilities`);
    if (inPage !== 3) fail(`${urlPath} has ${inPage} links to ${href}; expected navigation, carousel, and one catalog entry`);
  }
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  for (const id of new Set(ids.filter((value, index) => ids.indexOf(value) !== index))) {
    fail(`${urlPath} duplicates id="${id}"`);
  }
}

assertSingleCapabilityCatalog('/', 'en');
assertSingleCapabilityCatalog('/es', 'es');
assertSingleCapabilityCatalog('/ja', 'ja');

for (const urlPath of ['/case-studies/trengie', '/es/casos/trengie', '/ja/case-studies/trengie']) {
  const html = read(urlPath);
  if (contentWeight(text(html)) < 1200) fail(`${urlPath} case study HTML is thin`);
  if (!html.includes('https://trengie.com')) fail(`${urlPath} is missing the live Trengie URL`);
  if ((html.match(/<h1[\s>]/gi) || []).length !== 1) fail(`${urlPath} does not have exactly one H1`);
}

if (failures.length) {
  console.error(`SEO audit failed (${failures.length})`);
  for (const item of failures) console.error(`- ${item}`);
  process.exit(1);
}

console.log(`SEO audit passed for ${routes.length} indexable routes`);
