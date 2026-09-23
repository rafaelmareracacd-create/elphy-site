"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cpusFonte, gpusFonte, type PecaFonte } from "@/lib/catalogo";
import { fonteRecomendada } from "@/lib/contas";
import { aoTrocarDeTela, apagaEscolha, gravaEscolha } from "./urlEscolha";

/**
 * A lógica da calculadora de fonte, igual à das pranchetas Main, Ferramenta-Mobile e Fonte-Desktop
 * (docs/design-1.0): escolhe placa e processador, a nota some, reimprime e o número sobe até a fonte.
 * Devolve os mesmos nomes do renderVals() do desenho, para o JSX transcrito usar sem tradução.
 */
export type EstadoFonte = { gpu: string | null; cpu: string | null };
/** o que o botão de mandar fez: copiou, abriu o compartilhar do celular ou abriu o WhatsApp */
export type Enviado = false | "copiada" | "enviada" | "whatsapp";

const chip = (item: PecaFonte, on: boolean, pick: () => void) => ({
  ...item,
  on,
  pick,
  bg: on ? "#9dff3b" : "#0d1013",
  bd: on ? "#9dff3b" : "rgba(255,255,255,.08)",
  fg: on ? "#07110a" : "#eef2ee",
  fg2: on ? "#24461a" : "#9aa39c",
  sh: on ? "0 10px 30px rgba(157,255,59,.28)" : "none",
});

export function barras(semente: string, n = 40) {
  let h = 7;
  const out: { w: number; c: string }[] = [];
  for (let i = 0; i < semente.length; i++) h = (h * 31 + semente.charCodeAt(i)) >>> 0;
  for (let j = 0; j < n; j++) {
    h = (Math.imul(h, 1103515245) + 12345) >>> 0;
    out.push({ w: 1 + ((h >>> 8) % 3), c: j % 2 ? "rgba(0,0,0,0)" : "#111311" });
  }
  return out;
}

const p2 = (n: number) => String(n).padStart(2, "0");
const pct = (v: number) => `${(Math.min(v, 1200) / 1200 * 100).toFixed(2)}%`;

export function contaFonte(gpuId: string | null, cpuId: string | null) {
  const g = gpusFonte.find((x) => x.id === gpuId);
  const c = cpusFonte.find((x) => x.id === cpuId);
  if (!g || !c) return null;
  const r = fonteRecomendada(g.w, c.w);
  return { g, c, consumo: r.consumo, comFolga: r.comFolga, folga: r.folgaW, rec: r.recomendado };
}

/** Link da nota: a mesma conta, aberta por quem recebe. */
export function linkNota(gpu: string, cpu: string) {
  if (typeof window === "undefined") return "";
  const u = new URL("/ferramentas/fonte/", window.location.origin);
  u.searchParams.set("gpu", gpu);
  u.searchParams.set("cpu", cpu);
  return u.toString();
}

