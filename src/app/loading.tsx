import { Casca, Imprimindo } from "@/components/dz/Estados";

/* Estados-Mobile, estado 2, de docs/design-1.0: só aparece em conexão lenta */
export default function Carregando() {
  return (
    <div className="dz" id="conteudo">
      <div className="dz-m"><div className="dz-quadro-m"><Casca rotulo="Imprimindo"><Imprimindo /></Casca></div></div>
    </div>
  );
}
