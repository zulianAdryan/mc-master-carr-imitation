import Image from "next/image";

import type { CategoryProducts } from "@/features/category/types";

export const ProductItemCard = (props: CategoryProducts) => {
  return (
    <div className="border shadow-sm flex flex-col p-2 justify-center items-center size-full">
      <div className="relative size-[20dvw] md:size-[100px]">
        <Image
          src={props.thumbnail}
          alt={props.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover select-none"
          draggable={false}
        />
      </div>
      <p className="font-normal text-center text-sm text-secondary-foreground">
        {props.title}
      </p>
    </div>
  );
};
