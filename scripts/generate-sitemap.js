import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://ashensoftware.com';

const today = new Date().toISOString().split('T')[0];

const routes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
];

const generateSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) => {
    return `  <url>
    <loc>${DOMAIN}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

  const publicPath = path.resolve(__dirname, '../public');
  
  if (!fs.existsSync(publicPath)) {
      fs.mkdirSync(publicPath, { recursive: true });
  }

  const sitemapPath = path.join(publicPath, 'sitemap.xml');

  fs.writeFileSync(sitemapPath, sitemap);
  console.log(`Sitemap generated successfully at ${sitemapPath}`);
};

generateSitemap();
