import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const indexPath = path.join(distDir, 'index.html');

const ROUTES = [
  { path: '/', title: 'Ashen Software', description: 'Ashen designs and ships production systems: AI agents, custom software, data platforms and integrations.', lang: 'en', alternate: { en: '/', es: '/es' } },
  { path: '/es', title: 'Ashen Software', description: 'Ashen diseña y pone en producción sistemas: agentes, software a medida, datos e integraciones.', lang: 'es', alternate: { en: '/', es: '/es' } },
  { path: '/ai-agents', title: 'AI Agents & Intelligent Automation | Ashen Software', description: 'Production-grade AI agents connected to business systems, with evaluation, observability and human oversight.', lang: 'en', alternate: { en: '/ai-agents', es: '/es/agentes-ia' } },
  { path: '/es/agentes-ia', title: 'Agentes de IA y automatización | Ashen Software', description: 'Agentes de IA conectados a sistemas de negocio, con evaluación, observabilidad y supervisión humana.', lang: 'es', alternate: { en: '/ai-agents', es: '/es/agentes-ia' } },
  { path: '/software-development', title: 'Custom Software Engineering | Ashen Software', description: 'Custom web applications, SaaS, internal tools and APIs.', lang: 'en', alternate: { en: '/software-development', es: '/es/desarrollo-software' } },
  { path: '/es/desarrollo-software', title: 'Desarrollo de software a medida | Ashen Software', description: 'Aplicaciones web, SaaS, herramientas internas y APIs.', lang: 'es', alternate: { en: '/software-development', es: '/es/desarrollo-software' } },
  { path: '/data-ai-engineering', title: 'Data & AI Engineering | Ashen Software', description: 'Data pipelines, analytics platforms and machine learning systems.', lang: 'en', alternate: { en: '/data-ai-engineering', es: '/es/datos-ia' } },
  { path: '/es/datos-ia', title: 'Datos e ingeniería de IA | Ashen Software', description: 'Pipelines, analítica y sistemas de machine learning.', lang: 'es', alternate: { en: '/data-ai-engineering', es: '/es/datos-ia' } },
  { path: '/integrations', title: 'Integrations & Modernization | Ashen Software', description: 'API integrations, CRM/ERP connections and workflow modernization.', lang: 'en', alternate: { en: '/integrations', es: '/es/integraciones' } },
  { path: '/es/integraciones', title: 'Integraciones y modernización | Ashen Software', description: 'Integraciones API, CRM/ERP y modernización de procesos.', lang: 'es', alternate: { en: '/integrations', es: '/es/integraciones' } },
  { path: '/case-studies', title: 'Case Studies | Ashen Software', description: 'Selected software delivery by Ashen Software, starting with Trengie.', lang: 'en', alternate: { en: '/case-studies', es: '/es/casos' } },
  { path: '/es/casos', title: 'Casos | Ashen Software', description: 'Entregas de software de Ashen, empezando por Trengie.', lang: 'es', alternate: { en: '/case-studies', es: '/es/casos' } },
  { path: '/case-studies/trengie', title: 'Trengie case study | Ashen Software', description: 'Ashen built the public website for Trengie, a railway engineering consultancy.', lang: 'en', alternate: { en: '/case-studies/trengie', es: '/es/casos/trengie' } },
  { path: '/es/casos/trengie', title: 'Caso Trengie | Ashen Software', description: 'Ashen construyó el sitio público de Trengie, una consultora de ingeniería ferroviaria.', lang: 'es', alternate: { en: '/case-studies/trengie', es: '/es/casos/trengie' } },
  { path: '/about', title: 'About Ashen Software', description: 'Engineering company in Medellín that builds custom software, AI agents and data systems.', lang: 'en', alternate: { en: '/about', es: '/es/nosotros' } },
  { path: '/es/nosotros', title: 'Sobre Ashen Software', description: 'Empresa de ingeniería en Medellín que construye software, agentes de IA y sistemas de datos.', lang: 'es', alternate: { en: '/about', es: '/es/nosotros' } },
  { path: '/privacy', title: 'Privacy Policy | Ashen Software', description: 'How Ashen Software handles contact-form and website information.', lang: 'en', alternate: { en: '/privacy', es: '/es/privacidad' } },
  { path: '/es/privacidad', title: 'Política de privacidad | Ashen Software', description: 'Cómo Ashen trata la información del formulario y del sitio.', lang: 'es', alternate: { en: '/privacy', es: '/es/privacidad' } },
  { path: '/terms', title: 'Terms of Use | Ashen Software', description: 'Terms for using the Ashen Software website.', lang: 'en', alternate: { en: '/terms', es: '/es/terminos' } },
  { path: '/es/terminos', title: 'Términos de uso | Ashen Software', description: 'Términos para el uso del sitio de Ashen Software.', lang: 'es', alternate: { en: '/terms', es: '/es/terminos' } },
];

