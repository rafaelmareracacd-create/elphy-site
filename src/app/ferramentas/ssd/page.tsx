import Estrutura from "@/components/v3/Estrutura";
import Ssd from "@/components/v3/Ssd";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Cadê os GB do meu SSD?",
  "A caixa conta de mil em mil. O Windows conta de 1.024 em 1.024. A nota mostra a diferença e prova que não é golpe.",
  "/ferramentas/ssd/",
  "/og-nota.png",
);

export default function FerramentasSsdPage() {
  return <Estrutura><div className="v3-container"><Ssd /></div></Estrutura>;
}

export const viewport = { themeColor: "#eeebe5" };
