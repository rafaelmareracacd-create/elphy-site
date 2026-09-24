import { Big_Shoulders, Schibsted_Grotesk, Martian_Mono } from "next/font/google";
import Cabecalho from "./Cabecalho";
import BarraInferior from "./BarraInferior";
import Rodape from "./Rodape";
import "@/app/v3.css";

// O catálogo do Next 15.5 unificou Big Shoulders Display em Big Shoulders (eixo opsz).
const display = Big_Shoulders({ subsets: ["latin"], weight: "variable", axes: ["opsz"], display: "swap", variable: "--font-v3-display", adjustFontFallback: false });
const corpo = Schibsted_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], display: "swap", variable: "--font-v3-corpo" });
const mono = Martian_Mono({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap", variable: "--font-v3-mono" });

export default function Estrutura({ children }: { children: React.ReactNode }) {
  return <div className={`v3 ${display.variable} ${corpo.variable} ${mono.variable}`}><Cabecalho /><main id="conteudo">{children}</main><Rodape /><BarraInferior /></div>;
}
