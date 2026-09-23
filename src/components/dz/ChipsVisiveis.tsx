"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { aoTrocarDeTela } from "./urlEscolha";

/**
 * Fileira de chips com rolagem lateral (desenho de 390 px): o chip escolhido pode nascer fora da tela
 * (5.000 mAh é o 4º; 1 TB, o 4º). Ao abrir a página, a fileira rola até ele.
 */
export default function ChipsVisiveis() {
  const rota = usePathname();
  useEffect(() => {
    const mostra = () => {
      document.querySelectorAll<HTMLElement>('.dz [aria-pressed="true"]').forEach((chip) => {
        let rolo = chip.parentElement;
        while (rolo && !/(auto|scroll)/.test(getComputedStyle(rolo).overflowX)) rolo = rolo.parentElement;
        if (!rolo || rolo.scrollWidth <= rolo.clientWidth) return;
        const c = chip.getBoundingClientRect(), r = rolo.getBoundingClientRect();
        if (c.right > r.right) rolo.scrollLeft += c.right - r.right + 24;
        else if (c.left < r.left) rolo.scrollLeft -= r.left - c.left + 24;
      });
    };
    // depois de a página ler a escolha da URL, e quando a árvore do celular volta a aparecer
    const t = [setTimeout(mostra, 150), setTimeout(mostra, 600)];
    const depois = () => t.push(setTimeout(mostra, 150));
    const solta = aoTrocarDeTela(depois);
    return () => { solta(); t.forEach(clearTimeout); };
  }, [rota]);
  return null;
}
