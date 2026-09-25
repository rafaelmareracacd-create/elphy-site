import Estrutura from "@/components/v3/Estrutura";
import Luz from "@/components/v3/Luz";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Quanto o PC pesa na conta de luz?",
  "Watts, horas por dia e a tarifa da sua conta. A nota mostra quanto o PC custa por mês e por ano.",
  "/ferramentas/conta-de-luz/",
  "/og-nota.png",
);

export default function FerramentasContaDeLuzPage() {
  return <Estrutura><div className="v3-container"><Luz /></div></Estrutura>;
}

export const viewport = { themeColor: "#eeebe5" };
