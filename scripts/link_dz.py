"""Links internos (<a href="/...">) viram <Link> do next/link, com o mesmo estilo. Uso: python scripts/link_dz.py <arquivo.tsx>..."""
import sys, re
sys.stdout.reconfigure(encoding="utf-8")
TAG = re.compile(r"<a(?=[\s>])|</a>")


def converte(s):
    pilha, trocas = [], []
    for m in TAG.finditer(s):
        if m.group(0) == "</a>":
            if pilha:
                ini, interno = pilha.pop()
                if interno:
                    trocas.append((ini, ini + 2, "<Link"))
                    trocas.append((m.start(), m.end(), "</Link>"))
        else:
            fim = s.find(">", m.start())
            abre = s[m.start():fim]
            pilha.append((m.start(), bool(re.search(r'\shref="/', abre))))
    for a, b, t in sorted(trocas, reverse=True):
        s = s[:a] + t + s[b:]
    if trocas and 'from "next/link"' not in s:
        s = re.sub(r'^((?:"use client";\n\n)?)', r'\1import Link from "next/link";\n', s, count=1)
    return s, len(trocas) // 2


if __name__ == "__main__":
    for arq in sys.argv[1:]:
        s, n = converte(open(arq, encoding="utf-8").read())
        open(arq, "w", encoding="utf-8").write(s)
        print(arq, n, "links")
