"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Achado, CarimboTipo } from "@/content/achados";
import { CARIMBOS, CATEGORIAS, COLECOES, filtrarAchados } from "@/lib/achados";
import { assetPath } from "@/lib/site";
import TiraAchado from "./TiraAchado";
import Nota from "./Nota";

export default function ListaAchados({ itens, home = false }: { itens: Achado[]; home?: boolean }) {
  const [categoria, setCategoria] = useState("");
  const [colecao, setColecao] = useState("");
  const [carimbo, setCarimbo] = useState<CarimboTipo>();
  const [q, setQ] = useState("");
  useEffect(() => {
    if (home) return;
    const lerBusca = () => setQ(new URLSearchParams(window.location.search).get("q") || "");
    lerBusca();
    window.addEventListener("popstate", lerBusca);
    return () => window.removeEventListener("popstate", lerBusca);
  }, [home]);
  const filtrados = filtrarAchados(itens, { categoria, colecao, carimbo, busca: q });
  const lista = home ? filtrados.slice(0, 4) : filtrados;
  const limpar = () => { setCategoria(""); setColecao(""); setCarimbo(undefined); setQ(""); if (!home) window.history.replaceState(null, "", window.location.pathname); };
  return <section className={`v3-listagem${home ? " v3-listagem-home" : ""}`} aria-label="Lista de achados">
    {home && <div className="v3-titulo-linha"><h2>Achados da semana</h2><Link href="/achados/">Ver todos<span className="v3-so-desktop"> os achados</span></Link></div>}
    <div className="v3-chips v3-rolagem" role="group" aria-label="Categorias">
      {["Tudo", ...CATEGORIAS].map((nome) => <button type="button" key={nome} aria-pressed={categoria === (nome === "Tudo" ? "" : nome)} onClick={() => setCategoria(nome === "Tudo" ? "" : nome)}>{nome}</button>)}
    </div>
    {!home && <>
      <div className="v3-colecoes"><p className="v3-etiqueta">Coleções</p><div className="v3-rolagem" role="group" aria-label="Coleções">{COLECOES.map((nome) => <button type="button" key={nome} aria-pressed={colecao === nome} onClick={() => setColecao(colecao === nome ? "" : nome)}><strong>{nome}</strong><small>{itens.filter((item) => item.colecoes.includes(nome)).length} achados</small></button>)}</div></div>
      <div className="v3-filtros"><div className="v3-rolagem" role="group" aria-label="Filtrar por carimbo">{(Object.keys(CARIMBOS) as CarimboTipo[]).map((tipo) => <button className={`v3-filtro-carimbo v3-filtro-${tipo}`} type="button" key={tipo} aria-pressed={carimbo === tipo} onClick={() => setCarimbo(carimbo === tipo ? undefined : tipo)}>{CARIMBOS[tipo]}</button>)}<span className="v3-filtro-visual" title="Filtro por loja em breve">Loja ▾</span><span className="v3-filtro-visual" title="Filtro por preço em breve">Preço ▾</span></div><p className="v3-etiqueta" role="status">{lista.length} {lista.length === 1 ? "achado" : "achados"}</p></div>
      {q && <p className="v3-busca-resumo">Busca: <strong>{q}</strong> <button type="button" onClick={limpar}>Limpar busca e filtros</button></p>}
    </>}
    {lista.length ? <div className="v3-achados-grid">{lista.map((achado) => <TiraAchado key={achado.slug} achado={achado} />)}</div> : <Nota className="v3-vazio">
      <Image src={assetPath("/brand/elphy-carimbo.webp")} alt="Elphy preparando o carimbo" width={150} height={150} />
      <div><p className="v3-etiqueta">{itens.length ? "Vamos tentar de novo" : "O carimbo está quase pronto"}</p><h3>{itens.length ? "Nenhum achado com esses filtros." : "Os primeiros achados carimbados chegam esta semana."}</h3><p>{itens.length ? "Mude a categoria, a coleção ou o carimbo para ver outros achados." : "Enquanto isso, o Elphy faz a conta com você."}</p>{itens.length ? <button className="v3-botao" type="button" onClick={limpar}>Limpar filtros</button> : <Link className="v3-botao" href="/fc27/">Meu PC roda o FC 27? →</Link>}</div>
    </Nota>}
    {home && <Link className="v3-botao v3-todos" href="/achados/">Ver os achados da semana →</Link>}
  </section>;
}
