import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { canonicalUrl, getSitemapPairs } from '../src/config/site-registry.mjs';
import { contentLastmod } from './content-lastmod.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pairs = getSitemapPairs();
const lastmod = contentLastmod();

function xhtml(en, es) {
  return `    <xhtml:link rel="alternate" hreflang="en" href="${canonicalUrl(en)}" />
    <xhtml:link rel="alternate" hreflang="es" href="${canonicalUrl(es)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${canonicalUrl(en)}" />`;
}

const body = pairs
  .flatMap((pair) =>
    ['en', 'es'].map((locale) => {
      const lastmodTag = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : '';
      return `  <url>
    <loc>${canonicalUrl(pair[locale])}</loc>${lastmodTag}
${xhtml(pair.en, pair.es)}
  </url>`;
    }),
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
console.log(`Sitemap written with ${pairs.length * 2} URLs${lastmod ? `, lastmod ${lastmod}` : ', no lastmod'}`);
