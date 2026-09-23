import { f, type Conta, type Grupo, type Sel } from "@/components/dz/useFerramenta";
import { monitorConta } from "@/lib/contas";

/* Grupos, escolha inicial e conta da prancheta Monitor-Mobile (docs/design-1.0). */
export const GR_MONITOR: Grupo[] = [
  {
    "k": "pol",
    "titulo": "Tamanho da tela",
    "larg": 92,
    "ops": [
      {
        "id": "21.5",
        "curto": "21,5\"",
        "sub": "polegadas",
        "val": 21.5
      },
      {
        "id": "24",
        "curto": "24\"",
        "sub": "polegadas",
        "val": 24
      },
      {
        "id": "27",
        "curto": "27\"",
        "sub": "polegadas",
        "val": 27
      },
      {
        "id": "32",
        "curto": "32\"",
        "sub": "polegadas",
        "val": 32
      },
      {
        "id": "34",
        "curto": "34\"",
        "sub": "polegadas",
        "val": 34
      }
    ]
  },
  {
    "k": "res",
    "titulo": "Resolução",
    "larg": 124,
    "ops": [
      {
        "id": "fhd",
        "curto": "Full HD",
        "sub": "1920 × 1080",
        "x": 1920,
        "y": 1080
      },
      {
        "id": "qhd",
        "curto": "QHD",
        "sub": "2560 × 1440",
        "x": 2560,
        "y": 1440
      },
      {
        "id": "uw",
        "curto": "Ultrawide",
        "sub": "3440 × 1440",
        "x": 3440,
        "y": 1440
      },
      {
        "id": "4k",
        "curto": "4K",
        "sub": "3840 × 2160",
        "x": 3840,
        "y": 2160
      }
    ]
  }
];

export const INICIAL_MONITOR = {"pol": "27", "res": "qhd"};

const n = (x: unknown) => Number(x);

export function contaMonitor(v: Sel): Conta {
  const d = n(v.pol.val), x = n(v.res.x), y = n(v.res.y), dg = Math.hypot(x, y);
  const { ppi, ppiArredondado } = monitorConta(x, y, d);
  const cm = 8732 / ppiArredondado; // com o PPI que a nota mostra, para a conta fechar na mão
  return { alvo: ppi, dec: 0, unidade: "PPI", rotulo: "Pixels por polegada", cupom: "Cupom de medição · tela",
    numero: String(Math.round(ppi)).padStart(4, "0"), cod: v.res.id.toUpperCase() + String(d).replace(".", ""),
    linhas: [
      { nome: "Resolução", v: `${f(x)} × ${f(y)}` },
      { nome: "Diagonal em pixels", v: `${f(dg)} px` },
      { nome: "÷ tamanho da tela", v: `${d % 1 ? f(d, 1) : f(d)}"` },
      { nome: "O pixel some a partir de", v: `${f(cm)} cm`, forte: true, sep: true },
    ],
    sub: `Mais perto que ${f(cm)} cm, o olho enxerga o pixel (regra de 1 minuto de arco).`,
    nota: "PPI mede nitidez, só isso. Cor, brilho, contraste e velocidade do painel ficam fora da conta.",
    seloTopo: "Nitidez", seloMeio: f(ppi), seloBase: "PPI", brilho: (0.2 + 0.6 * Math.min(ppi / 160, 1)).toFixed(2) };
}
