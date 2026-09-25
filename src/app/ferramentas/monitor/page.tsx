import Estrutura from "@/components/v3/Estrutura";
import Monitor from "@/components/v3/Monitor";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Esse monitor é nítido de verdade?",
  "Tamanho e resolução viram pixels por polegada, e a distância em que o pixel some.",
  "/ferramentas/monitor/",
  "/og-nota.png",
);

export default function FerramentasMonitorPage() {
  return <Estrutura><div className="v3-container"><Monitor /></div></Estrutura>;
}

export const viewport = { themeColor: "#eeebe5" };
