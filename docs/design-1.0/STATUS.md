# Transcrição do desenho — estado por prancheta

Estados: **pendente** → **feito** (transcrito e ligado) → **conferido** (comparado lado a lado, sem diferença aberta).
Comparação (Git Bash, com `MSYS_NO_PATHCONV=1 NODE_PATH=../pipeline/hf-test/node_modules`, site em :3005):
- `node scripts/mede.js <Prancheta> <rota> <largura> <.dz-m|.dz-d>` — posição, tamanho, fonte e cor de cada texto; lista o que diverge (>3 px).
- `node scripts/compara.js <Prancheta> <rota> <largura>` — imagens lado a lado em `docs/design-1.0/_compara/`.
Gerar componente: `python scripts/gera_dz.py <Prancheta> <Componente> [client]`.
Fora: Comparar-Mobile (depois do lançamento), Sistema (não é página), Nota-OG (vira a imagem OG, não rota).

| Prancheta | Rota | Estado | Diferenças abertas |
|---|---|---|---|
| Home-Mobile | / (celular) | conferido 23/09 | nenhuma. Correção de propósito: "550 W" não quebra linha (no desenho caía em duas). |
| Main | / (computador) | conferido 23/09 | nenhuma (mede: 0 de 208 textos) |
| Menu-Mobile | menu aberto (todas) e /ferramentas/ no celular | conferido 23/09 | só as de propósito: "Comparar celulares" = em breve; linha do TikTok vazia até ter o @; altura = tela |
| Ferramenta-Mobile | /ferramentas/fonte/ (celular) | conferido 23/09 | nenhuma (mede 0/88). "Por que a gente faz assim" aponta para /metodologia/. |
| Fonte-Desktop | /ferramentas/fonte/ (computador) | conferido 23/09 | nenhuma (mede 0/93) |
| Ferramentas-Desktop | /ferramentas/ (computador) | conferido 23/09 | só a de propósito: card Comparar apagado, "em breve" |
| SSD-Mobile | /ferramentas/ssd/ | conferido 23/09 | nenhuma (mede 0/55) |
| PowerBank-Mobile | /ferramentas/power-bank/ | conferido 23/09 | nenhuma (mede 0/76); cliques testados |
| Luz-Mobile | /ferramentas/conta-de-luz/ | conferido 23/09 | nenhuma (mede 0/78); cliques testados |
| Monitor-Mobile | /ferramentas/monitor/ | conferido 23/09 | nenhuma (mede 0/62); cliques testados |
| Gabinete-Mobile | /ferramentas/gabinete/ | conferido 23/09 | nenhuma (mede 0/86); cliques testados |
| Memoria-Mobile | /ferramentas/memoria/ | conferido 23/09 | nenhuma (mede 0/52); cliques testados |
| Montador-Mobile | /montador/ (celular) | conferido 23/09 | de propósito: Shopee apagado ("Links da Shopee em breve") até o catálogo ter links; endereço da montagem é o real (/montador/link/?…), numa linha com reticências |
| Montador | /montador/ (computador) | conferido 23/09 | as mesmas de propósito do celular; nota 18 px mais curta (endereço numa linha); menu Celular/Estudo/Casa aponta para power bank, dicas e luz |
| Montagem-Link-Mobile | /montador/link/?cpu=…&mae=…&mem=…&gpu=…&gab=…&psu=… | conferido 23/09 | de propósito: a nota vem do link (no desenho era fixa); "[data]" = DATA_CATALOGO, vazio → "de exemplo, ainda não conferido" |
| Dica-Mobile | /dicas/rtx-5070-250w/ | conferido 23/09 | nenhuma (mede 0/42); watts e conta vêm do catálogo; de propósito: "Como o Elphy faz a conta" vai para /metodologia/ (no desenho ia para a home); a rota antiga /dicas/[slug] (JSON, headset-wolverine) foi incorporada na mesma página |
| Dicas-Lista | /dicas/ | conferido 23/09 | nenhuma (mede 0/54); filtro testado (Celular → 2 dicas); de propósito: só a dica da RTX 5070 tem texto, as outras 9 levam à ferramenta da conta (src/lib/dicas.ts) |
| Busca-Mobile | /busca/?q=… | conferido 23/09 | nenhuma (mede 0/32 com q=fonte 5070); busca de verdade no navegador (src/lib/busca.ts): conta pronta quando acha a placa, ferramentas, ficha da placa, dicas; toda palavra tem que achar algo ("fonte 9999" → 0); o estado sem resultado de Estados-Mobile está aqui |
| Peca-Mobile | /peca/[id]/ (9 placas do catálogo) | conferido 23/09 | só a de propósito: Shopee apagado ("Links da Shopee em breve") até o catálogo ter link; watts e fonte vêm do catálogo; selo vira "Conferido em …" quando a placa for verificada e DATA_CATALOGO existir |
| Metodologia-Mobile | /metodologia/ | conferido 23/09 | nenhuma (mede 0/36) |
| Correcoes-Mobile | /correcoes/ | conferido 23/09 | de propósito: sem servidor, o envio abre o e-mail da pessoa; tela "Quase lá · falta enviar" no lugar de "Recebido · protocolo" |
| Sobre-Mobile | /sobre/ | conferido 23/09 | nenhuma (mede 0/21) |
| Legal-Mobile | /legal/ | conferido 23/09 | nenhuma (mede 0/23); /legal/#afiliado abre a aba |
| Estados-Mobile | 404 (not-found.tsx), carregando (loading.tsx), busca vazia (/busca/), formulário falhou | conferido 23/09 | nenhuma (mede: estados 1, 2 e 4 só deslocados pela faixa "Estado N" do desenho, que é anotação); de propósito: rótulo do cabeçalho é "404"/"Imprimindo" (no desenho, "Estados"); estado 4 (FormFalhou em src/components/dz/Estados.tsx) pronto mas sem uso: o formulário de correções abre o e-mail, não tem como falhar até existir servidor (decisão do Supabase) |
| Nota-Estados-Mobile | regras da nota, não é página | conferido 23/09 | caso 1 (conta ruim): o montador já segue a regra (selo âmbar, "não compre ainda", n/4, peça marcada); o texto e o botão "Trocar a fonte" do caso 1 não entram porque mudariam a prancheta Montador, já conferida; caso 2 (peça sem ficha → sem número) espera o catálogo conferido: hoje todas as placas têm verificado:false e a regra apagaria todas as contas (decisão do Rafael); caso 3 (número digitado inválido) não se aplica: nenhuma ferramenta tem campo digitado, todas usam botões |
| Nota-OG | /opengraph-image | conferido 23/09 | comparada lado a lado (docs/design-1.0/_compara/og-site.png); conta vem do catálogo; fontes do desenho via Google Fonts na hora do build; de propósito: "550 W" numa linha (no desenho quebra, o mesmo defeito da home) e endereço real elphy.com.br/ferramentas/fonte (no desenho, /fonte, que não existe); pontilhado e linha dupla desenhados à mão (o gerador não aceita dotted/double) |

