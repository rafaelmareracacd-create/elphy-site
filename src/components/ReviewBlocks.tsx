import type { ReviewedProduct } from "@/lib/content";
import { isPending, textOrPending } from "@/lib/format";

function ReviewList({ items, negative = false }: { items: string[]; negative?: boolean }) {
  const list = items.length ? items : [""];
  return <ul className="review-list">{list.map((item, index) => <li key={index}><span className={negative ? "negative" : "positive"} aria-hidden="true">{negative ? "✕" : "✓"}</span><span className={isPending(item) ? "pending" : negative ? "negative" : ""}>{textOrPending(item)}</span></li>)}</ul>;
}
export default function ReviewBlocks({ produto }: { produto: ReviewedProduct }) {
  return <div className="review-blocks">
    <section><h2>O que não é</h2><ReviewList items={produto.contrasList} negative /></section>
    <section><h2>Pra quem é</h2><p className={isPending(produto.paraQuemE) ? "pending" : ""}>{textOrPending(produto.paraQuemE)}</p></section>
    <section><h2>O que tem de bom</h2><ReviewList items={produto.prosList} /></section>
  </div>;
}
