"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { escolhidos, f, type Escolha } from "@/components/dz/useFerramenta";
import { contaGabinete, GR_GABINETE, INICIAL_GABINETE } from "@/lib/ferramentas/gabinete";
import { absoluteUrl, assetPath } from "@/lib/site";
import Nota from "./Nota";

export default function Gabinete() {
  const [esc, setEsc] = useState<Escolha>(INICIAL_GABINETE);
  useEffect(() => {
    // link compartilhado (?gpu=…&gv=…&cool=…&gc=…), o mesmo formato da nota antiga
    const ler = () => {
      const q = new URLSearchParams(window.location.search);
      const patch: Escolha = { ...INICIAL_GABINETE };
      GR_GABINETE.forEach((g) => { const id = q.get(g.k); if (id && g.ops.some((o) => o.id === id)) patch[g.k] = id; });
      setEsc(patch);
    };
    ler();
    window.addEventListener("popstate", ler);
    return () => window.removeEventListener("popstate", ler);
  }, []);
  function escolher(k: string, id: string) {
    setEsc((a) => ({ ...a, [k]: id }));
    const url = new URL(window.location.href);
    url.searchParams.set(k, id);
    window.history.replaceState(null, "", url);
  }
  const sel = escolhidos(GR_GABINETE, esc);
  const conta = contaGabinete(sel);
  const sobra = `${conta.pre}${f(conta.alvo)} ${conta.unidade}`;
  const chave = GR_GABINETE.map((g) => sel[g.k].id).join("-");
  const urlNota = absoluteUrl(`/ferramentas/gabinete/?${GR_GABINETE.map((g) => `${g.k}=${sel[g.k].id}`).join("&")}`);
  const compartilhar = `https://wa.me/?text=${encodeURIComponent(`Nota do Elphy: placa de ${sel.gpu.curto} e cooler de ${sel.cool.curto} nesse gabinete — ${conta.seloMeio}. Menor sobra: ${sobra}. E aí no seu? ${urlNota}`)}`;
  return <div className="v3-fc-grid">
    <section className="v3-fc-escolha">
      <div className="v3-fc-abertura"><Image className="v3-mascote" src={assetPath("/brand/elphy-heroi.webp")} alt="Elphy, o elefante verde de moletom, segura um carimbo no alto" width={120} height={120} priority /><p className="v3-etiqueta v3-verde">Ferramenta · Cabe no gabinete?</p><h1>Cabe no meu gabinete<span className="v3-verde">?</span></h1><p>Quatro números de ficha, dois de cada lado. A nota diz quantos milímetros sobram — ou faltam.</p></div>
      {GR_GABINETE.map((g, i) => <div key={g.k}>
        <div className="v3-placa-rotulo"><p className="v3-etiqueta">{String(i + 1).padStart(2, "0")} · {g.titulo}</p><strong>{sel[g.k].curto} · {sel[g.k].sub}</strong></div>
        <div className="v3-placas" role="group" aria-label={g.titulo}>
          {g.ops.map((o) => <button type="button" key={o.id} aria-pressed={o.id === sel[g.k].id} onClick={() => escolher(g.k, o.id)}><strong>{o.curto}</strong><small>{o.sub}</small></button>)}
        </div>
        {g.dica && <p className="v3-letra-miuda">{g.dica}</p>}
      </div>)}
    </section>
    <section className="v3-impressora" aria-label="Resultado da medição">
      <div className="v3-impressora-topo"><span>Impressora de contas</span><span>● Pronta</span></div>
      <div className="v3-recibo-wrap"><Nota codigo={`ELPHY-${conta.numero}-${conta.cod}`} className="v3-recibo" vivo>
        <div key={chave} className="v3-recibo-conteudo">
          <div className="v3-nota-logo"><span>elphy<span className="v3-verde">.</span></span><b>Nº {conta.numero}</b></div>
          <p className="v3-etiqueta">Conta Elphy · {conta.cupom}</p><p className="v3-letra-miuda">Espaço da ficha menos a peça, dos dois lados.</p>
          <div className="v3-recibo-secao"><p className="v3-etiqueta">A placa de vídeo</p><dl>
            {conta.linhas.slice(0, 3).map((linha) => <div key={linha.nome} className="v3-linha-pontos"><dt>{linha.forte ? <b>{linha.nome}</b> : linha.nome}</dt><dd>{linha.forte ? <b>{linha.v}</b> : linha.v}</dd></div>)}
          </dl></div>
          <div className="v3-recibo-secao"><p className="v3-etiqueta">O cooler</p><dl>
            {conta.linhas.slice(3).map((linha) => <div key={linha.nome} className="v3-linha-pontos"><dt>{linha.forte ? <b>{linha.nome}</b> : linha.nome}</dt><dd>{linha.forte ? <b>{linha.v}</b> : linha.v}</dd></div>)}
          </dl></div>
          <div className="v3-veredito"><p className="v3-etiqueta">{conta.rotulo}</p><h2>{sobra}</h2><p>{conta.sub}</p></div>
          <div className="v3-recibo-secao"><p className="v3-etiqueta">Antes de montar</p><p>{conta.nota}</p></div>
          <p className="v3-letra-miuda">Estimativa pela fórmula da metodologia. Não garante compatibilidade.</p>
        </div>
      </Nota><div className={`v3-selo-redondo${conta.ok ? "" : " v3-selo-depende"}`} aria-hidden="true"><small>{conta.seloTopo}</small><strong>{conta.seloMeio}</strong><small>{conta.seloBase}</small></div></div>
      <a className="v3-botao" href={compartilhar} target="_blank" rel="noopener noreferrer">Mandar a nota no WhatsApp ↗</a>
      <Link className="v3-botao v3-botao-contorno" href="/achados/">Ver os achados carimbados</Link>
    </section>
    <section className="v3-como-mede">
      <h2 className="v3-etiqueta v3-verde">Como a gente mede</h2>
      <p>Espaço da ficha do gabinete menos o comprimento da placa e a altura do cooler. Margem do Elphy: 10 mm para a placa e 3 mm para o cooler, porque cabo de energia e ventoinha na frente comem espaço.</p>
      <details className="v3-fc-detalhes"><summary>Ventoinha e radiador contam</summary><div className="v3-fc-detalhes-corpo"><p>Radiador de water cooler na frente come de 25 a 55 mm do espaço da placa. A ficha do gabinete costuma dar o número com e sem ele — use o menor.</p></div></details>
      <div className="v3-vizinhas">
        <Link href="/metodologia/">Ver a metodologia →</Link>
        <Link href="/montador/">Conferir o PC inteiro no montador →</Link>
        <Link href="/ferramentas/fonte/">Qual fonte esse PC pede →</Link>
      </div>
    </section>
  </div>;
}
