"use client";

import Link from "next/link";
import { Fragment, useState } from "react";
import { DEPS, DICAS } from "@/lib/dicas";
import MenuBotao from "./Menu";

/* Transcrito de docs/design-1.0/Dicas-Lista.dc.html */
export default function DicasLista() {
  const [dep, setDep] = useState("Todas");
  const dicas = DICAS.filter((d) => dep === "Todas" || d.dep === dep);
  const total = dicas.length + (dicas.length === 1 ? " dica" : " dicas");
  const deps = DEPS.map((n) => {
    const on = dep === n;
    return { nome: n, on, pick: () => setDep(n),
      bg: on ? "#9dff3b" : "#0d1013", bd: on ? "#9dff3b" : "rgba(255,255,255,.1)", fg: on ? "#07110a" : "#eef2ee" };
  });
  return (
    <div className="dz-col" style={{ position: 'relative', width: '100%', minHeight: '1760px', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#050607', color: '#eef2ee', fontFamily: 'var(--fb)' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px', boxSizing: 'border-box', padding: '0 24px', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
        <Link href="/" style={{ fontWeight: '800', fontSize: '24px', letterSpacing: '-.045em', textDecoration: 'none', color: '#eef2ee' }}>
          elphy
          <span style={{ color: '#9dff3b' }}>
            .
          </span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#c9d0ca' }}>
            Dicas
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
          Duas por semana
        </p>
        <h1 style={{ margin: '14px 0 0', fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '70px', lineHeight: '.86', textTransform: 'uppercase' }}>
          Dicas
          <br />
          sem caô
          <span style={{ color: '#9dff3b' }}>
            .
          </span>
        </h1>
        <p style={{ margin: '14px 0 0', fontSize: '16px', lineHeight: '24px', color: '#b9c1bb' }}>
          Cada dica termina numa conta que você refaz com as suas peças.
        </p>
      </div>
      <div className="dz-rolo" style={{ overflowX: 'auto', marginTop: '28px' }}>
        <div style={{ display: 'flex', gap: '8px', padding: '0 24px', width: 'max-content' }}>
          {deps.map((d, i) => (
            <Fragment key={i}>
              <button type="button" onClick={d.pick} aria-pressed={d.on} style={{ height: '44px', padding: '0 18px', borderRadius: '22px', border: `1px solid ${d.bd}`, background: d.bg, color: d.fg, font: 'inherit', fontSize: '14px', fontWeight: '700', whiteSpace: 'nowrap' }}>
                {d.nome}
              </button>
            </Fragment>
          ))}
        </div>
      </div>
      <div style={{ padding: '20px 24px 0', fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#9aa39c' }}>
        {total}
      </div>
      <div style={{ padding: '10px 24px 0', display: 'flex', flexDirection: 'column' }}>
        {dicas.map((d, i) => (
          <Fragment key={i}>
            <Link href={d.href} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', padding: '18px 0', borderTop: '1px solid rgba(255,255,255,.08)', textDecoration: 'none' }}>
              <span style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontFamily: 'var(--fm)', fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#9aa39c' }}>
                  {d.dep} · {d.ferr}
                </span>
                <span style={{ fontSize: '17px', lineHeight: '23px', fontWeight: '700' }}>
                  {d.t}
                </span>
              </span>
              <span style={{ fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '30px', color: d.cor, whiteSpace: 'nowrap' }}>
                {d.m}
              </span>
            </Link>
          </Fragment>
        ))}
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
