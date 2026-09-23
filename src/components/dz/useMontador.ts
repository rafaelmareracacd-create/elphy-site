"use client";

import { useEffect, useRef, useState } from "react";
import { acharSlot, lerMontador, linkShopee, listaSlot, montador, MONTADOR_INICIAL, queryMontador, SLOTS, TITULOS_SLOT, type CpuMontador, type GabMontador, type GpuMontador, type MaeMontador, type MemMontador, type PsuMontador, type Slot } from "@/lib/catalogo";
import { cabePlaca, fonteRecomendada } from "@/lib/contas";
import { aoTrocarDeTela, gravaEscolha } from "./urlEscolha";

/**
 * O montador das pranchetas Montador, Montador-Mobile e Montagem-Link-Mobile: seis peças,
 * quatro conferências (soquete, memória, espaço da placa, fonte). Mesmos nomes do renderVals() do desenho.
 */
type Estado = Record<Slot, string>;

export function contaMontador(e: Estado) {
  const cpu = acharSlot<CpuMontador>("cpu", e.cpu) ?? montador.cpu[0];
  const mae = acharSlot<MaeMontador>("mae", e.mae) ?? montador.mae[0];
  const mem = acharSlot<MemMontador>("mem", e.mem) ?? montador.mem[0];
  const gpu = acharSlot<GpuMontador>("gpu", e.gpu) ?? montador.gpu[0];
  const gab = acharSlot<GabMontador>("gab", e.gab) ?? montador.gab[0];
  const psu = acharSlot<PsuMontador>("psu", e.psu) ?? montador.psu[0];
  const fr = fonteRecomendada(gpu.w, cpu.w), precisa = fr.comFolga;
  const okSock = cpu.sock === mae.sock, okDdr = mae.ddr === mem.ddr;
  const folgaMm = gab.mm - gpu.mm, okCabe = cabePlaca(gab.mm, gpu.mm), okFonte = psu.w >= fr.comFolgaExata;
  const checks = [
    { nome: `Soquete ${cpu.sock} × ${mae.sock}`, ok: okSock, txt: "" },
    { nome: `Memória ${mem.ddr} × ${mae.ddr}`, ok: okDdr, txt: "" },
    { nome: `Placa ${gpu.mm} mm no gabinete`, ok: okCabe, txt: okCabe ? `+${folgaMm} mm` : (folgaMm < 0 ? `falta ${-folgaMm} mm` : "justo") },
    { nome: `Fonte ${psu.w} W × ${precisa} W`, ok: okFonte, txt: "" },
  ];
  const n = checks.filter((c) => c.ok).length;
  return { cpu, mae, mem, gpu, gab, psu, fr, precisa, okSock, okDdr, okCabe, okFonte, checks, n, tudo: n === 4 };
}

