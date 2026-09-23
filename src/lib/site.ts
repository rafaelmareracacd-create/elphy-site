import type { Metadata } from "next";

export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://elphy.com.br").replace(/\/$/, "");
export const contactEmail = "contato@example.com";
export function assetPath(path: string) { return `${basePath}${path}`; }
export function absoluteUrl(path: string) { return `${siteUrl}${basePath}${path}`; }
export function pageMetadata(title: string, description: string, path: string, image = "/brand/elphy-mascot.webp"): Metadata {
  const alt = image.includes("og-nota")
    ? "Nota do Elphy: RTX 5070 e Ryzen 5 7600, fonte recomendada de 550 W."
    : "Elphy, elefante verde-limão com óculos e celular.";
  return {
    title: path === "/" ? { absolute: title } : title, description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title, description, url: absoluteUrl(path), siteName: "Elphy", locale: "pt_BR", type: "website",
      images: [{ url: absoluteUrl(image), alt, width: image.includes("og-nota") ? 1200 : undefined, height: image.includes("og-nota") ? 630 : undefined }],
    },
  };
}

/** @ do TikTok do Elphy. Vazio até o Rafael confirmar; o menu e o rodapé escondem a linha. */
export const TIKTOK = "";
