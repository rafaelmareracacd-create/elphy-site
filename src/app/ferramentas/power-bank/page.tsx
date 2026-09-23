import PowerBank from "@/components/dz/PowerBank";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Power bank de verdade",
  "Quantas cargas o power bank dá de verdade, e para onde vai o resto.",
  "/ferramentas/power-bank/",
  "/og-nota.png",
);

/* PowerBank-Mobile, de docs/design-1.0 */
export default function FerramentasPowerBankPage() {
  return (
    <div className="dz" id="conteudo">
      <div className="dz-m"><div className="dz-quadro-m"><PowerBank /></div></div>
    </div>
  );
}
