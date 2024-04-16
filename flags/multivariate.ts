export { onBeforeResolveProps } from "apps/website/utils/multivariate.ts";
import type { ProductDetailsPage } from "apps/commerce/types.ts";
import multivariate, {
  MultivariateProps,
} from "apps/website/utils/multivariate.ts";
import { MultivariateFlag } from "deco/blocks/flag.ts";

export type ProductCardFlagProps = ProductDetailsPage | null;

export default function productCardFlag(
  props: MultivariateProps<ProductCardFlagProps>,
): MultivariateFlag<ProductCardFlagProps> {
  return multivariate(props);
}
