// Mede a posição de cada bloco de texto no desenho e no site e lista onde diverge.
// Uso: node scripts/mede.js <Prancheta> <rota> [largura=390] [seletor-raiz-do-site=.dz-m] [tolerância=3]
const http = require("http"), fs = require("fs"), path = require("path"), puppeteer = require("puppeteer-core");
const [, , prancheta, rota = "/", largura = "390", raiz = ".dz-m", tol = "3"] = process.argv;
const RAIZ = path.join(__dirname, ".."), DESENHO = path.join(RAIZ, "docs", "design-1.0");
const srv = http.createServer((req, res) => {
  const u = decodeURIComponent(req.url.split("?")[0]);
  const arq = u.endsWith("/support.js") ? path.join(__dirname, "dcserve", "support.js") : u.startsWith("/_blob/") ? path.join(RAIZ, "public", "brand", "elphy-nota.webp") : path.join(DESENHO, path.basename(u));
  if (!fs.existsSync(arq)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { "Content-Type": arq.endsWith(".js") ? "text/javascript" : arq.endsWith(".webp") ? "image/webp" : "text/html; charset=utf-8" });
  fs.createReadStream(arq).pipe(res);
});
const coleta = (sel) => {
  const base = sel ? document.querySelector(sel) : document.body;
  const b0 = base.getBoundingClientRect();
  const out = [];
  const w = document.createTreeWalker(base, NodeFilter.SHOW_TEXT);
  const vistos = new Map();
  while (w.nextNode()) {
    const t = w.currentNode.textContent.replace(/\s+/g, " ").trim();
    if (t.length < 2) continue;
    const el = w.currentNode.parentElement;
    if (!el || el.closest("[aria-hidden=true]") || !el.getClientRects().length) continue;
    const raw = w.currentNode.textContent, i0 = raw.search(/\S/), i1 = raw.search(/\s*$/); const r = document.createRange(); r.setStart(w.currentNode, i0); r.setEnd(w.currentNode, i1);
    const b = r.getBoundingClientRect();
    if (!b.width) continue;
    const n = (vistos.get(t) || 0) + 1; vistos.set(t, n);
    const cs = getComputedStyle(el);
    out.push({ k: t.slice(0, 40) + (n > 1 ? ` #${n}` : ""), x: Math.round(b.left - b0.left), y: Math.round(b.top - b0.top + scrollY * 0), w: Math.round(b.width), h: Math.round(b.height), f: cs.fontSize + " " + cs.fontFamily.split(",")[0].replace(/"/g, "") + " " + cs.fontWeight, c: cs.color });
  }
  return out;
};
(async () => {
  await new Promise((r) => srv.listen(0, r));
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new" });
  const p = await b.newPage();
  await p.setViewport({ width: Number(largura), height: 900 });
  const ler = async (url, sel) => {
    await p.goto(url, { waitUntil: "networkidle0", timeout: 120000 });
    await p.evaluate(() => document.fonts.ready);
    await p.addStyleTag({ content: "*{animation:none!important;transition:none!important}" });
    await new Promise((r) => setTimeout(r, 1200));
    return p.evaluate(coleta, sel);
  };
  const A = await ler(`http://127.0.0.1:${srv.address().port}/${prancheta}.dc.html`, null);
  const S = await ler(`http://localhost:3005${rota}`, raiz);
  const mS = new Map(S.map((e) => [e.k, e]));
  const T = Number(tol);
  let dif = 0;
  for (const a of A) {
    const s = mS.get(a.k);
    if (!s) { console.log(`FALTA no site: "${a.k}" (desenho y=${a.y})`); dif++; continue; }
    mS.delete(a.k);
    const d = [];
    if (Math.abs(a.x - s.x) > T) d.push(`x ${a.x}→${s.x}`);
    if (Math.abs(a.y - s.y) > T) d.push(`y ${a.y}→${s.y}`);
    if (Math.abs(a.w - s.w) > T) d.push(`w ${a.w}→${s.w}`);
    if (Math.abs(a.h - s.h) > T) d.push(`h ${a.h}→${s.h}`);
    if (a.f !== s.f) d.push(`fonte ${a.f}→${s.f}`);
    if (a.c !== s.c) d.push(`cor ${a.c}→${s.c}`);
    if (d.length) { console.log(`"${a.k}": ${d.join(" · ")}`); dif++; }
  }
  for (const k of mS.keys()) { console.log(`SOBRA no site: "${k}"`); dif++; }
  console.log(`${A.length} textos no desenho · ${dif} diferenças (tolerância ${T}px)`);
  await b.close(); srv.close();
})().catch((e) => { console.error(e); process.exit(1); });
