import Link from "next/link";


import MenuBotao from "./Menu";

/* Transcrito de docs/design-1.0/Correcoes-Mobile.dc.html */
export default function Correcoes() {
  return (
    <div className="dz-col" style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#050607', color: '#eef2ee', fontFamily: 'var(--fb)' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px', boxSizing: 'border-box', padding: '0 24px', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
        <Link href="/" style={{ fontWeight: '800', fontSize: '24px', letterSpacing: '-.045em', textDecoration: 'none', color: '#eef2ee' }}>
          elphy
          <span style={{ color: '#9dff3b' }}>
            .
          </span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#c9d0ca' }}>
            Correções
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
          Correções
        </p>
        <h1 style={{ margin: '14px 0 0', fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '70px', lineHeight: '.86', textTransform: 'uppercase' }}>
          Errou?
          <br />
          Corrige
          <br />
          aqui
          <span style={{ color: '#9dff3b' }}>
            .
          </span>
        </h1>
        <p style={{ margin: '14px 0 0', fontSize: '16px', lineHeight: '24px', color: '#b9c1bb' }}>
          Número errado sai do ar e entra nesta lista, com o antes e o depois. Nada some calado.
        </p>
      </div>
      <div style={{ margin: '30px 24px 0', boxSizing: 'border-box', padding: '26px 20px', border: '1.5px dashed rgba(255,255,255,.16)', borderRadius: '6px', textAlign: 'center', fontFamily: 'var(--fm)', fontSize: '11px', lineHeight: '18px', color: '#9aa39c' }}>
        Nenhuma correção até agora.
        <br />
        Quando houver, ela aparece aqui.
      </div>
      {/* Sem e-mail de contato ainda: o formulário (mailto) volta quando houver para onde mandar. */}
      <div style={{ padding: '36px 24px 0' }}>
        <h2 style={{ margin: '0', fontSize: '26px', lineHeight: '31px', fontWeight: '800', letterSpacing: '-.02em' }}>
          Achou um número errado?
        </h2>
        <p style={{ margin: '10px 0 0', fontSize: '15px', lineHeight: '23px', color: '#b9c1bb' }}>
          O canal para mandar correção abre em breve. Até lá, a conta de cada ferramenta está aberta na{' '}
          <Link href="/metodologia/" style={{ color: '#c9d0ca' }}>
            metodologia
          </Link>
          .
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
