import { cpusFonte, gpusFonte } from "@/lib/catalogo";
import { fonteRecomendada } from "@/lib/contas";
import type { Conta, Grupo, Sel } from "@/components/dz/useFerramenta";

/** Grupos de chips da calculadora de fonte (prancheta Fonte-Desktop), a partir do catálogo. */
export const GR_FONTE: Grupo[] = [
  { k: "gpu", titulo: "Placa de vídeo", ops: gpusFonte.map((x) => ({ ...x, sub: `${x.w} W` })) },
  // a prancheta de computador começa pelo Ryzen 5 7600
  { k: "cpu", titulo: "Processador", ops: [...cpusFonte].sort((a, b) => (a.id === "r5-7600" ? -1 : b.id === "r5-7600" ? 1 : 0)).map((x) => ({ ...x, sub: `${x.w} W` })) },
];

export function contaNotaFonte(v: Sel): Conta {
  const g = v.gpu as unknown as { nome: string; w: number; cod: string };
  const c = v.cpu as unknown as { nome: string; w: number; cod: string };
  const r = fonteRecomendada(g.w, c.w);
  const rec = r.recomendado;
  return {
    alvo: rec, dec: 0, unidade: "W", rotulo: "Fonte recomendada", cupom: "Cupom de consumo",
    numero: String(rec).padStart(4, "0"), cod: `${g.cod}-${c.cod}`,
    linhas: [
      { nome: g.nome, v: `${g.w} W` }, { nome: c.nome, v: `${c.w} W` }, { nome: "Mãe, memória, SSD", v: "60 W" },
      { nome: "Consumo em carga", v: `${r.consumo} W`, sep: true }, { nome: "Folga (+30%)", v: `${r.folgaW} W` },
      { nome: "Total com folga", v: `${r.comFolga} W`, forte: true },
    ],
    sub: `Degrau comercial logo acima de ${r.comFolga} W.`,
    nota: "Só listamos fonte com relatório de teste público. Watt escrito na caixa não conta.",
    seloTopo: "Sua fonte", seloMeio: String(rec), seloBase: "watts", brilho: (0.2 + 0.6 * Math.min(rec / 1200, 1)).toFixed(2),
  };
}
