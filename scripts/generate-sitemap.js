import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ORIGIN = 'https://ashensoftware.com';

const pairs = [
  { en: '/', es: '/es' },
  { en: '/ai-agents', es: '/es/agentes-ia' },
  { en: '/software-development', es: '/es/desarrollo-software' },
  { en: '/data-ai-engineering', es: '/es/datos-ia' },
  { en: '/integrations', es: '/es/integraciones' },
  { en: '/case-studies', es: '/es/casos' },
  { en: '/case-studies/trengie', es: '/es/casos/trengie' },
  { en: '/about', es: '/es/nosotros' },
  { en: '/privacy', es: '/es/privacidad' },
  { en: '/terms', es: '/es/terminos' },
  { en: '/services/web-development', es: '/es/servicios/web-development' },
  { en: '/services/mobile-development', es: '/es/servicios/mobile-development' },
  { en: '/services/desktop-apps', es: '/es/servicios/desktop-apps' },
  { en: '/services/iot-solutions', es: '/es/servicios/iot-solutions' },
  { en: '/services/game-development', es: '/es/servicios/game-development' },
  { en: '/services/artificial-intelligence', es: '/es/servicios/artificial-intelligence' },
  { en: '/services/machine-learning', es: '/es/servicios/machine-learning' },
  { en: '/services/deep-learning', es: '/es/servicios/deep-learning' },
  { en: '/services/data-science', es: '/es/servicios/data-science' },
  { en: '/services/blockchain', es: '/es/servicios/blockchain' },
  { en: '/services/automation', es: '/es/servicios/automation' },
];

function loc(pathname) {
  return pathname === '/' ? `${ORIGIN}/` : `${ORIGIN}${pathname}`;
}

function xhtml(en, es) {
  return `    <xhtml:link rel="alternate" hreflang="en" href="${loc(en)}" />
    <xhtml:link rel="alternate" hreflang="es" href="${loc(es)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${loc(en)}" />`;
}

const body = pairs
  .flatMap((pair) =>
    ['en', 'es'].map(
      (locale) => `  <url>
    <loc>${loc(pair[locale])}</loc>
${xhtml(pair.en, pair.es)}
  </url>`,
    ),
  )
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${body}
</urlset>
`;

const outDir = path.resolve(__dirname, '../public');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap);
console.log(`Sitemap written with ${pairs.length * 2} URLs`);
