"use client";

import Link from "next/link";
import { useMemo } from "react";
import { VirtuosoGrid } from "react-virtuoso";

import { ProductItemCard } from "@/components/product-item-card";
import { Label } from "@/components/ui/label";

import { useInfiniteProducts } from "./hooks/useInfiniteProducts";

const MIN_IMAGE_TO_EAGER_LOADING = 32; // because the maximum items from the grid of the largest screen on first render is 32 items

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
      itemContent={(i, product) => (
        <Link key={product.id} href={`/product/${product.id}`}>
          <ProductItemCard
            {...product}
            loading={i <= MIN_IMAGE_TO_EAGER_LOADING ? "eager" : "lazy"}
            fetchPriority={i <= MIN_IMAGE_TO_EAGER_LOADING ? "high" : "auto"}
          />
        </Link>
      )}
    />
  );
};
