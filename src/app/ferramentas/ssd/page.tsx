import Ssd from "@/components/dz/Ssd";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "O que o Windows vai mostrar",
  "A caixa conta de mil em mil. O Windows conta de 1.024 em 1.024. Nenhum dos dois está mentindo.",
  "/ferramentas/ssd/",
  "/og-nota.png",
);

/* SSD-Mobile, de docs/design-1.0 */
export default function FerramentasSsdPage() {
  return (
    <div className="dz" id="conteudo">
      <div className="dz-m"><div className="dz-quadro-m"><Ssd /></div></div>
    </div>
  );
}
