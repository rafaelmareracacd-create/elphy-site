"use client";

import Link from "next/link";
import { linkDica } from "@/lib/dicas";
import { Fragment } from "react";
import { assetPath } from "@/lib/site";
import { useNotaFonte } from "./useNotaFonte";

/* Transcrito de docs/design-1.0/Main.dc.html */
export default function HomeDesktop() {
  const v = useNotaFonte({ gpu: "rtx-5070", cpu: "r5-7600" }, 46);
  const { rec, pctConsumo, pctFolga, pctRec, gpuCurto, tgp, cpuCurto, ppt, letreiro, gpuChips, cpuChips, mandar, reimprimir, brilho, impresso, numero, data, gpuNome, cpuNome, consumo, folga, comFolga, mostrado, barras, codigo } = v;
  const mandarTexto = v.enviado === "copiada" ? "Nota copiada" : v.enviado === "enviada" ? "Nota enviada" : "Mandar a nota";
  return (
    <div id="topo" style={{ position: 'relative', width: '1440px', overflow: 'hidden', background: '#050607', color: '#eef2ee', fontFamily: 'var(--fb)' }}>
      {/* ============ HERO ============ */}
      <section style={{ position: 'relative', width: '1440px', height: '960px', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', left: '0', top: '0', width: '1440px', height: '960px', background: 'radial-gradient(ellipse 44% 58% at 82% 66%, rgba(86,190,52,.22), rgba(86,190,52,0) 70%), radial-gradient(ellipse 34% 40% at 6% 18%, rgba(157,255,59,.05), rgba(157,255,59,0) 70%)' }}>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- a máscara e o recorte do desenho precisam do img puro */}
        <img src={assetPath("/brand/elphy-nota.webp")} alt="Elphy, o elefante verde de moletom preto, faz joinha e mostra a nota da fonte no celular" style={{ position: 'absolute', left: '575px', top: '-390px', width: '900px', height: '1350px', WebkitMaskImage: 'radial-gradient(ellipse 62% 48% at 58% 70%, #000 70%, transparent 100%)', maskImage: 'radial-gradient(ellipse 62% 48% at 58% 70%, #000 70%, transparent 100%)' }} />
        {/* a tela do celular do Elphy: mapeada nos quatro cantos da foto */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '0', top: '0', width: '250px', height: '606px', transformOrigin: '0 0', transform: 'matrix3d(0.26184996, 0.050411992, 0, -0.00012577234, -0.042147467, 0.46132214, 0, 6.6610112e-05, 0, 0, 1, 0, 1281.5758, 434.77121, 0, 1)' }}>
          <div style={{ position: 'absolute', left: '9px', top: '9px', right: '9px', bottom: '9px', borderRadius: '30px', overflow: 'hidden', background: 'linear-gradient(180deg, #0c130d 0%, #050607 72%)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.06)' }}>
            <div style={{ position: 'absolute', left: '50%', top: '12px', width: '14px', height: '14px', marginLeft: '-7px', borderRadius: '50%', background: '#000', boxShadow: '0 0 0 2px #161b1e' }}>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px 0', fontFamily: 'var(--fm)', fontSize: '13px', color: '#eef2ee' }}>
              <span>
                19:40
              </span>
              <span style={{ display: 'flex', alignItems: 'flex-end', gap: '3px' }}>
                <i style={{ display: 'block', width: '4px', height: '6px', borderRadius: '1px', background: '#eef2ee' }}>
                </i>
                <i style={{ display: 'block', width: '4px', height: '9px', borderRadius: '1px', background: '#eef2ee' }}>
                </i>
                <i style={{ display: 'block', width: '4px', height: '12px', borderRadius: '1px', background: '#eef2ee' }}>
                </i>
                <i style={{ display: 'block', width: '22px', height: '11px', marginLeft: '6px', boxSizing: 'border-box', border: '1.5px solid #eef2ee', borderRadius: '3px' }}>
                </i>
              </span>
            </div>
            <div style={{ padding: '34px 20px 0' }}>
              <div style={{ fontWeight: '800', fontSize: '24px', letterSpacing: '-.04em', color: '#eef2ee' }}>
                elphy
                <span style={{ color: '#9dff3b' }}>
                  .
                </span>
              </div>
              <div style={{ marginTop: '70px', fontFamily: 'var(--fm)', fontSize: '12px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9dff3b' }}>
                Sua fonte
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginTop: '6px', fontFamily: 'var(--fd)', fontWeight: '900', lineHeight: '.82', color: '#9dff3b' }}>
                <span style={{ fontSize: '112px' }}>
                  {rec}
                </span>
                <span style={{ fontSize: '34px' }}>
                  W
                </span>
              </div>
              <div style={{ display: 'flex', height: '10px', marginTop: '18px', borderRadius: '5px', overflow: 'hidden', background: '#13251b' }}>
                <i style={{ display: 'block', width: pctConsumo, background: '#9dff3b' }}>
                </i>
                <i style={{ display: 'block', width: pctFolga, background: '#ffb020' }}>
                </i>
              </div>
              <div style={{ marginTop: '22px', fontFamily: 'var(--fm)', fontSize: '13px', color: '#c9d0ca' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid #1a1f23' }}>
                  <span>
                    {gpuCurto}
                  </span>
                  <span>
                    {tgp} W
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid #1a1f23' }}>
                  <span>
                    {cpuCurto}
                  </span>
                  <span>
                    {ppt} W
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0' }}>
                  <span>
                    Sistema
                  </span>
                  <span>
                    60 W
                  </span>
                </div>
              </div>
            </div>
            <div style={{ position: 'absolute', left: '20px', right: '20px', bottom: '24px', height: '54px', borderRadius: '27px', background: '#9dff3b', color: '#07110a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '17px' }}>
              Mandar a nota
            </div>
            <div style={{ position: 'absolute', left: '0', top: '0', right: '0', bottom: '0', pointerEvents: 'none', background: 'linear-gradient(118deg, rgba(255,255,255,.13) 0%, rgba(255,255,255,.04) 32%, rgba(255,255,255,0) 33%)' }}>
            </div>
          </div>
        </div>
        <div aria-hidden="true" style={{ position: 'absolute', left: '0', bottom: '0', width: '1440px', height: '200px', background: 'linear-gradient(to top, #050607 8%, rgba(5,6,7,0))' }}>
        </div>
        <svg aria-hidden="true" width="1440" height="960" style={{ position: 'absolute', left: '0', top: '0', opacity: '.07', mixBlendMode: 'overlay', pointerEvents: 'none' }}>
          <filter id="grao-hero">
            <feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="1440" height="960" filter="url(#grao-hero)" />
        </svg>
        <header style={{ position: 'absolute', left: '0', top: '0', width: '1440px', height: '88px', boxSizing: 'border-box', padding: '0 96px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ fontWeight: '800', fontSize: '27px', letterSpacing: '-.045em', textDecoration: 'none', color: '#eef2ee' }}>
            elphy
            <span style={{ color: '#9dff3b' }}>
              .
            </span>
          </Link>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '38px', fontSize: '15px', fontWeight: '500' }}>
            <a href="#bancada" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#eef2ee' }}>
              <i style={{ display: 'block', width: '7px', height: '7px', borderRadius: '50%', background: '#9dff3b', boxShadow: '0 0 10px #9dff3b', animation: 'el-pulso 1.8s ease-in-out infinite' }}>
              </i>
              Montar PC
            </a>
            <a href="#dicas" style={{ textDecoration: 'none', color: '#c9d0ca' }}>
              Dicas
            </a>
            <Link href="/metodologia/" style={{ textDecoration: 'none', color: '#c9d0ca' }}>
              Como a gente mede
            </Link>
          </nav>
          <a href="#bancada" style={{ display: 'inline-flex', alignItems: 'center', height: '44px', padding: '0 20px', borderRadius: '22px', border: '1px solid rgba(255,255,255,.18)', textDecoration: 'none', fontSize: '15px', fontWeight: '600', color: '#eef2ee' }}>
            Fazer a conta
          </a>
        </header>
        <div style={{ position: 'absolute', left: '96px', top: '190px', width: '640px', display: 'flex', flexDirection: 'column' }}>
          <p style={{ margin: '0', fontFamily: 'var(--fm)', fontSize: '12px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9dff3b', animation: 'el-sobe .8s cubic-bezier(.2,.7,.2,1) both' }}>
            Montar PC · Ferramenta nº 01
          </p>
          <h1 style={{ margin: '22px 0 0', fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '150px', lineHeight: '.86', letterSpacing: '-.005em', textTransform: 'uppercase', color: '#eef2ee', animation: 'el-sobe .9s cubic-bezier(.2,.7,.2,1) both', animationDelay: '80ms' }}>
            A conta
            <br />
            que a loja
            <br />
            não faz
            <span style={{ color: '#9dff3b' }}>
              .
            </span>
          </h1>
          <p style={{ margin: '30px 0 0', maxWidth: '470px', fontSize: '19px', lineHeight: '30px', color: '#b9c1bb', animation: 'el-sobe .9s cubic-bezier(.2,.7,.2,1) both', animationDelay: '180ms' }}>
            Escolhe a placa de vídeo e o processador. O Elphy soma cada watt — e te entrega a nota com a conta inteira à vista.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '26px', marginTop: '34px', animation: 'el-sobe .9s cubic-bezier(.2,.7,.2,1) both', animationDelay: '260ms' }}>
            <a href="#bancada" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', height: '60px', padding: '0 30px', borderRadius: '30px', background: '#9dff3b', color: '#07110a', textDecoration: 'none', fontWeight: '700', fontSize: '17px', boxShadow: '0 14px 40px rgba(157,255,59,.25)' }}>
              Fazer a conta
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#07110a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="#conta" style={{ fontSize: '16px', fontWeight: '600', color: '#eef2ee', textUnderlineOffset: '6px' }}>
              Como a conta é feita
            </a>
          </div>
          <div style={{ display: 'flex', gap: '22px', marginTop: '40px', fontFamily: 'var(--fm)', fontSize: '11px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#9aa39c', animation: 'el-sobe .9s cubic-bezier(.2,.7,.2,1) both', animationDelay: '340ms' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <i style={{ display: 'block', width: '5px', height: '5px', background: '#9dff3b' }}>
              </i>
              Sem cadastro
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <i style={{ display: 'block', width: '5px', height: '5px', background: '#9dff3b' }}>
              </i>
              Duas escolhas
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <i style={{ display: 'block', width: '5px', height: '5px', background: '#9dff3b' }}>
              </i>
              A conta inteira
            </span>
          </div>
        </div>
      </section>
      {/* ============ LETREIRO ============ */}
      <div aria-label="Consumo máximo de cada placa de vídeo" style={{ height: '64px', boxSizing: 'border-box', borderTop: '1px solid rgba(255,255,255,.08)', borderBottom: '1px solid rgba(255,255,255,.08)', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexShrink: '0', whiteSpace: 'nowrap', animation: 'el-ticker 44s linear infinite' }}>
          {letreiro.map((t, i) => (
            <Fragment key={i}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '0 0 0 28px', fontFamily: 'var(--fm)', fontSize: '13px', letterSpacing: '.08em', textTransform: 'uppercase', color: '#9aa39c' }}>
                {t.curto}
                <b style={{ fontWeight: '500', color: '#9dff3b' }}>
                  {t.w} W
                </b>
                <i style={{ fontStyle: 'normal', color: '#3a423c', marginLeft: '16px' }}>
                  /
                </i>
              </span>
            </Fragment>
          ))}
        </div>
      </div>
      {/* ============ BANCADA (interativa) ============ */}
      <section id="bancada" style={{ position: 'relative', height: '1000px', boxSizing: 'border-box', padding: '110px 96px 0', display: 'flex', gap: '56px' }}>
        <div style={{ width: '608px', flexShrink: '0', display: 'flex', flexDirection: 'column' }}>
          <p style={{ margin: '0', fontFamily: 'var(--fm)', fontSize: '12px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9dff3b' }}>
            Nº 01 — A bancada
          </p>
          <h2 style={{ margin: '18px 0 0', fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '112px', lineHeight: '.88', textTransform: 'uppercase', color: '#eef2ee' }}>
            Fazer a conta
            <span style={{ color: '#9dff3b' }}>
              .
            </span>
          </h2>
          <p style={{ margin: '20px 0 0', maxWidth: '520px', fontSize: '17px', lineHeight: '27px', color: '#b9c1bb' }}>
            Toca na placa e no processador. A nota sai na hora — cada linha é uma peça, e a soma fica embaixo, onde a loja nunca mostra.
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '44px' }}>
            <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9aa39c' }}>
              01 — Placa de vídeo
            </span>
            <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', letterSpacing: '.06em', color: '#9dff3b' }}>
              {gpuCurto} · {tgp} W
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: '8px', marginTop: '14px' }}>
            {gpuChips.map((g, i) => (
              <Fragment key={i}>
                <button type="button" className="dz-chip" onClick={g.pick} aria-pressed={g.on} style={{ height: '64px', boxSizing: 'border-box', padding: '10px 12px', borderRadius: '14px', border: `1px solid ${g.bd}`, background: g.bg, boxShadow: g.sh, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', textAlign: 'left', transition: 'background .18s ease, box-shadow .18s ease, border-color .18s ease' }}>
                  <span style={{ fontFamily: 'var(--fb)', fontWeight: '700', fontSize: '14px', lineHeight: '16px', color: g.fg }}>
                    {g.curto}
                  </span>
                  <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: g.fg2 }}>
                    {g.w} W
                  </span>
                </button>
              </Fragment>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '32px' }}>
            <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9aa39c' }}>
              02 — Processador
            </span>
            <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', letterSpacing: '.06em', color: '#9dff3b' }}>
              {cpuCurto} · {ppt} W
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '8px', marginTop: '14px' }}>
            {cpuChips.map((c, i) => (
              <Fragment key={i}>
                <button type="button" className="dz-chip" onClick={c.pick} aria-pressed={c.on} style={{ height: '64px', boxSizing: 'border-box', padding: '10px 12px', borderRadius: '14px', border: `1px solid ${c.bd}`, background: c.bg, boxShadow: c.sh, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', textAlign: 'left', transition: 'background .18s ease, box-shadow .18s ease, border-color .18s ease' }}>
                  <span style={{ fontFamily: 'var(--fb)', fontWeight: '700', fontSize: '14px', lineHeight: '16px', color: c.fg }}>
                    {c.curto}
                  </span>
                  <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: c.fg2 }}>
                    {c.w} W
                  </span>
                </button>
              </Fragment>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '36px' }}>
            <button type="button" onClick={mandar} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', height: '56px', padding: '0 26px', border: '0', borderRadius: '28px', background: '#9dff3b', color: '#07110a', fontFamily: 'var(--fb)', fontWeight: '700', fontSize: '16px' }}>
              {mandarTexto}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#07110a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v13" />
              </svg>
            </button>
            <button type="button" onClick={reimprimir} style={{ height: '56px', padding: '0 22px', border: '1px solid rgba(255,255,255,.18)', borderRadius: '28px', background: 'transparent', color: '#eef2ee', fontFamily: 'var(--fb)', fontWeight: '600', fontSize: '16px' }}>
              Imprimir de novo
            </button>
          </div>
        </div>
        <div style={{ position: 'relative', width: '584px', height: '890px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div aria-hidden="true" style={{ position: 'absolute', left: '-80px', top: '60px', width: '744px', height: '760px', background: 'radial-gradient(ellipse 48% 46% at 50% 52%, rgba(157,255,59,.5), rgba(157,255,59,0) 72%)', opacity: brilho, transition: 'opacity .6s ease' }}>
          </div>
          <div style={{ position: 'relative', zIndex: '3', width: '452px', height: '32px', boxSizing: 'border-box', padding: '0 18px', borderRadius: '16px', background: 'linear-gradient(180deg, #1c2226, #0d1013)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.09), 0 12px 30px rgba(0,0,0,.6)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'var(--fm)', fontSize: '9.5px', letterSpacing: '.16em', textTransform: 'uppercase' }}>
            <span style={{ color: '#8d958f' }}>
              Elphy · impressora de contas
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#9dff3b' }}>
              <i style={{ display: 'block', width: '7px', height: '7px', borderRadius: '50%', background: '#9dff3b', boxShadow: '0 0 10px #9dff3b', animation: 'el-pulso 1.6s ease-in-out infinite' }}>
              </i>
              Ao vivo
            </span>
          </div>
          <div aria-hidden="true" style={{ position: 'relative', zIndex: '3', width: '424px', height: '6px', marginTop: '-4px', borderRadius: '3px', background: '#020303' }}>
          </div>
          {impresso && (
            <>
              <div style={{ position: 'relative', zIndex: '2', marginTop: '-8px', transform: 'rotate(-1.6deg)', transformOrigin: '50% 0' }}>
                <div style={{ position: 'relative', width: '404px', background: '#f3f1ea', color: '#111311', fontFamily: 'var(--fm)', fontSize: '11.5px', lineHeight: '18px', boxShadow: '0 44px 80px rgba(0,0,0,.55), 0 2px 0 rgba(0,0,0,.25)', animation: 'el-imprime .6s cubic-bezier(.2,.7,.3,1) backwards' }}>
                  <div aria-hidden="true" style={{ position: 'absolute', left: '0', bottom: '-10px', width: '404px', height: '10px', background: 'linear-gradient(45deg, #f3f1ea 50%, rgba(243,241,234,0) 50%) 0 0 / 12px 10px repeat-x, linear-gradient(-45deg, #f3f1ea 50%, rgba(243,241,234,0) 50%) 0 0 / 12px 10px repeat-x', transform: 'scaleY(-1)' }}>
                  </div>
                  <svg aria-hidden="true" width="404" height="100%" style={{ position: 'absolute', left: '0', top: '0', height: '100%', opacity: '.1', mixBlendMode: 'multiply', pointerEvents: 'none' }}>
                    <filter id="papel-main">
                      <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" />
                      <feColorMatrix type="saturate" values="0" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#papel-main)" />
                  </svg>
                  <div style={{ position: 'relative', padding: '26px 30px 30px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', animation: 'el-linha .3s ease-out both', animationDelay: '80ms' }}>
                      <span style={{ fontFamily: 'var(--fb)', fontWeight: '800', fontSize: '24px', letterSpacing: '-.045em' }}>
                        elphy.
                      </span>
                      <span style={{ fontWeight: '700' }}>
                        Nº {numero}
                      </span>
                    </div>
                    <div style={{ marginTop: '8px', letterSpacing: '.1em', textTransform: 'uppercase', animation: 'el-linha .3s ease-out both', animationDelay: '120ms' }}>
                      Cupom de consumo · Montar PC
                    </div>
                    <div style={{ color: '#5b5f58', animation: 'el-linha .3s ease-out both', animationDelay: '150ms' }}>
                      {data}
                    </div>
                    <div style={{ margin: '14px 0', borderTop: '1.5px dashed rgba(17,19,17,.4)' }}>
                    </div>
                    <div style={{ animation: 'el-linha .3s ease-out both', animationDelay: '200ms' }}>
                      <div style={{ fontSize: '9.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#5b5f58' }}>
                        Placa de vídeo
                      </div>
                      <div style={{ display: 'flex', alignItems: 'baseline' }}>
                        <span>
                          {gpuNome}
                        </span>
                        <span style={{ flex: '1', margin: '0 6px 4px', borderBottom: '1.5px dotted rgba(17,19,17,.45)' }}>
                        </span>
                        <b>
                          {tgp} W
                        </b>
                      </div>
                    </div>
                    <div style={{ marginTop: '10px', animation: 'el-linha .3s ease-out both', animationDelay: '260ms' }}>
                      <div style={{ fontSize: '9.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#5b5f58' }}>
                        Processador
                      </div>
                      <div style={{ display: 'flex', alignItems: 'baseline' }}>
                        <span>
                          {cpuNome}
                        </span>
                        <span style={{ flex: '1', margin: '0 6px 4px', borderBottom: '1.5px dotted rgba(17,19,17,.45)' }}>
                        </span>
                        <b>
                          {ppt} W
                        </b>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '10px', animation: 'el-linha .3s ease-out both', animationDelay: '320ms' }}>
                      <span>
                        Placa-mãe, memória, SSD
                      </span>
                      <span style={{ flex: '1', margin: '0 6px 4px', borderBottom: '1.5px dotted rgba(17,19,17,.45)' }}>
                      </span>
                      <b>
                        60 W
                      </b>
                    </div>
                    <div style={{ margin: '14px 0', borderTop: '1.5px dashed rgba(17,19,17,.4)' }}>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', animation: 'el-linha .3s ease-out both', animationDelay: '380ms' }}>
                      <span>
                        Consumo em carga
                      </span>
                      <span style={{ flex: '1', margin: '0 6px 4px', borderBottom: '1.5px dotted rgba(17,19,17,.45)' }}>
                      </span>
                      <b>
                        {consumo} W
                      </b>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '4px', animation: 'el-linha .3s ease-out both', animationDelay: '430ms' }}>
                      <span>
                        Folga para picos (+30%)
                      </span>
                      <span style={{ flex: '1', margin: '0 6px 4px', borderBottom: '1.5px dotted rgba(17,19,17,.45)' }}>
                      </span>
                      <b>
                        {folga} W
                      </b>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '4px', animation: 'el-linha .3s ease-out both', animationDelay: '480ms' }}>
                      <span style={{ fontWeight: '700' }}>
                        Total com folga
                      </span>
                      <span style={{ flex: '1', margin: '0 6px 4px', borderBottom: '1.5px dotted rgba(17,19,17,.45)' }}>
                      </span>
                      <b>
                        {comFolga} W
                      </b>
                    </div>
                    <div style={{ marginTop: '16px', animation: 'el-linha .3s ease-out both', animationDelay: '540ms' }}>
                      <div style={{ position: 'relative', display: 'flex', height: '16px', boxSizing: 'border-box', border: '1.5px solid #111311' }}>
                        <i style={{ display: 'block', width: pctConsumo, background: '#111311' }}>
                        </i>
                        <i style={{ display: 'block', width: pctFolga, background: 'repeating-linear-gradient(135deg, #111311 0 2px, rgba(17,19,17,0) 2px 5px)' }}>
                        </i>
                        <i style={{ position: 'absolute', top: '-7px', left: pctRec, width: '2px', height: '28px', marginLeft: '-1px', background: '#111311' }}>
                        </i>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '9.5px', color: '#5b5f58' }}>
                        <span>
                          0
                        </span>
                        <span>
                          300
                        </span>
                        <span>
                          600
                        </span>
                        <span>
                          900
                        </span>
                        <span>
                          1200 W
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '14px', marginTop: '6px', fontSize: '9.5px', color: '#5b5f58' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                          <i style={{ display: 'block', width: '9px', height: '9px', background: '#111311' }}>
                          </i>
                          consumo
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                          <i style={{ display: 'block', width: '9px', height: '9px', boxSizing: 'border-box', border: '1px solid #111311', background: 'repeating-linear-gradient(135deg, #111311 0 1.5px, rgba(17,19,17,0) 1.5px 3.5px)' }}>
                          </i>
                          folga
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                          <i style={{ display: 'block', width: '2px', height: '11px', background: '#111311' }}>
                          </i>
                          fonte
                        </span>
                      </div>
                    </div>
                    <div style={{ marginTop: '16px', borderTop: '3px double #111311' }}>
                    </div>
                    <div style={{ padding: '14px 0 10px', animation: 'el-linha .3s ease-out both', animationDelay: '620ms' }}>
                      <div style={{ fontSize: '9.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#5b5f58' }}>
                        Fonte recomendada
                      </div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '4px', fontFamily: 'var(--fd)', fontWeight: '900', lineHeight: '.84', color: '#111311' }}>
                        <span style={{ fontSize: '104px' }}>
                          {mostrado}
                        </span>
                        <span style={{ fontSize: '40px' }}>
                          W
                        </span>
                      </div>
                      <div style={{ marginTop: '8px', fontSize: '10.5px', color: '#5b5f58' }}>
                        Degrau comercial logo acima de {comFolga} W.
                      </div>
                    </div>
                    <div style={{ borderTop: '3px double #111311' }}>
                    </div>
                    <div style={{ marginTop: '14px', animation: 'el-linha .3s ease-out both', animationDelay: '700ms' }}>
                      <div style={{ fontSize: '10.5px', lineHeight: '16px', color: '#3f433d' }}>
                        Só listamos fonte com relatório de teste público. Watt escrito na caixa não conta.
                      </div>
                      <div style={{ marginTop: '6px', fontSize: '9.5px', lineHeight: '14px', color: '#5b5f58' }}>
                        Estimativa pela fórmula da metodologia. Não garante compatibilidade.
                      </div>
                      <div aria-hidden="true" style={{ display: 'flex', height: '38px', marginTop: '12px' }}>
                        {barras.map((b, i) => (
                          <Fragment key={i}>
                            <i style={{ display: 'block', width: `${b.w}px`, background: b.c }}>
                            </i>
                          </Fragment>
                        ))}
                      </div>
                      <div style={{ marginTop: '6px', fontSize: '9.5px', letterSpacing: '.14em', color: '#5b5f58' }}>
                        {codigo}
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ position: 'absolute', right: '-40px', bottom: '170px', width: '148px', height: '148px', borderRadius: '50%', background: '#9dff3b', color: '#07110a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', outline: '1.5px dashed rgba(7,17,10,.35)', outlineOffset: '-11px', boxShadow: '0 18px 40px rgba(0,0,0,.45)', transform: 'rotate(12deg)', animation: 'el-carimba .44s cubic-bezier(.2,1.3,.4,1) both', animationDelay: '820ms' }}>
                  <span style={{ fontFamily: 'var(--fm)', fontSize: '9.5px', letterSpacing: '.18em', textTransform: 'uppercase' }}>
                    Sua fonte
                  </span>
                  <span style={{ fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '64px', lineHeight: '.86' }}>
                    {rec}
                  </span>
                  <span style={{ fontFamily: 'var(--fm)', fontSize: '9.5px', letterSpacing: '.18em', textTransform: 'uppercase' }}>
                    watts
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
      {/* ============ A CONTA ABERTA ============ */}
      <section id="conta" style={{ height: '720px', boxSizing: 'border-box', padding: '110px 96px 0', borderTop: '1px solid rgba(255,255,255,.08)' }}>
        <p style={{ margin: '0', fontFamily: 'var(--fm)', fontSize: '12px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9dff3b' }}>
          Nº 02 — A conta aberta
        </p>
        <h2 style={{ margin: '18px 0 0', fontFamily: 'var(--fd)', fontWeight: '800', fontSize: '72px', lineHeight: '.92', textTransform: 'uppercase', color: '#eef2ee' }}>
          Toda calculadora te dá o {rec}.
          <br />
          <span style={{ color: '#9aa39c' }}>
            Aqui você vê de onde ele saiu.
          </span>
        </h2>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '32px', marginTop: '64px', fontFamily: 'var(--fd)', fontWeight: '800', lineHeight: '.9' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <span style={{ fontSize: '140px', color: '#eef2ee' }}>
              {tgp}
            </span>
            <span style={{ fontFamily: 'var(--fm)', fontWeight: '400', fontSize: '11px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#9aa39c' }}>
              TGP · {gpuCurto}
            </span>
          </div>
          <span style={{ fontSize: '100px', color: '#4a524c', paddingTop: '18px' }}>
            +
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <span style={{ fontSize: '140px', color: '#eef2ee' }}>
              {ppt}
            </span>
            <span style={{ fontFamily: 'var(--fm)', fontWeight: '400', fontSize: '11px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#9aa39c' }}>
              PPT · {cpuCurto}
            </span>
          </div>
          <span style={{ fontSize: '100px', color: '#4a524c', paddingTop: '18px' }}>
            +
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <span style={{ fontSize: '140px', color: '#eef2ee' }}>
              60
            </span>
            <span style={{ fontFamily: 'var(--fm)', fontWeight: '400', fontSize: '11px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#9aa39c' }}>
              Placa-mãe, memória, SSD
            </span>
          </div>
          <span style={{ fontSize: '100px', color: '#4a524c', paddingTop: '18px' }}>
            =
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <span style={{ fontSize: '140px', color: '#eef2ee' }}>
              {consumo}
            </span>
            <span style={{ fontFamily: 'var(--fm)', fontWeight: '400', fontSize: '11px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#9aa39c' }}>
              Consumo em carga
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '32px', marginTop: '36px', fontFamily: 'var(--fd)', fontWeight: '800', lineHeight: '.9' }}>
          <span style={{ fontSize: '100px', color: '#4a524c', paddingTop: '18px' }}>
            ×
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <span style={{ fontSize: '140px', color: '#eef2ee' }}>
              1,3
            </span>
            <span style={{ fontFamily: 'var(--fm)', fontWeight: '400', fontSize: '11px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#9aa39c' }}>
              Folga para picos
            </span>
          </div>
          <span style={{ fontSize: '100px', color: '#4a524c', paddingTop: '18px' }}>
            =
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <span style={{ fontSize: '140px', color: '#ffb020' }}>
              {comFolga}
            </span>
            <span style={{ fontFamily: 'var(--fm)', fontWeight: '400', fontSize: '11px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#9aa39c' }}>
              Com folga
            </span>
          </div>
          <svg width="88" height="60" viewBox="0 0 88 60" fill="none" stroke="#4a524c" strokeWidth="7" strokeLinecap="square" aria-label="arredonda para" style={{ marginTop: '44px' }}>
            <path d="M4 30h70M54 10l20 20-20 20" />
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <span style={{ fontSize: '140px', color: '#9dff3b' }}>
              {rec} W
            </span>
            <span style={{ fontFamily: 'var(--fm)', fontWeight: '400', fontSize: '11px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#9aa39c' }}>
              Degrau comercial acima
            </span>
          </div>
        </div>
      </section>
      {/* ============ O SELO ============ */}
      <section id="selo" style={{ height: '760px', boxSizing: 'border-box', padding: '110px 96px 0', background: '#f3f1ea', color: '#111311' }}>
        <p style={{ margin: '0', fontFamily: 'var(--fm)', fontSize: '12px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#5b5f58' }}>
          Nº 03 — O selo
        </p>
        <h2 style={{ margin: '18px 0 0', fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '104px', lineHeight: '.88', textTransform: 'uppercase' }}>
          80 Plus mede eficiência.
          <br />
          Não mede proteção.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '48px', marginTop: '56px' }}>
          <div>
            <div style={{ paddingBottom: '12px', borderBottom: '2px solid #111311', fontFamily: 'var(--fm)', fontSize: '11px', letterSpacing: '.16em', textTransform: 'uppercase' }}>
              O que o selo mede
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '56px', borderBottom: '1px solid rgba(17,19,17,.16)' }}>
              <span style={{ fontSize: '19px', fontWeight: '600' }}>
                Eficiência com 20% de carga
              </span>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111311" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-label="mede">
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '56px', borderBottom: '1px solid rgba(17,19,17,.16)' }}>
              <span style={{ fontSize: '19px', fontWeight: '600' }}>
                Eficiência com 50% de carga
              </span>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111311" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-label="mede">
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '56px', borderBottom: '1px solid rgba(17,19,17,.16)' }}>
              <span style={{ fontSize: '19px', fontWeight: '600' }}>
                Eficiência com 100% de carga
              </span>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111311" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-label="mede">
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
            </div>
          </div>
          <div>
            <div style={{ paddingBottom: '12px', borderBottom: '2px solid #111311', fontFamily: 'var(--fm)', fontSize: '11px', letterSpacing: '.16em', textTransform: 'uppercase' }}>
              O que o selo não mede
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '56px', borderBottom: '1px solid rgba(17,19,17,.16)' }}>
              <span style={{ fontSize: '19px', fontWeight: '600' }}>
                OVP{' '}
                <span style={{ fontWeight: '400', color: '#5b5f58' }}>
                  — sobretensão
                </span>
              </span>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#b8400e" strokeWidth="2.4" strokeLinecap="round" aria-label="não mede">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '56px', borderBottom: '1px solid rgba(17,19,17,.16)' }}>
              <span style={{ fontSize: '19px', fontWeight: '600' }}>
                OCP{' '}
                <span style={{ fontWeight: '400', color: '#5b5f58' }}>
                  — sobrecorrente
                </span>
              </span>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#b8400e" strokeWidth="2.4" strokeLinecap="round" aria-label="não mede">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '56px', borderBottom: '1px solid rgba(17,19,17,.16)' }}>
              <span style={{ fontSize: '19px', fontWeight: '600' }}>
                SCP{' '}
                <span style={{ fontWeight: '400', color: '#5b5f58' }}>
                  — curto-circuito
                </span>
              </span>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#b8400e" strokeWidth="2.4" strokeLinecap="round" aria-label="não mede">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '56px', borderBottom: '1px solid rgba(17,19,17,.16)' }}>
              <span style={{ fontSize: '19px', fontWeight: '600' }}>
                OPP{' '}
                <span style={{ fontWeight: '400', color: '#5b5f58' }}>
                  — sobrepotência
                </span>
              </span>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#b8400e" strokeWidth="2.4" strokeLinecap="round" aria-label="não mede">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px', boxSizing: 'border-box', marginTop: '44px', padding: '0 30px', borderRadius: '16px', background: '#111311', color: '#eef2ee' }}>
          <span style={{ fontSize: '18px', fontWeight: '600' }}>
            Por isso só entra no Elphy a fonte com relatório de teste que dá para abrir e ler.
          </span>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#9dff3b" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </div>
      </section>
      {/* ============ DICAS ============ */}
      <section id="dicas" style={{ height: '720px', boxSizing: 'border-box', padding: '110px 96px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <p style={{ margin: '0', fontFamily: 'var(--fm)', fontSize: '12px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9dff3b' }}>
              Nº 04 — Dicas
            </p>
            <h2 style={{ margin: '18px 0 0', fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '88px', lineHeight: '.9', textTransform: 'uppercase' }}>
              Dicas que cabem numa conta.
            </h2>
          </div>
          <Link href="/dicas/" style={{ fontSize: '16px', fontWeight: '600', textUnderlineOffset: '6px', paddingBottom: '8px' }}>
            Ver todas
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '24px', marginTop: '48px' }}>
          <Link href="/dicas/rtx-5070-250w/" className="dz-card" style={{ display: 'flex', flexDirection: 'column', height: '420px', borderRadius: '22px', overflow: 'hidden', border: '1px solid rgba(255,255,255,.08)', background: '#0a0d0f', textDecoration: 'none', color: '#eef2ee' }}>
            <div style={{ position: 'relative', height: '260px', boxSizing: 'border-box', padding: '22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'radial-gradient(ellipse 70% 70% at 30% 100%, rgba(157,255,59,.18), rgba(157,255,59,0) 70%), #0d1013' }}>
              <span style={{ alignSelf: 'flex-start', padding: '6px 10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,.14)', fontFamily: 'var(--fm)', fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: '#c9d0ca' }}>
                RTX 5070
              </span>
              <span style={{ fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '132px', lineHeight: '.8', color: '#9dff3b' }}>
                250 W
              </span>
            </div>
            <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span className="dz-card-t" style={{ fontSize: '21px', lineHeight: '27px', fontWeight: '700', transition: 'color .2s ease' }}>
                A RTX 5070 puxa 250 W. A caixa não conta o resto.
              </span>
              <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: '#9aa39c' }}>
                4 min · Montar PC
              </span>
            </div>
          </Link>
          <Link href={linkDica("folga-30")} className="dz-card" style={{ display: 'flex', flexDirection: 'column', height: '420px', borderRadius: '22px', overflow: 'hidden', border: '1px solid rgba(255,255,255,.08)', background: '#0a0d0f', textDecoration: 'none', color: '#eef2ee' }}>
            <div style={{ position: 'relative', height: '260px', boxSizing: 'border-box', padding: '22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#f3f1ea', color: '#111311', fontFamily: 'var(--fm)', fontSize: '11px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', color: '#3f433d' }}>
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
                <span style={{ borderTop: '1.5px dashed rgba(17,19,17,.4)', marginTop: '4px' }}>
                </span>
              </div>
              <span style={{ fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '132px', lineHeight: '.8' }}>
                ×1,3
              </span>
            </div>
            <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span className="dz-card-t" style={{ fontSize: '21px', lineHeight: '27px', fontWeight: '700', transition: 'color .2s ease' }}>
                A conta arredonda para cima. O pico da placa explica.
              </span>
              <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: '#9aa39c' }}>
                3 min · Montar PC
              </span>
            </div>
          </Link>
          <Link href={linkDica("selo-80-plus")} className="dz-card" style={{ display: 'flex', flexDirection: 'column', height: '420px', borderRadius: '22px', overflow: 'hidden', border: '1px solid rgba(255,255,255,.08)', background: '#0a0d0f', textDecoration: 'none', color: '#eef2ee' }}>
            <div style={{ position: 'relative', height: '260px', boxSizing: 'border-box', padding: '22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#111418' }}>
              <div style={{ display: 'flex', gap: '8px', fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.1em', textTransform: 'uppercase' }}>
                <span style={{ padding: '6px 10px', borderRadius: '8px', background: '#9dff3b', color: '#07110a' }}>
                  Eficiência
                </span>
                <span style={{ padding: '6px 10px', borderRadius: '8px', border: '1px dashed rgba(255,176,32,.7)', color: '#ffb020' }}>
                  Proteção?
                </span>
              </div>
              <span style={{ fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '132px', lineHeight: '.8', color: 'transparent', WebkitTextStroke: '2px #eef2ee' }}>
                80 Plus
              </span>
            </div>
            <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span className="dz-card-t" style={{ fontSize: '21px', lineHeight: '27px', fontWeight: '700', transition: 'color .2s ease' }}>
                O selo 80 Plus mede eficiência. Proteção fica de fora.
              </span>
              <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: '#9aa39c' }}>
                5 min · Fontes
              </span>
            </div>
          </Link>
        </div>
      </section>
      {/* ============ PRO ============ */}
      <section style={{ height: '360px', boxSizing: 'border-box', padding: '60px 96px' }}>
        <div style={{ height: '240px', boxSizing: 'border-box', padding: '0 56px', borderRadius: '28px', border: '1px solid rgba(157,255,59,.3)', background: 'radial-gradient(ellipse 60% 130% at 0% 0%, rgba(157,255,59,.11), rgba(157,255,59,0) 60%), #0a0d0f', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '48px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9dff3b' }}>
              Elphy Pro · em breve
            </span>
            <span style={{ marginTop: '12px', fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '68px', lineHeight: '.9', textTransform: 'uppercase' }}>
              O PC inteiro, peça por peça.
            </span>
            <span style={{ marginTop: '12px', maxWidth: '600px', fontSize: '16px', lineHeight: '25px', color: '#b9c1bb' }}>
              Gabinete, cooler, memória e fonte — cada peça com a sua conta, e a nota completa do PC para mandar para quem vai montar.
            </span>
          </div>
          {/* lista de espera do Pro: volta quando houver para onde mandar o e-mail */}
        </div>
      </section>
      {/* ============ RODAPÉ ============ */}
      <footer style={{ position: 'relative', height: '620px', boxSizing: 'border-box', padding: '80px 96px 0', borderTop: '1px solid rgba(255,255,255,.08)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '44px', lineHeight: '.9', textTransform: 'uppercase' }}>
              Dica sem caô
              <span style={{ color: '#9dff3b' }}>
                .
              </span>
            </span>
            <span style={{ maxWidth: '360px', fontSize: '15px', lineHeight: '23px', color: '#9aa39c' }}>
              Ferramentas que mostram a conta inteira, para você comprar peça sabendo o que está comprando.
            </span>
            <span style={{ maxWidth: '360px', marginTop: '6px', fontFamily: 'var(--fm)', fontSize: '10.5px', lineHeight: '17px', letterSpacing: '.04em', color: '#9aa39c' }}>
              © 2026 Elphy. Links de loja podem render comissão para o Elphy. O preço para você não muda.
            </span>
          </div>
          <div style={{ display: 'flex', gap: '80px', fontSize: '15px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#9aa39c' }}>
                Ferramentas
              </span>
              <a href="#bancada" style={{ textDecoration: 'none' }}>
                Fazer a conta
              </a>
              <Link href="/ferramentas/gabinete/" style={{ textDecoration: 'none' }}>
                Cabe no gabinete?
              </Link>
              <span style={{ color: '#6a726c' }}>
                Dois pentes ou um? · em breve
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#9aa39c' }}>
                Elphy
              </span>
              <Link href="/metodologia/" style={{ textDecoration: 'none' }}>
                Como a gente mede
              </Link>
              <Link href="/legal/#afiliado" style={{ textDecoration: 'none' }}>
                Como ganhamos dinheiro
              </Link>
              <Link href="/legal/" style={{ textDecoration: 'none' }}>
                Privacidade
              </Link>
            </div>
          </div>
        </div>
        <div aria-hidden="true" style={{ position: 'absolute', left: '82px', bottom: '30px', fontWeight: '800', fontSize: '380px', lineHeight: '.78', letterSpacing: '-.07em', color: '#eef2ee' }}>
          elphy
          <span style={{ color: '#9dff3b' }}>
            .
          </span>
        </div>
      </footer>
    </div>
  );
}
