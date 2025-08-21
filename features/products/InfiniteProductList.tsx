"use client";

import Link from "next/link";
import { useMemo } from "react";
import { VirtuosoGrid } from "react-virtuoso";

import { ProductItemCard } from "@/components/product-item-card";
import { Label } from "@/components/ui/label";

import { useInfiniteProducts } from "./hooks/useInfiniteProducts";

export const InfiniteProductList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteProducts();

  const products = useMemo(
    () => data?.pages.flatMap((page) => page.products) ?? [],
    [data?.pages]
  );

  return (
    <VirtuosoGrid
      data={products}
      endReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      className="hide-scrollbar"
      listClassName="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4"
      itemClassName=""
      increaseViewportBy={{
        bottom: 1000,
        top: 1000,
      }}
      components={{
        Footer: () =>
          isFetchingNextPage ? (
            <Label className="p-4 text-center text-muted-foreground text-sm">
              Loading more...
            </Label>
          ) : null,
      }}
      itemContent={(_, product) => (
        <Link key={product.id} href={`/product/${product.id}`}>
          <ProductItemCard {...product} />
        </Link>
      )}
    />
  );
};
