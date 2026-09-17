import type { Alternative } from "@/lib/content";
import { isPending, textOrPending } from "@/lib/format";
import ProductBlock from "./ProductBlock";

export default function Alternativas({ alternativas, slug }: { alternativas: Alternative[]; slug: string }) {
  const pending = alternativas.some((item) => [item.nome, item.preco, item.resumo].some(isPending));
  return <section aria-labelledby="alternativas-titulo">
    <div className="section-heading"><h2 id="alternativas-titulo">Outras opções<span className="lime">.</span></h2></div>
    {pending && <p className="alternatives-note">Comparação de preços e produtos: {textOrPending()}</p>}
    <div className="alternatives-grid">{alternativas.map((item, index) => <div key={`${item.rotulo}-${index}`}>
      <p className="alternative-label"><span className="pill">{item.rotulo}</span></p>
      <ProductBlock produto={item} id={`${slug}-alternativa-${index + 1}`} compact>
        <div className="alternative-review">
          <p className={isPending(item.resumo) ? "pending" : ""}>{textOrPending(item.resumo)}</p>
          <p><span className="positive" aria-hidden="true">✓</span><span className="sr-only">Ponto positivo: </span><span className={isPending(item.pro) ? "pending" : ""}>{textOrPending(item.pro)}</span></p>
          <p><span className="negative" aria-hidden="true">✕</span><span className="sr-only">Limitação: </span><span className={isPending(item.contra) ? "pending" : "negative"}>{textOrPending(item.contra)}</span></p>
        </div>
      </ProductBlock>
    </div>)}</div>
    {alternativas.length === 0 && <p className="pending">{textOrPending()}</p>}
  </section>;
}