## Revisão do Grok 4.7 (23/09) — corrigido, difere do desenho de propósito
Achados conferidos no código e no navegador; o que mudou em relação à prancheta:
- Busca: "ssd 1tb", "ryzen 5", "9070", "7800", "12400" acham; processador sozinho vira resultado (abre a fonte com ele); dica com modelo só entra se for da peça buscada.
- Fonte: o degrau cobre a conta sem arredondar (308 W × 1,3 = 400,4 → 450, era 400). Muda só RX 9060 XT + Ryzen 5 5600/7600. Montador confere a fonte pelo mesmo número.
- HTML e primeiro quadro das ferramentas já com o número da conta (antes 0 W / 0,00).
- Escolha vai para a URL (?gpu=…); a árvore de celular/computador que aparece ao cruzar 1024 px relê. F5 não perde a escolha.
- Link de montagem só aparece depois de ler a URL (antes mostrava a montagem padrão "4 de 4").
- Botões: "Abrindo o WhatsApp" (era "Nota copiada" sem copiar); "Nota copiada"/"Link copiado" só se a área de transferência aceitou.
- SSD: carimbo −7% (o desenho cortava 6,87 para 6). Monitor: cm pela PPI arredondada da nota. Memória: selo "DDR5" sobre o teto DDR5; dica usa i7-14700K; Intel 13ª/14ª avisa i5 sem K em 4.800.
- Textos: "só entra no Elphy a fonte"; "responder a você"; power bank manda à ficha do fabricante (Ajustes › Sobre não mostra mAh); card do gabinete "+5 / A menor sobra: 5 mm".
- Links: breadcrumb e "Todas as dicas" → /dicas/; dica Ryzen 5000 → memória ?plat=r5000; dica 27" → monitor ?pol=27&res=fhd; ficha da placa → fonte com a placa; "Como a gente mede" → /metodologia/; "Como ganhamos dinheiro" → /legal/#afiliado; "Cabe no gabinete?" ligado; "Comparar telas de celular" vira "em breve".
- Acessibilidade: skip link com alvo (#conteudo) em todas as páginas; anel de foco na cápsula da busca; menu prende o foco e devolve ao botão; Legal com h2, abas com painel e hash; busca e /ferramentas/ (celular) com h1; área de toque maior nos links de rodapé; chip escolhido rola para dentro da tela.
- Ferramentas (computador): filtro por departamento funciona. Letreiro da home no celular usa o catálogo inteiro.
- SEO: 404 sem canonical /404/ e noindex; og:image com barra final.
Não mexido (não era erro): carimbo da luz em reais inteiros (R$ 46 ≈ R$ 45,90); "Consumo com folga 517 W" no montador (é o consumo, não a fonte); alt da imagem OG igual em todas as páginas (é a mesma imagem).

## Conteúdo que falta (só o Rafael sabe) — bloqueia publicar
- Sobre: `[Seu nome, ou "uma pessoa só"]`, `[cidade]`, `[e-mail de contato]`, `[@ do canal]`.
- Legal: `[nome ou CNPJ]`, `[e-mail de contato]`. `contactEmail` em src/lib/site.ts ainda é contato@example.com (o formulário de correções usa ele).
- Correções: a linha de exemplo da lista (`[data]`, `[página]`, `[valor antigo]`, `[valor novo]`, `[o que mudou]`) e o prazo da correção.
- `TIKTOK` em src/lib/site.ts.
- Fichas das placas (/peca/…): conector de energia, memória de vídeo, comprimento e link da ficha oficial de cada placa (hoje `[da ficha oficial]` etc., como no desenho).
- Decisão: ligar a regra "sem ficha, sem número" (Nota-Estados caso 2) só depois de conferir os watts do catálogo.
- Dicas: texto das 9 dicas da lista que ainda levam à ferramenta (src/lib/dicas.ts); na da RTX 5070, `[data]` da conferência e os dois links das fichas oficiais (RTX 5070, Ryzen 5 7600).
- `DATA_CATALOGO` em src/lib/catalogo.ts (data da conferência do catálogo).
- Links de afiliado da Shopee no catálogo do montador (campo `url` de cada peça em src/data/pc.json).
- Catálogo: todos os watts com verificado:false (src/data/pc.json).

## Regras aprendidas nesta transcrição
- Classes do desenho viram `dz-*` (o CSS do Grok tem `.el-rolo` etc. sem escopo e desalinha).
- Links internos viram `<Link>` (scripts/link_dz.py, já no gera_dz.py).
- Fontes: as mesmas do desenho pelo Google Fonts (layout.tsx), não o next/font.
- Git Bash: sempre `MSYS_NO_PATHCONV=1`, senão a rota "/" vira caminho do Windows.
