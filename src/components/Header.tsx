import Image from "next/image";
import Link from "next/link";
import { assetPath } from "@/lib/site";

export default function Header() {
  return <header className="site-header"><div className="container header-inner">
    <Link href="/" className="brand" aria-label="Elphy, início">
      <Image className="brand-mascot" src={assetPath("/brand/elphy-mascot.webp")} alt="" width={40} height={40} />
      <span><strong className="brand-name">Elphy<span className="lime">.</span></strong><small>Dica sem caô</small></span>
    </Link>
    <nav aria-label="Navegação principal"><Link href="/sobre/" className="header-link">Sobre <span aria-hidden="true">↗</span></Link></nav>
  </div></header>;
}
