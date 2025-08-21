import { notFound } from "next/navigation";

import ProductPage from "./page";

import type { Product } from "@/features/products/types";
import { config } from "@/lib/config";

export default async function ProductLayout({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetch(`${config.BASE_URL}/products/${id}`, {
    next: {
      revalidate: 300, // every 5 minutes
    },
  });

  if (!res.ok) return notFound();

  const product: Product = await res.json();

  return <ProductPage product={product} />;
}
