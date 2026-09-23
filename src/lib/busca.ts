import { cpusFonte, gpusFonte, type PecaFonte } from "@/lib/catalogo";
import { fonteRecomendada } from "@/lib/contas";
import { DICAS } from "@/lib/dicas";

/**
 * A busca da prancheta Busca-Mobile: conta pronta (quando a busca acha uma placa), ferramentas, peças e dicas.
 * Tudo no navegador, sem servidor: o índice é o catálogo e a lista de dicas.
 */
export const FERRAMENTAS_BUSCA = [
  { nome: "Calculadora de fonte", sim: "W", href: "/ferramentas/fonte/", chaves: "fonte psu watt watts placa video processador gpu cpu rtx radeon geforce ryzen intel core" },
  { nome: "Power bank de verdade", sim: "mAh", href: "/ferramentas/power-bank/", chaves: "power bank bateria carregador celular mah carga cargas" },
  { nome: "Espaço real do SSD", sim: "GB", href: "/ferramentas/ssd/", chaves: "ssd hd armazenamento tb gb espaco disco nvme" },
  { nome: "Conta de luz do PC", sim: "kWh", href: "/ferramentas/conta-de-luz/", chaves: "luz energia conta kwh consumo gasto reais" },
  { nome: "Nitidez do monitor", sim: "PPI", href: "/ferramentas/monitor/", chaves: "monitor tela ppi pixel resolucao polegadas full hd 4k 1440p" },
  { nome: "Cabe no gabinete", sim: "mm", href: "/ferramentas/gabinete/", chaves: "gabinete case mm tamanho comprimento cabe placa" },
  { nome: "Memória certa", sim: "DDR", href: "/ferramentas/memoria/", chaves: "memoria ram ddr4 ddr5 pente soquete placa mae" },
  { nome: "Montador de PC", sim: "4/4", href: "/montador/", chaves: "montador montar pc pecas soquete memoria placa mae gabinete fonte compatibilidade" },
];

/** minúsculas, sem acento, "20.000" → "20000", "1tb" → "1 tb", só letras e números */
export function normaliza(t: string) {
  return t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/(\d)[.,](\d{3})/g, "$1$2")
    .replace(/(\d)(tb|gb|mah|mm|hz|w|v)\b/g, "$1 $2")
    .replace(/[^a-z0-9]+/g, " ").trim();
}

const PEQUENAS = new Set(["a", "o", "as", "os", "de", "da", "do", "das", "dos", "e", "em", "na", "no", "para", "pra", "com", "um", "uma"]);
const palavras = (t: string) => normaliza(t).split(" ").filter(Boolean);
/** a palavra da busca bate com uma palavra do texto (inteira, ou começo com 3+ letras); uma letra só vale no nome da peça */
const bate = (q: string, texto: string[]) => q.length > 1 && texto.some((w) => w === q || (q.length >= 3 && w.startsWith(q)));
/** número curto ("1" de "1 tb", "5" de "ryzen 5") não precisa achar nada sozinho */
const opcional = (w: string) => /^\d{1,2}$/.test(w);
/** "7800" acha "7800x3d", "12400" acha "12400f": o número do modelo vale como começo da palavra */
const bateModelo = (q: string, w: string) => w === q || (/^\d{3,}$/.test(q) && w.startsWith(q));

/**
 * A peça que a busca nomeia: precisa do número do modelo. "5070" acha a RTX 5070; "5070 ti", a Ti;
 * "9070" acha a RX 9070 XT (única com esse número). Entre variantes, ganha a que tem menos sobra fora da busca.
 */
export function achaPeca(lista: PecaFonte[], q: string[]) {
  let melhor: PecaFonte | undefined, nota = 0;
  for (const p of lista) {
    const nome = palavras(p.nome);
    const i = nome.findIndex((w) => /\d{3,}/.test(w));
    if (i < 0 || !q.some((t) => bateModelo(t, nome[i]))) continue;
    const acertos = nome.filter((w) => q.some((t) => bateModelo(t, w))).length;
    const sobra = nome.slice(i + 1).filter((w) => !q.includes(w)).length;
    const n = acertos - sobra / 2;
    if (n > nota) { melhor = p; nota = n; }
  }
  return melhor;
}

/** "1 tb", "20000 mah": número seguido de unidade, para não trazer a dica de 1 TB numa busca por 2 TB */
const UNIDADES = new Set(["tb", "gb", "mah", "mm", "w", "hz", "ppi", "kwh"]);
const medidas = (t: string[]) => t.flatMap((w, i) => (/^\d+$/.test(w) && UNIDADES.has(t[i + 1]) ? [[w, t[i + 1]]] : []));

