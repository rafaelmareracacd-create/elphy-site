"use client";

import { useEffect, useState } from "react";
import { AVISO_CATALOGO, cpusFonte, gpusFonte, type PecaFonte } from "@/lib/catalogo";
import { fonteRecomendada } from "@/lib/contas";
import Nota, { dataNota } from "@/components/elphy/Nota";

export default function CalculadoraFonte({ intro, equacao }: { intro?: React.ReactNode; equacao?: boolean }) {
  const [gpuId, setGpuId] = useState("rtx-5070");
  const [cpuId, setCpuId] = useState("r5-7600");
  const [enviado, setEnviado] = useState(false);
  const gpu = gpusFonte.find((peca) => peca.id === gpuId) ?? null;
  const cpu = cpusFonte.find((peca) => peca.id === cpuId) ?? null;
  const conta = gpu && cpu ? fonteRecomendada(gpu.w, cpu.w) : null;
  const chave = `${gpuId}|${cpuId}`;
  const { impresso, mostrado } = useImpressao(conta?.recomendado ?? null, chave);
  const [quando, setQuando] = useState("");
  useEffect(() => { if (gpuId && cpuId) setQuando(dataNota()); }, [chave, gpuId, cpuId]);
  const exemplo = Boolean((gpu && !gpu.verificado) || (cpu && !cpu.verificado));

  async function mandar() {
    if (!conta || !gpu || !cpu) return;
    const texto = [
      `Elphy · fonte ${conta.recomendado} W`,
      `${gpu.nome}: ${gpu.w} W`,
      `${cpu.nome}: ${cpu.w} W`,
      `Mãe, memória, SSD: 60 W`,
      `Total com folga: ${conta.comFolga} W`,
      "Estimativa pela fórmula da metodologia. Não garante compatibilidade.",
    ].join("\n");
    try { await navigator.clipboard.writeText(texto); } catch { /* sem rede; o rótulo muda do mesmo jeito */ }
    setEnviado(true);
    window.setTimeout(() => setEnviado(false), 1800);
  }

  return (
    <div className="el-bancada">
      <div className="el-bancada-texto">
        {intro}
        <Grupo n="01" titulo="Placa de vídeo" resumo={gpu ? `${gpu.curto} · ${gpu.w} W` : "escolher"} pecas={gpusFonte} ativo={gpuId} onEscolha={(id) => { setGpuId(id); setEnviado(false); }} />
        <Grupo n="02" titulo="Processador" resumo={cpu ? `${cpu.curto} · ${cpu.w} W` : "escolher"} pecas={cpusFonte} ativo={cpuId} onEscolha={(id) => { setCpuId(id); setEnviado(false); }} />
      </div>
      <div className="el-bancada-nota">
        <Nota
          impresso={impresso && Boolean(conta)}
          vazio={!conta}
          vazioTexto="Escolhe a placa e o processador. A nota sai aqui."
          numero={conta ? String(conta.recomendado).padStart(4, "0") : "----"}
          cupom="Cupom de consumo"
          data={quando || undefined}
          linhas={conta && gpu && cpu ? [
            { nome: gpu.nome, valor: `${gpu.w} W` },
            { nome: cpu.nome, valor: `${cpu.w} W` },
            { nome: "Mãe, memória, SSD", valor: "60 W" },
            { nome: "Consumo em carga", valor: `${conta.consumo} W`, sep: true },
            { nome: "Folga (+30%)", valor: `${conta.folgaW} W` },
            { nome: "Total com folga", valor: `${conta.comFolga} W`, forte: true },
          ] : []}
          regua={conta ? { consumo: conta.consumo, folga: conta.folgaW } : null}
          rotulo="Fonte recomendada"
          total={conta ? String(mostrado) : "—"}
          unidade="W"
          sub={conta ? `Degrau comercial logo acima de ${conta.comFolga} W.` : undefined}
          notaExtra={conta ? "Só listamos fonte com relatório de teste público. Watt escrito na caixa não conta." : undefined}
          codigo={conta && gpu && cpu ? `ELPHY-${String(conta.recomendado).padStart(4, "0")}-${gpu.cod}-${cpu.cod}` : undefined}
          selo={conta ? "lima" : null}
          seloTopo="Sua fonte"
          seloMeio={conta ? String(conta.recomendado) : ""}
          seloBase="watts"
          led={conta ? "pronta" : "esperando"}
          semente={chave}
        />
        {exemplo ? <p className="el-aviso-catalogo">{AVISO_CATALOGO}</p> : null}
      </div>
      <div className="el-acoes">
        <button type="button" className="el-btn" onClick={mandar} disabled={!conta}>
          {!conta ? "Escolhe as duas peças" : enviado ? "Nota copiada" : "Mandar a nota no WhatsApp"}
        </button>
        <button type="button" className="el-btn el-btn-fantasma" onClick={() => { setGpuId(""); setCpuId(""); setEnviado(false); }}>
          Refazer a conta
        </button>
      </div>
      {equacao && conta && gpu && cpu ? (
        <section className="el-equacao" aria-labelledby="conta-aberta">
          <p className="el-kicker">Nº 02 — A conta aberta</p>
          <h2 id="conta-aberta">Toda calculadora te dá o {conta.recomendado}. Aqui você vê de onde ele saiu.</h2>
          <ol>
            <li><b>{gpu.w}</b><span>TGP · {gpu.curto}</span></li>
            <li><b>{cpu.w}</b><span>PPT · {cpu.curto}</span></li>
            <li><b>60</b><span>Placa-mãe, memória, SSD</span></li>
            <li><b>{conta.consumo}</b><span>Consumo em carga</span></li>
            <li><b>× 1,3</b><span>Folga para picos</span></li>
            <li><b>{conta.comFolga}</b><span>Com folga</span></li>
            <li><b>{conta.recomendado} W</b><span>Degrau comercial acima</span></li>
          </ol>
        </section>
      ) : null}
    </div>
  );
}

function Grupo({ n, titulo, resumo, pecas, ativo, onEscolha }: {
  n: string;
  titulo: string;
  resumo: string;
  pecas: PecaFonte[];
  ativo: string;
  onEscolha: (id: string) => void;
}) {
  return (
    <fieldset className="el-grupo">
      <legend><span>{n} — {titulo}</span><small>{resumo}</small></legend>
      <div className="el-rolo">
        {pecas.map((peca) => (
          <button key={peca.id} type="button" className="el-chip" aria-pressed={peca.id === ativo} onClick={() => onEscolha(peca.id)}>
            <b>{peca.curto}</b>
            <small>{peca.w} W</small>
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function useImpressao(alvo: number | null, chave: string) {
  const [impresso, setImpresso] = useState(false);
  const [mostrado, setMostrado] = useState(alvo ?? 0);
  useEffect(() => {
    let quadro = 0;
    setImpresso(false);
    setMostrado(0);
    const espera = window.setTimeout(() => {
      setImpresso(true);
      if (alvo == null) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setMostrado(alvo);
        return;
      }
      const inicio = performance.now();
      const passo = (agora: number) => {
        const p = Math.min((agora - inicio) / 700, 1);
        setMostrado(Math.round(alvo * (1 - (1 - p) ** 3)));
        if (p < 1) quadro = requestAnimationFrame(passo);
      };
      quadro = requestAnimationFrame(passo);
    }, 60);
    return () => {
      window.clearTimeout(espera);
      cancelAnimationFrame(quadro);
    };
  }, [alvo, chave]);
  return { impresso, mostrado };
}
