import type { MetadataRoute } from "next";
import { getDicas } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/sobre/", "/privacidade/", ...getDicas().map((dica) => `/dicas/${dica.slug}/`)].map((path) => ({ url: absoluteUrl(path) }));
}
