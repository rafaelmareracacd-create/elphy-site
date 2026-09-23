import Correcoes from "@/components/dz/Correcoes";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Correções",
  "Número errado sai do ar e entra nesta lista, com o antes e o depois. Nada some calado.",
  "/correcoes/",
  "/og-nota.png",
);

/* Correcoes-Mobile, de docs/design-1.0 */
export default function CorrecoesPage() {
  return (
    <div className="dz" id="conteudo">
      <div className="dz-m"><div className="dz-quadro-m"><Correcoes /></div></div>
    </div>
  );
}
