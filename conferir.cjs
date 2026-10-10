// Conferencia da pagina de arame: os ids que os scripts do rodape procuram, as
// imagens que faltam e as marcacoes TROCAR que nao podem subir assim.
const fs = require('fs');
const path = require('path');

for (const arq of ['index.html', 'promo.html']) {
  const s = fs.readFileSync(arq, 'utf8');
  console.log('\n===', arq, '===');

  if (arq === 'index.html') {
    const ids = ['modelos', 'provas', 'deps', 'deps-dots', 'oferta', 'relogio',
                 'upsell', 'upsell-sim', 'upsell-nao', 'btn-essencial'];
    const faltam = ids.filter((i) => !s.includes('id="' + i + '"'));
    console.log('ids dos scripts:', faltam.length ? 'FALTAM ' + faltam.join(', ') : 'todos presentes');
    // os dois carrosseis infinitos precisam de numero PAR de figuras (leva + emenda)
    for (const id of ['modelos', 'provas']) {
      const bloco = s.slice(s.indexOf('id="' + id + '"'));
      const n = (bloco.slice(0, bloco.indexOf('</div>')).match(/<figure/g) || []).length;
      console.log('  carrossel ' + id + ': ' + n + ' figuras ' + (n % 2 ? '(IMPAR - a emenda vai pular)' : '(par, ok)'));
    }
  }

  const imgs = [...s.matchAll(/(?:src|href)="(assets\/[^"]+)"/g)].map((m) => m[1]);
  const unicas = [...new Set(imgs)];
  const semArquivo = unicas.filter((f) => !fs.existsSync(path.join(__dirname, f)));
  console.log('imagens citadas:', unicas.length, '| ainda nao existem:', semArquivo.length);
  semArquivo.forEach((f) => console.log('   falta', f));

  const trocar = [...s.matchAll(/TROCAR[\w-]*/g)].map((m) => m[0]);
  console.log('marcacoes TROCAR:', [...new Set(trocar)].join(', ') || 'nenhuma');
}
