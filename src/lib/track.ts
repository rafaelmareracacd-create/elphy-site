/** Contagem local por link, sem cookies ou envio de dados. */
export function trackClick(id: string, url: string): void {
  if (typeof window === "undefined") return;
  try { if (!["https:", "http:"].includes(new URL(url).protocol)) return; } catch { return; }
  try {
    const key = `elphy:clicks:${id}`;
    const previous = Number(window.localStorage.getItem(key) || "0");
    const count = Number.isSafeInteger(previous) && previous >= 0 && previous < Number.MAX_SAFE_INTEGER ? previous : 0;
    window.localStorage.setItem(key, String(count + 1));
  } catch {
    // Armazenamento indisponível não impede abrir o link.
  }
  // Futuro: plugar aqui um endpoint de contagem, após rever a política de privacidade.
  window.open(url, "_blank", "noopener,noreferrer");
}
