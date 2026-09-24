# Briefing — transcrever o desenho claro do Elphy (design 3.0) para o site

Você trabalha SOZINHO nesta pasta: `C:\Users\rmmarera\Desktop\Club de Vantagens\elphy-site-v3`
(git worktree do repositório `elphy-site`, branch `design-3.0`). Next.js 15 App Router, TypeScript, Tailwind v4, `output: "export"` (site estático no GitHub Pages).

## Fonte da verdade
- Pranchetas em `docs/design-3.0/*.dc.html` (HTML com estilos inline; `{{...}}`, `<sc-for>`, `<sc-if>` e a classe `Component` no fim são a lógica — traduza para React).
- Prints renderizados de cada prancheta: `docs/design-3.0/v4-*.jpg` (ignore `v4-check*.jpg` e `v4-topo.jpg`).
- Celular (390 px): `Main` (início), `Achados-Mobile`, `Produto-Mobile`, `Roda-Mobile`. Computador (1440 px): `Home-Desktop`, `Achados-Desktop`, `Produto-Desktop`, `Roda-Desktop`.
- Imagens: `/_blob/a704102d…` = `/brand/elphy-heroi.webp`; `/_blob/7438ea1e…` = `/brand/elphy-carimbo.webp`; `/_blob/913d4d42…` = `/brand/elphy-controle.webp`; `/_blob/8bb90289…` = `/brand/elphy-nota-claro.webp` (já estão em `public/brand/`).

## O que construir (uma página responsiva por par de pranchetas; troca de layout em 1024 px)
1. `/` — nova home (Main + Home-Desktop). Substitui a home atual.
2. `/achados/` — lista com categorias (Celular e acessórios, Áudio, PC e setup, Casa e quarto, Estudo e trabalho), coleções (Até R$ 50, Presentes, Pra faculdade, Primeiro apê), filtros por carimbo (Vale/Depende/Deixa pra lá) funcionando no cliente; "Loja" e "Preço" podem ficar visuais.
3. `/achados/[slug]/` — página do achado (Produto-*), gerada estaticamente (`generateStaticParams`).
4. `/fc27/` — a ferramenta "Meu PC roda o FC 27?" no visual novo (Roda-*). USE a lógica e a lista real de placas de `src/lib/ferramentas/fc27.ts` (`PLACAS`, `nivel`, `VEREDITO`, `busca`) no lugar da lista de exemplo da prancheta; mostre as placas como chips + um campo de busca que usa `busca()`. Mantenha o que a página atual tem de conteúdo útil (tabela de preço das edições, fontes) abaixo da nota, no estilo novo.
- Dados dos achados: crie `src/content/achados.ts` com tipo `Achado` (slug, nome, categoria, coleções[], carimbo 'vale'|'depende'|'deixa', motivo, loja principal {nome, url, preco, frete, conferidoEm}, outrasLojas[], cupom?, videoUrl?, praQuemE, praQuemNaoE, olhamos[{rotulo, valor}], alternativa?). Preencha com os 6 exemplos das pranchetas, marcando cada um `rascunho: true`. Página e lista mostram só `rascunho: false` quando `process.env.NODE_ENV === 'production'` — ou seja, em produção a lista fica vazia com um estado vazio bonito ("Os primeiros achados carimbados chegam esta semana.") até o Rafael preencher produtos reais. Nunca invente preço, produto ou link real.
- Componentes reutilizáveis em `src/components/v3/`: `Carimbo`, `TiraAchado`, `Nota` (papel com serrilha e código de barras), `BarraInferior` (celular, fixa embaixo: Início · Achados · Ferramentas), `Cabecalho` (logo + busca; no computador com a navegação), `Rodape`.
- Estilo: tokens como variáveis CSS num arquivo novo `src/app/v3.css` (fundo #eeebe5, papel #fdfcf8, tinta #111311, apagado #55594f, lima #9dff3b, verde #2f7d0a, âmbar #ffb020, vermelho #b3261e). Fontes: Big Shoulders Display 900, Schibsted Grotesk 400–800, Martian Mono 400–700 via `next/font/google`. Respeite `prefers-reduced-motion`.
- As demais rotas existentes (ferramentas, dicas, montar-pc, peça, etc.) continuam funcionando com o visual antigo por enquanto. Se precisar, use um route group `(v3)` com layout próprio para não quebrar o resto.
- Links de afiliado: `rel="sponsored nofollow"`, `target="_blank"`. Aviso de afiliado no rodapé.
- Acessibilidade: botões reais, `aria-pressed` nos filtros, `aria-live` na nota, contraste AA.

## Regras
- NÃO rode `npm run dev` nem nada na pasta `elphy-site` original (há um servidor lá). Trabalhe só em `elphy-site-v3`.
- Pode rodar `npm ci` aqui dentro. No fim, `npm run lint` e `npm run build` precisam passar sem erro nem warning; `npm test` também.
- NÃO faça `git push`, NÃO mexa em `.github/`, `CNAME`, `next.config.ts`. NÃO apague arquivos existentes (pode deixar de usar). Commits locais na branch `design-3.0` são permitidos (mensagens em português).
- Não baixe nada além das dependências do `package.json`.

## Entrega
No fim, escreva `docs/design-3.0/ENTREGA-CODEX.md` com: rotas criadas, arquivos novos/alterados, resultado de lint/build/test (cole as últimas linhas), o que ficou diferente da prancheta e por quê, e o que falta. Responda no terminal com no máximo 8 linhas.
