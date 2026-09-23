import MontadorDesktop from "@/components/dz/MontadorDesktop";
import MontadorMobile from "@/components/dz/MontadorMobile";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Montador de PC",
  "Escolhe peça por peça. A nota confere soquete, memória, espaço no gabinete e fonte.",
  "/montador/",
  "/og-nota.png",
);

/* Montador-Mobile (celular) e Montador (computador), de docs/design-1.0 */
export default function MontadorPage() {
  return (
    <div className="dz" id="conteudo">
      <div className="dz-m tem-d"><div className="dz-quadro-m"><MontadorMobile /></div></div>
      <div className="dz-d"><div className="dz-quadro-d"><MontadorDesktop /></div></div>
    </div>
  );
}
