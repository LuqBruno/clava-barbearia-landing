import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const port = Number(process.env.PORT || 3005);
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.ttf': 'font/ttf', '.txt': 'text/plain; charset=utf-8' };
createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const allowed = pathname === '/' || pathname === '/index.html' || pathname === '/robots.txt' || pathname.startsWith('/src/') || pathname.startsWith('/public/');
    const file = resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!allowed || !file.startsWith(resolve(root) + sep)) { res.writeHead(404).end('Não encontrado'); return; }
    if (!(await stat(file)).isFile()) throw new Error('not-file');
    res.writeHead(200, { 'Content-Type': mime[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow', 'X-Content-Type-Options': 'nosniff' });
    res.end(await readFile(file));
  } catch { res.writeHead(404).end('Não encontrado'); }
}).listen(port, '127.0.0.1', () => console.log(`Clava — prévia local: http://localhost:${port}`));
