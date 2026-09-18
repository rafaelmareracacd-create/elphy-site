import Image from "next/image";
import Link from "next/link";
import { categories, getArticles, type Category } from "@/lib/content";
import { formatDate, money, isPending } from "@/lib/format";
import { assetPath } from "@/lib/site";
export default function ArticleFeed({ category }: { category?: Category }) {
  const articles = getArticles(category);
  return <div className="article-feed">{articles.map((article) => {
    const data = article.data;
    const review = article.kind === "review" ? article.data : null;
    return <Link className="article-card" key={`${article.kind}-${data.slug}`} href={review ? `/${review.categoria}/${review.slug}/` : `/dicas/${data.slug}/`}>
      {!isPending(data.produto.imagem) ? <Image src={data.produto.imagem.startsWith("/") ? assetPath(data.produto.imagem) : data.produto.imagem} alt={data.produto.nome} width={112} height={112} sizes="(min-width:700px) 112px, 80px" /> : <span className="feed-image-pending">Imagem [a conferir]</span>}
      <div className="article-copy"><p className="eyebrow muted">{categories.find(({ slug }) => slug === article.category)?.nome} · {review ? "Review" : "Dica"}</p>
        <h3>{data.titulo}</h3>
        <p>{review ? <><strong className="lime">{review.veredito.resposta}.</strong> {money(review.produto.precoObservado)} <span className="muted">· {formatDate(review.produto.precoData)}</span></> : <><span className="muted">Veredito: [a conferir]</span> · {article.kind === "dica" && article.data.produto.preco}<br /><span className="muted">Data do preço: [a conferir]</span></>}</p>
        <span className="article-link">Ler {review ? "review" : "dica"} <span aria-hidden="true">↗</span></span>
      </div>
    </Link>;
  })}{!articles.length && <p className="empty-feed">Ainda não publicamos por aqui. Novas análises estão a caminho.</p>}</div>;
}
