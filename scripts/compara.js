// Compara uma prancheta do desenho com a página do site, lado a lado.
// Uso: node scripts/compara.js <Prancheta> <rota> [largura=390] [altura-do-pedaço=1100]
// Precisa do site em http://localhost:3005. Sai em docs/design-1.0/_compara/<Prancheta>-<n>.png
// (esquerda = desenho, direita = site). NODE_PATH aponta para o puppeteer-core do pipeline.
const http = require("http");
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer-core");

const [, , prancheta, rota = "/", largura = "390", pedaco = "1100"] = process.argv;
const W = Number(largura), H = Number(pedaco);
const RAIZ = path.join(__dirname, "..");
const DESENHO = path.join(RAIZ, "docs", "design-1.0");
const SAIDA = path.join(DESENHO, "_compara");
const BLOB = path.join(RAIZ, "public", "brand", "elphy-nota.webp");
const RUNTIME = path.join(__dirname, "dcserve", "support.js");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const servidor = http.createServer((req, res) => {
  const u = decodeURIComponent(req.url.split("?")[0]);
  let arq = null, tipo = "text/html; charset=utf-8";
  if (u.endsWith("/support.js")) { arq = RUNTIME; tipo = "text/javascript"; }
  else if (u.startsWith("/_blob/")) { arq = BLOB; tipo = "image/webp"; }
  else arq = path.join(DESENHO, path.basename(u));
  if (!arq || !fs.existsSync(arq)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { "Content-Type": tipo });
  fs.createReadStream(arq).pipe(res);
});

async function foto(p, url, espera) {
  await p.goto(url, { waitUntil: "networkidle0", timeout: 120000 });
  await p.evaluate(() => document.fonts && document.fonts.ready);
  await p.addStyleTag({ content: "*{animation-duration:0s!important;animation-delay:0s!important;transition:none!important} nextjs-portal{display:none!important}" });
  await sleep(espera);
  return p.screenshot({ fullPage: true, type: "png" });
}

(async () => {
  await new Promise((r) => servidor.listen(0, r));
  const porta = servidor.address().port;
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: W, height: 900, deviceScaleFactor: 1 });
  const a = await foto(p, `http://127.0.0.1:${porta}/${prancheta}.dc.html`, 1800);
  const s = await foto(p, `http://localhost:3005${rota}`, 1500);
  fs.mkdirSync(SAIDA, { recursive: true });
  for (const f of fs.readdirSync(SAIDA)) if (f.startsWith(prancheta + "-")) fs.unlinkSync(path.join(SAIDA, f));
  // monta lado a lado, em pedaços de H px de altura
  const q = await b.newPage();
  const d64 = (buf) => "data:image/png;base64," + Buffer.from(buf).toString("base64");
  await q.setContent(`<body style="margin:0;background:#f0f"><img id=a src="${d64(a)}"><img id=s src="${d64(s)}"></body>`);
  const [ha, hs] = await q.evaluate(() => [document.getElementById("a").naturalHeight, document.getElementById("s").naturalHeight]);
  const alt = Math.max(ha, hs);
  await q.setViewport({ width: W * 2 + 12, height: H, deviceScaleFactor: 1 });
  await q.setContent(`<body style="margin:0;background:#ff00ff;display:flex;gap:12px;align-items:flex-start;width:${W * 2 + 12}px;height:${alt}px"><img src="${d64(a)}" style="width:${W}px"><img src="${d64(s)}" style="width:${W}px"></body>`);
  let n = 0;
  for (let y = 0; y < alt; y += H) {
    n++;
    await q.screenshot({ path: path.join(SAIDA, `${prancheta}-${n}.png`), clip: { x: 0, y, width: W * 2 + 12, height: Math.min(H, alt - y) }, captureBeyondViewport: true });
  }
  console.log(`desenho ${ha}px · site ${hs}px · ${n} pedaços em docs/design-1.0/_compara/`);
  await b.close();
  servidor.close();
})().catch((e) => { console.error(e); process.exit(1); });
