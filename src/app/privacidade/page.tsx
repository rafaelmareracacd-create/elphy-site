import { contactEmail, pageMetadata } from "@/lib/site";
import { textOrPending } from "@/lib/format";

export const metadata = pageMetadata("Política de privacidade", "Como o Elphy usa a contagem local de cliques e os links de afiliado na versão 1.", "/privacidade/");
export default function Privacidade() {
  return <main id="conteudo" className="container reading page-section">
    <p className="eyebrow">Às claras.</p><h1>Política de privacidade<span className="lime">.</span></h1>
    <div className="prose">
      <p>O Elphy não usa cookies nem ferramentas de analytics na versão 1.</p>
      <p>Usamos o localStorage do seu navegador apenas para contar os cliques em cada link de afiliado. Esses contadores ficam no seu dispositivo e não são enviados a um servidor. Você pode apagá-los nas configurações do navegador.</p>
      <p>O site contém links de afiliado. Ao abrir um deles, você vai para um site externo, que tem sua própria política de privacidade e pode usar cookies. Podemos receber comissão por compras feitas por esses links.</p>
      <p>Para entrar em contato: <a className="text-link" href={`mailto:${contactEmail}`}>{contactEmail}</a> (e-mail: {textOrPending()})</p>
    </div>
  </main>;
}
