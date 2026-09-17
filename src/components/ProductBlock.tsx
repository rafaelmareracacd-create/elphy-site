import Image from "next/image";
import type { ReactNode } from "react";
import type { Product } from "@/lib/content";
import { isHttpUrl, isPending, textOrPending } from "@/lib/format";
import { assetPath } from "@/lib/site";
import CouponPill from "./CouponPill";
import AffiliateButton from "./AffiliateButton";

export default function ProductBlock({ produto, id, compact = false, children }: { produto: Product; id: string; compact?: boolean; children?: ReactNode }) {
  const hasImage = !isPending(produto.imagem) && (isHttpUrl(produto.imagem) || /^\/(?!\/)/.test(produto.imagem));
  return <section className={`product-block ${compact ? "product-compact" : "product-main"}`} aria-label={textOrPending(produto.nome)}>
    <div className="product-image">
      {hasImage ? <Image src={produto.imagem.startsWith("/") ? assetPath(produto.imagem) : produto.imagem} alt={`Foto de ${textOrPending(produto.nome)}`} fill sizes="(min-width: 700px) 328px, calc(100vw - 40px)" /> : <>
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="6" y="8" width="36" height="32" rx="5" /><circle cx="17" cy="19" r="3" /><path d="m8 35 11-10 7 6 6-7 10 11" /></svg>
        <span>FOTO DO PRODUTO</span><span>{textOrPending()}</span>
      </>}
    </div>
    <div className="product-info">
      {compact ? <h3 className="product-name">{textOrPending(produto.nome)}</h3> : <h2 className="product-name">{textOrPending(produto.nome)}</h2>}
      <p className={`price ${!isPending(produto.cupom) ? "has-coupon" : ""}`}>{textOrPending(produto.preco)}</p>
      <CouponPill cupom={produto.cupom} />{children}<AffiliateButton id={id} url={produto.link} />
    </div>
  </section>;
}
