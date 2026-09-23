import HomeDesktop from "@/components/dz/HomeDesktop";
import HomeMobile from "@/components/dz/HomeMobile";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Elphy · A conta que a loja não faz",
  "Escolhe a placa de vídeo e o processador. O Elphy soma cada watt e entrega a nota com a conta inteira à vista.",
  "/",
  "/og-nota.png",
);

/* Home: Home-Mobile (celular) e Main (computador), de docs/design-1.0 */
export default function Home() {
  return (
    <div className="dz" id="conteudo">
      <div className="dz-m tem-d"><div className="dz-quadro-m"><HomeMobile /></div></div>
      <div className="dz-d"><div className="dz-quadro-d"><HomeDesktop /></div></div>
    </div>
  );
}
