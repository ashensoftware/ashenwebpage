import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE_ORIGIN, canonicalUrl, getIndexableRoutes } from '../src/config/site-registry.mjs';

const KEY = 'c0b294412adf4bb1a1fb642da46e2cc9';
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function shouldSubmit() {
  return process.env.VERCEL_ENV === 'production' || process.env.INDEXNOW_FORCE === '1';
}

function urlsToSubmit() {
  const override = process.env.INDEXNOW_URLS?.split(',').map((item) => item.trim()).filter(Boolean);
  if (override?.length) return override;
  return getIndexableRoutes().map((route) => canonicalUrl(route.path));
}

function explain(status) {
  const reasons = {
    200: 'URL list accepted',
    202: 'Accepted; key validation still pending',
    400: 'Bad request. Check host, key, and urlList format',
    403: 'Key rejected. The key file must be reachable and contain the key',
    422: 'URLs do not belong to the host, or the key does not match the file',
    429: 'Rate limited. Retry later. Do not resubmit immediately',
  };
  return reasons[status] || `Unexpected status ${status}`;
}

const keyFile = path.join(rootDir, 'public', `${KEY}.txt`);
const keyBody = fs.existsSync(keyFile) ? fs.readFileSync(keyFile, 'utf8').trim() : '';

if (!shouldSubmit()) {
  console.log('IndexNow skipped. Submissions run only when VERCEL_ENV=production or INDEXNOW_FORCE=1.');
  process.exit(0);
}

if (keyBody !== KEY) {
  console.error(`IndexNow key file missing or mismatched: public/${KEY}.txt`);
  process.exit(0);
}

const urlList = urlsToSubmit();
const host = new URL(SITE_ORIGIN).host;
const payload = {
  host,
  key: KEY,
  keyLocation: `${SITE_ORIGIN}/${KEY}.txt`,
  urlList,
};

console.log(`IndexNow submitting ${urlList.length} URLs to ${ENDPOINT}`);
console.log('Strategy: full indexable set. The site is small and shared layout changes affect every URL. Set INDEXNOW_URLS to submit a subset.');

try {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });
  const body = await response.text();
  console.log(`IndexNow ${response.status}: ${explain(response.status)}`);
  if (body) console.log(body.slice(0, 500));
  if (![200, 202].includes(response.status)) {
    console.error('IndexNow did not accept the submission. Deployment continues.');
  }
} catch (error) {
  console.error('IndexNow request failed. Deployment continues.');
  console.error(error instanceof Error ? error.message : error);
}

process.exit(0);
