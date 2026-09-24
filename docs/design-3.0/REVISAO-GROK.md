# Revisão — design 3.0

`git diff main --stat` vazio. A branch `design-3.0` está no mesmo commit que `main` (`0762a28`). Não existe `docs/design-3.0/ENTREGA-CODEX.md`. Nada em `src/` foi criado ou alterado. O que há são as pranchetas. Os itens abaixo são o que a implementação tem de corrigir ao nascer; copiar o HTML como está publica erro.

1. **`src/app/page.tsx:13` — home nova não existe.** A rota `/` ainda monta `HomeMobile` / `HomeDesktop` do visual antigo. Não há `src/app/v3.css`, `src/components/v3/` nem `src/content/achados.ts`. Correção: uma página responsiva por par (troca em 1024 px) para `/`, `/achados/`, `/achados/[slug]/` (`generateStaticParams`) e `/fc27/`, com route group `(v3)` se o layout for próprio. Rotas já existentes (`/ferramentas/*`, `/dicas/`, `/montar-pc/`, `/peca/`, `/metodologia/`, `/correcoes/`) continuam no visual antigo.

2. **`Roda-Mobile.dc.html:130` — FC 27 ignora a lista real.** O script declara 9 placas e um `nivel` local (`:150`), sem campo de busca. `src/lib/ferramentas/fc27.ts:11` proíbe mostrar o índice; a nota em `:64` imprime `força {{indice}}`. Não há a tabela de edições que `src/components/dz/Fc27.tsx:17` já tem. Correção: chips a partir de `PLACAS`, input que chama `busca()`, selo e texto de `VEREDITO[nivel(i)]`, sem exibir `i`. Abaixo da nota, a tabela Standard / Ultimate / Ultimate Plus (console e PC) e as fontes, no visual novo. O botão de `:101` não faz nada: usar o compartilhamento de `Fc27.tsx:45` (`navigator.share`, senão clipboard).

3. **`Achados-Mobile.dc.html:73` — link de loja real, e errado.** Todo botão de compra aponta para `https://shopee.com.br/` com só `rel="sponsored"`. O rótulo “Ver na Mercado Livre” em `Main.dc.html:106` e “Ver na Amazon” / “Ver na TikTok Shop” em `Produto-Desktop.dc.html:100` e `:117` também caem na Shopee. Correção: `href` só da url do achado; `rel="sponsored nofollow"` e `target="_blank"`. Sem url real, não renderizar o botão. Preço, produto e link reais são proibidos.

4. **`Achados-Mobile.dc.html:109` — exemplos sem rascunho e coleções com contagem inventada.** Os 6 itens não têm `rascunho: true` nem `coleções`. As tiras em `:44` dizem “4 achados”, “3 achados”, “5 achados”, “3 achados” e o `href` é a própria página. Correção: `src/content/achados.ts` com o tipo do briefing, os 6 exemplos `rascunho: true` e placeholders (`[MODELO]`, `R$ [PREÇO]`). Em `NODE_ENV === 'production'`, lista e página só mostram `rascunho: false`. Lista vazia: “Os primeiros achados carimbados chegam esta semana.” Contagem da coleção = itens daquela coleção, não número fixo.

5. **`Main.dc.html:135` — as quatro ferramentas abrem a mesma prancheta.** “Qual fonte eu preciso?”, “Power bank de verdade” e “Conta de luz do setup” apontam para `Roda-Mobile.dc.html`. Correção: `/fc27/`, `/ferramentas/fonte/`, `/ferramentas/power-bank/`, `/ferramentas/conta-de-luz/`. A aba Ferramentas da barra (`Main.dc.html:147`) vai para `/ferramentas/`, não para `/fc27/`.

6. **`Main.dc.html:143` — rodapé quebra metodologia e correções.** “Como a gente carimba” e “Correções” apontam os dois para `Main.dc.html`. O mesmo em `Roda-Mobile.dc.html:115` e `Home-Desktop.dc.html:132`. Correção: `/metodologia/` e `/correcoes/`.

7. **`Main.dc.html:25` — canvas fixo, sem 1024 px.** `width: 390px; height: 2520px; overflow: hidden`. `Home-Desktop.dc.html:25` é `1440×2080` com o mesmo `overflow: hidden`. A barra (`Main.dc.html:146`) é `sticky` dentro de um bloco que não rola, então não fica fixa. Correção: layout fluido; abaixo de 1024 px o celular (barra `position: fixed` embaixo: Início · Achados · Ferramentas); de 1024 px para cima o desktop (nav no cabeçalho, sem barra inferior). Sem altura travada.

8. **`Main.dc.html:56` — filtro da home é mentira.** `aria-pressed` estático e `renderVals` em `:153` devolve `{}`. Os botões não filtram. Correção: na home, categoria leva a `/achados/` já filtrada, ou vira link sem `aria-pressed`. Em `/achados/`, portar o filtro de `Achados-Mobile.dc.html:118` (categoria + carimbo, `aria-pressed`, toggle do selo). “Loja” e “Preço” podem ficar visuais. Estado vazio do filtro também precisa de texto, não de uma seção em branco.

9. **`Achados-Mobile.dc.html:80` — carimbo invisível para leitor de tela.** O veredito está em `aria-hidden="true"`. O mesmo no selo da nota (`Roda-Mobile.dc.html:93`). Correção: o carimbo do card é texto real (pode ser visualmente rotacionado). O selo da nota entra no `aria-live="polite"` que já está em `:56`, com a palavra do veredito.

10. **`Achados-Mobile.dc.html:125` — chip ativo fora do token.** Texto do selecionado é `#efede6`; o fundo do site é `#eeebe5` e o papel é `#fdfcf8`. Correção: selecionado `background: #111311; color: #eeebe5; border: 2px solid #111311`. Tokens só esses: fundo `#eeebe5`, papel `#fdfcf8`, tinta `#111311`, apagado `#55594f`, lima `#9dff3b`, verde `#2f7d0a`, âmbar `#ffb020`, vermelho `#b3261e`.

11. **`Main.dc.html:34` — `transform` duplicado no carimbo.** `rotate(-7deg)` e, no mesmo `style`, `rotate(-4deg)` / `rotate(3deg)` / `rotate(-2deg)`. O segundo ganha; o primeiro é lixo. Correção: um `transform` só, o ângulo que a prancheta mostra (−4°, +3°, −2° na legenda; −7° no carimbo do card).

12. **`Main.dc.html:28` — busca do topo não busca.** O input não tem `form` nem ação. Correção: submit vai para `/busca/?q=`.

13. **`Achados-Mobile.dc.html:68` — “Copiar” não copia.** Botão sem handler. Correção: `navigator.clipboard.writeText` do código do cupom e texto do botão vira “Copiado”. Sem código real (placeholder), não mostrar a tira.

14. **`Roda-Mobile.dc.html:61` — data e hora inventadas na nota.** `24/09/2026 · 14:24` está cravado, e o número da nota é o índice da placa (`:161`). Correção: não imprimir hora fictícia nem o índice. Código `ELPHY-FC27-` + `placa.id`. Manter o aviso de estimativa e `prefers-reduced-motion` (já está em `:22`).

15. **`Produto-Mobile.dc.html:42` — página de achado é um único HTML, não uma rota por slug.** Os seis nomes de `Achados-Mobile.dc.html:110-115` abrem sempre `Produto-Mobile.dc.html`. Correção: `/achados/[slug]/` gerado dos registros com `rascunho: false`; em produção, slug de rascunho cai no 404. Foto placeholder `[FOTO]` não entra em produção.
