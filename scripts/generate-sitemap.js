import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { canonicalUrl, getSitemapPairs, LOCALES } from '../src/config/site-registry.mjs';
import { contentLastmod } from './content-lastmod.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pairs = getSitemapPairs();
const lastmod = contentLastmod();

function alternates(paths) {
  const links = LOCALES.map(
    (locale) => `    <xhtml:link rel="alternate" hreflang="${locale}" href="${canonicalUrl(paths[locale])}" />`,
  );
  links.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${canonicalUrl(paths.en)}" />`);
  return links.join('\n');
}

const body = pairs
  .flatMap((pair) =>
    LOCALES.map((locale) => {
      const lastmodTag = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : '';
      return `  <url>
    <loc>${canonicalUrl(pair[locale])}</loc>${lastmodTag}
${alternates(pair)}
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
console.log(`Sitemap written with ${pairs.length * LOCALES.length} URLs${lastmod ? `, lastmod ${lastmod}` : ', no lastmod'}`);
