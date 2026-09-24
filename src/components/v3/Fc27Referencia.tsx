import Image from "next/image";
import Link from "next/link";
import Nota from "./Nota";
import { assetPath } from "@/lib/site";

// Conteúdo preservado de components/dz/Fc27.tsx, com a data e as fontes originais.
const EDICOES = [
  { nome: "Standard", console: "R$ 349", pc: "R$ 299" },
  { nome: "Ultimate", console: "R$ 499", pc: "R$ 429" },
  { nome: "Ultimate Plus", console: "R$ 749,50", pc: "R$ 699" },
];
const DEGRAUS = [
  { nome: "Mínimo", placa: "GTX 1050 Ti · RX 570", imagem: "720p · 60 fps", ram: "8 GB, dois pentes" },
  { nome: "Recomendado", placa: "GTX 1660 · RX 5600 XT", imagem: "1080p · 60 fps", ram: "12 GB, dois pentes" },
  { nome: "Alto", placa: "RTX 3060 · RX 6600 XT", imagem: "1440p · 60 fps", ram: "16 GB" },
  { nome: "Ultra", placa: "RTX 4070 · RX 7800 XT", imagem: "4K · 60 fps", ram: "32 GB" },
];
export default function Fc27Referencia() {
  return <div className="v3-fc-referencia">
    <section id="edicoes" className="v3-fc-edicoes">
      <div className="v3-fc-piada">
        <Image className="v3-mascote" src={assetPath("/brand/elphy-andando.webp")} alt="Elphy, o elefante verde, cansado de tanto andar a pé" width={280} height={350} />
        <p className="v3-fc-piada-frase">750 conto pra ir a pé<span className="v3-verde">?</span></p>
        <p>No Clubs você anda até o clube em todas as edições.</p>
      </div>
      <Nota className="v3-nota-edicoes">
        <p className="v3-etiqueta">FC 27 · Preço de lançamento · 24/09/2026</p>
        <h2>Quanto custa cada edição</h2>
        <dl>
          {EDICOES.map((edicao) => <div key={edicao.nome} className="v3-linha-pontos"><dt>{edicao.nome}</dt><dd>{edicao.console} console · {edicao.pc} PC</dd></div>)}
        </dl>
        <p className="v3-nota-edicoes-extra">As mais caras adiantam o acesso e somam FC Points e itens do Ultimate Team.</p>
        <div className="v3-carimbo-modos"><span className="v3-carimbo">Mesmos modos nas 3</span></div>
        <p className="v3-letra-miuda">Fonte indicada na página original: Terra (2026). Preço oficial de lançamento nas lojas digitais; assinante EA Play tem 10% de desconto. Loja física e promoção mudam o valor. Valores preservados, sem nova conferência nesta atualização visual.</p>
      </Nota>
    </section>
    <section className="v3-fc-requisitos" aria-label="Requisitos e avisos">
      <details className="v3-fc-detalhes">
        <summary>Ver a lista completa da EA</summary>
        <div className="v3-papel v3-fc-detalhes-corpo">
          <dl>
            {DEGRAUS.map((degrau) => <div key={degrau.nome} className="v3-linha-pontos"><dt>{degrau.nome}<small>{degrau.placa} · {degrau.ram}</small></dt><dd>{degrau.imagem}</dd></div>)}
          </dl>
          <p>Todos os degraus: Windows 10 ou 11 de 64 bits, DirectX 12 e 100 GB livres. A partir do recomendado, a lista pede SSD.</p>
        </div>
      </details>
      <p className="v3-alternativa"><span>Use dois pentes de memória iguais.</span><Link href="/ferramentas/memoria/">Por quê?</Link></p>
      <p className="v3-alternativa"><span>Precisa de 100 GB livres.</span><Link href="/ferramentas/ssd/">Ver espaço real do SSD</Link></p>
    </section>
    <section className="v3-fontes"><h2>Fontes e data da base</h2><p>Lista de requisitos como divulgada por dlcompare (26/08/2026) e Khel Now (27/07/2026). Base original atualizada em 24/09/2026. As referências e os dados foram mantidos da ferramenta anterior; esta mudança de visual não representa uma nova conferência dos requisitos.</p></section>
  </div>;
}
