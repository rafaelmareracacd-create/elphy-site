import type { MetadataRoute } from "next";
import { categories, getDicas, getReviews } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/sobre/", "/privacidade/", ...categories.map(({ slug }) => `/${slug}/`), ...getDicas().map((dica) => `/dicas/${dica.slug}/`), ...getReviews().map((review) => `/${review.categoria}/${review.slug}/`)].map((path) => ({ url: absoluteUrl(path) }));
}
