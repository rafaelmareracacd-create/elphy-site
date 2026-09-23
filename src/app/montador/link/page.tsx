import MontagemLink from "@/components/dz/MontagemLink";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Te mandaram uma montagem",
  "A montagem que te mandaram, com as quatro conferências. Dá para mexer em qualquer peça e a nota refaz a conta.",
  "/montador/link/",
  "/og-nota.png",
);

/* Montagem-Link-Mobile, de docs/design-1.0 */
export default function MontagemLinkPage() {
  return (
    <div className="dz" id="conteudo">
      <div className="dz-m"><div className="dz-quadro-m"><MontagemLink /></div></div>
    </div>
  );
}
