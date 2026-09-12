import { readFile, access } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../dist');
const html = await readFile(resolve(root, 'index.html'), 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
const seen = new Set();
for (const id of ids) {
  if (seen.has(id)) throw new Error(`Duplicate HTML ID: ${id}`);
  seen.add(id);
}
let files = 0;
for (const [, url] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  if (/^(?:https?:|mailto:|data:)/.test(url)) continue;
  if (url.startsWith('#')) {
    if (!seen.has(url.slice(1))) throw new Error(`Broken section link: ${url}`);
  } else {
    await access(resolve(root, url.split(/[?#]/, 1)[0]));
    files++;
  }
}
const projectIds = ['ai-exchange', 'governance', 'edunet', 'safety', 'deepfake', 'soulsound'];
for (const project of projectIds) {
  if (!html.includes(`data-project="${project}"`)) throw new Error(`Missing project: ${project}`);
}
console.log(`Passed: ${seen.size} unique IDs, section links, ${files} local asset references, and ${projectIds.length} project buttons.`);
