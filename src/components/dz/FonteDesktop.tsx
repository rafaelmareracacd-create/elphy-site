"use client";

import Link from "next/link";
import { Fragment } from "react";
import { contaNotaFonte, GR_FONTE } from "@/lib/ferramentas/fonte";
import { useFerramenta } from "./useFerramenta";

/* Transcrito de docs/design-1.0/Fonte-Desktop.dc.html */
export default function FonteDesktop() {
  const { grupos, linhas, impresso, numero, cupom, data, rotulo, pre, mostrado, unidade, sub, nota, seloTopo, seloMeio, seloBase, seloFundo, ledCor, ledTexto, brilho, codigo, barras, mandarTexto, mandar } =
    useFerramenta(GR_FONTE, { gpu: "rtx-5070", cpu: "r5-7600" }, contaNotaFonte, "/ferramentas/fonte/");
  return (
    <div className="dz-col" style={{ position: 'relative', width: '1440px', minHeight: '1560px', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#050607', color: '#eef2ee', fontFamily: 'var(--fb)' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px', boxSizing: 'border-box', padding: '0 64px', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
        <Link href="/" style={{ fontWeight: '800', fontSize: '28px', letterSpacing: '-.045em', textDecoration: 'none', color: '#eef2ee' }}>
          elphy
          <span style={{ color: '#9dff3b' }}>
            .
          </span>
        </Link>
        <nav aria-label="Principal" style={{ display: 'flex', gap: '32px', fontSize: '15px', fontWeight: '600' }}>
          <Link href="/ferramentas/" style={{ color: '#9dff3b', textDecoration: 'none' }}>
            Ferramentas
          </Link>
          <Link href="/montador/" style={{ color: '#c9d0ca', textDecoration: 'none' }}>
            Montador
          </Link>
          <Link href="/dicas/" style={{ color: '#c9d0ca', textDecoration: 'none' }}>
            Dicas
          </Link>
          <Link href="/metodologia/" style={{ color: '#c9d0ca', textDecoration: 'none' }}>
            Metodologia
          </Link>
        </nav>
        <form action="/busca/" role="search" style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '320px', height: '44px', boxSizing: 'border-box', padding: '0 16px', borderRadius: '22px', background: '#0d1013', border: '1px solid rgba(255,255,255,.1)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9aa39c" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-4-4" />
          </svg>
          <span style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden' }}>
            Buscar
          </span>
          <input type="search" name="q" aria-label="Buscar no Elphy" placeholder="fonte para RTX 5070…" style={{ flex: '1', border: '0', background: 'transparent', color: '#eef2ee', font: 'inherit', fontSize: '15px', outline: 'none' }} />
        </form>
      </header>
      <div style={{ padding: '56px 64px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <p style={{ margin: '0', fontFamily: 'var(--fm)', fontSize: '12px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9dff3b' }}>
            Ferramenta nº 01 · PC
          </p>
          <h1 style={{ margin: '14px 0 0', fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '128px', lineHeight: '.84', textTransform: 'uppercase' }}>
            Fazer
            <br />
            a conta
            <span style={{ color: '#9dff3b' }}>
              .
            </span>
          </h1>
        </div>
        <p style={{ margin: '0 0 8px', width: '400px', fontSize: '18px', lineHeight: '28px', color: '#b9c1bb' }}>
          Clica na placa e no processador. A nota sai na hora, com a soma inteira e a folga para os picos.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 440px', gap: '64px', padding: '56px 64px 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {grupos.map((g, i) => (
            <Fragment key={i}>
              <div style={{ boxSizing: 'border-box', padding: '24px', borderRadius: '22px', background: '#0a0d0f', border: '1px solid rgba(255,255,255,.07)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9aa39c' }}>
                    {g.n} — {g.titulo}
                  </span>
                  <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: '#9dff3b' }}>
                    {g.resumo}
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', marginTop: '16px' }}>
                  {g.ops.map((o, i) => (
                    <Fragment key={i}>
                      <button type="button" onClick={o.pick} aria-pressed={o.on} style={{ height: '68px', boxSizing: 'border-box', padding: '10px 14px', borderRadius: '14px', border: `1px solid ${o.bd}`, background: o.bg, boxShadow: o.sh, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', textAlign: 'left', transition: 'background .18s ease' }}>
                        <span style={{ fontWeight: '700', fontSize: '15px', color: o.fg }}>
                          {o.curto}
                        </span>
                        <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: o.fg2 }}>
                          {o.sub}
                        </span>
                      </button>
                    </Fragment>
                  ))}
                </div>
              </div>
            </Fragment>
          ))}
          <div style={{ boxSizing: 'border-box', padding: '24px', borderRadius: '22px', border: '1px solid rgba(255,176,32,.35)', background: '#0a0d0f', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#ffb020' }}>
                Fontes nessa faixa · em curadoria
              </span>
              <p style={{ margin: '10px 0 0', fontSize: '15px', lineHeight: '23px', color: '#c9d0ca' }}>
                Só entra modelo com relatório de teste público, que dá para abrir e ler. Watt escrito na caixa é justamente o que a fonte genérica falsifica.
              </p>
            </div>
            <div>
              <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#9aa39c' }}>
                Contas vizinhas
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px', fontSize: '15px', fontWeight: '600' }}>
                <Link href="/ferramentas/conta-de-luz/">
                  Quanto esse PC gasta de luz
                </Link>
                <Link href="/ferramentas/gabinete/">
                  Essa placa cabe no gabinete
                </Link>
                <Link href="/montador/">
                  Conferir o PC inteiro no montador
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div aria-hidden="true" style={{ position: 'absolute', left: '-80px', top: '20px', width: '600px', height: '700px', background: 'radial-gradient(ellipse 46% 44% at 50% 50%, rgba(157,255,59,.45), rgba(157,255,59,0) 72%)', opacity: brilho, transition: 'opacity .6s ease' }}>
          </div>
          <div style={{ position: 'relative', zIndex: '3', width: '416px', height: '30px', boxSizing: 'border-box', padding: '0 14px', borderRadius: '15px', background: 'linear-gradient(180deg, #1c2226, #0d1013)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.09), 0 12px 30px rgba(0,0,0,.6)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'var(--fm)', fontSize: '9px', letterSpacing: '.14em', textTransform: 'uppercase' }}>
            <span style={{ color: '#8d958f' }}>
              Impressora de contas
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', color: ledCor }}>
              <i style={{ display: 'block', width: '7px', height: '7px', borderRadius: '50%', background: ledCor, boxShadow: `0 0 10px ${ledCor}`, animation: 'el-pulso 1.6s ease-in-out infinite' }}>
              </i>
              {ledTexto}
            </span>
          </div>
          <div aria-hidden="true" style={{ position: 'relative', zIndex: '3', width: '392px', height: '6px', marginTop: '-4px', borderRadius: '3px', background: '#020303' }}>
          </div>
          {impresso && (
            <>
              <div style={{ position: 'relative', zIndex: '2', marginTop: '-8px', transform: 'rotate(-1.4deg)', transformOrigin: '50% 0' }}>
                <div style={{ position: 'relative', width: '392px', background: '#f3f1ea', color: '#111311', fontFamily: 'var(--fm)', fontSize: '10.5px', lineHeight: '17px', boxShadow: '0 40px 70px rgba(0,0,0,.55), 0 2px 0 rgba(0,0,0,.25)', animation: 'el-imprime .6s cubic-bezier(.2,.7,.3,1) backwards' }}>
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
                        <span style={{ fontSize: '96px' }}>
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
          <div style={{ position: 'relative', alignSelf: 'stretch', display: 'flex', gap: '10px', marginTop: '44px' }}>
            <button type="button" onClick={mandar} style={{ flex: '1', height: '56px', border: '0', borderRadius: '28px', background: '#9dff3b', color: '#07110a', font: 'inherit', fontWeight: '700', fontSize: '16px' }}>
              {mandarTexto}
            </button>
          </div>
        </div>
      </div>
      <div style={{ flexGrow: '1', minHeight: '60px' }}>
      </div>
      <footer style={{ padding: '32px 64px', borderTop: '1px solid rgba(255,255,255,.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--fm)', fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: '#9aa39c' }}>
        <span>
          Dica sem caô
          <span style={{ color: '#9dff3b' }}>
            .
          </span>
          {' '}· © 2026 Elphy
        </span>
        <div style={{ display: 'flex', gap: '28px' }}>
          <Link href="/metodologia/" style={{ color: '#9aa39c' }}>
            Metodologia
          </Link>
          <Link href="/correcoes/" style={{ color: '#9aa39c' }}>
            Correções
          </Link>
          <Link href="/legal/" style={{ color: '#9aa39c' }}>
            Privacidade e afiliado
          </Link>
          <Link href="/sobre/" style={{ color: '#9aa39c' }}>
            Sobre
          </Link>
        </div>
      </footer>
    </div>
  );
}
