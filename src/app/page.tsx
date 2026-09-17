import Hero from "@/components/Hero";
import DicaCard from "@/components/DicaCard";
import { getDicas } from "@/lib/content";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Elphy · Dica sem caô", "Cupons e reviews sem passar pano. As dicas dos vídeos, com espaço para o que é bom e o que deixa a desejar.", "/");

export default function Home() {
  const dicas = getDicas();
  return (
    <main id="conteudo" className="container">
      <Hero />
      <section className="tips-section" aria-labelledby="dicas-titulo">
        <div className="section-heading"><h2 id="dicas-titulo">Dicas<span className="lime">.</span></h2><span className="eyebrow muted">Do vídeo pra cá</span></div>
        <div className="tips-grid">{dicas.map((dica, index) => <DicaCard key={dica.slug} dica={dica} numero={index + 1} />)}</div>
        {dicas.length === 0 && <p className="muted">As próximas dicas estão a caminho.</p>}
      </section>
    </main>
  );
}
