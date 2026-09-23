import type { SeloNota } from "@/lib/contas";

export type LinhaNota = {
  nome: string;
  valor: string;
  forte?: boolean;
  sep?: boolean;
  falha?: boolean;
};

export type NotaProps = {
  impresso: boolean;
  numero: string;
  cupom: string;
  data?: string;
  linhas: LinhaNota[];
  rotulo: string;
  total: string;
  unidade?: string;
  sub?: string;
  notaExtra?: string;
  codigo?: string;
  selo: SeloNota | null;
  seloTopo?: string;
  seloMeio?: string;
  seloBase?: string;
  led: "pronta" | "revisar" | "esperando";
  vazio?: boolean;
  vazioTexto?: string;
  regua?: { consumo: number; folga: number } | null;
  semente?: string;
};

const LED = {
  pronta: { cor: "lima", texto: "Pronta" },
  revisar: { cor: "ambar", texto: "Revisar" },
  esperando: { cor: "ambar", texto: "Esperando" },
} as const;

export function barras(semente: string, quantidade = 40) {
  let h = 7;
  const saida: { largura: number; cheia: boolean }[] = [];
  for (let i = 0; i < semente.length; i += 1) h = (h * 31 + semente.charCodeAt(i)) >>> 0;
  for (let j = 0; j < quantidade; j += 1) {
    h = (h * 1103515245 + 12345) >>> 0;
    saida.push({ largura: 1 + ((h >>> 8) % 3), cheia: j % 2 === 0 });
  }
  return saida;
}

export function dataNota(data = new Date()) {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(data.getDate())}/${p(data.getMonth() + 1)}/${data.getFullYear()} · ${p(data.getHours())}:${p(data.getMinutes())}`;
}

export default function Nota(props: NotaProps) {
  const led = LED[props.led];
  const codigo = props.semente || props.codigo || props.numero || "vazio";
  return (
    <div className="el-impressora">
      <div className="el-impressora-topo">
        <span>Impressora de contas</span>
        <span className={`el-led el-led-${led.cor}`}>
          <i aria-hidden="true" />
          {led.texto}
        </span>
      </div>
      <div className="el-fenda" aria-hidden="true" />
      {props.vazio ? (
        <div className="el-papel el-papel-vazio" role="status">
          <p>{props.vazioTexto ?? "Escolhe as peças. A nota sai aqui."}</p>
          <div className="el-serrilha" aria-hidden="true" />
        </div>
      ) : (
        <div className="el-papel-palco">
          <article key={codigo + String(props.impresso)} className={props.impresso ? "el-papel el-imprime" : "el-papel el-papel-espera"} aria-label={props.cupom}>
            <header className="el-papel-topo">
              <span className="el-papel-marca">elphy.</span>
              <b>Nº {props.numero}</b>
            </header>
            <div className="el-traco" />
            <p className="el-cupom">{props.cupom}</p>
            {props.data ? <p className="el-data">{props.data}</p> : null}
            <ul className="el-linhas">
              {props.linhas.map((linha, indice) => (
                <li
                  key={`${linha.nome}-${indice}`}
                  className={`el-linha${linha.forte ? " el-linha-forte" : ""}${linha.sep ? " el-linha-sep" : ""}${linha.falha ? " el-linha-falha" : ""}`}
                  style={{ animationDelay: `${200 + indice * 50}ms` }}
                >
                  <span>{linha.nome}</span>
                  <span className="el-pontos" aria-hidden="true" />
                  <b>{linha.valor}</b>
                </li>
              ))}
            </ul>
            {props.regua ? <Regua consumo={props.regua.consumo} folga={props.regua.folga} /> : null}
            <div className="el-duplo" />
            <p className="el-rotulo">{props.rotulo}</p>
            <p className="el-total">
              <span>{props.total}</span>
              {props.unidade ? <small>{props.unidade}</small> : null}
            </p>
            {props.sub ? <p className="el-sub">{props.sub}</p> : null}
            {props.notaExtra ? <p className="el-nota-extra">{props.notaExtra}</p> : null}
            <p className="el-estimativa">Estimativa pela fórmula da metodologia. Não garante compatibilidade.</p>
            {props.codigo ? <p className="el-codigo">{props.codigo}</p> : null}
            <div className="el-barras" aria-hidden="true">
              {barras(codigo).map((barra, indice) => (
                <i key={indice} style={{ width: barra.largura * 2, background: barra.cheia ? "#111311" : "transparent" }} />
              ))}
            </div>
            <div className="el-serrilha" aria-hidden="true" />
          </article>
          {props.selo && props.seloTopo && props.seloMeio && props.seloBase ? (
            <div className={`el-selo el-selo-${props.selo} el-carimba`}>
              <span>{props.seloTopo}</span>
              <strong>{props.seloMeio}</strong>
              <span>{props.seloBase}</span>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

function Regua({ consumo, folga }: { consumo: number; folga: number }) {
  const escala = 1200;
  const a = Math.min(consumo, escala) / escala * 100;
  const b = Math.min(Math.max(folga, 0), escala) / escala * 100;
  return (
    <div className="el-regua">
      <div className="el-regua-trilho" aria-hidden="true">
        <i className="el-regua-consumo" style={{ width: `${a}%` }} />
        <i className="el-regua-folga" style={{ width: `${b}%` }} />
      </div>
      <div className="el-regua-marcas">
        <span>0</span><span>300</span><span>600</span><span>900</span><span>1200 W</span>
      </div>
    </div>
  );
}
