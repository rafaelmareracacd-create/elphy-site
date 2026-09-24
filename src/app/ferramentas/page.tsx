import Image from "next/image";
import Estrutura from "@/components/v3/Estrutura";
import ListaFerramentas from "@/components/v3/ListaFerramentas";
import { assetPath, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Todas as ferramentas",
  "Cada ferramenta faz uma conta e entrega a nota, com a fórmula à vista.",
  "/ferramentas/",
  "/og-nota.png",
);

export default function FerramentasPage() {
  return <Estrutura><div className="v3-container">
    <section className="v3-abertura-ferramentas">
      <div>
        <p className="v3-etiqueta v3-verde">Ferramentas</p>
        <h1>A conta que a loja não faz<span className="v3-verde">.</span></h1>
        <p>Cada ferramenta termina numa nota: as linhas, a soma e o resultado carimbado. A fórmula de todas está na metodologia.</p>
      </div>
      <Image className="v3-mascote" src={assetPath("/brand/elphy-nota-claro.webp")} alt="Elphy segura uma nota comprida" width={280} height={350} priority />
    </section>
    <ListaFerramentas />
  </div></Estrutura>;
}

export const viewport = { themeColor: "#eeebe5" };
