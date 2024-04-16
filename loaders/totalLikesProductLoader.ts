import { AppContext } from "deco-sites/decocampfreitas/apps/site.ts";

export interface totalLikesProductLoaderProps {
  productID: string;
}

export default async function totalLikesProductLoader(
  props: totalLikesProductLoaderProps,
  _req: Request,
  ctx: AppContext,
) {
  const response = await fetch(
    `https://camp-api.deco.cx/event/${props.productID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": String(ctx.secretLikes.get()),
      },
    },
  );

  return response.json();
}
