"use client";

import Link from "next/link";

import { useCategories } from "./hooks/useCategories";

export const CategoryLinks = () => {
  const categories = useCategories();

  return (
    <div className="flex flex-col w-full pb-[25px] sm:gap-4 gap-2">
      {categories.data?.map(({ name, slug }) => (
        <Link
          key={slug}
          href={`/category/${slug}`}
          className="w-full text-base xl:text-xs p-[4rem] xl:p-[0.25rem] hover:bg-secondary"
          prefetch={true} // prefetch when hover
        >
          {name}
        </Link>
      ))}
    </div>
  );
};
