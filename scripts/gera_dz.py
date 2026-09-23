"""Gera src/components/dz/<Nome>.tsx a partir da prancheta, só para começar (depois é editado à mão).
Uso: python scripts/gera_dz.py <Prancheta> <NomeDoComponente> [client]
Já faz: raiz fluida (celular) ou sem altura fixa (computador), botão de menu -> <MenuBotao>, imagem do Elphy."""
import sys, subprocess, os, re
sys.stdout.reconfigure(encoding="utf-8")
prancheta, nome = sys.argv[1], sys.argv[2]
cliente = len(sys.argv) > 3
destino = f"src/components/dz/{nome}.tsx"
if os.path.exists(destino) and os.path.getsize(destino) > 0:
    sys.exit(f"já existe: {destino}")
jsx = subprocess.run([sys.executable, "scripts/html2jsx.py", f"docs/design-1.0/{prancheta}.dc.html"], capture_output=True, text=True, encoding="utf-8", check=True).stdout
linhas = jsx.splitlines()
# raiz: largura da prancheta -> fluida; altura fixa sai
# altura fixa da prancheta vira altura mínima: o rodapé fica no mesmo lugar
linhas[0] = re.sub(r"width: '390px', height: '(\d+px)', ", r"width: '100%', minHeight: '\1', ", linhas[0])
linhas[0] = re.sub(r"(width: '1440px', )height: '(\d+px)', ", r"\1minHeight: '\2', ", linhas[0])
jsx = "\n".join(linhas)
imports = []
sys.path.insert(0, "scripts")
from menu_dz import troca
jsx, m = troca(jsx)
if m:
    imports.append('import MenuBotao from "./Menu";')
if "/_blob/" in jsx:
    jsx = re.sub(r'src="/_blob/[0-9a-f]+"', 'src={assetPath("/brand/elphy-nota.webp")}', jsx)
    imports.append('import { assetPath } from "@/lib/site";')
if "<Fragment" in jsx:
    imports.insert(0, 'import { Fragment } from "react";')
jsx = re.sub(r"\n(\s*)<img ", lambda m: f"\n{m.group(1)}{{/* eslint-disable-next-line @next/next/no-img-element -- a máscara e o recorte do desenho precisam do img puro */}}\n{m.group(1)}<img ", jsx)
corpo = "\n".join("    " + l for l in jsx.splitlines())
topo = '"use client";\n\n' if cliente else ""
open(destino, "w", encoding="utf-8").write(f'''{topo}{chr(10).join(imports)}

/* Transcrito de docs/design-1.0/{prancheta}.dc.html */
export default function {nome}() {{
  return (
{corpo}
  );
}}
''')
from link_dz import converte
_texto = converte(open(destino, encoding="utf-8").read())[0]
open(destino, "w", encoding="utf-8").write(_texto)
print(destino, "| menu" if m else "")
