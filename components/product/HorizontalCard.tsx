import Image from "apps/website/components/Image.tsx";
import AddToCartButtonVTEX from "../../islands/AddToCartButton/vtex.tsx";
import { Product, ProductDetailsPage } from "apps/commerce/types.ts";
import { formatPrice } from "$sdk/format.ts";
import { useOffer } from "$sdk/useOffer.ts";
import LikeButton from "$islands/LikeButton.tsx";

interface HorizontalProductCardProps {
  products: Product;
  animation: boolean;
}

export const HorizontalCard = ({
  products,
  animation,
}: HorizontalProductCardProps) => {
  const { productID, name, url, offers, isVariantOf, image: images } = products;

  const description = products.description || isVariantOf?.description;
  const { listPrice, price, seller } = useOffer(offers);

  const eventParams = {
    items: [{ item_url: url, quantity: 1, item_name: name! }],
  };

  const [image] = images ?? [];

  return (
    <div class="flex gap-2 sm:gap-4 md:gap-8 p-2 sm:p-4 md:p-6 rounded-xl bg-neutral-content relative">
      {image.url && (
        <div class="w-40 md:w-48 h-40 md:h-48 flex justify-center items-center overflow-hidden">
          <Image
            src={image.url}
            width={175}
            height={115}
            loading="lazy"
            alt={name}
            class={`duration-300 ${animation ? "hover:scale-110" : ""}`}
          />
        </div>
      )}
      <div class="ml-2 flex flex-col">
        <h2 class="line-clamp-2 md:line-clamp-3">{name}</h2>
        <p class="line-clamp-1 md:line-clamp-3">{description}</p>
        {listPrice && (
          <p class="text-red-500 line-through">
            De: {formatPrice(listPrice, offers?.priceCurrency)},
          </p>
        )}
        {price && (
          <p class="text-bold">
            Por: {formatPrice(price, offers?.priceCurrency)},
          </p>
        )}
        {price && (
          <AddToCartButtonVTEX
            eventParams={eventParams}
            productID={productID}
            seller={seller ?? "1"}
          />
        )}
        <LikeButton productID={productID} />
      </div>
    </div>
  );
};
