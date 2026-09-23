import Link from "next/link";


import MenuBotao from "./Menu";

/* Transcrito de docs/design-1.0/Metodologia-Mobile.dc.html */
export default function Metodologia() {
  return (
    <div className="dz-col" style={{ position: 'relative', width: '100%', minHeight: '2640px', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#050607', color: '#eef2ee', fontFamily: 'var(--fb)' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px', boxSizing: 'border-box', padding: '0 24px', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
        <Link href="/" style={{ fontWeight: '800', fontSize: '24px', letterSpacing: '-.045em', textDecoration: 'none', color: '#eef2ee' }}>
          elphy
          <span style={{ color: '#9dff3b' }}>
            .
          </span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#c9d0ca' }}>
            Metodologia
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
          Metodologia
        </p>
        <h1 style={{ margin: '14px 0 0', fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '70px', lineHeight: '.86', textTransform: 'uppercase' }}>
          Como o
          <br />
          Elphy faz
          <br />
          a conta
          <span style={{ color: '#9dff3b' }}>
            .
          </span>
        </h1>
        <p style={{ margin: '14px 0 0', fontSize: '16px', lineHeight: '24px', color: '#b9c1bb' }}>
          Três regras e sete fórmulas. Se alguma conta daqui não bate com a sua, a página de correções está aberta.
        </p>
      </div>
      <div style={{ padding: '30px 24px 0' }}>
        <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9dff3b' }}>
          As regras
        </span>
        <div style={{ marginTop: '8px' }}>
          <div style={{ display: 'flex', gap: '16px', padding: '16px 0', borderTop: '1px solid rgba(255,255,255,.08)' }}>
            <span style={{ fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '52px', lineHeight: '.85', color: '#9dff3b', width: '30px' }}>
              1
            </span>
            <span style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '18px', fontWeight: '800' }}>
                Só número com dono
              </span>
              <span style={{ fontSize: '15px', lineHeight: '23px', color: '#c9d0ca' }}>
                Ficha oficial do fabricante ou relatório de teste público. Número de anúncio não entra.
              </span>
            </span>
          </div>
          <div style={{ display: 'flex', gap: '16px', padding: '16px 0', borderTop: '1px solid rgba(255,255,255,.08)' }}>
            <span style={{ fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '52px', lineHeight: '.85', color: '#9dff3b', width: '30px' }}>
              2
            </span>
            <span style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '18px', fontWeight: '800' }}>
                Toda conta mostra a fórmula
              </span>
              <span style={{ fontSize: '15px', lineHeight: '23px', color: '#c9d0ca' }}>
                A nota imprime as linhas. Esta página imprime a fórmula de cada uma.
              </span>
            </span>
          </div>
          <div style={{ display: 'flex', gap: '16px', padding: '16px 0', borderTop: '1px solid rgba(255,255,255,.08)' }}>
            <span style={{ fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '52px', lineHeight: '.85', color: '#9dff3b', width: '30px' }}>
              3
            </span>
            <span style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '18px', fontWeight: '800' }}>
                Todo dado tem data
              </span>
              <span style={{ fontSize: '15px', lineHeight: '23px', color: '#c9d0ca' }}>
                Ficha muda, revisão de peça muda. Cada número diz quando foi conferido.
              </span>
            </span>
          </div>
        </div>
      </div>
      <div style={{ padding: '30px 24px 0' }}>
        <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#9dff3b' }}>
          As fórmulas
        </span>
        <div style={{ marginTop: '8px' }}>
          <div style={{ padding: '16px 0', borderTop: '1px solid rgba(255,255,255,.08)' }}>
            <div style={{ fontSize: '17px', fontWeight: '700' }}>
              Fonte
            </div>
            <div style={{ marginTop: '8px', boxSizing: 'border-box', padding: '12px 14px', borderRadius: '4px', background: '#f3f1ea', color: '#111311', fontFamily: 'var(--fm)', fontSize: '11.5px', lineHeight: '18px' }}>
              (placa + processador + 60 W) × 1,3 → próximo degrau comercial
            </div>
          </div>
          <div style={{ padding: '16px 0', borderTop: '1px solid rgba(255,255,255,.08)' }}>
            <div style={{ fontSize: '17px', fontWeight: '700' }}>
              Power bank
            </div>
            <div style={{ marginTop: '8px', boxSizing: 'border-box', padding: '12px 14px', borderRadius: '4px', background: '#f3f1ea', color: '#111311', fontFamily: 'var(--fm)', fontSize: '11.5px', lineHeight: '18px' }}>
              mAh × 3,7 V × 65% ÷ (mAh do celular × 3,85 V)
            </div>
          </div>
          <div style={{ padding: '16px 0', borderTop: '1px solid rgba(255,255,255,.08)' }}>
            <div style={{ fontSize: '17px', fontWeight: '700' }}>
              SSD
            </div>
            <div style={{ marginTop: '8px', boxSizing: 'border-box', padding: '12px 14px', borderRadius: '4px', background: '#f3f1ea', color: '#111311', fontFamily: 'var(--fm)', fontSize: '11.5px', lineHeight: '18px' }}>
              bytes da caixa ÷ 1.073.741.824
            </div>
          </div>
          <div style={{ padding: '16px 0', borderTop: '1px solid rgba(255,255,255,.08)' }}>
            <div style={{ fontSize: '17px', fontWeight: '700' }}>
              Conta de luz
            </div>
            <div style={{ marginTop: '8px', boxSizing: 'border-box', padding: '12px 14px', borderRadius: '4px', background: '#f3f1ea', color: '#111311', fontFamily: 'var(--fm)', fontSize: '11.5px', lineHeight: '18px' }}>
              watts × horas × 30 ÷ 1.000 × tarifa
            </div>
          </div>
          <div style={{ padding: '16px 0', borderTop: '1px solid rgba(255,255,255,.08)' }}>
            <div style={{ fontSize: '17px', fontWeight: '700' }}>
              Monitor
            </div>
            <div style={{ marginTop: '8px', boxSizing: 'border-box', padding: '12px 14px', borderRadius: '4px', background: '#f3f1ea', color: '#111311', fontFamily: 'var(--fm)', fontSize: '11.5px', lineHeight: '18px' }}>
              √(largura² + altura²) ÷ polegadas · distância = 8.732 ÷ PPI (cm)
            </div>
          </div>
          <div style={{ padding: '16px 0', borderTop: '1px solid rgba(255,255,255,.08)' }}>
            <div style={{ fontSize: '17px', fontWeight: '700' }}>
              Gabinete
            </div>
            <div style={{ marginTop: '8px', boxSizing: 'border-box', padding: '12px 14px', borderRadius: '4px', background: '#f3f1ea', color: '#111311', fontFamily: 'var(--fm)', fontSize: '11.5px', lineHeight: '18px' }}>
              espaço − peça · margem de 10 mm (placa) e 3 mm (cooler)
            </div>
          </div>
          <div style={{ padding: '16px 0', borderTop: '1px solid rgba(255,255,255,.08)' }}>
            <div style={{ fontSize: '17px', fontWeight: '700' }}>
              Memória
            </div>
            <div style={{ marginTop: '8px', boxSizing: 'border-box', padding: '12px 14px', borderRadius: '4px', background: '#f3f1ea', color: '#111311', fontFamily: 'var(--fm)', fontSize: '11.5px', lineHeight: '18px' }}>
              especificação oficial do processador, sem arredondar
            </div>
          </div>
        </div>
      </div>
      <div style={{ margin: '28px 24px 0', boxSizing: 'border-box', padding: '20px', borderRadius: '20px', border: '1px solid rgba(255,176,32,.35)', background: '#0a0d0f' }}>
        <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#ffb020' }}>
          O que o Elphy não calcula
        </span>
        <p style={{ margin: '10px 0 0', fontSize: '15px', lineHeight: '23px', color: '#c9d0ca' }}>
          Gargalo, FPS em jogo e qualidade de câmera. Esses números dependem de teste de bancada; chute com cara de conta a gente não publica.
        </p>
      </div>
      <div style={{ margin: '12px 24px 0', boxSizing: 'border-box', padding: '20px', borderRadius: '20px', border: '1px solid rgba(157,255,59,.3)', background: '#0a0d0f' }}>
        <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#9dff3b' }}>
          Como o Elphy ganha
        </span>
        <p style={{ margin: '10px 0 0', fontSize: '15px', lineHeight: '23px', color: '#c9d0ca' }}>
          Alguns links levam à Shopee com código de afiliado. Se você compra, o Elphy pode receber comissão e o preço para você não muda. Loja nenhuma paga para aparecer.
        </p>
      </div>
      <Link href="/correcoes/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', height: '54px', margin: '24px 24px 0', boxSizing: 'border-box', borderRadius: '27px', border: '1px solid rgba(157,255,59,.45)', textDecoration: 'none', fontWeight: '700', fontSize: '16px', color: '#9dff3b' }}>
        Achou erro? Página de correções{' '}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </Link>
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
