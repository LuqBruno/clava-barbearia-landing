import { mkdir, cp, readFile, writeFile } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const dest = new URL('../dist/', import.meta.url);
await mkdir(dest, { recursive: true });
for (const file of ['index.html', 'robots.txt', 'src', 'public']) {
  await cp(new URL(file, root), new URL(file, dest), { recursive: true });
}
// O GitHub Pages publica o conteúdo de dist em uma subpasta do domínio.
// Convertemos apenas a cópia de produção para caminhos relativos, mantendo a
// prévia local e sua estrutura original intactas.
const builtIndex = new URL('../dist/index.html', import.meta.url);
const html = await readFile(builtIndex, 'utf8');
await writeFile(builtIndex, html.replaceAll('"/public/', '"public/').replaceAll('"/src/', '"src/'));
console.log('Prévia estática gerada em dist. Não publicada.');
