import Link from "next/link";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Dica não encontrada", "Essa dica não existe (ainda). Veja as outras dicas do Elphy.", "/404/");
export default function NotFound() {
  return <main id="conteudo" className="container reading page-section not-found">
    <span className="eyebrow">404 · Cadê a dica?</span><h1>O elefante perdeu essa página.</h1><p className="muted">Mas tem outras por aqui.</p>
    <Link className="button" href="/">Voltar para as dicas <span aria-hidden="true">↗</span></Link>
  </main>;
}
