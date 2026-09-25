"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { f, type Opcao } from "@/components/dz/useFerramenta";
import { contaMemoria, GR_MEMORIA, INICIAL_MEMORIA } from "@/lib/ferramentas/memoria";
import { absoluteUrl, assetPath } from "@/lib/site";
import Nota from "./Nota";

type Processador = Opcao & { sock: string; tipo: string; teto: number; t4?: number };
const GRUPO = GR_MEMORIA[0];
const PROCESSADORES = GRUPO.ops as Processador[];
const PADRAO = PROCESSADORES.find((item) => item.id === INICIAL_MEMORIA.plat)!;

export default function Memoria() {
  const [proc, setProc] = useState<Processador>(PADRAO);
  useEffect(() => {
    // link compartilhado (?plat=…), o mesmo formato da nota antiga e das dicas
    const ler = () => {
      const id = new URLSearchParams(window.location.search).get("plat");
      setProc(PROCESSADORES.find((item) => item.id === id) || PADRAO);
    };
    ler();
    window.addEventListener("popstate", ler);
    return () => window.removeEventListener("popstate", ler);
  }, []);
  function escolher(item: Processador) {
    setProc(item);
    const url = new URL(window.location.href);
    url.searchParams.set("plat", item.id);
    window.history.replaceState(null, "", url);
  }
  const conta = contaMemoria({ plat: proc });
  const urlNota = absoluteUrl(`/ferramentas/memoria/?plat=${proc.id}`);
  const compartilhar = `https://wa.me/?text=${encodeURIComponent(`Nota do Elphy: ${proc.curto} usa ${proc.tipo} com teto oficial de ${f(proc.teto)} MT/s. ${urlNota}`)}`;
  return <div className="v3-fc-grid">
    <section className="v3-fc-escolha">
      <div className="v3-fc-abertura"><Image className="v3-mascote" src={assetPath("/brand/elphy-nota-claro.webp")} alt="Elphy mostra uma nota de papel" width={120} height={120} priority /><p className="v3-etiqueta v3-verde">Ferramenta · Memória certa</p><h1>Qual memória o meu processador aceita<span className="v3-verde">?</span></h1><p>Toca na geração do processador. A nota diz o tipo de memória e o teto oficial de velocidade.</p></div>
      <div className="v3-placa-rotulo"><p className="v3-etiqueta">01 · {GRUPO.titulo}</p><strong>{proc.curto} · {proc.sock}</strong></div>
      <div className="v3-placas" role="group" aria-label="Escolha a geração do processador">
        {PROCESSADORES.map((item) => <button type="button" key={item.id} aria-pressed={item.id === proc.id} onClick={() => escolher(item)}><strong>{item.curto}</strong><small>{item.sub}</small></button>)}
      </div>
      <p className="v3-letra-miuda">{GRUPO.dica}</p>
    </section>
    <section className="v3-impressora" aria-label="Resultado da consulta">
      <div className="v3-impressora-topo"><span>Impressora de contas</span><span>● Pronta</span></div>
      <div className="v3-recibo-wrap"><Nota codigo={`ELPHY-${conta.numero}-${conta.cod}`} className="v3-recibo" vivo>
        <div key={proc.id} className="v3-recibo-conteudo">
          <div className="v3-nota-logo"><span>elphy<span className="v3-verde">.</span></span><b>Nº {conta.numero}</b></div>
          <p className="v3-etiqueta">Conta Elphy · {conta.cupom}</p><p className="v3-letra-miuda">O que a especificação oficial diz sobre a memória.</p>
          <div className="v3-recibo-secao"><p className="v3-etiqueta">Seu processador</p><strong>{proc.curto}</strong></div>
          <div className="v3-recibo-secao"><p className="v3-etiqueta">A especificação</p><dl>
            {conta.linhas.map((linha) => <div key={linha.nome} className="v3-linha-pontos"><dt>{linha.forte ? <b>{linha.nome}</b> : linha.nome}</dt><dd>{linha.forte ? <b>{linha.v}</b> : linha.v}</dd></div>)}
          </dl></div>
          <div className="v3-veredito"><p className="v3-etiqueta">{conta.rotulo}</p><h2>{f(proc.teto)} {conta.unidade}</h2><p>{conta.sub}</p></div>
          <div className="v3-recibo-secao"><p className="v3-etiqueta">Antes de comprar</p><p>Use dois pentes iguais: o canal duplo é desempenho de graça.</p></div>
          <p className="v3-letra-miuda">{conta.nota}</p>
        </div>
      </Nota><div className="v3-selo-redondo" aria-hidden="true"><small>{conta.seloTopo}</small><strong>{conta.seloMeio}</strong><small>{conta.seloBase}</small></div></div>
      <a className="v3-botao" href={compartilhar} target="_blank" rel="noopener noreferrer">Mandar a nota no WhatsApp ↗</a>
      <Link className="v3-botao v3-botao-contorno" href="/achados/">Ver os achados carimbados</Link>
    </section>
    <section className="v3-como-mede">
      <h2 className="v3-etiqueta v3-verde">Como a gente mede</h2>
      <p>Tipo e teto vêm da ficha oficial de cada processador, não de teste nosso. Pente mais rápido que o teto funciona pelo perfil XMP ou EXPO, fora da especificação.</p>
      <details className="v3-fc-detalhes"><summary>DDR4 e DDR5 não se misturam</summary><div className="v3-fc-detalhes-corpo"><p>O chanfro do pente fica em lugar diferente: DDR5 não entra em slot de DDR4, nem ao contrário. Confira qual a placa-mãe usa antes de comprar.</p></div></details>
      <div className="v3-vizinhas">
        <Link href="/metodologia/">Ver a metodologia →</Link>
        <Link href="/montador/">Conferir o PC inteiro no montador →</Link>
        <Link href="/ferramentas/fonte/">Qual fonte esse PC pede →</Link>
      </div>
    </section>
  </div>;
}
