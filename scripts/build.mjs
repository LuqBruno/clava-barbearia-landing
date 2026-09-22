import { mkdir, cp } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const dest = new URL('../dist/', import.meta.url);
await mkdir(dest, { recursive: true });
for (const file of ['index.html', 'robots.txt', 'src', 'public']) {
  await cp(new URL(file, root), new URL(file, dest), { recursive: true });
}
console.log('Prévia estática gerada em dist. Não publicada.');
