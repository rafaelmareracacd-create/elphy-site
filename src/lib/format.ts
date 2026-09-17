export const PENDING = "[a conferir]";
export function textOrPending(value?: string) { const text = value?.trim(); return !text || text === PENDING ? "O elefante ainda tá conferindo." : text; }
export function isPending(value?: string) { return !value?.trim() || value.includes("["); }
export function isHttpUrl(value: string) {
  try { return ["https:", "http:"].includes(new URL(value).protocol); } catch { return false; }
}
