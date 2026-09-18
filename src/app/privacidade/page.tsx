import { contactEmail, pageMetadata } from "@/lib/site";
import { textOrPending } from "@/lib/format";

export const metadata = pageMetadata("Política de privacidade", "Como o Elphy usa a contagem local de cliques, os links de afiliado e os pedidos de alerta de preço.", "/privacidade/");
export default function Privacidade() {
  return <main id="conteudo" className="container reading page-section">
    <p className="eyebrow">Às claras.</p><h1>Política de privacidade<span className="lime">.</span></h1>
    <div className="prose">
      <p>O Elphy não usa cookies nem ferramentas externas de analytics.</p>
      <p>O alerta de preço só fica disponível quando houver um serviço de envio configurado. Ao solicitar um alerta, enviamos seu e-mail, o nome do produto e o identificador do artigo a esse serviço, para registrar seu pedido. O e-mail não é salvo nos contadores locais de cliques. Enquanto o serviço não estiver configurado, o formulário fica desabilitado e não envia dados.</p>
      <p>Usamos o localStorage do seu navegador apenas para contar os cliques em cada link de afiliado. Esses contadores ficam no seu dispositivo e não são enviados a um servidor. Você pode apagá-los nas configurações do navegador.</p>
      <p>O site contém links de afiliado. Ao abrir um deles, você vai para um site externo, que tem sua própria política de privacidade e pode usar cookies. Podemos receber comissão por compras feitas por esses links.</p>
      <p>Para entrar em contato: <a className="text-link" href={`mailto:${contactEmail}`}>{contactEmail}</a> (e-mail: {textOrPending()})</p>
    </div>
  </main>;
}
