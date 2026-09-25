import Estrutura from "@/components/v3/Estrutura";
import Memoria from "@/components/v3/Memoria";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Qual memória o meu processador aceita?",
  "Toca na geração do processador. A nota diz o tipo de memória (DDR4 ou DDR5) e o teto oficial de velocidade.",
  "/ferramentas/memoria/",
  "/og-nota.png",
);

export default function FerramentasMemoriaPage() {
  return <Estrutura><div className="v3-container"><Memoria /></div></Estrutura>;
}

export const viewport = { themeColor: "#eeebe5" };
