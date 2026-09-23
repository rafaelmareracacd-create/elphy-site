"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gravaEscolha } from "./urlEscolha";
import { cargasPowerBank } from "@/lib/contas";
import Link from "next/link";
import { Fragment } from "react";

/* Transcrito de docs/design-1.0/PowerBank-Mobile.dc.html */
const PB = [5000, 10000, 20000, 30000, 40000];
const CEL = [3000, 4000, 4500, 5000, 6000];
const br = (v: number, d: number) => v.toFixed(d).replace(".", ",");
const mil = (v: number) => String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
/** mAh × 3,7 V; 65% chega no celular; celular em 3,85 V (src/lib/contas.ts: cargasPowerBank). */
function conta(pb: number, cel: number) {
  const whC = pb * 3.7 / 1000, util = whC * 0.65, whCel = cel * 3.85 / 1000;
  return { whC, util, cel: whCel, cargas: cargasPowerBank(pb, cel), min: whC * 0.6 / whCel, max: whC * 0.7 / whCel, promete: pb / cel };
}

export default function PowerBank() {
  const [s, setS] = useState({ pb: 20000, cel: 5000, impresso: true, mostrado: conta(20000, 5000).cargas, enviado: false });
  const raf = useRef(0);
  const to = useRef<ReturnType<typeof setTimeout>>(undefined);
  const to2 = useRef<ReturnType<typeof setTimeout>>(undefined);
  const reimprime = useCallback((patch: { pb?: number; cel?: number }, soSeMudou = false) => {
    setS((a) => {
      // ao abrir a página, só reimprime se a URL pedir outra conta
      if (soSeMudou && (patch.pb ?? a.pb) === a.pb && (patch.cel ?? a.cel) === a.cel) return a;
      clearTimeout(to.current); cancelAnimationFrame(raf.current);
      const prox = { ...a, ...patch, impresso: false, mostrado: 0 };
      to.current = setTimeout(() => {
        setS((b) => ({ ...b, impresso: true }));
        const alvo = conta(prox.pb, prox.cel).cargas;
        if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) { setS((b) => ({ ...b, mostrado: alvo })); return; }
        const t0 = performance.now();
        const passo = (t: number) => {
          const p = Math.min((t - t0) / 700, 1);
          setS((b) => ({ ...b, mostrado: alvo * (1 - Math.pow(1 - p, 3)) }));
          if (p < 1) raf.current = requestAnimationFrame(passo);
        };
        raf.current = requestAnimationFrame(passo);
      }, 60);
      return prox;
    });
  }, []);
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const pb = Number(q.get("pb")), cel = Number(q.get("cel"));
    reimprime({ ...(PB.includes(pb) ? { pb } : {}), ...(CEL.includes(cel) ? { cel } : {}) }, true);
    return () => { cancelAnimationFrame(raf.current); clearTimeout(to.current); clearTimeout(to2.current); };
  }, [reimprime]);

  const k = conta(s.pb, s.cel);
  const chip = (on: boolean, pick: () => void, curto: string, sub: string) => ({
    on, pick, curto, sub,
    bg: on ? "#9dff3b" : "#0d1013", bd: on ? "#9dff3b" : "rgba(255,255,255,.08)",
    fg: on ? "#07110a" : "#eef2ee", fg2: on ? "#24461a" : "#9aa39c",
    sh: on ? "0 10px 30px rgba(157,255,59,.28)" : "none",
  });
  const pbChips = PB.map((v) => chip(v === s.pb, () => { gravaEscolha({ pb: v }); reimprime({ pb: v }); }, mil(v), "mAh"));
  const celChips = CEL.map((v) => chip(v === s.cel, () => { gravaEscolha({ cel: v }); reimprime({ cel: v }); }, mil(v), "mAh"));
  const pbResumo = `${mil(s.pb)} mAh`, celResumo = `${mil(s.cel)} mAh`;
  const impresso = s.impresso, numero = String(s.pb / 100).padStart(4, "0");
  const pbMah = mil(s.pb), celMah = mil(s.cel);
  const whCelula = br(k.whC, 1), whPerde = br(k.whC - k.util, 1), whUtil = br(k.util, 1), whCel = br(k.cel, 1);
  const promete = br(k.promete, 1), cargasTxt = br(k.cargas, 1), mostrado = br(s.mostrado, 1);
  const faixa = `${br(k.min, 1)} a ${br(k.max, 1)}`;
  const pctReal = `${(Math.min(k.cargas / k.promete, 1) * 100).toFixed(1)}%`;
  const brilho = (0.25 + 0.5 * Math.min(k.cargas / 6, 1)).toFixed(2);
  const mandarTexto = s.enviado ? "Abrindo o WhatsApp" : "Mandar a nota no WhatsApp";
  const mandar = () => {
    const u = new URL("/ferramentas/power-bank/", window.location.origin);
    u.searchParams.set("pb", String(s.pb)); u.searchParams.set("cel", String(s.cel));
    const texto = `Nota do Elphy: um power bank de ${pbMah} mAh carrega um celular de ${celMah} mAh umas ${cargasTxt} vezes, não ${promete}. ${u}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, "_blank", "noopener");
    setS((a) => ({ ...a, enviado: true }));
    clearTimeout(to2.current);
    to2.current = setTimeout(() => setS((a) => ({ ...a, enviado: false })), 1800);
  };
  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '1780px', overflow: 'hidden', background: '#050607', color: '#eef2ee', fontFamily: 'var(--fb)' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px', boxSizing: 'border-box', padding: '0 24px', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
        <Link href="/" style={{ fontWeight: '800', fontSize: '24px', letterSpacing: '-.045em', textDecoration: 'none', color: '#eef2ee' }}>
          elphy
          <span style={{ color: '#9dff3b' }}>
            .
          </span>
        </Link>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#c9d0ca' }}>
          <i style={{ display: 'block', width: '6px', height: '6px', borderRadius: '50%', background: '#9dff3b', boxShadow: '0 0 8px #9dff3b', animation: 'el-pulso 1.8s ease-in-out infinite' }}>
          </i>
          Celular
        </span>
      </header>
      <div style={{ padding: '28px 24px 0' }}>
        <p style={{ margin: '0', fontFamily: 'var(--fm)', fontSize: '11px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9dff3b' }}>
          Ferramenta nº 02
        </p>
        <h1 style={{ margin: '14px 0 0', fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '70px', lineHeight: '.86', textTransform: 'uppercase' }}>
          Quantas
          <br />
          cargas
          <br />
          de verdade
          <span style={{ color: '#9dff3b' }}>
            .
          </span>
        </h1>
        <p style={{ margin: '14px 0 0', fontSize: '16px', lineHeight: '24px', color: '#b9c1bb' }}>
          A caixa divide mAh por mAh. Parte da energia fica no caminho, e a nota mostra quanto.
        </p>
      </div>
      <div style={{ padding: '34px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9aa39c' }}>
          01 — O que a caixa diz
        </span>
        <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', color: '#9dff3b' }}>
          {pbResumo}
        </span>
      </div>
      <div className="dz-rolo" style={{ overflowX: 'auto', marginTop: '12px' }}>
        <div style={{ display: 'flex', gap: '8px', padding: '0 24px', width: 'max-content' }}>
          {pbChips.map((g, i) => (
            <Fragment key={i}>
              <button type="button" onClick={g.pick} aria-pressed={g.on} style={{ width: '112px', height: '64px', flexShrink: '0', boxSizing: 'border-box', padding: '10px 12px', borderRadius: '14px', border: `1px solid ${g.bd}`, background: g.bg, boxShadow: g.sh, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', textAlign: 'left', transition: 'background .18s ease, box-shadow .18s ease' }}>
                <span style={{ fontWeight: '700', fontSize: '15px', color: g.fg }}>
                  {g.curto}
                </span>
                <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: g.fg2 }}>
                  {g.sub}
                </span>
              </button>
            </Fragment>
          ))}
        </div>
      </div>
      <div style={{ padding: '28px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9aa39c' }}>
          02 — Bateria do seu celular
        </span>
        <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', color: '#9dff3b' }}>
          {celResumo}
        </span>
      </div>
      <div className="dz-rolo" style={{ overflowX: 'auto', marginTop: '12px' }}>
        <div style={{ display: 'flex', gap: '8px', padding: '0 24px', width: 'max-content' }}>
          {celChips.map((c, i) => (
            <Fragment key={i}>
              <button type="button" onClick={c.pick} aria-pressed={c.on} style={{ width: '104px', height: '64px', flexShrink: '0', boxSizing: 'border-box', padding: '10px 12px', borderRadius: '14px', border: `1px solid ${c.bd}`, background: c.bg, boxShadow: c.sh, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', textAlign: 'left', transition: 'background .18s ease, box-shadow .18s ease' }}>
                <span style={{ fontWeight: '700', fontSize: '15px', color: c.fg }}>
                  {c.curto}
                </span>
                <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: c.fg2 }}>
                  {c.sub}
                </span>
              </button>
            </Fragment>
          ))}
        </div>
      </div>
      <p style={{ margin: '10px 24px 0', fontSize: '13px', lineHeight: '19px', color: '#7f8881' }}>
        Não sabe? Está na ficha do fabricante, na página do modelo.
      </p>
      <div style={{ position: 'relative', marginTop: '36px', padding: '0 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div aria-hidden="true" style={{ position: 'absolute', left: '-60px', top: '40px', width: '510px', height: '640px', background: 'radial-gradient(ellipse 46% 44% at 50% 50%, rgba(157,255,59,.5), rgba(157,255,59,0) 72%)', opacity: brilho, transition: 'opacity .6s ease' }}>
        </div>
        <div style={{ position: 'relative', zIndex: '3', width: '342px', height: '30px', boxSizing: 'border-box', padding: '0 14px', borderRadius: '15px', background: 'linear-gradient(180deg, #1c2226, #0d1013)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.09), 0 12px 30px rgba(0,0,0,.6)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'var(--fm)', fontSize: '9px', letterSpacing: '.14em', textTransform: 'uppercase' }}>
          <span style={{ color: '#8d958f' }}>
            Impressora de contas
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', color: '#9dff3b' }}>
            <i style={{ display: 'block', width: '7px', height: '7px', borderRadius: '50%', background: '#9dff3b', boxShadow: '0 0 10px #9dff3b', animation: 'el-pulso 1.6s ease-in-out infinite' }}>
            </i>
            Pronta
          </span>
        </div>
        <div aria-hidden="true" style={{ position: 'relative', zIndex: '3', width: '318px', height: '6px', marginTop: '-4px', borderRadius: '3px', background: '#020303' }}>
        </div>
        {impresso && (
          <>
            <div style={{ position: 'relative', zIndex: '2', marginTop: '-8px', transform: 'rotate(-1.4deg)', transformOrigin: '50% 0' }}>
              <div style={{ position: 'relative', width: '318px', background: '#f3f1ea', color: '#111311', fontFamily: 'var(--fm)', fontSize: '10.5px', lineHeight: '17px', boxShadow: '0 40px 70px rgba(0,0,0,.55), 0 2px 0 rgba(0,0,0,.25)', animation: 'el-imprime .6s cubic-bezier(.2,.7,.3,1) backwards' }}>
                <div aria-hidden="true" style={{ position: 'absolute', left: '0', bottom: '-10px', width: '318px', height: '10px', background: 'linear-gradient(45deg, #f3f1ea 50%, rgba(243,241,234,0) 50%) 0 0 / 12px 10px repeat-x, linear-gradient(-45deg, #f3f1ea 50%, rgba(243,241,234,0) 50%) 0 0 / 12px 10px repeat-x', transform: 'scaleY(-1)' }}>
                </div>
                <div style={{ position: 'relative', padding: '22px 22px 24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', animation: 'el-linha .3s ease-out both', animationDelay: '80ms' }}>
                    <span style={{ fontFamily: 'var(--fb)', fontWeight: '800', fontSize: '21px', letterSpacing: '-.045em' }}>
                      elphy.
                    </span>
                    <span style={{ fontWeight: '700' }}>
                      Nº {numero}
                    </span>
                  </div>
                  <div style={{ marginTop: '6px', letterSpacing: '.08em', textTransform: 'uppercase' }}>
                    Cupom de medição · energia
                  </div>
                  <div style={{ margin: '12px 0', borderTop: '1.5px dashed rgba(17,19,17,.4)' }}>
                  </div>
                  <div style={{ fontSize: '9px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#5b5f58', animation: 'el-linha .3s ease-out both', animationDelay: '200ms' }}>
                    Na caixa
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', animation: 'el-linha .3s ease-out both', animationDelay: '220ms' }}>
                    <span>
                      {pbMah} mAh × 3,7 V
                    </span>
                    <span style={{ flex: '1', margin: '0 5px 4px', borderBottom: '1.5px dotted rgba(17,19,17,.45)' }}>
                    </span>
                    <b>
                      {whCelula} Wh
                    </b>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '4px', animation: 'el-linha .3s ease-out both', animationDelay: '280ms' }}>
                    <span>
                      Perde na conversão (~35%)
                    </span>
                    <span style={{ flex: '1', margin: '0 5px 4px', borderBottom: '1.5px dotted rgba(17,19,17,.45)' }}>
                    </span>
                    <b>
                      −{whPerde} Wh
                    </b>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '4px', animation: 'el-linha .3s ease-out both', animationDelay: '340ms' }}>
                    <span style={{ fontWeight: '700' }}>
                      Chega no celular
                    </span>
                    <span style={{ flex: '1', margin: '0 5px 4px', borderBottom: '1.5px dotted rgba(17,19,17,.45)' }}>
                    </span>
                    <b>
                      {whUtil} Wh
                    </b>
                  </div>
                  <div style={{ margin: '12px 0', borderTop: '1.5px dashed rgba(17,19,17,.4)' }}>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', animation: 'el-linha .3s ease-out both', animationDelay: '400ms' }}>
                    <span>
                      Celular {celMah} mAh × 3,85 V
                    </span>
                    <span style={{ flex: '1', margin: '0 5px 4px', borderBottom: '1.5px dotted rgba(17,19,17,.45)' }}>
                    </span>
                    <b>
                      {whCel} Wh
                    </b>
                  </div>
                  <div style={{ marginTop: '14px', animation: 'el-linha .3s ease-out both', animationDelay: '470ms' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#5b5f58' }}>
                      <span>
                        Caixa promete
                      </span>
                      <span>
                        {promete} cargas
                      </span>
                    </div>
                    <div style={{ height: '12px', marginTop: '4px', boxSizing: 'border-box', border: '1.5px solid #111311', background: 'repeating-linear-gradient(135deg, #111311 0 2px, rgba(17,19,17,0) 2px 5px)' }}>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '9px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#5b5f58' }}>
                      <span>
                        Chega de verdade
                      </span>
                      <span>
                        {cargasTxt} cargas
                      </span>
                    </div>
                    <div style={{ height: '12px', marginTop: '4px', boxSizing: 'border-box', border: '1.5px solid #111311' }}>
                      <i style={{ display: 'block', height: '100%', width: pctReal, background: '#111311', transformOrigin: '0 50%', animation: 'el-enche .7s cubic-bezier(.2,.7,.3,1) both', animationDelay: '520ms' }}>
                      </i>
                    </div>
                  </div>
                  <div style={{ marginTop: '16px', borderTop: '3px double #111311' }}>
                  </div>
                  <div style={{ padding: '12px 0 8px' }}>
                    <div style={{ fontSize: '9px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#5b5f58' }}>
                      Cargas completas, de 0 a 100%
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '4px', fontFamily: 'var(--fd)', fontWeight: '900', lineHeight: '.84' }}>
                      <span style={{ fontSize: '88px' }}>
                        {mostrado}
                      </span>
                      <span style={{ fontSize: '30px' }}>
                        cargas
                      </span>
                    </div>
                    <div style={{ marginTop: '8px', fontSize: '10px', color: '#5b5f58' }}>
                      Faixa: {faixa} cargas, conforme a eficiência (60–70%).
                    </div>
                  </div>
                  <div style={{ borderTop: '3px double #111311' }}>
                  </div>
                  <div style={{ marginTop: '12px', fontSize: '10px', lineHeight: '15px', color: '#3f433d' }}>
                    Não é defeito nem golpe: a célula trabalha em 3,7 V e a USB entrega 5 V ou mais. A conversão esquenta e gasta.
                  </div>
                  <div style={{ marginTop: '6px', fontSize: '9.5px', lineHeight: '14px', color: '#5b5f58' }}>
                    Estimativa pela fórmula da metodologia. Não garante compatibilidade.
                  </div>
                </div>
              </div>
              <div style={{ position: 'absolute', right: '-22px', bottom: '120px', width: '120px', height: '120px', borderRadius: '50%', background: '#9dff3b', color: '#07110a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', outline: '1.5px dashed rgba(7,17,10,.35)', outlineOffset: '-9px', boxShadow: '0 16px 36px rgba(0,0,0,.45)', transform: 'rotate(12deg)', animation: 'el-carimba .44s cubic-bezier(.2,1.3,.4,1) both', animationDelay: '820ms' }}>
                <span style={{ fontFamily: 'var(--fm)', fontSize: '8.5px', letterSpacing: '.16em', textTransform: 'uppercase' }}>
                  De verdade
                </span>
                <span style={{ fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '50px', lineHeight: '.86' }}>
                  {cargasTxt}
                </span>
                <span style={{ fontFamily: 'var(--fm)', fontSize: '8.5px', letterSpacing: '.16em', textTransform: 'uppercase' }}>
                  cargas
                </span>
              </div>
            </div>
          </>
        )}
      </div>
      <div style={{ padding: '44px 24px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button type="button" onClick={mandar} style={{ height: '58px', border: '0', borderRadius: '29px', background: '#9dff3b', color: '#07110a', fontFamily: 'var(--fb)', fontWeight: '700', fontSize: '17px', boxShadow: '0 14px 40px rgba(157,255,59,.25)' }}>
          {mandarTexto}
        </button>
      </div>
      <div style={{ margin: '28px 24px 0', boxSizing: 'border-box', padding: '20px', borderRadius: '20px', border: '1px solid rgba(255,176,32,.35)', background: '#0a0d0f' }}>
        <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#ffb020' }}>
          Olhe na etiqueta de trás
        </span>
        <p style={{ margin: '10px 0 0', fontSize: '15px', lineHeight: '23px', color: '#c9d0ca' }}>
          Se ela traz &quot;capacidade nominal&quot; em mAh a 5 V, esse é o número honesto. Power bank que não imprime nenhum dos dois não entra na lista do Elphy.
        </p>
      </div>
      <div style={{ position: 'absolute', left: '0', right: '0', bottom: '0', padding: '24px', borderTop: '1px solid rgba(255,255,255,.07)', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--fm)', fontSize: '10px', letterSpacing: '.1em', textTransform: 'uppercase', color: '#9aa39c' }}>
        <span>
          Dica sem caô
          <span style={{ color: '#9dff3b' }}>
            .
          </span>
        </span>
        <Link href="/ferramentas/ssd/" style={{ color: '#9aa39c' }}>
          Próxima: SSD
        </Link>
      </div>
    </div>
  );
}
