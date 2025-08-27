"use client";

import Link from "next/link";

import { useCategories } from "./hooks/useCategories";

export const CategoryLinks = () => {
  const categories = useCategories();

  return (
    <div
      className="gap-2 sm:gap-4"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        paddingBottom: "25px",
      }}
    >
      {categories.data?.map(({ name, slug }) => (
        <Link
          key={slug}
          href={`/category/${slug}`}
          className="text-base xl:text-xs hover:bg-secondary"
          style={{
            width: "100%",
            padding: "0.25rem",
          }}
          prefetch={true} // prefetch when hover
        >
          {name}
        </Link>
      ))}
    </div>
  );
};
