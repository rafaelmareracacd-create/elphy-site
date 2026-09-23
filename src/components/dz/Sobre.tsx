import Link from "next/link";
import { assetPath } from "@/lib/site";

import MenuBotao from "./Menu";

/* Transcrito de docs/design-1.0/Sobre-Mobile.dc.html */
export default function Sobre() {
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
            Sobre
          </span>
          <MenuBotao style={{ width: '44px', height: '44px', boxSizing: 'border-box', border: '1px solid rgba(255,255,255,.14)', borderRadius: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#eef2ee" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 8h16M4 16h16" />
            </svg>
          </MenuBotao>
        </div>
      </header>
      <div style={{ position: 'relative', height: '470px', overflow: 'hidden', WebkitMaskImage: 'linear-gradient(180deg, #000 70%, transparent 100%)', maskImage: 'linear-gradient(180deg, #000 70%, transparent 100%)' }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- a máscara e o recorte do desenho precisam do img puro */}
        <img src={assetPath("/brand/elphy-nota.webp")} alt="O Elphy, mascote do site, fazendo joinha e segurando um celular" style={{ position: 'absolute', left: '0', top: '-110px', width: '390px', height: '585px', objectFit: 'cover' }} />
      </div>
      <div style={{ padding: '0 24px' }}>
        <h1 style={{ margin: '-40px 0 0', position: 'relative', fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '76px', lineHeight: '.86', textTransform: 'uppercase' }}>
          Esse é
          <br />
          o Elphy
          <span style={{ color: '#9dff3b' }}>
            .
          </span>
        </h1>
        <p style={{ margin: '16px 0 0', fontSize: '19px', lineHeight: '30px', color: '#dfe5e0' }}>
          Ele faz a conta que a loja não faz, e mostra a fórmula.
        </p>
      </div>
      <h2 style={{ margin: '36px 24px 0', fontSize: '26px', lineHeight: '31px', fontWeight: '800', letterSpacing: '-.02em' }}>
        Quem está por trás
      </h2>
      <p style={{ margin: '14px 24px 0', fontSize: '17px', lineHeight: '28px', color: '#c9d0ca' }}>
        O Elphy nasceu do canal Planeta dos Estudos, no TikTok, que mostra as contas daqui em vídeo.
      </p>
      <div style={{ padding: '30px 24px 0' }}>
        <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9dff3b' }}>
          O que não muda
        </span>
        <div style={{ marginTop: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '16px', padding: '14px 0', borderTop: '1px solid rgba(255,255,255,.08)' }}>
            <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#9aa39c' }}>
              Voz
            </span>
            <span style={{ textAlign: 'right', fontSize: '16px', fontWeight: '700' }}>
              A bronca é da loja, nunca de quem lê.
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '16px', padding: '14px 0', borderTop: '1px solid rgba(255,255,255,.08)' }}>
            <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#9aa39c' }}>
              Palavra
            </span>
            <span style={{ textAlign: 'right', fontSize: '16px', fontWeight: '700' }}>
              Nunca “melhor”. Sempre “mede”.
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '16px', padding: '14px 0', borderTop: '1px solid rgba(255,255,255,.08)' }}>
            <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#9aa39c' }}>
              Lista
            </span>
            <span style={{ textAlign: 'right', fontSize: '16px', fontWeight: '700' }}>
              Sem teste público, não entra.
            </span>
          </div>
        </div>
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
