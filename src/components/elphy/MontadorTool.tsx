"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AVISO_CATALOGO,
  MONTADOR_INICIAL,
  SLOTS,
  TITULOS_SLOT,
  acharSlot,
  lerMontador,
  linkShopee,
  montador,
  queryMontador,
  type CpuMontador,
  type GabMontador,
  type GpuMontador,
  type MaeMontador,
  type MemMontador,
  type PsuMontador,
  type Slot,
} from "@/lib/catalogo";
import { conferirMontagem, fonteRecomendada } from "@/lib/contas";
import Nota from "@/components/elphy/Nota";
import ShopeeButton from "@/components/elphy/ShopeeButton";

export default function MontadorTool({ query }: { query: string }) {
  const router = useRouter();
  const estado = lerMontador(new URLSearchParams(query));
  const [enviado, setEnviado] = useState(false);
  const [impresso, setImpresso] = useState(false);
  const cpu = acharSlot<CpuMontador>("cpu", estado.cpu);
  const mae = acharSlot<MaeMontador>("mae", estado.mae);
  const mem = acharSlot<MemMontador>("mem", estado.mem);
  const gpu = acharSlot<GpuMontador>("gpu", estado.gpu);
  const gab = acharSlot<GabMontador>("gab", estado.gab);
  const psu = acharSlot<PsuMontador>("psu", estado.psu);
  const completo = Boolean(cpu && mae && mem && gpu && gab && psu);
  const resultado = conferirMontagem(completo && cpu && mae && mem && gpu && gab && psu ? {
    cpu: { nome: cpu.nome, w: cpu.w, sock: cpu.sock },
    mae: { nome: mae.nome, sock: mae.sock, ddr: mae.ddr },
    mem: { nome: mem.nome, ddr: mem.ddr },
    gpu: { nome: gpu.nome, w: gpu.w, mm: gpu.mm },
    gab: { nome: gab.nome, mm: gab.mm },
    psu: { nome: psu.nome, w: psu.w },
  } : null);
  const fonte = cpu && gpu ? fonteRecomendada(gpu.w, cpu.w) : null;
  const chave = SLOTS.map((slot) => estado[slot]).join("|");
  const exemplo = [cpu, mae, mem, gpu, gab, psu].some((peca) => peca && !peca.verificado);
  const href = linkShopee([cpu, mae, mem, gpu, gab, psu].map((peca) => peca?.url ?? ""));

  useEffect(() => {
    setImpresso(false);
    const espera = window.setTimeout(() => setImpresso(true), 60);
    return () => window.clearTimeout(espera);
  }, [chave]);

  function escolhe(slot: Slot, id: string) {
    const proximo = { ...estado, [slot]: id };
    router.replace(`/montador/?${queryMontador(proximo)}`, { scroll: false });
    setEnviado(false);
  }

  async function mandar() {
    const url = `${window.location.origin}/montador/?${queryMontador(estado)}`;
    try { await navigator.clipboard.writeText(url); } catch { /* o link continua na barra */ }
    setEnviado(true);
    window.setTimeout(() => setEnviado(false), 1800);
  }

  const tudo = resultado.selo === "lima";
  return (
    <div className="el-bancada">
      <div className="el-bancada-texto">
        <p className="el-kicker">Montador de PC</p>
        <h1>Monta.<br />A nota<br />confere<span className="el-lima">.</span></h1>
        <p className="el-lead">Escolhe peça por peça. Cada escolha passa por quatro conferências: soquete, memória, espaço no gabinete e fonte.</p>
        <p className="el-placar">{resultado.completo ? `${resultado.passaram} de ${resultado.total}` : "falta dado"}</p>
        {SLOTS.map((slot, indice) => (
          <SlotGrupo key={slot} slot={slot} n={String(indice + 1).padStart(2, "0")} estado={estado} fonteW={fonte?.comFolga ?? null} onEscolha={escolhe} />
        ))}
      </div>
      <div className="el-bancada-nota">
        <Nota
          impresso={impresso && resultado.completo}
          vazio={!resultado.completo}
          vazioTexto="Falta peça na montagem. Sem dado, a nota não carimba."
          numero="MONTAGEM"
          cupom="Cupom de medição · PC inteiro"
          linhas={resultado.completo && cpu && mae && mem && gpu && gab && psu && fonte ? [
            { nome: cpu.nome, valor: `${cpu.w} W` },
            { nome: mae.nome, valor: mae.sock },
            { nome: mem.nome, valor: mem.ddr },
            { nome: gpu.nome, valor: `${gpu.w} W` },
            { nome: gab.nome, valor: `${gab.mm} mm` },
            { nome: psu.nome, valor: `${psu.w} W` },
            { nome: "Consumo com folga", valor: `${fonte.comFolga} W`, forte: true, sep: true },
            ...resultado.checks.map((check) => ({ nome: check.nome, valor: check.texto, falha: !check.ok })),
          ] : []}
          rotulo={resultado.completo ? (tudo ? "As 4 conferências passaram" : "Montagem com problema") : "Falta dado"}
          total={resultado.completo ? `${resultado.passaram} de ${resultado.total}` : "—"}
          sub={resultado.completo ? (tudo
            ? "Soquete, memória, espaço e fonte conferem. Cooler, BIOS e pico da placa ficam fora desta conta."
            : "As peças marcadas em âmbar não encaixam. Troca uma delas.") : undefined}
          notaExtra={resultado.checks.some((check) => check.nome.startsWith("Fonte") && !check.ok) && resultado.recomendadoW
            ? `Com essas peças, o degrau certo da fonte é ${resultado.recomendadoW} W.`
            : undefined}
          codigo={resultado.completo ? `elphy.com.br/montador/?${queryMontador(estado)}` : undefined}
          selo={resultado.selo}
          seloTopo={tudo ? "Conferido" : "Revisar"}
          seloMeio={resultado.completo ? `${resultado.passaram}/4` : ""}
          seloBase={tudo ? "conferências" : "não compre ainda"}
          led={resultado.completo ? (tudo ? "pronta" : "revisar") : "esperando"}
          semente={chave}
        />
        {exemplo ? <p className="el-aviso-catalogo">{AVISO_CATALOGO} Medidas e watts ainda não conferidos na ficha do fabricante.</p> : null}
      </div>
      <div className="el-acoes">
        <button type="button" className="el-btn" onClick={mandar} disabled={!resultado.completo}>
          {enviado ? "Link copiado" : "Mandar a montagem"}
        </button>
        <ShopeeButton href={href}>Ver as peças na Shopee</ShopeeButton>
        <button type="button" className="el-btn el-btn-fantasma" onClick={() => router.replace(`/montador/?${queryMontador(MONTADOR_INICIAL)}`, { scroll: false })}>
          Recomeçar
        </button>
      </div>
    </div>
  );
}

