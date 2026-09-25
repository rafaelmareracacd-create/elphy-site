import Estrutura from "@/components/v3/Estrutura";
import Gabinete from "@/components/v3/Gabinete";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Cabe no meu gabinete?",
  "Placa de vídeo e cooler contra o espaço do gabinete. A nota diz quantos milímetros sobram — ou faltam.",
  "/ferramentas/gabinete/",
  "/og-nota.png",
);

export default function FerramentasGabinetePage() {
  return <Estrutura><div className="v3-container"><Gabinete /></div></Estrutura>;
}

export const viewport = { themeColor: "#eeebe5" };
