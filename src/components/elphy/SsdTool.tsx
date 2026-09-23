"use client";

import { useEffect, useState } from "react";
import { SSD_OPCOES } from "@/lib/catalogo";
import { bytesDeRotuloGb, ssdGbVisiveis } from "@/lib/contas";
import Nota, { dataNota } from "@/components/elphy/Nota";

function milhar(valor: number) {
  return String(Math.round(valor)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function virgula(valor: number, casas: number) {
  return valor.toFixed(casas).replace(".", ",");
}

export default function SsdTool() {
  const [gb, setGb] = useState(1000);
  const [enviado, setEnviado] = useState(false);
  const opcao = SSD_OPCOES.find((item) => item.gb === gb) ?? SSD_OPCOES[3];
  const exato = opcao.gb * 1e9 / 1_073_741_824;
  const visivel = ssdGbVisiveis(bytesDeRotuloGb(opcao.gb));
  const some = Math.round(opcao.gb - exato);
  const perda = (1 - exato / opcao.gb) * 100;
  const { impresso, mostrado } = useImpressao(visivel, String(opcao.gb));
  const [quando, setQuando] = useState("");
  useEffect(() => { setQuando(dataNota()); }, [opcao.gb]);

  async function mandar() {
    const texto = [
      `Elphy · SSD ${opcao.rotulo}`,
      `Na caixa: ${milhar(opcao.gb * 1e9)} bytes`,
      `No Windows: ${visivel} GB`,
      "Estimativa pela fórmula da metodologia. Não garante compatibilidade.",
    ].join("\n");
    try { await navigator.clipboard.writeText(texto); } catch { /* confirmação local */ }
    setEnviado(true);
    window.setTimeout(() => setEnviado(false), 1800);
  }

  return (
    <div className="el-bancada">
      <div className="el-bancada-texto">
        <p className="el-kicker">Ferramenta nº 03</p>
        <h1>O que o<br />Windows<br />vai mostrar<span className="el-lima">.</span></h1>
        <p className="el-lead">A caixa conta de mil em mil. O Windows conta de 1.024 em 1.024. Nenhum dos dois está mentindo.</p>
        <fieldset className="el-grupo">
          <legend><span>01 — O que a caixa diz</span><small>{opcao.rotulo}</small></legend>
          <div className="el-rolo">
            {SSD_OPCOES.map((item) => (
              <button key={item.gb} type="button" className="el-chip" aria-pressed={item.gb === opcao.gb} onClick={() => { setGb(item.gb); setEnviado(false); }}>
                <b>{item.rotulo}</b>
                <small>na caixa</small>
              </button>
            ))}
          </div>
        </fieldset>
      </div>
      <div className="el-bancada-nota">
        <Nota
          impresso={impresso}
          numero={String(opcao.gb).padStart(4, "0")}
          cupom="Cupom de medição · espaço"
          data={quando || undefined}
          linhas={[
            { nome: `Na caixa (${opcao.rotulo})`, valor: `${milhar(bytesDeRotuloGb(opcao.gb))} bytes` },
            { nome: "÷ 1.073.741.824", valor: `${milhar(visivel)} GB` },
            { nome: "Some da conta", valor: `−${milhar(some)} GB`, forte: true },
            { nome: "Em porcentagem", valor: `−${virgula(perda, 1)}%` },
          ]}
          rotulo="Aparece no Windows"
          total={String(mostrado)}
          unidade="GB"
          sub="Antes de instalar qualquer coisa. O sistema ocupa mais."
          notaExtra="Não é defeito e não dá para recuperar. Se o número for muito menor que este, aí vale desconfiar do SSD."
          codigo={`ELPHY-${String(opcao.gb).padStart(4, "0")}-SSD`}
          selo="lima"
          seloTopo="Normal"
          seloMeio={`−${virgula(perda, 1).split(",")[0]}%`}
          seloBase="não é golpe"
          led="pronta"
          semente={String(opcao.gb)}
        />
      </div>
      <div className="el-acoes">
        <button type="button" className="el-btn" onClick={mandar}>{enviado ? "Nota copiada" : "Mandar a nota no WhatsApp"}</button>
      </div>
      <aside className="el-caixa">
        <span>Onde desconfiar</span>
        <p>SSD de 2 TB por preço de 256 GB costuma ser pen drive com firmware mexido: mostra 2 TB e corrompe o que passar do tamanho real. Isso a conta não pega — só um teste de gravação.</p>
      </aside>
    </div>
  );
}

function useImpressao(alvo: number, chave: string) {
  const [impresso, setImpresso] = useState(false);
  const [mostrado, setMostrado] = useState(alvo);
  useEffect(() => {
    let quadro = 0;
    setImpresso(false);
    setMostrado(0);
    const espera = window.setTimeout(() => {
      setImpresso(true);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setMostrado(alvo);
        return;
      }
      const inicio = performance.now();
      const passo = (agora: number) => {
        const p = Math.min((agora - inicio) / 700, 1);
        setMostrado(Math.round(alvo * (1 - (1 - p) ** 3)));
        if (p < 1) quadro = requestAnimationFrame(passo);
      };
      quadro = requestAnimationFrame(passo);
    }, 60);
    return () => {
      window.clearTimeout(espera);
      cancelAnimationFrame(quadro);
    };
  }, [alvo, chave]);
  return { impresso, mostrado };
}
