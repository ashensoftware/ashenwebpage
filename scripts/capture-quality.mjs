import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const base = process.env.SCREENSHOT_BASE || 'http://127.0.0.1:4173';
const outDir = path.resolve(process.env.SCREENSHOT_DIR || 'docs/qa/before');
fs.mkdirSync(outDir, { recursive: true });

const pages = [
  ['home-en', '/'],
  ['home-es', '/es'],
  ['ai-agents', '/ai-agents'],
  ['software', '/software-development'],
  ['data-ai', '/data-ai-engineering'],
  ['integrations', '/integrations'],
  ['trengie', '/case-studies/trengie'],
  ['about', '/about'],
  ['contact', '/#contact'],
];

const viewports = [
  ['mobile', 390, 844],
  ['tablet', 768, 1024],
  ['desktop', 1440, 1000],
  ['wide', 1920, 1080],
];

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

const overflows = [];

async function shoot(page, name) {
  const metrics = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  if (metrics.scrollWidth > metrics.clientWidth + 1) {
    overflows.push(`${name} ${metrics.scrollWidth}>${metrics.clientWidth}`);
  }
  await page.screenshot({ path: path.join(outDir, `${name}.png`), fullPage: true });
  console.log(`captured ${name}`);
}

for (const [name, route] of pages) {
  for (const [label, width, height] of viewports) {
    const page = await browser.newPage();
    await page.setViewport({ width, height, deviceScaleFactor: 1 });
    await page.goto(base + route, { waitUntil: 'networkidle0', timeout: 60000 });
    await shoot(page, `${name}-${label}-dark`);
    await page.close();
  }
}

for (const [name, route] of [['home-en', '/'], ['ai-agents', '/ai-agents']]) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
  await page.goto(base + route, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.click('button[aria-label="Toggle color theme"]');
  await new Promise((resolve) => setTimeout(resolve, 300));
  await shoot(page, `${name}-desktop-light`);
  await page.close();
}

const menu = await browser.newPage();
await menu.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
await menu.goto(base + '/', { waitUntil: 'networkidle0', timeout: 60000 });
await menu.click('button[aria-label="Open menu"]');
await new Promise((resolve) => setTimeout(resolve, 200));
await menu.screenshot({ path: path.join(outDir, 'home-en-mobile-menu.png') });
console.log('captured mobile menu');
await menu.close();

const dropdown = await browser.newPage();
await dropdown.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
await dropdown.goto(base + '/', { waitUntil: 'networkidle0', timeout: 60000 });
await dropdown.hover('nav[aria-label="Primary"] a[href="/#services"]');
await new Promise((resolve) => setTimeout(resolve, 300));
await dropdown.screenshot({ path: path.join(outDir, 'home-en-services-dropdown.png') });
console.log('captured services dropdown');
await dropdown.close();

const short = await browser.newPage();
await short.setViewport({ width: 1280, height: 720, deviceScaleFactor: 1 });
await short.goto(base + '/', { waitUntil: 'networkidle0', timeout: 60000 });
await short.screenshot({ path: path.join(outDir, 'home-en-laptop-short-dark.png') });
console.log('captured home-en-laptop-short-dark');
await short.close();

await browser.close();
if (overflows.length) {
  console.error('Horizontal overflow:');
  for (const item of overflows) console.error(`- ${item}`);
  process.exit(1);
}
console.log('No horizontal overflow');
