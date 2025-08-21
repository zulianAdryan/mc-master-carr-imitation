import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductItemCard } from "@/components/product-item-card";

import type { Category, CategoryProducts } from "@/features/category/types";
import { config } from "@/lib/config";

type ResponseType = {
  total: number;
  skip: number;
  limit: number;
  products: CategoryProducts[];
};

export async function generateStaticParams() {
  const res = await fetch(`${config.BASE_URL}/products/categories`);
  const categories: Category[] = await res.json();

  return categories.map(({ slug }) => ({ slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = await fetch(`${config.BASE_URL}/products/category/${slug}`, {
    next: {
      revalidate: 600, // every 10 minutes
    },
  });

  if (!res.ok) return notFound();

  const data: ResponseType = await res.json();
  const products = data.products;

  const title = slug.split("-").join(" ");

  return (
    <div className="h-full overflow-auto flex flex-col gap-4">
      <h1 className="text-base md:text-xl font-semibold capitalize">{title}</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 w-full gap-4">
        {products?.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <ProductItemCard {...product} />
          </Link>
        ))}
      </div>
    </div>
  );
}
