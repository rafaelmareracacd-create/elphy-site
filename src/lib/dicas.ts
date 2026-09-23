/**
 * As dicas da prancheta Dicas-Lista (docs/design-1.0). Só a da RTX 5070 tem texto (Dica-Mobile);
 * as outras levam para a ferramenta que faz a conta, até o texto existir.
 */
export type DicaLista = { slug: string; dep: string; ferr: string; t: string; m: string; cor: string; href: string };

const ARTIGOS = new Set(["rtx-5070-250w"]);

const d = (slug: string, dep: string, ferr: string, t: string, m: string, cor: string, ferramenta: string): DicaLista =>
  ({ slug, dep, ferr, t, m, cor, href: ARTIGOS.has(slug) ? `/dicas/${slug}/` : ferramenta });

export const DICAS: DicaLista[] = [
  d("rtx-5070-250w", "PC", "Fonte", "A RTX 5070 puxa 250 W. A caixa não conta o resto.", "550 W", "#9dff3b", "/ferramentas/fonte/"),
  d("folga-30", "PC", "Fonte", "A conta da fonte arredonda para cima. O pico da placa explica.", "×1,3", "#ffb020", "/ferramentas/fonte/"),
  d("selo-80-plus", "PC", "Fonte", "O selo 80 Plus mede eficiência. Proteção fica de fora.", "80+", "#9dff3b", "/ferramentas/fonte/"),
  d("power-bank-20000", "Celular", "Power bank", "O power bank de 20.000 mAh dá 2,5 cargas, não 4.", "2,5", "#9dff3b", "/ferramentas/power-bank/"),
  d("mah-da-caixa", "Celular", "Power bank", "O mAh da caixa conta a célula, não o que sai na USB.", "3,7 V", "#ffb020", "/ferramentas/power-bank/"),
  d("ssd-931-gb", "Tela e armazenamento", "SSD", "O SSD de 1 TB mostra 931 GB. Ninguém levou os 69.", "931", "#9dff3b", "/ferramentas/ssd/"),
  d("pc-conta-de-luz", "Casa", "Conta de luz", "O PC gamer cobra na conta de luz o que a loja não mostra.", "kWh", "#ffb020", "/ferramentas/conta-de-luz/"),
  d("monitor-27-full-hd", "Tela e armazenamento", "Monitor", "O monitor de 27\" Full HD mostra o pixel na distância da mesa.", "82 PPI", "#9dff3b", "/ferramentas/monitor/?pol=27&res=fhd"),
  d("placa-no-gabinete", "PC", "Gabinete", "A placa passa na ficha do gabinete e trava na ventoinha.", "mm", "#ffb020", "/ferramentas/gabinete/"),
  d("ryzen-5000-ddr4", "PC", "Memória", "O Ryzen 5000 só aceita DDR4. A DDR5 nem encaixa.", "DDR4", "#9dff3b", "/ferramentas/memoria/?plat=r5000"),
];

export const DEPS = ["Todas", "PC", "Celular", "Tela e armazenamento", "Casa"];

/** link de uma dica pelo slug (artigo, se existir; senão a ferramenta) */
export const linkDica = (slug: string) => DICAS.find((x) => x.slug === slug)?.href ?? "/dicas/";
