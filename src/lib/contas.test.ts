import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  bytesDeRotuloGb,
  conferirMontagem,
  contaDeLuz,
  formatarReais,
  fonteRecomendada,
  memoriaOficial,
  monitorConta,
  sobraMm,
  ssdGbVisiveis,
} from "./contas.ts";

describe("contas da metodologia", () => {
  it("RTX 5070 + R5 7600 dá 550 W", () => {
    const conta = fonteRecomendada(250, 88);
    assert.equal(conta.consumo, 398);
    assert.equal(conta.comFolga, 517);
    assert.equal(conta.recomendado, 550);
  });

  it("1 TB dá 931 GB", () => {
    assert.equal(ssdGbVisiveis(bytesDeRotuloGb(1000)), 931);
  });

  it("27 QHD dá 109 PPI", () => {
    assert.equal(monitorConta(2560, 1440, 27).ppiArredondado, 109);
  });

  it("450 W × 4 h × R$ 0,85 dá R$ 45,90", () => {
    assert.equal(formatarReais(contaDeLuz(450, 4, 0.85)), "R$ 45,90");
  });

  it("placa de 300 mm em gabinete de 320 mm sobra 20 mm", () => {
    assert.equal(sobraMm(320, 300), 20);
  });

  it("Ryzen 7000 dá DDR5-5200", () => {
    assert.equal(memoriaOficial("Ryzen 7000")?.rotulo, "DDR5-5200");
  });

  it("montador com 7800X3D + 5080 + fonte 550 W dá 3 de 4 com selo âmbar", () => {
    const resultado = conferirMontagem({
      cpu: { nome: "Ryzen 7 7800X3D", w: 162, sock: "AM5" },
      mae: { nome: "Placa B650", sock: "AM5", ddr: "DDR5" },
      mem: { nome: "2×16 GB DDR5", ddr: "DDR5" },
      gpu: { nome: "RTX 5080", w: 360, mm: 340 },
      gab: { nome: "Gabinete grande", mm: 400 },
      psu: { nome: "Fonte 550 W", w: 550 },
    });
    assert.equal(resultado.passaram, 3);
    assert.equal(resultado.total, 4);
    assert.equal(resultado.selo, "ambar");
    assert.equal(resultado.precisaW, 757);
    assert.equal(resultado.recomendadoW, 850);
  });
});
