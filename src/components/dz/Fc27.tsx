"use client";

import { busca, nivel, porId, VEREDITO, type Placa } from "@/lib/ferramentas/fc27";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import MenuBotao from "./Menu";

const RAPIDAS = ["gtx-1050-ti", "gtx-1650", "rx-580", "gtx-1660-super", "rtx-3060", "rtx-4060"];

const DEGRAUS = [
  { nome: "Mínimo", placa: "GTX 1050 Ti · RX 570", imagem: "720p · 60 fps", ram: "8 GB, dois pentes" },
  { nome: "Recomendado", placa: "GTX 1660 · RX 5600 XT", imagem: "1080p · 60 fps", ram: "12 GB, dois pentes" },
  { nome: "Alto", placa: "RTX 3060 · RX 6600 XT", imagem: "1440p · 60 fps", ram: "16 GB" },
  { nome: "Ultra", placa: "RTX 4070 · RX 7800 XT", imagem: "4K · 60 fps", ram: "32 GB" },
];

const EDICOES = [
  { nome: "Standard", console: "R$ 349", pc: "R$ 299" },
  { nome: "Ultimate", console: "R$ 499", pc: "R$ 429" },
  { nome: "Ultimate Plus", console: "R$ 749,50", pc: "R$ 699" },
];

const mono = { fontFamily: "var(--fm)", fontSize: "10.5px", letterSpacing: ".16em", textTransform: "uppercase" as const };

