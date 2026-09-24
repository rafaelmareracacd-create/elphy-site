import Image from "next/image";
import Link from "next/link";
import Nota from "@/components/v3/Nota";
import { assetPath } from "@/lib/site";

// Achado inexistente ou ainda em rascunho: mesmo estado vazio da lista, dentro do
// layout claro (Estrutura) que envolve /achados/ — nada do 404 escuro antigo.
export default function AchadoNaoEncontrado() {
  return <div className="v3-container">
    <Nota className="v3-vazio">
      <Image src={assetPath("/brand/elphy-carimbo.webp")} alt="Elphy preparando o carimbo" width={150} height={150} />
      <div><p className="v3-etiqueta">O carimbo está quase pronto</p><h3>Os primeiros achados carimbados chegam esta semana.</h3><p>Enquanto isso, o Elphy faz a conta com você.</p><Link className="v3-botao" href="/fc27/">Meu PC roda o FC 27? →</Link></div>
    </Nota>
  </div>;
}
