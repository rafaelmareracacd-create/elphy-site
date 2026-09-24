import Link from "next/link";
import { assetPath } from "@/lib/site";
import { Navegacao } from "./BarraInferior";
import Icone from "./Icone";

export default function Cabecalho() {
  return <header className="v3-cabecalho"><div className="v3-container v3-cabecalho-miolo">
    <Link className="v3-logo" href="/" aria-label="Elphy, início">elphy<span>.</span></Link>
    <Navegacao />
    <form className="v3-busca" action={assetPath("/achados/")} role="search">
      <button type="submit" aria-label="Buscar achado ou vídeo"><Icone nome="busca" /></button>
      <input type="search" name="q" aria-label="Buscar achado ou vídeo" placeholder="Buscar achado ou vídeo" />
    </form>
  </div></header>;
}
