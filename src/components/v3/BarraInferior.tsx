"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icone from "./Icone";

export function Navegacao({ inferior = false }: { inferior?: boolean }) {
  const path = usePathname();
  return <nav className={inferior ? "v3-barra" : "v3-nav"} aria-label={inferior ? "Navegação inferior" : "Principal"}>
    {([{ href: "/", nome: "Início", icone: "inicio" }, { href: "/achados/", nome: "Achados", icone: "achados" }, { href: "/ferramentas/", nome: "Ferramentas", icone: "ferramentas" }] as const).map((link) => {
      const ativo = link.href === "/" ? path === "/" : link.icone === "ferramentas" ? path.startsWith("/fc27") || path.startsWith("/ferramentas") : path.startsWith("/achados");
      return <Link href={link.href} key={link.href} aria-current={ativo ? "page" : undefined}><Icone nome={link.icone} />{link.nome}</Link>;
    })}
  </nav>;
}
export default function BarraInferior() { return <Navegacao inferior />; }
