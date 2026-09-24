export type CarimboTipo = "vale" | "depende" | "deixa";
export type LojaAchado = {
  nome: string;
  url: string | null;
  preco: number | null;
  frete: number | null;
  conferidoEm: string | null;
};
export type Achado = {
  slug: string;
  nome: string;
  categoria: string;
  colecoes: string[];
  carimbo: CarimboTipo;
  motivo: string;
  lojaPrincipal: LojaAchado;
  outrasLojas: LojaAchado[];
  cupom?: { codigo: string; validade: string | null };
  videoUrl?: string;
  praQuemE: string;
  praQuemNaoE: string;
  olhamos: { rotulo: string; valor: string }[];
  alternativa?: { rotulo: string; href: string };
  /** Link para uma ferramenta do Elphy relacionada ao achado (ex.: conta do power bank). */
  ferramenta?: { rotulo: string; href: string };
  rascunho: boolean;
  imagem?: { src: string; alt: string };
};

const loja = (nome: string): LojaAchado => ({ nome, url: null, preco: null, frete: null, conferidoEm: null });
const base = {
  rascunho: true,
  outrasLojas: [],
  praQuemE: "[Pra quem este achado vale.]",
  praQuemNaoE: "[Pra quem este achado não vale.]",
  olhamos: [{ rotulo: "Avaliação", valor: "[A preencher]" }],
};

// Exemplos literais das pranchetas. Coleções são apenas associações de demonstração.
// Publicar exige preencher e conferir os dados, depois mudar rascunho para false.
// null significa não conferido: nunca é convertido em preço zero ou frete grátis.
export const ACHADOS: Achado[] = [
  { ...base, slug: "fone-bluetooth", nome: "Fone Bluetooth [MODELO]", categoria: "Áudio", colecoes: ["Até R$ 50", "Presentes", "Pra faculdade"], carimbo: "vale", motivo: "[Por que vale, em até 12 palavras.]", lojaPrincipal: loja("Shopee") },
  { ...base, slug: "power-bank-20000", nome: "Power bank 20.000 mAh [MODELO]", categoria: "Celular e acessórios", colecoes: ["Presentes", "Pra faculdade"], carimbo: "depende", motivo: "Entrega [X]% do que promete. Dá [N] cargas num celular comum.", lojaPrincipal: loja("Shopee"), outrasLojas: [loja("Mercado Livre"), loja("Amazon")], cupom: { codigo: "[CÓDIGO]", validade: null }, praQuemE: "[Quem passa o dia fora e precisa de 1 a 2 cargas.]", praQuemNaoE: "[Quem quer carregar notebook.]", olhamos: [{ rotulo: "Capacidade real", valor: "[X] mAh" }, { rotulo: "Cargas num celular de 5.000 mAh", valor: "[N]" }, { rotulo: "Carga rápida", valor: "[X] W" }], ferramenta: { rotulo: "Fazer a conta com o seu celular", href: "/ferramentas/power-bank/" } },
  { ...base, slug: "luminaria-de-mesa", nome: "Luminária de mesa [MODELO]", categoria: "Casa e quarto", colecoes: ["Até R$ 50", "Presentes", "Pra faculdade", "Primeiro apê"], carimbo: "vale", motivo: "[Por que vale, em até 12 palavras.]", lojaPrincipal: loja("Mercado Livre") },
  { ...base, slug: "fonte-500w-sem-selo", nome: "Fonte 500 W sem selo [MODELO]", categoria: "PC e setup", colecoes: ["Primeiro apê"], carimbo: "deixa", motivo: "Sem teste público. Watt da caixa não conta.", lojaPrincipal: loja("[Loja]"), alternativa: { rotulo: "Calcular a fonte que o seu PC precisa", href: "/ferramentas/fonte/" } },
  { ...base, slug: "suporte-de-notebook", nome: "Suporte de notebook [MODELO]", categoria: "Estudo e trabalho", colecoes: ["Até R$ 50", "Pra faculdade", "Primeiro apê"], carimbo: "vale", motivo: "[Por que vale, em até 12 palavras.]", lojaPrincipal: loja("Amazon") },
  { ...base, slug: "capinha-magsafe", nome: "Capinha com MagSafe [MODELO]", categoria: "Celular e acessórios", colecoes: ["Até R$ 50", "Pra faculdade"], carimbo: "depende", motivo: "[Pra quem vale e pra quem não, em 12 palavras.]", lojaPrincipal: loja("TikTok Shop") },
];

export function achadosVisiveis(producao = process.env.NODE_ENV === "production"): Achado[] {
  return ACHADOS.filter((achado) => !producao || !achado.rascunho);
}
