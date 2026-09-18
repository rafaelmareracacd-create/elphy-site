"use client";
import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { isHttpUrl } from "@/lib/format";
export default function PriceAlertForm({ produto, slug }: { produto: string; slug: string }) {
  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT?.trim() || "";
  const enabled = isHttpUrl(endpoint);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const submitting = useRef(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enabled || submitting.current) return;
    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") || "").trim();
    submitting.current = true; setStatus("sending");
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ email, produto, slug }), signal: controller.signal });
      if (!response.ok) throw new Error("Falha no envio");
      setStatus("success"); form.reset();
    } catch { setStatus("error"); }
    finally { clearTimeout(timer); submitting.current = false; }
  }
  return <section className="price-alert" aria-labelledby="alert-title"><p className="eyebrow">De olho no preço</p><h2 id="alert-title">Me avisa quando baixar</h2>
    <form onSubmit={submit} aria-describedby="alert-status" aria-busy={status === "sending"}>
      <label htmlFor="alert-email">Seu e-mail</label><div className="alert-fields"><input id="alert-email" name="email" type="email" autoComplete="email" inputMode="email" required maxLength={254} placeholder="voce@exemplo.com" disabled={!enabled || status === "sending" || status === "success"} /><button className="button" type="submit" disabled={!enabled || status === "sending" || status === "success"}>{status === "sending" ? "Enviando…" : "Quero o alerta"}</button></div>
      <p id="alert-status" role="status">{!enabled ? "Alerta de preço chega em breve." : status === "success" ? "Pedido recebido. Seu alerta foi solicitado." : status === "error" ? "Não foi possível confirmar o envio. Tente novamente em instantes." : "Ao solicitar, seu e-mail será enviado ao serviço de alertas configurado pelo Elphy."}</p>
      <Link className="text-link" href="/privacidade/">Como usamos seu e-mail</Link><noscript>Ative o JavaScript para enviar o pedido de alerta.</noscript>
    </form>
  </section>;
}
