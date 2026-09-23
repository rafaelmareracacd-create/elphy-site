import dados from "@/data/pc.json";
import { cpus, gpus } from "@/lib/psu";

export const AVISO_CATALOGO = "Catálogo de exemplo, a conferir.";
/** Data da última conferência do catálogo (dd/mm/aaaa). Vazio enquanto nada foi conferido. */
export const DATA_CATALOGO = "";

export type PecaFonte = {
  id: string;
  nome: string;
  curto: string;
  cod: string;
  w: number;
  verificado: boolean;
  /** página oficial onde o watt foi conferido, e quando (dd/mm/aaaa) */
  fonte?: string;
  conferidoEm?: string;
};

const dataBr = (iso?: string) => (iso ? iso.split("-").reverse().join("/") : undefined);

export function codPeca(id: string) {
  if (id === "sem-gpu") return "IGPU";
  return id.split("-").slice(1).join("").toUpperCase();
}

export function curtoFonte(id: string, nome: string) {
  if (id === "sem-gpu") return "Sem placa";
  return nome.replace(/^GeForce /, "").replace(/^Radeon /, "");
}

export const gpusFonte: PecaFonte[] = gpus.map((gpu) => ({
  id: gpu.id,
  nome: gpu.nome,
  curto: curtoFonte(gpu.id, gpu.nome),
  cod: codPeca(gpu.id),
  w: gpu.tgp,
  verificado: gpu.verificado,
  fonte: gpu.fonte,
  conferidoEm: dataBr(gpu.conferido_em),
}));

export const cpusFonte: PecaFonte[] = cpus.map((cpu) => ({
  id: cpu.id,
  nome: cpu.nome,
  curto: cpu.nome,
  cod: codPeca(cpu.id),
  w: cpu.ppt,
  verificado: cpu.verificado,
  fonte: cpu.fonte,
  conferidoEm: dataBr(cpu.conferido_em),
}));

export const SLOTS = ["cpu", "mae", "mem", "gpu", "gab", "psu"] as const;
export type Slot = (typeof SLOTS)[number];

type ComUrl = { id: string; nome: string; url: string; verificado: boolean };

export type CpuMontador = ComUrl & { w: number; sock: string; ddr: string; cooler: boolean };
export type MaeMontador = ComUrl & { sock: string; ddr: string };
export type MemMontador = ComUrl & { ddr: string };
export type GpuMontador = ComUrl & { w: number; mm: number };
export type GabMontador = ComUrl & { mm: number };
export type PsuMontador = ComUrl & { w: number };

export const montador = dados.montador as {
  cpu: CpuMontador[];
  mae: MaeMontador[];
  mem: MemMontador[];
  gpu: GpuMontador[];
  gab: GabMontador[];
  psu: PsuMontador[];
};

export const TITULOS_SLOT: Record<Slot, string> = {
  cpu: "Processador",
  mae: "Placa-mãe",
  mem: "Memória",
  gpu: "Placa de vídeo",
  gab: "Gabinete",
  psu: "Fonte",
};

export const MONTADOR_INICIAL: Record<Slot, string> = {
  cpu: "r5-7600",
  mae: "b650",
  mem: "d5",
  gpu: "rtx-5070",
  gab: "mid",
  psu: "p650",
};

export function listaSlot(slot: Slot): ComUrl[] {
  return montador[slot];
}

export function acharSlot<T extends ComUrl>(slot: Slot, id: string) {
  return (montador[slot] as unknown as T[]).find((peca) => peca.id === id);
}

export function lerMontador(params: URLSearchParams): Record<Slot, string> {
  const estado = { ...MONTADOR_INICIAL };
  for (const slot of SLOTS) {
    const valor = params.get(slot);
    if (valor == null) continue;
    estado[slot] = listaSlot(slot).some((peca) => peca.id === valor) ? valor : "";
  }
  return estado;
}

export function queryMontador(estado: Record<Slot, string>) {
  const query = new URLSearchParams();
  for (const slot of SLOTS) query.set(slot, estado[slot]);
  return query.toString();
}

export function linkShopee(urls: string[]) {
  return urls.find((url) => url.trim().length > 0);
}

export const SSD_OPCOES = [
  { gb: 128, rotulo: "128 GB" },
  { gb: 256, rotulo: "256 GB" },
  { gb: 512, rotulo: "512 GB" },
  { gb: 1000, rotulo: "1 TB" },
  { gb: 2000, rotulo: "2 TB" },
  { gb: 4000, rotulo: "4 TB" },
] as const;
