import { cache } from "react";

import type { Product } from "../types";
import { config } from "@/lib/config";

export const getProductById = cache(
  async (id: Product["id"]): Promise<Product | null> => {
    const res = await fetch(`${config.BASE_URL}/products/${id}`, {
      next: {
        revalidate: 600, // every 10 minutes
      },
    });
    const product: Product = await res.json();

    return product ?? null;
  }
);
