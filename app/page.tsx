import type { Metadata } from "next";

import { InfiniteProductList } from "@/features/products/InfiniteProductList";

export const metadata: Metadata = {
  title: "All products",
  description: "all product from each of categories",
};

export default function Page() {
  return (
    <section className="h-full flex flex-col gap-y-4">
      <h1
        style={{
          fontSize: "1.25rem",
          fontWeight: 600,
        }}
      >
        All Products
      </h1>
      <InfiniteProductList />
    </section>
  );
}
