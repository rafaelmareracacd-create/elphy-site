import { f, type Conta, type Grupo, type Sel } from "@/components/dz/useFerramenta";
import { cabeCooler, cabePlaca, sobraMm } from "@/lib/contas";

/* Grupos, escolha inicial e conta da prancheta Gabinete-Mobile (docs/design-1.0). */
export const GR_GABINETE: Grupo[] = [
  {
    "k": "gpu",
    "titulo": "Comprimento da placa",
    "larg": 104,
    "dica": "Na ficha da placa. Muda de fabricante para fabricante, mesmo com o mesmo chip.",
    "ops": [
      {
        "id": "240",
        "curto": "240 mm",
        "sub": "placa",
        "val": 240
      },
      {
        "id": "270",
        "curto": "270 mm",
        "sub": "placa",
        "val": 270
      },
      {
        "id": "300",
        "curto": "300 mm",
        "sub": "placa",
        "val": 300
      },
      {
        "id": "330",
        "curto": "330 mm",
        "sub": "placa",
        "val": 330
      },
      {
        "id": "350",
        "curto": "350 mm",
        "sub": "placa",
        "val": 350
      }
    ]
  },
  {
    "k": "gv",
    "titulo": "Espaço do gabinete",
    "larg": 116,
    "dica": "Na ficha do gabinete: \"comprimento máximo da VGA\". Se tiver dois números, use o menor.",
    "ops": [
      {
        "id": "280",
        "curto": "280 mm",
        "sub": "máx. da VGA",
        "val": 280
      },
      {
        "id": "320",
        "curto": "320 mm",
        "sub": "máx. da VGA",
        "val": 320
      },
      {
        "id": "360",
        "curto": "360 mm",
        "sub": "máx. da VGA",
        "val": 360
      },
      {
        "id": "400",
        "curto": "400 mm",
        "sub": "máx. da VGA",
        "val": 400
      }
    ]
  },
  {
    "k": "cool",
    "titulo": "Altura do cooler",
    "larg": 104,
    "dica": "Só conta para cooler de torre. O que vem na caixa do processador é baixo.",
    "ops": [
      {
        "id": "145",
        "curto": "145 mm",
        "sub": "cooler",
        "val": 145
      },
      {
        "id": "155",
        "curto": "155 mm",
        "sub": "cooler",
        "val": 155
      },
      {
        "id": "165",
        "curto": "165 mm",
        "sub": "cooler",
        "val": 165
      }
    ]
  },
  {
    "k": "gc",
    "titulo": "Espaço para o cooler",
    "larg": 116,
    "ops": [
      {
        "id": "150",
        "curto": "150 mm",
        "sub": "máx. do cooler",
        "val": 150
      },
      {
        "id": "160",
        "curto": "160 mm",
        "sub": "máx. do cooler",
        "val": 160
      },
      {
        "id": "170",
        "curto": "170 mm",
        "sub": "máx. do cooler",
        "val": 170
      }
    ]
  }
];

export const INICIAL_GABINETE = {"gpu": "300", "gv": "320", "cool": "155", "gc": "160"};

const n = (x: unknown) => Number(x);

export function contaGabinete(v: Sel): Conta {
  const gpu = n(v.gpu.val), gv = n(v.gv.val), cool = n(v.cool.val), gc = n(v.gc.val);
  const fg = sobraMm(gv, gpu), fc = sobraMm(gc, cool), okG = cabePlaca(gv, gpu), okC = cabeCooler(gc, cool), ok = okG && okC, m = Math.min(fg, fc);
  const sn = (x: number) => `${x > 0 ? "+" : ""}${f(x)} mm`;
  const porque = !okG && !okC ? "A placa e o cooler não cabem." : (okG ? "O cooler bate na tampa lateral." : "A placa bate na frente do gabinete.");
  return { alvo: m, dec: 0, pre: m > 0 ? "+" : "", unidade: "mm", ok,
    rotulo: ok ? "Cabe. A menor sobra é" : "Não cabe. A menor sobra é", cupom: "Cupom de medição · espaço",
    numero: String(gpu).padStart(4, "0"), cod: `${gpu}-${gv}`,
    linhas: [
      { nome: "Espaço para a placa", v: `${gv} mm` },
      { nome: "Placa de vídeo", v: `−${gpu} mm` },
      { nome: "Sobra da placa", v: sn(fg) + (okG ? " · ok" : " · trava"), forte: true },
      { nome: "Espaço para o cooler", v: `${gc} mm`, sep: true },
      { nome: "Cooler", v: `−${cool} mm` },
      { nome: "Sobra do cooler", v: sn(fc) + (okC ? " · ok" : " · trava"), forte: true },
    ],
    sub: ok ? "Margem do Elphy: 10 mm para a placa e 3 mm para o cooler." : `${porque} Troca uma das peças.`,
    nota: "Cabo de energia da placa e ventoinha na frente comem espaço. Por isso a margem.",
    seloTopo: "Gabinete", seloMeio: ok ? "CABE" : "TRAVA", seloBase: ok ? "com folga" : "não monte ainda", brilho: ok ? "0.5" : "0.15" };
}
