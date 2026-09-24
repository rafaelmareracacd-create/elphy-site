import type { MetadataRoute } from "next";
import { categories, getDicas, getReviews } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";
import { gpusFonte } from "@/lib/catalogo";
import { achadosVisiveis } from "@/content/achados";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  // achadosVisiveis(true) usa o filtro de produção: nenhum slug com rascunho: true entra.
  return ["/", "/sobre/", "/legal/", "/metodologia/", "/correcoes/", "/achados/", ...achadosVisiveis(true).map((achado) => `/achados/${achado.slug}/`), "/ferramentas/", "/ferramentas/fonte/", "/ferramentas/ssd/", "/ferramentas/power-bank/", "/ferramentas/conta-de-luz/", "/ferramentas/monitor/", "/ferramentas/gabinete/", "/ferramentas/memoria/", "/montador/", "/fc27/", "/dicas/", "/dicas/rtx-5070-250w/", "/busca/", ...gpusFonte.filter((g) => g.id !== "sem-gpu").map((g) => `/peca/${g.id}/`), "/montar-pc/", "/privacidade/", ...categories.map(({ slug }) => `/${slug}/`), ...getDicas().map((dica) => `/dicas/${dica.slug}/`), ...getReviews().map((review) => `/${review.categoria}/${review.slug}/`)].map((path) => ({ url: absoluteUrl(path) }));
}
