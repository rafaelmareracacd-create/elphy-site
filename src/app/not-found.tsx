import Image from "next/image";
import Link from "next/link";
import { assetPath, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Dica não encontrada", "Essa dica não existe (ainda). Veja as outras dicas do Elphy.", "/404/");
export default function NotFound() {
  return <main id="conteudo" className="container reading page-section not-found">
    <div className="hero-art"><Image className="hero-mascot" src={assetPath("/brand/elphy-mascot.webp")} alt="Mascote Elphy dando um joinha." fill sizes="280px" /></div>
    <span className="eyebrow">404 · Cadê a dica?</span><h1>O elefante perdeu essa página.</h1><p className="muted">Mas tem outras por aqui.</p>
    <Link className="button" href="/">Voltar para as dicas <span aria-hidden="true">↗</span></Link>
  </main>;
}
