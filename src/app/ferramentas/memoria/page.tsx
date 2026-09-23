import Memoria from "@/components/dz/Memoria";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Memória certa",
  "O tipo de memória e a velocidade oficial máxima do seu processador.",
  "/ferramentas/memoria/",
  "/og-nota.png",
);

/* Memoria-Mobile, de docs/design-1.0 */
export default function FerramentasMemoriaPage() {
  return (
    <div className="dz" id="conteudo">
      <div className="dz-m"><div className="dz-quadro-m"><Memoria /></div></div>
    </div>
  );
}
