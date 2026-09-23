import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PecaMobile, { PECAS } from "@/components/dz/PecaMobile";
import { pageMetadata } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return PECAS.map(({ id }) => ({ slug: id })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const g = PECAS.find((x) => x.id === slug);
  if (!g) return { title: "Peça não encontrada" };
  return pageMetadata(`${g.nome}: ficha e conta`, `A ${g.nome} puxa ${g.w} W pela ficha do fabricante. A fonte que o Elphy calcula e as contas em que ela entra.`, `/peca/${g.id}/`, "/og-nota.png");
}

/* Peca-Mobile, de docs/design-1.0 */
export default async function PecaPage({ params }: Props) {
  const slug = (await params).slug;
  if (!PECAS.some((x) => x.id === slug)) notFound();
  return (
    <div className="dz" id="conteudo">
      <div className="dz-m"><div className="dz-quadro-m"><PecaMobile id={slug} /></div></div>
    </div>
  );
}