/** "Meu PC roda o FC 27?" — digita a placa, a nota diz o degrau na lista da EA. */
export default function Fc27() {
  const [q, setQ] = useState("");
  const [placa, setPlaca] = useState<Placa | null>(null);
  const [copiado, setCopiado] = useState(false);

  // ?placa=gtx-1660 abre com a nota impressa (link que o amigo manda)
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("placa");
    const p = id ? porId(id) : undefined;
    if (p) { setPlaca(p); setQ(p.nome); }
  }, []);

  const escolhe = (p: Placa) => {
    setPlaca(p); setQ(p.nome); setCopiado(false);
    try { window.history.replaceState(null, "", `?placa=${p.id}`); } catch { /* sem histórico, segue */ }
  };
  const achadas = placa && q === placa.nome ? [] : busca(q);
  const v = placa ? VEREDITO[nivel(placa.i)] : null;

  const mandar = async () => {
    const url = window.location.href;
    const texto = placa && v ? `Minha ${placa.nome} no FC 27: ${v.selo.toLowerCase()} (${v.imagem}). E a sua?` : "Meu PC roda o FC 27?";
    try {
      if (navigator.share) { await navigator.share({ title: "Meu PC roda o FC 27?", text: texto, url }); return; }
      await navigator.clipboard.writeText(`${texto} ${url}`);
      setCopiado(true);
    } catch { /* cancelou o compartilhamento */ }
  };

  return (
    <div className="dz-col" style={{ position: "relative", width: "100%", minHeight: "1500px", overflow: "hidden", display: "flex", flexDirection: "column", background: "#050607", color: "#eef2ee", fontFamily: "var(--fb)" }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px", boxSizing: "border-box", padding: "0 24px", borderBottom: "1px solid rgba(255,255,255,.07)" }}>
        <Link href="/" style={{ fontWeight: "800", fontSize: "24px", letterSpacing: "-.045em", textDecoration: "none", color: "#eef2ee" }}>
          elphy<span style={{ color: "#9dff3b" }}>.</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ ...mono, letterSpacing: ".12em", color: "#c9d0ca" }}>PC</span>
          <MenuBotao style={{ width: "44px", height: "44px", boxSizing: "border-box", border: "1px solid rgba(255,255,255,.14)", borderRadius: "22px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#eef2ee" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4 8h16M4 16h16" /></svg>
          </MenuBotao>
        </div>
      </header>

      <div style={{ padding: "28px 24px 0" }}>
        <p style={{ ...mono, margin: 0, color: "#9dff3b" }}>FC 27 · lança 25/09</p>
        <h1 style={{ margin: "14px 0 0", fontFamily: "var(--fd)", fontWeight: 900, fontSize: "66px", lineHeight: ".86", textTransform: "uppercase" }}>
          Meu PC<br />roda o<br />FC 27<span style={{ color: "#9dff3b" }}>?</span>
        </h1>
        <p style={{ margin: "14px 0 0", fontSize: "16px", lineHeight: "24px", color: "#b9c1bb" }}>
          Rodar, quase todo PC roda. A pergunta é em que imagem. Digita a sua placa de vídeo.
        </p>
      </div>

      <div style={{ padding: "26px 24px 0" }}>
        <label htmlFor="placa" style={{ ...mono, color: "#9aa39c" }}>Sua placa de vídeo</label>
        <input id="placa" value={q} autoComplete="off" placeholder="ex.: GTX 1650, RX 580, RTX 3060"
          onChange={(e) => { setQ(e.target.value); setPlaca(null); }}
          style={{ display: "block", width: "100%", boxSizing: "border-box", marginTop: "10px", height: "58px", padding: "0 18px", borderRadius: "16px", border: "1px solid rgba(157,255,59,.45)", background: "#0b0f0c", color: "#eef2ee", fontFamily: "var(--fb)", fontSize: "18px", fontWeight: 700, outline: "none" }} />
        {achadas.length > 0 && (
          <div role="listbox" aria-label="Placas encontradas" style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "6px" }}>
            {achadas.map((p) => (
              <button key={p.id} type="button" role="option" aria-selected={false} onClick={() => escolhe(p)}
                style={{ textAlign: "left", height: "48px", padding: "0 16px", borderRadius: "12px", border: "1px solid rgba(255,255,255,.12)", background: "#0d1013", color: "#eef2ee", fontFamily: "var(--fb)", fontSize: "15px", fontWeight: 700 }}>
                {p.nome}
              </button>
            ))}
          </div>
        )}
        {q.trim().length > 1 && achadas.length === 0 && !placa && (
          <p style={{ margin: "10px 0 0", fontSize: "14px", lineHeight: "20px", color: "#9aa39c" }}>
            Não achei essa. Tenta só o número (ex.: 1650) ou confere o nome no Gerenciador de Tarefas → Desempenho → GPU.
          </p>
        )}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "14px" }}>
          {RAPIDAS.map((id) => { const p = porId(id)!; return (
            <button key={id} type="button" onClick={() => escolhe(p)} aria-pressed={placa?.id === id}
              style={{ height: "36px", padding: "0 12px", borderRadius: "18px", border: `1px solid ${placa?.id === id ? "#9dff3b" : "rgba(255,255,255,.14)"}`, background: placa?.id === id ? "rgba(157,255,59,.14)" : "transparent", color: "#c9d0ca", fontFamily: "var(--fm)", fontSize: "11px" }}>
              {p.nome.replace(/^(GeForce|Radeon) /, "")}
            </button>
          ); })}
        </div>
      </div>

      {placa && v && (
        <div key={placa.id} style={{ position: "relative", marginTop: "34px", padding: "0 24px", display: "flex", justifyContent: "center" }}>
          <div style={{ position: "relative", transform: "rotate(-1.2deg)" }}>
            <div style={{ position: "relative", width: "318px", background: "#f3f1ea", color: "#111311", fontFamily: "var(--fm)", fontSize: "10.5px", lineHeight: "17px", boxShadow: "0 40px 70px rgba(0,0,0,.55)", animation: "el-imprime .6s cubic-bezier(.2,.7,.3,1) backwards" }}>
              <div style={{ padding: "22px 22px 24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontFamily: "var(--fb)", fontWeight: 800, fontSize: "21px", letterSpacing: "-.045em" }}>elphy.</span>
                  <span style={{ fontWeight: 700 }}>FC 27</span>
                </div>
                <div style={{ margin: "12px 0", borderTop: "1.5px dashed rgba(17,19,17,.4)" }} />
                {[["Sua placa", placa.nome], ["Mínimo da EA", "GTX 1050 Ti · 720p"], ["Recomendada", "GTX 1660 · 1080p"]].map(([a, b]) => (
                  <Fragment key={a}>
                    <div style={{ display: "flex", alignItems: "baseline", marginTop: "4px" }}>
                      <span>{a}</span><span style={{ flex: 1, margin: "0 5px 4px", borderBottom: "1.5px dotted rgba(17,19,17,.45)" }} /><b style={{ textAlign: "right" }}>{b}</b>
                    </div>
                  </Fragment>
                ))}
                <div style={{ marginTop: "14px", borderTop: "3px double #111311" }} />
                <div style={{ padding: "12px 0 8px" }}>
                  <div style={{ fontSize: "9px", letterSpacing: ".14em", textTransform: "uppercase", color: "#5b5f58" }}>Imagem provável</div>
                  <div style={{ marginTop: "6px", fontFamily: "var(--fd)", fontWeight: 900, fontSize: "46px", lineHeight: ".9", textTransform: "uppercase" }}>{v.selo}</div>
                  <div style={{ marginTop: "6px", fontWeight: 700 }}>{v.imagem}</div>
                  <div style={{ marginTop: "8px", fontSize: "10.5px", lineHeight: "16px", color: "#3f433d" }}>{v.texto}</div>
                </div>
                <div style={{ borderTop: "3px double #111311" }} />
                <div style={{ marginTop: "10px", fontSize: "9.5px", lineHeight: "14px", color: "#5b5f58" }}>
                  Estimativa pelo desempenho da placa comparado às placas da lista da EA. Não é teste no FC 27, e o resto do PC também conta.
                </div>
              </div>
            </div>
            <div aria-hidden="true" style={{ position: "absolute", right: "-22px", bottom: "64px", width: "108px", height: "108px", borderRadius: "50%", background: v.cor, color: "#07110a", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontFamily: "var(--fd)", fontWeight: 900, fontSize: "22px", lineHeight: ".9", textTransform: "uppercase", outline: "1.5px dashed rgba(7,17,10,.35)", outlineOffset: "-8px", boxShadow: "0 16px 36px rgba(0,0,0,.45)", animation: "el-carimba .44s cubic-bezier(.2,1.3,.4,1) both", animationDelay: "600ms" }}>
              {v.selo}
            </div>
          </div>
        </div>
      )}

      <div style={{ padding: "36px 24px 0", display: "flex", flexDirection: "column", gap: "10px" }}>
        <button type="button" onClick={mandar} style={{ height: "58px", border: 0, borderRadius: "29px", background: "#9dff3b", color: "#07110a", fontFamily: "var(--fb)", fontWeight: 700, fontSize: "17px", boxShadow: "0 14px 40px rgba(157,255,59,.25)" }}>
          {copiado ? "Link copiado" : "Mandar pro amigo do PC velho"}
        </button>
      </div>

      <div id="edicoes" style={{ padding: "40px 24px 0" }}>
        <p style={{ ...mono, margin: 0, color: "#9aa39c" }}>Quanto custa cada edição</p>
        <div style={{ marginTop: "12px", borderRadius: "14px", border: "1px solid rgba(255,255,255,.1)", background: "#0a0d0f", overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr", padding: "12px 16px", ...mono, fontSize: "10px", letterSpacing: ".12em", color: "#9aa39c", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
            <span>Edição</span><span style={{ textAlign: "right" }}>Console</span><span style={{ textAlign: "right" }}>PC</span>
          </div>
          {EDICOES.map((e) => (
            <div key={e.nome} style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr", alignItems: "baseline", padding: "14px 16px", borderTop: "1px solid rgba(255,255,255,.06)" }}>
              <b style={{ fontSize: "15px", color: e.nome === "Standard" ? "#9dff3b" : "#eef2ee" }}>{e.nome}</b>
              <span style={{ textAlign: "right", fontFamily: "var(--fm)", fontSize: "14px", color: "#eef2ee" }}>{e.console}</span>
              <span style={{ textAlign: "right", fontFamily: "var(--fm)", fontSize: "14px", color: "#eef2ee" }}>{e.pc}</span>
            </div>
          ))}
        </div>
        <p style={{ margin: "10px 0 0", fontSize: "14px", lineHeight: "21px", color: "#b9c1bb" }}>
          Os modos de jogo são os mesmos nas três, inclusive o Clubs no mundo aberto (e a caminhada até o clube). As mais caras davam acesso antecipado, que acabou no lançamento, e somam FC Points e itens do Ultimate Team.
        </p>
        <p style={{ margin: "8px 0 0", fontSize: "12px", lineHeight: "18px", color: "#7f8881" }}>
          Preço oficial de lançamento nas lojas digitais (Terra, 2026). Assinante EA Play tem 10% de desconto. Loja física e promoção mudam o valor.
        </p>
      </div>

      <div style={{ padding: "40px 24px 0" }}>
        <p style={{ ...mono, margin: 0, color: "#9aa39c" }}>A lista da EA, degrau por degrau</p>
        <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
          {DEGRAUS.map((d) => (
            <div key={d.nome} style={{ padding: "14px 16px", borderRadius: "14px", border: "1px solid rgba(255,255,255,.1)", background: "#0a0d0f" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "10px" }}>
                <b style={{ fontSize: "15px" }}>{d.nome}</b>
                <span style={{ fontFamily: "var(--fm)", fontSize: "11px", color: "#9dff3b", whiteSpace: "nowrap" }}>{d.imagem}</span>
              </div>
              <div style={{ marginTop: "4px", fontSize: "14px", color: "#b9c1bb" }}>{d.placa} · {d.ram}</div>
            </div>
          ))}
        </div>
        <p style={{ margin: "10px 0 0", fontSize: "13px", lineHeight: "19px", color: "#7f8881" }}>
          Todos os degraus: Windows 10 ou 11 de 64 bits, DirectX 12 e 100 GB livres. A partir do recomendado, a lista pede SSD.
        </p>
      </div>

      <div style={{ margin: "28px 24px 0", boxSizing: "border-box", padding: "20px", borderRadius: "20px", border: "1px solid rgba(255,176,32,.35)", background: "#0a0d0f" }}>
        <span style={{ ...mono, letterSpacing: ".14em", color: "#ffb020" }}>A letra miúda da memória</span>
        <p style={{ margin: "10px 0 0", fontSize: "15px", lineHeight: "23px", color: "#c9d0ca" }}>
          A lista pede memória <b>dual-channel</b> até no mínimo: dois pentes iguais, nos encaixes que o manual da placa-mãe indica (em placa de quatro encaixes, quase sempre o 2º e o 4º). Com um pente só, a memória trabalha em pista simples e o jogo pode engasgar.
        </p>
        <Link href="/ferramentas/memoria/" style={{ display: "inline-block", marginTop: "12px", color: "#9dff3b", fontWeight: 700, fontSize: "15px" }}>
          Qual memória seu processador aceita →
        </Link>
      </div>

      <div style={{ margin: "12px 24px 0", boxSizing: "border-box", padding: "20px", borderRadius: "20px", border: "1px solid rgba(255,255,255,.1)", background: "#0a0d0f" }}>
        <span style={{ ...mono, letterSpacing: ".14em", color: "#9dff3b" }}>100 GB livres</span>
        <p style={{ margin: "10px 0 0", fontSize: "15px", lineHeight: "23px", color: "#c9d0ca" }}>
          O mínimo aceita HD; do recomendado para cima, a lista pede SSD. Confira quanto espaço sobra de verdade no seu SSD.
        </p>
        <Link href="/ferramentas/ssd/" style={{ display: "inline-block", marginTop: "12px", color: "#9dff3b", fontWeight: 700, fontSize: "15px" }}>
          Espaço real do SSD →
        </Link>
      </div>

      <p style={{ margin: "28px 24px 0", fontSize: "12px", lineHeight: "18px", color: "#7f8881" }}>
        Lista de requisitos como divulgada por dlcompare (26/08/2026) e Khel Now (27/07/2026). Conferimos de novo quando a EA mudar a lista. Atualizado em 24/09/2026.
      </p>

      <div style={{ flexGrow: 1, minHeight: "40px" }} />
      <footer style={{ padding: "24px", borderTop: "1px solid rgba(255,255,255,.07)", display: "flex", justifyContent: "space-between", alignItems: "center", ...mono, fontSize: "10px", letterSpacing: ".1em", color: "#9aa39c" }}>
        <span>Dica sem caô<span style={{ color: "#9dff3b" }}>.</span></span>
        <Link href="/metodologia/" style={{ color: "#9aa39c" }}>Como a gente faz a conta</Link>
      </footer>
    </div>
  );
}
