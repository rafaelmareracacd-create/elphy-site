import Link from "next/link";
import type { Dica } from "@/lib/content";
import { textOrPending } from "@/lib/format";

export default function DicaCard({ dica, numero }: { dica: Dica; numero: number }) {
  return <Link className="dica-card" href={`/dicas/${dica.slug}/`}>
    <div className="card-top"><span className="card-number">{String(numero).padStart(2, "0")}</span><span className="pill">{textOrPending(dica.categoria)}</span></div>
    <div className="card-copy"><h3>{textOrPending(dica.titulo)}</h3><p className="card-hook">{textOrPending(dica.gancho)}</p></div>
    <span className="card-link">Ver a dica <span aria-hidden="true">↗</span></span>
  </Link>;
}
