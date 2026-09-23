OBJETIVO: implementar a onda 1 do Elphy 1.0 no Next.js, fiel ao desenho aprovado. Não é para publicar.

PASTA DO PROJETO: C:\Users\rmmarera\Desktop\Club de Vantagens\elphy-site (Next.js 15.5, React 19, Tailwind 4, Windows).
DESENHO APROVADO: docs\design-1.0\*.dc.html. Cada arquivo é HTML com estilos inline e um bloco <script type="text/x-dc"> com a lógica. {{campo}} vem de renderVals(). Use como especificação visual e de comportamento; não copie o runtime x-dc.
Mascote: public\brand\elphy-mascot.webp (no desenho aparece como /_blob/082ff...).

ESCOPO (só isto):
1. src\lib\contas.ts: as 7 fórmulas num lugar só, funções puras com teste. Use as fórmulas de docs\design-1.0\Metodologia-Mobile.dc.html: fonte, power bank, SSD, luz, monitor, gabinete, memória. Fonte: (placa + CPU + 60 W) × 1,3, depois o próximo degrau de [400,450,500,550,600,650,700,750,850,1000,1200,1300,1600]. Reaproveite src\lib\psu.ts se bater.
2. O componente Nota (cupom): impressora, papel com serrilha, linhas pontilhadas, total, código de barras, selo, animações el-imprime, el-linha e el-carimba, e prefers-reduced-motion. Regra do selo: lima quando tudo passa, âmbar quando algo falha, sem selo quando falta dado (ver Nota-Estados-Mobile.dc.html). Toda nota leva a linha "Estimativa pela fórmula da metodologia. Não garante compatibilidade."
3. Páginas:
   - / (Main e Home-Mobile)
   - /ferramentas/fonte (Ferramenta-Mobile e Fonte-Desktop)
   - /ferramentas/ssd (SSD-Mobile)
   - /montador (Montador e Montador-Mobile); as 6 peças vão na URL (?cpu=&mae=&mem=&gpu=&gab=&psu=), e abrir o link reconstrói a nota
   - /metodologia
   - /correcoes (formulário só visual, sem envio real)
   - /sobre e /legal (texto como está, com os [colchetes] visíveis)
   - 404 (Estados-Mobile)
   Celular primeiro, 390 px; computador a 1440 px.
4. Tokens do Sistema.dc.html em globals.css: #050607 fundo, #eef2ee texto, #9dff3b lima, #ffb020 âmbar, #f3f1ea papel, #111311 tinta; fontes Big Shoulders Display, Schibsted Grotesk e Martian Mono via next/font. Substitua o bloco "Montar PC: o aparelho" e o CalculadoraFonte.tsx atual (desenho recusado). Faça backup .bak antes de sobrescrever.
5. Metadados: title e description únicos por página, og:image estática no padrão de Nota-OG.dc.html, e sitemap e robots atualizados.

REGRAS DURAS:
- Não apagar arquivo. Não renomear sem backup. Não fazer git push, deploy nem mexer na Vercel ou no domínio.
- Não inventar número. Os dados vêm de src\data\pc.json. Peça com verificado:false aparece com o aviso "catálogo de exemplo, a conferir". Não marque nada como verificado.
- Não criar conta, não usar senha, não chamar API paga.
- Botão da Shopee: use o link do JSON se existir. Se não existir, o botão fica desabilitado com o texto "link em breve". Ao lado de todo botão da Shopee vai o aviso de afiliado que está no desenho.
- Sem preço em lugar nenhum.
- Nunca rode npm run build com npm run dev aberto, porque corrompe a pasta .next. Para testar: pare o dev, rode npm run build e depois npm run lint.
- Acessibilidade: button e a de verdade, alvo de toque de 44 px ou mais, contraste 4.5:1.
- Não mexa no comparador de celulares nem no nome ou na conta do power bank.

PRONTO QUANDO:
- npm run build passa sem erro e npm run lint passa sem erro;
- os testes de contas.ts passam, com estes casos: RTX 5070 + R5 7600 dá 550 W; 1 TB dá 931 GB; 27" QHD dá 109 PPI; 450 W × 4 h × R$0,85 dá R$ 45,90; placa de 300 mm em gabinete de 320 mm sobra 20 mm; Ryzen 7000 dá DDR5-5200; o montador com 7800X3D + 5080 + fonte 550 W dá 3 de 4 com selo âmbar.

RESPOSTA FINAL (curta):
1. arquivos criados, alterados e com backup;
2. saída resumida do build, do lint e dos testes;
3. o que ficou diferente do desenho e por quê;
4. o que não foi feito.
Não escreva "pronto" sem a saída do build. Se travar numa decisão de produto, pare e pergunte.
