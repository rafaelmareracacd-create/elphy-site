import Link from "next/link";
import MenuBotao from "./Menu";
import { acharSlot, cpusFonte, gpusFonte, type GpuMontador } from "@/lib/catalogo";
import { fonteRecomendada } from "@/lib/contas";

/* Transcrito de docs/design-1.0/Peca-Mobile.dc.html */
/** placas com ficha: as do catálogo da calculadora, menos "sem placa" */
export const PECAS = gpusFonte.filter((x) => x.id !== "sem-gpu");

export default function PecaMobile({ id }: { id: string }) {
  const g = PECAS.find((x) => x.id === id)!;
  const c = cpusFonte.find((x) => x.id === "r5-7600")!;
  const r = fonteRecomendada(g.w, c.w);
  const [marca, ...modelo] = g.nome.split(" ");
  const m = acharSlot<GpuMontador>("gpu", g.id);
  const shopee = m?.url?.trim();
  // o watt da placa conferido na página oficial (src/data/pc.json: fonte, conferido_em)
  const conferido = g.verificado && g.conferidoEm;
  const data = g.conferidoEm || "a conferir";
  return (
    <div className="dz-col" style={{ position: 'relative', width: '100%', minHeight: '1900px', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#050607', color: '#eef2ee', fontFamily: 'var(--fb)' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px', boxSizing: 'border-box', padding: '0 24px', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
        <Link href="/" style={{ fontWeight: '800', fontSize: '24px', letterSpacing: '-.045em', textDecoration: 'none', color: '#eef2ee' }}>
          elphy
          <span style={{ color: '#9dff3b' }}>
            .
          </span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#c9d0ca' }}>
            PC
          </span>
          <MenuBotao style={{ width: '44px', height: '44px', boxSizing: 'border-box', border: '1px solid rgba(255,255,255,.14)', borderRadius: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#eef2ee" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 8h16M4 16h16" />
            </svg>
          </MenuBotao>
        </div>
      </header>
      <div style={{ padding: '26px 24px 0' }}>
        <nav aria-label="Você está em" style={{ display: 'flex', gap: '8px', fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#9aa39c' }}>
          <Link href="/ferramentas/" style={{ color: '#9aa39c', textDecoration: 'none' }}>
            PC
          </Link>
          <span style={{ color: '#3a423c' }}>
            /
          </span>
          <span style={{ color: '#9dff3b' }}>
            Placas de vídeo
          </span>
        </nav>
        <h1 style={{ margin: '16px 0 0', fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '70px', lineHeight: '.86', textTransform: 'uppercase' }}>
          {marca}
          <br />
          {modelo.join(" ")}
        </h1>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '16px', height: '32px', padding: '0 14px', borderRadius: '16px', border: `1px solid ${conferido ? 'rgba(157,255,59,.45)' : 'rgba(255,176,32,.45)'}`, fontFamily: 'var(--fm)', fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#ffb020' }}>
          <i style={{ display: 'block', width: '6px', height: '6px', borderRadius: '50%', background: conferido ? '#9dff3b' : '#ffb020' }}>
          </i>
          {conferido ? `Conferido em ${g.conferidoEm}` : "Catálogo semente · a conferir"}
        </span>
      </div>
      <div style={{ margin: '26px 24px 0', padding: '22px 0 20px', borderTop: '1px solid rgba(255,255,255,.1)', borderBottom: '1px solid rgba(255,255,255,.1)' }}>
        <div style={{ fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '124px', lineHeight: '.8', color: '#9dff3b' }}>
          {`${g.w} W`}
        </div>
        <div style={{ marginTop: '12px', fontFamily: 'var(--fm)', fontSize: '10.5px', lineHeight: '17px', letterSpacing: '.08em', textTransform: 'uppercase', color: '#9aa39c' }}>
          Consumo máximo da placa (TGP), pela ficha do fabricante
        </div>
      </div>
      <div style={{ padding: '26px 24px 0' }}>
        <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9aa39c' }}>
          Ficha técnica
        </span>
        <div style={{ marginTop: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '16px', padding: '14px 0', borderTop: '1px solid rgba(255,255,255,.08)' }}>
            <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#9aa39c' }}>
              Consumo (TGP)
            </span>
            <span style={{ textAlign: 'right', fontSize: '16px', fontWeight: '700' }}>
              {`${g.w} W`}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '16px', padding: '14px 0', borderTop: '1px solid rgba(255,255,255,.08)' }}>
            <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#9aa39c' }}>
              Fonte que o Elphy calcula
            </span>
            <span style={{ textAlign: 'right', fontSize: '16px', fontWeight: '700' }}>
              {`${r.recomendado} W`}
              <br />
              <span style={{ fontWeight: '400', fontSize: '13px', color: '#9aa39c' }}>
                com Ryzen 5 7600
              </span>
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '16px', padding: '14px 0', borderTop: '1px solid rgba(255,255,255,.08)' }}>
            <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#9aa39c' }}>
              Comprimento
            </span>
            <span style={{ textAlign: 'right', fontSize: '16px', fontWeight: '700' }}>
              Muda por fabricante
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '16px', padding: '14px 0', borderTop: '1px solid rgba(255,255,255,.08)' }}>
            <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#9aa39c' }}>
              Conferido em
            </span>
            <span style={{ textAlign: 'right', fontSize: '16px', fontWeight: '700', color: conferido ? undefined : '#ffb020' }}>
              {data}
            </span>
          </div>
        </div>
      </div>
      <div style={{ padding: '30px 24px 0' }}>
        <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9aa39c' }}>
          Entra nestas contas
        </span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
          <Link href={`/ferramentas/fonte/?gpu=${g.id}&cpu=${c.id}`} style={{ display: 'inline-flex', padding: '0 18px', alignItems: 'center', justifyContent: 'center', gap: '10px', height: '44px', boxSizing: 'border-box', borderRadius: '28px', textDecoration: 'none', fontFamily: 'var(--fb)', fontWeight: '700', fontSize: '14px', marginTop: '0px', background: 'transparent', color: '#eef2ee', border: '1px solid rgba(255,255,255,.16)' }}>
            Fonte
          </Link>
          <Link href={m ? `/montador/?gpu=${g.id}` : "/montador/"} style={{ display: 'inline-flex', padding: '0 18px', alignItems: 'center', justifyContent: 'center', gap: '10px', height: '44px', boxSizing: 'border-box', borderRadius: '28px', textDecoration: 'none', fontFamily: 'var(--fb)', fontWeight: '700', fontSize: '14px', marginTop: '0px', background: 'transparent', color: '#eef2ee', border: '1px solid rgba(255,255,255,.16)' }}>
            Montador
          </Link>
          <Link href="/ferramentas/gabinete/" style={{ display: 'inline-flex', padding: '0 18px', alignItems: 'center', justifyContent: 'center', gap: '10px', height: '44px', boxSizing: 'border-box', borderRadius: '28px', textDecoration: 'none', fontFamily: 'var(--fb)', fontWeight: '700', fontSize: '14px', marginTop: '0px', background: 'transparent', color: '#eef2ee', border: '1px solid rgba(255,255,255,.16)' }}>
            Cabe no gabinete
          </Link>
          <Link href="/ferramentas/conta-de-luz/" style={{ display: 'inline-flex', padding: '0 18px', alignItems: 'center', justifyContent: 'center', gap: '10px', height: '44px', boxSizing: 'border-box', borderRadius: '28px', textDecoration: 'none', fontFamily: 'var(--fb)', fontWeight: '700', fontSize: '14px', marginTop: '0px', background: 'transparent', color: '#eef2ee', border: '1px solid rgba(255,255,255,.16)' }}>
            Conta de luz
          </Link>
        </div>
      </div>
      <div style={{ padding: '32px 24px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Link href={`/ferramentas/fonte/?gpu=${g.id}&cpu=${c.id}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', height: '56px', boxSizing: 'border-box', borderRadius: '28px', textDecoration: 'none', fontFamily: 'var(--fb)', fontWeight: '700', fontSize: '16px', marginTop: '0px', background: '#9dff3b', color: '#07110a', border: '0', boxShadow: '0 14px 40px rgba(157,255,59,.25)' }}>
          Fazer a conta com essa placa{' '}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
        {shopee ? (
        <a href={shopee} target="_blank" rel="sponsored noopener noreferrer" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', height: '56px', boxSizing: 'border-box', borderRadius: '28px', textDecoration: 'none', fontFamily: 'var(--fb)', fontWeight: '700', fontSize: '16px', marginTop: '0px', background: 'transparent', color: '#eef2ee', border: '1px solid rgba(255,255,255,.16)' }}>
          Ver na Shopee
        </a>
        ) : (
        <span aria-disabled="true" style={{ opacity: .45, cursor: "default", width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', height: '56px', boxSizing: 'border-box', borderRadius: '28px', textDecoration: 'none', fontFamily: 'var(--fb)', fontWeight: '700', fontSize: '16px', marginTop: '0px', background: 'transparent', color: '#eef2ee', border: '1px solid rgba(255,255,255,.16)' }}>
          Links da Shopee em breve
        </span>
        )}
        <p style={{ margin: '4px 0 0', fontSize: '13px', lineHeight: '19px', color: '#9aa39c' }}>
          Link de afiliado: se você comprar, o Elphy pode ganhar comissão. O preço não muda, e quem mostra o preço é a Shopee. Aqui não tem preço porque ele muda todo dia.
        </p>
      </div>
      <div style={{ margin: '30px 24px 0', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,.1)', fontFamily: 'var(--fm)', fontSize: '10.5px', lineHeight: '19px', color: '#9aa39c' }}>
        <div style={{ letterSpacing: '.14em', textTransform: 'uppercase' }}>
          Fontes
        </div>
        <div style={{ marginTop: '6px' }}>
          {g.fonte ? (
            <a href={g.fonte} target="_blank" rel="noopener noreferrer" style={{ color: '#9aa39c' }}>
              {`Ficha oficial do fabricante${g.conferidoEm ? `, conferida em ${g.conferidoEm}` : ""}`}
            </a>
          ) : "Watts do catálogo, a conferir na ficha oficial"}
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
