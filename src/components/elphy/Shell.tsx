"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

const NAV = [
  { href: "/ferramentas/fonte/", nome: "Ferramentas" },
  { href: "/montador/", nome: "Montador" },
  { href: "/metodologia/", nome: "Metodologia" },
  { href: "/sobre/", nome: "Sobre" },
];

type Item = { nome: string; href?: string; marca: string };

const MENU: { titulo: string; itens: Item[] }[] = [
  {
    titulo: "PC",
    itens: [
      { nome: "Montador de PC", href: "/montador/", marca: "4/4" },
      { nome: "Calculadora de fonte", href: "/ferramentas/fonte/", marca: "W" },
      { nome: "Cabe no gabinete", marca: "em breve" },
      { nome: "Memória certa", marca: "em breve" },
    ],
  },
  {
    titulo: "Celular",
    itens: [
      { nome: "Power bank de verdade", marca: "em breve" },
      { nome: "Comparar celulares", marca: "em breve" },
    ],
  },
  {
    titulo: "Tela e armazenamento",
    itens: [
      { nome: "Espaço real do SSD", href: "/ferramentas/ssd/", marca: "GB" },
      { nome: "Nitidez do monitor", marca: "em breve" },
    ],
  },
  {
    titulo: "Casa",
    itens: [{ nome: "Conta de luz do PC", marca: "em breve" }],
  },
];

export default function Shell({ rotulo, children }: { rotulo: string; children: React.ReactNode }) {
  const [aberto, setAberto] = useState(false);
  const tituloId = useId();
  const fecharRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!aberto) return;
    fecharRef.current?.focus();
    const noTeclado = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") setAberto(false);
    };
    document.addEventListener("keydown", noTeclado);
    return () => document.removeEventListener("keydown", noTeclado);
  }, [aberto]);

  return (
    <div className="elphy">
      <header className="el-header">
        <Link href="/" className="el-logo">elphy<span>.</span></Link>
        <div className="el-header-lado">
          <nav className="el-nav" aria-label="Navegação principal">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href}>{item.nome}</Link>
            ))}
          </nav>
          <span className="el-rotulo-pagina">{rotulo}</span>
          <button type="button" className="el-menu-botao" aria-label="Abrir menu" aria-expanded={aberto} onClick={() => setAberto(true)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 8h16M4 16h16" />
            </svg>
          </button>
        </div>
      </header>
      {aberto ? (
        <div className="el-menu" role="dialog" aria-modal="true" aria-labelledby={tituloId}>
          <div className="el-menu-topo">
            <Link href="/" className="el-logo" onClick={() => setAberto(false)}>elphy<span>.</span></Link>
            <button ref={fecharRef} type="button" className="el-menu-fechar" aria-label="Fechar menu" onClick={() => setAberto(false)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <p id={tituloId} className="el-menu-busca">Busca das ferramentas · em breve</p>
          {MENU.map((grupo) => (
            <div key={grupo.titulo} className="el-menu-grupo">
              <span>{grupo.titulo}</span>
              {grupo.itens.map((item) => item.href ? (
                <Link key={item.nome} href={item.href} onClick={() => setAberto(false)}>
                  <span>{item.nome}</span><small>{item.marca}</small>
                </Link>
              ) : (
                <p key={item.nome}><span>{item.nome}</span><small>{item.marca}</small></p>
              ))}
            </div>
          ))}
          <div className="el-menu-grandes">
            <Link href="/metodologia/" onClick={() => setAberto(false)}>Metodologia</Link>
            <Link href="/sobre/" onClick={() => setAberto(false)}>Sobre</Link>
            <Link href="/correcoes/" onClick={() => setAberto(false)}>Correções</Link>
          </div>
          <div className="el-menu-rodape">
            <span>TikTok · [@ do canal]</span>
            <Link href="/legal/" onClick={() => setAberto(false)}>Privacidade</Link>
          </div>
        </div>
      ) : null}
      <main id="conteudo">{children}</main>
      <footer className="el-footer">
        <div>
          <p>Dica sem caô<span>.</span></p>
          <p>Ferramentas que mostram a conta inteira, para você comprar peça sabendo o que está comprando.</p>
        </div>
        <nav aria-label="Navegação do rodapé">
          <Link href="/ferramentas/fonte/">Fazer a conta</Link>
          <Link href="/montador/">Montador</Link>
          <Link href="/ferramentas/ssd/">SSD</Link>
          <Link href="/metodologia/">Como a gente faz a conta</Link>
          <Link href="/correcoes/">Correções</Link>
          <Link href="/legal/">Privacidade e afiliado</Link>
          <Link href="/sobre/">Sobre</Link>
        </nav>
        <p className="el-copy">© 2026 Elphy. Links de loja podem render comissão para o Elphy. O preço para você não muda.</p>
      </footer>
    </div>
  );
}
