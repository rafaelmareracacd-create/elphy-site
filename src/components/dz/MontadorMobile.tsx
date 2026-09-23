"use client";

import { useMontador } from "./useMontador";
import Link from "next/link";
import { Fragment } from "react";
import MenuBotao from "./Menu";

/* Transcrito de docs/design-1.0/Montador-Mobile.dc.html */
export default function MontadorMobile() {
  const { slots, linhas, checks, impresso, veredito, placar, vereditoSub, ledCor, ledTexto, seloFundo, seloTopo, seloMeio, seloBase, linkMontagem, shopee } = useMontador();
    return (
    <div className="dz-col" style={{ position: 'relative', width: '100%', minHeight: '2380px', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#050607', color: '#eef2ee', fontFamily: 'var(--fb)' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px', boxSizing: 'border-box', padding: '0 24px', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
        <Link href="/" style={{ fontWeight: '800', fontSize: '24px', letterSpacing: '-.045em', textDecoration: 'none', color: '#eef2ee' }}>
          elphy
          <span style={{ color: '#9dff3b' }}>
            .
          </span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#c9d0ca' }}>
            PC
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
          Montador de PC
        </p>
        <h1 style={{ margin: '14px 0 0', fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '70px', lineHeight: '.86', textTransform: 'uppercase' }}>
          Monta.
          <br />
          A nota
          <br />
          confere
          <span style={{ color: '#9dff3b' }}>
            .
          </span>
        </h1>
        <p style={{ margin: '14px 0 0', fontSize: '16px', lineHeight: '24px', color: '#b9c1bb' }}>
          Escolhe peça por peça. Cada escolha passa por quatro conferências: soquete, memória, espaço no gabinete e fonte.
        </p>
      </div>
      <div style={{ margin: '24px 24px 0', boxSizing: 'border-box', padding: '14px 18px', borderRadius: '16px', border: '1px solid rgba(255,255,255,.08)', background: '#0a0d0f', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#9aa39c' }}>
          Conferências
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', color: ledCor }}>
          <i style={{ display: 'block', width: '8px', height: '8px', borderRadius: '50%', background: ledCor, boxShadow: `0 0 10px ${ledCor}`, animation: 'el-pulso 1.6s ease-in-out infinite' }}>
          </i>
          <b style={{ fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '30px', lineHeight: '1' }}>
            {placar}
          </b>
        </span>
      </div>
      {slots.map((s, i) => (
        <Fragment key={i}>
          <div>
            <div style={{ padding: '28px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9aa39c' }}>
                {s.n} — {s.titulo}
              </span>
              <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', color: s.avisoCor }}>
                {s.aviso}
              </span>
            </div>
            <div className="dz-rolo" style={{ overflowX: 'auto', marginTop: '12px' }}>
              <div style={{ display: 'flex', gap: '8px', padding: '0 24px', width: 'max-content' }}>
                {s.op.map((o, i) => (
                  <Fragment key={i}>
                    <button type="button" onClick={o.pick} aria-pressed={o.on} style={{ width: '150px', height: '64px', flexShrink: '0', boxSizing: 'border-box', padding: '10px 12px', borderRadius: '14px', border: `1px solid ${o.bd}`, background: o.bg, opacity: o.op, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', textAlign: 'left', transition: 'background .18s ease' }}>
                      <span style={{ fontWeight: '700', fontSize: '14px', lineHeight: '16px', color: o.fg }}>
                        {o.nome}
                      </span>
                      <span style={{ fontFamily: 'var(--fm)', fontSize: '10px', color: o.fg2 }}>
                        {o.sub}
                      </span>
                    </button>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </Fragment>
      ))}
      <div style={{ position: 'relative', marginTop: '40px', padding: '0 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
              <div style={{ position: 'relative', width: '318px', background: '#f3f1ea', color: '#111311', fontFamily: 'var(--fm)', fontSize: '10.5px', lineHeight: '17px', boxShadow: '0 40px 70px rgba(0,0,0,.55)', animation: 'el-imprime .6s cubic-bezier(.2,.7,.3,1) backwards' }}>
                <div aria-hidden="true" style={{ position: 'absolute', left: '0', right: '0', bottom: '-10px', height: '10px', background: 'linear-gradient(45deg, #f3f1ea 50%, rgba(243,241,234,0) 50%) 0 0 / 12px 10px repeat-x, linear-gradient(-45deg, #f3f1ea 50%, rgba(243,241,234,0) 50%) 0 0 / 12px 10px repeat-x', transform: 'scaleY(-1)' }}>
                </div>
                <div style={{ padding: '22px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontFamily: 'var(--fb)', fontWeight: '800', fontSize: '21px', letterSpacing: '-.045em' }}>
                      elphy.
                    </span>
                    <b>
                      MONTAGEM
                    </b>
                  </div>
                  <div style={{ marginTop: '4px', letterSpacing: '.08em', textTransform: 'uppercase' }}>
                    Cupom de medição · PC inteiro
                  </div>
                  <div style={{ margin: '12px 0', borderTop: '1.5px dashed rgba(17,19,17,.4)' }}>
                  </div>
                  {linhas.map((l, i) => (
                    <Fragment key={i}>
                      <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '3px' }}>
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
                  <div style={{ margin: '12px 0', borderTop: '1.5px dashed rgba(17,19,17,.4)' }}>
                  </div>
                  <div style={{ fontSize: '9px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#5b5f58' }}>
                    Conferências
                  </div>
                  {checks.map((c, i) => (
                    <Fragment key={i}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginTop: '4px' }}>
                        <span>
                          {c.nome}
                        </span>
                        <b style={{ color: c.cor, whiteSpace: 'nowrap' }}>
                          {c.res}
                        </b>
                      </div>
                    </Fragment>
                  ))}
                  <div style={{ marginTop: '14px' }}>
                  </div>
                  <div style={{ borderTop: '3px double #111311' }}>
                  </div>
                  <div style={{ padding: '12px 0 6px' }}>
                    <div style={{ fontSize: '9px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#5b5f58' }}>
                      {veredito}
                    </div>
                    <div style={{ marginTop: '4px', fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '64px', lineHeight: '.86' }}>
                      {placar}
                    </div>
                    <div style={{ marginTop: '8px', fontSize: '10px', lineHeight: '15px', color: '#5b5f58' }}>
                      {vereditoSub}
                    </div>
                  </div>
                  <div style={{ borderTop: '3px double #111311' }}>
                  </div>
                  <div style={{ marginTop: '10px', fontSize: '9.5px', color: '#5b5f58' , whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                    elphy.com.br{linkMontagem}
                  </div>
                  <div style={{ marginTop: '6px', fontSize: '9.5px', lineHeight: '14px', color: '#5b5f58' }}>
                    Estimativa pela fórmula da metodologia. Não garante compatibilidade.
                  </div>
                </div>
              </div>
              <div style={{ position: 'absolute', right: '-22px', top: '250px', width: '120px', height: '120px', borderRadius: '50%', background: seloFundo, color: '#07110a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', outline: '1.5px dashed rgba(7,17,10,.35)', outlineOffset: '-9px', boxShadow: '0 16px 36px rgba(0,0,0,.45)', transform: 'rotate(12deg)', animation: 'el-carimba .44s cubic-bezier(.2,1.3,.4,1) both', animationDelay: '700ms' }}>
                <span style={{ fontFamily: 'var(--fm)', fontSize: '8.5px', letterSpacing: '.16em', textTransform: 'uppercase' }}>
                  {seloTopo}
                </span>
                <span style={{ fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '44px', lineHeight: '.9' }}>
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
        <Link href={linkMontagem} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', height: '56px', boxSizing: 'border-box', borderRadius: '28px', textDecoration: 'none', fontFamily: 'var(--fb)', fontWeight: '700', fontSize: '16px', marginTop: '0px', background: '#9dff3b', color: '#07110a', border: '0', boxShadow: '0 14px 40px rgba(157,255,59,.25)' }}>
          Mandar a montagem{' '}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
        {shopee ? (
        <a href={shopee} target="_blank" rel="sponsored noopener noreferrer" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', height: '56px', boxSizing: 'border-box', borderRadius: '28px', textDecoration: 'none', fontFamily: 'var(--fb)', fontWeight: '700', fontSize: '16px', marginTop: '0px', background: 'transparent', color: '#eef2ee', border: '1px solid rgba(255,255,255,.16)' }}>
          Ver as peças na Shopee
        </a>
        ) : (
        <span aria-disabled="true" style={{ opacity: .45, cursor: "default", width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', height: '56px', boxSizing: 'border-box', borderRadius: '28px', textDecoration: 'none', fontFamily: 'var(--fb)', fontWeight: '700', fontSize: '16px', marginTop: '0px', background: 'transparent', color: '#eef2ee', border: '1px solid rgba(255,255,255,.16)' }}>
          Links da Shopee em breve
        </span>
        )}
        <p style={{ margin: '4px 0 0', fontSize: '13px', lineHeight: '19px', color: '#9aa39c' }}>
          Link de afiliado: se você comprar, o Elphy pode ganhar comissão. O preço não muda, e quem mostra o preço é a Shopee.
        </p>
      </div>
      <p style={{ margin: '16px 24px 0', fontFamily: 'var(--fm)', fontSize: '10.5px', lineHeight: '17px', color: '#ffb020' }}>
        Catálogo de exemplo. Medidas e watts ainda não conferidos na ficha do fabricante.
      </p>
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