export function valoresMontador(e: Estado, escolhe: (k: Slot, id: string) => void, impresso: boolean, lido = true) {
  const k = contaMontador(e);
  const { cpu, mae, mem, gpu, gab, psu, precisa, tudo, n } = k;
  const marca = (s: Slot, x: { sock?: string; ddr?: string; mm?: number; w?: number }) => {
    if (s === "mae") return x.sock === cpu.sock;
    if (s === "mem") return x.ddr === mae.ddr;
    if (s === "gab") return (x.mm ?? 0) - gpu.mm >= 10;
    if (s === "psu") return (x.w ?? 0) >= k.fr.comFolgaExata;
    return true;
  };
  const sub = (s: Slot, x: { sock?: string; ddr?: string; mm?: number; w?: number }) => {
    if (s === "cpu") return `${x.sock} · ${x.w} W`;
    if (s === "mae") return `${x.sock} · ${x.ddr}`;
    if (s === "mem") return `${x.ddr}`;
    if (s === "gpu") return `${x.w} W · ${x.mm} mm`;
    if (s === "gab") return `placa até ${x.mm} mm`;
    return `${x.w} W`;
  };
  const avisos: Partial<Record<Slot, boolean>> = { mae: k.okSock, mem: k.okDdr, gab: k.okCabe, psu: k.okFonte };
  return {
    k,
    slots: SLOTS.map((t, i) => {
      const bad = avisos[t] === false;
      return {
        k: t, n: `0${i + 1}`, titulo: TITULOS_SLOT[t],
        aviso: bad ? "Não confere" : (t === "cpu" || t === "gpu" ? "" : "Confere"),
        avisoCor: bad ? "#ffb020" : "#9dff3b",
        bd: bad ? "rgba(255,176,32,.45)" : "rgba(255,255,255,.07)",
        op: listaSlot(t).map((x) => {
          const on = e[t] === x.id, cabe = marca(t, x as never);
          return { nome: x.nome, sub: sub(t, x as never), on, pick: () => escolhe(t, x.id),
            op: on || cabe ? "1" : ".45",
            bg: on ? (cabe ? "#9dff3b" : "#ffb020") : "#0d1013",
            bd: on ? "transparent" : "rgba(255,255,255,.08)",
            fg: on ? "#07110a" : "#eef2ee", fg2: on ? "#24461a" : "#9aa39c" };
        }),
      };
    }),
    linhas: [
      { nome: cpu.nome, v: `${cpu.w} W` }, { nome: mae.nome, v: mae.sock }, { nome: mem.nome, v: mem.ddr },
      { nome: gpu.nome, v: `${gpu.w} W` }, { nome: gab.nome, v: `${gab.mm} mm` }, { nome: psu.nome, v: `${psu.w} W` },
      { nome: "Consumo com folga", v: `${precisa} W` },
    ],
    checks: k.checks.map((c) => ({ nome: c.nome, res: c.txt || (c.ok ? "OK" : "NÃO"), cor: c.ok ? "#111311" : "#b35a00" })),
    impresso,
    /** a URL já foi lida: antes disso a montagem é a padrão, não a do link */
    lido,
    veredito: tudo ? "As 4 conferências passaram" : "Montagem com problema",
    placar: `${n} de 4`,
    vereditoSub: tudo ? "Soquete, memória, espaço e fonte conferem. Cooler, BIOS e pico da placa ficam fora desta conta." : "As peças marcadas em âmbar não encaixam. Troca uma delas.",
    ledCor: tudo ? "#9dff3b" : "#ffb020", ledTexto: tudo ? "Confere" : "Revisar",
    seloFundo: tudo ? "#9dff3b" : "#ffb020", seloTopo: tudo ? "Conferido" : "Revisar", seloMeio: `${n}/4`, seloBase: tudo ? "conferências" : "não compre ainda",
    codigo: [cpu.id, gpu.id, psu.id].join("-"),
    /** link da montagem recebida (Montagem-Link) */
    linkMontagem: `/montador/link/?${queryMontador(e)}`,
    /** primeiro link de afiliado das peças escolhidas; vazio até o catálogo ter os links */
    shopee: linkShopee([cpu, mae, mem, gpu, gab, psu].map((p) => p.url ?? "")),
  };
}

export function useMontador() {
  const [e, setE] = useState<Estado>({ ...MONTADOR_INICIAL });
  const [impresso, setImpresso] = useState(true);
  const [lido, setLido] = useState(false);
  const to = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => {
    // link recebido: ?cpu=…&mae=…; peça que não existe no catálogo cai no padrão.
    // Relido quando a outra árvore (celular/computador) aparece.
    const le = () => {
      const url = lerMontador(new URLSearchParams(window.location.search));
      SLOTS.forEach((s) => { if (!url[s]) url[s] = MONTADOR_INICIAL[s]; });
      setE(url);
      setLido(true);
    };
    le();
    const solta = aoTrocarDeTela(le);
    return () => { solta(); clearTimeout(to.current); };
  }, []);
  const escolhe = (k: Slot, id: string) => {
    gravaEscolha({ [k]: id });
    setE((a) => ({ ...a, [k]: id }));
    setImpresso(false);
    clearTimeout(to.current);
    to.current = setTimeout(() => setImpresso(true), 60);
  };
  return valoresMontador(e, escolhe, impresso, lido);
}
