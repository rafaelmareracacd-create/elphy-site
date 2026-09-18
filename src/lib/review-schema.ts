import type { Review } from "./content";
import { absoluteUrl } from "./site";
export function reviewSchema(review: Review, categoryName: string) {
  const url = absoluteUrl(`/${review.categoria}/${review.slug}/`);
  const author = { "@type": "Person", name: review.autor.nome, jobTitle: review.autor.papel };
  const product = review.produto;
  return { "@context": "https://schema.org", "@graph": [
    { "@type": "Article", "@id": `${url}#article`, headline: review.titulo, description: review.veredito.frase, author, datePublished: review.publicadoEm, dateModified: review.atualizadoEm, image: absoluteUrl(product.imagem), mainEntityOfPage: url, about: { "@id": `${url}#product` } },
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: categoryName, item: absoluteUrl(`/${review.categoria}/`) },
      { "@type": "ListItem", position: 3, name: review.titulo, item: url },
    ] },
    { "@type": "Product", "@id": `${url}#product`, name: product.nome, description: product.variante, image: absoluteUrl(product.imagem), review: { "@id": `${url}#review` },
      ...(typeof product.precoObservado === "number" && /^\d{4}-\d{2}-\d{2}$/.test(product.precoData) ? { offers: { "@type": "Offer", price: product.precoObservado, priceCurrency: "BRL", url: product.link, seller: { "@type": "Organization", name: product.loja }, priceSpecification: { "@type": "PriceSpecification", price: product.precoObservado, priceCurrency: "BRL", validFrom: product.precoData }, description: `Preço observado em ${product.precoData}; pode mudar.` } } : {}),
    },
    { "@type": "Review", "@id": `${url}#review`, author, datePublished: review.publicadoEm, dateModified: review.atualizadoEm, name: review.titulo, reviewBody: `${review.veredito.resposta}. ${review.veredito.frase}`, itemReviewed: { "@id": `${url}#product` } },
    { "@type": "FAQPage", mainEntity: review.faq.map(({ pergunta, resposta }) => ({ "@type": "Question", name: pergunta, acceptedAnswer: { "@type": "Answer", text: resposta } })) },
  ] };
}
