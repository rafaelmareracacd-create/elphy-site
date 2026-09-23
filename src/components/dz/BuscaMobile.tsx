"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import MenuBotao from "./Menu";
import { busca, SUGESTOES } from "@/lib/busca";

/* Transcrito de docs/design-1.0/Busca-Mobile.dc.html */
export default function BuscaMobile() {
  const [q, setQ] = useState("");
  useEffect(() => { setQ(new URLSearchParams(window.location.search).get("q") ?? ""); }, []);
  const muda = (v: string) => {
    setQ(v);
    const u = new URL(window.location.href);
    if (v) u.searchParams.set("q", v); else u.searchParams.delete("q");
    window.history.replaceState(null, "", u);
  };
  const r = busca(q);
  const vazio = !!r && r.total === 0;
  return (
    <div className="dz-col" style={{ position: 'relative', width: '100%', minHeight: '1880px', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#050607', color: '#eef2ee', fontFamily: 'var(--fb)' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px', boxSizing: 'border-box', padding: '0 24px', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
        <Link href="/" style={{ fontWeight: '800', fontSize: '24px', letterSpacing: '-.045em', textDecoration: 'none', color: '#eef2ee' }}>
          elphy
          <span style={{ color: '#9dff3b' }}>
            .
          </span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#c9d0ca' }}>
            Busca
          </span>
          <MenuBotao style={{ width: '44px', height: '44px', boxSizing: 'border-box', border: '1px solid rgba(255,255,255,.14)', borderRadius: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#eef2ee" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 8h16M4 16h16" />
            </svg>
          </MenuBotao>
        </div>
      </header>
      <div style={{ padding: '24px 24px 0' }}>
        <h1 style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)', margin: '0' }}>Busca</h1>
        <form role="search" action="/busca/" onSubmit={(e) => e.preventDefault()}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', height: '54px', boxSizing: 'border-box', padding: '0 18px', borderRadius: '27px', background: '#0d1013', border: `1px solid ${vazio ? 'rgba(255,176,32,.45)' : 'rgba(157,255,59,.45)'}` }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9aa39c" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-4-4" />
          </svg>
          <span style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden' }}>
            Buscar no Elphy
          </span>
          <input type="search" name="q" value={q} onChange={(e) => muda(e.target.value)} autoComplete="off" enterKeyHint="search" style={{ flex: '1', border: '0', background: 'transparent', color: '#eef2ee', font: 'inherit', fontSize: '17px', outline: 'none' }} />
        </label>
        </form>
        {r && !vazio && (
        <p style={{ margin: '14px 0 0', fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#9aa39c' }}>
          {`${r.total} ${r.total === 1 ? "resultado" : "resultados"} para "${q.trim()}"`}
        </p>
        )}
        {(!r || vazio) && (
          <>
            {vazio && (
              <h2 style={{ margin: '26px 0 0', fontSize: '26px', lineHeight: '31px', fontWeight: '800', letterSpacing: '-.02em' }}>
                {`Nenhuma conta com “${q.trim()}”.`}
              </h2>
            )}
            <p style={{ margin: '10px 0 0', fontSize: '16px', lineHeight: '25px', color: '#b9c1bb' }}>
              Tenta pelo nome da peça, do jeito que está na caixa:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '14px' }}>
              {SUGESTOES.map((t) => (
                <Link key={t} href={`/busca/?q=${encodeURIComponent(t)}`} onClick={(e) => { e.preventDefault(); muda(t); }} style={{ display: 'inline-flex', padding: '0 18px', alignItems: 'center', justifyContent: 'center', gap: '10px', height: '44px', boxSizing: 'border-box', borderRadius: '28px', textDecoration: 'none', fontFamily: 'var(--fb)', fontWeight: '700', fontSize: '14px', marginTop: '0px', background: 'transparent', color: '#eef2ee', border: '1px solid rgba(255,255,255,.16)' }}>
                  {t}
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
      {r?.conta && (
        <>
      <div style={{ padding: '28px 24px 0' }}>
        <span role="heading" aria-level={2} style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9dff3b' }}>
          Conta pronta
        </span>
      </div>
      <Link href={r.conta.href} style={{ display: 'block', margin: '12px 24px 0', boxSizing: 'border-box', padding: '20px', background: '#f3f1ea', color: '#111311', textDecoration: 'none', fontFamily: 'var(--fm)', fontSize: '11px', lineHeight: '18px', transform: 'rotate(-1deg)', boxShadow: '0 24px 50px rgba(0,0,0,.45)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--fb)', fontWeight: '800', fontSize: '19px', letterSpacing: '-.045em' }}>
            elphy.
          </span>
          <b>
            CONTA PRONTA
          </b>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '12px' }}>
          <span>
            {r.conta.gpu}
          </span>
          <span style={{ flex: '1', margin: '0 5px 4px', borderBottom: '1.5px dotted rgba(17,19,17,.45)' }}>
          </span>
          <b>
            {r.conta.gpuW}
          </b>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '4px' }}>
          <span>
            {r.conta.cpu}
          </span>
          <span style={{ flex: '1', margin: '0 5px 4px', borderBottom: '1.5px dotted rgba(17,19,17,.45)' }}>
          </span>
          <b>
            {r.conta.cpuW}
          </b>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '4px', fontWeight: '700' }}>
          <span>
            Total com folga
          </span>
          <span style={{ flex: '1', margin: '0 5px 4px', borderBottom: '1.5px dotted rgba(17,19,17,.45)' }}>
          </span>
          <b>
            {r.conta.total}
          </b>
        </div>
        <div style={{ marginTop: '10px', borderTop: '3px double #111311' }}>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '10px' }}>
          <span style={{ fontSize: '9.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#5b5f58' }}>
            Fonte recomendada
          </span>
          <span style={{ fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '56px', lineHeight: '.84' }}>
            {r.conta.rec}
          </span>
        </div>
        <div style={{ marginTop: '10px', fontFamily: 'var(--fb)', fontWeight: '700', fontSize: '14px', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
          Abrir e trocar as peças
        </div>
      </Link>
        </>
      )}
      {r && r.ferramentas.length > 0 && (
      <div style={{ padding: '36px 24px 0' }}>
        <span role="heading" aria-level={2} style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9aa39c' }}>
          Ferramentas
        </span>
        <div style={{ marginTop: '8px' }}>
          {r.ferramentas.map((x) => (
            <Link key={x.href} href={x.href} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', padding: '16px 0', borderTop: '1px solid rgba(255,255,255,.08)', textDecoration: 'none' }}>
              <span style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '17px', lineHeight: '23px', fontWeight: '700' }}>
                  {x.nome}
                </span>
              </span>
              <span style={{ fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '30px', color: '#9dff3b', whiteSpace: 'nowrap' }}>
                {x.sim}
              </span>
            </Link>
          ))}
        </div>
      </div>
      )}
      {r && r.pecas.length > 0 && (
      <div style={{ padding: '28px 24px 0' }}>
        <span role="heading" aria-level={2} style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9aa39c' }}>
          Peças
        </span>
        <div style={{ marginTop: '8px' }}>
          {r.pecas.map((x) => (
            <Link key={x.href} href={x.href} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', padding: '16px 0', borderTop: '1px solid rgba(255,255,255,.08)', textDecoration: 'none' }}>
              <span style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontFamily: 'var(--fm)', fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#9aa39c' }}>
                  {x.tipo}
                </span>
                <span style={{ fontSize: '17px', lineHeight: '23px', fontWeight: '700' }}>
                  {x.nome}
                </span>
              </span>
              <span style={{ fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '30px', color: '#9dff3b', whiteSpace: 'nowrap' }}>
                {x.v}
              </span>
            </Link>
          ))}
        </div>
      </div>
      )}
      {r && r.dicas.length > 0 && (
      <div style={{ padding: '28px 24px 0' }}>
        <span role="heading" aria-level={2} style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9aa39c' }}>
          Dicas
        </span>
        <div style={{ marginTop: '8px' }}>
          {r.dicas.map((x) => (
            <Link key={x.slug} href={x.href} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', padding: '16px 0', borderTop: '1px solid rgba(255,255,255,.08)', textDecoration: 'none' }}>
              <span style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '17px', lineHeight: '23px', fontWeight: '700' }}>
                  {x.t}
                </span>
              </span>
              <span style={{ fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '30px', color: x.cor, whiteSpace: 'nowrap' }}>
                {x.m}
              </span>
            </Link>
          ))}
        </div>
      </div>
      )}
      <Link href="/ferramentas/" style={{ display: 'inline-block', margin: '24px 24px 0', fontSize: '15px', fontWeight: '600', textUnderlineOffset: '5px' }}>
        Nada disso? Ver todas as ferramentas
      </Link>
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
