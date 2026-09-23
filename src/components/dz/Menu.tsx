"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import MenuConteudo from "./MenuConteudo";

/** O botão de menu de cada prancheta, com o estilo dela; abre o Menu-Mobile por cima da página. */
export default function MenuBotao({ style, children }: { style: CSSProperties; children: ReactNode }) {
  const [aberto, setAberto] = useState(false);
  const botao = useRef<HTMLButtonElement>(null);
  const painel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!aberto) return;
    // diálogo modal: o foco entra no painel, o Tab fica nele e volta ao botão ao fechar
    const focaveis = () => Array.from(painel.current?.querySelectorAll<HTMLElement>("a[href], button, input, [tabindex]:not([tabindex='-1'])") ?? []);
    focaveis()[0]?.focus();
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setAberto(false); return; }
      if (e.key !== "Tab") return;
      const f = focaveis();
      if (!f.length) return;
      const i = f.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    };
    document.addEventListener("keydown", tecla);
    const antes = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const volta = botao.current;
    return () => { document.removeEventListener("keydown", tecla); document.body.style.overflow = antes; volta?.focus(); };
  }, [aberto]);
  return (
    <>
      <button ref={botao} type="button" aria-label="Abrir menu" aria-expanded={aberto} onClick={() => setAberto(true)} style={{ padding: 0, background: "transparent", border: 0, color: "inherit", ...style }}>
        {children}
      </button>
      {aberto ? (
        <div ref={painel} className="dz-menu" role="dialog" aria-modal="true" aria-label="Menu">
          <MenuConteudo onFechar={() => setAberto(false)} />
        </div>
      ) : null}
    </>
  );
}
