# Funil — +100 Projetos de Brincos de Arame

Página de vendas do low ticket de arame (wire wrapping), modelada em
`funis/brincos-micanga`. Mesmo CSS, mesmos scripts, mesma arquitetura de oferta —
a copy e o mecanismo foram reescritos inteiros.

```
index.html     página de vendas
promo.html     oferta de saída (back redirect da index)
servidor.cjs   servidor local:  node servidor.cjs  →  http://localhost:4180
vercel.json    cleanUrls + cache dos assets
conferir.cjs   confere ids, carrosséis, imagens que faltam e marcações TROCAR
corpo.html     rascunho do corpo, usado para montar a index — pode apagar
```

---

## Antes de subir — 7 coisas que ainda faltam

Nada aqui é opcional. A página está completa de copy e de código, mas tem buracos
de conteúdo que não dá para subir como estão.

1. **Os 4 checkouts.** Estão como `TROCAR-CHECKOUT-ESSENCIAL` (R$ 10),
   `TROCAR-CHECKOUT-COMPLETA` (R$ 25,90), `TROCAR-CHECKOUT-POPUP` (R$ 16,90) e, no
   `promo.html`, `TROCAR-CHECKOUT-SAIDA` (R$ 8,90). São quatro links **diferentes** —
   o popup tem checkout próprio, não é o link do plano Completo.
2. **O seletor do back redirect.** A index tem
   `a[href*="pay.wiapy.com"]:not(#btn-essencial)`. Ele só funciona se os checkouts
   forem mesmo do `pay.wiapy.com`. Se o gateway for outro, trocar o domínio no
   seletor — senão a página de saída dispara em cima de quem está indo pagar.
3. **O domínio da página de saída.** `const link = 'https://TROCAR-DOMINIO.vercel.app/promo'`.
4. **Os 6 bônus não existem.** A seção de bônus, as 6 linhas do plano Completo e as
   6 linhas do popup prometem material que ainda não foi produzido. Ou produzir os
   seis, ou cortar a seção inteira (e as duas listas) e vender só a coleção.
5. **A prova de mercado é faixa, não anúncio.** Os quatro preços da coluna da
   direita estão `TROCAR — anúncio real N`. A faixa R$ 60–190 veio da pesquisa
   (par autoral em cobre no Elo7 e Mercado Livre), mas número de mercado sem print
   por trás não se sustenta. Coletar os 4 preços + 6 prints, e anotar a data no
   comentário da seção, como foi feito na miçanga (04/09/2026).
6. **Os depoimentos são placeholder.** 5 prints de conversa de verdade, ou cortar a
   seção. Depoimento inventado não entra.
7. **E-mail e CNPJ no rodapé** das duas páginas.

Rodar `node conferir.cjs` lista o que falta de imagem e toda marcação `TROCAR`.

---

## O mecanismo é outro — e isso muda a página inteira

Esta é a diferença que separa esta página da de miçanga. A apostila de miçanga
entrega **gráfico de fileira** (o desenho quadriculado, miçanga por miçanga, com
legenda de cores). A de arame **não tem gráfico** — entrega:

| miçanga | arame |
|---|---|
| gráfico de fileira | **molde em tamanho real** (apoia o arame em cima e dobra na linha) |
| legenda de cores | **tabela de corte** em centímetros + bitola em milímetro |
| lista de materiais | mapa da peça (o nome de cada parte) |
| 7 passos ilustrados | **10 quadros de montagem**, com foto das mãos |
| 1 página por projeto | **2 páginas** por projeto |

Toda a copy foi reescrita em cima disso: as dores são *não sei quanto cortar*,
*não sei qual arame comprar*, *o par não sai igual* — e não *não consigo enxergar
a contagem*. A promessa também mudou de ângulo: brinco de arame **não parece
artesanato, parece joia**, e é por isso que a peça vende caro sem pechincha.

---

## Números que a página afirma

Mantê-los consistentes entre página, criativos e produto:

- **mais de 100 projetos** — existem 112; os 12 extras ficam de fora da promessa
- **54 fáceis · 40 médios · 18 avançados** (= 112)
- **10 quadros** de montagem por projeto
- **R$ 10** de material por par (arame 0,8 e 0,4 mm, ganchos de inox, pedra quando
  o modelo pede)
- **R$ 68** nos três alicates (bico redondo, bico chato, corte) — compra única
- **40 minutos** por par depois de pegar o jeito

---

## Estrutura da página

barra de urgência → hero → dores (3) → amostras (carrossel) → desejo (4 usos) →
o que você recebe (anatomia da página, 6 pontos) → quanto vale (conta + carrossel
de provas) → bônus (6 + "os 6 vão juntos") → depoimentos (carrossel em leque) →
oferta (2 planos + popup) → garantia → FAQ (8) → fecho → rodapé

---

## Popup de upsell

Quem clica no plano de R$ 10 **não vai direto ao checkout**: abre o popup com a
Coleção Completa a R$ 16,90. Quem recusa segue para o checkout do básico.

A parte delicada é o back redirect. O handler global marca
`window.__indoParaCheckout = true` em todo link de checkout, para sair da página
rumo ao pagamento não disparar a oferta de saída. O botão do Essencial fica **de
fora** desse seletor (`:not(#btn-essencial)`) e o `abrir()` do popup desmarca a
flag — senão quem vê o popup e desiste sai da página sem receber a oferta de saída.

---

## Os carrosséis

**Os dois que deslizam sozinhos** (`#modelos` e `#provas`): as imagens aparecem
**duas vezes**. A segunda leva é a emenda que faz o `scrollLeft` voltar ao começo
sem a pessoa perceber. Ao trocar imagens, trocar **nas duas levas** — `conferir.cjs`
avisa se o número de figuras ficar ímpar. Não dá para usar animação CSS aqui: ela
brigaria com o scroll nativo e mataria o arraste.

**O de depoimentos** (`#deps`) é diferente: anda de um em um e **para** em cada
print, porque a pessoa precisa de tempo para ler a conversa. 4,2 s em cada.

---

## Paleta

Os **nomes** das variáveis CSS são os mesmos da miçanga (são ~300 referências no
arquivo), só os **valores** do coral mudaram para o cobre do arame:

```
--coral: #E5446E → #B35A26   (cobre)
--coral-esc: #C32E56 → #8E4419
--coral-nevoa: #FDEFF3 → #FBF1E9
```

O `--turq` (petróleo), o `--mostarda` e o `--verde` dos CTAs ficaram como estavam:
combinam com cobre e já estão calibrados para contraste.

---

## Assets que a página espera

```
assets/hero.webp                  1100×1100  mulher usando o par + segurando a apostila
assets/pagina-e-pecas.webp        1400×883   página impressa ao lado das peças prontas
assets/amostras/m01..m12.webp      560×792   páginas de projeto (12)
assets/provas/venda-01..06.webp    520×794   prints de anúncio (6)
assets/bonus/b0..b5-*.webp         680×383   capas dos bônus (6)
assets/depoimentos/dep-01..05.webp 560×1059  prints de conversa (5)
```

Quando existirem as versões estreitas (`-420`, `-700`, `assets/amostras-sm/` etc.),
devolver os `srcset`/`sizes` e o `imagesrcset` do preload do hero como estão na
página de miçanga — o hero é a maior imagem do primeiro quadro.