const SUFIXOS = new Set(["ti", "xt", "super", "x3d", "xtx"]);
/** a dica fala desta peça: tem o modelo em sequência, sem sufixo a mais ("5070" não é "5070 ti") */
function dicaDaPeca(texto: string[], p: PecaFonte) {
  const nome = palavras(p.nome);
  const modelo = nome.slice(nome.findIndex((w) => /\d{3,}/.test(w)));
  return texto.some((_, i) => modelo.every((w, j) => texto[i + j] === w) && !SUFIXOS.has(texto[i + modelo.length]));
}

export function busca(texto: string) {
  const q = palavras(texto).filter((w) => !PEQUENAS.has(w));
  if (!q.length) return null;
  const gpu = achaPeca(gpusFonte.filter((x) => x.id !== "sem-gpu"), q);
  const cpuAchada = achaPeca(cpusFonte, q);
  const cpu = cpuAchada ?? cpusFonte.find((x) => x.id === "r5-7600")!;
  const r = gpu ? fonteRecomendada(gpu.w, cpu.w) : null;
  const conta = gpu && r ? {
    gpu: gpu.nome, gpuW: `${gpu.w} W`, cpu: cpu.nome, cpuW: `${cpu.w} W`,
    total: `${r.comFolga} W`, rec: `${r.recomendado} W`,
    href: `/ferramentas/fonte/?gpu=${gpu.id}&cpu=${cpu.id}`,
  } : null;
  const ferramentas = FERRAMENTAS_BUSCA
    .map((f, i) => {
      const nome = palavras(f.nome), chaves = palavras(f.chaves);
      const n = q.filter((w) => bate(w, nome)).length * 2 + q.filter((w) => bate(w, chaves)).length;
      return { ...f, n, i };
    })
    .filter((f) => f.n > 0)
    .sort((a, b) => b.n - a.n || a.i - b.i);
  // "ryzen 5", "core i5": sem número de modelo, lista os processadores da família
  const familia = !cpuAchada && !gpu
    ? cpusFonte.filter((c) => { const n = palavras(c.nome); return q.every((w) => n.includes(w)); })
    : [];
  const pecas = [
    ...familia.map((c) => ({ tipo: "Processador · conta da fonte", nome: c.nome, v: `${c.w} W`, href: `/ferramentas/fonte/?cpu=${c.id}` })),
    ...(gpu ? [{ tipo: "Placa de vídeo · ficha", nome: gpu.nome, v: `${gpu.w} W`, href: `/peca/${gpu.id}/` }] : []),
    // processador ainda não tem ficha: abre a conta da fonte com ele
    ...(cpuAchada ? [{ tipo: "Processador · conta da fonte", nome: cpuAchada.nome, v: `${cpuAchada.w} W`, href: `/ferramentas/fonte/?cpu=${cpuAchada.id}` }] : []),
  ];
  const achadas = [gpu, cpuAchada].filter((p): p is PecaFonte => !!p);
  // número solto numa ferramenta de medida ("power bank 10000", "monitor 34") é a medida, não um modelo de peça
  const medida = ferramentas.some((f) => f.href !== "/ferramentas/fonte/" && f.href !== "/montador/");
  const dicas = DICAS.filter((d) => {
    const t = palavras(d.t);
    if (!q.some((w) => bate(w, t))) return false;
    // mesma unidade, número diferente: busca "ssd 2 tb" não traz a dica do SSD de 1 TB
    const mq = medidas(q), md = medidas(t);
    if (mq.some(([n, u]) => md.some(([n2, u2]) => u === u2 && n !== n2))) return false;
    // busca por peça: dica com número de modelo só entra se for dessa peça ("ryzen 7600" não traz "Ryzen 5000")
    if (achadas.length && t.some((w) => /\d{3,}/.test(w))) return achadas.some((p) => dicaDaPeca(t, p));
    return true;
  });
  // toda palavra da busca tem que achar alguma coisa: "fonte 9999" não devolve a calculadora de fonte
  const achou = (w: string) =>
    opcional(w) ||
    (medida && /^\d+$/.test(w)) ||
    familia.some((c) => palavras(c.nome).includes(w)) ||
    achadas.some((p) => palavras(p.nome).some((n) => bateModelo(w, n))) ||
    FERRAMENTAS_BUSCA.some((f) => bate(w, palavras(f.nome + " " + f.chaves))) ||
    DICAS.some((d) => bate(w, palavras(d.t)));
  if (!q.every(achou)) return { conta: null, ferramentas: [], pecas: [], dicas: [], total: 0 };
  const total = (conta ? 1 : 0) + ferramentas.length + pecas.length + dicas.length;
  return { conta, ferramentas, pecas, dicas, total };
}

export const SUGESTOES = ["RTX 5070", "Ryzen 5 7600", "power bank 20000"];
