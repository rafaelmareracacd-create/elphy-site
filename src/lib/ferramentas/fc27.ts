/**
 * "Meu PC roda o FC 27?" — onde a placa de vídeo fica em relação à lista oficial da EA.
 *
 * Lista divulgada (dlcompare 26/08/2026, khelnow 27/07/2026):
 *   mínimo      GTX 1050 Ti / RX 570      720p 60 fps
 *   recomendado GTX 1660 / RX 5600 XT     1080p 60 fps
 *   alto        RTX 3060 / RX 6600 XT     1440p 60 ou 1080p 80
 *   ultra       RTX 4070 / RX 7800 XT     4K 60 ou 1440p 120
 *
 * `i` = desempenho relativo aproximado em 1080p, GTX 1050 Ti = 100, pela média de testes públicos.
 * É estimativa de degrau, não teste no FC 27: a página mostra só o degrau, nunca o índice.
 */
export type Nivel = "abaixo" | "borrada" | "meio" | "nitida" | "sobra" | "ultra";
export type Placa = { id: string; nome: string; i: number };

export const PLACAS: Placa[] = [
  // integradas e antigas
  { id: "intel-uhd", nome: "Intel UHD (vídeo integrado)", i: 25 },
  { id: "iris-xe", nome: "Intel Iris Xe (vídeo integrado)", i: 45 },
  { id: "vega-8", nome: "Radeon Vega 8 (vídeo integrado)", i: 45 },
  { id: "radeon-680m", nome: "Radeon 680M (vídeo integrado)", i: 85 },
  { id: "radeon-780m", nome: "Radeon 780M (vídeo integrado)", i: 105 },
  { id: "gt-1030", nome: "GeForce GT 1030", i: 45 },
  { id: "gtx-750-ti", nome: "GeForce GTX 750 Ti", i: 55 },
  { id: "gtx-950", nome: "GeForce GTX 950", i: 70 },
  { id: "gtx-960", nome: "GeForce GTX 960", i: 80 },
  { id: "gtx-1050", nome: "GeForce GTX 1050 (2 GB)", i: 80 },
  { id: "rx-550", nome: "Radeon RX 550", i: 50 },
  { id: "rx-560", nome: "Radeon RX 560", i: 70 },
  // mínimo
  { id: "gtx-1050-ti", nome: "GeForce GTX 1050 Ti", i: 100 },
  { id: "rx-6400", nome: "Radeon RX 6400", i: 115 },
  { id: "gtx-1650", nome: "GeForce GTX 1650", i: 125 },
  { id: "rx-470", nome: "Radeon RX 470", i: 125 },
  { id: "rx-570", nome: "Radeon RX 570", i: 130 },
  { id: "gtx-1060-3", nome: "GeForce GTX 1060 3 GB", i: 140 },
  { id: "rx-580", nome: "Radeon RX 580", i: 140 },
  { id: "rx-480", nome: "Radeon RX 480", i: 135 },
  { id: "gtx-970", nome: "GeForce GTX 970", i: 145 },
  // no meio
  { id: "gtx-1060-6", nome: "GeForce GTX 1060 6 GB", i: 150 },
  { id: "rx-6500-xt", nome: "Radeon RX 6500 XT", i: 150 },
  { id: "rx-590", nome: "Radeon RX 590", i: 155 },
  { id: "rx-5500-xt", nome: "Radeon RX 5500 XT", i: 165 },
  { id: "rtx-3050-6", nome: "GeForce RTX 3050 6 GB", i: 165 },
  { id: "gtx-1650-super", nome: "GeForce GTX 1650 Super", i: 170 },
  { id: "gtx-980", nome: "GeForce GTX 980", i: 175 },
  // recomendado
  { id: "gtx-1660", nome: "GeForce GTX 1660", i: 195 },
  { id: "gtx-1070", nome: "GeForce GTX 1070", i: 205 },
  { id: "rtx-3050", nome: "GeForce RTX 3050 8 GB", i: 205 },
  { id: "gtx-1660-super", nome: "GeForce GTX 1660 Super", i: 215 },
  { id: "gtx-1660-ti", nome: "GeForce GTX 1660 Ti", i: 220 },
  { id: "gtx-1070-ti", nome: "GeForce GTX 1070 Ti", i: 230 },
  { id: "rtx-2060", nome: "GeForce RTX 2060", i: 245 },
  { id: "rx-5600-xt", nome: "Radeon RX 5600 XT", i: 250 },
  { id: "gtx-1080", nome: "GeForce GTX 1080", i: 260 },
  { id: "arc-a580", nome: "Intel Arc A580", i: 270 },
  { id: "rx-5700", nome: "Radeon RX 5700", i: 275 },
  { id: "rx-6600", nome: "Radeon RX 6600", i: 275 },
  { id: "rtx-2060-super", nome: "GeForce RTX 2060 Super", i: 285 },
  // alto
  { id: "rtx-2070", nome: "GeForce RTX 2070", i: 295 },
  { id: "rtx-3060", nome: "GeForce RTX 3060", i: 300 },
  { id: "rx-5700-xt", nome: "Radeon RX 5700 XT", i: 300 },
  { id: "arc-a750", nome: "Intel Arc A750", i: 300 },
  { id: "rx-6600-xt", nome: "Radeon RX 6600 XT", i: 330 },
  { id: "rtx-2070-super", nome: "GeForce RTX 2070 Super", i: 330 },
  { id: "rx-6650-xt", nome: "Radeon RX 6650 XT", i: 345 },
  { id: "gtx-1080-ti", nome: "GeForce GTX 1080 Ti", i: 345 },
  { id: "rx-7600", nome: "Radeon RX 7600", i: 350 },
  { id: "rtx-2080", nome: "GeForce RTX 2080", i: 360 },
  { id: "rtx-4060", nome: "GeForce RTX 4060", i: 365 },
  { id: "rx-7600-xt", nome: "Radeon RX 7600 XT", i: 365 },
  { id: "arc-b580", nome: "Intel Arc B580", i: 390 },
  { id: "rtx-3060-ti", nome: "GeForce RTX 3060 Ti", i: 400 },
  { id: "rtx-5060", nome: "GeForce RTX 5060", i: 420 },
  { id: "rx-6700-xt", nome: "Radeon RX 6700 XT", i: 420 },
  { id: "rtx-4060-ti", nome: "GeForce RTX 4060 Ti", i: 430 },
  { id: "rtx-2080-ti", nome: "GeForce RTX 2080 Ti", i: 440 },
  { id: "rtx-3070", nome: "GeForce RTX 3070", i: 450 },
  { id: "rtx-5060-ti", nome: "GeForce RTX 5060 Ti", i: 470 },
  { id: "rx-9060-xt", nome: "Radeon RX 9060 XT", i: 480 },
  { id: "rtx-3070-ti", nome: "GeForce RTX 3070 Ti", i: 480 },
  { id: "rx-7700-xt", nome: "Radeon RX 7700 XT", i: 500 },
  { id: "rx-6800", nome: "Radeon RX 6800", i: 520 },
  // ultra
  { id: "rtx-4070", nome: "GeForce RTX 4070", i: 560 },
  { id: "rtx-3080", nome: "GeForce RTX 3080", i: 560 },
  { id: "rx-6800-xt", nome: "Radeon RX 6800 XT", i: 590 },
  { id: "rx-7800-xt", nome: "Radeon RX 7800 XT", i: 600 },
  { id: "rtx-3090", nome: "GeForce RTX 3090", i: 620 },
  { id: "rtx-4070-super", nome: "GeForce RTX 4070 Super", i: 650 },
  { id: "rtx-5070", nome: "GeForce RTX 5070", i: 660 },
  { id: "rx-7900-gre", nome: "Radeon RX 7900 GRE", i: 660 },
  { id: "rtx-4070-ti", nome: "GeForce RTX 4070 Ti", i: 720 },
  { id: "rx-9070", nome: "Radeon RX 9070", i: 740 },
  { id: "rx-7900-xt", nome: "Radeon RX 7900 XT", i: 800 },
  { id: "rx-9070-xt", nome: "Radeon RX 9070 XT", i: 820 },
  { id: "rtx-5070-ti", nome: "GeForce RTX 5070 Ti", i: 850 },
  { id: "rtx-4080", nome: "GeForce RTX 4080", i: 900 },
  { id: "rx-7900-xtx", nome: "Radeon RX 7900 XTX", i: 930 },
  { id: "rtx-5080", nome: "GeForce RTX 5080", i: 980 },
  { id: "rtx-4090", nome: "GeForce RTX 4090", i: 1150 },
  { id: "rtx-5090", nome: "GeForce RTX 5090", i: 1400 },
];

