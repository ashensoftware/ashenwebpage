import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  ROUTE_PATHS,
  canonicalUrl,
  getIndexableRoutes,
} from '../src/config/site-registry.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const indexPath = path.join(distDir, 'index.html');

const translations = {
  en: JSON.parse(fs.readFileSync(path.join(rootDir, 'src/languages/en/translation.json'), 'utf8')),
  es: JSON.parse(fs.readFileSync(path.join(rootDir, 'src/languages/es/translation.json'), 'utf8')),
};

function lookup(obj, keyPath) {
  return keyPath.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

function interpolate(value, vars = {}) {
  return String(value ?? '').replace(/\{\{(\w+)\}\}/g, (_, name) => vars[name] ?? '');
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function textFor(locale, key, vars) {
  const raw = lookup(translations[locale], key);
  if (typeof raw !== 'string') return '';
  return interpolate(raw, vars);
}

function headingFor(def, locale) {
  if (def.h1Keys?.length) {
    return def.h1Keys.map((key) => textFor(locale, key)).filter(Boolean).join(' ');
  }
  if (def.h1Key) return textFor(locale, def.h1Key);
  return def.titles?.[locale] ?? 'Ashen Software';
}

function titleFor(def, locale) {
  if (def.titles?.[locale]) return def.titles[locale];
  if (def.serviceId) {
    const name = textFor(locale, def.titleKey);
    return name ? `${name} | Ashen Software` : 'Ashen Software';
  }
  return textFor(locale, def.titleKey) || 'Ashen Software';
}

function descriptionFor(def, locale) {
  const vars = { legalName: 'Ashen Software', domain: 'ashensoftware.com' };
  return textFor(locale, def.descKey, vars) || textFor(locale, def.bodyKey, vars);
}

function contactHref(locale) {
  return locale === 'es' ? '/es#contact' : '/#contact';
}

function linkHref(linkId, locale) {
  if (linkId === 'contact') return contactHref(locale);
  return ROUTE_PATHS[linkId]?.[locale] ?? contactHref(locale);
}

function linkLabel(linkId, locale) {
  const labels = {
    home: { en: 'Home', es: 'Inicio' },
    aiAgents: { en: 'AI Agents', es: 'Agentes de IA' },
    software: { en: 'Software', es: 'Software' },
    dataAi: { en: 'Data & AI', es: 'Datos e IA' },
    integrations: { en: 'Integrations', es: 'Integraciones' },
    caseStudies: { en: 'Case studies', es: 'Casos' },
    trengie: { en: 'Trengie case study', es: 'Caso Trengie' },
    about: { en: 'About', es: 'Nosotros' },
    privacy: { en: 'Privacy', es: 'Privacidad' },
    terms: { en: 'Terms', es: 'Términos' },
    contact: { en: 'Start a project', es: 'Iniciar un proyecto' },
  };
  return labels[linkId]?.[locale] ?? linkId;
}

function bodyHtml(def, locale) {
  const vars = { legalName: 'Ashen Software', domain: 'ashensoftware.com' };
  const h1 = escapeHtml(headingFor(def, locale));
  const body = escapeHtml(textFor(locale, def.bodyKey, vars) || descriptionFor(def, locale));
  const linkIds = [...(def.linkIds ?? []), 'contact'];
  const links = linkIds
    .map((id) => `<a href="${escapeHtml(linkHref(id, locale))}">${escapeHtml(linkLabel(id, locale))}</a>`)
    .join(' ');

  return `<article class="prerender-shell"><h1>${h1}</h1><p>${body}</p><nav>${links}</nav></article>`;
}

function injectHead(html, { lang, title, description, path: pathname, alternate, noindex = false }) {
  const url = canonicalUrl(pathname);
  let next = html;
  next = next.replace(/<html lang="[^"]*">/, `<html lang="${lang}">`);
  next = next.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`);
  next = next.replace(
    /<meta name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="${escapeHtml(description)}" />`,
  );
  next = next.replace(/\s*<link rel="canonical" href="[^"]*" \/>/g, '');
  next = next.replace(/\s*<link rel="alternate" hreflang="[^"]+" href="[^"]+" \/>/g, '');
  next = next.replace(/\s*<meta name="robots" content="[^"]*"\s*\/?>/g, '');

  const robots = noindex
    ? '\n  <meta name="robots" content="noindex, nofollow" />'
    : `\n  <meta name="robots" content="index, follow" />\n  <link rel="canonical" href="${url}" />`;

  const hreflang = noindex || !alternate
    ? ''
    : `
  <link rel="alternate" hreflang="en" href="${canonicalUrl(alternate.en)}" />
  <link rel="alternate" hreflang="es" href="${canonicalUrl(alternate.es)}" />
  <link rel="alternate" hreflang="x-default" href="${canonicalUrl(alternate.en)}" />`;

  next = next.replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
  );
  next = next.replace(
    /<meta property="og:description"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
  );
  next = next.replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`);
  next = next.replace(
    /<meta property="og:locale" content="[^"]*" \/>/,
    `<meta property="og:locale" content="${lang === 'es' ? 'es_CO' : 'en_US'}" />`,
  );
  next = next.replace(
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
  );
  next = next.replace(
    /<meta name="twitter:description"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
  );

  next = next.replace('<title>', `${robots}${hreflang}\n  <title>`);
  return next;
}

function injectRoot(html, inner) {
  if (!html.includes('id="root"')) {
    throw new Error('Expected a #root container in the Vite HTML template.');
  }
  return html.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${inner}</div>`);
}

if (!fs.existsSync(indexPath)) {
  console.error('dist/index.html missing. Run vite build first.');
  process.exit(1);
}

const template = fs.readFileSync(indexPath, 'utf8');
const indexable = getIndexableRoutes();

for (const route of indexable) {
  const html = injectRoot(
    injectHead(template, {
      lang: route.locale,
      title: titleFor(route.def, route.locale),
      description: descriptionFor(route.def, route.locale),
      path: route.path,
      alternate: route.alternate,
    }),
    bodyHtml(route.def, route.locale),
  );

  if (route.path === '/') {
    fs.writeFileSync(indexPath, html);
    continue;
  }

  const targetDir = path.join(distDir, route.path);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), html);
}

const notFoundInner = `<article class="prerender-shell"><h1>Page not found</h1><p>This URL is not a page on Ashen Software.</p><nav><a href="/">Home</a> <a href="/es">Inicio</a></nav></article>`;
const notFound = injectRoot(
  injectHead(template, {
    lang: 'en',
    title: 'Page not found | Ashen Software',
    description: 'This URL is not a page on Ashen Software.',
    path: '/404',
    alternate: null,
    noindex: true,
  }),
  notFoundInner,
);
fs.writeFileSync(path.join(distDir, '404.html'), notFound);

console.log(`Prerendered ${indexable.length} marketing routes plus 404.html`);
