import { InfiniteProductList } from "@/features/products/InfiniteProductList";

export default function Page() {
  return (
    <section className="h-full flex flex-col gap-y-4">
      <h1 className="font-semibold text-lg xl:text-xl">All Products</h1>
      <InfiniteProductList />
    </section>
  );
}
