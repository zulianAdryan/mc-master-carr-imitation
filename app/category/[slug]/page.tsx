import Link from "next/link";
import type { Metadata } from "next";
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

type PageParams = {
  params: Promise<{ slug: string }>;
};

const normalizedSlug = (slug: string): string[] => {
  return slug.split("-");
};

const capitalizedSlug = (slug: string): string => {
  const normalizedSlugArr = normalizedSlug(slug);

  const transform = (text: string) =>
    `${text[0].toUpperCase()}${text.slice(1)}`;

  // console.log({ splitted, transform: transform(slug) });

  if (normalizedSlugArr.length === 1) return transform(slug);

  return normalizedSlugArr.map((text) => transform(text)).join(" ");
};

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: capitalizedSlug(slug) ?? "Category not found",
    description: slug
      ? `Products of ${capitalizedSlug(slug)} category`
      : "The category you are looking for could not be found.",
  };
}

export async function generateStaticParams() {
  const res = await fetch(`${config.BASE_URL}/products/categories`);
  const categories: Category[] = await res.json();

  return categories.map(({ slug }) => ({ slug }));
}

export default async function CategoryPage({ params }: PageParams) {
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
