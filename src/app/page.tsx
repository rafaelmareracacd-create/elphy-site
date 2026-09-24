import HomeV3 from "@/components/v3/Home";
import Estrutura from "@/components/v3/Estrutura";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Elphy · O Elphy carimba os achados do TikTok",
  "Cada achado leva um carimbo e o porquê, com preço, frete e data. Grátis, sem cadastro.",
  "/",
  "/brand/elphy-heroi.webp",
);

export const viewport = { themeColor: "#eeebe5" };

export default function Home() {
  return <Estrutura><HomeV3 /></Estrutura>;
}
