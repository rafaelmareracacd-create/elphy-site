"use client";

import Link from "next/link";
import { useState } from "react";

/** departamento de cada ferramenta, para o filtro */
const DEP: Record<string, string> = {
  "/ferramentas/fonte/": "PC", "/ferramentas/power-bank/": "Celular", "/ferramentas/ssd/": "Tela e armazenamento",
  "/ferramentas/conta-de-luz/": "Casa", "/ferramentas/monitor/": "Tela e armazenamento", "/ferramentas/gabinete/": "PC",
  "/ferramentas/memoria/": "PC", "/montador/": "PC",
};
/* Transcrito de docs/design-1.0/Ferramentas-Desktop.dc.html */
export default function FerramentasDesktop() {
  const [dep, setDep] = useState("Todas");
  const mostra = (href: string) => dep === "Todas" || DEP[href] === dep;
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
      <div style={{ padding: '64px 64px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <p style={{ margin: '0', fontFamily: 'var(--fm)', fontSize: '12px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9dff3b' }}>
            Ferramentas
          </p>
          <h1 style={{ margin: '14px 0 0', fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '128px', lineHeight: '.84', textTransform: 'uppercase' }}>
            Nove contas
            <span style={{ color: '#9dff3b' }}>
              .
            </span>
            <br />
            Nenhuma loja faz
            <span style={{ color: '#9dff3b' }}>
              .
            </span>
          </h1>
        </div>
        <p style={{ margin: '0 0 8px', width: '380px', fontSize: '18px', lineHeight: '28px', color: '#b9c1bb' }}>
          Cada ferramenta termina numa nota: as linhas, a soma e o resultado carimbado. A fórmula de todas está na metodologia.
        </p>
      </div>
      <div style={{ display: 'flex', gap: '8px', padding: '40px 64px 0' }}>
        <button type="button" aria-pressed={dep === "Todas"} onClick={() => setDep("Todas")} style={{ height: '44px', padding: '0 20px', borderRadius: '22px', border: dep === "Todas" ? '1px solid #9dff3b' : '1px solid rgba(255,255,255,.1)', background: dep === "Todas" ? '#9dff3b' : '#0d1013', color: dep === "Todas" ? '#07110a' : '#eef2ee', font: 'inherit', fontSize: '14px', fontWeight: '700'}}>
          Todas
        </button>
        <button type="button" aria-pressed={dep === "PC"} onClick={() => setDep("PC")} style={{ height: '44px', padding: '0 20px', borderRadius: '22px', border: dep === "PC" ? '1px solid #9dff3b' : '1px solid rgba(255,255,255,.1)', background: dep === "PC" ? '#9dff3b' : '#0d1013', color: dep === "PC" ? '#07110a' : '#eef2ee', font: 'inherit', fontSize: '14px', fontWeight: '700'}}>
          PC
        </button>
        <button type="button" aria-pressed={dep === "Celular"} onClick={() => setDep("Celular")} style={{ height: '44px', padding: '0 20px', borderRadius: '22px', border: dep === "Celular" ? '1px solid #9dff3b' : '1px solid rgba(255,255,255,.1)', background: dep === "Celular" ? '#9dff3b' : '#0d1013', color: dep === "Celular" ? '#07110a' : '#eef2ee', font: 'inherit', fontSize: '14px', fontWeight: '700'}}>
          Celular
        </button>
        <button type="button" aria-pressed={dep === "Tela e armazenamento"} onClick={() => setDep("Tela e armazenamento")} style={{ height: '44px', padding: '0 20px', borderRadius: '22px', border: dep === "Tela e armazenamento" ? '1px solid #9dff3b' : '1px solid rgba(255,255,255,.1)', background: dep === "Tela e armazenamento" ? '#9dff3b' : '#0d1013', color: dep === "Tela e armazenamento" ? '#07110a' : '#eef2ee', font: 'inherit', fontSize: '14px', fontWeight: '700'}}>
          Tela e armazenamento
        </button>
        <button type="button" aria-pressed={dep === "Casa"} onClick={() => setDep("Casa")} style={{ height: '44px', padding: '0 20px', borderRadius: '22px', border: dep === "Casa" ? '1px solid #9dff3b' : '1px solid rgba(255,255,255,.1)', background: dep === "Casa" ? '#9dff3b' : '#0d1013', color: dep === "Casa" ? '#07110a' : '#eef2ee', font: 'inherit', fontSize: '14px', fontWeight: '700'}}>
          Casa
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', padding: '24px 64px 0' }}>
        {mostra("/ferramentas/fonte/") && (
        <Link href="/ferramentas/fonte/" style={{ position: 'relative', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', height: '270px', padding: '26px', borderRadius: '24px', background: '#0a0d0f', border: '1px solid rgba(255,255,255,.07)', textDecoration: 'none', overflow: 'hidden' }}>
          <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9aa39c' }}>
            Nº 01 · PC
          </span>
          <span style={{ marginTop: '12px', fontSize: '28px', lineHeight: '32px', fontWeight: '800', letterSpacing: '-.02em', color: '#eef2ee' }}>
            Calculadora de fonte
          </span>
          <span style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '4px', fontFamily: 'var(--fm)', fontSize: '12px', lineHeight: '18px' }}>
            <span style={{ color: '#9aa39c' }}>
              A caixa diz · RTX 5070: 250 W
            </span>
            <span style={{ color: '#eef2ee' }}>
              A nota mostra · Fonte de 550 W
            </span>
          </span>
          <span style={{ position: 'absolute', right: '24px', top: '22px', fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '58px', lineHeight: '.9', color: '#9dff3b' }}>
            550 W
          </span>
        </Link>
        )}
        {mostra("/ferramentas/power-bank/") && (
        <Link href="/ferramentas/power-bank/" style={{ position: 'relative', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', height: '270px', padding: '26px', borderRadius: '24px', background: '#0a0d0f', border: '1px solid rgba(255,255,255,.07)', textDecoration: 'none', overflow: 'hidden' }}>
          <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9aa39c' }}>
            Nº 02 · Celular
          </span>
          <span style={{ marginTop: '12px', fontSize: '28px', lineHeight: '32px', fontWeight: '800', letterSpacing: '-.02em', color: '#eef2ee' }}>
            Power bank de verdade
          </span>
          <span style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '4px', fontFamily: 'var(--fm)', fontSize: '12px', lineHeight: '18px' }}>
            <span style={{ color: '#9aa39c' }}>
              A caixa diz · 20.000 mAh
            </span>
            <span style={{ color: '#eef2ee' }}>
              A nota mostra · 2,5 cargas, não 4
            </span>
          </span>
          <span style={{ position: 'absolute', right: '24px', top: '22px', fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '58px', lineHeight: '.9', color: '#9dff3b' }}>
            2,5
          </span>
        </Link>
        )}
        {mostra("/ferramentas/ssd/") && (
        <Link href="/ferramentas/ssd/" style={{ position: 'relative', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', height: '270px', padding: '26px', borderRadius: '24px', background: '#0a0d0f', border: '1px solid rgba(255,255,255,.07)', textDecoration: 'none', overflow: 'hidden' }}>
          <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9aa39c' }}>
            Nº 03 · Armazenamento
          </span>
          <span style={{ marginTop: '12px', fontSize: '28px', lineHeight: '32px', fontWeight: '800', letterSpacing: '-.02em', color: '#eef2ee' }}>
            Espaço real do SSD
          </span>
          <span style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '4px', fontFamily: 'var(--fm)', fontSize: '12px', lineHeight: '18px' }}>
            <span style={{ color: '#9aa39c' }}>
              A caixa diz · 1 TB
            </span>
            <span style={{ color: '#eef2ee' }}>
              A nota mostra · 931 GB no Windows
            </span>
          </span>
          <span style={{ position: 'absolute', right: '24px', top: '22px', fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '58px', lineHeight: '.9', color: '#9dff3b' }}>
            931
          </span>
        </Link>
        )}
        {mostra("/ferramentas/conta-de-luz/") && (
        <Link href="/ferramentas/conta-de-luz/" style={{ position: 'relative', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', height: '270px', padding: '26px', borderRadius: '24px', background: '#0a0d0f', border: '1px solid rgba(255,255,255,.07)', textDecoration: 'none', overflow: 'hidden' }}>
          <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9aa39c' }}>
            Nº 04 · Casa
          </span>
          <span style={{ marginTop: '12px', fontSize: '28px', lineHeight: '32px', fontWeight: '800', letterSpacing: '-.02em', color: '#eef2ee' }}>
            Conta de luz do PC
          </span>
          <span style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '4px', fontFamily: 'var(--fm)', fontSize: '12px', lineHeight: '18px' }}>
            <span style={{ color: '#9aa39c' }}>
              A caixa diz · 450 W, 4 h por dia
            </span>
            <span style={{ color: '#eef2ee' }}>
              A nota mostra · 54 kWh por mês
            </span>
          </span>
          <span style={{ position: 'absolute', right: '24px', top: '22px', fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '58px', lineHeight: '.9', color: '#9dff3b' }}>
            54 kWh
          </span>
        </Link>
        )}
        {mostra("/ferramentas/monitor/") && (
        <Link href="/ferramentas/monitor/" style={{ position: 'relative', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', height: '270px', padding: '26px', borderRadius: '24px', background: '#0a0d0f', border: '1px solid rgba(255,255,255,.07)', textDecoration: 'none', overflow: 'hidden' }}>
          <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9aa39c' }}>
            Nº 05 · Tela
          </span>
          <span style={{ marginTop: '12px', fontSize: '28px', lineHeight: '32px', fontWeight: '800', letterSpacing: '-.02em', color: '#eef2ee' }}>
            Nitidez do monitor
          </span>
          <span style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '4px', fontFamily: 'var(--fm)', fontSize: '12px', lineHeight: '18px' }}>
            <span style={{ color: '#9aa39c' }}>
              A caixa diz · 27&quot; QHD
            </span>
            <span style={{ color: '#eef2ee' }}>
              A nota mostra · 109 PPI, pixel some a 80 cm
            </span>
          </span>
          <span style={{ position: 'absolute', right: '24px', top: '22px', fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '58px', lineHeight: '.9', color: '#9dff3b' }}>
            109
          </span>
        </Link>
        )}
        {mostra("/ferramentas/gabinete/") && (
        <Link href="/ferramentas/gabinete/" style={{ position: 'relative', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', height: '270px', padding: '26px', borderRadius: '24px', background: '#0a0d0f', border: '1px solid rgba(255,255,255,.07)', textDecoration: 'none', overflow: 'hidden' }}>
          <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9aa39c' }}>
            Nº 06 · PC
          </span>
          <span style={{ marginTop: '12px', fontSize: '28px', lineHeight: '32px', fontWeight: '800', letterSpacing: '-.02em', color: '#eef2ee' }}>
            Cabe no gabinete
          </span>
          <span style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '4px', fontFamily: 'var(--fm)', fontSize: '12px', lineHeight: '18px' }}>
            <span style={{ color: '#9aa39c' }}>
              A caixa diz · Placa de 300 mm
            </span>
            <span style={{ color: '#eef2ee' }}>
              A nota mostra · A menor sobra: 5 mm
            </span>
          </span>
          <span style={{ position: 'absolute', right: '24px', top: '22px', fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '58px', lineHeight: '.9', color: '#9dff3b' }}>
            +5
          </span>
        </Link>
        )}
        {mostra("/ferramentas/memoria/") && (
        <Link href="/ferramentas/memoria/" style={{ position: 'relative', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', height: '270px', padding: '26px', borderRadius: '24px', background: '#0a0d0f', border: '1px solid rgba(255,255,255,.07)', textDecoration: 'none', overflow: 'hidden' }}>
          <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9aa39c' }}>
            Nº 07 · PC
          </span>
          <span style={{ marginTop: '12px', fontSize: '28px', lineHeight: '32px', fontWeight: '800', letterSpacing: '-.02em', color: '#eef2ee' }}>
            Memória certa
          </span>
          <span style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '4px', fontFamily: 'var(--fm)', fontSize: '12px', lineHeight: '18px' }}>
            <span style={{ color: '#9aa39c' }}>
              A caixa diz · Ryzen 7000
            </span>
            <span style={{ color: '#eef2ee' }}>
              A nota mostra · DDR5 até 5.200 MT/s
            </span>
          </span>
          <span style={{ position: 'absolute', right: '24px', top: '22px', fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '58px', lineHeight: '.9', color: '#9dff3b' }}>
            DDR5
          </span>
        </Link>
        )}
        {mostra("/montador/") && (
        <Link href="/montador/" style={{ position: 'relative', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', height: '270px', padding: '26px', borderRadius: '24px', background: '#0a0d0f', border: '1px solid rgba(255,255,255,.07)', textDecoration: 'none', overflow: 'hidden' }}>
          <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9aa39c' }}>
            Nº 08 · PC
          </span>
          <span style={{ marginTop: '12px', fontSize: '28px', lineHeight: '32px', fontWeight: '800', letterSpacing: '-.02em', color: '#eef2ee' }}>
            Montador de PC
          </span>
          <span style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '4px', fontFamily: 'var(--fm)', fontSize: '12px', lineHeight: '18px' }}>
            <span style={{ color: '#9aa39c' }}>
              A caixa diz · 6 peças
            </span>
            <span style={{ color: '#eef2ee' }}>
              A nota mostra · 4 conferências na mesma nota
            </span>
          </span>
          <span style={{ position: 'absolute', right: '24px', top: '22px', fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '58px', lineHeight: '.9', color: '#9dff3b' }}>
            4/4
          </span>
        </Link>
        )}
        <div style={{ opacity: '.45', position: 'relative', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', height: '270px', padding: '26px', borderRadius: '24px', background: '#0a0d0f', border: '1px solid rgba(255,255,255,.07)', textDecoration: 'none', overflow: 'hidden' }}>
          <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9aa39c' }}>
            Nº 09 · Celular · em breve
          </span>
          <span style={{ marginTop: '12px', fontSize: '28px', lineHeight: '32px', fontWeight: '800', letterSpacing: '-.02em', color: '#eef2ee' }}>
            Comparar celulares
          </span>
          <span style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '4px', fontFamily: 'var(--fm)', fontSize: '12px', lineHeight: '18px' }}>
            <span style={{ color: '#9aa39c' }}>
              A caixa diz · 2 fichas técnicas
            </span>
            <span style={{ color: '#eef2ee' }}>
              A nota mostra · Linha por linha, só número
            </span>
          </span>
          <span style={{ position: 'absolute', right: '24px', top: '22px', fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '58px', lineHeight: '.9', color: '#9dff3b' }}>
            A×B
          </span>
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
