import type { Category } from "../types";
import { config } from "@/lib/config";

export async function getCategories(fetchOptions?: RequestInit) {
  const res = await fetch(
    `${config.BASE_URL}/products/categories`,
    fetchOptions
  );
  const data: Category[] = await res.json();
  return data;
}
