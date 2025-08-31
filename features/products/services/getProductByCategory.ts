import type { CategoryProducts } from "@/features/category/types";
import { config } from "@/lib/config";

type ResponseTypeGetProductByCategory = {
  total: number;
  skip: number;
  limit: number;
  products: CategoryProducts[];
};

export async function getProductsByCategory(
  slug: string,
  fetchOptions?: RequestInit
) {
  const res = await fetch(
    `${config.BASE_URL}/products/category/${slug}`,
    fetchOptions
  );
  if (!res.ok) return null;

  const data: ResponseTypeGetProductByCategory = await res.json();
  return data.products;
}