const SERVICES = [
  ['web-development', 'Web Development', 'Desarrollo web'],
  ['mobile-development', 'Mobile Applications', 'Aplicaciones móviles'],
  ['desktop-apps', 'Desktop Applications', 'Aplicaciones de escritorio'],
  ['iot-solutions', 'Internet of Things', 'Internet de las Cosas'],
  ['game-development', 'Game Development', 'Desarrollo de videojuegos'],
  ['artificial-intelligence', 'Artificial Intelligence', 'Inteligencia artificial'],
  ['machine-learning', 'Machine Learning', 'Machine Learning'],
  ['deep-learning', 'Deep Learning', 'Deep Learning'],
  ['data-science', 'Data Science', 'Ciencia de datos'],
  ['blockchain', 'Blockchain', 'Blockchain'],
  ['automation', 'Automation', 'Automatización'],
];

for (const [id, enTitle, esTitle] of SERVICES) {
  ROUTES.push({
    path: `/services/${id}`,
    title: `${enTitle} | Ashen Software`,
    description: `${enTitle} as a capability under Ashen Software's engineering offerings.`,
    lang: 'en',
    alternate: { en: `/services/${id}`, es: `/es/servicios/${id}` },
  });
  ROUTES.push({
    path: `/es/servicios/${id}`,
    title: `${esTitle} | Ashen Software`,
    description: `${esTitle} como capacidad dentro de la oferta de ingeniería de Ashen Software.`,
    lang: 'es',
    alternate: { en: `/services/${id}`, es: `/es/servicios/${id}` },
  });
}

const ORIGIN = 'https://ashensoftware.com';

function canonical(pathname) {
  return pathname === '/' ? `${ORIGIN}/` : `${ORIGIN}${pathname}`;
}

function inject(html, route) {
  const en = canonical(route.alternate.en);
  const es = canonical(route.alternate.es);
  const url = canonical(route.path);
  let next = html;
  next = next.replace(/<html lang="[^"]*">/, `<html lang="${route.lang}">`);
  next = next.replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`);
  next = next.replace(/<meta name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${route.description}" />`);
  next = next.replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`);
  next = next.replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${route.title}" />`);
  next = next.replace(/<meta property="og:description"\s+content="[^"]*"\s*\/>/, `<meta property="og:description" content="${route.description}" />`);
  next = next.replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`);
  next = next.replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${route.title}" />`);
  next = next.replace(/<meta name="twitter:description"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${route.description}" />`);

  next = next.replace(/\s*<link rel="alternate" hreflang="[^"]+" href="[^"]+" \/>/g, '');
  const hreflang = `
  <link rel="alternate" hreflang="en" href="${en}" />
  <link rel="alternate" hreflang="es" href="${es}" />
  <link rel="alternate" hreflang="x-default" href="${en}" />`;
  next = next.replace('</head>', `${hreflang}\n</head>`);
  return next;
}

if (!fs.existsSync(indexPath)) {
  console.error('dist/index.html missing. Run vite build first.');
  process.exit(1);
}

const template = fs.readFileSync(indexPath, 'utf8');

for (const route of ROUTES) {
  const html = inject(template, route);
  if (route.path === '/') {
    fs.writeFileSync(indexPath, html);
    continue;
  }
  const targetDir = path.join(distDir, route.path);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), html);
}

const notFound = inject(template, {
  path: '/404',
  title: 'Page not found | Ashen Software',
  description: 'This URL is not a page on Ashen Software.',
  lang: 'en',
  alternate: { en: '/', es: '/es' },
}).replace(
  '<meta name="description"',
  '<meta name="robots" content="noindex, nofollow" />\n  <meta name="description"',
);
fs.writeFileSync(path.join(distDir, '404.html'), notFound);

console.log(`Prerendered ${ROUTES.length} marketing routes plus 404.html`);