export function useNotaFonte(inicial: EstadoFonte = { gpu: "rtx-5070", cpu: "r5-7600" }, nBarras = 40, cpuPrimeiro?: string) {
  const [s, setS] = useState({ ...inicial, impresso: true, mostrado: contaFonte(inicial.gpu, inicial.cpu)?.rec ?? 0, t: 0, enviado: false as Enviado });
  const raf = useRef(0);
  const to = useRef<ReturnType<typeof setTimeout>>(undefined);
  const to2 = useRef<ReturnType<typeof setTimeout>>(undefined);

  const anima = useCallback((alvo: number) => {
    cancelAnimationFrame(raf.current);
    const reduz = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduz) { setS((a) => ({ ...a, mostrado: alvo })); return; }
    const t0 = performance.now();
    const passo = (t: number) => {
      const p = Math.min((t - t0) / 700, 1);
      setS((a) => ({ ...a, mostrado: Math.round(alvo * (1 - Math.pow(1 - p, 3))) }));
      if (p < 1) raf.current = requestAnimationFrame(passo);
    };
    raf.current = requestAnimationFrame(passo);
  }, []);

  /** soSeMudou: ao abrir a página ou cruzar 1024 px, só reimprime se a URL pedir outra conta (sem piscar a nota) */
  const reimprime = useCallback((patch: Partial<EstadoFonte>, soSeMudou = false) => {
    setS((a) => {
      if (soSeMudou && (Object.keys(patch) as (keyof EstadoFonte)[]).every((k) => a[k] === patch[k])) return a;
      clearTimeout(to.current);
      cancelAnimationFrame(raf.current);
      const prox = { ...a, ...patch, impresso: false, mostrado: 0 };
      const k = contaFonte(prox.gpu, prox.cpu);
      if (k) {
        to.current = setTimeout(() => {
          setS((b) => ({ ...b, impresso: true, t: Date.now() }));
          anima(k.rec);
        }, 60);
      }
      return prox;
    });
  }, [anima]);

  useEffect(() => {
    // link compartilhado (?gpu=…&cpu=…); relido quando a outra árvore (celular/computador) aparece
    const le = () => {
      const q = new URLSearchParams(window.location.search);
      const patch: Partial<EstadoFonte> = {};
      if (gpusFonte.some((x) => x.id === q.get("gpu"))) patch.gpu = q.get("gpu");
      if (cpusFonte.some((x) => x.id === q.get("cpu"))) patch.cpu = q.get("cpu");
      reimprime(patch, true);
    };
    le();
    // sem reimprimir, a nota ainda precisa da data e hora (só no cliente: o servidor não sabe a hora de quem abre)
    setS((a) => (a.t ? a : { ...a, t: Date.now() }));
    const solta = aoTrocarDeTela(le);
    return () => { solta(); cancelAnimationFrame(raf.current); clearTimeout(to.current); clearTimeout(to2.current); };
  }, [reimprime]);
  const escolhe = (patch: EstadoFonte | Partial<EstadoFonte>) => {
    gravaEscolha(Object.fromEntries(Object.entries(patch).filter(([, v]) => v)) as Record<string, string>);
    reimprime(patch);
  };
  const avisa = (e: Enviado) => {
    setS((a) => ({ ...a, enviado: e }));
    clearTimeout(to2.current);
    to2.current = setTimeout(() => setS((a) => ({ ...a, enviado: false })), 1800);
  };

  const k = contaFonte(s.gpu, s.cpu);
  const pronto = !!k;
  const g = gpusFonte.find((x) => x.id === s.gpu);
  const c = cpusFonte.find((x) => x.id === s.cpu);
  const d = s.t ? new Date(s.t) : null;
  const numero = k ? String(k.rec).padStart(4, "0") : "0000";

  const mandar = async () => {
    if (!k) return;
    const url = linkNota(k.g.id, k.c.id);
    const texto = `Minha nota do Elphy: ${k.g.curto} + ${k.c.curto} = fonte de ${k.rec} W. ${url}`;
    try {
      if (navigator.share) { await navigator.share({ title: "Nota do Elphy", text: texto }); avisa("enviada"); }
      else { await navigator.clipboard.writeText(texto); avisa("copiada"); }
    } catch { /* cancelou o compartilhamento ou o navegador negou a área de transferência: o botão não muda */ }
  };
  const whatsapp = () => {
    if (!k) return;
    const url = linkNota(k.g.id, k.c.id);
    const texto = `Minha nota do Elphy: ${k.g.curto} + ${k.c.curto} = fonte de ${k.rec} W. ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, "_blank", "noopener");
    avisa("whatsapp");
  };

  return {
    k,
    gpuId: s.gpu,
    cpuId: s.cpu,
    gpuChips: gpusFonte.map((x) => chip(x, x.id === s.gpu, () => escolhe({ gpu: x.id }))),
    cpuChips: (cpuPrimeiro ? [...cpusFonte].sort((a, b) => (a.id === cpuPrimeiro ? -1 : b.id === cpuPrimeiro ? 1 : 0)) : cpusFonte)
      .map((x) => chip(x, x.id === s.cpu, () => escolhe({ cpu: x.id }))),
    letreiro: [...gpusFonte.filter((x) => x.w > 0), ...gpusFonte.filter((x) => x.w > 0)],
    gpuResumo: g ? `${g.curto} · ${g.w} W` : "escolher",
    cpuResumo: c ? `${c.curto} · ${c.w} W` : "escolher",
    vazio: !pronto,
    impresso: pronto && s.impresso,
    ledCor: pronto ? "#9dff3b" : "#ffb020",
    ledTexto: pronto ? "Pronta" : "Esperando",
    gpuNome: k?.g.nome ?? "", gpuCurto: k?.g.curto ?? "", tgp: k?.g.w ?? 0,
    cpuNome: k?.c.nome ?? "", cpuCurto: k?.c.curto ?? "", ppt: k?.c.w ?? 0,
    consumo: k?.consumo ?? 0, comFolga: k?.comFolga ?? 0, folga: k?.folga ?? 0, rec: k?.rec ?? 0,
    mostrado: s.mostrado,
    pctConsumo: k ? pct(k.consumo) : "0%", pctFolga: k ? pct(k.comFolga - k.consumo) : "0%", pctRec: k ? pct(k.rec) : "0%",
    brilho: k ? (0.2 + 0.6 * Math.min(k.rec / 1200, 1)).toFixed(2) : "0",
    numero,
    data: d ? `${p2(d.getDate())}/${p2(d.getMonth() + 1)}/${d.getFullYear()} · ${p2(d.getHours())}:${p2(d.getMinutes())}` : "",
    codigo: k ? `ELPHY-${numero}-${k.g.cod}-${k.c.cod}` : "",
    barras: barras(k ? k.g.cod + k.c.cod + numero : "vazio", nBarras),
    enviado: s.enviado,
    mandar,
    whatsapp,
    reimprimir: () => reimprime({}),
    refazer: () => {
      clearTimeout(to.current);
      cancelAnimationFrame(raf.current);
      apagaEscolha(["gpu", "cpu"]);
      setS((a) => ({ ...a, gpu: null, cpu: null, impresso: false, mostrado: 0, enviado: false }));
    },
  };
}
