import Image from "next/image";
import Link from "next/link";
import type { Achado } from "@/content/achados";
import { assetPath } from "@/lib/site";
import { dataConferencia, temCupomReal, urlExterna } from "@/lib/achados";
import Nota from "./Nota";
import Carimbo from "./Carimbo";
import { LinkLoja, Preco } from "./Oferta";
import Cupom from "./Cupom";
import TiraAchado from "./TiraAchado";

export default function Produto({ achado, parecidos }: { achado: Achado; parecidos: Achado[] }) {
  const lojas = <><h2>Mesma versão em outras lojas</h2><p>Só entra se for o mesmo modelo e a mesma quantidade.</p>{achado.outrasLojas.length ? achado.outrasLojas.map((loja, i) => <div className="v3-outra-loja" key={`${loja.nome}-${i}`}><div><h3>{loja.nome}</h3><Preco loja={loja} /></div><LinkLoja loja={loja} rascunho={achado.rascunho} /></div>) : <p>Nenhuma outra loja conferida.</p>}</>;
  return <div className="v3-container v3-produto">
    <Link className="v3-voltar" href="/achados/">← Achados · {achado.categoria}</Link>
    <div className="v3-produto-grid">
      <Nota className="v3-produto-nota">
        <p className="v3-etiqueta">{achado.rascunho ? "Achado · rascunho" : "Achado carimbado"}<span>{dataConferencia(achado.lojaPrincipal.conferidoEm)}</span></p>
        <Carimbo tipo={achado.carimbo} grande /><p className="v3-produto-motivo">{achado.motivo}</p><h1>{achado.nome}</h1>
        {achado.carimbo !== "deixa" ? <><Preco loja={achado.lojaPrincipal} />{temCupomReal(achado) && <Cupom cupom={achado.cupom!} />}<LinkLoja loja={achado.lojaPrincipal} rascunho={achado.rascunho} destaque /><p className="v3-letra-miuda">Link de afiliado. Preço e frete mudam; confere na loja.</p></> : achado.alternativa && <Link className="v3-botao" href={achado.alternativa.href}>{achado.alternativa.rotulo} →</Link>}
        {achado.rascunho && <p className="v3-rascunho">Exemplo da prancheta. Dados, foto e links ainda não conferidos.</p>}
        <section className="v3-outras-desktop">{lojas}</section>
      </Nota>
      <div className="v3-produto-galeria">
        {achado.imagem ? <Image className="v3-foto-produto" src={assetPath(achado.imagem.src)} alt={achado.imagem.alt} width={672} height={560} priority /> : <div className="v3-foto-produto">[Foto real do produto]</div>}
        {achado.rascunho && <div className="v3-miniaturas" aria-hidden="true"><span /><span /><span /><span /></div>}
        {!achado.rascunho && urlExterna(achado.videoUrl) ? <a className="v3-video" href={achado.videoUrl} target="_blank" rel="noopener noreferrer"><span>▶</span><div><strong>Saiu neste vídeo</strong><small>Ver no TikTok</small></div>→</a> : achado.rascunho && <div className="v3-video"><span aria-hidden="true">▶</span><div><strong>Saiu neste vídeo</strong><small>[Vídeo a cadastrar]</small></div></div>}
      </div>
    </div>
    <section className="v3-produto-detalhes" aria-label="Nossa avaliação">
      <div className="v3-papel"><h2>Pra quem é</h2><p>{achado.praQuemE}</p></div><div className="v3-papel"><h2 className="v3-vermelho">Pra quem não é</h2><p>{achado.praQuemNaoE}</p></div>
      <div className="v3-papel v3-olhamos"><h2>O que a gente olhou</h2><dl>{achado.olhamos.map((item) => <div className="v3-linha-pontos" key={item.rotulo}><dt>{item.rotulo}</dt><dd>{item.valor}</dd></div>)}</dl>{achado.ferramenta && <Link href={achado.ferramenta.href}>{achado.ferramenta.rotulo} →</Link>}</div>
    </section>
    <section className="v3-outras-mobile">{lojas}</section>
    {parecidos.length > 0 && <section className="v3-parecidos"><h2>Parecidos</h2><div className="v3-achados-grid">{parecidos.map((item) => <TiraAchado key={item.slug} achado={item} />)}</div></section>}
  </div>;
}
