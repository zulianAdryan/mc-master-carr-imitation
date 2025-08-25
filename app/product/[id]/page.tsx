import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProductPage from "./product-page";

import type { Product } from "@/features/products/types";
import { getProductById } from "@/features/products/services/getProductById";

type PageParams = {
  params: Promise<{ id: Product["id"] }>;
};

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  return {
    title: product?.title ?? "Product not found",
    description:
      product?.description ??
      "The product you are looking for could not be found.",
  };
}

export default async function ProductLayoutPage({ params }: PageParams) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) return notFound();

  return <ProductPage product={product} />;
}
