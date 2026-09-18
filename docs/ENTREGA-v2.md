# Entrega Elphy v2

Data: 18/09/2026. Implementação concluída; build e lint finais passaram, ambos com código de saída 0 e zero warnings. Nenhum commit foi feito.

## O que foi feito

- Seis categorias exportadas estaticamente: `/celulares/`, `/tvs/`, `/audio/`, `/pc/`, `/estudo/` e `/achados-shopee/`. Categorias sem artigos têm estado vazio.
- Home com navegação horizontal de categorias, hero em duas linhas e feed único de reviews e dicas, ordenado por publicação decrescente. Cards inteiros clicáveis, com imagem, categoria, título, veredito e preço/data quando disponíveis.
- As dicas e suas URLs continuam funcionando. A categoria legada `Games` entra em `PC` no feed; o JSON original permanece intacto. Como a dica antiga não possui veredito editorial nem data de observação do preço, esses campos aparecem como `[a conferir]`, sem deduzir uma nota ou usar a publicação como data do preço.
- Novo conteúdo em `src/content/reviews/*.json`, interfaces e validação no build: campos obrigatórios, enums, datas ISO reais, preços, URLs, listas, largura das linhas da tabela, coluna Fonte, duplicidade de slugs, correspondência entre arquivo e slug e imagem local de até 200.000 bytes.
- Review `/celulares/galaxy-a36-vale-a-pena-2026/`: breadcrumb, título, `VeredictBox`, autoria/data/metodologia/disclosure, `ProductBlock`, público, comparação, limites, prós, contras, preço/histórico, alternativas, FAQ nativa, fontes, registro e `PriceAlertForm`.
- As listas “Pra quem é” e “Pra quem não é” ficam logo após o botão, conforme a exceção do briefing para preservar a primeira dobra. O veredito e o disclosure permanecem antes da oferta.
- Tabela com cabeçalhos semânticos, região acessível pelo teclado, rolagem horizontal e sombras nas bordas. FAQ usa `details/summary` e funciona sem JavaScript.
- Preço mínimo calculado a partir do histórico fornecido; o artigo informa que há uma única observação e não promete o menor preço do mercado.
- Formulário com e-mail, POST JSON `{email, produto, slug}`, estados de envio/sucesso/erro, bloqueio de envio concorrente e timeout de 15 segundos. Sem `NEXT_PUBLIC_FORM_ENDPOINT`, input e botão ficam desabilitados e aparece “Alerta de preço chega em breve.” Nenhum endpoint foi inventado.
- `.env.example` documenta o endpoint. A política de privacidade descreve o envio opcional do alerta. Não foi incluído tracking externo.
- JSON-LD com Article, BreadcrumbList, Product, Review e FAQPage. Oferta inclui BRL, preço observado, URL e data em `priceSpecification.validFrom`. Sem preço/data confirmados, a oferta é omitida. Não há `reviewRating` nem `aggregateRating`.
- Título exato do review, description do veredito, canonical por `pageMetadata` e OpenGraph com imagem do produto. Origem padrão corrigida para `https://elphy.com.br`.
- Sitemap inclui categorias, review e rotas existentes. `robots.ts` foi preservado: `User-agent: *` e `Allow: /` permitem também Googlebot, Bingbot, OAI-SearchBot e PerplexityBot.
- `AffiliateButton` mantém `trackClick` e usa `target="_blank"` e `rel="sponsored noopener noreferrer"`. As alternativas Motorola são links comuns, sem afiliado, com `noopener noreferrer`.
- Mascote pequeno apenas no cabeçalho; removidas repetições no hero, rodapé e 404. Fontes existentes mantidas; sem nova fonte, animação pesada ou script de terceiro.

## Conteúdo e fontes

Os preços foram preservados exatamente como fornecidos no briefing: Galaxy A36 por R$ 2.099, Edge 70 Fusion+ por R$ 2.969,10 à vista e Moto g17 por R$ 989,10 à vista, todos com referência de 18/09/2026. A nota 4,9 e +10 mil vendidos do ML também são dados fornecidos, explicitamente atribuídos aos compradores, nunca usados como nota própria.

