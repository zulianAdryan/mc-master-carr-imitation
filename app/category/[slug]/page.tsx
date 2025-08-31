import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductItemCard } from "@/components/product-item-card";

import { getCategories } from "@/features/category/services/getCategories";
import { getProductsByCategory } from "@/features/products/services/getProductByCategory";

type PageParams = {
  params: Promise<{ slug: string }>;
};

const capitalizedSlug = (slug: string): string => {
  const normalizedSlugArr = slug.split("-");

  const transform = (text: string) =>
    `${text[0].toUpperCase()}${text.slice(1)}`;

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
  const categories = await getCategories();

  return categories.map(({ slug }) => ({ slug }));
}

const MIN_IMAGE_TO_EAGER_LOADING = 32; // because the maximum items from the grid of the largest screen on first render is 32 items

export default async function CategoryPage({ params }: PageParams) {
  const { slug } = await params;
  const products = await getProductsByCategory(slug, {
    next: {
      revalidate: 600, // ISR
    },
  });

  if (!products) return notFound();

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
          gap: "0.75rem",
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
