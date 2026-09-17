import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDica, getDicas } from "@/lib/content";
import { isHttpUrl, textOrPending } from "@/lib/format";
import { pageMetadata } from "@/lib/site";
import ProductBlock from "@/components/ProductBlock";
import ReviewBlocks from "@/components/ReviewBlocks";
import Alternativas from "@/components/Alternativas";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return getDicas().map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dica = getDica((await params).slug);
  if (!dica) return { title: "Dica não encontrada" };
  return pageMetadata(textOrPending(dica.titulo), textOrPending(dica.gancho), `/dicas/${dica.slug}/`);
}
export default async function DicaPage({ params }: Props) {
  const dica = getDica((await params).slug);
  if (!dica) notFound();
  return <main id="conteudo" className="container reading page-section">
    <Link className="text-link" href="/">← Todas as dicas</Link>
    <article><header className="review-header">
      <p className="eyebrow">A dica é essa.</p><h1>{textOrPending(dica.titulo)}</h1><p className="hook">{textOrPending(dica.gancho)}</p>
      <div className="detail-meta"><span>Categoria: {textOrPending(dica.categoria)}</span><span>Publicado em: {textOrPending(dica.publicadoEm)}</span></div>
      <p className="detail-meta">Vídeo: {isHttpUrl(dica.videoRef) ? <a className="text-link" href={dica.videoRef} target="_blank" rel="noopener noreferrer">Ver o vídeo ↗<span className="sr-only"> (abre em nova aba)</span></a> : textOrPending(dica.videoRef)}</p>
    </header>
    <ProductBlock produto={dica.produto} id={`${dica.slug}-principal`} /><ReviewBlocks produto={dica.produto} /><Alternativas alternativas={dica.alternativas} slug={dica.slug} />
    </article>
  </main>;
}
