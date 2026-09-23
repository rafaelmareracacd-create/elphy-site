import Link from "next/link";
import { gpusFonte } from "@/lib/catalogo";
import { linkDica } from "@/lib/dicas";
import { assetPath } from "@/lib/site";
import MenuBotao from "./Menu";

/* Transcrito de docs/design-1.0/Home-Mobile.dc.html */
const LETREIRO = gpusFonte.filter((x) => x.w > 0);
export default function HomeMobile() {
  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#050607', color: '#eef2ee', fontFamily: 'var(--fb)' }}>
      <header style={{ display: 'flex', flexShrink: '0', alignItems: 'center', justifyContent: 'space-between', height: '64px', boxSizing: 'border-box', padding: '0 24px' }}>
        <Link href="/" style={{ fontWeight: '800', fontSize: '24px', letterSpacing: '-.045em', textDecoration: 'none', color: '#eef2ee' }}>
          elphy
          <span style={{ color: '#9dff3b' }}>
            .
          </span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link href="/ferramentas/fonte/" style={{ display: 'inline-flex', alignItems: 'center', height: '40px', padding: '0 16px', borderRadius: '20px', border: '1px solid rgba(255,255,255,.16)', textDecoration: 'none', fontSize: '14px', fontWeight: '600', color: '#eef2ee' }}>
            Fazer a conta
          </Link>
          <MenuBotao style={{ width: '44px', height: '44px', border: '1px solid rgba(255,255,255,.14)', borderRadius: '22px', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#eef2ee" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 8h16M4 16h16" />
            </svg>
          </MenuBotao>
        </div>
      </header>
      <section style={{ padding: '30px 24px 0' }}>
        <p style={{ margin: '0', fontFamily: 'var(--fm)', fontSize: '11px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9dff3b', animation: 'el-sobe .7s cubic-bezier(.2,.7,.2,1) both' }}>
          Montar PC · Ferramenta nº 01
        </p>
        <h1 style={{ margin: '14px 0 0', fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '80px', lineHeight: '.86', textTransform: 'uppercase', animation: 'el-sobe .8s cubic-bezier(.2,.7,.2,1) both', animationDelay: '80ms' }}>
          A conta
          <br />
          que a loja
          <br />
          não faz
          <span style={{ color: '#9dff3b' }}>
            .
          </span>
        </h1>
        <p style={{ margin: '18px 0 0', fontSize: '16px', lineHeight: '25px', color: '#b9c1bb', animation: 'el-sobe .8s cubic-bezier(.2,.7,.2,1) both', animationDelay: '160ms' }}>
          Escolhe a placa de vídeo e o processador. O Elphy soma cada watt e te entrega a nota.
        </p>
        <Link href="/ferramentas/fonte/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', height: '58px', marginTop: '24px', borderRadius: '29px', background: '#9dff3b', color: '#07110a', textDecoration: 'none', fontWeight: '700', fontSize: '17px', boxShadow: '0 14px 40px rgba(157,255,59,.25)', animation: 'el-sobe .8s cubic-bezier(.2,.7,.2,1) both', animationDelay: '240ms' }}>
          Fazer a conta
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#07110a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '16px', fontFamily: 'var(--fm)', fontSize: '10px', letterSpacing: '.1em', textTransform: 'uppercase', color: '#9aa39c' }}>
          <span>
            Sem cadastro
          </span>
          <span style={{ color: '#3a423c' }}>
            /
          </span>
          <span>
            Duas escolhas
          </span>
          <span style={{ color: '#3a423c' }}>
            /
          </span>
          <span>
            A conta inteira
          </span>
        </div>
      </section>
      <div style={{ position: 'relative', width: '390px', height: '475px', flexShrink: '0', margin: '18px auto 0', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', left: '0', top: '0', width: '390px', height: '475px', background: 'radial-gradient(ellipse 70% 60% at 62% 62%, rgba(86,190,52,.22), rgba(86,190,52,0) 72%)' }}>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- a máscara e o recorte do desenho precisam do img puro */}
        <img src={assetPath("/brand/elphy-nota.webp")} alt="Elphy, o elefante verde de moletom preto, faz joinha e mostra a nota da fonte no celular" style={{ position: 'absolute', left: '-90px', top: '-305px', width: '520px', height: '780px', WebkitMaskImage: 'radial-gradient(ellipse 62% 48% at 58% 70%, #000 70%, transparent 100%)', maskImage: 'radial-gradient(ellipse 62% 48% at 58% 70%, #000 70%, transparent 100%)' }} />
        <div aria-hidden="true" style={{ position: 'absolute', left: '0', top: '0', width: '250px', height: '606px', transformOrigin: '0 0', transform: 'matrix3d(0.20439497, 0.039146792, 0, -0.00012577234, -0.052476139, 0.26123507, 0, 6.6610112e-05, 0, 0, 1, 0, 318.2438, 171.53447, 0, 1)' }}>
          <div style={{ position: 'absolute', left: '9px', top: '9px', right: '9px', bottom: '9px', borderRadius: '30px', overflow: 'hidden', background: 'linear-gradient(180deg, #0c130d 0%, #050607 72%)' }}>
            <div style={{ position: 'absolute', left: '50%', top: '12px', width: '14px', height: '14px', marginLeft: '-7px', borderRadius: '50%', background: '#000' }}>
            </div>
            <div style={{ padding: '60px 20px 0' }}>
              <div style={{ fontWeight: '800', fontSize: '26px', letterSpacing: '-.04em' }}>
                elphy
                <span style={{ color: '#9dff3b' }}>
                  .
                </span>
              </div>
              <div style={{ marginTop: '80px', fontFamily: 'var(--fm)', fontSize: '14px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#9dff3b' }}>
                Sua fonte
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginTop: '8px', fontFamily: 'var(--fd)', fontWeight: '900', lineHeight: '.82', color: '#9dff3b' }}>
                <span style={{ fontSize: '116px' }}>
                  550
                </span>
                <span style={{ fontSize: '36px' }}>
                  W
                </span>
              </div>
              <div style={{ display: 'flex', height: '12px', marginTop: '20px', borderRadius: '6px', overflow: 'hidden', background: '#13251b' }}>
                <i style={{ display: 'block', width: '33.17%', background: '#9dff3b' }}>
                </i>
                <i style={{ display: 'block', width: '9.92%', background: '#ffb020' }}>
                </i>
              </div>
            </div>
            <div style={{ position: 'absolute', left: '20px', right: '20px', bottom: '24px', height: '56px', borderRadius: '28px', background: '#9dff3b' }}>
            </div>
            <div style={{ position: 'absolute', left: '0', top: '0', right: '0', bottom: '0', background: 'linear-gradient(118deg, rgba(255,255,255,.13) 0%, rgba(255,255,255,.04) 32%, rgba(255,255,255,0) 33%)' }}>
            </div>
          </div>
        </div>
        <div aria-hidden="true" style={{ position: 'absolute', left: '0', bottom: '0', width: '390px', height: '120px', background: 'linear-gradient(to top, #050607 10%, rgba(5,6,7,0))' }}>
        </div>
      </div>
      <div aria-label="Consumo máximo de cada placa de vídeo" style={{ height: '56px', flexShrink: '0', boxSizing: 'border-box', borderTop: '1px solid rgba(255,255,255,.08)', borderBottom: '1px solid rgba(255,255,255,.08)', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexShrink: '0', whiteSpace: 'nowrap', animation: 'el-ticker 36s linear infinite', fontFamily: 'var(--fm)', fontSize: '12px', letterSpacing: '.08em', textTransform: 'uppercase', color: '#9aa39c' }}>
          {/* as placas do catálogo, duas vezes (o letreiro corre até a metade e recomeça) */}
          {[...LETREIRO, ...LETREIRO].map((t, i) => (
            <span key={i} style={{ paddingLeft: '22px' }}>
              {`${t.curto} `}
              <b style={{ fontWeight: '500', color: '#9dff3b' }}>
                {`${t.w} W`}
              </b>
              {' '}
              <i style={{ fontStyle: 'normal', color: '#3a423c', marginLeft: '12px' }}>
                /
              </i>
            </span>
          ))}
        </div>
      </div>
      <section style={{ padding: '72px 24px 0' }}>
        <p style={{ margin: '0', fontFamily: 'var(--fm)', fontSize: '11px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9dff3b' }}>
          Nº 02 — A conta aberta
        </p>
        <h2 style={{ margin: '14px 0 0', fontFamily: 'var(--fd)', fontWeight: '800', fontSize: '46px', lineHeight: '.92', textTransform: 'uppercase' }}>
          Toda calculadora te dá o 550.{' '}
          <span style={{ color: '#9aa39c' }}>
            Aqui você vê de onde ele saiu.
          </span>
        </h2>
        <div style={{ marginTop: '34px', borderTop: '1px solid rgba(255,255,255,.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '76px', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
            <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#9aa39c' }}>
              TGP · RTX 5070
            </span>
            <span style={{ fontFamily: 'var(--fd)', fontWeight: '800', fontSize: '58px', lineHeight: '1' }}>
              250
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '76px', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
            <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#9aa39c' }}>
              + PPT · Ryzen 5 7600
            </span>
            <span style={{ fontFamily: 'var(--fd)', fontWeight: '800', fontSize: '58px', lineHeight: '1' }}>
              88
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '76px', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
            <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#9aa39c' }}>
              + Mãe, memória, SSD
            </span>
            <span style={{ fontFamily: 'var(--fd)', fontWeight: '800', fontSize: '58px', lineHeight: '1' }}>
              60
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '76px', borderBottom: '1px solid rgba(255,255,255,.2)' }}>
            <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#eef2ee' }}>
              = Consumo em carga
            </span>
            <span style={{ fontFamily: 'var(--fd)', fontWeight: '800', fontSize: '58px', lineHeight: '1' }}>
              398
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '76px', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
            <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#9aa39c' }}>
              × Folga para picos
            </span>
            <span style={{ fontFamily: 'var(--fd)', fontWeight: '800', fontSize: '58px', lineHeight: '1' }}>
              1,3
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '76px', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
            <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#9aa39c' }}>
              = Com folga
            </span>
            <span style={{ fontFamily: 'var(--fd)', fontWeight: '800', fontSize: '58px', lineHeight: '1', color: '#ffb020' }}>
              517
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '104px' }}>
            <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#9dff3b' }}>
              → Degrau comercial
            </span>
            <span style={{ fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '92px', lineHeight: '1', color: '#9dff3b', whiteSpace: 'nowrap' }}>
              550 W
            </span>
          </div>
        </div>
      </section>
      <section style={{ marginTop: '72px', padding: '72px 24px 64px', background: '#f3f1ea', color: '#111311' }}>
        <p style={{ margin: '0', fontFamily: 'var(--fm)', fontSize: '11px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#5b5f58' }}>
          Nº 03 — O selo
        </p>
        <h2 style={{ margin: '14px 0 0', fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '60px', lineHeight: '.88', textTransform: 'uppercase' }}>
          80 Plus mede eficiência. Não mede proteção.
        </h2>
        <div style={{ marginTop: '32px', paddingBottom: '10px', borderBottom: '2px solid #111311', fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.16em', textTransform: 'uppercase' }}>
          O que o selo mede
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '52px', borderBottom: '1px solid rgba(17,19,17,.16)' }}>
          <span style={{ fontSize: '16px', fontWeight: '600' }}>
            Eficiência com 20% de carga
          </span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111311" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-label="mede">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '52px', borderBottom: '1px solid rgba(17,19,17,.16)' }}>
          <span style={{ fontSize: '16px', fontWeight: '600' }}>
            Eficiência com 50% de carga
          </span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111311" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-label="mede">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '52px', borderBottom: '1px solid rgba(17,19,17,.16)' }}>
          <span style={{ fontSize: '16px', fontWeight: '600' }}>
            Eficiência com 100% de carga
          </span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111311" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-label="mede">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </div>
        <div style={{ marginTop: '28px', paddingBottom: '10px', borderBottom: '2px solid #111311', fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.16em', textTransform: 'uppercase' }}>
          O que o selo não mede
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '52px', borderBottom: '1px solid rgba(17,19,17,.16)' }}>
          <span style={{ fontSize: '16px', fontWeight: '600' }}>
            OVP{' '}
            <span style={{ fontWeight: '400', color: '#5b5f58' }}>
              — sobretensão
            </span>
          </span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b8400e" strokeWidth="2.4" strokeLinecap="round" aria-label="não mede">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '52px', borderBottom: '1px solid rgba(17,19,17,.16)' }}>
          <span style={{ fontSize: '16px', fontWeight: '600' }}>
            OCP{' '}
            <span style={{ fontWeight: '400', color: '#5b5f58' }}>
              — sobrecorrente
            </span>
          </span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b8400e" strokeWidth="2.4" strokeLinecap="round" aria-label="não mede">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '52px', borderBottom: '1px solid rgba(17,19,17,.16)' }}>
          <span style={{ fontSize: '16px', fontWeight: '600' }}>
            SCP{' '}
            <span style={{ fontWeight: '400', color: '#5b5f58' }}>
              — curto-circuito
            </span>
          </span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b8400e" strokeWidth="2.4" strokeLinecap="round" aria-label="não mede">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '52px', borderBottom: '1px solid rgba(17,19,17,.16)' }}>
          <span style={{ fontSize: '16px', fontWeight: '600' }}>
            OPP{' '}
            <span style={{ fontWeight: '400', color: '#5b5f58' }}>
              — sobrepotência
            </span>
          </span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b8400e" strokeWidth="2.4" strokeLinecap="round" aria-label="não mede">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </div>
        <div style={{ marginTop: '28px', boxSizing: 'border-box', padding: '18px 20px', borderRadius: '16px', background: '#111311', color: '#eef2ee', fontSize: '16px', lineHeight: '24px', fontWeight: '600' }}>
          Por isso só entra no Elphy a fonte com relatório de teste que dá para abrir e ler.
        </div>
      </section>
      <section style={{ padding: '72px 0 0' }}>
        <div style={{ padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <p style={{ margin: '0', fontFamily: 'var(--fm)', fontSize: '11px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9dff3b' }}>
              Nº 04 — Dicas
            </p>
            <h2 style={{ margin: '14px 0 0', fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '50px', lineHeight: '.9', textTransform: 'uppercase' }}>
              Dicas que cabem
              <br />
              numa conta.
            </h2>
          </div>
        </div>
        <div className="dz-rolo" style={{ overflowX: 'auto', marginTop: '28px' }}>
          <div style={{ display: 'flex', gap: '12px', padding: '0 24px', width: 'max-content' }}>
            <Link href="/dicas/rtx-5070-250w/" style={{ display: 'flex', flexDirection: 'column', width: '290px', height: '330px', flexShrink: '0', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(255,255,255,.08)', background: '#0a0d0f', textDecoration: 'none', color: '#eef2ee' }}>
              <div style={{ height: '196px', boxSizing: 'border-box', padding: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'radial-gradient(ellipse 70% 70% at 30% 100%, rgba(157,255,59,.18), rgba(157,255,59,0) 70%), #0d1013' }}>
                <span style={{ alignSelf: 'flex-start', padding: '5px 9px', borderRadius: '8px', border: '1px solid rgba(255,255,255,.14)', fontFamily: 'var(--fm)', fontSize: '10px', letterSpacing: '.1em', textTransform: 'uppercase', color: '#c9d0ca' }}>
                  RTX 5070
                </span>
                <span style={{ fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '96px', lineHeight: '.8', color: '#9dff3b' }}>
                  250 W
                </span>
              </div>
              <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '17px', lineHeight: '22px', fontWeight: '700' }}>
                  A RTX 5070 puxa 250 W. A caixa não conta o resto.
                </span>
                <span style={{ fontFamily: 'var(--fm)', fontSize: '10px', letterSpacing: '.1em', textTransform: 'uppercase', color: '#9aa39c' }}>
                  4 min · Montar PC
                </span>
              </div>
            </Link>
            <Link href={linkDica("folga-30")} style={{ display: 'flex', flexDirection: 'column', width: '290px', height: '330px', flexShrink: '0', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(255,255,255,.08)', background: '#0a0d0f', textDecoration: 'none', color: '#eef2ee' }}>
              <div style={{ height: '196px', boxSizing: 'border-box', padding: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#f3f1ea', color: '#111311', fontFamily: 'var(--fm)', fontSize: '10.5px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', color: '#3f433d' }}>
                  <span style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>
                      Consumo em carga
                    </span>
                    <b style={{ color: '#111311' }}>
                      398 W
                    </b>
                  </span>
                  <span style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>
                      Folga (+30%)
                    </span>
                    <b style={{ color: '#111311' }}>
                      119 W
                    </b>
                  </span>
                </div>
                <span style={{ fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '96px', lineHeight: '.8' }}>
                  ×1,3
                </span>
              </div>
              <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '17px', lineHeight: '22px', fontWeight: '700' }}>
                  A conta arredonda para cima. O pico da placa explica.
                </span>
                <span style={{ fontFamily: 'var(--fm)', fontSize: '10px', letterSpacing: '.1em', textTransform: 'uppercase', color: '#9aa39c' }}>
                  3 min · Montar PC
                </span>
              </div>
            </Link>
            <Link href={linkDica("selo-80-plus")} style={{ display: 'flex', flexDirection: 'column', width: '290px', height: '330px', flexShrink: '0', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(255,255,255,.08)', background: '#0a0d0f', textDecoration: 'none', color: '#eef2ee' }}>
              <div style={{ height: '196px', boxSizing: 'border-box', padding: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#111418' }}>
                <div style={{ display: 'flex', gap: '6px', fontFamily: 'var(--fm)', fontSize: '9.5px', letterSpacing: '.1em', textTransform: 'uppercase' }}>
                  <span style={{ padding: '5px 8px', borderRadius: '7px', background: '#9dff3b', color: '#07110a' }}>
                    Eficiência
                  </span>
                  <span style={{ padding: '5px 8px', borderRadius: '7px', border: '1px dashed rgba(255,176,32,.7)', color: '#ffb020' }}>
                    Proteção?
                  </span>
                </div>
                <span style={{ fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '96px', lineHeight: '.8', color: 'transparent', WebkitTextStroke: '1.5px #eef2ee' }}>
                  80 Plus
                </span>
              </div>
              <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '17px', lineHeight: '22px', fontWeight: '700' }}>
                  O selo 80 Plus mede eficiência. Proteção fica de fora.
                </span>
                <span style={{ fontFamily: 'var(--fm)', fontSize: '10px', letterSpacing: '.1em', textTransform: 'uppercase', color: '#9aa39c' }}>
                  5 min · Fontes
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>
      <section style={{ padding: '64px 24px 0' }}>
        <div style={{ boxSizing: 'border-box', padding: '26px 22px', borderRadius: '24px', border: '1px solid rgba(157,255,59,.3)', background: 'radial-gradient(ellipse 90% 70% at 0% 0%, rgba(157,255,59,.11), rgba(157,255,59,0) 60%), #0a0d0f' }}>
          <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9dff3b' }}>
            Elphy Pro · em breve
          </span>
          <div style={{ marginTop: '10px', fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '48px', lineHeight: '.9', textTransform: 'uppercase' }}>
            O PC inteiro, peça por peça.
          </div>
          <p style={{ margin: '12px 0 0', fontSize: '15px', lineHeight: '23px', color: '#b9c1bb' }}>
            Gabinete, cooler, memória e fonte — cada peça com a sua conta, e a nota completa do PC para mandar para quem vai montar.
          </p>
          {/* lista de espera do Pro: volta quando houver para onde mandar o e-mail */}
        </div>
      </section>
      <footer style={{ position: 'relative', marginTop: '72px', flexGrow: '1', minHeight: '512px', boxSizing: 'border-box', padding: '40px 24px 0', borderTop: '1px solid rgba(255,255,255,.08)', overflow: 'hidden' }}>
        <span style={{ fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '36px', lineHeight: '.9', textTransform: 'uppercase' }}>
          Dica sem caô
          <span style={{ color: '#9dff3b' }}>
            .
          </span>
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '10px', marginTop: '24px', fontSize: '15px' }}>
          <Link href="/ferramentas/fonte/" style={{ textDecoration: 'none' }}>
            Fazer a conta
          </Link>
          <Link href="/dicas/" style={{ textDecoration: 'none' }}>
            Dicas
          </Link>
          <Link href="/metodologia/" style={{ textDecoration: 'none' }}>
            Como a gente mede
          </Link>
          <Link href="/legal/#afiliado" style={{ textDecoration: 'none' }}>
            Como ganhamos dinheiro
          </Link>
        </div>
        <p style={{ margin: '22px 0 0', fontFamily: 'var(--fm)', fontSize: '10px', lineHeight: '16px', letterSpacing: '.04em', color: '#9aa39c' }}>
          © 2026 Elphy. Links de loja podem render comissão para o Elphy. O preço para você não muda.
        </p>
        <div aria-hidden="true" style={{ position: 'absolute', left: '16px', bottom: '18px', fontWeight: '800', fontSize: '150px', lineHeight: '.78', letterSpacing: '-.07em', color: '#eef2ee' }}>
          elphy
          <span style={{ color: '#9dff3b' }}>
            .
          </span>
        </div>
      </footer>
    </div>
  );
}
