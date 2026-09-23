"use client";

/**
 * Celular e computador são duas árvores montadas juntas (design.css: .dz-m / .dz-d), cada uma com o seu estado.
 * A escolha fica na URL: quem escolhe grava, e a árvore que aparece ao cruzar 1024 px relê.
 * De quebra, recarregar a página não perde a escolha.
 */
export function gravaEscolha(params: Record<string, string | number>) {
  const u = new URL(window.location.href);
  for (const [k, v] of Object.entries(params)) u.searchParams.set(k, String(v));
  window.history.replaceState(window.history.state, "", u);
}

/** Tira a escolha da URL (Refazer a conta). */
export function apagaEscolha(chaves: string[]) {
  const u = new URL(window.location.href);
  chaves.forEach((k) => u.searchParams.delete(k));
  window.history.replaceState(window.history.state, "", u);
}

/** Chama `fn` quando a tela cruza 1024 px (a outra árvore passa a aparecer). Devolve a limpeza. */
export function aoTrocarDeTela(fn: () => void) {
  const m = window.matchMedia?.("(min-width: 1024px)");
  if (!m) return () => {};
  m.addEventListener("change", fn);
  return () => m.removeEventListener("change", fn);
}
