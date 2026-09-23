import Monitor from "@/components/dz/Monitor";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Nitidez do monitor",
  "Tamanho e resolução viram pixels por polegada, e a distância em que o pixel some.",
  "/ferramentas/monitor/",
  "/og-nota.png",
);

/* Monitor-Mobile, de docs/design-1.0 */
export default function FerramentasMonitorPage() {
  return (
    <div className="dz" id="conteudo">
      <div className="dz-m"><div className="dz-quadro-m"><Monitor /></div></div>
    </div>
  );
}
