import { useQuery } from "@tanstack/react-query";

import type { Category } from "../types";
import { config } from "@/lib/config";
import { CATEGORY_QUERY_KEY } from "../constants";

export const useCategories = () => {
  return useQuery({
    queryKey: [CATEGORY_QUERY_KEY.CATEGORY],
    queryFn: async () => {
      const res = await fetch(`${config.BASE_URL}/products/categories`);
      const categories: Category[] = await res.json();
      return categories;
    },
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
};
