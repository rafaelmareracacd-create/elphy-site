import type { MetadataRoute } from "next";
import { categories, getDicas, getReviews } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";
import { gpusFonte } from "@/lib/catalogo";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/sobre/", "/legal/", "/metodologia/", "/correcoes/", "/ferramentas/", "/ferramentas/fonte/", "/ferramentas/ssd/", "/ferramentas/power-bank/", "/ferramentas/conta-de-luz/", "/ferramentas/monitor/", "/ferramentas/gabinete/", "/ferramentas/memoria/", "/montador/", "/fc27/", "/dicas/", "/dicas/rtx-5070-250w/", "/busca/", ...gpusFonte.filter((g) => g.id !== "sem-gpu").map((g) => `/peca/${g.id}/`), "/montar-pc/", "/privacidade/", ...categories.map(({ slug }) => `/${slug}/`), ...getDicas().map((dica) => `/dicas/${dica.slug}/`), ...getReviews().map((review) => `/${review.categoria}/${review.slug}/`)].map((path) => ({ url: absoluteUrl(path) }));
}
