"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AVISO_CATALOGO, lerMontador, linkShopee, MONTADOR_INICIAL, montador, queryMontador, SLOTS, TITULOS_SLOT, acharSlot, type CpuMontador, type GabMontador, type GpuMontador, type MaeMontador, type MemMontador, type PsuMontador, type Slot } from "@/lib/catalogo";
import { conferirMontagem, fonteRecomendada, MARGEM_PLACA_MM } from "@/lib/contas";
import { absoluteUrl, assetPath } from "@/lib/site";
import Nota from "./Nota";

type Estado = Record<Slot, string>;

/** As peças escolhidas; id que não existe cai na primeira do catálogo, como no montador antigo. */
function pecasDe(e: Estado) {
  return {
    cpu: acharSlot<CpuMontador>("cpu", e.cpu) ?? montador.cpu[0],
    mae: acharSlot<MaeMontador>("mae", e.mae) ?? montador.mae[0],
    mem: acharSlot<MemMontador>("mem", e.mem) ?? montador.mem[0],
    gpu: acharSlot<GpuMontador>("gpu", e.gpu) ?? montador.gpu[0],
    gab: acharSlot<GabMontador>("gab", e.gab) ?? montador.gab[0],
    psu: acharSlot<PsuMontador>("psu", e.psu) ?? montador.psu[0],
  };
}

/** O texto pequeno do chip, os mesmos dados do montador antigo. */
function subChip(slot: Slot, x: { sock?: string; ddr?: string; mm?: number; w?: number }) {
  if (slot === "cpu") return `${x.sock} · ${x.w} W`;
  if (slot === "mae") return `${x.sock} · ${x.ddr}`;
  if (slot === "mem") return `${x.ddr}`;
  if (slot === "gpu") return `${x.w} W · ${x.mm} mm`;
  if (slot === "gab") return `placa até ${x.mm} mm`;
  return `${x.w} W`;
}

