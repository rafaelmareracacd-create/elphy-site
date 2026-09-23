"""Troca o botão/link "Abrir menu" da prancheta por <MenuBotao>. Uso: python scripts/menu_dz.py <arquivo.tsx>..."""
import sys, re
sys.stdout.reconfigure(encoding="utf-8")
PAD = re.compile(r'<(button type="button"|a href="/") aria-label="Abrir menu" (style=\{\{.*?\}\})>(.*?)</(button|a)>', re.S)


def troca(jsx):
    m = PAD.search(jsx)
    if not m:
        return jsx, False
    return jsx[:m.start()] + f"<MenuBotao {m.group(2)}>{m.group(3)}</MenuBotao>" + jsx[m.end():], True


if __name__ == "__main__":
    for arq in sys.argv[1:]:
        s = open(arq, encoding="utf-8").read()
        s, ok = troca(s)
        if ok and 'import MenuBotao' not in s:
            s = s.replace("/* Transcrito", 'import MenuBotao from "./Menu";\n\n/* Transcrito', 1)
        open(arq, "w", encoding="utf-8").write(s)
        print(arq, "menu trocado" if ok else "sem menu")
