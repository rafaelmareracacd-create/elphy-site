import MenuConteudo from "@/components/dz/MenuConteudo";
import FerramentasDesktop from "@/components/dz/FerramentasDesktop";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Todas as ferramentas",
  "Cada ferramenta faz uma conta e entrega a nota, com a fórmula à vista.",
  "/ferramentas/",
  "/og-nota.png",
);

/* Menu-Mobile (celular) e Ferramentas-Desktop, de docs/design-1.0 */
export default function FerramentasPage() {
  return (
    <div className="dz" id="conteudo">
      <div className="dz-m tem-d"><div className="dz-quadro-m"><MenuConteudo /></div></div>
      <div className="dz-d"><div className="dz-quadro-d"><FerramentasDesktop /></div></div>
    </div>
  );
}
