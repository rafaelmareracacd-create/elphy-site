/* Revisão local sem next dev. Reutiliza esbuild/puppeteer já instalados no pipeline.
 * Produção é servida diretamente de out/. Os rascunhos usam um harness React
 * isolado em build/v3-review/, com os mesmos componentes e CSS da exportação.
 * Não publica o harness nem modifica o catálogo. Sem downloads.
 */
const fs = require("node:fs");
const path = require("node:path");
const http = require("node:http");
const assert = require("node:assert/strict");
const raiz = path.resolve(__dirname, "..");
const modulos = process.env.V3_REVIEW_MODULES || path.resolve(raiz, "../pipeline/hf-test/node_modules");
const esbuild = require(path.join(modulos, "esbuild"));
const puppeteer = require(path.join(modulos, "puppeteer-core"));
const saida = path.join(raiz, "build/v3-review");

async function main() {
  fs.mkdirSync(saida, { recursive: true });
  const home = fs.readFileSync(path.join(raiz, "out/index.html"), "utf8");
  const estilos = [...home.matchAll(/<link[^>]+rel="stylesheet"[^>]*>/g)].map((m) => m[0]).join("");
  const classe = home.match(/class="(v3 [^"]+)"/)[1];
  await esbuild.build({
    absWorkingDir: raiz, bundle: true, outfile: path.join(saida, "preview.js"), jsx: "automatic",
    define: { "process.env.NODE_ENV": '"development"', "process.env.NEXT_PUBLIC_BASE_PATH": '""', "process.env.NEXT_PUBLIC_SITE_URL": '""', "process.env.NEXT_PUBLIC_FORM_ENDPOINT": '""' },
    stdin: { resolveDir: raiz, loader: "tsx", contents: `
      import React from 'react'; import { createRoot } from 'react-dom/client';
      import Home from './src/components/v3/Home';
      import Lista from './src/components/v3/ListaAchados';
      import Produto from './src/components/v3/Produto';
      import Cabecalho from './src/components/v3/Cabecalho';
      import Rodape from './src/components/v3/Rodape';
      import Barra from './src/components/v3/BarraInferior';
      import { ACHADOS } from './src/content/achados';
      const tipo = window.location.pathname.split('/')[2];
      createRoot(document.getElementById('preview')).render(<div className=${JSON.stringify(classe)}><Cabecalho/><main id="conteudo">{tipo === 'home' ? <Home/> : tipo === 'produto' ? <Produto achado={ACHADOS[1]} parecidos={[ACHADOS[5]]}/> : <div className="v3-container"><section className="v3-abertura-achados"><div><p className="v3-etiqueta v3-verde">6 achados · prévia com rascunhos</p><h1>Achados</h1><p>Todo achado tem carimbo, porquê, preço, frete e data.</p></div><img className="v3-mascote" src="/brand/elphy-carimbo.webp" alt="Elphy carimbando um achado" width="280" height="280"/></section><Lista itens={ACHADOS}/></div>}</main><Rodape/><Barra/></div>);
    ` },
    plugins: [{ name: "next-no-harness", setup(build) {
      build.onResolve({ filter: /^next\/(link|image|navigation)$/ }, ({ path: nome }) => ({ path: nome, namespace: "review" }));
      build.onLoad({ filter: /.*/, namespace: "review" }, ({ path: nome }) => ({ loader: "jsx", resolveDir: raiz, contents: nome === "next/navigation" ? `export const usePathname=()=>window.location.pathname.includes('produto')?'/achados/power-bank-20000/':window.location.pathname.includes('home')?'/':'/achados/';` : nome === "next/link" ? `import React from 'react'; export default function Link(p){return <a {...p}/>}` : `import React from 'react'; export default function Image({priority,fill,unoptimized,...p}){return <img {...p}/>} ` }));
    } }],
  });
  const preview = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${estilos}</head><body style="margin:0"><div id="preview"></div><script src="/review/preview.js"></script></body></html>`;
  const mime = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".webp": "image/webp", ".png": "image/png", ".woff2": "font/woff2", ".txt": "text/plain" };
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, "http://localhost");
    if (url.pathname.startsWith("/review/") && !url.pathname.endsWith(".js")) { res.setHeader("Content-Type", "text/html; charset=utf-8"); res.end(preview); return; }
    const file = url.pathname === "/review/preview.js" ? path.join(saida, "preview.js") : path.resolve(raiz, "out", `.${decodeURIComponent(url.pathname)}`, url.pathname.endsWith("/") ? "index.html" : "");
    if (!file.startsWith(path.join(raiz, "out") + path.sep) && file !== path.join(saida, "preview.js")) { res.writeHead(403).end(); return; }
    if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end("Não encontrado"); return; }
    res.setHeader("Content-Type", mime[path.extname(file)] || "application/octet-stream"); fs.createReadStream(file).pipe(res);
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await puppeteer.launch({ executablePath: process.env.V3_REVIEW_CHROME || "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--hide-scrollbars"], userDataDir: path.join(saida, "chrome-profile") });
  const erros = [];
  try {
    const page = await browser.newPage();
    page.on("pageerror", (error) => erros.push(error.message));
    const abrir = async (rota) => { const response = await page.goto(base + rota, { waitUntil: "networkidle0" }); assert.equal(response.status(), 200, rota); await page.evaluate(() => document.fonts.ready); };
    for (const width of [390, 1440, 320, 1024]) {
      await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
      for (const [nome, rota] of [["home", "/"], ["achados", "/achados/"], ["fc27", "/fc27/"], ["home-rascunhos", "/review/home/"], ["achados-rascunhos", "/review/achados/"], ["produto-rascunho", "/review/produto/"]]) {
        await abrir(rota);
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Overflow em ${nome} ${width}`);
        if (erros.length && process.env.V3_DEBUG) console.error("pageerrors:", nome, erros);
        assert.equal(await page.$$eval("h1", (els) => els.length), 1, `Um h1 em ${nome}`);
        assert.ok(await page.evaluate(() => [...document.images].every((img) => img.complete && img.naturalWidth > 0)), `Imagens em ${nome}`);
        if (!rota.startsWith("/review/")) assert.ok(!(await page.$eval("main", (el) => el.textContent)).includes("[MODELO]"), `Rascunho em produção ${nome}`);
        if ([390, 1440].includes(width)) await page.screenshot({ path: path.join(saida, `${nome}-${width}.png`), fullPage: true });
      }
    }
    await page.setViewport({ width: 390, height: 900 });
    await abrir("/review/achados/");
    assert.equal((await page.$$(".v3-tira")).length, 6);
    await page.click('.v3-filtro-deixa');
    assert.equal((await page.$$(".v3-tira")).length, 1);
    assert.match(await page.$eval('.v3-tira', (el) => el.textContent), /Fonte 500 W/);
    await page.click('.v3-filtro-deixa');
    await page.evaluate(() => [...document.querySelectorAll('.v3-chips button')].find((el) => el.textContent === 'Áudio').click());
    assert.equal((await page.$$(".v3-tira")).length, 1);
    await page.evaluate(() => [...document.querySelectorAll('.v3-colecoes button')].find((el) => el.textContent.includes('Primeiro apê')).click());
    assert.equal((await page.$$(".v3-tira")).length, 0);
    await page.click('.v3-vazio button');
    assert.equal((await page.$$(".v3-tira")).length, 6);
    await abrir('/review/achados/?q=luminaria');
    assert.equal((await page.$$('.v3-tira')).length, 1);
    assert.match(await page.$eval('.v3-tira', (el) => el.textContent), /Luminária/);
    await abrir('/fc27/?placa=rtx-4070');
    assert.match(await page.$eval('.v3-recibo', (el) => el.textContent), /Ultra/);
    await page.type('#v3-placa', '1660s');
    await page.click('#v3-placas button');
    assert.match(await page.$eval('.v3-recibo', (el) => el.textContent), /GTX 1660 Super/);
    assert.match(page.url(), /placa=gtx-1660-super/);
    await page.reload({ waitUntil: 'networkidle0' });
    assert.match(await page.$eval('.v3-recibo', (el) => el.textContent), /GTX 1660 Super/);
    await page.type('#v3-placa', 'placa inexistente');
    assert.match(await page.$eval('.v3-resultado-busca', (el) => el.textContent), /Não achei/);
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    assert.equal(await page.$eval('.v3-recibo-conteudo', (el) => getComputedStyle(el).animationName), 'none');
    for (const rota of ['/ferramentas/', '/ferramentas/fonte/', '/dicas/', '/montar-pc/']) { await abrir(rota); assert.equal(await page.$('.v3'), null, `Legado preservado ${rota}`); }
    const oculto = await page.goto(base + '/achados/power-bank-20000/');
    assert.equal(oculto.status(), 404);
    assert.deepEqual(erros, []);
    const resultado = 'PASS: 24 combinações de rota/largura (320, 390, 1024 e 1440), 12 capturas, filtros combinados, busca sem acentos, FC 27 busca/seleção/URL/reload, reduced-motion, quatro rotas antigas e rascunho 404. Zero erros de página.';
    fs.writeFileSync(path.join(saida, 'RESULTADO.txt'), resultado + '\n');
    console.log(resultado);
  } finally { await browser.close(); server.close(); }
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