function SlotGrupo({ slot, n, estado, fonteW, onEscolha }: {
  slot: Slot;
  n: string;
  estado: Record<Slot, string>;
  fonteW: number | null;
  onEscolha: (slot: Slot, id: string) => void;
}) {
  const cpu = acharSlot<CpuMontador>("cpu", estado.cpu);
  const mae = acharSlot<MaeMontador>("mae", estado.mae);
  const gpu = acharSlot<GpuMontador>("gpu", estado.gpu);
  const escolhida = montador[slot].find((peca) => peca.id === estado[slot]);
  const ruim = slotRuim(slot, estado, fonteW);
  return (
    <fieldset className={`el-grupo${ruim ? " el-grupo-ruim" : ""}`}>
      <legend>
        <span>{n} — {TITULOS_SLOT[slot]}</span>
        <small className={ruim ? "el-ambar" : "el-lima"}>{!escolhida ? "Falta dado" : ruim ? "Não confere" : slot === "cpu" || slot === "gpu" ? "" : "Confere"}</small>
      </legend>
      <div className="el-rolo">
        {montador[slot].map((peca) => {
          const on = peca.id === estado[slot];
          const cabe = encaixa(slot, peca.id, { cpu, mae, gpu, fonteW });
          return (
            <button key={peca.id} type="button" className={`el-chip${on && !cabe ? " el-chip-ambar" : ""}`} aria-pressed={on} onClick={() => onEscolha(slot, peca.id)}>
              <b>{peca.nome}</b>
              <small>{subtitulo(slot, peca.id)}</small>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function slotRuim(slot: Slot, estado: Record<Slot, string>, fonteW: number | null) {
  const cpu = acharSlot<CpuMontador>("cpu", estado.cpu);
  const mae = acharSlot<MaeMontador>("mae", estado.mae);
  const mem = acharSlot<MemMontador>("mem", estado.mem);
  const gpu = acharSlot<GpuMontador>("gpu", estado.gpu);
  const gab = acharSlot<GabMontador>("gab", estado.gab);
  const psu = acharSlot<PsuMontador>("psu", estado.psu);
  if (slot === "mae") return Boolean(cpu && mae && cpu.sock !== mae.sock);
  if (slot === "mem") return Boolean(mae && mem && mae.ddr !== mem.ddr);
  if (slot === "gab") return Boolean(gpu && gab && gab.mm - gpu.mm < 10);
  if (slot === "psu") return Boolean(psu && fonteW != null && psu.w < fonteW);
  return false;
}

function encaixa(slot: Slot, id: string, ctx: { cpu?: CpuMontador; mae?: MaeMontador; gpu?: GpuMontador; fonteW: number | null }) {
  if (slot === "mae" && ctx.cpu) return acharSlot<MaeMontador>("mae", id)?.sock === ctx.cpu.sock;
  if (slot === "mem" && ctx.mae) return acharSlot<MemMontador>("mem", id)?.ddr === ctx.mae.ddr;
  if (slot === "gab" && ctx.gpu) {
    const gab = acharSlot<GabMontador>("gab", id);
    return Boolean(gab && gab.mm - ctx.gpu.mm >= 10);
  }
  if (slot === "psu" && ctx.fonteW != null) return (acharSlot<PsuMontador>("psu", id)?.w ?? 0) >= ctx.fonteW;
  return true;
}

function subtitulo(slot: Slot, id: string) {
  if (slot === "cpu") {
    const peca = acharSlot<CpuMontador>("cpu", id);
    return peca ? `${peca.sock} · ${peca.w} W` : "";
  }
  if (slot === "mae") {
    const peca = acharSlot<MaeMontador>("mae", id);
    return peca ? `${peca.sock} · ${peca.ddr}` : "";
  }
  if (slot === "mem") return acharSlot<MemMontador>("mem", id)?.ddr ?? "";
  if (slot === "gpu") {
    const peca = acharSlot<GpuMontador>("gpu", id);
    return peca ? `${peca.w} W · ${peca.mm} mm` : "";
  }
  if (slot === "gab") {
    const peca = acharSlot<GabMontador>("gab", id);
    return peca ? `placa até ${peca.mm} mm` : "";
  }
  const peca = acharSlot<PsuMontador>("psu", id);
  return peca ? `${peca.w} W` : "";
}
