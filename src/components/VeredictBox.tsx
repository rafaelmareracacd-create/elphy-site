import type { Review } from "@/lib/content";
export default function VeredictBox({ veredito }: { veredito: Review["veredito"] }) {
  return <section className="verdict-box" aria-label="Nosso veredito"><strong>{veredito.resposta}.</strong><p>{veredito.frase}</p></section>;
}
