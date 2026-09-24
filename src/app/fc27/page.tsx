import Fc27 from "@/components/dz/Fc27";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Meu PC roda o FC 27?",
  "Digita a sua placa de vídeo e veja em que imagem o FC 27 deve rodar, e quanto custa cada edição do jogo.",
  "/fc27/",
);

export default function Fc27Page() {
  return (
    <div className="dz" id="conteudo">
      <div className="dz-m"><div className="dz-quadro-m"><Fc27 /></div></div>
    </div>
  );
}
