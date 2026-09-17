# Elphy · Dica sem caô

Next.js 15, App Router, TypeScript e Tailwind CSS v4. Design em `docs/DESIGN.md`.

## Desenvolvimento e validação

```sh
npm ci
npm run dev
npm run lint
npm run build
```

O build gera `out/`, incluindo HTML de todas as dicas, `404.html`, `sitemap.xml`, `robots.txt` e `.nojekyll`. Não precisa de servidor Node em produção. `npm start` não é compatível com exportação estática; use `npm run dev` para desenvolvimento ou sirva `out/` com um servidor estático disponível na máquina.

## Conteúdo

Cada arquivo `src/content/dicas/*.json` gera uma rota `/dicas/<slug>/`. O esquema TypeScript e sua validação ficam em `src/lib/content.ts`. Slugs devem ser únicos, em minúsculas e separados por hífens. Arquivos inválidos interrompem o build.

Preencher os placeholders apenas com informações verificadas: título, gancho, categoria, vídeo, data, produto, preço, foto, URL de afiliado, público, pontos positivos e limitações. Confirmar os preços relativos das duas alternativas. Datas podem ser escritas em formato legível; não se inventa uma data de atualização no sitemap.

Fotos: caminho local começando com `/` (arquivo em `public/`) ou URL HTTP(S). Imagem ausente ou placeholder exibe “FOTO DO PRODUTO”. Campos de texto e listas vazios exibem `[a conferir]`. Sem cupom confirmado, use `"cupom": ""`; o placeholder inicial aparece como pendente e não pode ser copiado. Cupom real habilita a cópia. Se o navegador bloquear o clipboard, o texto permanece disponível para seleção manual.

Os únicos componentes client são `AffiliateButton` e `CouponPill`. Cliques abrem nova aba e incrementam `elphy:clicks:<id>` no localStorage. Nenhum contador é enviado. Conteúdo, links e navegação também estão no HTML estático; sem JavaScript, os links abrem normalmente, sem contagem.

## Configuração antes da publicação

Copie `.env.example` para `.env.local` e configure `NEXT_PUBLIC_SITE_URL` com a origem final, por exemplo `https://usuario.github.io`, sem caminho. O padrão `https://elphy.example` é um placeholder. Defina `NEXT_PUBLIC_BASE_PATH=/elphy-site` para GitHub Pages de projeto; deixe vazio na Vercel ou em domínio próprio. Refaça o build sempre que mudar essas variáveis. Links internos, assets, Open Graph, sitemap e robots acompanham o prefixo.

O arquivo `public/.nojekyll` acompanha a exportação para permitir os assets de `_next` no GitHub Pages. Na Vercel, use o build Next.js e a saída estática. Nenhum deploy ou workflow de publicação é criado aqui.

Substitua o responsável em `src/app/sobre/page.tsx` e `contactEmail` em `src/lib/site.ts`. O mascote original foi preservado em `public/brand/elphy-mascot.png` e é usado no Open Graph.

As páginas usam a cópia comprimida `elphy-mascot.webp`, gerada com o `sharp` já incluído nas dependências do Next. O override de PostCSS atualiza essa dependência transitiva do Next.js 15 sem mudar a stack ou adicionar bibliotecas.

As fontes Google são baixadas pelo `next/font` durante o build e servidas pelo próprio site. O build precisa de acesso à rede para a primeira obtenção das fontes; visitantes não fazem chamadas ao Google Fonts.
