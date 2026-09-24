export default function Icone({ nome }: { nome: "inicio" | "achados" | "ferramentas" | "busca" | "seta" }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {nome === "inicio" && <><path d="M4 11l8-7 8 7v9H4z" /><path d="M10 20v-5h4v5" /></>}
    {nome === "achados" && <><path d="M20 12l-8 8-8-8V4h8z" /><circle cx="8.5" cy="8.5" r="1.5" /></>}
    {nome === "ferramentas" && <><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" /><path d="M9 8h6M9 12h6" /></>}
    {nome === "busca" && <><circle cx="10.5" cy="10.5" r="6.5" /><path d="M16 16l4 4" /></>}
    {nome === "seta" && <path d="M5 12h14M13 6l6 6-6 6" />}
  </svg>;
}
