"use client";

import { useEffect, useRef, useState } from "react";
import { useMontador } from "./useMontador";
import Link from "next/link";
import { Fragment } from "react";

/* Transcrito de docs/design-1.0/Montador.dc.html */
export default function MontadorDesktop() {
  const { slots, linhas, checks, impresso, veredito, placar, vereditoSub, ledCor, ledTexto, seloFundo, seloTopo, seloMeio, seloBase, linkMontagem, shopee } = useMontador();
  const [copiado, setCopiado] = useState(false);
  const to = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(to.current), []);
  const copiar = async () => {
    try { await navigator.clipboard.writeText(new URL(linkMontagem, window.location.origin).toString()); } catch { return; /* sem permissão: o botão não diz que copiou */ }
    setCopiado(true);
    clearTimeout(to.current);
    to.current = setTimeout(() => setCopiado(false), 1800);
  };
  return (
    <div style={{ position: 'relative', width: '1440px', minHeight: '1720px', overflow: 'hidden', background: '#050607', color: '#eef2ee', fontFamily: 'var(--fb)' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px', boxSizing: 'border-box', padding: '0 64px', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
        <Link href="/" style={{ fontWeight: '800', fontSize: '28px', letterSpacing: '-.045em', textDecoration: 'none', color: '#eef2ee' }}>
          elphy
          <span style={{ color: '#9dff3b' }}>
            .
          </span>
        </Link>
        <nav aria-label="Departamentos" style={{ display: 'flex', gap: '32px', fontSize: '15px', fontWeight: '600' }}>
          <Link href="/montador/" style={{ color: '#9dff3b', textDecoration: 'none' }}>
            PC
          </Link>
          <Link href="/ferramentas/power-bank/" style={{ color: '#c9d0ca', textDecoration: 'none' }}>
            Celular
          </Link>
          <Link href="/dicas/" style={{ color: '#c9d0ca', textDecoration: 'none' }}>
            Estudo
          </Link>
          <Link href="/ferramentas/conta-de-luz/" style={{ color: '#c9d0ca', textDecoration: 'none' }}>
            Casa
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
      <div style={{ padding: '48px 64px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <p style={{ margin: '0', fontFamily: 'var(--fm)', fontSize: '12px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9dff3b' }}>
            Montador de PC
          </p>
          <h1 style={{ margin: '14px 0 0', fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '120px', lineHeight: '.84', textTransform: 'uppercase' }}>
            Monta.
            <br />
            A nota confere
            <span style={{ color: '#9dff3b' }}>
              .
            </span>
          </h1>
        </div>
        <p style={{ margin: '0 0 8px', width: '380px', fontSize: '18px', lineHeight: '28px', color: '#b9c1bb' }}>
          Escolhe peça por peça. Cada escolha passa por quatro conferências: soquete, memória, espaço no gabinete e fonte.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '56px', padding: '48px 64px 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {slots.map((s, i) => (
            <Fragment key={i}>
              <div style={{ boxSizing: 'border-box', padding: '20px 22px', borderRadius: '20px', background: '#0a0d0f', border: `1px solid ${s.bd}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9aa39c' }}>
                    {s.n} — {s.titulo}
                  </span>
                  <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: s.avisoCor }}>
                    {s.aviso}
                  </span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '14px' }}>
                  {s.op.map((o, i) => (
                    <Fragment key={i}>
                      <button type="button" onClick={o.pick} aria-pressed={o.on} style={{ minWidth: '150px', height: '60px', boxSizing: 'border-box', padding: '9px 14px', borderRadius: '14px', border: `1px solid ${o.bd}`, background: o.bg, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', textAlign: 'left', opacity: o.op, transition: 'background .18s ease' }}>
                        <span style={{ fontWeight: '700', fontSize: '14px', color: o.fg }}>
                          {o.nome}
                        </span>
                        <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', color: o.fg2 }}>
                          {o.sub}
                        </span>
                      </button>
                    </Fragment>
                  ))}
                </div>
              </div>
            </Fragment>
          ))}
        </div>
        <div style={{ position: 'relative' }}>
          <div style={{ height: '30px', boxSizing: 'border-box', padding: '0 14px', borderRadius: '15px', background: 'linear-gradient(180deg, #1c2226, #0d1013)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'var(--fm)', fontSize: '9px', letterSpacing: '.14em', textTransform: 'uppercase' }}>
            <span style={{ color: '#8d958f' }}>
              Impressora de contas
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', color: ledCor }}>
              <i style={{ display: 'block', width: '7px', height: '7px', borderRadius: '50%', background: ledCor, animation: 'el-pulso 1.6s ease-in-out infinite' }}>
              </i>
              {ledTexto}
            </span>
          </div>
          {impresso && (
            <>
              <div style={{ position: 'relative', margin: '-4px 12px 0', transform: 'rotate(-1deg)', transformOrigin: '50% 0' }}>
                <div style={{ position: 'relative', background: '#f3f1ea', color: '#111311', fontFamily: 'var(--fm)', fontSize: '11px', lineHeight: '18px', boxShadow: '0 40px 70px rgba(0,0,0,.55)', animation: 'el-imprime .6s cubic-bezier(.2,.7,.3,1) backwards' }}>
                  <div aria-hidden="true" style={{ position: 'absolute', left: '0', right: '0', bottom: '-10px', height: '10px', background: 'linear-gradient(45deg, #f3f1ea 50%, rgba(243,241,234,0) 50%) 0 0 / 12px 10px repeat-x, linear-gradient(-45deg, #f3f1ea 50%, rgba(243,241,234,0) 50%) 0 0 / 12px 10px repeat-x', transform: 'scaleY(-1)' }}>
                  </div>
                  <div style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span style={{ fontFamily: 'var(--fb)', fontWeight: '800', fontSize: '22px', letterSpacing: '-.045em' }}>
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
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                          <span>
                            {c.nome}
                          </span>
                          <b style={{ color: c.cor }}>
                            {c.res}
                          </b>
                        </div>
                      </Fragment>
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
                      <div style={{ marginTop: '8px', fontSize: '10px', color: '#5b5f58' }}>
                        {vereditoSub}
                      </div>
                    </div>
                    <div style={{ borderTop: '3px double #111311' }}>
                    </div>
                    <div style={{ marginTop: '10px', fontSize: '9.5px', color: '#5b5f58' , whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                      Link desta montagem: elphy.com.br{linkMontagem}
                    </div>
                    <div style={{ marginTop: '6px', fontSize: '10px', lineHeight: '14px', color: '#5b5f58' }}>
                      Estimativa pela fórmula da metodologia. Não garante compatibilidade.
                    </div>
                  </div>
                </div>
                <div style={{ position: 'absolute', right: '-26px', top: '200px', width: '124px', height: '124px', borderRadius: '50%', background: seloFundo, color: '#07110a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', outline: '1.5px dashed rgba(7,17,10,.35)', outlineOffset: '-9px', boxShadow: '0 16px 36px rgba(0,0,0,.45)', transform: 'rotate(12deg)', animation: 'el-carimba .44s cubic-bezier(.2,1.3,.4,1) both', animationDelay: '700ms' }}>
                  <span style={{ fontFamily: 'var(--fm)', fontSize: '8.5px', letterSpacing: '.16em', textTransform: 'uppercase' }}>
                    {seloTopo}
                  </span>
                  <span style={{ fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '44px', lineHeight: '.9' }}>
                    {seloMeio}
                  </span>
                  <span style={{ fontFamily: 'var(--fm)', fontSize: '8.5px', letterSpacing: '.16em', textTransform: 'uppercase' }}>
                    {seloBase}
                  </span>
                </div>
              </div>
            </>
          )}
          <div style={{ display: 'flex', gap: '10px', margin: '36px 12px 0' }}>
            <button type="button" onClick={copiar} style={{ flex: '1', height: '54px', border: '0', borderRadius: '27px', background: '#9dff3b', color: '#07110a', font: 'inherit', fontWeight: '700', fontSize: '16px' }}>
              {copiado ? "Link copiado" : "Copiar link da montagem"}
            </button>
            {shopee ? (
            <a href={shopee} target="_blank" rel="sponsored noopener noreferrer" style={{ display: 'flex', alignItems: 'center', padding: '0 20px', height: '54px', boxSizing: 'border-box', borderRadius: '27px', border: '1px solid rgba(255,255,255,.16)', textDecoration: 'none', fontWeight: '600' }}>
              Ver peças na Shopee
            </a>
            ) : (
            <span aria-disabled="true" style={{ opacity: .45, cursor: "default", display: 'flex', alignItems: 'center', padding: '0 20px', height: '54px', boxSizing: 'border-box', borderRadius: '27px', border: '1px solid rgba(255,255,255,.16)', textDecoration: 'none', fontWeight: '600' }}>
              Links da Shopee em breve
            </span>
            )}
          </div>
          <p style={{ margin: '14px 12px 0', fontSize: '13px', lineHeight: '19px', color: '#9aa39c' }}>
            Link de afiliado: se você comprar, o Elphy pode ganhar comissão. O preço não muda, e quem mostra o preço é a Shopee.
          </p>
          <p style={{ margin: '10px 12px 0', fontFamily: 'var(--fm)', fontSize: '10.5px', lineHeight: '17px', color: '#9aa39c' }}>
            Catálogo de exemplo. Medidas e watts ainda não conferidos na ficha do fabricante.
          </p>
        </div>
      </div>
    </div>
  );
}
