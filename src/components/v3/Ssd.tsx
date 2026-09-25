"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SSD_OPCOES } from "@/lib/catalogo";
import { bytesDeRotuloGb } from "@/lib/contas";
import { absoluteUrl, assetPath } from "@/lib/site";
import Nota from "./Nota";

const PADRAO = 1000; // 1 TB, o mesmo padrão da ferramenta anterior (components/dz/Ssd.tsx)
const mil = (v: number) => String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const br = (v: number, d: number) => v.toFixed(d).replace(".", ",");
/** GB da caixa (10^9 bytes) no que o computador mostra (2^30 bytes). */
const gibDe = (gb: number) => bytesDeRotuloGb(gb) / Math.pow(1024, 3);

export default function Ssd() {
  const [gb, setGb] = useState(PADRAO);
  useEffect(() => {
    // link compartilhado (?gb=…), o mesmo formato da nota antiga
    const ler = () => {
      const q = Number(new URLSearchParams(window.location.search).get("gb"));
      setGb(SSD_OPCOES.some((x) => x.gb === q) ? q : PADRAO);
    };
    ler();
    window.addEventListener("popstate", ler);
    return () => window.removeEventListener("popstate", ler);
  }, []);
  function escolher(valor: number) {
    setGb(valor);
    const url = new URL(window.location.href);
    url.searchParams.set("gb", String(valor));
    window.history.replaceState(null, "", url);
  }
  const op = SSD_OPCOES.find((x) => x.gb === gb) ?? SSD_OPCOES[3];
  const g = gibDe(gb), tb = g >= 1024;
  // como o Windows: corta, não arredonda (512 GB → 476, 2 TB → 1,81 TB)
  const gib = Math.floor(g), some = Math.round(gb - gib);
  const perda = 1 - g / gb;
  const pct = br(perda * 100, 1), pctCurto = String(Math.round(perda * 100));
  const mostrado = tb ? br(Math.floor((g / 1024) * 100) / 100, 2) : String(gib);
  const unidade = tb ? "TB" : "GB";
  const numero = String(gb).padStart(4, "0");
  const urlNota = absoluteUrl(`/ferramentas/ssd/?gb=${gb}`);
  const compartilhar = `https://wa.me/?text=${encodeURIComponent(`Nota do Elphy: um SSD de ${op.rotulo} aparece como ${mil(gib)} GB no computador. ${urlNota}`)}`;
  return <div className="v3-fc-grid">
    <section className="v3-fc-escolha">
      <div className="v3-fc-abertura"><Image className="v3-mascote" src={assetPath("/brand/elphy-carimbo.webp")} alt="Elphy preparando o carimbo" width={120} height={120} priority /><p className="v3-etiqueta v3-verde">Ferramenta · Espaço do SSD</p><h1>Cadê os GB do meu SSD<span className="v3-verde">?</span></h1><p>A caixa conta de mil em mil. O Windows conta de 1.024 em 1.024. Nenhum dos dois está mentindo.</p></div>
      <div className="v3-placa-rotulo"><p className="v3-etiqueta">01 · O que a caixa diz</p><strong>{op.rotulo}</strong></div>
      <div className="v3-placas" role="group" aria-label="Escolha o tamanho da caixa do SSD">
        {SSD_OPCOES.map((item) => <button type="button" key={item.gb} aria-pressed={item.gb === gb} onClick={() => escolher(item.gb)}><strong>{item.rotulo}</strong><small>na caixa</small></button>)}
      </div>
      <p className="v3-letra-miuda">É o número grande da etiqueta: 1 TB, 512 GB, o que estiver impresso.</p>
    </section>
    <section className="v3-impressora" aria-label="Resultado da medição">
      <div className="v3-impressora-topo"><span>Impressora de contas</span><span>● Pronta</span></div>
      <div className="v3-recibo-wrap"><Nota codigo={`ELPHY-${numero}-CX${gb}-WIN${gib}`} className="v3-recibo" vivo>
        <div key={gb} className="v3-recibo-conteudo">
          <div className="v3-nota-logo"><span>elphy<span className="v3-verde">.</span></span><b>Nº {numero}</b></div>
          <p className="v3-etiqueta">Conta Elphy · Cupom de medição</p><p className="v3-letra-miuda">Espaço: o que a caixa diz e o que o Windows mostra.</p>
          <div className="v3-recibo-secao"><p className="v3-etiqueta">Na caixa ({op.rotulo})</p><dl>
            <div className="v3-linha-pontos"><dt>Bytes de verdade</dt><dd>{mil(gb * 1e9)}</dd></div>
            <div className="v3-linha-pontos"><dt>÷ 1.073.741.824</dt><dd>{mil(gib)} GB</dd></div>
          </dl><p className="v3-letra-miuda">1.024 × 1.024 × 1.024 — o jeito que o Windows conta.</p></div>
          <div className="v3-recibo-secao"><p className="v3-etiqueta">A diferença</p><dl>
            <div className="v3-linha-pontos"><dt>Some da conta</dt><dd>−{mil(some)} GB</dd></div>
            <div className="v3-linha-pontos"><dt><b>Em porcentagem</b></dt><dd><b>−{pct}%</b></dd></div>
          </dl></div>
          <div className="v3-veredito"><p className="v3-etiqueta">Aparece no Windows</p><h2>{mostrado} {unidade}</h2><p>Antes de instalar qualquer coisa. O sistema ocupa mais.</p></div>
          <div className="v3-recibo-secao"><p className="v3-etiqueta">Não é defeito</p><p>E não dá para recuperar. Se aparecer bem menos que isso, aí sim desconfie do SSD.</p></div>
          <p className="v3-letra-miuda">Estimativa pela fórmula da metodologia. Não garante compatibilidade.</p>
        </div>
      </Nota><div className="v3-selo-redondo" aria-hidden="true"><small>Normal</small><strong>−{pctCurto}%</strong><small>não é golpe</small></div></div>
      <a className="v3-botao" href={compartilhar} target="_blank" rel="noopener noreferrer">Mandar a nota no WhatsApp ↗</a>
      <Link className="v3-botao v3-botao-contorno" href="/achados/">Ver os achados carimbados</Link>
    </section>
    <section className="v3-como-mede">
      <h2 className="v3-etiqueta v3-verde">Como a gente mede</h2>
      <p>A caixa vende GB de 1 bilhão de bytes. O Windows divide os mesmos bytes por 1.073.741.824 (1.024³) e mostra menos. A diferença é só jeito de contar: uns 7%.</p>
      <details className="v3-fc-detalhes"><summary>Quando desconfiar do SSD</summary><div className="v3-fc-detalhes-corpo"><p>SSD de 2 TB por preço de 256 GB costuma ser pen drive com firmware mexido: mostra 2 TB e corrompe o que passar do tamanho real. Isso a conta não pega — só um teste de gravação.</p></div></details>
      <div className="v3-vizinhas">
        <Link href="/metodologia/">Ver a metodologia →</Link>
        <Link href="/ferramentas/power-bank/">Quantas cargas o power bank dá →</Link>
      </div>
    </section>
  </div>;
}
