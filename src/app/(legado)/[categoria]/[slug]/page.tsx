import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getReview, getReviews } from "@/lib/content";
import { absoluteUrl, pageMetadata } from "@/lib/site";
import { formatDate, money } from "@/lib/format";
import { reviewSchema } from "@/lib/review-schema";
import AdDisclosure from "@/components/AdDisclosure";
import ProductBlock from "@/components/ProductBlock";
import VeredictBox from "@/components/VeredictBox";
import PriceAlertForm from "@/components/PriceAlertForm";
type Props = { params: Promise<{ categoria: string; slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return getReviews().map(({ categoria, slug }) => ({ categoria, slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria, slug } = await params;
  const review = getReview(categoria, slug);
  if (!review) return {};
  const metadata = pageMetadata(review.titulo, review.veredito.frase, `/${categoria}/${slug}/`);
  return { ...metadata, title: { absolute: review.titulo }, openGraph: { ...metadata.openGraph, type: "article", publishedTime: review.publicadoEm, modifiedTime: review.atualizadoEm, images: [{ url: absoluteUrl(review.produto.imagem), alt: review.produto.nome }] } };
}
export default async function ReviewPage({ params }: Props) {
  const { categoria, slug } = await params;
  const review = getReview(categoria, slug);
  if (!review) notFound();
  const category = categories.find((category) => category.slug === categoria)!;
  const product = review.produto;
  const history = [...product.precoHistorico].sort((a, b) => a.data.localeCompare(b.data));
  const schema = reviewSchema(review, category.nome);
  return <main id="conteudo" className="container reading review-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <nav className="breadcrumb" aria-label="Caminho"><Link href="/">Home</Link><span aria-hidden="true">›</span><Link href={`/${categoria}/`}>{category.nome}</Link></nav>
    <article>
      <header className="review-opening"><h1>{review.titulo}</h1><VeredictBox veredito={review.veredito} />
        <div className="trust-line"><p><strong>{review.autor.nome}</strong> · {review.autor.papel} · atualizado em <time dateTime={review.atualizadoEm}>{formatDate(review.atualizadoEm)}</time></p><p className="method-badge">{review.metodologia === "testado" ? "Testado" : "Análise documental — sem unidade em mãos"}</p><AdDisclosure /></div>
      </header>
      <ProductBlock produto={product} id={`${slug}-principal`} />
      <div className="audience"><section><h2>Pra quem é</h2><ul>{review.veredito.paraQuem.map((text, i) => <li key={i}>{text}</li>)}</ul></section><section><h2>Pra quem não é</h2><ul>{review.veredito.paraQuemNao.map((text, i) => <li key={i}>{text}</li>)}</ul></section></div>
      <p className="methodology-text">{review.metodologiaTexto}</p>
      <section className="review-section" aria-labelledby="compare-title"><h2 id="compare-title">Lado a lado</h2><p className="muted table-hint">Deslize a tabela para comparar →</p>
        <div className="comparison-scroll" role="region" aria-label="Tabela comparativa, role horizontalmente" tabIndex={0}><table><caption>Ficha e preços observados em {formatDate(product.precoData)}</caption><thead><tr>{review.tabela.colunas.map((column) => <th key={column} scope="col">{column}</th>)}</tr></thead><tbody>{review.tabela.linhas.map((row, index) => <tr key={index}>{row.map((cell, i) => i === 0 ? <th scope="row" key={i}>{cell}</th> : <td key={i}>{cell}</td>)}</tr>)}</tbody></table></div>
      </section>
      {([{ title: "O que não é", items: review.oQueNaoE, danger: true }, { title: "Prós", items: review.pros }, { title: "Contras", items: review.contras, danger: true }]).map(({ title, items, danger }) => <section className={`review-section${danger ? " negative" : ""}`} key={title}><h2>{title}</h2><ul className="editorial-list">{items.map((item, i) => <li key={i}>{item}</li>)}</ul></section>)}
      <section className="review-section"><h2>Preço, sem chute</h2><p><strong>{money(product.precoObservado)}</strong> em {product.loja} · visto em {formatDate(product.precoData)}.</p><p className="muted">O preço pode mudar. Confira o valor final na loja.</p>
        {history.length ? <><p>Menor preço observado desde {formatDate(history[0].data)}: <strong className="lime">{money(Math.min(...history.map((item) => item.preco)))}</strong>.</p><ul className="history-list">{history.map((entry, i) => <li key={i}><time dateTime={entry.data}>{formatDate(entry.data)}</time> · {money(entry.preco)} · {entry.fonte}</li>)}</ul></> : <p>Histórico: [a conferir]</p>}
        <p>Garantia: {product.garantia}</p>
      </section>
      <section className="review-section"><h2>Outras opções</h2><div className="review-alternatives">{review.alternativas.map((item, i) => <section key={i}><p className="eyebrow">{item.rotulo}</p><h3>{item.nome}</h3><p className="alternative-price">{money(item.preco)}</p><p>{item.porQue}</p><a className="button button-secondary" href={item.link} target="_blank" rel="noopener noreferrer"><span>Ver na loja<span className="sr-only"> (abre em nova aba)</span></span><span aria-hidden="true">↗</span></a></section>)}</div></section>
      <section className="review-section"><h2>Dúvidas de quem vai comprar</h2><div className="faq">{review.faq.map((item, i) => <details key={i}><summary>{item.pergunta}</summary><p>{item.resposta}</p></details>)}</div></section>
      <section className="review-section sources"><h2>Fontes</h2><ol>{review.fontes.map((source, i) => <li key={i}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.titulo} ↗</a><span className="muted"> · {formatDate(source.data)}</span></li>)}</ol>
        {review.video && <p><a className="text-link" href={review.video} target="_blank" rel="noopener noreferrer">TikTok: {new URL(review.video).pathname.includes("/video/") ? "ver vídeo" : "ver perfil (vídeo específico: [a conferir])"} ↗</a></p>}
      </section>
      <section className="review-section"><h2>Registro de alterações</h2><ul className="history-list">{review.changelog.map((entry, i) => <li key={i}><time dateTime={entry.data}>{formatDate(entry.data)}</time> · {entry.texto}</li>)}</ul></section>
      <PriceAlertForm produto={product.nome} slug={slug} />
    </article>
  </main>;
}
