"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Fragment } from "react";

import MenuBotao from "./Menu";

/* Transcrito de docs/design-1.0/Legal-Mobile.dc.html */
const ABAS = [["priv", "Privacidade"], ["term", "Termos"], ["afil", "Afiliado"]] as const;
type Aba = (typeof ABAS)[number][0];

export default function Legal() {
  const [aba, setAba] = useState<Aba>("priv");
  // /legal/#afiliado e /legal/#termos abrem direto na aba
  useEffect(() => {
    const le = () => {
      const h = window.location.hash;
      setAba(h === "#afiliado" ? "afil" : h === "#termos" ? "term" : "priv");
    };
    le();
    window.addEventListener("hashchange", le);
    return () => window.removeEventListener("hashchange", le);
  }, []);
  // a aba escolhida vai para o endereço: recarregar ou mandar o link abre nela
  const HASH: Record<Aba, string> = { priv: "", term: "#termos", afil: "#afiliado" };
  const escolhe = (id: Aba) => {
    setAba(id);
    window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search + HASH[id]);
  };
  const abas = ABAS.map(([id, nome]) => {
    const on = aba === id;
    return { id, nome, on, pick: () => escolhe(id), bg: on ? "#9dff3b" : "transparent", fg: on ? "#07110a" : "#eef2ee" };
  });
  const priv = aba === "priv", term = aba === "term", afil = aba === "afil";
  return (
    <div className="dz-col" style={{ position: 'relative', width: '100%', minHeight: '1700px', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#050607', color: '#eef2ee', fontFamily: 'var(--fb)' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px', boxSizing: 'border-box', padding: '0 24px', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
        <Link href="/" style={{ fontWeight: '800', fontSize: '24px', letterSpacing: '-.045em', textDecoration: 'none', color: '#eef2ee' }}>
          elphy
          <span style={{ color: '#9dff3b' }}>
            .
          </span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#c9d0ca' }}>
            Legal
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
          Privacidade · termos · afiliado
        </p>
        <h1 style={{ margin: '14px 0 0', fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '70px', lineHeight: '.86', textTransform: 'uppercase' }}>
          O miúdo,
          <br />
          em letra
          <br />
          grande
          <span style={{ color: '#9dff3b' }}>
            .
          </span>
        </h1>
        <p style={{ margin: '14px 0 0', fontSize: '16px', lineHeight: '24px', color: '#b9c1bb' }}>
          Sem juridiquês onde dá. O que não dá para simplificar fica marcado.
        </p>
      </div>
      <div role="tablist" aria-label="Seções" style={{ display: 'flex', gap: '4px', margin: '28px 24px 0', padding: '4px', borderRadius: '26px', background: '#0d1013', border: '1px solid rgba(255,255,255,.08)' }}>
        {abas.map((a, i) => (
          <Fragment key={i}>
            <button type="button" role="tab" id={`aba-${a.id}`} aria-controls="legal-painel" onClick={a.pick} aria-selected={a.on} style={{ flex: '1', height: '44px', border: '0', borderRadius: '22px', background: a.bg, color: a.fg, font: 'inherit', fontSize: '14px', fontWeight: '700' }}>
              {a.nome}
            </button>
          </Fragment>
        ))}
      </div>
      <div id="legal-painel" role="tabpanel" aria-labelledby={`aba-${aba}`} style={{ padding: '16px 24px 0' }}>
        {priv && (
          <>
            <div>
              <div style={{ padding: '18px 0', borderTop: '1px solid rgba(255,255,255,.08)' }}>
                <h2 style={{ margin: '0', fontSize: '18px', lineHeight: '24px', fontWeight: '800' }}>
                  O que fica no seu aparelho
                </h2>
                <p style={{ margin: '8px 0 0', fontSize: '16px', lineHeight: '26px', color: '#c9d0ca' }}>
                  Tudo o que você escolhe nas ferramentas. A conta roda no navegador e não vai para servidor nenhum.
                </p>
              </div>
              <div style={{ padding: '18px 0', borderTop: '1px solid rgba(255,255,255,.08)' }}>
                <h2 style={{ margin: '0', fontSize: '18px', lineHeight: '24px', fontWeight: '800' }}>
                  O que o Elphy mede
                </h2>
                <p style={{ margin: '8px 0 0', fontSize: '16px', lineHeight: '26px', color: '#c9d0ca' }}>
                  Por enquanto, nada: o site não tem ferramenta de medição nem cookie. Se um dia tiver, entra aqui antes.
                </p>
              </div>
              <div style={{ padding: '18px 0', borderTop: '1px solid rgba(255,255,255,.08)' }}>
                <h2 style={{ margin: '0', fontSize: '18px', lineHeight: '24px', fontWeight: '800' }}>
                  Links da Shopee
                </h2>
                <p style={{ margin: '8px 0 0', fontSize: '16px', lineHeight: '26px', color: '#c9d0ca' }}>
                  Ao clicar num link de loja, a Shopee registra a visita com as regras dela.
                </p>
              </div>
              <div style={{ padding: '18px 0', borderTop: '1px solid rgba(255,255,255,.08)' }}>
                <h2 style={{ margin: '0', fontSize: '18px', lineHeight: '24px', fontWeight: '800' }}>
                  Seus direitos (LGPD)
                </h2>
                <p style={{ margin: '8px 0 0', fontSize: '16px', lineHeight: '26px', color: '#c9d0ca' }}>
                  O Elphy não pede nome, e-mail nem cadastro, e não guarda dado seu em servidor.
                </p>
              </div>
            </div>
          </>
        )}
        {term && (
          <>
            <div>
              <div style={{ padding: '18px 0', borderTop: '1px solid rgba(255,255,255,.08)' }}>
                <h2 style={{ margin: '0', fontSize: '18px', lineHeight: '24px', fontWeight: '800' }}>
                  As contas são estimativas
                </h2>
                <p style={{ margin: '8px 0 0', fontSize: '16px', lineHeight: '26px', color: '#c9d0ca' }}>
                  Cada fórmula está na metodologia. Confira a ficha do fabricante antes de comprar.
                </p>
              </div>
              <div style={{ padding: '18px 0', borderTop: '1px solid rgba(255,255,255,.08)' }}>
                <h2 style={{ margin: '0', fontSize: '18px', lineHeight: '24px', fontWeight: '800' }}>
                  Compatibilidade
                </h2>
                <p style={{ margin: '8px 0 0', fontSize: '16px', lineHeight: '26px', color: '#c9d0ca' }}>
                  O Elphy confere os números que a ficha publica. Revisão de peça, BIOS e montagem ficam fora da conta.
                </p>
              </div>
            </div>
          </>
        )}
        {afil && (
          <>
            <div>
              <div style={{ padding: '18px 0', borderTop: '1px solid rgba(255,255,255,.08)' }}>
                <h2 style={{ margin: '0', fontSize: '18px', lineHeight: '24px', fontWeight: '800' }}>
                  Como o Elphy ganha
                </h2>
                <p style={{ margin: '8px 0 0', fontSize: '16px', lineHeight: '26px', color: '#c9d0ca' }}>
                  Alguns links levam à Shopee com código de afiliado. Se você compra, o Elphy pode receber comissão. O preço para você não muda.
                </p>
              </div>
              <div style={{ padding: '18px 0', borderTop: '1px solid rgba(255,255,255,.08)' }}>
                <h2 style={{ margin: '0', fontSize: '18px', lineHeight: '24px', fontWeight: '800' }}>
                  O que a comissão não compra
                </h2>
                <p style={{ margin: '8px 0 0', fontSize: '16px', lineHeight: '26px', color: '#c9d0ca' }}>
                  Loja nenhuma paga para aparecer, subir na lista ou mudar número de conta.
                </p>
              </div>
              <div style={{ padding: '18px 0', borderTop: '1px solid rgba(255,255,255,.08)' }}>
                <h2 style={{ margin: '0', fontSize: '18px', lineHeight: '24px', fontWeight: '800' }}>
                  Por que não tem preço aqui
                </h2>
                <p style={{ margin: '8px 0 0', fontSize: '16px', lineHeight: '26px', color: '#c9d0ca' }}>
                  Preço muda todo dia. Número velho é número errado.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
      <p style={{ margin: '8px 24px 0', fontFamily: 'var(--fm)', fontSize: '10.5px', color: '#9aa39c' }}>
        Versão de 23/09/2026
      </p>
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
