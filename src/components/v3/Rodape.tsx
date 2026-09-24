import Link from "next/link";
export default function Rodape() {
  return <footer className="v3-rodape"><div className="v3-container">
    <p>Os links são de afiliado: se você comprar, o Elphy pode ganhar comissão. O carimbo não muda por isso.</p>
    <div><span>Dica sem caô<span className="v3-verde">.</span></span><Link href="/metodologia/">Como a gente carimba</Link><Link href="/correcoes/">Correções</Link></div>
  </div></footer>;
}
