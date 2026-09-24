import Image from "next/image";
import Link from "next/link";
import type { Achado } from "@/content/achados";
import { assetPath } from "@/lib/site";
import Carimbo from "./Carimbo";
import { Preco, LinkLoja } from "./Oferta";
import Cupom from "./Cupom";
import { temCupomReal } from "@/lib/achados";

export default function TiraAchado({ achado, className }: { achado: Achado; className?: string }) {
  return <article className={`v3-tira${className ? ` ${className}` : ""}`}>
    <div className="v3-tira-carimbo"><Carimbo tipo={achado.carimbo} /></div>
    <p className="v3-etiqueta">{achado.categoria}{achado.videoUrl && <span className="v3-verde"> ▶ Saiu no vídeo</span>}</p>
    <div className="v3-tira-produto">
      {achado.imagem ? <Image src={assetPath(achado.imagem.src)} alt={achado.imagem.alt} width={70} height={70} /> : <div className="v3-foto-mini" aria-label="Foto do produto ainda não cadastrada">[FOTO]</div>}
      <div><h3><Link href={`/achados/${achado.slug}/`}>{achado.nome}</Link></h3><p>{achado.motivo}</p></div>
    </div>
    {temCupomReal(achado) && <Cupom cupom={achado.cupom!} />}
    {achado.carimbo === "deixa" ? <p className="v3-alternativa">Em vez disso: {achado.alternativa ? <Link href={achado.alternativa.href}>{achado.alternativa.rotulo}</Link> : "alternativa a conferir"}</p> : <div className="v3-tira-oferta"><Preco loja={achado.lojaPrincipal} /><LinkLoja loja={achado.lojaPrincipal} rascunho={achado.rascunho} /></div>}
    {achado.rascunho && <p className="v3-rascunho">Rascunho · exemplo da prancheta</p>}
  </article>;
}
