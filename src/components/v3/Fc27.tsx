"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PLACAS, busca, nivel, VEREDITO, type Placa } from "@/lib/ferramentas/fc27";
import { assetPath, absoluteUrl } from "@/lib/site";
import Nota from "./Nota";

const RAPIDAS = ["gt-1030", "gtx-1050-ti", "gtx-1650", "rx-580", "rtx-3050", "rx-6600", "rtx-3060", "rtx-4060", "rtx-4070"];
const DESTAQUES = RAPIDAS.map((id) => PLACAS.find((placa) => placa.id === id)!);
const PADRAO = PLACAS.find((placa) => placa.id === "rx-580")!;
const DEGRAUS = [{ nome: "Mínimo", id: "gtx-1050-ti", placa: "GTX 1050 Ti / RX 570" }, { nome: "Recomendado", id: "gtx-1660", placa: "GTX 1660 / RX 5600 XT" }, { nome: "Alto", id: "rtx-3060", placa: "RTX 3060 / RX 6600 XT" }, { nome: "Ultra", id: "rtx-4070", placa: "RTX 4070 / RX 7800 XT" }];
const ORDEM = ["abaixo", "borrada", "meio", "nitida", "sobra", "ultra"];

export default function Fc27() {
  const [placa, setPlaca] = useState<Placa>(PADRAO);
  const [q, setQ] = useState("");
  const [todas, setTodas] = useState(false);
  useEffect(() => {
    const lerPlaca = () => {
      const id = new URLSearchParams(window.location.search).get("placa");
      setPlaca(PLACAS.find((item) => item.id === id) || PADRAO);
    };
    lerPlaca();
    window.addEventListener("popstate", lerPlaca);
    return () => window.removeEventListener("popstate", lerPlaca);
  }, []);
  function escolher(item: Placa) {
    setPlaca(item);
    const url = new URL(window.location.href);
    url.searchParams.set("placa", item.id);
    window.history.replaceState(null, "", url);
  }
  const degrau = nivel(placa.i);
  const veredito = VEREDITO[degrau];
  const tipo = degrau === "abaixo" ? "deixa" : ["borrada", "meio"].includes(degrau) ? "depende" : "vale";
  const palavra = tipo === "deixa" ? "Abaixo" : tipo === "depende" ? "Quase" : "Roda";
  const chips = q.trim() ? busca(q, PLACAS.length) : todas ? PLACAS : DESTAQUES;
  const urlNota = absoluteUrl(`/fc27/?placa=${placa.id}`);
  const compartilhar = `https://wa.me/?text=${encodeURIComponent(`Minha ${placa.nome} no FC 27: ${veredito.selo} (${veredito.imagem}). Estimativa, não teste de FPS. E a sua? ${urlNota}`)}`;
  return <div className="v3-fc-grid">
    <section className="v3-fc-escolha">
      <div className="v3-fc-abertura"><Image className="v3-mascote" src={assetPath("/brand/elphy-controle.webp")} alt="Elphy com um controle de videogame" width={120} height={120} priority /><p className="v3-etiqueta v3-verde">Ferramenta · Roda?</p><h1>Meu PC roda o FC 27<span className="v3-verde">?</span></h1><p>Toca na sua placa de vídeo. A nota compara com os requisitos de referência e mostra a imagem provável.</p></div>
      <div className="v3-placa-rotulo"><label className="v3-etiqueta" htmlFor="v3-placa">Sua placa de vídeo</label><strong>{placa.nome.replace(/^(GeForce|Radeon) /, "")}</strong></div>
      <input className="v3-campo-placa" id="v3-placa" type="search" value={q} onChange={(event) => setQ(event.target.value)} placeholder="Buscar: GTX 1650, RX 580, 1660s…" aria-controls="v3-placas" autoComplete="off" />
      <div id="v3-placas" className={`v3-placas${todas || q.trim() ? " v3-placas-todas" : ""}`} role="group" aria-label="Escolha sua placa de vídeo">
        {chips.map((item) => <button type="button" key={item.id} aria-pressed={item.id === placa.id} onClick={() => escolher(item)}><strong>{item.nome.replace(/^(GeForce|Radeon|Intel) /, "")}</strong><small>{item.nome.split(" ")[0]}</small></button>)}
      </div>
      {q.trim() && <p className="v3-resultado-busca" role="status">{chips.length ? `${chips.length} placas encontradas. Selecione uma para imprimir a nota.` : "Não achei essa. Tente só o número ou confira em Gerenciador de Tarefas → Desempenho → GPU."}</p>}
      {!q.trim() && <button className="v3-ver-placas" type="button" aria-expanded={todas} aria-controls="v3-placas" onClick={() => setTodas(!todas)}>{todas ? "Mostrar as mais buscadas" : `Ver todas as ${PLACAS.length} placas`}</button>}
    </section>
    <section className="v3-impressora" aria-label="Resultado da estimativa">
      <div className="v3-impressora-topo"><span>Impressora de contas</span><span>● Pronta</span></div>
      <div className="v3-recibo-wrap"><Nota codigo={`ELPHY-FC27-${placa.id}`} className="v3-recibo">
        <div key={placa.id} className="v3-recibo-conteudo">
          <div className="v3-nota-logo"><span>elphy<span className="v3-verde">.</span></span><b>FC 27</b></div>
          <p className="v3-etiqueta">Conta Elphy · Roda o FC 27?</p><p className="v3-letra-miuda">Base atualizada em 24/09/2026</p>
          <div className="v3-recibo-secao"><p className="v3-etiqueta">Sua placa de vídeo</p><strong>{placa.nome}</strong></div>
          <div className="v3-recibo-secao"><p className="v3-etiqueta">Requisitos de referência</p><dl>{DEGRAUS.map((item) => {
            const atende = ORDEM.indexOf(degrau) >= ORDEM.indexOf(nivel(PLACAS.find((p) => p.id === item.id)!.i));
            return <div key={item.nome} className="v3-linha-pontos"><dt>{item.nome}<small>{item.placa}</small></dt><dd><span aria-label={atende ? "Alcança este degrau" : "Abaixo deste degrau"}>{atende ? "✓" : "·"}</span></dd></div>;
          })}</dl></div>
          <div className="v3-veredito"><p className="v3-etiqueta">Veredito</p><h2>{palavra}</h2><strong>{veredito.selo} · {veredito.imagem}</strong><p>{veredito.texto}</p></div>
          <div className="v3-recibo-secao"><p className="v3-etiqueta">{tipo === "vale" ? "Antes de jogar" : "Se quiser subir um degrau"}</p><p>{tipo === "vale" ? "Sua placa alcança o recomendado ou mais. Confira também o restante do PC." : "Compare os requisitos abaixo. Antes de trocar de placa, confira a fonte e o restante do PC."}</p></div>
          <p className="v3-letra-miuda">Estimativa pela placa de vídeo, não é teste de FPS. Processador, memória e SSD também contam.</p>
        </div>
      </Nota><div className={`v3-selo-redondo v3-selo-${tipo}`} aria-hidden="true"><small>FC 27</small><strong>{palavra}</strong><small>{veredito.selo}</small></div></div>
      <a className="v3-botao" href={compartilhar} target="_blank" rel="noopener noreferrer">Mandar a nota no WhatsApp ↗</a><Link className="v3-botao v3-botao-contorno" href="/achados/">Ver os achados carimbados</Link>
    </section>
    <section className="v3-como-mede"><h2 className="v3-etiqueta v3-verde">Como a gente mede</h2><p>Comparamos o desempenho relativo da placa com as placas de referência de cada degrau. É uma estimativa de imagem, não um teste no FC 27 nem uma garantia de FPS.</p><Link href="/metodologia/">Ver a metodologia →</Link></section>
  </div>;
}
