import { f, type Conta, type Grupo, type Sel } from "@/components/dz/useFerramenta";
import { contaDeLuz } from "@/lib/contas";

/* Grupos, escolha inicial e conta da prancheta Luz-Mobile (docs/design-1.0). */
export const GR_LUZ: Grupo[] = [
  {
    "k": "w",
    "titulo": "Watts na tomada",
    "larg": 124,
    "dica": "Não sabe? A calculadora de fonte dá o consumo do PC em carga.",
    "ops": [
      {
        "id": "150",
        "curto": "150 W",
        "sub": "escritório",
        "val": 150
      },
      {
        "id": "300",
        "curto": "300 W",
        "sub": "jogo leve",
        "val": 300
      },
      {
        "id": "450",
        "curto": "450 W",
        "sub": "jogo pesado",
        "val": 450
      },
      {
        "id": "650",
        "curto": "650 W",
        "sub": "topo de linha",
        "val": 650
      }
    ]
  },
  {
    "k": "h",
    "titulo": "Horas ligado por dia",
    "larg": 92,
    "ops": [
      {
        "id": "2",
        "curto": "2 h",
        "sub": "por dia",
        "val": 2
      },
      {
        "id": "4",
        "curto": "4 h",
        "sub": "por dia",
        "val": 4
      },
      {
        "id": "6",
        "curto": "6 h",
        "sub": "por dia",
        "val": 6
      },
      {
        "id": "8",
        "curto": "8 h",
        "sub": "por dia",
        "val": 8
      },
      {
        "id": "12",
        "curto": "12 h",
        "sub": "por dia",
        "val": 12
      }
    ]
  },
  {
    "k": "tar",
    "titulo": "Tarifa da sua conta",
    "larg": 108,
    "dica": "Na conta de luz: valor total ÷ kWh do mês. Já sai com imposto e bandeira.",
    "ops": [
      {
        "id": "0.7",
        "curto": "R$ 0,70",
        "sub": "por kWh",
        "val": 0.7
      },
      {
        "id": "0.85",
        "curto": "R$ 0,85",
        "sub": "por kWh",
        "val": 0.85
      },
      {
        "id": "1.0",
        "curto": "R$ 1,00",
        "sub": "por kWh",
        "val": 1.0
      },
      {
        "id": "1.15",
        "curto": "R$ 1,15",
        "sub": "por kWh",
        "val": 1.15
      }
    ]
  }
];

export const INICIAL_LUZ = {"w": "450", "h": "4", "tar": "0.85"};

const n = (x: unknown) => Number(x);

export function contaLuz(v: Sel): Conta {
  const w = n(v.w.val), h = n(v.h.val), t = n(v.tar.val), kwh = w * h * 30 / 1000, r = contaDeLuz(w, h, t);
  return { alvo: r, dec: 2, pre: "R$", unidade: "/mês", rotulo: "Conta de luz do PC",
    cupom: "Cupom de medição · energia", numero: String(Math.round(kwh)).padStart(4, "0"), cod: `${w}W${h}H`,
    linhas: [
      { nome: "PC na tomada", v: `${w} W` },
      { nome: "Ligado por dia", v: `${h} h` },
      { nome: "No mês (30 dias)", v: `${f(kwh, 1)} kWh`, sep: true },
      { nome: "Tarifa da sua conta", v: `R$ ${f(t, 2)}/kWh` },
      { nome: "No ano", v: `R$ ${f(r * 12, 2)}`, forte: true, sep: true },
    ],
    sub: "É o teto: o PC em carga o tempo todo. Navegando, gasta menos.",
    nota: "Monitor, caixa de som e roteador ficam fora. Some os watts deles para ter a conta da mesa inteira.",
    seloTopo: "Por mês", seloMeio: `R$ ${f(r, 0)}`, seloBase: "de luz", brilho: (0.2 + 0.6 * Math.min(r / 150, 1)).toFixed(2) };
}
