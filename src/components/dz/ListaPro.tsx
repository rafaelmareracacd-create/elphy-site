"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

/** Lista de espera do Elphy Pro. Ainda não há servidor: o e-mail não sai do aparelho, e a página diz isso. */
export default function ListaPro({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  const [aviso, setAviso] = useState("");
  return (
    <form
      style={style}
      onSubmit={(e) => {
        e.preventDefault();
        setAviso("A lista ainda não abriu. Seu e-mail não foi enviado; volte quando o Pro for anunciado.");
      }}
    >
      {children}
      {aviso ? (
        <p role="status" style={{ margin: "10px 0 0", fontFamily: "var(--fm)", fontSize: "10.5px", lineHeight: "16px", letterSpacing: ".04em", color: "#ffb020" }}>{aviso}</p>
      ) : null}
    </form>
  );
}
