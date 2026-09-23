"""Converte o corpo de uma prancheta .dc.html (docs/design-1.0) em JSX literal.

Uso: python scripts/html2jsx.py docs/design-1.0/Home-Mobile.dc.html > saida.tsx.txt
Sai só o JSX do que está dentro de <x-dc>, sem o <helmet>. Os trechos {{ x }} viram {x},
sc-for vira .map e sc-if vira &&. O resto é conferido e ligado à mão.
"""
import sys, re, html
from html.parser import HTMLParser

sys.stdout.reconfigure(encoding="utf-8")

VAZIOS = {"img", "input", "br", "hr", "meta", "link", "source", "path", "rect", "circle", "line",
          "polyline", "polygon", "ellipse", "stop", "feturbulence", "fecolormatrix", "fegaussianblur", "use"}
TAGS = {"fecolormatrix": "feColorMatrix", "feturbulence": "feTurbulence", "fegaussianblur": "feGaussianBlur",
        "lineargradient": "linearGradient", "radialgradient": "radialGradient", "clippath": "clipPath",
        "textpath": "textPath", "foreignobject": "foreignObject", "feoffset": "feOffset", "feblend": "feBlend"}
ATTRS = {"class": "className", "for": "htmlFor", "tabindex": "tabIndex", "viewbox": "viewBox",
         "basefrequency": "baseFrequency", "numoctaves": "numOctaves", "stitchtiles": "stitchTiles",
         "preserveaspectratio": "preserveAspectRatio", "gradientunits": "gradientUnits",
         "stddeviation": "stdDeviation", "readonly": "readOnly", "maxlength": "maxLength",
         "autocomplete": "autoComplete", "inputmode": "inputMode", "onclick": "onClick", "oninput": "onInput",
         "onchange": "onChange", "onkeydown": "onKeyDown", "onsubmit": "onSubmit", "srcset": "srcSet",
         "colspan": "colSpan", "rowspan": "rowSpan", "enterkeyhint": "enterKeyHint", "spellcheck": "spellCheck",
         "xlink:href": "href", "crossorigin": "crossOrigin", "datetime": "dateTime", "novalidate": "noValidate"}
MUSTACHE = re.compile(r"\{\{\s*(.+?)\s*\}\}")


def camel(prop):
    prop = prop.strip()
    if prop.startswith("--"):
        return f"'{prop}'"
    if prop.startswith("-webkit-"):
        prop = "Webkit-" + prop[8:]
    elif prop.startswith("-moz-"):
        prop = "Moz-" + prop[5:]
    partes = prop.split("-")
    return partes[0] + "".join(p[:1].upper() + p[1:] for p in partes[1:])


def valor_js(v):
    """Texto de atributo com {{ }} vira template literal; sem, string simples."""
    if MUSTACHE.search(v):
        so = MUSTACHE.fullmatch(v.strip())
        if so:
            return so.group(1)
        return "`" + MUSTACHE.sub(lambda m: "${" + m.group(1) + "}", v.replace("`", "\\`")) + "`"
    return "'" + v.replace("\\", "\\\\").replace("'", "\\'") + "'"


def estilo(css):
    itens = []
    # separa por ; fora de parênteses
    atual, nivel = "", 0
    for ch in css:
        if ch == "(":
            nivel += 1
        elif ch == ")":
            nivel -= 1
        if ch == ";" and nivel == 0:
            itens.append(atual); atual = ""
        else:
            atual += ch
    itens.append(atual)
    pares = []
    for it in itens:
        if ":" not in it:
            continue
        k, v = it.split(":", 1)
        if not k.strip():
            continue
        pares.append(f"{camel(k)}: {valor_js(v.strip())}")
    return "{{ " + ", ".join(pares) + " }}"


def atributo(nome, v):
    nome_jsx = ATTRS.get(nome, nome)
    if nome.startswith("stroke-") or nome.startswith("fill-") or nome in ("clip-rule", "stop-color", "stop-opacity", "text-anchor", "font-family", "font-size", "font-weight", "dominant-baseline", "clip-path", "mix-blend-mode"):
        nome_jsx = camel(nome)
    if v is None:
        return nome_jsx
    if nome == "style":
        return "style=" + estilo(v)
    if nome_jsx.startswith("on"):
        m = MUSTACHE.fullmatch(v.strip())
        return f"{nome_jsx}={{{m.group(1) if m else v}}}"
    if MUSTACHE.search(v):
        return f"{nome_jsx}={{{valor_js(v)}}}"
    if nome in ("rows", "cols", "tabindex", "colspan", "rowspan", "maxlength", "minlength", "size", "span") and v.strip().lstrip("-").isdigit():
        return f"{nome_jsx}={{{v.strip()}}}"
    return f'{nome_jsx}="{html.escape(v, quote=True)}"' if '"' in v else f'{nome_jsx}="{v}"'


