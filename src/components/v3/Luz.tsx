"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import type { Escolha, Sel } from "@/components/dz/useFerramenta";
import { contaLuz, GR_LUZ, INICIAL_LUZ } from "@/lib/ferramentas/luz";
import { absoluteUrl, assetPath } from "@/lib/site";
import Nota from "./Nota";

// Mesmos grupos, escolhas e conta da ferramenta anterior (lib/ferramentas/luz.ts + lib/contas.ts).
const br = (v: number) => v.toFixed(2).replace(".", ",");

export default function Luz() {
  const [esc, setEsc] = useState<Escolha>(INICIAL_LUZ);
  useEffect(() => {
    // link compartilhado (?w=…&h=…&tar=…), o mesmo formato da nota antiga
    const ler = () => {
      const q = new URLSearchParams(window.location.search);
      const patch: Escolha = { ...INICIAL_LUZ };
      GR_LUZ.forEach((g) => { const id = q.get(g.k); if (id && g.ops.some((o) => o.id === id)) patch[g.k] = id; });
      setEsc(patch);
    };
    ler();
    window.addEventListener("popstate", ler);
    return () => window.removeEventListener("popstate", ler);
  }, []);
  function escolher(chave: string, id: string) {
    setEsc((atual) => ({ ...atual, [chave]: id }));
    const url = new URL(window.location.href);
    url.searchParams.set(chave, id);
    window.history.replaceState(null, "", url);
  }
  const sel: Sel = Object.fromEntries(GR_LUZ.map((g) => [g.k, g.ops.find((o) => o.id === esc[g.k]) || g.ops[0]]));
  const k = contaLuz(sel);
  const urlNota = absoluteUrl(`/ferramentas/conta-de-luz/?w=${sel.w.id}&h=${sel.h.id}&tar=${sel.tar.id}`);
  const compartilhar = `https://wa.me/?text=${encodeURIComponent(`Conta do Elphy: PC de ${sel.w.curto} ligado ${sel.h.curto} por dia = R$ ${br(k.alvo)} por mês na luz. Estimativa pela metodologia. E a sua? ${urlNota}`)}`;
  return <div className="v3-fc-grid">
    <section className="v3-fc-escolha">
      <div className="v3-fc-abertura"><Image className="v3-mascote" src={assetPath("/brand/elphy-nota-claro.webp")} alt="Elphy mostra a conta numa nota de papel" width={120} height={120} priority /><p className="v3-etiqueta v3-verde">Ferramenta · Conta de luz</p><h1>Quanto o PC pesa na conta de luz<span className="v3-verde">?</span></h1><p>Toca nos watts, nas horas e na tarifa. A nota sai em reais por mês — e já mostra o ano.</p></div>
      {GR_LUZ.map((g, i) => <Fragment key={g.k}>
        <div className="v3-placa-rotulo"><p className="v3-etiqueta">{String(i + 1).padStart(2, "0")} · {g.titulo}</p><strong>{sel[g.k].curto} · {sel[g.k].sub}</strong></div>
        <div className="v3-placas" role="group" aria-label={g.titulo}>
          {g.ops.map((o) => <button type="button" key={o.id} aria-pressed={o.id === sel[g.k].id} onClick={() => escolher(g.k, o.id)}><strong>{o.curto}</strong><small>{o.sub}</small></button>)}
        </div>
        {g.dica && <p className="v3-letra-miuda">{g.dica}</p>}
      </Fragment>)}
    </section>
    <section className="v3-impressora" aria-label="Resultado da conta">
      <div className="v3-impressora-topo"><span>Impressora de contas</span><span>● Pronta</span></div>
      <div className="v3-recibo-wrap"><Nota codigo={`ELPHY-${k.numero}-${k.cod}`} className="v3-recibo" vivo>
        <div key={`${sel.w.id}-${sel.h.id}-${sel.tar.id}`} className="v3-recibo-conteudo">
          <div className="v3-nota-logo"><span>elphy<span className="v3-verde">.</span></span><b>Nº {k.numero}</b></div>
          <p className="v3-etiqueta">{k.cupom}</p><p className="v3-letra-miuda">Watts × horas × 30 dias × a tarifa da sua conta.</p>
          <div className="v3-recibo-secao"><p className="v3-etiqueta">A medição</p><dl>
            {k.linhas.map((l) => <div key={l.nome} className="v3-linha-pontos"><dt>{l.forte ? <b>{l.nome}</b> : l.nome}</dt><dd>{l.forte ? <b>{l.v}</b> : l.v}</dd></div>)}
          </dl></div>
          <div className="v3-veredito"><p className="v3-etiqueta">{k.rotulo} · por mês</p><h2>R$ {br(k.alvo)}</h2><p>{k.sub}</p></div>
          <div className="v3-recibo-secao"><p className="v3-etiqueta">A mesa inteira</p><p>{k.nota}</p></div>
          <p className="v3-letra-miuda">Estimativa pela fórmula da metodologia. Não garante compatibilidade.</p>
        </div>
      </Nota><div className="v3-selo-redondo" aria-hidden="true"><small>{k.seloTopo}</small><strong>{k.seloMeio}</strong><small>{k.seloBase}</small></div></div>
      <a className="v3-botao" href={compartilhar} target="_blank" rel="noopener noreferrer">Mandar a nota no WhatsApp ↗</a>
      <Link className="v3-botao v3-botao-contorno" href="/achados/">Ver os achados carimbados</Link>
    </section>
    <section className="v3-como-mede">
      <h2 className="v3-etiqueta v3-verde">Como a gente mede</h2>
      <p>Watts na tomada × horas por dia × 30 dias ÷ 1.000 dá os kWh do mês; vezes a tarifa, dá os reais. É o teto: o PC em carga o tempo todo.</p>
      <details className="v3-fc-detalhes"><summary>A fonte entra nessa conta</summary><div className="v3-fc-detalhes-corpo"><p>A conta usa watts na tomada. Se você só sabe o consumo das peças, some a perda da fonte: de 10% a 15% numa fonte com selo 80 Plus.</p></div></details>
      <div className="v3-vizinhas">
        <Link href="/metodologia/">Ver a metodologia →</Link>
        <Link href="/ferramentas/fonte/">Calcular os watts do meu PC →</Link>
      </div>
    </section>
  </div>;
}
