import Legal from "@/components/dz/Legal";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "O miúdo, em letra grande",
  "Privacidade, termos e afiliado. Sem juridiquês onde dá. O que não dá para simplificar fica marcado.",
  "/legal/",
  "/og-nota.png",
);

/* Legal-Mobile, de docs/design-1.0 */
export default function LegalPage() {
  return (
    <div className="dz" id="conteudo">
      <div className="dz-m"><div className="dz-quadro-m"><Legal /></div></div>
    </div>
  );
}
