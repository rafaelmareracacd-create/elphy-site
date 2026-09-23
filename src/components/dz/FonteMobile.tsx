"use client";

import Link from "next/link";
import { Fragment } from "react";
import MenuBotao from "./Menu";
import { useNotaFonte } from "./useNotaFonte";

/* Transcrito de docs/design-1.0/Ferramenta-Mobile.dc.html */
export default function FonteMobile() {
  const v = useNotaFonte({ gpu: "rtx-5070", cpu: "r5-7600" }, 40, "r5-7600");
  const { gpuResumo, cpuResumo, gpuChips, cpuChips, brilho, ledCor, ledTexto, vazio, impresso, numero, data, gpuNome, tgp, cpuNome, ppt, consumo, folga, comFolga, pctConsumo, pctFolga, pctRec, mostrado, rec, codigo, barras, refazer } = v;
  const pronto = !vazio;
  const mandarTexto = !pronto ? "Escolhe as duas peças" : v.enviado ? "Abrindo o WhatsApp" : "Mandar a nota no WhatsApp";
  const mandarFundo = pronto ? "#9dff3b" : "#1a1f23";
  const mandarCor = pronto ? "#07110a" : "#9aa39c";
  const mandarSombra = pronto ? "0 14px 40px rgba(157,255,59,.25)" : "none";
  const mandar = v.whatsapp;
  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '1840px', overflow: 'hidden', background: '#050607', color: '#eef2ee', fontFamily: 'var(--fb)' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px', boxSizing: 'border-box', padding: '0 24px', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
        <Link href="/" style={{ fontWeight: '800', fontSize: '24px', letterSpacing: '-.045em', textDecoration: 'none', color: '#eef2ee' }}>
          elphy
          <span style={{ color: '#9dff3b' }}>
            .
          </span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#c9d0ca' }}>
            <i style={{ display: 'block', width: '6px', height: '6px', borderRadius: '50%', background: '#9dff3b', boxShadow: '0 0 8px #9dff3b', animation: 'el-pulso 1.8s ease-in-out infinite' }}>
            </i>
            Montar PC
          </span>
          <MenuBotao style={{ width: '44px', height: '44px', border: '1px solid rgba(255,255,255,.14)', borderRadius: '22px', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#eef2ee" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 8h16M4 16h16" />
            </svg>
          </MenuBotao>
        </div>
      </header>
      <div style={{ padding: '28px 24px 0' }}>
        <p style={{ margin: '0', fontFamily: 'var(--fm)', fontSize: '11px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9dff3b' }}>
          Ferramenta nº 01
        </p>
        <h1 style={{ margin: '14px 0 0', fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '78px', lineHeight: '.86', textTransform: 'uppercase' }}>
          Fazer
          <br />
          a conta
          <span style={{ color: '#9dff3b' }}>
            .
          </span>
        </h1>
        <p style={{ margin: '14px 0 0', fontSize: '16px', lineHeight: '24px', color: '#b9c1bb' }}>
          Toca na placa e no processador. A nota sai na hora, com a soma inteira.
        </p>
      </div>
      <div style={{ padding: '34px 24px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9aa39c' }}>
            01 — Placa de vídeo
          </span>
          <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', color: '#9dff3b' }}>
            {gpuResumo}
          </span>
        </div>
      </div>
      <div className="dz-rolo" style={{ overflowX: 'auto', marginTop: '12px' }}>
        <div style={{ display: 'flex', gap: '8px', padding: '0 24px', width: 'max-content' }}>
          {gpuChips.map((g, i) => (
            <Fragment key={i}>
              <button type="button" onClick={g.pick} aria-pressed={g.on} style={{ width: '116px', height: '64px', flexShrink: '0', boxSizing: 'border-box', padding: '10px 12px', borderRadius: '14px', border: `1px solid ${g.bd}`, background: g.bg, boxShadow: g.sh, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', textAlign: 'left', transition: 'background .18s ease, box-shadow .18s ease' }}>
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
      </div>
      <div style={{ padding: '28px 24px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9aa39c' }}>
            02 — Processador
          </span>
          <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', color: '#9dff3b' }}>
            {cpuResumo}
          </span>
        </div>
      </div>
      <div className="dz-rolo" style={{ overflowX: 'auto', marginTop: '12px' }}>
        <div style={{ display: 'flex', gap: '8px', padding: '0 24px', width: 'max-content' }}>
          {cpuChips.map((c, i) => (
            <Fragment key={i}>
              <button type="button" onClick={c.pick} aria-pressed={c.on} style={{ width: '138px', height: '64px', flexShrink: '0', boxSizing: 'border-box', padding: '10px 12px', borderRadius: '14px', border: `1px solid ${c.bd}`, background: c.bg, boxShadow: c.sh, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', textAlign: 'left', transition: 'background .18s ease, box-shadow .18s ease' }}>
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
      </div>
      <div style={{ position: 'relative', marginTop: '40px', padding: '0 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div aria-hidden="true" style={{ position: 'absolute', left: '-60px', top: '40px', width: '510px', height: '640px', background: 'radial-gradient(ellipse 46% 44% at 50% 50%, rgba(157,255,59,.5), rgba(157,255,59,0) 72%)', opacity: brilho, transition: 'opacity .6s ease' }}>
        </div>
        <div style={{ position: 'relative', zIndex: '3', width: '342px', height: '30px', boxSizing: 'border-box', padding: '0 14px', borderRadius: '15px', background: 'linear-gradient(180deg, #1c2226, #0d1013)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.09), 0 12px 30px rgba(0,0,0,.6)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'var(--fm)', fontSize: '9px', letterSpacing: '.14em', textTransform: 'uppercase' }}>
          <span style={{ color: '#8d958f' }}>
            Impressora de contas
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', color: ledCor }}>
            <i style={{ display: 'block', width: '7px', height: '7px', borderRadius: '50%', background: ledCor, boxShadow: `0 0 10px ${ledCor}`, animation: 'el-pulso 1.6s ease-in-out infinite' }}>
            </i>
            {ledTexto}
          </span>
        </div>
        <div aria-hidden="true" style={{ position: 'relative', zIndex: '3', width: '318px', height: '6px', marginTop: '-4px', borderRadius: '3px', background: '#020303' }}>
        </div>
        {vazio && (
          <>
            <div style={{ width: '318px', marginTop: '16px', boxSizing: 'border-box', padding: '26px 22px', border: '1.5px dashed rgba(255,255,255,.16)', borderRadius: '4px', textAlign: 'center', fontFamily: 'var(--fm)', fontSize: '11px', lineHeight: '18px', color: '#9aa39c' }}>
              Escolhe a placa e o processador.
              <br />
              A nota sai aqui.
            </div>
          </>
        )}
        {impresso && (
          <>
            <div style={{ position: 'relative', zIndex: '2', marginTop: '-8px', transform: 'rotate(-1.4deg)', transformOrigin: '50% 0' }}>
              <div style={{ position: 'relative', width: '318px', background: '#f3f1ea', color: '#111311', fontFamily: 'var(--fm)', fontSize: '10.5px', lineHeight: '17px', boxShadow: '0 40px 70px rgba(0,0,0,.55), 0 2px 0 rgba(0,0,0,.25)', animation: 'el-imprime .6s cubic-bezier(.2,.7,.3,1) backwards' }}>
                <div aria-hidden="true" style={{ position: 'absolute', left: '0', bottom: '-10px', width: '318px', height: '10px', background: 'linear-gradient(45deg, #f3f1ea 50%, rgba(243,241,234,0) 50%) 0 0 / 12px 10px repeat-x, linear-gradient(-45deg, #f3f1ea 50%, rgba(243,241,234,0) 50%) 0 0 / 12px 10px repeat-x', transform: 'scaleY(-1)' }}>
                </div>
                <svg aria-hidden="true" width="318" height="100%" style={{ position: 'absolute', left: '0', top: '0', height: '100%', opacity: '.1', mixBlendMode: 'multiply', pointerEvents: 'none' }}>
                  <filter id="papel-fm">
                    <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" />
                    <feColorMatrix type="saturate" values="0" />
                  </filter>
                  <rect width="100%" height="100%" filter="url(#papel-fm)" />
                </svg>
                <div style={{ position: 'relative', padding: '22px 22px 24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', animation: 'el-linha .3s ease-out both', animationDelay: '80ms' }}>
                    <span style={{ fontFamily: 'var(--fb)', fontWeight: '800', fontSize: '21px', letterSpacing: '-.045em' }}>
                      elphy.
                    </span>
                    <span style={{ fontWeight: '700' }}>
                      Nº {numero}
                    </span>
                  </div>
                  <div style={{ marginTop: '6px', letterSpacing: '.08em', textTransform: 'uppercase', animation: 'el-linha .3s ease-out both', animationDelay: '120ms' }}>
                    Cupom de consumo
                  </div>
                  <div style={{ color: '#5b5f58', animation: 'el-linha .3s ease-out both', animationDelay: '150ms' }}>
                    {data}
                  </div>
                  <div style={{ margin: '12px 0', borderTop: '1.5px dashed rgba(17,19,17,.4)' }}>
                  </div>
                  <div style={{ animation: 'el-linha .3s ease-out both', animationDelay: '200ms' }}>
                    <div style={{ fontSize: '9px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#5b5f58' }}>
                      Placa de vídeo
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline' }}>
                      <span>
                        {gpuNome}
                      </span>
                      <span style={{ flex: '1', margin: '0 5px 4px', borderBottom: '1.5px dotted rgba(17,19,17,.45)' }}>
                      </span>
                      <b>
                        {tgp} W
                      </b>
                    </div>
                  </div>
                  <div style={{ marginTop: '8px', animation: 'el-linha .3s ease-out both', animationDelay: '260ms' }}>
                    <div style={{ fontSize: '9px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#5b5f58' }}>
                      Processador
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline' }}>
                      <span>
                        {cpuNome}
                      </span>
                      <span style={{ flex: '1', margin: '0 5px 4px', borderBottom: '1.5px dotted rgba(17,19,17,.45)' }}>
                      </span>
                      <b>
                        {ppt} W
                      </b>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '8px', animation: 'el-linha .3s ease-out both', animationDelay: '320ms' }}>
                    <span>
                      Mãe, memória, SSD
                    </span>
                    <span style={{ flex: '1', margin: '0 5px 4px', borderBottom: '1.5px dotted rgba(17,19,17,.45)' }}>
                    </span>
                    <b>
                      60 W
                    </b>
                  </div>
                  <div style={{ margin: '12px 0', borderTop: '1.5px dashed rgba(17,19,17,.4)' }}>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', animation: 'el-linha .3s ease-out both', animationDelay: '380ms' }}>
                    <span>
                      Consumo em carga
                    </span>
                    <span style={{ flex: '1', margin: '0 5px 4px', borderBottom: '1.5px dotted rgba(17,19,17,.45)' }}>
                    </span>
                    <b>
                      {consumo} W
                    </b>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '3px', animation: 'el-linha .3s ease-out both', animationDelay: '430ms' }}>
                    <span>
                      Folga (+30%)
                    </span>
                    <span style={{ flex: '1', margin: '0 5px 4px', borderBottom: '1.5px dotted rgba(17,19,17,.45)' }}>
                    </span>
                    <b>
                      {folga} W
                    </b>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '3px', animation: 'el-linha .3s ease-out both', animationDelay: '480ms' }}>
                    <span style={{ fontWeight: '700' }}>
                      Total com folga
                    </span>
                    <span style={{ flex: '1', margin: '0 5px 4px', borderBottom: '1.5px dotted rgba(17,19,17,.45)' }}>
                    </span>
                    <b>
                      {comFolga} W
                    </b>
                  </div>
                  <div style={{ marginTop: '14px', animation: 'el-linha .3s ease-out both', animationDelay: '540ms' }}>
                    <div style={{ position: 'relative', display: 'flex', height: '14px', boxSizing: 'border-box', border: '1.5px solid #111311' }}>
                      <i style={{ display: 'block', width: pctConsumo, background: '#111311' }}>
                      </i>
                      <i style={{ display: 'block', width: pctFolga, background: 'repeating-linear-gradient(135deg, #111311 0 2px, rgba(17,19,17,0) 2px 5px)' }}>
                      </i>
                      <i style={{ position: 'absolute', top: '-6px', left: pctRec, width: '2px', height: '24px', marginLeft: '-1px', background: '#111311' }}>
                      </i>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px', fontSize: '9px', color: '#5b5f58' }}>
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
                  </div>
                  <div style={{ marginTop: '14px', borderTop: '3px double #111311' }}>
                  </div>
                  <div style={{ padding: '12px 0 8px', animation: 'el-linha .3s ease-out both', animationDelay: '620ms' }}>
                    <div style={{ fontSize: '9px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#5b5f58' }}>
                      Fonte recomendada
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px', marginTop: '4px', fontFamily: 'var(--fd)', fontWeight: '900', lineHeight: '.84' }}>
                      <span style={{ fontSize: '88px' }}>
                        {mostrado}
                      </span>
                      <span style={{ fontSize: '34px' }}>
                        W
                      </span>
                    </div>
                    <div style={{ marginTop: '8px', fontSize: '10px', color: '#5b5f58' }}>
                      Degrau comercial logo acima de {comFolga} W.
                    </div>
                  </div>
                  <div style={{ borderTop: '3px double #111311' }}>
                  </div>
                  <div style={{ marginTop: '12px', animation: 'el-linha .3s ease-out both', animationDelay: '700ms' }}>
                    <div style={{ fontSize: '10px', lineHeight: '15px', color: '#3f433d' }}>
                      Só listamos fonte com relatório de teste público. Watt escrito na caixa não conta.
                    </div>
                    <div style={{ marginTop: '6px', fontSize: '9.5px', lineHeight: '14px', color: '#5b5f58' }}>
                      Estimativa pela fórmula da metodologia. Não garante compatibilidade.
                    </div>
                    <div aria-hidden="true" style={{ display: 'flex', height: '32px', marginTop: '10px' }}>
                      {barras.map((b, i) => (
                        <Fragment key={i}>
                          <i style={{ display: 'block', width: `${b.w}px`, background: b.c }}>
                          </i>
                        </Fragment>
                      ))}
                    </div>
                    <div style={{ marginTop: '5px', fontSize: '9px', letterSpacing: '.12em', color: '#5b5f58' }}>
                      {codigo}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ position: 'absolute', right: '-22px', bottom: '150px', width: '120px', height: '120px', borderRadius: '50%', background: '#9dff3b', color: '#07110a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', outline: '1.5px dashed rgba(7,17,10,.35)', outlineOffset: '-9px', boxShadow: '0 16px 36px rgba(0,0,0,.45)', transform: 'rotate(12deg)', animation: 'el-carimba .44s cubic-bezier(.2,1.3,.4,1) both', animationDelay: '820ms' }}>
                <span style={{ fontFamily: 'var(--fm)', fontSize: '8.5px', letterSpacing: '.16em', textTransform: 'uppercase' }}>
                  Sua fonte
                </span>
                <span style={{ fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '52px', lineHeight: '.86' }}>
                  {rec}
                </span>
                <span style={{ fontFamily: 'var(--fm)', fontSize: '8.5px', letterSpacing: '.16em', textTransform: 'uppercase' }}>
                  watts
                </span>
              </div>
            </div>
          </>
        )}
      </div>
      <div style={{ padding: '44px 24px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button type="button" onClick={mandar} style={{ height: '58px', border: '0', borderRadius: '29px', background: mandarFundo, color: mandarCor, fontFamily: 'var(--fb)', fontWeight: '700', fontSize: '17px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: mandarSombra }}>
          {mandarTexto}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v13" />
          </svg>
        </button>
        <button type="button" onClick={refazer} style={{ height: '52px', border: '1px solid rgba(255,255,255,.16)', borderRadius: '26px', background: 'transparent', color: '#eef2ee', fontFamily: 'var(--fb)', fontWeight: '600', fontSize: '16px' }}>
          Refazer a conta
        </button>
      </div>
      <div style={{ margin: '28px 24px 0', boxSizing: 'border-box', padding: '20px', borderRadius: '20px', border: '1px solid rgba(255,255,255,.08)', background: '#0a0d0f' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffb020" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="5" y="11" width="14" height="9" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
          <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#ffb020' }}>
            Fontes nessa faixa · em curadoria
          </span>
        </div>
        <p style={{ margin: '12px 0 0', fontSize: '15px', lineHeight: '23px', color: '#c9d0ca' }}>
          Só entra aqui modelo com relatório de teste público, que dá para abrir e ler. Watt escrito na caixa é justamente o que a fonte genérica falsifica.
        </p>
        <Link href="/metodologia/" style={{ display: 'inline-block', marginTop: '12px', fontSize: '15px', fontWeight: '600', textUnderlineOffset: '5px' }}>
          Por que a gente faz assim
        </Link>
      </div>
      <div style={{ marginTop: '40px', padding: '24px', borderTop: '1px solid rgba(255,255,255,.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--fm)', fontSize: '10px', letterSpacing: '.1em', textTransform: 'uppercase', color: '#9aa39c' }}>
        <span>
          Dica sem caô
          <span style={{ color: '#9dff3b' }}>
            .
          </span>
        </span>
        <Link href="/" style={{ color: '#9aa39c' }}>
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}
