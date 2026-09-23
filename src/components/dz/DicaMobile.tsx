import Link from "next/link";
import { assetPath } from "@/lib/site";
import { cpusFonte, gpusFonte } from "@/lib/catalogo";
import { fonteRecomendada } from "@/lib/contas";
import { linkDica } from "@/lib/dicas";

/* Transcrito de docs/design-1.0/Dica-Mobile.dc.html */
const g = gpusFonte.find((x) => x.id === "rtx-5070")!;
const c = cpusFonte.find((x) => x.id === "r5-7600")!;
const r = fonteRecomendada(g.w, c.w);

export default function DicaMobile() {
  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '2640px', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#050607', color: '#eef2ee', fontFamily: 'var(--fb)' }}>
      <header style={{ display: 'flex', flexShrink: '0', alignItems: 'center', justifyContent: 'space-between', height: '64px', boxSizing: 'border-box', padding: '0 24px', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
        <Link href="/" style={{ fontWeight: '800', fontSize: '24px', letterSpacing: '-.045em', textDecoration: 'none', color: '#eef2ee' }}>
          elphy
          <span style={{ color: '#9dff3b' }}>
            .
          </span>
        </Link>
        <Link href="/ferramentas/fonte/" style={{ display: 'inline-flex', alignItems: 'center', height: '40px', padding: '0 16px', borderRadius: '20px', background: '#9dff3b', textDecoration: 'none', fontSize: '14px', fontWeight: '700', color: '#07110a' }}>
          Fazer a conta
        </Link>
      </header>
      <article style={{ padding: '26px 24px 0' }}>
        <nav aria-label="Você está em" style={{ display: 'flex', gap: '8px', fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#9aa39c' }}>
          <Link href="/dicas/" style={{ color: '#9aa39c', textDecoration: 'none' }}>
            Dicas
          </Link>
          <span style={{ color: '#3a423c' }}>
            /
          </span>
          <span style={{ color: '#9dff3b' }}>
            Montar PC
          </span>
        </nav>
        <h1 style={{ margin: '16px 0 0', fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '54px', lineHeight: '.9', textTransform: 'uppercase' }}>
          {`A RTX 5070 puxa ${g.w} W. A caixa não conta o resto.`}
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '20px' }}>
          <div style={{ position: 'relative', width: '40px', height: '40px', flexShrink: '0', borderRadius: '50%', overflow: 'hidden', background: '#0d1013', boxShadow: '0 0 0 1px rgba(157,255,59,.35)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- a máscara e o recorte do desenho precisam do img puro */}
            <img src={assetPath("/brand/elphy-nota.webp")} alt="" style={{ position: 'absolute', left: '-29px', top: '-65px', width: '100px', height: '150px' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '15px', fontWeight: '700' }}>
              Elphy
            </span>
            <span style={{ fontFamily: 'var(--fm)', fontSize: '10px', letterSpacing: '.08em', textTransform: 'uppercase', color: '#9aa39c' }}>
              4 min de leitura
            </span>
          </div>
        </div>
        <p style={{ margin: '26px 0 0', fontSize: '19px', lineHeight: '30px', color: '#dfe5e0' }}>
          {`Quando alguém diz que a RTX 5070 gasta ${g.w} W, está falando só da placa. A fonte tem que aguentar o PC inteiro — e é essa parte da conta que o anúncio pula.`}
        </p>
        <div style={{ marginTop: '30px', padding: '22px 0 20px', borderTop: '1px solid rgba(255,255,255,.1)', borderBottom: '1px solid rgba(255,255,255,.1)' }}>
          <div style={{ fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '124px', lineHeight: '.8', color: '#9dff3b' }}>
            {`${g.w} W`}
          </div>
          <div style={{ marginTop: '12px', fontFamily: 'var(--fm)', fontSize: '10.5px', lineHeight: '17px', letterSpacing: '.08em', textTransform: 'uppercase', color: '#9aa39c' }}>
            Consumo máximo da placa (TGP), pela ficha do fabricante
          </div>
        </div>
        <p style={{ margin: '28px 0 0', fontSize: '17px', lineHeight: '28px', color: '#c9d0ca' }}>
          O processador entra na conta. A placa-mãe, a memória, o SSD e as ventoinhas também. Somado, o PC puxa bem mais do que a placa sozinha — e ainda falta a folga para os picos, que a placa de vídeo dá em frações de segundo.
        </p>
        <h2 style={{ margin: '36px 0 0', fontSize: '26px', lineHeight: '31px', fontWeight: '800', letterSpacing: '-.02em' }}>
          A conta, com um Ryzen 5 7600
        </h2>
        <div style={{ marginTop: '16px', boxSizing: 'border-box', padding: '20px', borderRadius: '4px', background: '#f3f1ea', color: '#111311', fontFamily: 'var(--fm)', fontSize: '11px', lineHeight: '18px', boxShadow: '0 24px 50px rgba(0,0,0,.45)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <span>
              GeForce RTX 5070
            </span>
            <span style={{ flex: '1', margin: '0 5px 4px', borderBottom: '1.5px dotted rgba(17,19,17,.45)' }}>
            </span>
            <b>
              {`${g.w} W`}
            </b>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '4px' }}>
            <span>
              Ryzen 5 7600
            </span>
            <span style={{ flex: '1', margin: '0 5px 4px', borderBottom: '1.5px dotted rgba(17,19,17,.45)' }}>
            </span>
            <b>
              {`${c.w} W`}
            </b>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '4px' }}>
            <span>
              Mãe, memória, SSD
            </span>
            <span style={{ flex: '1', margin: '0 5px 4px', borderBottom: '1.5px dotted rgba(17,19,17,.45)' }}>
            </span>
            <b>
              60 W
            </b>
          </div>
          <div style={{ margin: '10px 0', borderTop: '1.5px dashed rgba(17,19,17,.4)' }}>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <span>
              Consumo em carga
            </span>
            <span style={{ flex: '1', margin: '0 5px 4px', borderBottom: '1.5px dotted rgba(17,19,17,.45)' }}>
            </span>
            <b>
              {`${r.consumo} W`}
            </b>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '4px' }}>
            <span>
              Com folga de 30%
            </span>
            <span style={{ flex: '1', margin: '0 5px 4px', borderBottom: '1.5px dotted rgba(17,19,17,.45)' }}>
            </span>
            <b>
              {`${r.comFolga} W`}
            </b>
          </div>
          <div style={{ marginTop: '12px', borderTop: '3px double #111311' }}>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', paddingTop: '10px' }}>
            <span style={{ fontSize: '9.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#5b5f58' }}>
              Fonte recomendada
            </span>
            <span style={{ fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '64px', lineHeight: '.84' }}>
              {`${r.recomendado} W`}
            </span>
          </div>
          <div style={{ marginTop: '6px', fontSize: '9.5px', lineHeight: '14px', color: '#5b5f58' }}>
            Estimativa pela fórmula da metodologia. Não garante compatibilidade.
          </div>
        </div>
        <Link href="/ferramentas/fonte/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', height: '54px', marginTop: '18px', borderRadius: '27px', border: '1px solid rgba(157,255,59,.45)', textDecoration: 'none', fontWeight: '700', fontSize: '16px', color: '#9dff3b' }}>
          Fazer a conta com as suas peças
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9dff3b" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
        <p style={{ margin: '28px 0 0', fontSize: '17px', lineHeight: '28px', color: '#c9d0ca' }}>
          {`O número do fim é o degrau comercial logo acima do total com folga. Fonte de ${r.comFolga} W não existe na loja; a próxima que existe é a de ${r.recomendado}.`}
        </p>
        <h2 style={{ margin: '36px 0 0', fontSize: '26px', lineHeight: '31px', fontWeight: '800', letterSpacing: '-.02em' }}>
          O que a etiqueta não diz
        </h2>
        <p style={{ margin: '14px 0 0', fontSize: '17px', lineHeight: '28px', color: '#c9d0ca' }}>
          A etiqueta mostra o watt máximo. Não mostra se a fonte entrega esse watt sem parar, nem se as proteções funcionam de verdade. Isso só aparece em relatório de teste — e é por isso que o Elphy só lista modelo que tem um.
        </p>
        <div style={{ marginTop: '26px', boxSizing: 'border-box', padding: '18px 20px', borderRadius: '16px', background: '#0d1013', border: '1px solid rgba(255,176,32,.35)' }}>
          <span style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#ffb020' }}>
            Regra do Elphy
          </span>
          <p style={{ margin: '8px 0 0', fontSize: '16px', lineHeight: '25px', fontWeight: '600' }}>
            Sem relatório de teste público, não entra na lista. Nem com desconto.
          </p>
        </div>
        <div style={{ marginTop: '30px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,.1)', fontFamily: 'var(--fm)', fontSize: '10.5px', lineHeight: '19px', color: '#9aa39c' }}>
          <div style={{ letterSpacing: '.14em', textTransform: 'uppercase' }}>
            Fontes
          </div>
          {g.fonte && (
            <div style={{ marginTop: '6px' }}>
              <a href={g.fonte} target="_blank" rel="noopener noreferrer" style={{ color: '#9aa39c' }}>
                {`Ficha oficial da ${g.curto} (NVIDIA)${g.conferidoEm ? `, conferida em ${g.conferidoEm}` : ""}`}
              </a>
            </div>
          )}
          <div style={{ marginTop: g.fonte ? '0' : '6px' }}>
            <Link href="/metodologia/" style={{ color: '#9aa39c' }}>
              Como o Elphy faz a conta
            </Link>
          </div>
        </div>
      </article>
      <section style={{ padding: '40px 24px 0' }}>
        <div style={{ fontFamily: 'var(--fm)', fontSize: '10.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#9aa39c' }}>
          Leia também
        </div>
        <Link href={linkDica("folga-30")} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginTop: '12px', padding: '16px 0', borderTop: '1px solid rgba(255,255,255,.08)', textDecoration: 'none' }}>
          <span style={{ fontSize: '17px', lineHeight: '23px', fontWeight: '700' }}>
            A conta arredonda para cima. O pico da placa explica.
          </span>
          <span style={{ fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '34px', color: '#ffb020' }}>
            ×1,3
          </span>
        </Link>
        <Link href={linkDica("selo-80-plus")} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', padding: '16px 0', borderTop: '1px solid rgba(255,255,255,.08)', borderBottom: '1px solid rgba(255,255,255,.08)', textDecoration: 'none' }}>
          <span style={{ fontSize: '17px', lineHeight: '23px', fontWeight: '700' }}>
            O selo 80 Plus mede eficiência. Proteção fica de fora.
          </span>
          <span style={{ fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '34px', color: '#9dff3b' }}>
            80+
          </span>
        </Link>
      </section>
      <footer style={{ position: 'relative', flexGrow: '1', minHeight: '260px', marginTop: '48px', boxSizing: 'border-box', padding: '32px 24px 0', borderTop: '1px solid rgba(255,255,255,.08)', overflow: 'hidden' }}>
        <span style={{ fontFamily: 'var(--fd)', fontWeight: '900', fontSize: '32px', lineHeight: '.9', textTransform: 'uppercase' }}>
          Dica sem caô
          <span style={{ color: '#9dff3b' }}>
            .
          </span>
        </span>
        <p style={{ margin: '14px 0 0', fontFamily: 'var(--fm)', fontSize: '10px', lineHeight: '16px', color: '#9aa39c' }}>
          © 2026 Elphy. Links de loja podem render comissão para o Elphy. O preço para você não muda.
        </p>
        <div aria-hidden="true" style={{ position: 'absolute', left: '16px', bottom: '14px', fontWeight: '800', fontSize: '150px', lineHeight: '.78', letterSpacing: '-.07em', color: '#eef2ee' }}>
          elphy
          <span style={{ color: '#9dff3b' }}>
            .
          </span>
        </div>
      </footer>
    </div>
  );
}
