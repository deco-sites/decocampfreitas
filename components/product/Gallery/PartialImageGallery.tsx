import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";

export interface Props {
  /**
   * @title Título
   */
  title: string;
  /**
   * @minItems 3
   * @title Lista de imagens
   * @description Cadastre, pelo menos, 3 imagens
   */
  listImages: ImageWidget[];
  /**
   * @ignore
   */
  renderQuant: number;
}

function PartialImageGallery(
  { title, listImages, renderQuant: renderQuant = 3 }: Props,
) {
  if (!listImages || listImages?.length < 3) return null;

  return (
    <div class="w-full max-w-5xl px-4 mx-auto pt-8 lg:pt-10 pb-28 flex flex-col items-center gap-6 relative">
      <h2 class="text-2xl font-light leading-8 lg:leading-10 text-base-content lg:text-4xl text-center">
        {title}
      </h2>

      <div class="flex flex-wrap gap-2 md:gap-4 justify-center">
        {listImages.slice(0, renderQuant).map((image) => {
          return (
            <div class="w-40 md:w-72 h-24 max-h-24 md:h-48 md:max-h-48 flex justify-center items-center overflow-hidden rounded md:rounded-xl duration-300 hover:scale-110">
              <Image
                width={304}
                height={200}
                sizes="(max-width: 304px) 100vw, 30vw"
                src={image}
                alt={image}
                decoding="async"
                loading="lazy"
              />
            </div>
          );
        })}
      </div>

      {renderQuant < listImages?.length && (
        <div class="max-w-48 w-48 absolute bottom-10 left-1/2 -translate-x-2/4">
          <button
            class="btn btn-block"
            {...usePartialSection({
              mode: "replace",
              props: { listImages, renderQuant: renderQuant + 1 },
            })}
          >
            Ver mais
          </button>
        </div>
      )}
    </div>
  );
}

export default PartialImageGallery;
