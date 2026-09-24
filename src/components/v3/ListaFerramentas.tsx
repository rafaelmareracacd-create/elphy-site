"use client";

import Link from "next/link";
import { useState } from "react";
import Nota from "./Nota";

const CATEGORIAS = ["Todas", "PC", "Celular", "Tela e armazenamento", "Casa"];

type Ferramenta = { href?: string; categoria: string; rotulo: string; nome: string; caixa: string; mostra: string; numero: string };

/** Textos e exemplos vindos da página anterior; o FC 27 usa a placa padrão da ferramenta (RX 580 → QUASE). */
const FERRAMENTAS: Ferramenta[] = [
  { href: "/fc27/", categoria: "PC", rotulo: "Nº 01 · PC", nome: "Meu PC roda o FC 27?", caixa: "Radeon RX 580", mostra: "Roda, mas em 720p", numero: "Quase" },
  { href: "/ferramentas/fonte/", categoria: "PC", rotulo: "Nº 02 · PC", nome: "Calculadora de fonte", caixa: "RTX 5070: 250 W", mostra: "Fonte de 550 W", numero: "550 W" },
  { href: "/ferramentas/power-bank/", categoria: "Celular", rotulo: "Nº 03 · Celular", nome: "Power bank de verdade", caixa: "20.000 mAh", mostra: "2,5 cargas, não 4", numero: "2,5" },
  { href: "/ferramentas/ssd/", categoria: "Tela e armazenamento", rotulo: "Nº 04 · Armazenamento", nome: "Espaço real do SSD", caixa: "1 TB", mostra: "931 GB no Windows", numero: "931" },
  { href: "/ferramentas/conta-de-luz/", categoria: "Casa", rotulo: "Nº 05 · Casa", nome: "Conta de luz do PC", caixa: "450 W, 4 h por dia", mostra: "54 kWh por mês", numero: "54 kWh" },
  { href: "/ferramentas/monitor/", categoria: "Tela e armazenamento", rotulo: "Nº 06 · Tela", nome: "Nitidez do monitor", caixa: "27\u2033 QHD", mostra: "109 PPI, pixel some a 80 cm", numero: "109" },
  { href: "/ferramentas/gabinete/", categoria: "PC", rotulo: "Nº 07 · PC", nome: "Cabe no gabinete", caixa: "Placa de 300 mm", mostra: "A menor sobra: 5 mm", numero: "+5" },
  { href: "/ferramentas/memoria/", categoria: "PC", rotulo: "Nº 08 · PC", nome: "Memória certa", caixa: "Ryzen 7000", mostra: "DDR5 até 5.200 MT/s", numero: "DDR5" },
  { href: "/montador/", categoria: "PC", rotulo: "Nº 09 · PC", nome: "Montador de PC", caixa: "6 peças", mostra: "4 conferências na mesma nota", numero: "4/4" },
  { categoria: "Celular", rotulo: "Nº 10 · Celular · em breve", nome: "Comparar celulares", caixa: "2 fichas técnicas", mostra: "Linha por linha, só número", numero: "A×B" },
];

export default function ListaFerramentas() {
  const [categoria, setCategoria] = useState("Todas");
  const lista = FERRAMENTAS.filter((item) => categoria === "Todas" || item.categoria === categoria);
  return <section className="v3-ferramentas-lista" aria-label="Lista de ferramentas">
    <div className="v3-chips v3-rolagem" role="group" aria-label="Categorias">
      {CATEGORIAS.map((nome) => <button type="button" key={nome} aria-pressed={categoria === nome} onClick={() => setCategoria(nome)}>{nome}</button>)}
    </div>
    <div className="v3-ferramentas-grid">
      {lista.map((item) => {
        const nota = <Nota className={`v3-ferramenta${item.href ? "" : " v3-ferramenta-breve"}`}>
          <p className="v3-etiqueta">{item.rotulo}</p>
          <h3>{item.nome}</h3>
          <p className="v3-caixa-diz">A caixa diz · {item.caixa}</p>
          <p>A nota mostra · {item.mostra}</p>
          <p className="v3-ferramenta-numero" aria-hidden="true">{item.numero}</p>
        </Nota>;
        return item.href
          ? <Link className="v3-ferramenta-link" href={item.href} key={item.rotulo}>{nota}</Link>
          : <div className="v3-ferramenta-link" key={item.rotulo}>{nota}</div>;
      })}
    </div>
  </section>;
}