export function nivel(i: number): Nivel {
  if (i < 95) return "abaixo";
  if (i < 150) return "borrada";
  if (i < 190) return "meio";
  if (i < 290) return "nitida";
  if (i < 550) return "sobra";
  return "ultra";
}

export const VEREDITO: Record<Nivel, { selo: string; imagem: string; texto: string; cor: string }> = {
  abaixo: { selo: "Abaixo", imagem: "abaixo do mínimo", cor: "#ff5a4f",
    texto: "Fica abaixo da placa mínima da lista. Pode abrir, mas deve travar mesmo no gráfico mais baixo." },
  borrada: { selo: "Borrada", imagem: "≈ 720p", cor: "#ffb020",
    texto: "É o degrau do mínimo. Roda, mas em 720p: esticada num monitor Full HD, a imagem perde detalhe." },
  meio: { selo: "No meio", imagem: "entre 720p e 1080p", cor: "#ffd84a",
    texto: "Passa do mínimo e não chega na recomendada. Tente 1080p com gráfico baixo; se engasgar, desça a resolução." },
  nitida: { selo: "Nítida", imagem: "≈ 1080p · 60 fps", cor: "#9dff3b",
    texto: "É o degrau da recomendada: a EA mira 1080p a 60 quadros por segundo." },
  sobra: { selo: "Sobra", imagem: "1440p · 60 fps ou 1080p · 80", cor: "#9dff3b",
    texto: "Degrau da lista alta: 1440p a 60 quadros, ou 1080p passando de 60." },
  ultra: { selo: "Ultra", imagem: "4K · 60 fps ou 1440p · 120", cor: "#9dff3b",
    texto: "Degrau da lista ultra: 4K a 60 quadros, ou 1440p a 120." },
};

const limpa = (t: string) =>
  t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/geforce|radeon|nvidia|amd|intel|placa|de video|gb/g, "").replace(/[^a-z0-9]/g, "");

/** Busca tolerante: "1660s", "rtx3060", "gtx 1050ti", "rx580". */
export function busca(q: string, max = 6): Placa[] {
  const t = limpa(q.replace(/\bsuper\b/gi, "super").replace(/(\d)s\b/gi, "$1super"));
  if (!t) return [];
  const exatos = PLACAS.filter((p) => limpa(p.nome) === t || p.id.replace(/-/g, "") === t);
  const resto = PLACAS.filter((p) => !exatos.includes(p) && (limpa(p.nome).includes(t) || p.id.replace(/-/g, "").includes(t)));
  resto.sort((a, b) => limpa(a.nome).length - limpa(b.nome).length);
  return [...exatos, ...resto].slice(0, max);
}

export const porId = (id: string) => PLACAS.find((p) => p.id === id);
