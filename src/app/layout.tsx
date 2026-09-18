import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { assetPath, siteUrl } from "@/lib/site";
import "./globals.css";

const display = Space_Grotesk({ subsets: ["latin"], weight: "700", variable: "--font-display", display: "swap", fallback: ["system-ui"] });
const body = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body", display: "swap", fallback: ["system-ui"] });
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Elphy · Dica sem caô", template: "%s | Elphy" },
  description: "Cupons e reviews sem passar pano.",
  icons: { icon: assetPath("/brand/elphy-mascot.webp") },
};
export const viewport: Viewport = { themeColor: "#0b0f14" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className={`${display.variable} ${body.variable}`}>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <Header />{children}<Footer />
  </body></html>;
}
