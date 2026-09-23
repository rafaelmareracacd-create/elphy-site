import BuscaMobile from "@/components/dz/BuscaMobile";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Buscar no Elphy",
  "Busca pelo nome da peça, do jeito que está na caixa: a conta, a ficha e as dicas.",
  "/busca/",
  "/og-nota.png",
);

/* Busca-Mobile (e o estado "busca sem resultado" de Estados-Mobile), de docs/design-1.0 */
export default function BuscaPage() {
  return (
    <div className="dz" id="conteudo">
      <div className="dz-m"><div className="dz-quadro-m"><BuscaMobile /></div></div>
    </div>
  );
}
