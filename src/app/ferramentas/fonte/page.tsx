import FonteDesktop from "@/components/dz/FonteDesktop";
import FonteMobile from "@/components/dz/FonteMobile";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Calculadora de fonte",
  "Toca na placa e no processador. A nota sai na hora, com a soma inteira e a folga para os picos.",
  "/ferramentas/fonte/",
  "/og-nota.png",
);

/* Ferramenta-Mobile (celular) e Fonte-Desktop (computador), de docs/design-1.0 */
export default function FontePage() {
  return (
    <div className="dz" id="conteudo">
      <div className="dz-m tem-d"><div className="dz-quadro-m"><FonteMobile /></div></div>
      <div className="dz-d"><div className="dz-quadro-d"><FonteDesktop /></div></div>
    </div>
  );
}
