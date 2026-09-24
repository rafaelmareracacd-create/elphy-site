"use client";
import { useState } from "react";
import type { Achado } from "@/content/achados";
import { dataConferencia } from "@/lib/achados";
export default function Cupom({ cupom, rascunho }: { cupom: NonNullable<Achado["cupom"]>; rascunho: boolean }) {
  const [status, setStatus] = useState("");
  async function copiar() {
    try { await navigator.clipboard.writeText(cupom.codigo); setStatus("Copiado"); }
    catch { setStatus("Selecione e copie o código acima."); }
  }
  return <div className="v3-cupom"><span>Cupom <b>{cupom.codigo}</b> · {cupom.validade ? `até ${dataConferencia(cupom.validade)}` : "validade a conferir"}</span><button type="button" onClick={copiar} disabled={rascunho}>Copiar</button>{status && <span role="status">{status}</span>}</div>;
}
