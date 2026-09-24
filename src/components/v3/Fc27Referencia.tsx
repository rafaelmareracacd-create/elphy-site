import Link from "next/link";

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
    <section id="edicoes"><h2>Quanto custa cada edição</h2><div className="v3-tabela"><table><caption>Preços de lançamento registrados na página em 24/09/2026</caption><thead><tr><th scope="col">Edição</th><th scope="col">Console</th><th scope="col">PC</th></tr></thead><tbody>{EDICOES.map((edicao) => <tr key={edicao.nome}><th scope="row">{edicao.nome}</th><td>{edicao.console}</td><td>{edicao.pc}</td></tr>)}</tbody></table></div><p>Os modos de jogo são os mesmos nas três, inclusive o Clubs no mundo aberto. As mais caras incluem acesso antecipado e somam FC Points e itens do Ultimate Team.</p><p className="v3-letra-miuda">Fonte indicada na página original: Terra (2026). Preço oficial de lançamento nas lojas digitais; assinante EA Play tem 10% de desconto. Loja física e promoção mudam o valor. Valores preservados, sem nova conferência nesta atualização visual.</p></section>
    <section><h2>Os requisitos, degrau por degrau</h2><div className="v3-degraus">{DEGRAUS.map((degrau) => <div key={degrau.nome}><div><h3>{degrau.nome}</h3><strong>{degrau.imagem}</strong></div><p>{degrau.placa} · {degrau.ram}</p></div>)}</div><p>Todos os degraus: Windows 10 ou 11 de 64 bits, DirectX 12 e 100 GB livres. A partir do recomendado, a lista pede SSD.</p></section>
    <section className="v3-como-mede"><h2>A letra miúda da memória</h2><p>A lista pede memória <strong>dual-channel</strong> até no mínimo: dois pentes iguais, nos encaixes que o manual da placa-mãe indica. Com um pente só, a memória trabalha em pista simples e o jogo pode engasgar.</p><Link href="/ferramentas/memoria/">Qual memória seu processador aceita →</Link></section>
    <section className="v3-como-mede"><h2>100 GB livres</h2><p>O mínimo aceita HD; do recomendado para cima, a lista pede SSD. Confira quanto espaço sobra de verdade no seu SSD.</p><Link href="/ferramentas/ssd/">Espaço real do SSD →</Link></section>
    <section className="v3-fontes"><h2>Fontes e data da base</h2><p>Lista de requisitos como divulgada por dlcompare (26/08/2026) e Khel Now (27/07/2026). Base original atualizada em 24/09/2026. As referências e os dados foram mantidos da ferramenta anterior; esta mudança de visual não representa uma nova conferência dos requisitos.</p></section>
  </div>;
}
