# Elphy — Design System v1 (17/09/2026)

## Marca
- Nome: **Elphy**. Tagline: **Dica sem caô**. Frase-mãe: "Cupons e reviews sem passar pano."
- Mascote: elefante verde-limão, óculos redondos na testa, moletom preto, joinha + celular (`public/brand/elphy-mascot.png`).
- Voz: direta, jovem, honesta, engraçada sem forçar. Nunca: "imperdível", "clique já", "melhor do Brasil", "garantido".

## Tokens
```
--bg-0: #0b0f14   (fundo)
--bg-1: #121a22   (cartão)
--bg-2: #1a2430   (cartão elevado / hover)
--line: rgba(255,255,255,.08)
--fg-0: #f3f6f8   (texto)
--fg-1: #aab4bf   (texto secundário)
--lime: #9dff3b   (ação, destaque)
--lime-2: #d8ffd8 (destaque suave)
--lime-ink: #0b0f14 (texto sobre lime)
--warn: #ffd23f   (cupom / atenção)
--danger: #ff5c6c (contras)
radius: 16px (cartão), 999px (pill), 12px (botão)
sombra: 0 10px 30px rgba(0,0,0,.35)
```
Modo claro: não existe na v1. Só escuro.

## Tipografia
- Display: **Space Grotesk** 700 (títulos) — Google Fonts, com fallback system-ui.
- Texto: **Inter** 400/500/600.
- Escala (mobile): h1 40/44, h2 28/32, h3 20/26, corpo 17/26, small 14/20. Desktop: h1 56/60.

## Layout
- Mobile-first. Container máx. 680px (leitura) / 1080px (home grid em desktop).
- Gutter 20px. Seções com 48px de respiro no mobile, 80px desktop.
- Botão primário: lime, texto escuro, 56px de altura, largura total no mobile, ícone ↗ à direita.
- Botão secundário: borda `--line`, texto claro.

## Componentes
1. **Header**: mascote 40px + "Elphy." + tagline pequena; link "Sobre". Sticky, fundo `--bg-0` 90% + blur.
2. **Hero (home)**: eyebrow "A DICA É ESSA." (lime, tracking 0.12em) → h1 "Cupons e reviews **sem passar pano**." → mascote grande à direita (desktop) / abaixo (mobile).
3. **DicaCard**: número, categoria (pill), título, 1 linha de gancho, "Ver a dica ↗". Hover: eleva para `--bg-2`.
4. **ProductBlock**: imagem (aspect 1:1, fundo `--bg-2`, placeholder "FOTO DO PRODUTO" se ausente), nome, preço (`--warn` se houver cupom), **CouponPill** (só se houver cupom: "CUPOM: XXXX" com botão copiar), **AffiliateButton** "Ver no Mercado Livre ↗".
5. **ReviewBlocks**: 3 blocos "Pra quem é" / "O que tem de bom" (lista ✅) / "O que não é" (lista ❌ em `--danger`). Se um item vier vazio, mostra "[a conferir]" em `--fg-1`, nunca esconde.
6. **Alternativas**: 2 ProductBlock menores, rotulados "Mais barata" / "Mais cara".
7. **AdDisclosure**: faixa fina acima da dobra em toda página com link: "Publicidade · link de afiliado · podemos receber comissão".
8. **Footer**: mascote 32px, disclosure completo, links Sobre / Política de privacidade / contato (mailto placeholder), assinatura "Dica sem caô."

## Regras de conteúdo
- Nenhum dado de produto no código: tudo em `content/dicas/*.json` (ou .ts) e lido em build.
- Campos vazios renderizam "[a conferir]" — nunca inventar.
- Todo link de afiliado: `rel="nofollow sponsored noopener"`, `target="_blank"`, passa por `trackClick`.

## Acessibilidade e performance
- Contraste AA em tudo (lime sobre `--bg-0` passa; texto `--fg-1` mínimo 4.5:1).
- Imagens com `alt`. Foco visível (outline lime 2px).
- Lighthouse mobile ≥ 90 em performance. Sem JS de terceiros na v1 (analytics depois).
