"use client";
import { isHttpUrl, textOrPending } from "@/lib/format";
import { trackClick } from "@/lib/track";

export default function AffiliateButton({ id, url }: { id: string; url: string }) {
  if (!isHttpUrl(url)) return <p className="pending">Link: {textOrPending()}</p>;
  return <a className="button" href={url} target="_blank" rel="nofollow sponsored noopener"
    onClick={(event) => { event.preventDefault(); trackClick(id, url); }}
    onAuxClick={(event) => { if (event.button === 1) { event.preventDefault(); trackClick(id, url); } }}>
    <span>Ver no Mercado Livre<span className="sr-only"> (abre em nova aba)</span></span><span aria-hidden="true">↗</span>
  </a>;
}
