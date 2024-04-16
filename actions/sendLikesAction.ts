import { AppContext } from "deco-sites/decocampfreitas/apps/site.ts";

export interface sendLikesActionProps {
  productID: string;
}

export default async function sendLikesAction(
  props: sendLikesActionProps,
  _req: Request,
  ctx: AppContext,
) {
  const data = { productId: props.productID };

  const response = await fetch("https://camp-api.deco.cx/event", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": String(ctx.secretLikes.get()),
    },
    body: JSON.stringify(data),
  });

  return response.json();
}
