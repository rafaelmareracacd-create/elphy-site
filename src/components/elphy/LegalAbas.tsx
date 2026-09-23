"use client";

import { useState } from "react";

const ABAS = [
  ["priv", "Privacidade"],
  ["term", "Termos"],
  ["afil", "Afiliado"],
] as const;

const TEXTOS = {
  priv: [
    ["O que fica no seu aparelho", "Tudo o que você escolhe nas ferramentas. A conta roda no navegador e não vai para servidor nenhum."],
    ["O que o Elphy mede", "Visitas por página, sem nome e sem cadastro, com [ferramenta de medição]. Cookie de medição só com o seu aceite."],
    ["Links da Shopee", "Ao clicar num link de loja, a Shopee registra a visita com as regras dela."],
    ["Seus direitos (LGPD)", "Pedir acesso, correção ou exclusão de dados: [e-mail de contato]. Controlador: [nome ou CNPJ]."],
  ],
  term: [
    ["As contas são estimativas", "Cada fórmula está na metodologia. Confira a ficha do fabricante antes de comprar."],
    ["Compatibilidade", "O Elphy confere os números que a ficha publica. Revisão de peça, BIOS e montagem ficam fora da conta."],
    ["Uso do conteúdo", "[regras de uso de texto, nota e imagem do Elphy]"],
  ],
  afil: [
    ["Como o Elphy ganha", "Alguns links levam à Shopee com código de afiliado. Se você compra, o Elphy pode receber comissão. O preço para você não muda."],
    ["O que a comissão não compra", "Loja nenhuma paga para aparecer, subir na lista ou mudar número de conta."],
    ["Por que não tem preço aqui", "Preço muda todo dia. Número velho é número errado."],
  ],
} as const;

export default function LegalAbas() {
  const [aba, setAba] = useState<(typeof ABAS)[number][0]>("priv");
  return (
    <>
      <div className="el-abas" role="tablist" aria-label="Privacidade, termos e afiliado">
        {ABAS.map(([id, nome]) => (
          <button key={id} type="button" role="tab" id={`aba-${id}`} aria-selected={aba === id} aria-controls={`painel-${id}`} onClick={() => setAba(id)}>
            {nome}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`painel-${aba}`} aria-labelledby={`aba-${aba}`}>
        {TEXTOS[aba].map(([titulo, texto]) => (
          <section key={titulo} className="el-bloco">
            <h3>{titulo}</h3>
            <p>{texto}</p>
          </section>
        ))}
      </div>
      <p className="el-miudo">Versão de [data]</p>
    </>
  );
}
