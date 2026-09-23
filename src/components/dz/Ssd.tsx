"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { gravaEscolha } from "./urlEscolha";
import { Fragment } from "react";

/* Transcrito de docs/design-1.0/SSD-Mobile.dc.html */
const OP = [
  { gb: 128, r: "128 GB" }, { gb: 256, r: "256 GB" }, { gb: 512, r: "512 GB" },
  { gb: 1000, r: "1 TB" }, { gb: 2000, r: "2 TB" }, { gb: 4000, r: "4 TB" },
];
/** GB da caixa (10^9 bytes) no que o computador mostra (2^30 bytes). */
const gibDe = (gb: number) => gb * 1e9 / Math.pow(1024, 3);
const mil = (v: number) => String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const br = (v: number, d: number) => v.toFixed(d).replace(".", ",");

export default function Ssd() {
  const [s, setS] = useState({ gb: 1000, impresso: true, mostrado: gibDe(1000), enviado: false });
  const raf = useRef(0);
  const to = useRef<ReturnType<typeof setTimeout>>(undefined);
  const to2 = useRef<ReturnType<typeof setTimeout>>(undefined);
  const reimprime = useCallback((gbNovo?: number, soSeMudou = false) => {
    setS((a) => {
      const gb = gbNovo ?? a.gb;
      // ao abrir a página, só reimprime se a URL pedir outro tamanho
      if (soSeMudou && gb === a.gb) return a;
      clearTimeout(to.current); cancelAnimationFrame(raf.current);
      to.current = setTimeout(() => {
        setS((b) => ({ ...b, impresso: true }));
        const alvo = gibDe(gb);
        if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) { setS((b) => ({ ...b, mostrado: alvo })); return; }
        const t0 = performance.now();
        const passo = (t: number) => {
          const p = Math.min((t - t0) / 700, 1);
          setS((b) => ({ ...b, mostrado: alvo * (1 - Math.pow(1 - p, 3)) }));
          if (p < 1) raf.current = requestAnimationFrame(passo);
        };
        raf.current = requestAnimationFrame(passo);
      }, 60);
      return { ...a, gb, impresso: false, mostrado: 0 };
    });
  }, []);
  useEffect(() => {
    const q = Number(new URLSearchParams(window.location.search).get("gb"));
    reimprime(OP.some((x) => x.gb === q) ? q : undefined, true);
    return () => { cancelAnimationFrame(raf.current); clearTimeout(to.current); clearTimeout(to2.current); };
  }, [reimprime]);

  const g = gibDe(s.gb), tb = g >= 1024;
  const op = OP.find((x) => x.gb === s.gb) ?? OP[3];
  const perda = 1 - g / s.gb;
  const chips = OP.map((x) => {
    const on = x.gb === s.gb;
    return { curto: x.r, on, pick: () => { gravaEscolha({ gb: x.gb }); reimprime(x.gb); },
      bg: on ? "#9dff3b" : "#0d1013", bd: on ? "#9dff3b" : "rgba(255,255,255,.08)",
      fg: on ? "#07110a" : "#eef2ee", fg2: on ? "#24461a" : "#9aa39c",
      sh: on ? "0 10px 30px rgba(157,255,59,.28)" : "none" };
  });
  const resumo = op.r, rotulo = op.r, impresso = s.impresso;
  const numero = String(s.gb).padStart(4, "0");
  const bytes = mil(s.gb * 1e9);
  // como o Windows: corta, não arredonda (512 GB → 476, 2 TB → 1,81 TB)
  const gib = mil(Math.floor(g)), some = mil(Math.round(s.gb - Math.floor(g)));
  const pct = br(perda * 100, 1), pctCurto = String(Math.round(perda * 100)); // carimbo: 6,87% → 7 (o desenho cortava para 6)
  const pctMostra = `${((1 - perda) * 100).toFixed(1)}%`;
  const mostrado = tb ? br(Math.floor(s.mostrado / 1024 * 100) / 100, 2) : String(Math.floor(s.mostrado + 1e-9));
  const unidade = tb ? "TB" : "GB";
  const mandarTexto = s.enviado ? "Abrindo o WhatsApp" : "Mandar a nota no WhatsApp";
  const mandar = () => {
    const u = new URL("/ferramentas/ssd/", window.location.origin);
    u.searchParams.set("gb", String(s.gb));
    const texto = `Nota do Elphy: um SSD de ${op.r} aparece como ${gib} GB no computador. ${u}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, "_blank", "noopener");
    setS((a) => ({ ...a, enviado: true }));
    clearTimeout(to2.current);
    to2.current = setTimeout(() => setS((a) => ({ ...a, enviado: false })), 1800);
  };
  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '1640px', overflow: 'hidden', background: '#050607', color: '#eef2ee', fontFamily: 'var(--fb)' }}>
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
          Armazenamento
        </span>
      </header>
      <div style={{ padding: '28px 24px 0' }}>
        <p style={{ margin: '0', fontFamily: 'var(--fm)', fontSize: '11px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9dff3b' }}>
          Ferramenta nº 03
        </p>
        <h1 style={{ margin: '14px 0 0', fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '70px', lineHeight: '.86', textTransform: 'uppercase' }}>
          O que o
          <br />
          Windows
          <br />
          vai mostrar
          <span style={{ color: '#9dff3b' }}>
            .
          </span>
        </h1>
        <p style={{ margin: '14px 0 0', fontSize: '16px', lineHeight: '24px', color: '#b9c1bb' }}>
          A caixa conta de mil em mil. O Windows conta de 1.024 em 1.024. Nenhum dos dois está mentindo.
        </p>
      </div>
      <div style={{ padding: '34px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9aa39c' }}>
          01 — O que a caixa diz
        </span>
        <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', color: '#9dff3b' }}>
          {resumo}
        </span>
      </div>
      <div className="dz-rolo" style={{ overflowX: 'auto', marginTop: '12px' }}>
        <div style={{ display: 'flex', gap: '8px', padding: '0 24px', width: 'max-content' }}>
          {chips.map((g, i) => (
            <Fragment key={i}>
              <button type="button" onClick={g.pick} aria-pressed={g.on} style={{ width: '96px', height: '64px', flexShrink: '0', boxSizing: 'border-box', padding: '10px 12px', borderRadius: '14px', border: `1px solid ${g.bd}`, background: g.bg, boxShadow: g.sh, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', textAlign: 'left', transition: 'background .18s ease, box-shadow .18s ease' }}>
                <span style={{ fontWeight: '700', fontSize: '17px', color: g.fg }}>
                  {g.curto}
                </span>
                <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: g.fg2 }}>
                  na caixa
                </span>
              </button>
            </Fragment>
          ))}
        </div>
      </div>
      <div style={{ position: 'relative', marginTop: '40px', padding: '0 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div aria-hidden="true" style={{ position: 'absolute', left: '-60px', top: '40px', width: '510px', height: '640px', background: 'radial-gradient(ellipse 46% 44% at 50% 50%, rgba(157,255,59,.5), rgba(157,255,59,0) 72%)', opacity: '.45' }}>
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontFamily: 'var(--fb)', fontWeight: '800', fontSize: '21px', letterSpacing: '-.045em' }}>
                      elphy.
                    </span>
                    <span style={{ fontWeight: '700' }}>
                      Nº {numero}
                    </span>
                  </div>
                  <div style={{ marginTop: '6px', letterSpacing: '.08em', textTransform: 'uppercase' }}>
                    Cupom de medição · espaço
                  </div>
                  <div style={{ margin: '12px 0', borderTop: '1.5px dashed rgba(17,19,17,.4)' }}>
                  </div>
                  <div style={{ fontSize: '9px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#5b5f58', animation: 'el-linha .3s ease-out both', animationDelay: '200ms' }}>
                    Na caixa ({rotulo})
                  </div>
                  <div style={{ animation: 'el-linha .3s ease-out both', animationDelay: '230ms' }}>
                    <b>
                      {bytes}
                    </b>
                    {' '}bytes
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '8px', animation: 'el-linha .3s ease-out both', animationDelay: '300ms' }}>
                    <span>
                      ÷ 1.073.741.824
                    </span>
                    <span style={{ flex: '1', margin: '0 5px 4px', borderBottom: '1.5px dotted rgba(17,19,17,.45)' }}>
                    </span>
                    <b>
                      {gib} GB
                    </b>
                  </div>
                  <div style={{ marginTop: '2px', fontSize: '9.5px', color: '#5b5f58', animation: 'el-linha .3s ease-out both', animationDelay: '330ms' }}>
                    1.024 × 1.024 × 1.024 — o jeito que o Windows conta
                  </div>
                  <div style={{ margin: '12px 0', borderTop: '1.5px dashed rgba(17,19,17,.4)' }}>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', animation: 'el-linha .3s ease-out both', animationDelay: '400ms' }}>
                    <span>
                      Some da conta
                    </span>
                    <span style={{ flex: '1', margin: '0 5px 4px', borderBottom: '1.5px dotted rgba(17,19,17,.45)' }}>
                    </span>
                    <b>
                      −{some} GB
                    </b>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '3px', animation: 'el-linha .3s ease-out both', animationDelay: '450ms' }}>
                    <span>
                      Em porcentagem
                    </span>
                    <span style={{ flex: '1', margin: '0 5px 4px', borderBottom: '1.5px dotted rgba(17,19,17,.45)' }}>
                    </span>
                    <b>
                      −{pct}%
                    </b>
                  </div>
                  <div style={{ marginTop: '14px', display: 'flex', height: '14px', boxSizing: 'border-box', border: '1.5px solid #111311', animation: 'el-linha .3s ease-out both', animationDelay: '500ms' }}>
                    <i style={{ display: 'block', width: pctMostra, background: '#111311' }}>
                    </i>
                    <i style={{ display: 'block', flex: '1', background: 'repeating-linear-gradient(135deg, #111311 0 2px, rgba(17,19,17,0) 2px 5px)' }}>
                    </i>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px', fontSize: '9px', color: '#5b5f58' }}>
                    <span>
                      O Windows mostra
                    </span>
                    <span>
                      a diferença da conta
                    </span>
                  </div>
                  <div style={{ marginTop: '16px', borderTop: '3px double #111311' }}>
                  </div>
                  <div style={{ padding: '12px 0 8px' }}>
                    <div style={{ fontSize: '9px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#5b5f58' }}>
                      Aparece no Windows
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '4px', fontFamily: 'var(--fd)', fontWeight: '900', lineHeight: '.84' }}>
                      <span style={{ fontSize: '88px' }}>
                        {mostrado}
                      </span>
                      <span style={{ fontSize: '34px' }}>
                        {unidade}
                      </span>
                    </div>
                    <div style={{ marginTop: '8px', fontSize: '10px', color: '#5b5f58' }}>
                      Antes de instalar qualquer coisa. O sistema ocupa mais.
                    </div>
                  </div>
                  <div style={{ borderTop: '3px double #111311' }}>
                  </div>
                  <div style={{ marginTop: '12px', fontSize: '10px', lineHeight: '15px', color: '#3f433d' }}>
                    Não é defeito e não dá para recuperar. Se o número for muito menor que este, aí vale desconfiar do SSD.
                  </div>
                  <div style={{ marginTop: '6px', fontSize: '9.5px', lineHeight: '14px', color: '#5b5f58' }}>
                    Estimativa pela fórmula da metodologia. Não garante compatibilidade.
                  </div>
                </div>
              </div>
              <div style={{ position: 'absolute', right: '-22px', bottom: '110px', width: '120px', height: '120px', borderRadius: '50%', background: '#9dff3b', color: '#07110a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', outline: '1.5px dashed rgba(7,17,10,.35)', outlineOffset: '-9px', boxShadow: '0 16px 36px rgba(0,0,0,.45)', transform: 'rotate(12deg)', animation: 'el-carimba .44s cubic-bezier(.2,1.3,.4,1) both', animationDelay: '820ms' }}>
                <span style={{ fontFamily: 'var(--fm)', fontSize: '8.5px', letterSpacing: '.16em', textTransform: 'uppercase' }}>
                  Normal
                </span>
                <span style={{ fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '44px', lineHeight: '.86' }}>
                  −{pctCurto}%
                </span>
                <span style={{ fontFamily: 'var(--fm)', fontSize: '8.5px', letterSpacing: '.16em', textTransform: 'uppercase' }}>
                  não é golpe
                </span>
              </div>
            </div>
          </>
        )}
      </div>
      <div style={{ padding: '44px 24px 0' }}>
        <button type="button" onClick={mandar} style={{ width: '100%', height: '58px', border: '0', borderRadius: '29px', background: '#9dff3b', color: '#07110a', fontFamily: 'var(--fb)', fontWeight: '700', fontSize: '17px', boxShadow: '0 14px 40px rgba(157,255,59,.25)' }}>
          {mandarTexto}
        </button>
      </div>
      <div style={{ margin: '28px 24px 0', boxSizing: 'border-box', padding: '20px', borderRadius: '20px', border: '1px solid rgba(255,176,32,.35)', background: '#0a0d0f' }}>
        <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#ffb020' }}>
          Onde desconfiar
        </span>
        <p style={{ margin: '10px 0 0', fontSize: '15px', lineHeight: '23px', color: '#c9d0ca' }}>
          SSD de 2 TB por preço de 256 GB costuma ser pen drive com firmware mexido: mostra 2 TB e corrompe o que passar do tamanho real. Isso a conta não pega — só um teste de gravação.
        </p>
      </div>
      <div style={{ position: 'absolute', left: '0', right: '0', bottom: '0', padding: '24px', borderTop: '1px solid rgba(255,255,255,.07)', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--fm)', fontSize: '10px', letterSpacing: '.1em', textTransform: 'uppercase', color: '#9aa39c' }}>
        <span>
          Dica sem caô
          <span style={{ color: '#9dff3b' }}>
            .
          </span>
        </span>
        <Link href="/ferramentas/power-bank/" style={{ color: '#9aa39c' }}>
          Anterior: power bank
        </Link>
      </div>
    </div>
  );
}