Esta execução consultou a [página oficial Samsung do A36 256 GB](https://www.samsung.com/br/smartphones/galaxy-a/galaxy-a36-5g-awesome-black-256gb-sm-a366ezkgzto/) e a [página oficial Motorola do Edge 70 Fusion+](https://www.motorola.com.br/smartphone-motorola-edge-70-fusion-plus/p). Tela, bateria, carga, câmeras do A36, política de atualizações e proteção foram extraídos dessas fontes; o chip do A36 consta também das respostas oficiais Samsung Support na página. A ficha legível do Edge confirmou tela, chip, bateria, carga e IP. A página do [Moto g17](https://www.motorola.com.br/smartphone-motorola-moto-g17-256gb/p) foi acessada, mas não retornou texto técnico utilizável.

Os preços e a avaliação do Mercado Livre não foram revalidados independentemente nesta execução: são os registros verificados fornecidos pelo usuário. A frase de metodologia e o veredito pedidos foram preservados. O artigo distingue análise documental de teste físico e explica que quatro anos de vida útil não foram medidos.

Imagem copiada de `../pipeline/quadros/celulares/canny.png` para `public/produtos/galaxy-a36.png`, sem alteração: 62.824 bytes. SHA-256 idêntico na origem e no destino: `117419140991DA295E37A243A02F9BC62185DB6FCC1B617226AC90E0D10C649D`.

Nenhuma imagem nova usada no site excede 200 KB. O PNG antigo do mascote, já acima desse limite, foi preservado em `public/` como exigido; o site e o OpenGraph genérico usam o WebP existente.

## O que ficou [a conferir]

- Garantia e conteúdo exato da caixa do anúncio do A36. A fonte informa que o carregador de 45 W é vendido separadamente, o que não permite concluir sozinho tudo que vem na caixa.
- FPS, aquecimento, autonomia e resultado prático do zoom/câmeras: não houve unidade em mãos.
- Ficha técnica do Moto g17, não recuperada na fonte oficial.
- Política de atualizações do Edge 70 Fusion+ e conjunto exato de câmeras/zoom: a própria página Motorola apresenta informações divergentes sobre a teleobjetiva. A tabela não transforma essas divergências em certeza.
- Veredito e data do preço da dica legada, ausentes no seu modelo de conteúdo.
- URL do vídeo específico: foi mantido o perfil TikTok e identificado como perfil.
- Link de afiliado específico do A36: mantida exatamente a URL de catálogo solicitada, sem parâmetros inventados.
- Ativação real dos alertas depende de configurar `NEXT_PUBLIC_FORM_ENDPOINT` e gerar novo build. Não há serviço de monitoramento/envio de e-mails implantado por esta entrega.

## Verificação

### Build e lint

Executados na raiz do projeto, novamente após os últimos ajustes:

```text
npm run build
✓ Compiled successfully
✓ Generating static pages (16/16)
✓ Exporting (2/2)
Exit code: 0; warnings: 0

npm run lint
eslint . --max-warnings=0
Exit code: 0; warnings: 0
```

O build confirmou a exportação das seis categorias, do review e da dica existente. First Load JS informado pelo Next: 112 kB na home e 113 kB no review. Não foi executado Lighthouse; esses tamanhos não são uma pontuação de performance.

`git diff --check` passou. Não há alterações em `.github/`, `next.config.ts` ou CNAME. Nenhum arquivo de `public/` foi apagado. `npm run dev` não foi executado e o servidor externo da porta 3005 não foi usado nem alterado.

### Teste visual solicitado: botão acima da dobra em 375px

Foi servido o diretório exportado `out/` por um servidor HTTP temporário, somente em `127.0.0.1`, numa porta livre. Chrome headless via Playwright abriu o review com viewport **375 × 667 CSS px**, DPR 1 e `scrollY=0`. Aguardei as fontes e a imagem carregarem, capturei a tela e inspecionei visualmente a captura. A medição do elemento confirmou:

```text
Botão: x=33, y=434, largura=309, altura=56
Borda inferior: y=490
Limite da viewport: y=667
Folga abaixo do botão: 177 px
Rolagem inicial: 0
Largura do documento: 375 px
Resultado: PASSOU, botão inteiro visível sem rolar.
```

A repetição com JavaScript desativado também encontrou a borda inferior em y=490. É uma verificação visual da captura e de geometria em Chrome emulado, não um teste físico no navegador interno do TikTok.

Evidências:

- [Review em 375×667](evidencias-v2/review-375x667.png)
- [Home em 375×667](evidencias-v2/home-375x667.png)
- [Review desktop](evidencias-v2/review-desktop.png)

### Demais verificações

- Home, seis categorias e dica legada carregaram: oito rotas, cada uma com um H1 e sem overflow horizontal em 375px.
- Review sem overflow horizontal da página em 320, 375, 768 e 1280px; a tabela mantém sua própria rolagem.
- Nenhum erro de execução registrado pelo navegador durante essas verificações.
- Home ordenada com o review de 18/09 antes da dica de 17/09; apenas um mascote no review.
- Título e canonical exatos, cinco tipos JSON-LD, oferta de R$ 2.099 e ausência de notas inventadas conferidos no HTML exportado.
- Com JavaScript desativado, quatro perguntas da FAQ, nove linhas comparativas e botão continuam presentes. A FAQ abriu com `details` nativo.
- Sem endpoint, input e botão de alerta desabilitados no navegador.
- Validação de conteúdo: 36 casos inválidos rejeitados, incluindo remoção de campos obrigatórios, categoria/metodologia inválidas, data impossível, atualização anterior à publicação, preço negativo, URL insegura, caminho de imagem fora de `public/` e linha incompatível com a tabela.
- JSON-LD sem oferta quando preço ou data são `[a conferir]`.
- Handler real do formulário exercitado em teste isolado, com hooks e `fetch` simulados: nenhum envio sem endpoint; POST com payload exato; e-mail normalizado; sucesso; erro HTTP; bloqueio de submissão concorrente. Nenhum e-mail ou pedido foi enviado a serviço externo. A integração com um provedor real não foi testada, pois não há endpoint configurado.

O servidor HTTP e o navegador temporários foram encerrados. Entrega local, sem commit ou publicação.
