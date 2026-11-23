# Casa do Elphy (página inicial do elphy.com.br)

Página estática "Elphy | Dinheiro que cai na conta". NÃO edite à mão: ela é gerada por
`site-elphy/casa/gerar.mjs --publicar` (no projeto do dono), a partir de `calendario.json`
(só datas conferidas nas fontes oficiais).

No deploy (`.github/workflows/pages.yml`), depois do `npm run build`, o `index.html` e a pasta
`casa/` daqui são copiados por cima da home do Next em `out/`. As outras páginas (PC, /fc27,
/ferramentas, /dicas…) continuam saindo do Next, nos mesmos endereços. O `out/index.txt`
(payload da home antiga do Next) é apagado para que os links internos para "/" carreguem esta página.
