import Link from "next/link";
import type { ReactNode } from "react";
import MenuBotao from "./Menu";

/* Transcrito de docs/design-1.0/Estados-Mobile.dc.html: a casca (cabeçalho e rodapé) e os estados 1, 2 e 4.
   O estado 3 (busca sem resultado) está em BuscaMobile. */
export function Casca({ rotulo, children }: { rotulo: string; children: ReactNode }) {
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
              {rotulo}
            </span>
            <MenuBotao style={{ width: '44px', height: '44px', boxSizing: 'border-box', border: '1px solid rgba(255,255,255,.14)', borderRadius: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#eef2ee" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M4 8h16M4 16h16" />
              </svg>
            </MenuBotao>
          </div>
        </header>
      {children}
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

/** Estado 1 · página que não existe */
export function Pagina404() {
  return (
    <>
        <div style={{ padding: '36px 24px 0' }}>
          <div style={{ fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '180px', lineHeight: '.8', color: '#9dff3b' }}>
            404
          </div>
          <h1 style={{ margin: '18px 0 0', fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '48px', lineHeight: '.9', textTransform: 'uppercase' }}>
            Essa página
            <br />
            não fecha a conta
            <span style={{ color: '#9dff3b' }}>
              .
            </span>
          </h1>
        </div>
        <div style={{ margin: '26px 24px 0', boxSizing: 'border-box', padding: '18px 20px', background: '#f3f1ea', color: '#111311', fontFamily: 'var(--fm)', fontSize: '11px', lineHeight: '18px', transform: 'rotate(-1.2deg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <b>
              elphy.
            </b>
            <b>
              Nº 0404
            </b>
          </div>
          <div style={{ margin: '12px 0', borderTop: '1.5px dashed rgba(17,19,17,.4)' }}>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '0px' }}>
            <span>
              Página pedida
            </span>
            <span style={{ flex: '1', margin: '0 5px 4px', borderBottom: '1.5px dotted rgba(17,19,17,.45)' }}>
            </span>
            <b>
              não achada
            </b>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '4px', fontWeight: '700' }}>
            <span>
              Total
            </span>
            <span style={{ flex: '1', margin: '0 5px 4px', borderBottom: '1.5px dotted rgba(17,19,17,.45)' }}>
            </span>
            <b>
              0 W
            </b>
          </div>
          <div style={{ marginTop: '10px', borderTop: '3px double #111311' }}>
          </div>
          <div style={{ marginTop: '8px', fontSize: '10px', color: '#3f433d' }}>
            O link pode ter mudado. As contas continuam aqui.
          </div>
        </div>
        <div style={{ padding: '24px 24px 40px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Link href="/ferramentas/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', height: '56px', boxSizing: 'border-box', borderRadius: '28px', textDecoration: 'none', fontFamily: 'var(--fb)', fontWeight: '700', fontSize: '16px', marginTop: '0px', background: '#9dff3b', color: '#07110a', border: '0', boxShadow: '0 14px 40px rgba(157,255,59,.25)' }}>
            Ver as ferramentas
          </Link>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', height: '56px', boxSizing: 'border-box', borderRadius: '28px', textDecoration: 'none', fontFamily: 'var(--fb)', fontWeight: '700', fontSize: '16px', marginTop: '0px', background: 'transparent', color: '#eef2ee', border: '1px solid rgba(255,255,255,.16)' }}>
            Voltar ao início
          </Link>
        </div>
    </>
  );
}

/** Estado 2 · a nota está sendo impressa */
export function Imprimindo() {
  return (
      <div style={{ padding: '36px 24px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '342px', height: '30px', boxSizing: 'border-box', padding: '0 14px', borderRadius: '15px', background: 'linear-gradient(180deg, #1c2226, #0d1013)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'var(--fm)', fontSize: '9px', letterSpacing: '.14em', textTransform: 'uppercase' }}>
          <span style={{ color: '#8d958f' }}>
            Impressora de contas
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', color: '#ffb020' }}>
            <i style={{ display: 'block', width: '7px', height: '7px', borderRadius: '50%', background: '#ffb020', boxShadow: '0 0 10px #ffb020', animation: 'el-pulso .7s ease-in-out infinite' }}>
            </i>
            Imprimindo
          </span>
        </div>
        <div aria-hidden="true" style={{ width: '318px', height: '6px', marginTop: '-4px', borderRadius: '3px', background: '#020303' }}>
        </div>
        <div role="status" aria-label="Imprimindo a nota" style={{ width: '318px', boxSizing: 'border-box', marginTop: '-2px', padding: '22px', background: '#f3f1ea' }}>
          <div style={{ height: '10px', marginTop: '9px', borderRadius: '2px', background: 'rgba(17,19,17,.14)', width: '40%', animation: 'el-pulso 1.2s ease-in-out infinite', animationDelay: '0s' }}>
          </div>
          <div style={{ height: '10px', marginTop: '9px', borderRadius: '2px', background: 'rgba(17,19,17,.14)', width: '90%', animation: 'el-pulso 1.2s ease-in-out infinite', animationDelay: '.1s' }}>
          </div>
          <div style={{ height: '10px', marginTop: '9px', borderRadius: '2px', background: 'rgba(17,19,17,.14)', width: '80%', animation: 'el-pulso 1.2s ease-in-out infinite', animationDelay: '.2s' }}>
          </div>
          <div style={{ height: '10px', marginTop: '9px', borderRadius: '2px', background: 'rgba(17,19,17,.14)', width: '85%', animation: 'el-pulso 1.2s ease-in-out infinite', animationDelay: '.3s' }}>
          </div>
          <div style={{ height: '10px', marginTop: '9px', borderRadius: '2px', background: 'rgba(17,19,17,.14)', width: '70%', animation: 'el-pulso 1.2s ease-in-out infinite', animationDelay: '.4s' }}>
          </div>
          <div style={{ height: '54px', marginTop: '18px', borderRadius: '2px', background: 'rgba(17,19,17,.14)', width: '60%', animation: 'el-pulso 1.2s ease-in-out infinite', animationDelay: '.5s' }}>
          </div>
        </div>
        <p style={{ margin: '16px 0 0', fontFamily: 'var(--fm)', fontSize: '10.5px', color: '#9aa39c' }}>
          A conta leva menos de um segundo. Isso só aparece em conexão lenta.
        </p>
      </div>
  );
}

/** Estado 4 · formulário que não enviou */
export function FormFalhou({ email, onTentar }: { email: string; onTentar: () => void }) {
  return (
      <div style={{ padding: '30px 24px 0' }}>
        <div role="alert" style={{ boxSizing: 'border-box', padding: '22px', borderRadius: '20px', background: '#0a0d0f', border: '1px solid rgba(255,176,32,.45)' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#ffb020' }}>
            <i style={{ display: 'block', width: '7px', height: '7px', borderRadius: '50%', background: '#ffb020' }}>
            </i>
            Não enviou
          </span>
          <h2 style={{ margin: '12px 0 0', fontSize: '24px', lineHeight: '29px', fontWeight: '800' }}>
            A correção não saiu daqui.
          </h2>
          <p style={{ margin: '10px 0 0', fontSize: '15px', lineHeight: '23px', color: '#c9d0ca' }}>
            O que você escreveu continua no formulário. Tenta de novo, ou manda direto para {email}.
          </p>
          <button type="button" onClick={onTentar} style={{ width: '100%', height: '52px', marginTop: '18px', border: '0', borderRadius: '26px', background: '#ffb020', color: '#1a1204', font: 'inherit', fontWeight: '700', fontSize: '15px' }}>
            Tentar de novo
          </button>
        </div>
      </div>
  );
}
