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

const MIN_IMAGE_TO_EAGER_LOADING = 32; // because the maximum items from the grid of the largest screen on first render is 32 items

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
      <h1
        style={{
          fontSize: "1.25rem",
          fontWeight: 600,
          textTransform: "capitalize",
        }}
      >
        {title}
      </h1>

      <div
        style={{
          display: "grid",
          width: "100%",
          gap: "1rem",
        }}
        className="grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 w-full"
      >
        {products?.map((product, i) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <ProductItemCard
              {...product}
              loading={i <= MIN_IMAGE_TO_EAGER_LOADING ? "eager" : "lazy"}
              fetchPriority={i <= MIN_IMAGE_TO_EAGER_LOADING ? "high" : "auto"}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
