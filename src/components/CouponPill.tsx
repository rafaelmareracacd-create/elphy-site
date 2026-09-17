"use client";
import { useEffect, useRef, useState } from "react";
import { isPending, textOrPending } from "@/lib/format";

export default function CouponPill({ cupom }: { cupom: string }) {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (resetTimer.current !== null) clearTimeout(resetTimer.current); }, []);
  if (!cupom.trim()) return null;
  async function copy() {
    try {
      await navigator.clipboard.writeText(cupom);
      setCopied(true);
      if (resetTimer.current !== null) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback silencioso: o texto continua selecionável para cópia manual.
    }
  }
  return <div className="coupon"><span>Cupom do vendedor: <strong className={isPending(cupom) ? "pending" : ""}>{textOrPending(cupom)}</strong></span>
    <button type="button" onClick={copy} disabled={isPending(cupom)} aria-label={isPending(cupom) ? "Cupom a conferir" : `Copiar cupom ${cupom}`}>
      <span role="status" aria-live="polite">{copied ? "Copiado. Cola no checkout." : "Copiar cupom"}</span>
    </button>
  </div>;
}
