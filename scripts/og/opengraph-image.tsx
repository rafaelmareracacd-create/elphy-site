/* Gera public/og-nota.png. Para refazer: copiar para src/app/, rodar npm run build e copiar out/opengraph-image para public/og-nota.png. Fica fora do app porque o GitHub Pages não serve arquivo sem extensão. */
import { ImageResponse } from "next/og";
import { cpusFonte, gpusFonte } from "@/lib/catalogo";
import { fonteRecomendada } from "@/lib/contas";

/* Nota-OG, de docs/design-1.0. A conta vem do catálogo (RTX 5070 + Ryzen 5 7600). */
const g = gpusFonte.find((x) => x.id === "rtx-5070")!;
const c = cpusFonte.find((x) => x.id === "r5-7600")!;
const r = fonteRecomendada(g.w, c.w);
const numero = String(r.recomendado).padStart(4, "0");

export const alt = `Nota do Elphy: ${g.curto} e ${c.nome}, fonte recomendada de ${r.recomendado} W.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

/** A mesma fonte do desenho, pelo Google Fonts, só com as letras usadas. Sem rede, cai na fonte padrão. */
async function fonte(familia: string, peso: number, texto: string) {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${familia.replace(/ /g, "+")}:wght@${peso}&text=${encodeURIComponent(texto)}`)).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    return { name: familia, data: await (await fetch(url)).arrayBuffer(), weight: peso as 400 | 700 | 800 | 900, style: "normal" as const };
  } catch {
    return null;
  }
}

const linha = (nome: string, v: string, extra: React.CSSProperties = {}) => (
  <div style={{ display: "flex", alignItems: "baseline", marginTop: 4, ...extra }}>
    <span>{nome}</span>
    {/* pontilhado: o Satori não desenha borda dotted */}
    <span style={{ flex: 1, height: 1.5, margin: "0 5px 4px", backgroundImage: "linear-gradient(90deg, rgba(17,19,17,.45) 50%, rgba(17,19,17,0) 50%)", backgroundSize: "3px 1.5px", backgroundRepeat: "repeat-x" }} />
    <b>{v}</b>
  </div>
);

export default async function OpenGraphImage() {
  const mono = `elphy.com.br/ferramentas/fonteNº0123456789${g.nome}${c.nome}Mãe, memória, SSDTotal com folgaWFONTERECOMENDADASUAWATTSsua watts`;
  const fontes = (await Promise.all([
    fonte("Big Shoulders Display", 900, "ACONTQUELJÃFZ.W0123456789 acontquelojãfz"),
    fonte("Schibsted Grotesk", 800, "elphy."),
    fonte("Martian Mono", 400, mono),
    fonte("Martian Mono", 700, mono),
  ])).filter((f) => f !== null);
  return new ImageResponse(
    (
      <div style={{ position: "relative", display: "flex", width: 1200, height: 630, boxSizing: "border-box", padding: "64px 72px", overflow: "hidden", background: "#050607", color: "#eef2ee", fontFamily: "Schibsted Grotesk" }}>
        <div style={{ position: "absolute", right: -120, top: -40, width: 760, height: 760, background: "radial-gradient(circle at 50% 50%, rgba(157,255,59,.35), rgba(157,255,59,0) 62%)" }} />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", width: 620 }}>
          <span style={{ display: "flex", fontWeight: 800, fontSize: 44, letterSpacing: "-1.98px" }}>elphy<span style={{ color: "#9dff3b" }}>.</span></span>
          <div style={{ display: "flex", flexDirection: "column", margin: "auto 0 0", fontFamily: "Big Shoulders Display", fontWeight: 900, fontSize: 112, lineHeight: 0.84, textTransform: "uppercase" }}>
            <span>A conta</span>
            <span>que a loja</span>
            <span style={{ display: "flex" }}>não faz<span style={{ color: "#9dff3b" }}>.</span></span>
          </div>
          <span style={{ marginTop: 26, fontFamily: "Martian Mono", fontSize: 20, letterSpacing: "1.6px", color: "#9aa39c" }}>elphy.com.br/ferramentas/fonte</span>
        </div>
        <div style={{ position: "relative", display: "flex", marginLeft: "auto", alignSelf: "center", transform: "rotate(-3deg)" }}>
          <div style={{ position: "relative", display: "flex", flexDirection: "column", width: 380, boxSizing: "border-box", padding: 26, background: "#f3f1ea", color: "#111311", fontFamily: "Martian Mono", fontSize: 14, lineHeight: "22px", boxShadow: "0 40px 80px rgba(0,0,0,.6)" }}>
            <div style={{ position: "absolute", left: 0, right: 0, bottom: -10, height: 10, backgroundImage: "linear-gradient(135deg, #f3f1ea 50%, rgba(243,241,234,0) 50%), linear-gradient(-135deg, #f3f1ea 50%, rgba(243,241,234,0) 50%)", backgroundSize: "12px 10px", backgroundRepeat: "repeat-x" }} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "Schibsted Grotesk", fontWeight: 800, fontSize: 24, letterSpacing: "-1.08px" }}>elphy.</span>
              <b>{`Nº ${numero}`}</b>
            </div>
            <div style={{ display: "flex", margin: "12px 0", borderTop: "1.5px dashed rgba(17,19,17,.4)" }} />
            {linha(g.nome, `${g.w} W`, { marginTop: 0 })}
            {linha(c.nome, `${c.w} W`)}
            {linha("Mãe, memória, SSD", "60 W")}
            {linha("Total com folga", `${r.comFolga} W`, { marginTop: 10, fontWeight: 700, paddingTop: 10, borderTop: "1.5px dashed rgba(17,19,17,.4)" })}
            {/* dupla: duas linhas de 1 px (o Satori não desenha double) */}
            <div style={{ display: "flex", marginTop: 14, height: 3, borderTop: "1px solid #111311", borderBottom: "1px solid #111311" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", paddingTop: 12 }}>
              <span style={{ display: "flex", flexDirection: "column", fontSize: 11, lineHeight: "22px", letterSpacing: "1.54px", textTransform: "uppercase", color: "#5b5f58" }}><span>Fonte</span><span>recomendada</span></span>
              <span style={{ fontFamily: "Big Shoulders Display", fontWeight: 900, fontSize: 96, lineHeight: 0.8, whiteSpace: "nowrap" }}>{`${r.recomendado} W`}</span>
            </div>
          </div>
          <div style={{ position: "absolute", left: -58, top: -40, width: 120, height: 120, borderRadius: 60, background: "#9dff3b", color: "#07110a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 16px 36px rgba(0,0,0,.45)", transform: "rotate(12deg)" }}>
            <div style={{ position: "absolute", left: 9, top: 9, width: 102, height: 102, borderRadius: 51, border: "1.5px dashed rgba(7,17,10,.35)" }} />
            <span style={{ fontFamily: "Martian Mono", fontSize: 8.5, letterSpacing: "1.36px", textTransform: "uppercase" }}>Sua fonte</span>
            <span style={{ fontFamily: "Big Shoulders Display", fontWeight: 900, fontSize: 50, lineHeight: 0.9 }}>{String(r.recomendado)}</span>
            <span style={{ fontFamily: "Martian Mono", fontSize: 8.5, letterSpacing: "1.19px", textTransform: "uppercase" }}>watts</span>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: fontes },
  );
}
