import Hero from "@/components/Hero";
import ArticleFeed from "@/components/ArticleFeed";
import CategoryNav from "@/components/CategoryNav";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Elphy · Dica sem caô", "Cupons e reviews sem passar pano. As dicas dos vídeos, com espaço para o que é bom e o que deixa a desejar.", "/");

export default function Home() {
  return (
    <main id="conteudo" className="container">
      <CategoryNav />
      <Hero />
      <section className="tips-section" aria-labelledby="dicas-titulo">
        <div className="section-heading"><h2 id="dicas-titulo">Últimas dicas<span className="lime">.</span></h2><span className="eyebrow muted">Mais recentes primeiro</span></div>
        <ArticleFeed />
      </section>
    </main>
  );
}
