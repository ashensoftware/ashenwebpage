import { describe, expect, it } from 'vitest';
import en from '@/languages/en/translation.json';
import es from '@/languages/es/translation.json';
import ja from '@/languages/ja/translation.json';

const FILLER = /lorem ipsum|\bTODO\b|\bTBD\b|\bFIXME\b|\[translation\]|未翻訳|翻訳予定|placeholder translation/i;
const JAPANESE = /[\u3040-\u30ff\u3400-\u9fff]/;
const ALLOW_LATIN = new Set([
  'Ashen Software',
  'Trengie',
  'Medellín',
  'Formspree',
  'WhatsApp',
  'TypeScript',
  'React',
  'Python',
  'Node.js',
  'API',
  'CRM',
  'ERP',
  'ISO',
  'Email',
  'IoT',
  'SaaS',
  'NDA',
  'SEO',
]);

function interpolations(value: string): string {
  return [...value.matchAll(/\{\{\s*([^{}]+?)\s*\}\}/g)].map((match) => match[1]).sort().join('|');
}

function walk(enNode: unknown, esNode: unknown, jaNode: unknown, path: string, errors: string[]) {
  const kind = Array.isArray(enNode) ? 'array' : enNode === null ? 'null' : typeof enNode;
  const esKind = Array.isArray(esNode) ? 'array' : esNode === null ? 'null' : typeof esNode;
  const jaKind = Array.isArray(jaNode) ? 'array' : jaNode === null ? 'null' : typeof jaNode;
  if (kind !== esKind || kind !== jaKind) {
    errors.push(`${path} type ${kind} / ${esKind} / ${jaKind}`);
    return;
  }

  if (Array.isArray(enNode) && Array.isArray(esNode) && Array.isArray(jaNode)) {
    if (enNode.length !== esNode.length || enNode.length !== jaNode.length) {
      errors.push(`${path} length ${enNode.length} / ${esNode.length} / ${jaNode.length}`);
      return;
    }
    enNode.forEach((item, index) => walk(item, esNode[index], jaNode[index], `${path}[${index}]`, errors));
    return;
  }

  if (kind === 'object') {
    const enKeys = Object.keys(enNode as object).sort();
    const esKeys = Object.keys(esNode as object).sort();
    const jaKeys = Object.keys(jaNode as object).sort();
    if (enKeys.join('|') !== esKeys.join('|') || enKeys.join('|') !== jaKeys.join('|')) {
      errors.push(`${path} keys differ`);
      return;
    }
    for (const key of enKeys) {
      walk(
        (enNode as Record<string, unknown>)[key],
        (esNode as Record<string, unknown>)[key],
        (jaNode as Record<string, unknown>)[key],
        `${path}.${key}`,
        errors,
      );
    }
    return;
  }

  if (typeof enNode !== 'string' || typeof esNode !== 'string' || typeof jaNode !== 'string') return;
  if (!enNode.trim() || !esNode.trim() || !jaNode.trim()) errors.push(`${path} is empty`);
  if (FILLER.test(jaNode) || FILLER.test(enNode) || FILLER.test(esNode)) errors.push(`${path} looks like filler`);
  if (interpolations(enNode) !== interpolations(esNode) || interpolations(enNode) !== interpolations(jaNode)) {
    errors.push(`${path} interpolations differ`);
  }
  if (jaNode.includes('{{') && !/\{\{\s*[^{}]+\s*\}\}/.test(jaNode)) errors.push(`${path} has a broken interpolation`);
  if (jaNode.length >= 8 && !JAPANESE.test(jaNode) && !ALLOW_LATIN.has(jaNode)) {
    errors.push(`${path} has no Japanese text: ${jaNode}`);
  }
  if (jaNode === enNode && jaNode.length >= 8 && !ALLOW_LATIN.has(jaNode)) {
    errors.push(`${path} is still the English source`);
  }
}

describe('translation catalogs', () => {
  it('keeps EN, ES, and JA structurally aligned and complete', () => {
    const errors: string[] = [];
    walk(en, es, ja, 'translation', errors);
    expect(errors).toEqual([]);
  });
});
