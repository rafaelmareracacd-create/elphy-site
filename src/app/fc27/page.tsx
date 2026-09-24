import Fc27 from "@/components/v3/Fc27";
import Fc27Referencia from "@/components/v3/Fc27Referencia";
import Estrutura from "@/components/v3/Estrutura";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Meu PC roda o FC 27?",
  "Digita a sua placa de vídeo e veja em que imagem o FC 27 deve rodar, e quanto custa cada edição do jogo.",
  "/fc27/",
);

export default function Fc27Page() {
  return <Estrutura><div className="v3-container"><Fc27 /><Fc27Referencia /></div></Estrutura>;
}

export const viewport = { themeColor: "#eeebe5" };
