import fs from "node:fs";
import path from "node:path";
import { cache } from "react";

export interface Product { nome: string; preco: string; imagem: string; link: string; cupom: string; }
export interface ReviewedProduct extends Product { paraQuemE: string; prosList: string[]; contrasList: string[]; }
export interface Alternative extends Product { rotulo: "Mais barata" | "Mais cara"; resumo: string; pro: string; contra: string; }
export interface Dica {
  slug: string; titulo: string; gancho: string; categoria: string; videoRef: string; publicadoEm: string;
  produto: ReviewedProduct; alternativas: Alternative[];
}
function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Conteúdo deve ser um objeto JSON.");
  return value as Record<string, unknown>;
}
function strings(value: Record<string, unknown>, keys: string[]) {
  for (const key of keys) if (typeof value[key] !== "string") throw new Error(`Campo obrigatório ausente ou inválido: ${key}`);
}
function validateDica(value: unknown): asserts value is Dica {
  const dica = object(value);
  strings(dica, ["slug", "titulo", "gancho", "categoria", "videoRef", "publicadoEm"]);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(dica.slug as string)) throw new Error("Slug inválido.");
  const productFields = ["nome", "preco", "imagem", "link", "cupom"];
  const product = object(dica.produto);
  strings(product, [...productFields, "paraQuemE"]);
  for (const key of ["prosList", "contrasList"]) {
    const list = product[key];
    if (!Array.isArray(list) || !list.every((item: unknown) => typeof item === "string")) throw new Error(`Lista inválida: ${key}`);
  }
  if (!Array.isArray(dica.alternativas)) throw new Error("Alternativas devem ser uma lista.");
  for (const entry of dica.alternativas) {
    const alternative = object(entry);
    strings(alternative, [...productFields, "resumo", "pro", "contra", "rotulo"]);
    if (alternative.rotulo !== "Mais barata" && alternative.rotulo !== "Mais cara") throw new Error("Rótulo de alternativa inválido.");
  }
}
// Executado no servidor durante o build; nenhum acesso a fs vai para o navegador.
export const getDicas = cache((): Dica[] => {
  const directory = path.join(process.cwd(), "src/content/dicas");
  const slugs = new Set<string>();
  return fs.readdirSync(directory).filter((file) => file.endsWith(".json")).sort().map((file) => {
    const data: unknown = JSON.parse(fs.readFileSync(path.join(directory, file), "utf8"));
    validateDica(data);
    if (slugs.has(data.slug)) throw new Error(`Slug duplicado: ${data.slug}`);
    slugs.add(data.slug);
    return data;
  });
});
export function getDica(slug: string) { return getDicas().find((dica) => dica.slug === slug); }

