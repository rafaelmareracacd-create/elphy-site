import type { Achado, CarimboTipo } from "../content/achados.ts";

export const CATEGORIAS = ["Celular e acessórios", "Áudio", "PC e setup", "Casa e quarto", "Estudo e trabalho"];
export const COLECOES = ["Até R$ 50", "Presentes", "Pra faculdade", "Primeiro apê"];
export const CARIMBOS: Record<CarimboTipo, string> = { vale: "✓ Vale", depende: "~ Depende", deixa: "× Deixa pra lá" };
const normaliza = (texto: string) => texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export function filtrarAchados(itens: Achado[], filtros: { categoria?: string; colecao?: string; carimbo?: CarimboTipo; busca?: string }) {
  const q = normaliza(filtros.busca?.trim() || "");
  return itens.filter((item) => (!filtros.categoria || item.categoria === filtros.categoria)
    && (!filtros.colecao || item.colecoes.includes(filtros.colecao))
    && (!filtros.carimbo || item.carimbo === filtros.carimbo)
    && (!q || normaliza(`${item.nome} ${item.categoria} ${item.motivo}`).includes(q)));
}

export function dinheiro(valor: number | null) {
  return valor === null ? "R$ [PREÇO]" : valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
export function dataConferencia(valor: string | null) {
  if (!valor) return "data a conferir";
  const data = new Date(valor);
  return Number.isNaN(data.getTime()) ? "data a conferir" : new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", timeZone: "America/Sao_Paulo" }).format(data);
}
/** Cupom só aparece publicado e com código real — nunca vazio nem placeholder tipo "[CÓDIGO]". */
export function temCupomReal(achado: Pick<Achado, "cupom" | "rascunho">): boolean {
  const codigo = achado.cupom?.codigo.trim() ?? "";
  return !achado.rascunho && codigo !== "" && !(codigo.startsWith("[") && codigo.endsWith("]"));
}
export function urlExterna(url?: string | null): url is string {
  if (!url) return false;
  try { return ["https:", "http:"].includes(new URL(url).protocol); } catch { return false; }
}
