import type { CarimboTipo } from "@/content/achados";
import { CARIMBOS } from "@/lib/achados";
export default function Carimbo({ tipo, grande = false }: { tipo: CarimboTipo; grande?: boolean }) {
  return <span className={`v3-carimbo v3-carimbo-${tipo}${grande ? " v3-carimbo-grande" : ""}`}>{CARIMBOS[tipo]}</span>;
}
