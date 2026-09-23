import Metodologia from "@/components/dz/Metodologia";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Como o Elphy faz a conta",
  "Três regras e sete fórmulas. Se alguma conta daqui não bate com a sua, a página de correções está aberta.",
  "/metodologia/",
  "/og-nota.png",
);

/* Metodologia-Mobile, de docs/design-1.0 */
export default function MetodologiaPage() {
  return (
    <div className="dz" id="conteudo">
      <div className="dz-m"><div className="dz-quadro-m"><Metodologia /></div></div>
    </div>
  );
}
