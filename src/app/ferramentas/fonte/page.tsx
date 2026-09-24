import Estrutura from "@/components/v3/Estrutura";
import Fonte from "@/components/v3/Fonte";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Qual fonte o meu PC pede?",
  "Toca na placa e no processador. A nota sai na hora, com a soma inteira e a folga para os picos.",
  "/ferramentas/fonte/",
  "/og-nota.png",
);

export default function FontePage() {
  return <Estrutura><div className="v3-container"><Fonte /></div></Estrutura>;
}

export const viewport = { themeColor: "#eeebe5" };
