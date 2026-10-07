import { readFile, writeFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

// Astro emits inline island bootstrap code. Hash built code instead of allowing
// arbitrary inline scripts; the report-only policy is regenerated on each build.
async function files(path) {
  const entries = await readdir(path, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? files(join(path, entry.name)) : join(path, entry.name)))).flat();
}
const hashes = new Set();
for (const file of (await files('dist')).filter(file => file.endsWith('.html'))) {
  const html = await readFile(file, 'utf8');
  for (const [, attributes, code] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (!/\bsrc\s*=/.test(attributes) && code.trim()) hashes.add(`'sha256-${createHash('sha256').update(code).digest('base64')}'`);
  }
}
const config = JSON.parse(await readFile('vercel.json', 'utf8'));
const policy = config.headers[0].headers.find(header => header.key === 'Content-Security-Policy-Report-Only');
policy.value = policy.value.replace(/script-src [^;]+/, `script-src 'self' ${[...hashes].sort().join(' ')} https://challenges.cloudflare.com https://www.googletagmanager.com https://*.google.com https://*.googleadservices.com https://*.doubleclick.net`);
await writeFile('vercel.json', `${JSON.stringify(config, null, 2)}\n`);
console.log(`CSP report-only: ${hashes.size} inline script hashes generated.`);
