import { f, type Conta, type Grupo, type LinhaNota, type Opcao, type Sel } from "@/components/dz/useFerramenta";

/* Grupos, escolha inicial e conta da prancheta Memoria-Mobile (docs/design-1.0). */
export const GR_MEMORIA: Grupo[] = [
  {
    "k": "plat",
    "titulo": "Seu processador",
    "larg": 140,
    "dica": "A geração está no nome: Ryzen 5 7600 é da série 7000; Core i7-14700K é da 14ª geração.",
    "ops": [
      {
        "id": "r5000",
        "curto": "Ryzen 5000",
        "sub": "AM4",
        "sock": "AM4",
        "tipo": "DDR4",
        "teto": 3200
      },
      {
        "id": "r7000",
        "curto": "Ryzen 7000",
        "sub": "AM5",
        "sock": "AM5",
        "tipo": "DDR5",
        "teto": 5200
      },
      {
        "id": "r9000",
        "curto": "Ryzen 9000",
        "sub": "AM5",
        "sock": "AM5",
        "tipo": "DDR5",
        "teto": 5600
      },
      {
        "id": "i12",
        "curto": "Intel 12ª geração",
        "sub": "LGA1700",
        "sock": "LGA1700",
        "tipo": "DDR4 ou DDR5",
        "teto": 4800,
        "t4": 3200
      },
      {
        "id": "i13",
        "curto": "Intel 13ª e 14ª",
        "sub": "LGA1700",
        "sock": "LGA1700",
        "tipo": "DDR4 ou DDR5",
        "teto": 5600,
        "t4": 3200
      },
      {
        "id": "u200",
        "curto": "Core Ultra 200S",
        "sub": "LGA1851",
        "sock": "LGA1851",
        "tipo": "DDR5",
        "teto": 6400
      }
    ]
  }
];

export const INICIAL_MEMORIA = {"plat": "r7000"};

export function contaMemoria(v: Sel): Conta {
  const q = v.plat as Opcao & { sock: string; tipo: string; teto: number; t4?: number };
  const duplo = !!q.t4;
  const ls: LinhaNota[] = [{ nome: "Soquete", v: q.sock }, { nome: "Tipo de memória", v: q.tipo }];
  if (duplo) {
    ls.push({ nome: "Teto oficial DDR5", v: `${f(q.teto)} MT/s`, sep: true, forte: true });
    ls.push({ nome: "Teto oficial DDR4", v: `${f(q.t4 ?? 0)} MT/s`, forte: true });
  } else ls.push({ nome: `Teto oficial ${q.tipo}`, v: `${f(q.teto)} MT/s`, sep: true, forte: true });
  return { alvo: q.teto, dec: 0, unidade: "MT/s", rotulo: duplo ? "Velocidade oficial máxima (DDR5)" : "Velocidade oficial máxima",
    cupom: "Cupom de medição · memória", numero: String(q.teto).padStart(4, "0"), cod: q.id.toUpperCase(),
    linhas: ls,
    sub: q.id === "i13" ? "A placa-mãe decide se é DDR4 ou DDR5. Nunca as duas. Core i5 sem K (13400, 14400F) para em 4.800." : duplo ? "A placa-mãe decide se é DDR4 ou DDR5. Nunca as duas." : "Pente mais rápido funciona. Passar do teto depende do perfil XMP ou EXPO, fora da especificação oficial.",
    nota: "Dados da especificação oficial do processador. A conferir na ficha antes de publicar.",
    seloTopo: duplo ? "DDR5" : q.tipo, seloMeio: f(q.teto), seloBase: "MT/s oficial", brilho: (0.2 + 0.5 * q.teto / 6400).toFixed(2) };
}
