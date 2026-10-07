// Local static preview with the configured security headers. Never deploy this server.
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';
const root = resolve('dist');
const config = JSON.parse(await readFile('vercel.json', 'utf8'));
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.mp4': 'video/mp4', '.xml': 'application/xml', '.ico': 'image/x-icon' };
http.createServer(async (req, res) => {
  try {
    const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let target = resolve(root, `.${path}`);
    if (target !== root && !target.startsWith(`${root}${sep}`)) { res.writeHead(403); res.end(); return; }
    try { if ((await stat(target)).isDirectory()) target = resolve(target, 'index.html'); }
    catch { target = resolve(target, 'index.html'); }
    const body = await readFile(target);
    for (const header of config.headers[0].headers) res.setHeader(header.key, header.value);
    res.setHeader('Content-Type', types[extname(target)] || 'application/octet-stream');
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch { res.writeHead(404); res.end('Not found'); }
}).listen(4324, '127.0.0.1', () => console.log('Security preview: http://127.0.0.1:4324'));
