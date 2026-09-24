import Image from "next/image";
import Link from "next/link";
import { achadosVisiveis } from "@/content/achados";
import { assetPath } from "@/lib/site";
import Carimbo from "./Carimbo";
import ListaAchados from "./ListaAchados";
import Nota from "./Nota";

export default function Home() {
  return <div className="v3-container">
    <section className="v3-hero">
      <div><h1>O Elphy carimba os achados do TikTok<span className="v3-verde">.</span></h1><div className="v3-legenda-carimbos" role="group" aria-label="Os carimbos do Elphy"><Carimbo tipo="vale" /><Carimbo tipo="depende" /><Carimbo tipo="deixa" /></div><p>Cada achado leva um carimbo e o porquê, com preço, frete e data. Grátis, sem cadastro.</p></div>
      <Image className="v3-mascote v3-heroi" src={assetPath("/brand/elphy-heroi.webp")} alt="Elphy, o elefante verde de moletom, segura um carimbo no alto" width={420} height={525} priority />
    </section>
    <section className="v3-chamada-fc" aria-label="Ferramenta em destaque">
      <div className="v3-chamada-tarja"><span>▶ Veio do vídeo?</span><span>TikTok · FC 27</span></div>
      <Image src={assetPath("/brand/elphy-controle.webp")} alt="Elphy com um controle de videogame" width={120} height={120} />
      <div className="v3-chamada-copy"><h2>Meu PC roda o FC 27?</h2><p>Toca na sua placa e a nota sai na hora.</p></div>
      <Link className="v3-botao" href="/fc27/">Fazer a conta →</Link>
    </section>
    <ListaAchados itens={achadosVisiveis()} home />
    <section className="v3-ferramentas-home">
      <Image className="v3-mascote" src={assetPath("/brand/elphy-nota-claro.webp")} alt="Elphy segura uma nota comprida" width={340} height={425} />
      <div><p className="v3-etiqueta v3-verde">Ferramentas</p><h2>A conta que a loja não faz<span className="v3-verde">.</span></h2><Nota className="v3-menu-ferramentas">
        {[
          ["/fc27/", "Meu PC roda o jogo?", "Imprime RODA, QUASE ou NÃO RODA.", "?"],
          ["/ferramentas/fonte/", "Qual fonte eu preciso?", "Soma cada watt, com folga.", "W"],
          ["/ferramentas/power-bank/", "Power bank de verdade", "Quantas cargas chegam no celular.", "mAh"],
          ["/ferramentas/conta-de-luz/", "Conta de luz do setup", "Quanto o PC custa por mês.", "R$"],
        ].map(([href, titulo, texto, unidade]) => <Link href={href} key={href}><span><strong>{titulo}</strong><small>{texto}</small></span><b aria-hidden="true">{unidade}</b></Link>)}
      </Nota></div>
    </section>
  </div>;
}
