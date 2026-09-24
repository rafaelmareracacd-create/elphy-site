import { describe, it } from "node:test";
import assert from "node:assert/strict";
// @ts-expect-error Node executa os fontes TypeScript sem etapa de compilação.
import { ACHADOS, achadosVisiveis } from "../content/achados.ts";
// @ts-expect-error Node executa os fontes TypeScript sem etapa de compilação.
import { filtrarAchados, dinheiro, urlExterna } from "./achados.ts";
// @ts-expect-error Node executa os fontes TypeScript sem etapa de compilação.
import { PLACAS, busca, nivel, VEREDITO } from "./ferramentas/fc27.ts";

describe("publicação e filtros dos achados", () => {
  it("não publica nenhum dos seis exemplos, nem links ou preços fictícios", () => {
    assert.equal(achadosVisiveis(false).length, 6);
    assert.deepEqual(achadosVisiveis(true), []);
    assert.equal(new Set(ACHADOS.map((item) => item.slug)).size, 6);
    for (const item of ACHADOS) {
      assert.equal(item.rascunho, true);
      for (const loja of [item.lojaPrincipal, ...item.outrasLojas]) {
        assert.equal(loja.url, null);
        assert.equal(loja.preco, null);
        assert.equal(loja.frete, null);
        assert.equal(loja.conferidoEm, null);
      }
    }
  });
  it("combina categoria, coleção, carimbo e busca sem acentos", () => {
    const lista = filtrarAchados(ACHADOS, { categoria: "Casa e quarto", colecao: "Primeiro apê", carimbo: "vale", busca: "luminaria" });
    assert.deepEqual(lista.map((item) => item.slug), ["luminaria-de-mesa"]);
    assert.equal(filtrarAchados(ACHADOS, { categoria: "Áudio", carimbo: "deixa" }).length, 0);
    assert.equal(filtrarAchados([], {}).length, 0);
  });
  it("diferencia dado ausente de valor zero e recusa URLs executáveis", () => {
    assert.equal(dinheiro(null), "R$ [PREÇO]");
    assert.match(dinheiro(0), /0,00/);
    assert.equal(urlExterna("javascript:alert(1)"), false);
    assert.equal(urlExterna(null), false);
    assert.equal(urlExterna("https://example.com/produto"), true);
  });
});
describe("FC 27 com a base real", () => {
  it("busca abreviações e placas fora dos atalhos", () => {
    assert.equal(busca("1660s")[0]?.id, "gtx-1660-super");
    assert.equal(busca("rtx3060")[0]?.id, "rtx-3060");
    assert.equal(busca("5090")[0]?.id, "rtx-5090");
    assert.deepEqual(busca("placa inexistente"), []);
  });
  it("mantém os seis degraus e um veredito para todas as placas", () => {
    assert.deepEqual([94, 95, 149, 150, 189, 190, 289, 290, 549, 550].map(nivel), ["abaixo", "borrada", "borrada", "meio", "meio", "nitida", "nitida", "sobra", "sobra", "ultra"]);
    for (const placa of PLACAS) assert.ok(VEREDITO[nivel(placa.i)].texto);
  });
});