class Conv(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.out = []
        self.dentro = False
        self.helmet = 0
        self.pilha = []
        self.nivel = 0

    def w(self, s):
        self.out.append("  " * self.nivel + s)

    def handle_starttag(self, tag, attrs):
        if tag == "x-dc":
            self.dentro = True; return
        if not self.dentro:
            return
        if tag == "helmet":
            self.helmet += 1; return
        if self.helmet:
            return
        a = dict(attrs)
        if tag == "sc-for":
            lista = MUSTACHE.fullmatch(a["list"].strip()).group(1)
            self.w(f"{{{lista}.map(({a.get('as', 'item')}, i) => (")
            self.nivel += 1
            self.w("<Fragment key={i}>")
            self.nivel += 1
            self.pilha.append(tag); return
        if tag == "sc-if":
            v = MUSTACHE.fullmatch(a["value"].strip()).group(1)
            self.w(f"{{{v} && (")
            self.nivel += 1
            self.w("<>")
            self.nivel += 1
            self.pilha.append(tag); return
        nome = TAGS.get(tag, tag)
        partes = [atributo(k, v) for k, v in attrs if not k.startswith("hint-")]
        abre = "<" + nome + ("" if not partes else " " + " ".join(partes))
        if tag in VAZIOS:
            self.w(abre + " />")
        else:
            self.w(abre + ">")
            self.nivel += 1
            self.pilha.append(tag)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VAZIOS and self.dentro and not self.helmet and tag not in ("sc-for", "sc-if"):
            self.handle_endtag(tag)

    def handle_endtag(self, tag):
        if tag == "x-dc":
            self.dentro = False; return
        if not self.dentro:
            return
        if tag == "helmet":
            self.helmet -= 1; return
        if self.helmet or tag in VAZIOS:
            return
        if not self.pilha:
            return
        aberto = self.pilha.pop()
        self.nivel -= 1
        if aberto == "sc-for":
            self.w("</Fragment>"); self.nivel -= 1; self.w("))}"); return
        if aberto == "sc-if":
            self.w("</>"); self.nivel -= 1; self.w(")}"); return
        self.w(f"</{TAGS.get(aberto, aberto)}>")

    def handle_data(self, data):
        if not self.dentro or self.helmet:
            return
        t = data.strip()
        if not t:
            if data and "\n" not in data:
                self.w("{' '}")
            return
        partes = MUSTACHE.split(t)
        saida = []
        for i, p in enumerate(partes):
            if i % 2:
                saida.append("{" + p + "}")
            else:
                p = p.replace("{", "&#123;").replace("}", "&#125;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")
                saida.append(p)
        texto = "".join(saida)
        ws_ini = data[:len(data) - len(data.lstrip())]
        ws_fim = data[len(data.rstrip()):]
        if ws_ini and "\n" not in ws_ini:
            texto = "{' '}" + texto
        if ws_fim and "\n" not in ws_fim:
            texto = texto + "{' '}"
        self.w(texto)

    def handle_comment(self, data):
        if self.dentro and not self.helmet:
            self.w("{/* " + data.strip().replace("*/", "* /") + " */}")


ROTAS = {"Home-Mobile": "/", "Main": "/", "Ferramenta-Mobile": "/ferramentas/fonte/", "Fonte-Desktop": "/ferramentas/fonte/",
         "Ferramentas-Desktop": "/ferramentas/", "SSD-Mobile": "/ferramentas/ssd/", "PowerBank-Mobile": "/ferramentas/power-bank/",
         "Luz-Mobile": "/ferramentas/conta-de-luz/", "Monitor-Mobile": "/ferramentas/monitor/", "Gabinete-Mobile": "/ferramentas/gabinete/",
         "Memoria-Mobile": "/ferramentas/memoria/", "Montador-Mobile": "/montador/", "Montador": "/montador/",
         "Montagem-Link-Mobile": "/montador/", "Dica-Mobile": "/dicas/rtx-5070-250w/", "Dicas-Lista": "/dicas/",
         "Busca-Mobile": "/busca/", "Peca-Mobile": "/peca/rtx-5070/", "Metodologia-Mobile": "/metodologia/",
         "Correcoes-Mobile": "/correcoes/", "Sobre-Mobile": "/sobre/", "Legal-Mobile": "/legal/", "Menu-Mobile": "/",
         "Estados-Mobile": "/", "Comparar-Mobile": "/"}
FONTES = {"'\\'Big Shoulders Display\\', sans-serif'": "'var(--fd)'",
          "'\\'Martian Mono\\', monospace'": "'var(--fm)'",
          "'\\'Schibsted Grotesk\\', system-ui, sans-serif'": "'var(--fb)'",
          "'\\'Schibsted Grotesk\\', sans-serif'": "'var(--fb)'"}


def pos(t):
    t = re.sub(r'className="([^"]*)"', lambda m: 'className="' + ' '.join('dz-' + c[3:] if c.startswith('el-') else c for c in m.group(1).split()) + '"', t)
    for a, b in FONTES.items():
        t = t.replace(a, b)
    t = re.sub(r'href="([A-Za-z-]+)\.dc\.html(#[^"]*)?"',
               lambda m: f'href="{ROTAS.get(m.group(1), "/")}{m.group(2) or ""}"', t)
    return t


src = open(sys.argv[1], encoding="utf-8").read()
c = Conv()
c.feed(src)
print(pos("\n".join(c.out)))
