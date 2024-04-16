import { AddToCartParams } from "apps/commerce/types.ts";
import { useState } from "preact/hooks";
import Button from "$components/ui/Button.tsx";
import { sendEvent } from "$sdk/analytics.tsx";
import { useUI } from "$sdk/useUI.ts";
import { signal } from "@preact/signals-core";

export interface Props {
  /** @description: sku name */
  eventParams: AddToCartParams;
  onAddItem: () => Promise<void>;
}

const showToast = signal(false);

const useAddToCart = ({ eventParams, onAddItem }: Props) => {
  const [loading, setLoading] = useState(false);
  const { displayCart } = useUI();

  const onClick = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true);

      await onAddItem();

      sendEvent({
        name: "add_to_cart",
        params: eventParams,
      });

      displayCart.value = true;
      showToast.value = true;
      setTimeout(() => (showToast.value = false), 4000);
    } finally {
      setLoading(false);
    }
  };

  return { onClick, loading, "data-deco": "add-to-cart" };
};

export default function AddToCartButton(props: Props) {
  const btnProps = useAddToCart(props);

  return (
    <>
      <Button {...btnProps} class="btn-primary">
        Adicionar à Sacola
      </Button>

      {showToast.value && (
        <div class="fixed bottom-4 left-4 bg-primary rounded shadow-lg flex">
          <span class="py-3 px-5 text-base-content text-xs md:text-sm font-semibold z-10">
            Produto adicionado ao carrinho
          </span>
        </div>
      )}
    </>
  );
}