export default function Montador() {
  const [e, setE] = useState<Estado>({ ...MONTADOR_INICIAL });
  useEffect(() => {
    // link compartilhado (?cpu=…&mae=…), o mesmo formato do montador antigo
    const ler = () => {
      const url = lerMontador(new URLSearchParams(window.location.search));
      SLOTS.forEach((s) => { if (!url[s]) url[s] = MONTADOR_INICIAL[s]; });
      setE(url);
    };
    ler();
    window.addEventListener("popstate", ler);
    return () => window.removeEventListener("popstate", ler);
  }, []);
  function escolher(slot: Slot, id: string) {
    setE((a) => ({ ...a, [slot]: id }));
    const url = new URL(window.location.href);
    url.searchParams.set(slot, id);
    window.history.replaceState(null, "", url);
  }
  const p = pecasDe(e);
  const conta = conferirMontagem({
    cpu: { nome: p.cpu.nome, w: p.cpu.w, sock: p.cpu.sock },
    mae: { nome: p.mae.nome, sock: p.mae.sock, ddr: p.mae.ddr },
    mem: { nome: p.mem.nome, ddr: p.mem.ddr },
    gpu: { nome: p.gpu.nome, w: p.gpu.w, mm: p.gpu.mm },
    gab: { nome: p.gab.nome, mm: p.gab.mm },
    psu: { nome: p.psu.nome, w: p.psu.w },
  });
  const fonte = fonteRecomendada(p.gpu.w, p.cpu.w);
  const tudo = conta.selo === "lima";
  // A mesma marca do montador antigo: a peça combina com as já escolhidas?
  const encaixa = (slot: Slot, x: { sock?: string; ddr?: string; mm?: number; w?: number }) => {
    if (slot === "mae") return x.sock === p.cpu.sock;
    if (slot === "mem") return x.ddr === p.mae.ddr;
    if (slot === "gab") return (x.mm ?? 0) - p.gpu.mm >= MARGEM_PLACA_MM;
    if (slot === "psu") return (x.w ?? 0) >= fonte.comFolgaExata;
    return true;
  };
  const ruim: Partial<Record<Slot, boolean>> = { mae: !encaixa("mae", p.mae), mem: !encaixa("mem", p.mem), gab: !encaixa("gab", p.gab), psu: !encaixa("psu", p.psu) };
  const chave = SLOTS.map((s) => e[s]).join("-");
  const falhaFonte = conta.checks.some((c) => c.nome.startsWith("Fonte") && !c.ok);
  const shopee = linkShopee(SLOTS.map((s) => p[s].url ?? ""));
  const urlNota = absoluteUrl(`/montador/?${queryMontador(e)}`);
  const compartilhar = `https://wa.me/?text=${encodeURIComponent(`Minha montagem no Elphy: ${conta.passaram} de 4 conferências${tudo ? ", tudo confere" : " — ainda tem peça pra trocar"}. Estimativa, não garante compatibilidade. Confere a sua: ${urlNota}`)}`;
  return <div className="v3-fc-grid">
    <section className="v3-fc-escolha">
      <div className="v3-fc-abertura"><Image className="v3-mascote" src={assetPath("/brand/elphy-carimbo.webp")} alt="Elphy preparando o carimbo" width={120} height={120} priority /><p className="v3-etiqueta v3-verde">Ferramenta · Montador de PC</p><h1>As peças do meu PC se encaixam<span className="v3-verde">?</span></h1><p>Toca em cada peça. A nota confere soquete, memória, espaço no gabinete e fonte — as quatro de uma vez.</p></div>
      {SLOTS.map((slot, i) => <div key={slot}>
        <div className="v3-placa-rotulo"><p className="v3-etiqueta">{String(i + 1).padStart(2, "0")} · {TITULOS_SLOT[slot]}</p><strong className={ruim[slot] ? "v3-nao-confere" : undefined}>{p[slot].nome} · {subChip(slot, p[slot])}{ruim[slot] && " · não confere"}</strong></div>
        <div className="v3-placas" role="group" aria-label={`Escolha: ${TITULOS_SLOT[slot].toLowerCase()}`}>
          {montador[slot].map((item) => {
            const on = item.id === e[slot];
            const cabe = encaixa(slot, item as never);
            return <button type="button" key={item.id} className={on && !cabe ? "v3-chip-ambar" : !on && !cabe ? "v3-chip-fora" : undefined} aria-pressed={on} onClick={() => escolher(slot, item.id)}><strong>{item.nome}</strong><small>{subChip(slot, item as never)}</small></button>;
          })}
        </div>
      </div>)}
    </section>
    <section className="v3-impressora" aria-label="Resultado das conferências">
      <div className="v3-impressora-topo"><span>Impressora de contas</span><span>● Pronta</span></div>
      <div className="v3-recibo-wrap"><Nota codigo={`ELPHY-PC-${p.cpu.id}-${p.gpu.id}-${p.psu.id}`} className="v3-recibo" vivo>
        <div key={chave} className="v3-recibo-conteudo">
          <div className="v3-nota-logo"><span>elphy<span className="v3-verde">.</span></span><b>Montagem</b></div>
          <p className="v3-etiqueta">Conta Elphy · PC inteiro</p><p className="v3-letra-miuda">{AVISO_CATALOGO}</p>
          <div className="v3-recibo-secao"><p className="v3-etiqueta">As peças</p><dl>
            {SLOTS.map((slot) => <div key={slot} className="v3-linha-pontos"><dt>{p[slot].nome}</dt><dd>{slot === "mae" ? p.mae.sock : slot === "mem" ? p.mem.ddr : slot === "gab" ? `${p.gab.mm} mm` : `${p[slot as "cpu" | "gpu" | "psu"].w} W`}</dd></div>)}
            <div className="v3-linha-pontos"><dt><b>Consumo com folga</b></dt><dd><b>{conta.precisaW} W</b></dd></div>
          </dl></div>
          <div className="v3-recibo-secao"><p className="v3-etiqueta">As quatro conferências</p><dl>
            {conta.checks.map((check) => <div key={check.nome} className="v3-linha-pontos"><dt>{check.nome}</dt><dd className={check.ok ? undefined : "v3-nao-confere"}>{check.texto}</dd></div>)}
          </dl></div>
          <div className="v3-veredito"><p className="v3-etiqueta">{tudo ? "As 4 conferências passaram" : "Montagem com problema"}</p><h2>{conta.passaram} de 4</h2><p>{tudo ? "Soquete, memória, espaço e fonte conferem." : "As linhas marcadas não encaixam. Troca uma das peças."}</p></div>
          {falhaFonte && conta.recomendadoW && <div className="v3-recibo-secao"><p className="v3-etiqueta">A fonte certa</p><p>Com essas peças, o degrau certo da fonte é {conta.recomendadoW} W.</p></div>}
          <p className="v3-letra-miuda">Estimativa pela fórmula da metodologia. Não garante compatibilidade.</p>
        </div>
      </Nota><div className={`v3-selo-redondo${tudo ? "" : " v3-selo-depende"}`} aria-hidden="true"><small>{tudo ? "Conferido" : "Revisar"}</small><strong>{conta.passaram}/4</strong><small>{tudo ? "conferências" : "não compre ainda"}</small></div></div>
      <a className="v3-botao" href={compartilhar} target="_blank" rel="noopener noreferrer">Mandar a nota no WhatsApp ↗</a>
      {shopee && <a className="v3-botao v3-botao-contorno" href={shopee} target="_blank" rel="sponsored nofollow noopener noreferrer">Ver as peças na Shopee ↗</a>}
      <Link className="v3-botao v3-botao-contorno" href="/achados/">Ver os achados carimbados</Link>
    </section>
    <section className="v3-como-mede">
      <h2 className="v3-etiqueta v3-verde">Como a gente mede</h2>
      <p>Soquete e memória têm que bater com a placa-mãe. A placa de vídeo precisa de {MARGEM_PLACA_MM} mm de folga no gabinete. E a fonte precisa cobrir o consumo com 30% de folga para os picos.</p>
      <details className="v3-fc-detalhes"><summary>O que fica fora da conta</summary><div className="v3-fc-detalhes-corpo"><p>Cooler do processador, versão de BIOS da placa-mãe e pico de consumo da placa de vídeo ficam fora destas quatro conferências. Confere na ficha do fabricante antes de comprar.</p></div></details>
      <div className="v3-vizinhas">
        <Link href="/metodologia/">Ver a metodologia →</Link>
        <Link href="/ferramentas/fonte/">Qual fonte esse PC pede →</Link>
        <Link href="/ferramentas/gabinete/">Cabe no gabinete →</Link>
      </div>
    </section>
  </div>;
}
