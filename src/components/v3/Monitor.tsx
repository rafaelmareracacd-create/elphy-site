"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { type Opcao } from "@/components/dz/useFerramenta";
import { contaMonitor, GR_MONITOR, INICIAL_MONITOR } from "@/lib/ferramentas/monitor";
import { absoluteUrl, assetPath } from "@/lib/site";
import Nota from "./Nota";

const [GR_POL, GR_RES] = GR_MONITOR;
const POL_PADRAO = GR_POL.ops.find((item) => item.id === INICIAL_MONITOR.pol)!;
const RES_PADRAO = GR_RES.ops.find((item) => item.id === INICIAL_MONITOR.res)!;

export default function Monitor() {
  const [pol, setPol] = useState<Opcao>(POL_PADRAO);
  const [res, setRes] = useState<Opcao>(RES_PADRAO);
  useEffect(() => {
    // link compartilhado (?pol=…&res=…), o mesmo formato da nota antiga
    const ler = () => {
      const q = new URLSearchParams(window.location.search);
      setPol(GR_POL.ops.find((item) => item.id === q.get("pol")) || POL_PADRAO);
      setRes(GR_RES.ops.find((item) => item.id === q.get("res")) || RES_PADRAO);
    };
    ler();
    window.addEventListener("popstate", ler);
    return () => window.removeEventListener("popstate", ler);
  }, []);
  function escolher(chave: "pol" | "res", item: Opcao) {
    (chave === "pol" ? setPol : setRes)(item);
    const url = new URL(window.location.href);
    url.searchParams.set(chave, item.id);
    window.history.replaceState(null, "", url);
  }
  const conta = contaMonitor({ pol, res });
  const distancia = conta.linhas.find((linha) => linha.forte)?.v ?? "";
  const urlNota = absoluteUrl(`/ferramentas/monitor/?pol=${pol.id}&res=${res.id}`);
  const compartilhar = `https://wa.me/?text=${encodeURIComponent(`Nota do Elphy: monitor de ${pol.curto} em ${res.curto} dá ${conta.seloMeio} PPI — o pixel some a partir de ${distancia}. ${urlNota}`)}`;
  return <div className="v3-fc-grid">
    <section className="v3-fc-escolha">
      <div className="v3-fc-abertura"><Image className="v3-mascote" src={assetPath("/brand/elphy-controle.webp")} alt="Elphy com um controle de videogame na frente da tela" width={120} height={120} priority /><p className="v3-etiqueta v3-verde">Ferramenta · Nitidez do monitor</p><h1>Esse monitor é nítido de verdade<span className="v3-verde">?</span></h1><p>Toca no tamanho e na resolução. A nota junta os dois em PPI e diz de que distância o pixel some.</p></div>
      <div className="v3-placa-rotulo"><p className="v3-etiqueta">01 · {GR_POL.titulo}</p><strong>{pol.curto}</strong></div>
      <div className="v3-placas" role="group" aria-label="Escolha o tamanho da tela">
        {GR_POL.ops.map((item) => <button type="button" key={item.id} aria-pressed={item.id === pol.id} onClick={() => escolher("pol", item)}><strong>{item.curto}</strong><small>{item.sub}</small></button>)}
      </div>
      <div className="v3-placa-rotulo"><p className="v3-etiqueta">02 · {GR_RES.titulo}</p><strong>{res.curto} · {res.sub}</strong></div>
      <div className="v3-placas" role="group" aria-label="Escolha a resolução">
        {GR_RES.ops.map((item) => <button type="button" key={item.id} aria-pressed={item.id === res.id} onClick={() => escolher("res", item)}><strong>{item.curto}</strong><small>{item.sub}</small></button>)}
      </div>
      <p className="v3-letra-miuda">Os dois números saem da caixa: o tamanho em polegadas e a resolução do painel.</p>
    </section>
    <section className="v3-impressora" aria-label="Resultado da medição">
      <div className="v3-impressora-topo"><span>Impressora de contas</span><span>● Pronta</span></div>
      <div className="v3-recibo-wrap"><Nota codigo={`ELPHY-${conta.numero}-${conta.cod}`} className="v3-recibo" vivo>
        <div key={`${pol.id}-${res.id}`} className="v3-recibo-conteudo">
          <div className="v3-nota-logo"><span>elphy<span className="v3-verde">.</span></span><b>Nº {conta.numero}</b></div>
          <p className="v3-etiqueta">Conta Elphy · {conta.cupom}</p><p className="v3-letra-miuda">Nitidez: o que tamanho e resolução dizem juntos.</p>
          <div className="v3-recibo-secao"><p className="v3-etiqueta">Sua tela</p><strong>{pol.curto} · {res.curto}</strong></div>
          <div className="v3-recibo-secao"><p className="v3-etiqueta">A conta</p><dl>
            {conta.linhas.map((linha) => <div key={linha.nome} className="v3-linha-pontos"><dt>{linha.forte ? <b>{linha.nome}</b> : linha.nome}</dt><dd>{linha.forte ? <b>{linha.v}</b> : linha.v}</dd></div>)}
          </dl></div>
          <div className="v3-veredito"><p className="v3-etiqueta">{conta.rotulo}</p><h2>{conta.seloMeio} {conta.unidade}</h2><p>{conta.sub}</p></div>
          <div className="v3-recibo-secao"><p className="v3-etiqueta">Pegue a trena</p><p>Meça do seu olho até a tela na sua mesa. Menor que o da nota, você vê o pixel.</p></div>
          <p className="v3-letra-miuda">Estimativa pela fórmula da metodologia. Não garante compatibilidade.</p>
        </div>
      </Nota><div className="v3-selo-redondo" aria-hidden="true"><small>{conta.seloTopo}</small><strong>{conta.seloMeio}</strong><small>{conta.seloBase}</small></div></div>
      <a className="v3-botao" href={compartilhar} target="_blank" rel="noopener noreferrer">Mandar a nota no WhatsApp ↗</a>
      <Link className="v3-botao v3-botao-contorno" href="/achados/">Ver os achados carimbados</Link>
    </section>
    <section className="v3-como-mede">
      <h2 className="v3-etiqueta v3-verde">Como a gente mede</h2>
      <p>A diagonal em pixels dividida pelo tamanho da tela dá o PPI. Com ele, a regra de 1 minuto de arco diz a distância em que o olho para de separar um pixel do outro.</p>
      <details className="v3-fc-detalhes"><summary>O que o PPI não mede</summary><div className="v3-fc-detalhes-corpo"><p>{conta.nota} Para jogo, olhe também a taxa de atualização (Hz) e o tempo de resposta do painel.</p></div></details>
      <div className="v3-vizinhas">
        <Link href="/metodologia/">Ver a metodologia →</Link>
        <Link href="/fc27/">Meu PC roda o FC 27 →</Link>
        <Link href="/ferramentas/fonte/">Qual fonte esse PC pede →</Link>
      </div>
    </section>
  </div>;
}
