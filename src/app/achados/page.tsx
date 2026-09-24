import Image from "next/image";
import ListaAchados from "@/components/v3/ListaAchados";
import { achadosVisiveis } from "@/content/achados";
import { assetPath, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Achados carimbados", "Todo achado tem carimbo, porquê, preço, frete e data.", "/achados/", "/brand/elphy-carimbo.webp");
export default function AchadosPage() {
  const itens = achadosVisiveis();
  return <div className="v3-container"><section className="v3-abertura-achados"><div><p className="v3-etiqueta v3-verde">{itens.length} achados{itens.some((item) => item.rascunho) ? " · prévia com rascunhos" : " · seleção Elphy"}</p><h1>Achados</h1><p>Todo achado tem carimbo, porquê, preço, frete e data.</p></div><Image className="v3-mascote" src={assetPath("/brand/elphy-carimbo.webp")} alt="Elphy carimbando um achado" width={280} height={280} priority /></section><ListaAchados itens={itens} /></div>;
}
