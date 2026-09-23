import Luz from "@/components/dz/Luz";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Conta de luz do PC",
  "Watts, horas por dia e a tarifa da sua conta. A nota mostra quanto o PC custa por mês e por ano.",
  "/ferramentas/conta-de-luz/",
  "/og-nota.png",
);

/* Luz-Mobile, de docs/design-1.0 */
export default function FerramentasContaDeLuzPage() {
  return (
    <div className="dz" id="conteudo">
      <div className="dz-m"><div className="dz-quadro-m"><Luz /></div></div>
    </div>
  );
}
