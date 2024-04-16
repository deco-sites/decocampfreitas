import type { Product } from "apps/commerce/types.ts";
import { formatPrice } from "$sdk/format.ts";

export type SlimProduct = {
  productID: Product["productID"];
  imageURL?: string;
  name: string;
  description: Product["description"];
  highPrice?: number;
  lowPrice?: number;
  formatHighPrice?: string | null;
  formatLowPrice?: string | null;
  seller: string;
  url: string;
};

export const toSlimProducts = (products: Product[]) => {
  return products.map((product) => ({
    productID: product.productID,
    imageURL: product.image?.[0].url,
    name: product.name ?? "",
    description: product.description,
    formatHighPrice: formatPrice(
      product.offers?.highPrice,
      product.offers?.priceCurrency,
    ),
    formatLowPrice: formatPrice(
      product.offers?.lowPrice,
      product.offers?.priceCurrency,
    ),
    highPrice: product.offers?.highPrice,
    lowPrice: product.offers?.lowPrice,
    seller: product.offers?.offers[0].seller ?? "1",
    url: product.url ?? "",
  }));
};
