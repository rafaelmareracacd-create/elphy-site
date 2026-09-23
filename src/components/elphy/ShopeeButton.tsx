const AVISO = "Link de afiliado: se você comprar, o Elphy pode ganhar comissão. O preço não muda, e quem mostra o preço é a Shopee.";

export default function ShopeeButton({ href, children }: { href?: string; children: string }) {
  return (
    <div className="el-shopee">
      {href ? (
        <a className="el-btn el-btn-fantasma" href={href} rel="sponsored noopener noreferrer">
          {children}
        </a>
      ) : (
        <button type="button" className="el-btn el-btn-fantasma" disabled>
          link em breve
        </button>
      )}
      <p>{AVISO}</p>
    </div>
  );
}
