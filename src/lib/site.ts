import type { Metadata } from "next";

export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://elphy.com.br").replace(/\/$/, "");
export const contactEmail = "contato@example.com";
export function assetPath(path: string) { return `${basePath}${path}`; }
export function absoluteUrl(path: string) { return `${siteUrl}${basePath}${path}`; }
export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title: path === "/" ? { absolute: title } : title, description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title, description, url: absoluteUrl(path), siteName: "Elphy", locale: "pt_BR", type: "website",
      images: [{ url: absoluteUrl("/brand/elphy-mascot.webp"), alt: "Elphy, elefante verde-limão com óculos e celular." }],
    },
  };
}
