import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Inter, Martian_Mono, Schibsted_Grotesk, Space_Grotesk } from "next/font/google";
import { assetPath, siteUrl } from "@/lib/site";
import ChipsVisiveis from "@/components/dz/ChipsVisiveis";
import "./globals.css";

const legadoDisplay = Space_Grotesk({ subsets: ["latin"], weight: "700", variable: "--font-display", display: "swap", fallback: ["system-ui"] });
const legadoBody = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body", display: "swap", fallback: ["system-ui"] });
const display = Big_Shoulders({ subsets: ["latin"], weight: "variable", axes: ["opsz"], variable: "--font-el-display", display: "swap", fallback: ["Impact", "sans-serif"], adjustFontFallback: false });
const texto = Schibsted_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-el-body", display: "swap", fallback: ["system-ui", "sans-serif"] });
const mono = Martian_Mono({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-el-mono", display: "swap", fallback: ["ui-monospace", "monospace"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Elphy · Dica sem caô", template: "%s | Elphy" },
  description: "Cupons e reviews sem passar pano.",
  icons: { icon: assetPath("/brand/elphy-mascot.webp") },
};
export const viewport: Viewport = { themeColor: "#050607" };

// Zoom da prancheta de computador (1440 px) antes da primeira pintura; ver design.css.
const ZOOM = "(function(){var d=document.documentElement;function z(){d.style.setProperty('--zd',String(Math.min(1,(d.clientWidth||innerWidth)/1440)))}z();addEventListener('resize',z)})()";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: ZOOM }} />
        {/* As mesmas fontes das pranchetas (docs/design-1.0), pelo mesmo endereço */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;800;900&family=Schibsted+Grotesk:wght@400;500;600;700;800&family=Martian+Mono:wght@400;500;700&display=swap" />
      </head>
      <body className={`${legadoDisplay.variable} ${legadoBody.variable} ${display.variable} ${texto.variable} ${mono.variable}`}>
        <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
        {children}
        <ChipsVisiveis />
      </body>
    </html>
  );
}