export const categories = [
  { slug: "celulares", nome: "Celulares" }, { slug: "tvs", nome: "TVs" },
  { slug: "audio", nome: "Áudio" }, { slug: "pc", nome: "PC" },
  { slug: "estudo", nome: "Estudo" }, { slug: "achados-shopee", nome: "Achados Shopee" },
] as const;
export type Category = typeof categories[number]["slug"];
export interface ReviewProduct {
  nome: string; variante: string; imagem: string; link: string; loja: string;
  precoObservado: number | "[a conferir]"; precoData: string;
  precoHistorico: { data: string; preco: number; fonte: string }[]; cupom: string; garantia: string;
}
export interface Review {
  slug: string; titulo: string; categoria: Category;
  veredito: { resposta: "Sim" | "Não" | "Depende"; frase: string; paraQuem: string[]; paraQuemNao: string[] };
  autor: { nome: string; papel: string }; publicadoEm: string; atualizadoEm: string;
  metodologia: "testado" | "analise-documental"; metodologiaTexto: string;
  produto: ReviewProduct; tabela: { colunas: string[]; linhas: string[][] };
  pros: string[]; contras: string[]; oQueNaoE: string[];
  alternativas: { rotulo: "Mais barata" | "Mais cara" | "Parecida"; nome: string; preco: number | "[a conferir]"; link: string; porQue: string }[];
  faq: { pergunta: string; resposta: string }[]; fontes: { titulo: string; url: string; data: string }[];
  changelog: { data: string; texto: string }[]; video?: string;
}
function required(record: Record<string, unknown>, keys: string[]) {
  strings(record, keys);
  for (const key of keys) if (!(record[key] as string).trim()) throw new Error(`Campo vazio: ${key}. Use [a conferir].`);
}
function list(value: unknown, label: string): unknown[] {
  if (!Array.isArray(value)) throw new Error(`Lista inválida: ${label}`);
  return value;
}
function stringList(value: unknown, label: string): string[] {
  const entries = list(value, label);
  if (!entries.length || !entries.every((entry) => typeof entry === "string" && entry.trim())) throw new Error(`Lista de textos inválida: ${label}`);
  return entries as string[];
}
function isoDate(value: unknown) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(Date.parse(value)) || new Date(value).toISOString().slice(0, 10) !== value) throw new Error(`Data ISO inválida: ${value}`);
}
function httpUrl(value: unknown) {
  if (typeof value !== "string" || !URL.canParse(value) || !["https:", "http:"].includes(new URL(value).protocol)) throw new Error(`URL inválida: ${value}`);
}
function price(value: unknown, pending = false) {
  if (pending && value === "[a conferir]") return;
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) throw new Error(`Preço inválido: ${value}`);
}
export function validateReview(value: unknown): asserts value is Review {
  const review = object(value);
  required(review, ["slug", "titulo", "categoria", "publicadoEm", "atualizadoEm", "metodologia", "metodologiaTexto"]);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(review.slug as string)) throw new Error("Slug de review inválido.");
  if (!categories.some(({ slug }) => slug === review.categoria)) throw new Error("Categoria de review inválida.");
  if (!["testado", "analise-documental"].includes(review.metodologia as string)) throw new Error("Metodologia inválida.");
  isoDate(review.publicadoEm); isoDate(review.atualizadoEm);
  if ((review.atualizadoEm as string) < (review.publicadoEm as string)) throw new Error("Atualização anterior à publicação.");
  required(object(review.autor), ["nome", "papel"]);
  const verdict = object(review.veredito);
  required(verdict, ["resposta", "frase"]);
  if (!["Sim", "Não", "Depende"].includes(verdict.resposta as string)) throw new Error("Veredito inválido.");
  for (const key of ["paraQuem", "paraQuemNao"]) stringList(verdict[key], key);
  const product = object(review.produto);
  required(product, ["nome", "variante", "imagem", "link", "loja", "precoData", "garantia"]);
  strings(product, ["cupom"]); httpUrl(product.link); price(product.precoObservado, true);
  if (product.precoData !== "[a conferir]") isoDate(product.precoData);
  if (!/^\/(?!\/)/.test(product.imagem as string)) throw new Error("Use uma imagem local no review.");
  const imageFile = path.resolve(process.cwd(), "public", `.${product.imagem}`);
  const publicRoot = path.resolve(process.cwd(), "public") + path.sep;
  if (!imageFile.startsWith(publicRoot) || !fs.existsSync(imageFile) || fs.statSync(imageFile).size > 200000) throw new Error("Imagem ausente ou maior que 200 KB.");
  for (const entry of list(product.precoHistorico, "precoHistorico")) {
    const record = object(entry); required(record, ["data", "fonte"]); isoDate(record.data); price(record.preco);
  }
  const table = object(review.tabela);
  const columns = stringList(table.colunas, "colunas");
  if (!columns.includes("Fonte")) throw new Error("Tabela sem coluna Fonte.");
  const rows = list(table.linhas, "linhas");
  if (!rows.length) throw new Error("Tabela vazia.");
  for (const row of rows) if (stringList(row, "linha").length !== columns.length) throw new Error("Linha incompatível com as colunas.");
  for (const key of ["pros", "contras", "oQueNaoE"]) stringList(review[key], key);
  for (const entry of list(review.alternativas, "alternativas")) {
    const record = object(entry); required(record, ["rotulo", "nome", "link", "porQue"]); price(record.preco, true); httpUrl(record.link);
    if (!["Mais barata", "Mais cara", "Parecida"].includes(record.rotulo as string)) throw new Error("Rótulo inválido.");
  }
  for (const entry of list(review.faq, "faq")) required(object(entry), ["pergunta", "resposta"]);
  for (const entry of list(review.fontes, "fontes")) {
    const record = object(entry); required(record, ["titulo", "url", "data"]); httpUrl(record.url); isoDate(record.data);
  }
  for (const entry of list(review.changelog, "changelog")) {
    const record = object(entry); required(record, ["data", "texto"]); isoDate(record.data);
  }
  if (review.video !== undefined) httpUrl(review.video);
}
export const getReviews = cache((): Review[] => {
  const directory = path.join(process.cwd(), "src/content/reviews");
  const slugs = new Set<string>();
  return fs.readdirSync(directory).filter((file) => file.endsWith(".json")).sort().map((file) => {
    const data: unknown = JSON.parse(fs.readFileSync(path.join(directory, file), "utf8"));
    validateReview(data);
    if (slugs.has(data.slug) || file !== `${data.slug}.json`) throw new Error(`Slug duplicado ou arquivo incompatível: ${data.slug}`);
    slugs.add(data.slug);
    return data;
  });
});
export function getReview(category: string, slug: string) { return getReviews().find((review) => review.categoria === category && review.slug === slug); }
export function dicaCategory(dica: Dica): Category {
  // A categoria legada Games reúne as dicas de PC; a URL /dicas permanece intacta.
  if (dica.categoria === "Games") return "pc";
  const category = categories.find(({ slug, nome }) => dica.categoria.toLowerCase() === slug || dica.categoria.toLowerCase() === nome.toLowerCase());
  if (!category) throw new Error(`Categoria legada sem mapeamento: ${dica.categoria}`);
  return category.slug;
}
export function getArticles(category?: Category) {
  return [
    ...getReviews().map((review) => ({ kind: "review" as const, data: review, category: review.categoria })),
    ...getDicas().map((dica) => ({ kind: "dica" as const, data: dica, category: dicaCategory(dica) })),
  ].filter((article) => !category || article.category === category).sort((a, b) => b.data.publicadoEm.localeCompare(a.data.publicadoEm) || a.data.slug.localeCompare(b.data.slug));
}
