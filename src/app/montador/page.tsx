import Estrutura from "@/components/v3/Estrutura";
import Montador from "@/components/v3/Montador";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "As peças do meu PC se encaixam?",
  "Escolhe peça por peça. A nota confere soquete, memória, espaço no gabinete e fonte.",
  "/montador/",
  "/og-nota.png",
);

export default function MontadorPage() {
  return <Estrutura><div className="v3-container"><Montador /></div></Estrutura>;
}

export const viewport = { themeColor: "#eeebe5" };
