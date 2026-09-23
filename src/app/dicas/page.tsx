import DicasLista from "@/components/dz/DicasLista";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Dicas sem caô",
  "Cada dica termina numa conta que você refaz com as suas peças.",
  "/dicas/",
  "/og-nota.png",
);

/* Dicas-Lista, de docs/design-1.0 */
export default function DicasPage() {
  return (
    <div className="dz" id="conteudo">
      <div className="dz-m"><div className="dz-quadro-m"><DicasLista /></div></div>
    </div>
  );
}
