"use client";

import { contaLuz, GR_LUZ, INICIAL_LUZ } from "@/lib/ferramentas/luz";
import { useFerramenta } from "./useFerramenta";
import Link from "next/link";
import { Fragment } from "react";
import MenuBotao from "./Menu";

/* Transcrito de docs/design-1.0/Luz-Mobile.dc.html */
export default function Luz() {
  const { grupos, linhas, impresso, numero, cupom, data, rotulo, pre, mostrado, unidade, sub, nota, seloTopo, seloMeio, seloBase, seloFundo, ledCor, ledTexto, brilho, codigo, barras, mandarTexto, mandar } =
    useFerramenta(GR_LUZ, INICIAL_LUZ, contaLuz, "/ferramentas/conta-de-luz/");
  return (
    <div className="dz-col" style={{ position: 'relative', width: '100%', minHeight: '1960px', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#050607', color: '#eef2ee', fontFamily: 'var(--fb)' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px', boxSizing: 'border-box', padding: '0 24px', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
        <Link href="/" style={{ fontWeight: '800', fontSize: '24px', letterSpacing: '-.045em', textDecoration: 'none', color: '#eef2ee' }}>
          elphy
          <span style={{ color: '#9dff3b' }}>
            .
          </span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#c9d0ca' }}>
            Casa
          </span>
          <MenuBotao style={{ width: '44px', height: '44px', boxSizing: 'border-box', border: '1px solid rgba(255,255,255,.14)', borderRadius: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#eef2ee" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 8h16M4 16h16" />
            </svg>
          </MenuBotao>
        </div>
      </header>
      <div style={{ padding: '28px 24px 0' }}>
        <p style={{ margin: '0', fontFamily: 'var(--fm)', fontSize: '11px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9dff3b' }}>
          Ferramenta nº 04
        </p>
        <h1 style={{ margin: '14px 0 0', fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '70px', lineHeight: '.86', textTransform: 'uppercase' }}>
          Quanto o PC
          <br />
          custa na
          <br />
          conta
          <span style={{ color: '#9dff3b' }}>
            .
          </span>
        </h1>
        <p style={{ margin: '14px 0 0', fontSize: '16px', lineHeight: '24px', color: '#b9c1bb' }}>
          Watts do PC × horas ligado × a tarifa que está na sua conta. A nota sai em reais por mês.
        </p>
      </div>
      {grupos.map((g, i) => (
        <Fragment key={i}>
          <div>
            <div style={{ padding: '30px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px' }}>
              <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9aa39c' }}>
                {g.n} — {g.titulo}
              </span>
              <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', color: '#9dff3b', whiteSpace: 'nowrap' }}>
                {g.resumo}
              </span>
            </div>
            <div className="dz-rolo" style={{ overflowX: 'auto', marginTop: '12px' }}>
              <div style={{ display: 'flex', gap: '8px', padding: '0 24px', width: 'max-content' }}>
                {g.ops.map((o, i) => (
                  <Fragment key={i}>
                    <button type="button" onClick={o.pick} aria-pressed={o.on} style={{ width: o.larg, height: '64px', flexShrink: '0', boxSizing: 'border-box', padding: '10px 12px', borderRadius: '14px', border: `1px solid ${o.bd}`, background: o.bg, boxShadow: o.sh, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', textAlign: 'left', transition: 'background .18s ease, box-shadow .18s ease' }}>
                      <span style={{ fontFamily: 'var(--fb)', fontWeight: '700', fontSize: '15px', lineHeight: '17px', color: o.fg }}>
                        {o.curto}
                      </span>
                      <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', color: o.fg2 }}>
                        {o.sub}
                      </span>
                    </button>
                  </Fragment>
                ))}
              </div>
            </div>
            {g.temDica && (
              <>
                <p style={{ margin: '10px 24px 0', fontSize: '13px', lineHeight: '19px', color: '#7f8881' }}>
                  {g.dica}
                </p>
              </>
            )}
          </div>
        </Fragment>
      ))}
      <div style={{ position: 'relative', marginTop: '40px', padding: '0 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div aria-hidden="true" style={{ position: 'absolute', left: '-60px', top: '40px', width: '510px', height: '640px', background: 'radial-gradient(ellipse 46% 44% at 50% 50%, rgba(157,255,59,.5), rgba(157,255,59,0) 72%)', opacity: brilho, transition: 'opacity .6s ease' }}>
        </div>
        <div style={{ position: 'relative', zIndex: '3', width: '342px', height: '30px', boxSizing: 'border-box', padding: '0 14px', borderRadius: '15px', background: 'linear-gradient(180deg, #1c2226, #0d1013)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.09), 0 12px 30px rgba(0,0,0,.6)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'var(--fm)', fontSize: '9px', letterSpacing: '.14em', textTransform: 'uppercase' }}>
          <span style={{ color: '#8d958f' }}>
            Impressora de contas
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', color: ledCor }}>
            <i style={{ display: 'block', width: '7px', height: '7px', borderRadius: '50%', background: ledCor, boxShadow: `0 0 10px ${ledCor}`, animation: 'el-pulso 1.6s ease-in-out infinite' }}>
            </i>
            {ledTexto}
          </span>
        </div>
        <div aria-hidden="true" style={{ position: 'relative', zIndex: '3', width: '318px', height: '6px', marginTop: '-4px', borderRadius: '3px', background: '#020303' }}>
        </div>
        {impresso && (
          <>
            <div style={{ position: 'relative', zIndex: '2', marginTop: '-8px', transform: 'rotate(-1.4deg)', transformOrigin: '50% 0' }}>
              <div style={{ position: 'relative', width: '318px', background: '#f3f1ea', color: '#111311', fontFamily: 'var(--fm)', fontSize: '10.5px', lineHeight: '17px', boxShadow: '0 40px 70px rgba(0,0,0,.55), 0 2px 0 rgba(0,0,0,.25)', animation: 'el-imprime .6s cubic-bezier(.2,.7,.3,1) backwards' }}>
                <div aria-hidden="true" style={{ position: 'absolute', left: '0', right: '0', bottom: '-10px', height: '10px', background: 'linear-gradient(45deg, #f3f1ea 50%, rgba(243,241,234,0) 50%) 0 0 / 12px 10px repeat-x, linear-gradient(-45deg, #f3f1ea 50%, rgba(243,241,234,0) 50%) 0 0 / 12px 10px repeat-x', transform: 'scaleY(-1)' }}>
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
                    {cupom}
                  </div>
                  <div style={{ color: '#5b5f58' }}>
                    {data}
                  </div>
                  <div style={{ margin: '12px 0', borderTop: '1.5px dashed rgba(17,19,17,.4)' }}>
                  </div>
                  {linhas.map((l, i) => (
                    <Fragment key={i}>
                      <div style={{ display: 'flex', alignItems: 'baseline', marginTop: l.mt, paddingTop: l.pad, borderTop: l.borda, fontWeight: l.peso, animation: 'el-linha .3s ease-out both', animationDelay: l.atraso }}>
                        <span>
                          {l.nome}
                        </span>
                        <span style={{ flex: '1', margin: '0 5px 4px', borderBottom: '1.5px dotted rgba(17,19,17,.45)' }}>
                        </span>
                        <b>
                          {l.v}
                        </b>
                      </div>
                    </Fragment>
                  ))}
                  <div style={{ marginTop: '14px' }}>
                  </div>
                  <div style={{ borderTop: '3px double #111311' }}>
                  </div>
                  <div style={{ padding: '12px 0 8px' }}>
                    <div style={{ fontSize: '9px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#5b5f58' }}>
                      {rotulo}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '6px', marginTop: '4px', fontFamily: 'var(--fd)', fontWeight: '900', lineHeight: '.84' }}>
                      <span style={{ fontSize: '36px' }}>
                        {pre}
                      </span>
                      <span style={{ fontSize: '84px' }}>
                        {mostrado}
                      </span>
                      <span style={{ fontSize: '30px' }}>
                        {unidade}
                      </span>
                    </div>
                    <div style={{ marginTop: '8px', fontSize: '10px', lineHeight: '15px', color: '#5b5f58' }}>
                      {sub}
                    </div>
                  </div>
                  <div style={{ borderTop: '3px double #111311' }}>
                  </div>
                  <div style={{ marginTop: '12px', fontSize: '10px', lineHeight: '15px', color: '#3f433d' }}>
                    {nota}
                  </div>
                  <div style={{ marginTop: '6px', fontSize: '9.5px', lineHeight: '14px', color: '#5b5f58' }}>
                    Estimativa pela fórmula da metodologia. Não garante compatibilidade.
                  </div>
                  <div aria-hidden="true" style={{ display: 'flex', height: '30px', marginTop: '10px' }}>
                    {barras.map((b, i) => (
                      <Fragment key={i}>
                        <i style={{ display: 'block', width: `${b.w}px`, background: b.c }}>
                        </i>
                      </Fragment>
                    ))}
                  </div>
                  <div style={{ marginTop: '5px', fontSize: '9px', letterSpacing: '.12em', color: '#5b5f58' }}>
                    {codigo}
                  </div>
                </div>
              </div>
              <div style={{ position: 'absolute', right: '-22px', bottom: '170px', width: '120px', height: '120px', borderRadius: '50%', background: seloFundo, color: '#07110a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', outline: '1.5px dashed rgba(7,17,10,.35)', outlineOffset: '-9px', boxShadow: '0 16px 36px rgba(0,0,0,.45)', transform: 'rotate(12deg)', animation: 'el-carimba .44s cubic-bezier(.2,1.3,.4,1) both', animationDelay: '820ms' }}>
                <span style={{ fontFamily: 'var(--fm)', fontSize: '8.5px', letterSpacing: '.16em', textTransform: 'uppercase' }}>
                  {seloTopo}
                </span>
                <span style={{ fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '38px', lineHeight: '.9' }}>
                  {seloMeio}
                </span>
                <span style={{ fontFamily: 'var(--fm)', fontSize: '8.5px', letterSpacing: '.14em', textTransform: 'uppercase' }}>
                  {seloBase}
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
        <Link href="/ferramentas/fonte/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', height: '56px', boxSizing: 'border-box', borderRadius: '28px', textDecoration: 'none', fontFamily: 'var(--fb)', fontWeight: '700', fontSize: '16px', marginTop: '0px', background: 'transparent', color: '#eef2ee', border: '1px solid rgba(255,255,255,.16)' }}>
          Calcular os watts do meu PC{' '}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
      <div style={{ margin: '28px 24px 0', boxSizing: 'border-box', padding: '20px', borderRadius: '20px', border: '1px solid rgba(255,176,32,.35)', background: '#0a0d0f' }}>
        <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#ffb020' }}>
          A fonte entra nessa conta
        </span>
        <p style={{ margin: '10px 0 0', fontSize: '15px', lineHeight: '23px', color: '#c9d0ca' }}>
          A conta usa watts na tomada. Se você só sabe o consumo das peças, some a perda da fonte: de 10% a 15% numa fonte com selo 80 Plus.
        </p>
      </div>
      <div style={{ flexGrow: '1', minHeight: '40px' }}>
      </div>
      <footer style={{ padding: '24px', borderTop: '1px solid rgba(255,255,255,.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--fm)', fontSize: '10px', letterSpacing: '.1em', textTransform: 'uppercase', color: '#9aa39c' }}>
        <span>
          Dica sem caô
          <span style={{ color: '#9dff3b' }}>
            .
          </span>
        </span>
        <Link href="/metodologia/" style={{ color: '#9aa39c' }}>
          Como a gente faz a conta
        </Link>
      </footer>
    </div>
  );
}
