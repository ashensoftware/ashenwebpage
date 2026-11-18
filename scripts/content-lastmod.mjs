import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const CONTENT_PATHS = [
  'src/languages',
  'src/pages',
  'src/features',
  'src/content',
  'src/components',
  'src/config',
  'public/assets',
  'index.html',
];

/** Commit date of the newest content change. Null when git history is unavailable. */
export function contentLastmod() {
  try {
    const iso = execSync(`git log -1 --format=%cI -- ${CONTENT_PATHS.join(' ')}`, {
      cwd: rootDir,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    if (!/^\d{4}-\d{2}-\d{2}/.test(iso)) return null;
    return iso.slice(0, 10);
  } catch {
    return null;
  }
}
