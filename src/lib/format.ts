export const PENDING = "[a conferir]";
export function formatDate(value: string) { return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value.split("-").reverse().join("/") : PENDING; }
export function money(value: number | "[a conferir]") { return typeof value === "number" ? new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value) : PENDING; }
export function textOrPending(value?: string) { const text = value?.trim(); return !text || text === PENDING ? "O elefante ainda tá conferindo." : text; }
export function isPending(value?: string) { return !value?.trim() || value.includes("["); }
export function isHttpUrl(value: string) {
  try { return ["https:", "http:"].includes(new URL(value).protocol); } catch { return false; }
}
