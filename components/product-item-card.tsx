import Image from "next/image";

import type { CategoryProducts } from "@/features/category/types";

export const ProductItemCard = (props: CategoryProducts) => {
  return (
    <div className="border shadow-sm flex flex-col p-2 justify-center items-center size-full">
      <div className="relative size-[200px] md:size-[150px]">
        <Image
          src={props.thumbnail}
          alt={`${props.title} picture`}
          fill
          sizes="(min-width: 768px) 150px, 200px"
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
