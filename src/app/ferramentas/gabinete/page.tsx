import Gabinete from "@/components/dz/Gabinete";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Cabe no gabinete?",
  "Placa de vídeo e cooler contra o espaço do gabinete, com margem de folga.",
  "/ferramentas/gabinete/",
  "/og-nota.png",
);

/* Gabinete-Mobile, de docs/design-1.0 */
export default function FerramentasGabinetePage() {
  return (
    <div className="dz" id="conteudo">
      <div className="dz-m"><div className="dz-quadro-m"><Gabinete /></div></div>
    </div>
  );
}
