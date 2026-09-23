import { Casca, Pagina404 } from "@/components/dz/Estados";
import type { Metadata } from "next";

/* sem canonical: a página que falta não é /404/ */
export const metadata: Metadata = {
  title: "Essa página não fecha a conta",
  description: "O link pode ter mudado. As contas continuam aqui.",
  robots: { index: false },
};

/* Estados-Mobile, estado 1, de docs/design-1.0 */
export default function NotFound() {
  return (
    <div className="dz" id="conteudo">
      <div className="dz-m"><div className="dz-quadro-m"><Casca rotulo="404"><Pagina404 /></Casca></div></div>
    </div>
  );
}
