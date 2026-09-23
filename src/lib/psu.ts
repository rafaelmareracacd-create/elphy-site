import dados from "@/data/pc.json";
import { fonteRecomendada } from "./contas";

export type Gpu = { id: string; nome: string; tgp: number; verificado: boolean; fonte?: string; conferido_em?: string };
export type Cpu = { id: string; nome: string; ppt: number; verificado: boolean; fonte?: string; conferido_em?: string };
export type Fonte = {
  id: string; nome: string; watts: number; selo: string;
  relatorio: string; preco: number | null; preco_data: string | null;
  url: string; verificado: boolean;
};

export const gpus = dados.gpus as Gpu[];
export const cpus = dados.cpus as Cpu[];
export const fontes = dados.fontes as Fonte[];
export const BASE_SISTEMA = dados.base_sistema_w as number;
export const FOLGA = dados._metodologia.folga as number;
export const METODOLOGIA = dados._metodologia.texto as string;

export type Resultado = {
  gpu: Gpu; cpu: Cpu;
  consumo: number;        // soma crua dos componentes
  comFolga: number;       // consumo + 30%
  recomendado: number;    // degrau comercial acima de comFolga
  fontes: Fonte[];        // modelos testados que atendem
  temDadoNaoVerificado: boolean;
};

export function calcular(gpuId: string, cpuId: string): Resultado | null {
  const gpu = gpus.find((g) => g.id === gpuId);
  const cpu = cpus.find((c) => c.id === cpuId);
  if (!gpu || !cpu) return null;

  const { consumo, comFolga, recomendado } = fonteRecomendada(gpu.tgp, cpu.ppt, BASE_SISTEMA, FOLGA);

  // Só modelos com relatório de teste público. Watt na etiqueta não basta.
  const atendem = fontes
    .filter((f) => f.verificado && f.relatorio && f.watts >= recomendado)
    .sort((a, b) => (a.preco ?? Infinity) - (b.preco ?? Infinity))
    .slice(0, 3);

  return {
    gpu, cpu, consumo, comFolga, recomendado,
    fontes: atendem,
    temDadoNaoVerificado: !gpu.verificado || !cpu.verificado,
  };
}
