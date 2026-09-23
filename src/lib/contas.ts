/**
 * As sete fórmulas da metodologia (docs/design-1.0/Metodologia-Mobile.dc.html).
 * Funções puras: quem chama entrega o número; aqui não tem catálogo nem rede.
 */

export const DEGRAUS_FONTE = [400, 450, 500, 550, 600, 650, 700, 750, 850, 1000, 1200, 1300, 1600] as const;

export const MARGEM_PLACA_MM = 10;
export const MARGEM_COOLER_MM = 3;

/** (placa + processador + 60 W) × 1,3 → próximo degrau comercial. */
export function fonteRecomendada(placaW: number, cpuW: number, baseW = 60, folga = 0.3) {
  const consumo = placaW + cpuW + baseW;
  // o degrau cobre a conta sem arredondar: 308 W × 1,3 = 400,4 W pede 450, não 400
  const exato = consumo * (1 + folga);
  const comFolga = Math.round(exato);
  const recomendado = DEGRAUS_FONTE.find((degrau) => degrau >= exato) ?? DEGRAUS_FONTE[DEGRAUS_FONTE.length - 1];
  return { consumo, comFolga, comFolgaExata: exato, folgaW: comFolga - consumo, recomendado };
}

/** mAh × 3,7 V × 65% ÷ (mAh do celular × 3,85 V). Conta e nome do desenho. */
export function cargasPowerBank(mahPowerBank: number, mahCelular: number) {
  return (mahPowerBank * 3.7 * 0.65) / (mahCelular * 3.85);
}

/** bytes da caixa ÷ 1.073.741.824. 1 TB na etiqueta = 10^12 bytes. */
export function ssdGbVisiveis(bytesDaCaixa: number) {
  return Math.round(bytesDaCaixa / 1_073_741_824);
}

export function bytesDeRotuloGb(gbDecimal: number) {
  return gbDecimal * 1_000_000_000;
}

/** watts × horas × 30 ÷ 1.000 × tarifa. */
export function contaDeLuz(watts: number, horasPorDia: number, tarifaReais: number) {
  return (watts * horasPorDia * 30) / 1000 * tarifaReais;
}

export function formatarReais(valor: number) {
  const [inteiro, centavos] = valor.toFixed(2).split(".");
  const milhar = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `R$ ${milhar},${centavos}`;
}

/** √(largura² + altura²) ÷ polegadas. Distância em que o pixel some: 8.732 ÷ PPI (cm). */
export function monitorConta(larguraPx: number, alturaPx: number, polegadas: number) {
  const ppi = Math.hypot(larguraPx, alturaPx) / polegadas;
  return { ppi, ppiArredondado: Math.round(ppi), distanciaCm: 8732 / ppi };
}

/** espaço − peça. A margem de aprovação é 10 mm (placa) e 3 mm (cooler). */
export function sobraMm(espacoMm: number, pecaMm: number) {
  return espacoMm - pecaMm;
}

export function cabePlaca(espacoMm: number, pecaMm: number) {
  return sobraMm(espacoMm, pecaMm) >= MARGEM_PLACA_MM;
}

export function cabeCooler(espacoMm: number, pecaMm: number) {
  return sobraMm(espacoMm, pecaMm) >= MARGEM_COOLER_MM;
}

/**
 * Especificação oficial do processador, sem arredondar.
 * Tabela do desenho Memoria-Mobile (ficha oficial, a conferir antes de publicar).
 */
const MEMORIA_OFICIAL = [
  { id: "ryzen 5000", tipo: "DDR4", teto: 3200 },
  { id: "ryzen 7000", tipo: "DDR5", teto: 5200 },
  { id: "ryzen 9000", tipo: "DDR5", teto: 5600 },
  { id: "intel 12", tipo: "DDR5", teto: 4800, ddr4: 3200 },
  { id: "intel 13", tipo: "DDR5", teto: 5600, ddr4: 3200 },
  { id: "intel 14", tipo: "DDR5", teto: 5600, ddr4: 3200 },
  { id: "core ultra 200", tipo: "DDR5", teto: 6400 },
] as const;

export function memoriaOficial(geracao: string) {
  const chave = geracao.trim().toLowerCase();
  const item = MEMORIA_OFICIAL.find((entrada) => chave.includes(entrada.id));
  if (!item) return null;
  const ddr4 = "ddr4" in item ? item.ddr4 : undefined;
  return {
    tipo: item.tipo,
    teto: item.teto,
    rotulo: `${item.tipo}-${item.teto}`,
    ddr4,
  };
}

export type SeloNota = "lima" | "ambar";

export type PecaMontagem = {
  nome: string;
  w?: number;
  mm?: number;
  sock?: string;
  ddr?: string;
};

export type EntradaMontagem = {
  cpu: PecaMontagem;
  mae: PecaMontagem;
  mem: PecaMontagem;
  gpu: PecaMontagem;
  gab: PecaMontagem;
  psu: PecaMontagem;
};

export type CheckMontagem = { nome: string; ok: boolean; texto: string };

/** Lima se as 4 passam, âmbar se alguma falha, null se falta dado. */
export function seloDaNota(completo: boolean, passaram: number, total: number): SeloNota | null {
  if (!completo) return null;
  return passaram === total ? "lima" : "ambar";
}

export function conferirMontagem(pecas: EntradaMontagem | null) {
  if (!pecas || !temNumero(pecas.cpu.w) || !temNumero(pecas.gpu.w) || !temNumero(pecas.gpu.mm) || !temNumero(pecas.gab.mm) || !temNumero(pecas.psu.w) || !pecas.cpu.sock || !pecas.mae.sock || !pecas.mae.ddr || !pecas.mem.ddr) {
    return { completo: false, checks: [] as CheckMontagem[], passaram: 0, total: 4 as const, selo: null, precisaW: null, recomendadoW: null, folgaMm: null };
  }

  const fonte = fonteRecomendada(pecas.gpu.w, pecas.cpu.w);
  const folgaMm = sobraMm(pecas.gab.mm, pecas.gpu.mm);
  const okSock = pecas.cpu.sock === pecas.mae.sock;
  const okDdr = pecas.mae.ddr === pecas.mem.ddr;
  const okCabe = cabePlaca(pecas.gab.mm, pecas.gpu.mm);
  const okFonte = pecas.psu.w >= fonte.comFolgaExata;
  const checks: CheckMontagem[] = [
    { nome: `Soquete ${pecas.cpu.sock} × ${pecas.mae.sock}`, ok: okSock, texto: okSock ? "OK" : "NÃO" },
    { nome: `Memória ${pecas.mem.ddr} × ${pecas.mae.ddr}`, ok: okDdr, texto: okDdr ? "OK" : "NÃO" },
    {
      nome: `Placa ${pecas.gpu.mm} mm no gabinete`,
      ok: okCabe,
      texto: okCabe ? `+${folgaMm} mm` : folgaMm < 0 ? `falta ${-folgaMm} mm` : "justo",
    },
    { nome: `Fonte ${pecas.psu.w} W × ${fonte.comFolga} W`, ok: okFonte, texto: okFonte ? "OK" : `FALTAM ${fonte.comFolga - pecas.psu.w} W` },
  ];
  const passaram = checks.filter((check) => check.ok).length;
  return {
    completo: true,
    checks,
    passaram,
    total: 4 as const,
    selo: seloDaNota(true, passaram, 4),
    precisaW: fonte.comFolga,
    recomendadoW: fonte.recomendado,
    folgaMm,
  };
}

function temNumero(valor: number | undefined): valor is number {
  return typeof valor === "number" && Number.isFinite(valor);
}
