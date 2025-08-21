import { useQuery } from "@tanstack/react-query";

import type { Category } from "../types";
import { config } from "@/lib/config";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(`${config.BASE_URL}/products/categories`);
      const categories: Category[] = await res.json();
      return categories;
    },
    staleTime: 3600 * 1000, // for each 1 hour data considered still fresh
    gcTime: 7200 * 1000, // for each 2 hour data in cache will always re-used
  });
};
