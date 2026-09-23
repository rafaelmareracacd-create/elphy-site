"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { barras } from "./useNotaFonte";
import { aoTrocarDeTela, gravaEscolha } from "./urlEscolha";

/**
 * A lógica genérica das ferramentas do desenho (GENERIC_JS das pranchetas Fonte-Desktop, Luz, Monitor,
 * Gabinete e Memória): grupos de chips, a nota que reimprime a cada toque e o número que sobe.
 * Devolve os mesmos nomes do renderVals() do desenho.
 */
export type Opcao = { id: string; curto: string; sub: string; [k: string]: unknown };
export type Grupo = { k: string; titulo: string; ops: Opcao[]; dica?: string; larg?: number };
export type LinhaNota = { nome: string; v: string; sep?: boolean; forte?: boolean };
export type Conta = {
  alvo: number; dec?: number; unidade: string; rotulo: string; cupom: string; pre?: string;
  numero: string; cod: string; linhas: LinhaNota[]; sub: string; nota: string;
  seloTopo: string; seloMeio: string; seloBase: string; brilho?: number | string; ok?: boolean;
};
export type Escolha = Record<string, string>;
export type Sel = Record<string, Opcao>;

/** Número no jeito brasileiro: 1.234,5 e sinal de menos de verdade. */
export function f(v: number, d = 0) {
  const t = Math.abs(v).toFixed(d).split(".");
  t[0] = t[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return (v < 0 && Number(t.join(".")) !== 0 ? "−" : "") + t.join(",");
}

const p2 = (n: number) => String(n).padStart(2, "0");

export function escolhidos(GR: Grupo[], s: Escolha): Sel {
  const v: Sel = {};
  GR.forEach((g) => { v[g.k] = g.ops.find((o) => o.id === s[g.k]) || g.ops[0]; });
  return v;
}

export function useFerramenta(GR: Grupo[], inicial: Escolha, conta: (v: Sel) => Conta, rota: string) {
  // o número já nasce no alvo: o HTML e o primeiro quadro mostram a conta, não 0
  const [s, setS] = useState(() => ({ esc: inicial, impresso: true, mostrado: conta(escolhidos(GR, inicial)).alvo, t: 0, enviado: false }));
  const raf = useRef(0);
  const to = useRef<ReturnType<typeof setTimeout>>(undefined);
  const to2 = useRef<ReturnType<typeof setTimeout>>(undefined);

  /** soSeMudou: ao abrir a página ou cruzar 1024 px, só reimprime se a URL pedir outra conta (sem piscar a nota) */
  const reimprime = useCallback((patch: Escolha, soSeMudou = false) => {
    setS((a) => {
      if (soSeMudou && Object.entries(patch).every(([k, v]) => a.esc[k] === v)) return a;
      clearTimeout(to.current);
      cancelAnimationFrame(raf.current);
      const esc = { ...a.esc, ...patch };
      const alvo = conta(escolhidos(GR, esc)).alvo;
      to.current = setTimeout(() => {
        setS((b) => ({ ...b, impresso: true, t: Date.now() }));
        if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) { setS((b) => ({ ...b, mostrado: alvo })); return; }
        const t0 = performance.now();
        const passo = (t: number) => {
          const q = Math.min((t - t0) / 700, 1);
          setS((b) => ({ ...b, mostrado: alvo * (1 - Math.pow(1 - q, 3)) }));
          if (q < 1) raf.current = requestAnimationFrame(passo);
        };
        raf.current = requestAnimationFrame(passo);
      }, 60);
      return { ...a, esc, impresso: false, mostrado: 0 };
    });
  }, [GR, conta]);

  useEffect(() => {
    // link compartilhado (?<grupo>=<opção>); relido quando a outra árvore (celular/computador) aparece
    const le = () => {
      const q = new URLSearchParams(window.location.search);
      const patch: Escolha = {};
      GR.forEach((g) => { const id = q.get(g.k); if (id && g.ops.some((o) => o.id === id)) patch[g.k] = id; });
      reimprime(patch, true);
    };
    le();
    // sem reimprimir, a nota ainda precisa da data e hora (só no cliente: o servidor não sabe a hora de quem abre)
    setS((a) => (a.t ? a : { ...a, t: Date.now() }));
    const solta = aoTrocarDeTela(le);
    return () => { solta(); cancelAnimationFrame(raf.current); clearTimeout(to.current); clearTimeout(to2.current); };
  }, [GR, reimprime]);

  const sel = escolhidos(GR, s.esc);
  const k = conta(sel);
  const d = s.t ? new Date(s.t) : null;

  const link = () => {
    const u = new URL(rota, window.location.origin);
    GR.forEach((g) => u.searchParams.set(g.k, sel[g.k].id));
    return u.toString();
  };
  const mandar = () => {
    const texto = `Minha nota do Elphy — ${k.rotulo}: ${k.pre ?? ""}${f(k.alvo, k.dec ?? 0)} ${k.unidade}. ${link()}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, "_blank", "noopener");
    setS((a) => ({ ...a, enviado: true }));
    clearTimeout(to2.current);
    to2.current = setTimeout(() => setS((a) => ({ ...a, enviado: false })), 1800);
  };

  return {
    k, sel, esc: s.esc, reimprime,
    grupos: GR.map((g, i) => {
      const cur = sel[g.k];
      return {
        k: g.k, n: p2(i + 1), titulo: g.titulo, resumo: cur.curto, temDica: !!g.dica, dica: g.dica || "",
        ops: g.ops.map((o) => {
          const on = o.id === cur.id;
          return {
            id: o.id, curto: o.curto, sub: o.sub, on, larg: `${g.larg || 112}px`,
            pick: () => { gravaEscolha({ [g.k]: o.id }); reimprime({ [g.k]: o.id }); },
            bg: on ? "#9dff3b" : "#0d1013", bd: on ? "#9dff3b" : "rgba(255,255,255,.08)",
            fg: on ? "#07110a" : "#eef2ee", fg2: on ? "#24461a" : "#9aa39c",
            sh: on ? "0 10px 30px rgba(157,255,59,.28)" : "none",
          };
        }),
      };
    }),
    linhas: k.linhas.map((l, i) => ({
      nome: l.nome, v: l.v, peso: l.forte ? "700" : "400",
      borda: l.sep ? "1.5px dashed rgba(17,19,17,.4)" : "0 solid transparent",
      pad: l.sep ? "10px" : "0px", mt: l.sep ? "10px" : "4px", atraso: `${200 + i * 50}ms`,
    })),
    impresso: s.impresso, numero: k.numero, cupom: k.cupom,
    data: d ? `${p2(d.getDate())}/${p2(d.getMonth() + 1)}/${d.getFullYear()} · ${p2(d.getHours())}:${p2(d.getMinutes())}` : "",
    rotulo: k.rotulo, pre: k.pre || "", mostrado: f(s.mostrado, k.dec || 0), unidade: k.unidade,
    sub: k.sub, nota: k.nota,
    seloTopo: k.seloTopo, seloMeio: k.seloMeio, seloBase: k.seloBase,
    seloFundo: k.ok === false ? "#ffb020" : "#9dff3b",
    ledCor: k.ok === false ? "#ffb020" : "#9dff3b", ledTexto: k.ok === false ? "Revisar" : "Pronta",
    brilho: String(k.brilho == null ? 0.45 : k.brilho),
    codigo: `ELPHY-${k.numero}-${k.cod}`,
    barras: barras(String(k.cod) + k.numero),
    mandarTexto: s.enviado ? "Abrindo o WhatsApp" : "Mandar a nota no WhatsApp",
    mandar,
  };
}
