import fs from 'fs';
import path from 'path';
import { pathToFileURL, fileURLToPath } from 'url';
import { getIndexableRoutes } from '../src/config/site-registry.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const serverEntry = path.resolve(__dirname, '../.ssr/entry-server.js');
const indexPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexPath) || !fs.existsSync(serverEntry)) {
  console.error('Missing dist/index.html or .ssr/entry-server.js. Run both Vite builds first.');
  process.exit(1);
}

const { render } = await import(pathToFileURL(serverEntry).href);
const template = fs.readFileSync(indexPath, 'utf8');

function pageHtml(url) {
  const { html, helmet } = render(url);
  if (!helmet) throw new Error(`Helmet did not render for ${url}`);

  let next = template.replace(/<title>[\s\S]*?<\/title>/g, '');
  next = next.replace(/<html[^>]*>/, `<html ${helmet.htmlAttributes.toString()}>`);
  const head = [
    helmet.title.toString(),
    helmet.meta.toString(),
    helmet.link.toString(),
    helmet.script.toString(),
  ].join('\n');
  next = next.replace('<!--seo-->', head);
  if (!next.includes('id="root"')) throw new Error('Missing #root');
  next = next.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${html}</div>`);
  return next;
}

function writePage(urlPath, html) {
  if (urlPath === '/') {
    fs.writeFileSync(indexPath, html);
    return;
  }
  const targetDir = path.join(distDir, urlPath);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), html);
}

const routes = getIndexableRoutes();
for (const route of routes) {
  const html = pageHtml(route.path);
  const text = html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ');
  if ((html.match(/<h1[\s>]/g) || []).length < 1) {
    throw new Error(`Prerender for ${route.path} has no H1`);
  }
  if (text.trim().length < 400) {
    throw new Error(`Prerender for ${route.path} looks too thin (${text.trim().length} chars)`);
  }
  writePage(route.path, html);
}

const notFound = pageHtml('/this-route-does-not-exist');
fs.writeFileSync(path.join(distDir, '404.html'), notFound);
console.log(`Prerendered ${routes.length} routes plus 404.html`);
