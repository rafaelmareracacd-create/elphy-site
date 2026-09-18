# Elphy v2 — briefing de implementação (18/09/2026)

Projeto: `C:\Users\rmmarera\Desktop\Club de Vantagens\elphy-site` (Next.js 15 App Router, TS, Tailwind v4, `output: "export"`, GitHub Pages, domínio elphy.com.br já no ar). Leia `docs/DESIGN.md` e `src/lib/content.ts` antes. Rode `npm run build` e `npm run lint` no fim; os dois têm que passar com zero warnings. Não rode `npm run dev` (há um dev server externo na porta 3005). Não apague nada em `public/`. Não mexa em `.github/`, `CNAME`, `next.config.ts`.

## Alvo (o que "pronto" significa)
Layout Wirecutter + velocidade máxima + acabamento Gumroad/Linear (escuro, uma cor de destaque `--lime`, tipografia grande). Mobile-first: 90% do tráfego vem do navegador interno do TikTok. Tudo com um polegar. Sem animação pesada, sem script de terceiro, sem hero gigante. CTA "Ver no Mercado Livre" visível SEM rolar na página de review (mobile 375px).

## 1. Estrutura nova
Categorias (rotas estáticas): `/celulares/`, `/tvs/`, `/audio/`, `/pc/`, `/estudo/`, `/achados-shopee/`. Cada categoria lista os artigos dela (cards). Home = feed de todos os artigos, mais recentes primeiro, + faixa de categorias no topo.

Tipo de conteúdo novo, `src/content/reviews/<slug>.json` (mantenha o tipo `dicas` existente funcionando), com validação em `content.ts` no mesmo estilo (throw se faltar campo). Campos:

```
slug, titulo (a pergunta que a pessoa digita, ex.: "Galaxy A36 vale a pena em 2026?"), categoria (uma das 6),
veredito { resposta: "Sim"|"Não"|"Depende", frase (1 linha), paraQuem: string[], paraQuemNao: string[] },
autor { nome, papel }, publicadoEm, atualizadoEm, metodologia: "testado" | "analise-documental", metodologiaTexto,
produto { nome, variante, imagem, link (afiliado), loja, precoObservado, precoData (ISO), precoHistorico: [{data, preco, fonte}], cupom, garantia },
tabela { colunas: string[], linhas: string[][] }   // comparativo com fonte
pros: string[], contras: string[], oQueNaoE: string[],
alternativas: [{ rotulo: "Mais barata"|"Mais cara"|"Parecida", nome, preco, link, porQue }],
faq: [{ pergunta, resposta }],
fontes: [{ titulo, url, data }],
changelog: [{ data, texto }],
video?: url do TikTok
```

## 2. Página de review (`/[categoria]/[slug]/`) — ordem fixa, Wirecutter
1. Breadcrumb (Home › Categoria).
2. H1 = titulo. Abaixo, **VeredictBox**: "Sim/Não/Depende" grande em lime + frase + "Pra quem é" / "Pra quem não é" (duas listas curtas).
3. Linha de confiança: autor · "atualizado em {atualizadoEm}" · selo de metodologia ("Testado" ou "Análise documental — sem unidade em mãos") · `AdDisclosure` existente.
4. **ProductBlock** com foto, nome/variante, "R$ X em {loja} · visto em {precoData}" e o botão primário `AffiliateButton` (já existe; use `rel="sponsored noopener"`). Este bloco tem de caber acima da dobra em 375×667 junto com o veredito (teste: sem rolar, botão visível). Se precisar, o veredito fica compacto (2 linhas) e "pra quem é/não é" vai logo depois do botão.
5. Tabela comparativa (`tabela`) — responsiva: no mobile vira cards ou scroll horizontal com sombra indicando scroll.
6. "O que não é" (danger) → "Prós" → "Contras".
7. Preço observado + histórico ("menor preço observado desde {primeira data}: R$ …") — texto, sem gráfico.
8. Alternativas (cards com botão secundário).
9. FAQ (details/summary nativo, sem JS).
10. Fontes (lista com data) e "Registro de alterações".
11. Bloco final: **PriceAlertForm** — "Me avisa quando baixar": input e-mail + botão. Envia `POST` para `process.env.NEXT_PUBLIC_FORM_ENDPOINT` (Formspree ou similar) com `{email, produto, slug}`. Se a env estiver vazia, renderize o formulário desabilitado com texto "Alerta de preço chega em breve." Não invente endpoint. Sem tracking externo.

