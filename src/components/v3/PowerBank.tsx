"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cargasPowerBank } from "@/lib/contas";
import { absoluteUrl, assetPath } from "@/lib/site";
import Nota from "./Nota";

// As mesmas opções da ferramenta anterior (components/dz/PowerBank.tsx).
const PB = [5000, 10000, 20000, 30000, 40000];
const CEL = [3000, 4000, 4500, 5000, 6000];
const br = (v: number, d: number) => v.toFixed(d).replace(".", ",");
const mil = (v: number) => String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
/** mAh × 3,7 V; 65% chega no celular; celular em 3,85 V (src/lib/contas.ts: cargasPowerBank). */
function conta(pb: number, cel: number) {
  const whC = (pb * 3.7) / 1000, util = whC * 0.65, whCel = (cel * 3.85) / 1000;
  return { whC, util, cel: whCel, cargas: cargasPowerBank(pb, cel), min: (whC * 0.6) / whCel, max: (whC * 0.7) / whCel, promete: pb / cel };
}

export default function PowerBank() {
  const [pb, setPb] = useState(20000);
  const [cel, setCel] = useState(5000);
  useEffect(() => {
    // link compartilhado (?pb=…&cel=…), o mesmo formato da nota antiga
    const ler = () => {
      const q = new URLSearchParams(window.location.search);
      const qPb = Number(q.get("pb")), qCel = Number(q.get("cel"));
      setPb(PB.includes(qPb) ? qPb : 20000);
      setCel(CEL.includes(qCel) ? qCel : 5000);
    };
    ler();
    window.addEventListener("popstate", ler);
    return () => window.removeEventListener("popstate", ler);
  }, []);
  function escolher(chave: "pb" | "cel", valor: number) {
    (chave === "pb" ? setPb : setCel)(valor);
    const url = new URL(window.location.href);
    url.searchParams.set(chave, String(valor));
    window.history.replaceState(null, "", url);
  }
  const k = conta(pb, cel);
  const numero = String(pb / 100).padStart(4, "0");
  const cargasTxt = br(k.cargas, 1), promete = br(k.promete, 1);
  const urlNota = absoluteUrl(`/ferramentas/power-bank/?pb=${pb}&cel=${cel}`);
  const compartilhar = `https://wa.me/?text=${encodeURIComponent(`Nota do Elphy: um power bank de ${mil(pb)} mAh carrega um celular de ${mil(cel)} mAh umas ${cargasTxt} vezes, não ${promete}. ${urlNota}`)}`;
  return <div className="v3-fc-grid">
    <section className="v3-fc-escolha">
      <div className="v3-fc-abertura"><Image className="v3-mascote" src={assetPath("/brand/elphy-mascot.webp")} alt="Elphy faz joinha segurando um celular" width={120} height={120} priority /><p className="v3-etiqueta v3-verde">Ferramenta · Power bank</p><h1>Quantas cargas ele dá de verdade<span className="v3-verde">?</span></h1><p>A caixa divide mAh por mAh. Parte da energia fica no caminho, e a nota mostra quanto.</p></div>
      <div className="v3-placa-rotulo"><p className="v3-etiqueta">01 · O que a caixa diz</p><strong>{mil(pb)} mAh</strong></div>
      <div className="v3-placas" role="group" aria-label="Escolha a capacidade do power bank">
        {PB.map((valor) => <button type="button" key={valor} aria-pressed={valor === pb} onClick={() => escolher("pb", valor)}><strong>{mil(valor)}</strong><small>mAh</small></button>)}
      </div>
      <div className="v3-placa-rotulo"><p className="v3-etiqueta">02 · Bateria do seu celular</p><strong>{mil(cel)} mAh</strong></div>
      <div className="v3-placas" role="group" aria-label="Escolha a bateria do seu celular">
        {CEL.map((valor) => <button type="button" key={valor} aria-pressed={valor === cel} onClick={() => escolher("cel", valor)}><strong>{mil(valor)}</strong><small>mAh</small></button>)}
      </div>
      <p className="v3-letra-miuda">Não sabe? Está na ficha do fabricante, na página do modelo.</p>
    </section>
    <section className="v3-impressora" aria-label="Resultado da medição">
      <div className="v3-impressora-topo"><span>Impressora de contas</span><span>● Pronta</span></div>
      <div className="v3-recibo-wrap"><Nota codigo={`ELPHY-${numero}-PB${pb / 1000}-CEL${cel / 1000}`} className="v3-recibo" vivo>
        <div key={`${pb}-${cel}`} className="v3-recibo-conteudo">
          <div className="v3-nota-logo"><span>elphy<span className="v3-verde">.</span></span><b>Nº {numero}</b></div>
          <p className="v3-etiqueta">Conta Elphy · Cupom de medição</p><p className="v3-letra-miuda">Energia: o que a caixa diz e o que chega.</p>
          <div className="v3-recibo-secao"><p className="v3-etiqueta">Na caixa</p><dl>
            <div className="v3-linha-pontos"><dt>{mil(pb)} mAh × 3,7 V</dt><dd>{br(k.whC, 1)} Wh</dd></div>
            <div className="v3-linha-pontos"><dt>Perde na conversão (~35%)</dt><dd>−{br(k.whC - k.util, 1)} Wh</dd></div>
            <div className="v3-linha-pontos"><dt><b>Chega no celular</b></dt><dd><b>{br(k.util, 1)} Wh</b></dd></div>
          </dl></div>
          <div className="v3-recibo-secao"><p className="v3-etiqueta">Promessa × verdade</p><dl>
            <div className="v3-linha-pontos"><dt>Celular {mil(cel)} mAh × 3,85 V</dt><dd>{br(k.cel, 1)} Wh</dd></div>
            <div className="v3-linha-pontos"><dt>Caixa promete</dt><dd>{promete} cargas</dd></div>
            <div className="v3-linha-pontos"><dt><b>Chega de verdade</b></dt><dd><b>{cargasTxt} cargas</b></dd></div>
          </dl></div>
          <div className="v3-veredito"><p className="v3-etiqueta">Cargas completas, de 0 a 100%</p><h2>{cargasTxt}</h2><p>Faixa: {br(k.min, 1)} a {br(k.max, 1)} cargas, conforme a eficiência (60–70%).</p></div>
          <div className="v3-recibo-secao"><p className="v3-etiqueta">Não é defeito nem golpe</p><p>A célula trabalha em 3,7 V e a USB entrega 5 V ou mais. A conversão esquenta e gasta.</p></div>
          <p className="v3-letra-miuda">Estimativa pela fórmula da metodologia. Não garante compatibilidade.</p>
        </div>
      </Nota><div className="v3-selo-redondo" aria-hidden="true"><small>De verdade</small><strong>{cargasTxt}</strong><small>cargas</small></div></div>
      <a className="v3-botao" href={compartilhar} target="_blank" rel="noopener noreferrer">Mandar a nota no WhatsApp ↗</a>
      <Link className="v3-botao v3-botao-contorno" href="/achados/">Ver os achados carimbados</Link>
    </section>
    <section className="v3-como-mede">
      <h2 className="v3-etiqueta v3-verde">Como a gente mede</h2>
      <p>mAh × 3,7 V dá a energia da célula; uns 65% chegam no celular, que carrega em 3,85 V. Dividiu, deu o número de cargas.</p>
      <details className="v3-fc-detalhes"><summary>Olhe na etiqueta de trás</summary><div className="v3-fc-detalhes-corpo"><p>Se ela traz &quot;capacidade nominal&quot; em mAh a 5 V, esse é o número honesto. Power bank que não imprime nenhum dos dois não entra na lista do Elphy.</p></div></details>
      <div className="v3-vizinhas">
        <Link href="/metodologia/">Ver a metodologia →</Link>
        <Link href="/ferramentas/ssd/">Próxima: cadê os GB do SSD? →</Link>
      </div>
    </section>
  </div>;
}
