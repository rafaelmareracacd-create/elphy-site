"use client";
import { isHttpUrl, textOrPending } from "@/lib/format";
import { trackClick } from "@/lib/track";

export default function AffiliateButton({ id, url, label = "Ver no Mercado Livre" }: { id: string; url: string; label?: string }) {
  if (!isHttpUrl(url)) return <p className="pending">Link: {textOrPending()}</p>;
  return <a className="button" href={url} target="_blank" rel="sponsored noopener noreferrer"
    onClick={(event) => { event.preventDefault(); trackClick(id, url); }}
    onAuxClick={(event) => { if (event.button === 1) { event.preventDefault(); trackClick(id, url); } }}>
    <span>{label}<span className="sr-only"> (abre em nova aba)</span></span><span aria-hidden="true">↗</span>
  </a>;
}
