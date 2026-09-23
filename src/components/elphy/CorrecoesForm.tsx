"use client";

import { useState } from "react";

export default function CorrecoesForm() {
  const [enviado, setEnviado] = useState(false);
  if (enviado) {
    return (
      <div role="status">
        <h2>Recebido · protocolo [nº]</h2>
        <p className="el-lead">Chegou. Agora a gente confere.</p>
        <p className="el-prosa">O Elphy abre a ficha que você mandou e refaz a conta. Se o número estiver errado, ele sai do ar e a correção entra na lista em até [prazo].</p>
        <button type="button" className="el-btn el-btn-fantasma" onClick={() => setEnviado(false)}>Mandar outra correção</button>
      </div>
    );
  }
  return (
    <form
      className="el-form"
      onSubmit={(evento) => {
        evento.preventDefault();
        setEnviado(true);
      }}
    >
      <h2>Achou um número errado?</h2>
      <p className="el-lead">Sem cadastro. Manda o link da ficha ou do teste que mostra o número certo.</p>
      <label>
        Em qual página
        <input name="pagina" required autoComplete="off" />
      </label>
      <label>
        O que está errado
        <textarea name="erro" required />
      </label>
      <label>
        Link da ficha ou do teste
        <input name="ficha" type="url" required placeholder="https://" />
      </label>
      <label>
        Seu e-mail (opcional, não aparece)
        <input name="email" type="email" autoComplete="email" />
      </label>
      <button type="submit" className="el-btn">Mandar a correção</button>
      <p className="el-miudo">O e-mail serve só para responder você e é apagado depois. Detalhes na privacidade.</p>
    </form>
  );
}