## 3. SEO / IA
- JSON-LD por review: `Article` (headline, author Person, datePublished, dateModified), `BreadcrumbList`, `Product` + `Review` (author, reviewRating só se houver nota própria — NÃO inventar nota; omitir `aggregateRating`), `FAQPage`. `Offer` só com `precoObservado` e `precoData` reais, `priceCurrency: "BRL"`, `url` = link.
- `<title>` = titulo; description = veredito.frase. Canonical via `pageMetadata` existente. OpenGraph com a imagem do produto.
- Sitemap inclui categorias e reviews. `robots.ts` mantém tudo liberado (Googlebot, Bingbot, OAI-SearchBot, PerplexityBot).
- Links de afiliado: `rel="sponsored noopener noreferrer"`, `target="_blank"`. Chamar `trackClick` existente.
- Todo conteúdo no HTML estático (nada carregado por JS).
- `next/font` já em uso; não adicionar fonte nova. Sem imagem acima de 200 KB.

## 4. Primeiro artigo — dados verificados (NÃO altere números; se algo faltar, escreva "[a conferir]")
`src/content/reviews/galaxy-a36-vale-a-pena-2026.json`, categoria `celulares`:
- titulo: "Galaxy A36 5G vale a pena em 2026?"
- veredito: "Sim" — "Pra quem quer um celular que dura 4 anos sem pagar preço de iPhone." paraQuem: estudante/uso diário, câmera boa pra rede social, 6 anos de atualização Android. paraQuemNao: quem joga pesado, quem quer carregamento muito rápido, quem quer o melhor zoom.
- autor: { nome: "Rafael", papel: "Editor do Elphy" }; publicadoEm/atualizadoEm: 2026-09-18; metodologia: "analise-documental"; metodologiaTexto: "Preços e fichas conferidos nas páginas oficiais e no Mercado Livre em 18/09/2026. Ainda não testamos a unidade."
- produto: nome "Samsung Galaxy A36 5G", variante "256 GB · 8 GB RAM · preto", imagem "/produtos/galaxy-a36.png" (copie `..\pipeline\quadros\celulares\canny.png` para `public/produtos/galaxy-a36.png`), link "https://www.mercadolivre.com.br/p/MLB47111905" (link de afiliado entra depois — deixe assim), loja "Mercado Livre", precoObservado 2099, precoData "2026-09-18", precoHistorico [{data:"2026-09-18", preco:2099, fonte:"Mercado Livre, catálogo MLB47111905"}], cupom "", garantia "[a conferir]".
- Nota do ML: 4,9 com +10 mil vendidos (pode citar no texto como "nota dos compradores no Mercado Livre", NÃO como reviewRating próprio).
- Ficha técnica: busque na página oficial samsung.com/br do Galaxy A36 5G (tela, chip, bateria, carregamento, câmeras, anos de atualização, IP). Coloque na `tabela` com a coluna "Fonte". O que não achar: "[a conferir]".
- Tabela comparativa: Galaxy A36 5G (R$ 2.099, ML 18/09) vs Motorola Edge 70 Fusion+ (R$ 2.969,10 à vista na loja Motorola, 18/09/2026) vs Motorola Moto g17 256 GB (R$ 989,10 à vista, loja Motorola, 18/09/2026). Specs dos Motorola: só o que achar na motorola.com.br; senão "[a conferir]".
- alternativas: "Mais barata" Moto g17 (link https://www.motorola.com.br/smartphone-motorola-moto-g17-256gb/p, sem afiliado), "Mais cara" Edge 70 Fusion+ (https://www.motorola.com.br/smartphone-motorola-edge-70-fusion-plus/p).
- faq: 4 perguntas reais ("Tem carregador na caixa?", "Quantos anos de atualização?", "É resistente à água?", "Roda jogo pesado?") — responda só com dado de fonte; senão "[a conferir]".
- fontes: as URLs usadas, com data 2026-09-18.
- video: "https://www.tiktok.com/@planetadosestudos" (o vídeo específico entra depois).
- Tom: direto, jovem, honesto; frases curtas; nada de "imperdível", "melhor do Brasil".

## 5. Home
- Faixa de categorias (pills) no topo; feed de cards (reviews + dicas) com: imagem pequena, categoria, título (pergunta), veredito em 1 palavra (Sim/Não/Depende) em lime, preço observado + data. Card inteiro clicável.
- Hero atual encolhe: eyebrow + h1 em 2 linhas + 1 frase. Mascote 1 vez por página, pequeno.

## 6. Entrega
Ao terminar, escreva `docs/ENTREGA-v2.md`: o que foi feito, o que ficou "[a conferir]", como conferiu build/lint, e o resultado de um teste manual de "botão acima da dobra em 375px" (descreva como verificou). Não faça commit.
