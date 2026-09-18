import { notFound } from "next/navigation";
import { categories } from "@/lib/content";
import { pageMetadata } from "@/lib/site";
import CategoryNav from "@/components/CategoryNav";
import ArticleFeed from "@/components/ArticleFeed";
type Props = { params: Promise<{ categoria: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return categories.map(({ slug }) => ({ categoria: slug })); }
export async function generateMetadata({ params }: Props) {
  const { categoria } = await params;
  const found = categories.find(({ slug }) => slug === categoria);
  return found ? pageMetadata(`${found.nome}: reviews e dicas`, `Reviews e dicas de ${found.nome.toLowerCase()}, com fontes, preços e limites às claras.`, `/${found.slug}/`) : {};
}
export default async function CategoryPage({ params }: Props) {
  const { categoria } = await params;
  const category = categories.find(({ slug }) => slug === categoria);
  if (!category) notFound();
  return <main id="conteudo" className="container"><CategoryNav current={category.slug} /><header className="category-header"><p className="eyebrow">Dica sem caô</p><h1>{category.nome}<span className="lime">.</span></h1><p className="muted">O que vale seu dinheiro, com os limites às claras.</p></header><section className="tips-section" aria-label={`Artigos de ${category.nome}`}><ArticleFeed category={category.slug} /></section></main>;
}
