import type { LojaAchado } from "@/content/achados";
import { dataConferencia, dinheiro, urlExterna } from "@/lib/achados";

export function Preco({ loja }: { loja: LojaAchado }) {
  return <div className="v3-preco"><strong>{dinheiro(loja.preco)}</strong><small>+ frete {loja.frete === null ? "a conferir" : dinheiro(loja.frete)} · {loja.nome} · {dataConferencia(loja.conferidoEm)}</small></div>;
}
export function LinkLoja({ loja, rascunho, destaque = false }: { loja: LojaAchado; rascunho: boolean; destaque?: boolean }) {
  const classe = destaque ? "v3-botao" : "v3-link-loja";
  return !rascunho && urlExterna(loja.url) ? <a className={classe} href={loja.url} rel="sponsored nofollow" target="_blank">Ver na {loja.nome} <span aria-hidden="true">↗</span></a> : <span className={`${classe} v3-indisponivel`}>Link a conferir</span>;
}
