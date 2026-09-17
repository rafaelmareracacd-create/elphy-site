import Link from "next/link";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Sobre o Elphy", "Quem faz o Elphy, como os links de afiliado funcionam e a nossa promessa de reviews honestos.", "/sobre/");
export default function Sobre() {
  return <main id="conteudo" className="container reading page-section">
    <p className="eyebrow">Sem caô. De verdade.</p><h1>Por trás da dica<span className="lime">.</span></h1>
    <div className="prose">
      <p>A Elphy é o [NOME] e um elefante verde teimoso. A gente faz humor no TikTok e, no card final, manda pra cá: a dica de verdade, sem texto de anúncio disfarçado de review.</p>
      <p>Se você clica em &quot;Ver no Mercado Livre&quot; e compra, a gente ganha comissão. O preço pra você não muda. Cupom, quando existe, é do vendedor — só avisamos. TikTok Shop entra depois, com publicidade identificada.</p>
      <p><strong>Não passamos pano. Se o produto é meia-boca, falamos.</strong> O vídeo faz graça; a página diz o que presta, o que não presta e pra quem não serve. Dica sem caô. Sem enrolar pra empurrar clique.</p>
    </div>
    <Link className="button button-secondary" href="/">Voltar para as dicas <span aria-hidden="true">↗</span></Link>
  </main>;
}
