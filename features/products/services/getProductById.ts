import type { Product } from "../types";
import { config } from "@/lib/config";

export const getProductById = async (
  id: Product["id"]
): Promise<Product | null> => {
  const res = await fetch(`${config.BASE_URL}/products/${id}`, {
    cache: "no-store", // SSR
  });
  const product: Product = await res.json();

  return product ?? null;
};
