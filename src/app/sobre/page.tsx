import Sobre from "@/components/dz/Sobre";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Esse é o Elphy",
  "Ele faz a conta que a loja não faz, e mostra a fórmula.",
  "/sobre/",
  "/og-nota.png",
);

/* Sobre-Mobile, de docs/design-1.0 */
export default function SobrePage() {
  return (
    <div className="dz" id="conteudo">
      <div className="dz-m"><div className="dz-quadro-m"><Sobre /></div></div>
    </div>
  );
}
