import { notFound } from "next/navigation";
import { achadosVisiveis } from "@/content/achados";
import Produto from "@/components/v3/Produto";
import { pageMetadata } from "@/lib/site";

export const dynamicParams = false;
export const dynamic = "force-static";
export function generateStaticParams() {
  const publicados = achadosVisiveis().map(({ slug }) => ({ slug }));
  // Next 15 exige pelo menos um parâmetro no export. O sentinela cai em notFound(),
  // sem gerar um produto ou expor rascunhos quando o catálogo está vazio.
  return publicados.length ? publicados : [{ slug: "_sem-achados" }];
}
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const achado = achadosVisiveis().find((item) => item.slug === slug);
  if (!achado) return { title: "Achado não encontrado", robots: { index: false, follow: false } };
  return { ...pageMetadata(achado.nome, achado.motivo, `/achados/${slug}/`), ...(achado.rascunho ? { robots: { index: false, follow: false } } : {}) };
}
export default async function AchadoPage({ params }: Props) {
  const { slug } = await params;
  const itens = achadosVisiveis();
  const achado = itens.find((item) => item.slug === slug);
  if (!achado) notFound();
  return <Produto achado={achado} parecidos={itens.filter((item) => item.slug !== slug && item.categoria === achado.categoria).slice(0, 3)} />;
}
