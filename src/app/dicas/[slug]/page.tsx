import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DicaMobile from "@/components/dz/DicaMobile";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductBlock from "@/components/ProductBlock";
import ReviewBlocks from "@/components/ReviewBlocks";
import Alternativas from "@/components/Alternativas";
import AdDisclosure from "@/components/AdDisclosure";
import { getDica, getDicas } from "@/lib/content";
import { isHttpUrl, textOrPending } from "@/lib/format";
import { pageMetadata } from "@/lib/site";

/* Dica-Mobile (docs/design-1.0) para as dicas do desenho; as dicas antigas em JSON seguem no modelo antigo. */
const DESENHO: Record<string, { titulo: string; gancho: string }> = {
  "rtx-5070-250w": {
    titulo: "A RTX 5070 puxa 250 W. A caixa não conta o resto.",
    gancho: "A fonte tem que aguentar o PC inteiro, não só a placa. A conta com um Ryzen 5 7600.",
  },
};

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return [...Object.keys(DESENHO), ...getDicas().map(({ slug }) => slug)].map((slug) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const nova = DESENHO[slug];
  if (nova) return pageMetadata(nova.titulo, nova.gancho, `/dicas/${slug}/`, "/og-nota.png");
  const dica = getDica(slug);
  if (!dica) return { title: "Dica não encontrada" };
  return pageMetadata(textOrPending(dica.titulo), textOrPending(dica.gancho), `/dicas/${dica.slug}/`);
}
export default async function DicaPage({ params }: Props) {
  const slug = (await params).slug;
  if (DESENHO[slug]) {
    return (
      <div className="dz" id="conteudo">
        <div className="dz-m"><div className="dz-quadro-m"><DicaMobile /></div></div>
      </div>
    );
  }
  const dica = getDica(slug);
  if (!dica) notFound();
  return <>
    <Header />
    <main id="conteudo" className="container reading page-section">
      <AdDisclosure />
      <Link className="text-link" href="/dicas/">← Todas as dicas</Link>
      <article><header className="review-header">
        <p className="eyebrow">A dica é essa.</p><h1>{textOrPending(dica.titulo)}</h1><p className="hook">{textOrPending(dica.gancho)}</p>
        <div className="detail-meta"><span>Categoria: {textOrPending(dica.categoria)}</span><span>Publicado em: {textOrPending(dica.publicadoEm)}</span></div>
        <p className="detail-meta">Vídeo: {isHttpUrl(dica.videoRef) ? <a className="text-link" href={dica.videoRef} target="_blank" rel="noopener noreferrer">Ver o vídeo ↗<span className="sr-only"> (abre em nova aba)</span></a> : textOrPending(dica.videoRef)}</p>
      </header>
      <ProductBlock produto={dica.produto} id={`${dica.slug}-principal`} /><ReviewBlocks produto={dica.produto} /><Alternativas alternativas={dica.alternativas} slug={dica.slug} />
      </article>
    </main>
    <Footer />
  </>;
}
