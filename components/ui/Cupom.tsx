export interface CupomProps {
  /**
   * @title Código do cupom
   * @description Adicione um código de cupom para compras de seus clientes
   */
  cupomCode: string;
  /**
   * @title Descrição do cupom
   * @description Descreva os beneficios deste cupom
   */
  cupomDescription: string;
}

export default function Cupom({
  cupomCode = "BEMVINDO10",
  cupomDescription = "CUPOM DE BOAS VINDAS",
}: CupomProps) {
  return (
    <div class="flex flex-col gap-2 pl-3 w-1/3 justify-center items-center m-auto">
      <p class="text-sm font-bold w-[150px] text-center p-2 border border-black hover:bg-black hover:text-white hover:boder-white duration-300">
        {cupomCode}
      </p>
      <p class="w-fit text-center">{cupomDescription}</p>
    </div>
  );
}
