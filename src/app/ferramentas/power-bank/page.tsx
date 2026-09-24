import Estrutura from "@/components/v3/Estrutura";
import PowerBank from "@/components/v3/PowerBank";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Quantas cargas o power bank dá de verdade?",
  "Toca na capacidade da caixa e na bateria do seu celular. A nota mostra quanto se perde no caminho e quantas cargas chegam.",
  "/ferramentas/power-bank/",
  "/og-nota.png",
);

export default function FerramentasPowerBankPage() {
  return <Estrutura><div className="v3-container"><PowerBank /></div></Estrutura>;
}

export const viewport = { themeColor: "#eeebe5" };
