import Image from "next/image";
import Link from "next/link";
import { assetPath, contactEmail } from "@/lib/site";
import { textOrPending } from "@/lib/format";

export default function Footer() {
  return <footer className="site-footer"><div className="container footer-content">
    <div className="footer-brand"><Image className="footer-mascot" src={assetPath("/brand/elphy-mascot.webp")} width={32} height={32} alt="" /><p>Dica sem caô<span className="lime">.</span></p></div>
    <p className="footer-disclosure">Link de afiliado. A gente ganha comissão; você paga o mesmo.</p>
    <nav className="footer-links" aria-label="Navegação do rodapé"><Link href="/sobre/">Sobre</Link><Link href="/privacidade/">Política de privacidade</Link><a href={`mailto:${contactEmail}`}>Contato: {textOrPending()}</a></nav>
  </div></footer>;
}
