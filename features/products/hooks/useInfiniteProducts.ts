import { useInfiniteQuery } from "@tanstack/react-query";

import {
  getPaginatedProducts,
  type PaginatedProducts,
} from "../services/getPaginatedProducts";
import { PRODUCTS_QUERY_KEY } from "../constants";

const PAGE_SIZE = 10;

export const useInfiniteProducts = () => {
  return useInfiniteQuery<PaginatedProducts, Error>({
    queryKey: [`${PRODUCTS_QUERY_KEY.PRODUCTS}-infinite`],
    queryFn: ({ pageParam = 0 }) =>
      getPaginatedProducts({
        pageParam: pageParam as number,
        pageSize: PAGE_SIZE,
      }),
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + lastPage.limit;
      return nextSkip < lastPage.total ? nextSkip : undefined;
    },
    staleTime: 1000 * 60 * 10,
    placeholderData: {
      pages: [],
      pageParams: [0],
    },
    initialPageParam: 0,
    retry: 0,
  });
};
