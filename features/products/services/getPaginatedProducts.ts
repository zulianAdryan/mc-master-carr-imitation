import type { Product } from "../types";
import { config } from "@/lib/config";

export type PaginatedProducts = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export const getPaginatedProducts = async ({
  pageParam = 0,
  pageSize = 10,
}: {
  pageParam: number;
  pageSize?: number;
}): Promise<PaginatedProducts> => {
  const req = await fetch(
    `${config.BASE_URL}/products?limit=${pageSize}&skip=${pageParam}`
  );
  const res: PaginatedProducts = await req.json();

  return res;
};
