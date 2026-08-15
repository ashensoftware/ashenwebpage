const base = process.argv[2] || 'http://127.0.0.1:4175';
const urls = [
  '/',
  '/es',
  '/ai-agents',
  '/es/agentes-ia',
  '/case-studies/trengie',
  '/es/privacidad',
  '/this-does-not-exist',
  '/case-studies/not-real',
];

for (const path of urls) {
  const response = await fetch(`${base}${path}`);
  const html = await response.text();
  const h1 = html.match(/<h1>[^<]+/)?.[0] ?? 'none';
  const canonical = html.match(/rel="canonical" href="[^"]+"/)?.[0] ?? 'none';
  console.log(
    `${response.status} ${path} ${h1} ${canonical} noindex=${html.includes('noindex')}`,
  );
}
