# Entrega — design 3.0

Trabalho do **Codex + Cursor (Fable 5)**. O Codex implementou o grosso do design 3.0 e parou por cota antes de fechar; o Cursor (Fable 5) terminou: corrigiu o script `npm test` (flag `--experimental-default-type=module` não existe no Node 24), consertou o harness de revisão visual (`scripts/verifica-v3.cjs` não resolvia React nos shims de `next/*` e quebrava com `process is not defined`), adicionou `build/**` aos ignores do ESLint (o harness gera `build/v3-review/` e o lint passou a varrer o bundle), rodou lint/build/test e o harness até o PASS, escreveu esta entrega e fez o commit.

## Rotas criadas / trocadas para o visual novo
- `/` — home nova (Main + Home-Desktop), responsiva com troca em 1024 px.
- `/achados/` — lista com categorias, coleções, filtros por carimbo (Vale/Depende/Deixa pra lá) e busca, tudo no cliente; "Loja" e "Preço" visuais.
- `/achados/[slug]/` — página do achado (Produto-*), `generateStaticParams`, rascunho cai em 404 em produção.
- `/fc27/` — visual novo (Roda-*) usando a base real de `src/lib/ferramentas/fc27.ts` (`PLACAS`, `nivel`, `VEREDITO`, `busca`): chips + campo de busca, nota com selo, tabela das três edições e fontes abaixo.
- Demais rotas (`/ferramentas/*`, `/dicas/`, `/montar-pc/`, `/peca/`, etc.) seguem no visual antigo, verificadas pelo harness.

## Arquivos novos
- `src/app/v3.css` (tokens e estilos, 380 linhas), `src/app/achados/{layout,page,[slug]/page}.tsx`
- `src/components/v3/`: `BarraInferior`, `Cabecalho`, `Carimbo`, `Cupom`, `Estrutura`, `Fc27`, `Fc27Referencia`, `Home`, `Icone`, `ListaAchados`, `Nota`, `Oferta`, `Produto`, `Rodape`, `TiraAchado`
- `src/content/achados.ts` (tipo `Achado` + 6 exemplos `rascunho: true`, sem preço/link real), `src/lib/achados.ts` (filtros), `src/lib/v3.test.ts` (12 testes)
- `public/brand/elphy-{heroi,carimbo,controle,nota-claro}.webp`, `scripts/verifica-v3.cjs` (harness de revisão local, opcional)

## Arquivos alterados
- `src/app/page.tsx` e `src/app/fc27/page.tsx` (trocam para os componentes v3), `package.json` (script `test`), `eslint.config.mjs` (ignora `build/**`).

## Lint / build / test
```
> eslint . --max-warnings=0        (sem erro, sem warning)

● /achados/[slug]  … /achados/_sem-achados
○ /fc27 … ✓ build sem erro nem warning (output: export)

ℹ tests 12  ℹ pass 12  ℹ fail 0
```
Harness visual (`node scripts/verifica-v3.cjs`):
```
PASS: 24 combinações de rota/largura (320, 390, 1024 e 1440), 12 capturas, filtros combinados,
busca sem acentos, FC 27 busca/seleção/URL/reload, reduced-motion, quatro rotas antigas e
rascunho 404. Zero erros de página.
```

## O que ficou diferente da prancheta e por quê
- Canvas fixo (390/1440 px, `overflow: hidden`) virou layout fluido com troca em 1024 px; barra inferior `position: fixed` só no celular.
- Links da prancheta que apontavam para a própria prancheta ou para a Shopee viraram rotas reais; botão de compra só renderiza com URL real (hoje nenhuma — placeholders `R$ [PREÇO]`).
- A nota do FC 27 não imprime índice, data nem hora fictícia; código é `ELPHY-FC27-` + id da placa. A lista de 9 placas de exemplo virou a base real com busca.
- Carimbo e selo são texto real para leitor de tela (`aria-live` na nota); chip ativo usa os tokens (`#111311`/`#eeebe5`), não o `#efede6` da prancheta.
- Contagem das coleções é calculada dos dados, não fixa.

## Correções da revisão (REVISAO-GROK.md, item por item)
1. Home/rotas inexistentes → criadas (`/`, `/achados/`, `/achados/[slug]/`, `/fc27/`), rotas antigas preservadas. ✔
2. FC 27 com lista fake → usa `PLACAS`/`busca()`/`VEREDITO[nivel(i)]` sem exibir `i`; tabela de edições e fontes em `Fc27Referencia`; compartilhar com `navigator.share`/clipboard. ✔
3. Link Shopee fixo → sem URL real não há botão; quando houver, `rel="sponsored nofollow"` + `target="_blank"`. ✔ (testado em `v3.test.ts`)
4. Exemplos sem rascunho → 6 exemplos `rascunho: true`, placeholders, lista vazia em produção com estado vazio ("Os primeiros achados carimbados chegam esta semana."); contagem real por coleção. ✔
5. Ferramentas apontando para a mesma prancheta → `/fc27/`, `/ferramentas/fonte/`, `/ferramentas/power-bank/`, `/ferramentas/conta-de-luz/`; aba da barra vai para `/ferramentas/`. ✔
6. Rodapé → `/metodologia/` e `/correcoes/`. ✔
7. Canvas travado → layout fluido, barra fixa no celular (ver seção acima). ✔
8. Filtro falso da home → categorias da home são links para `/achados/` filtrada; em `/achados/` o filtro é real com `aria-pressed`. ✔ (harness clica e confere)
9. Carimbo `aria-hidden` → texto real; veredito entra no `aria-live="polite"` da nota. ✔
10. Chip ativo fora do token → `#111311` sobre `#eeebe5`. ✔
11. `transform` duplicado → um único `transform` por elemento. ✔
12. Busca do topo → form com submit para a busca. ✔
13. "Copiar" sem handler → `navigator.clipboard.writeText` + "Copiado"; sem código real a tira não aparece. ✔
14. Data/hora inventadas na nota → removidas; código `ELPHY-FC27-` + `placa.id`; aviso de estimativa e `prefers-reduced-motion` mantidos. ✔
15. Produto único → rota por slug; rascunho em produção → 404 (harness confere o 404). ✔

## O que falta
- Rafael preencher achados reais (`rascunho: false` com nome, preço, frete, URL e data conferida) — até lá a lista pública mostra o estado vazio.
- Foto real dos produtos (hoje placeholder que não vai a produção) e código de cupom real.
- Se quiser rodar o harness em outra máquina: ele usa esbuild/puppeteer-core de `../pipeline/hf-test/node_modules` (configurável via `V3_REVIEW_MODULES`) e o Chrome instalado (`V3_REVIEW_CHROME`).
