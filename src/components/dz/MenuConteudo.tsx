import Link from "next/link";
import { TIKTOK } from "@/lib/site";

/* Transcrito de docs/design-1.0/Menu-Mobile.dc.html */
/** Com onFechar é o menu por cima da página; sem, é a página /ferramentas/ no celular (o X volta ao início). */
export default function MenuConteudo({ onFechar }: { onFechar?: () => void }) {
  return (
    <div className="dz-col" style={{ position: 'relative', width: '100%', maxWidth: '560px', margin: '0 auto', minHeight: '100dvh', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#050607', color: '#eef2ee', fontFamily: 'var(--fb)' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px', boxSizing: 'border-box', padding: '0 24px', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
        <Link href="/" style={{ fontWeight: '800', fontSize: '24px', letterSpacing: '-.045em', textDecoration: 'none', color: '#eef2ee' }}>
          elphy
          <span style={{ color: '#9dff3b' }}>
            .
          </span>
        </Link>
        {onFechar ? (
<button type="button" onClick={onFechar} aria-label="Fechar menu" style={{ width: '44px', height: '44px', padding: '0', border: '0', borderRadius: '22px', background: '#9dff3b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#07110a" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
) : (
<Link href="/" aria-label="Voltar ao início" style={{ width: '44px', height: '44px', borderRadius: '22px', background: '#9dff3b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#07110a" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </Link>
)}
      </header>
      {/* como página (/ferramentas/ no celular) o menu precisa de um título; como menu por cima, não */}
      {!onFechar && <h1 style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)', margin: '0' }}>Ferramentas</h1>}
      <div style={{ padding: '20px 24px 0' }}>
        <form action="/busca/" role="search">
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', height: '52px', boxSizing: 'border-box', padding: '0 18px', borderRadius: '26px', background: '#0d1013', border: '1px solid rgba(255,255,255,.12)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9aa39c" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-4-4" />
          </svg>
          <span style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden' }}>
            Buscar
          </span>
          <input type="search" name="q" enterKeyHint="search" placeholder="fonte para RTX 5070…" style={{ flex: '1', border: '0', background: 'transparent', color: '#eef2ee', font: 'inherit', fontSize: '16px', outline: 'none' }} />
        </label>
        </form>
      </div>
      <div style={{ padding: '22px 24px 0' }}>
        <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9dff3b' }}>
          PC
        </span>
        <div style={{ marginTop: '6px' }}>
          <Link href="/montador/" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '52px', borderBottom: '1px solid rgba(255,255,255,.07)', textDecoration: 'none', fontSize: '18px', fontWeight: '700' }}>
            <span>
              Montador de PC
            </span>
            <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: '#9aa39c' }}>
              4/4
            </span>
          </Link>
          <Link href="/ferramentas/fonte/" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '52px', borderBottom: '1px solid rgba(255,255,255,.07)', textDecoration: 'none', fontSize: '18px', fontWeight: '700' }}>
            <span>
              Calculadora de fonte
            </span>
            <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: '#9aa39c' }}>
              W
            </span>
          </Link>
          <Link href="/ferramentas/gabinete/" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '52px', borderBottom: '1px solid rgba(255,255,255,.07)', textDecoration: 'none', fontSize: '18px', fontWeight: '700' }}>
            <span>
              Cabe no gabinete
            </span>
            <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: '#9aa39c' }}>
              mm
            </span>
          </Link>
          <Link href="/ferramentas/memoria/" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '52px', borderBottom: '1px solid rgba(255,255,255,.07)', textDecoration: 'none', fontSize: '18px', fontWeight: '700' }}>
            <span>
              Memória certa
            </span>
            <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: '#9aa39c' }}>
              DDR
            </span>
          </Link>
        </div>
      </div>
      <div style={{ padding: '22px 24px 0' }}>
        <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9dff3b' }}>
          Celular
        </span>
        <div style={{ marginTop: '6px' }}>
          <Link href="/ferramentas/power-bank/" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '52px', borderBottom: '1px solid rgba(255,255,255,.07)', textDecoration: 'none', fontSize: '18px', fontWeight: '700' }}>
            <span>
              Power bank de verdade
            </span>
            <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: '#9aa39c' }}>
              mAh
            </span>
          </Link>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '52px', borderBottom: '1px solid rgba(255,255,255,.07)', fontSize: '18px', fontWeight: '700', color: '#6a726c' }}>
            <span>
              Comparar celulares
            </span>
            <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: '#6a726c' }}>
              em breve
            </span>
          </div>
        </div>
      </div>
      <div style={{ padding: '22px 24px 0' }}>
        <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9dff3b' }}>
          Tela e armazenamento
        </span>
        <div style={{ marginTop: '6px' }}>
          <Link href="/ferramentas/ssd/" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '52px', borderBottom: '1px solid rgba(255,255,255,.07)', textDecoration: 'none', fontSize: '18px', fontWeight: '700' }}>
            <span>
              Espaço real do SSD
            </span>
            <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: '#9aa39c' }}>
              GB
            </span>
          </Link>
          <Link href="/ferramentas/monitor/" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '52px', borderBottom: '1px solid rgba(255,255,255,.07)', textDecoration: 'none', fontSize: '18px', fontWeight: '700' }}>
            <span>
              Nitidez do monitor
            </span>
            <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: '#9aa39c' }}>
              PPI
            </span>
          </Link>
        </div>
      </div>
      <div style={{ padding: '22px 24px 0' }}>
        <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9dff3b' }}>
          Casa
        </span>
        <div style={{ marginTop: '6px' }}>
          <Link href="/ferramentas/conta-de-luz/" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '52px', borderBottom: '1px solid rgba(255,255,255,.07)', textDecoration: 'none', fontSize: '18px', fontWeight: '700' }}>
            <span>
              Conta de luz do PC
            </span>
            <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: '#9aa39c' }}>
              R$
            </span>
          </Link>
        </div>
      </div>
      <div style={{ padding: '30px 24px 0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <Link href="/dicas/" style={{ fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '44px', lineHeight: '1', textTransform: 'uppercase', textDecoration: 'none' }}>
          Dicas
        </Link>
        <Link href="/metodologia/" style={{ fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '44px', lineHeight: '1', textTransform: 'uppercase', textDecoration: 'none' }}>
          Metodologia
        </Link>
        <Link href="/sobre/" style={{ fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '44px', lineHeight: '1', textTransform: 'uppercase', textDecoration: 'none' }}>
          Sobre
        </Link>
      </div>
      <div style={{ flexGrow: '1', minHeight: '30px' }}>
      </div>
      <div style={{ padding: '24px', borderTop: '1px solid rgba(255,255,255,.07)', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--fm)', fontSize: '10px', letterSpacing: '.1em', textTransform: 'uppercase', color: '#9aa39c' }}>
        <span>
          {TIKTOK ? `TikTok · ${TIKTOK}` : ""}
        </span>
        <Link href="/legal/" style={{ color: '#9aa39c' }}>
          Privacidade
        </Link>
      </div>
    </div>
  );
}
