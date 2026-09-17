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
