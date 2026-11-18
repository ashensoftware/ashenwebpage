import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const base = process.env.SCREENSHOT_BASE || 'http://127.0.0.1:4173';
const outDir = path.resolve('docs/qa/screenshots');
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
];

const viewports = [
  ['mobile', 390, 844],
  ['tablet', 768, 1024],
  ['desktop', 1440, 1000],
];

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

const overflows = [];

for (const [name, route] of pages) {
  for (const [label, width, height] of viewports) {
    const page = await browser.newPage();
    await page.setViewport({ width, height, deviceScaleFactor: 1 });
    await page.goto(base + route, { waitUntil: 'networkidle0', timeout: 60000 });
    const metrics = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    if (metrics.scrollWidth > metrics.clientWidth + 1) {
      overflows.push(`${name} ${label} ${metrics.scrollWidth}>${metrics.clientWidth}`);
    }
    await page.screenshot({
      path: path.join(outDir, `${name}-${label}.png`),
      fullPage: true,
    });
    await page.close();
    console.log(`captured ${name} ${label}`);
  }
}

await browser.close();
if (overflows.length) {
  console.error('Horizontal overflow:');
  for (const item of overflows) console.error(`- ${item}`);
  process.exit(1);
}
console.log('No horizontal overflow');
