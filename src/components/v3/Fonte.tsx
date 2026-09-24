"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AVISO_CATALOGO, cpusFonte, gpusFonte, type PecaFonte } from "@/lib/catalogo";
import { fonteRecomendada } from "@/lib/contas";
import { absoluteUrl, assetPath } from "@/lib/site";
import Nota from "./Nota";

// A mesma ordem da calculadora anterior (lib/ferramentas/fonte.ts): o Ryzen 5 7600 abre a fila.
const CPUS = [...cpusFonte].sort((a, b) => (a.id === "r5-7600" ? -1 : b.id === "r5-7600" ? 1 : 0));
const GPU_PADRAO = gpusFonte.find((item) => item.id === "rtx-5070")!;
const CPU_PADRAO = cpusFonte.find((item) => item.id === "r5-7600")!;

export default function Fonte() {
  const [gpu, setGpu] = useState<PecaFonte>(GPU_PADRAO);
  const [cpu, setCpu] = useState<PecaFonte>(CPU_PADRAO);
  useEffect(() => {
    // link compartilhado (?gpu=…&cpu=…), o mesmo formato da busca e da nota antiga
    const ler = () => {
      const q = new URLSearchParams(window.location.search);
      setGpu(gpusFonte.find((item) => item.id === q.get("gpu")) || GPU_PADRAO);
      setCpu(cpusFonte.find((item) => item.id === q.get("cpu")) || CPU_PADRAO);
    };
    ler();
    window.addEventListener("popstate", ler);
    return () => window.removeEventListener("popstate", ler);
  }, []);
  function escolher(chave: "gpu" | "cpu", item: PecaFonte) {
    (chave === "gpu" ? setGpu : setCpu)(item);
    const url = new URL(window.location.href);
    url.searchParams.set(chave, item.id);
    window.history.replaceState(null, "", url);
  }
  const conta = fonteRecomendada(gpu.w, cpu.w);
  const numero = String(conta.recomendado).padStart(4, "0");
  const urlNota = absoluteUrl(`/ferramentas/fonte/?gpu=${gpu.id}&cpu=${cpu.id}`);
  const compartilhar = `https://wa.me/?text=${encodeURIComponent(`Minha conta do Elphy: ${gpu.curto} + ${cpu.curto} = fonte de ${conta.recomendado} W. Estimativa pela fórmula da metodologia. E a sua? ${urlNota}`)}`;
  return <div className="v3-fc-grid">
    <section className="v3-fc-escolha">
      <div className="v3-fc-abertura"><Image className="v3-mascote" src={assetPath("/brand/elphy-nota.webp")} alt="Elphy segura uma nota comprida" width={120} height={120} priority /><p className="v3-etiqueta v3-verde">Ferramenta · Calculadora de fonte</p><h1>Qual fonte o meu PC pede<span className="v3-verde">?</span></h1><p>Toca na placa e no processador. A nota soma o consumo, põe 30% de folga para os picos e aponta o degrau comercial.</p></div>
      <div className="v3-placa-rotulo"><p className="v3-etiqueta">01 · Placa de vídeo</p><strong>{gpu.curto} · {gpu.w} W</strong></div>
      <div className="v3-placas" role="group" aria-label="Escolha a placa de vídeo">
        {gpusFonte.map((item) => <button type="button" key={item.id} aria-pressed={item.id === gpu.id} onClick={() => escolher("gpu", item)}><strong>{item.curto}</strong><small>{item.w} W</small></button>)}
      </div>
      <div className="v3-placa-rotulo"><p className="v3-etiqueta">02 · Processador</p><strong>{cpu.curto} · {cpu.w} W</strong></div>
      <div className="v3-placas" role="group" aria-label="Escolha o processador">
        {CPUS.map((item) => <button type="button" key={item.id} aria-pressed={item.id === cpu.id} onClick={() => escolher("cpu", item)}><strong>{item.curto}</strong><small>{item.w} W</small></button>)}
      </div>
    </section>
    <section className="v3-impressora" aria-label="Resultado da conta">
      <div className="v3-impressora-topo"><span>Impressora de contas</span><span>● Pronta</span></div>
      <div className="v3-recibo-wrap"><Nota codigo={`ELPHY-${numero}-${gpu.cod}-${cpu.cod}`} className="v3-recibo" vivo>
        <div key={`${gpu.id}-${cpu.id}`} className="v3-recibo-conteudo">
          <div className="v3-nota-logo"><span>elphy<span className="v3-verde">.</span></span><b>Nº {numero}</b></div>
          <p className="v3-etiqueta">Conta Elphy · Cupom de consumo</p><p className="v3-letra-miuda">{AVISO_CATALOGO}</p>
          <div className="v3-recibo-secao"><p className="v3-etiqueta">As peças</p><dl>
            <div className="v3-linha-pontos"><dt>{gpu.nome}</dt><dd>{gpu.w} W</dd></div>
            <div className="v3-linha-pontos"><dt>{cpu.nome}</dt><dd>{cpu.w} W</dd></div>
            <div className="v3-linha-pontos"><dt>Mãe, memória, SSD</dt><dd>60 W</dd></div>
          </dl></div>
          <div className="v3-recibo-secao"><p className="v3-etiqueta">A soma</p><dl>
            <div className="v3-linha-pontos"><dt>Consumo em carga</dt><dd>{conta.consumo} W</dd></div>
            <div className="v3-linha-pontos"><dt>Folga (+30%)</dt><dd>{conta.folgaW} W</dd></div>
            <div className="v3-linha-pontos"><dt><b>Total com folga</b></dt><dd><b>{conta.comFolga} W</b></dd></div>
          </dl></div>
          <div className="v3-veredito"><p className="v3-etiqueta">Fonte recomendada</p><h2>{conta.recomendado} W</h2><p>Degrau comercial logo acima de {conta.comFolga} W.</p></div>
          <div className="v3-recibo-secao"><p className="v3-etiqueta">Antes de comprar</p><p>Só vale fonte com relatório de teste público. Watt escrito na caixa não conta.</p></div>
          <p className="v3-letra-miuda">Estimativa pela fórmula da metodologia. Não garante compatibilidade.</p>
        </div>
      </Nota><div className="v3-selo-redondo" aria-hidden="true"><small>Sua fonte</small><strong>{conta.recomendado}</strong><small>watts</small></div></div>
      <a className="v3-botao" href={compartilhar} target="_blank" rel="noopener noreferrer">Mandar a nota no WhatsApp ↗</a>
      <Link className="v3-botao v3-botao-contorno" href="/achados/">Ver os achados carimbados</Link>
    </section>
    <section className="v3-como-mede">
      <h2 className="v3-etiqueta v3-verde">Como a gente mede</h2>
      <p>Consumo em carga da placa e do processador, mais 60 W do resto do PC e 30% de folga para os picos. A fonte recomendada é o degrau comercial logo acima dessa soma.</p>
      <details className="v3-fc-detalhes"><summary>Por que watt de caixa não conta?</summary><div className="v3-fc-detalhes-corpo"><p>Só entra na curadoria modelo com relatório de teste público, que dá para abrir e ler. O watt escrito na caixa é justamente o que a fonte genérica falsifica.</p></div></details>
      <div className="v3-vizinhas">
        <Link href="/metodologia/">Ver a metodologia →</Link>
        <Link href="/ferramentas/conta-de-luz/">Quanto esse PC gasta de luz →</Link>
        <Link href="/montador/">Conferir o PC inteiro no montador →</Link>
      </div>
    </section>
  </div>;
}
