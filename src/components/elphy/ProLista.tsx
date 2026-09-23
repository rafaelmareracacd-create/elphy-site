"use client";

import { useState } from "react";

export default function ProLista() {
  const [aviso, setAviso] = useState("");
  return (
    <form
      onSubmit={(evento) => {
        evento.preventDefault();
        setAviso("Em breve. A lista ainda não abriu, e o e-mail não sai deste aparelho.");
      }}
    >
      <label>
        Seu e-mail
        <input type="email" name="email" autoComplete="email" required />
      </label>
      <button type="submit" className="el-btn">Entrar na lista</button>
      {aviso ? <p role="status">{aviso}</p> : null}
    </form>
  );
}
