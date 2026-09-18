import Link from "next/link";
import { categories, type Category } from "@/lib/content";
export default function CategoryNav({ current }: { current?: Category }) {
  return <nav className="category-nav" aria-label="Categorias">{categories.map((category) => <Link className="pill" key={category.slug} href={`/${category.slug}/`} aria-current={current === category.slug ? "page" : undefined}>{category.nome}</Link>)}</nav>;
}
