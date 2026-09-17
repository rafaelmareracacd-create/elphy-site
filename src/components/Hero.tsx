import Image from "next/image";
import { assetPath } from "@/lib/site";

export default function Hero() {
  return <section className="hero" aria-labelledby="hero-titulo">
    <div className="hero-copy"><p className="eyebrow">A dica é essa.</p>
      <h1 id="hero-titulo">Cupons e reviews <span>sem passar pano.</span></h1>
      <p className="hero-note">Review honesto, cupom se tiver, link do Mercado Livre.</p>
    </div>
    <div className="hero-art"><Image className="hero-mascot" src={assetPath("/brand/elphy-mascot.webp")} alt="Elphy, um elefante verde-limão de óculos e moletom, com celular e joinha." fill sizes="(min-width: 700px) 440px, calc(100vw - 40px)" priority /></div>
  </section>;
}
