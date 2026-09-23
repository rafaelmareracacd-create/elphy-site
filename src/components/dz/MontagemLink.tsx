"use client";

import { DATA_CATALOGO } from "@/lib/catalogo";
import { useMontador } from "./useMontador";
import Link from "next/link";
import MenuBotao from "./Menu";

/* Transcrito de docs/design-1.0/Montagem-Link-Mobile.dc.html */
export default function MontagemLink() {
  const { linhas, checks, veredito, placar, vereditoSub, seloFundo, seloTopo, seloMeio, seloBase, linkMontagem, lido } = useMontador();
  const mexer = linkMontagem.replace("/montador/link/", "/montador/");
  const linkCurto = `elphy.com.br${linkMontagem}`;
  // até ler a URL a montagem é a padrão; a página só aparece com a montagem do link
  return (
    <div className="dz-col" style={{ opacity: lido ? 1 : 0, position: 'relative', width: '100%', minHeight: '1760px', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#050607', color: '#eef2ee', fontFamily: 'var(--fb)' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px', boxSizing: 'border-box', padding: '0 24px', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
        <Link href="/" style={{ fontWeight: '800', fontSize: '24px', letterSpacing: '-.045em', textDecoration: 'none', color: '#eef2ee' }}>
          elphy
          <span style={{ color: '#9dff3b' }}>
            .
          </span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#c9d0ca' }}>
            Montagem
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
          Montagem compartilhada
        </p>
        <h1 style={{ margin: '14px 0 0', fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '66px', lineHeight: '.86', textTransform: 'uppercase' }}>
          Te mandaram
          <br />
          uma
          <br />
          montagem
          <span style={{ color: '#9dff3b' }}>
            .
          </span>
        </h1>
        <p style={{ margin: '14px 0 0', fontSize: '16px', lineHeight: '24px', color: '#b9c1bb' }}>
          Conferida com o catálogo {DATA_CATALOGO ? `de ${DATA_CATALOGO}` : "de exemplo, ainda não conferido"}. Dá para mexer em qualquer peça e a nota refaz a conta.
        </p>
      </div>
      <div style={{ position: 'relative', margin: '36px 36px 0', transform: 'rotate(-1.2deg)' }}>
        <div style={{ position: 'relative', boxSizing: 'border-box', padding: '22px', background: '#f3f1ea', color: '#111311', fontFamily: 'var(--fm)', fontSize: '10.5px', lineHeight: '17px', boxShadow: '0 40px 70px rgba(0,0,0,.55)' }}>
          <div aria-hidden="true" style={{ position: 'absolute', left: '0', right: '0', bottom: '-10px', height: '10px', background: 'linear-gradient(45deg, #f3f1ea 50%, rgba(243,241,234,0) 50%) 0 0 / 12px 10px repeat-x, linear-gradient(-45deg, #f3f1ea 50%, rgba(243,241,234,0) 50%) 0 0 / 12px 10px repeat-x', transform: 'scaleY(-1)' }}>
          </div>
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
            <div key={i} style={{ display: 'flex', alignItems: 'baseline', marginTop: i ? '3px' : '0px' }}>
              <span>
                {l.nome}
              </span>
              <span style={{ flex: '1', margin: '0 5px 4px', borderBottom: '1.5px dotted rgba(17,19,17,.45)' }}>
              </span>
              <b>
                {l.v}
              </b>
            </div>
          ))}
          <div style={{ margin: '12px 0', borderTop: '1.5px dashed rgba(17,19,17,.4)' }}>
          </div>
          <div style={{ fontSize: '9px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#5b5f58' }}>
            Conferências
          </div>
          {checks.map((c, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
              <span>
                {c.nome}
              </span>
              <b style={{ color: c.cor }}>
                {c.res}
              </b>
            </div>
          ))}
          <div style={{ marginTop: '14px', borderTop: '3px double #111311' }}>
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
          <div style={{ marginTop: '10px', fontSize: '9.5px', color: '#5b5f58', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {linkCurto}
          </div>
          <div style={{ marginTop: '6px', fontSize: '9.5px', lineHeight: '14px', color: '#5b5f58' }}>
            Estimativa pela fórmula da metodologia. Não garante compatibilidade.
          </div>
        </div>
        <div style={{ position: 'absolute', right: '-30px', top: '230px', width: '120px', height: '120px', borderRadius: '50%', background: seloFundo, color: '#07110a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', outline: '1.5px dashed rgba(7,17,10,.35)', outlineOffset: '-9px', boxShadow: '0 16px 36px rgba(0,0,0,.45)', transform: 'rotate(12deg)', animation: 'el-carimba .44s cubic-bezier(.2,1.3,.4,1) both', animationDelay: '500ms' }}>
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
      <div style={{ padding: '44px 24px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Link href={mexer} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', height: '56px', boxSizing: 'border-box', borderRadius: '28px', textDecoration: 'none', fontFamily: 'var(--fb)', fontWeight: '700', fontSize: '16px', marginTop: '0px', background: '#9dff3b', color: '#07110a', border: '0', boxShadow: '0 14px 40px rgba(157,255,59,.25)' }}>
          Mexer nesta montagem{' '}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
        <Link href="/montador/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', height: '56px', boxSizing: 'border-box', borderRadius: '28px', textDecoration: 'none', fontFamily: 'var(--fb)', fontWeight: '700', fontSize: '16px', marginTop: '0px', background: 'transparent', color: '#eef2ee', border: '1px solid rgba(255,255,255,.16)' }}>
          Montar a minha do zero
        </Link>
      </div>
      <div style={{ margin: '28px 24px 0', boxSizing: 'border-box', padding: '20px', borderRadius: '20px', border: '1px solid rgba(255,176,32,.35)', background: '#0a0d0f' }}>
        <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#ffb020' }}>
          A nota tem data
        </span>
        <p style={{ margin: '10px 0 0', fontSize: '15px', lineHeight: '23px', color: '#c9d0ca' }}>
          Quando o catálogo é conferido de novo, algum número pode mudar. A data no alto diz de quando é esta conta.
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
