# 🏁Imitate The Fastest Website In The World

If you've ever searched for or come across discussions about website performance, [McMaster-Carr](https://www.mcmaster.com/) is almost always referred to as the fastest website in the world. Since the site is genuinely that fast, I wanted to recreate it using the latest modern technologies available as of 2025, with Next.js as the foundation.

The goal of this project is to closely mimic its simplicity, speed, and efficiency — not to focus on animations, aesthetics, or other visual enhancements.

Test are using [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview) from Chrome browser.

## ⚠️ Disclaimer

Please note that Lighthouse scores and performance results may vary depending on your:

- Device performance (CPU, RAM, etc.)
- Network connection (Wi-Fi, 4G, etc.)
- Background activity (apps, browser tabs, etc.)

> For the most accurate results, I highly recommend testing the site in an Incognito window with no browser extensions enabled.
> Some browser extensions can significantly affect Lighthouse metrics by injecting scripts or delaying page load.

## Tech Stack

- [Next JS](https://nextjs.org/docs) (app router)
- [TailwindCSS](https://tailwindcss.com/)
- [Shadcn](https://ui.shadcn.com/)
- [Tanstack Query](https://tanstack.com/query/latest/docs/framework/react/overview)
- [React Virtuoso](https://virtuoso.dev/)

## API Reference

This project use open source dummy API from [dummyjson](hhttps://dummyjson.com/) as the server mock feeding the content for client to see

## Demo

McMaster-Carr imitation web [demo link](https://mc-master-carr-imitation.vercel.app/)🌐

## Features

- Virtualization of showcase all products
- Responsive layout
- Data caching and validation

# How This McMaster-Carr Imitation Website Works

We are going to see on some interesting things on how the McMaster-Carr original
website works and try to implement that in Next JS wheter using the same way or another way. There is some point on how website can run fast other than obvious things like internet connection and device/engine specifications, which are:

## 1. Website Type – SPA vs. Traditional

When navigating the McMaster-Carr site, you’ll notice there’s no full-page reload. That’s because it uses a Single Page Application (SPA) model, where routing is handled client-side via JavaScript. Frameworks like React and Vue make this possible.

However, Next.js is not a pure SPA. It supports both client-side and server-side rendering, enabling better SEO while maintaining a fast user experience.

> In this imitation project, we use Next.js App Router, combining Server Components and Client Components to mimic McMaster-Carr's speed and interactivity.

## 2. Server-Side Rendering (SSR)

SSR renders HTML on the server before sending it to the client. In Next.js, this is ideal for pages that don’t need immediate interactivity (i.e., no event listeners or hooks).

Example:

```ts
// Server Component
export default async function ProductLayoutPage({ params }: PageParams) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) return notFound();

  return <ProductPage product={product} />;
}
```

Here, the server fetches product data, then passes it as props to a Client Component (ProductPage) for rendering and user interaction.

> Server Component can have Client Component as its children, but Client Component cannot have Server Componentn as its children

## 3. Client Side Rendering (CSR)

CSR renders the UI directly in the browser and allows full access to the DOM, making it suitable for interactive pages.

In Next.js, you enable CSR by adding "use client" at the top of your component file. You’ll often use React hooks (useEffect, useState, etc.) here, especially when fetching data dynamically.

In this example I'am using CSR in mainly every page since it has a mandatory user interaction mainly clicking.

## 4. Data Caching

Efficient data fetching and caching are key to performance, especially if its a heavy data. If its a data that changes rapidly then it is better to changes frequently, but for data that are not changes often we can use the same data that already fetched.

### - SSR Caching (with revalidate)

Next.js lets you cache server-rendered data using the `revalidate` option:

```ts
// getProductById.ts
export const getProductById = cache(
  async (id: Product["id"]): Promise<Product | null> => {
    const res = await fetch(`${config.BASE_URL}/products/${id}`, {
      next: {
        revalidate: 600, // 10 minutes
      },
    });
    const product: Product = await res.json();

    return product ?? null;
  }
);
```

This caches product data for 10 minutes. You can fine-tune revalidation per API (e.g., product details: 1 hour; stock/price: 1–5 minutes).

Advanced way on how the big e-commerce website works are make the product detail page have a bunch of different API, so like for the product detail endpoints we can set it for 1 hour, but for the price and stock endpoints we can set it much faster maybe like 1 to 5 minutes.

### - CSR Caching (with TanStack Query)

For client-side caching, I use TanStack Query (React Query)

```ts
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
```

Here, category data is considered fresh for 24 hours. This avoids redundant API calls for rarely updated content.

## 5. SEO (Search Engine Optimization)

A well-optimized website should be both accessible to users and readable by search engines.

✅ Semantic HTML

Use semantic tags like <main>, <section>, <article>, <aside>, etc. Also use aria-label, title, and role attributes where appropriate for accessibility.

✅ Metadata

Next.js makes it easy to add both static and dynamic metadata for SEO:

```ts
// Export the static metadata
export const metadata: Metadata = {
  title: "All products",
  description: "all product from each of categories",
};

// Generate a dynamic metadata
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
```

Metadata improves how search engines understand and index each page.

## 6. Image Optimization

Images are crucial for UX but can hurt performance if unoptimized.

✅ Use WebP Format

WebP is preferred over jpg, jpeg, or png due to better compression and quality. With Next.js, you don’t need to manually convert formats. Just use the built-in Image component:

```ts
{
  product?.images?.map((src, i) => (
    <Button
      key={i}
      variant={"ghost"}
      className="relative border w-[80px] h-[60px] 2xl:w-[90px] 2xl:h-[90px]"
      onClick={() => {
        setSelectedImageIndex(i);
      }}
    >
      <Image
        src={src}
        alt={`${product?.title}-${i}`}
        fill
        sizes="(min-width: 1536px) 110px, 90px"
        className="object-contain select-none p-[4px] 2xl:p-[8px]"
        draggable={false}
        quality={10}
      />
    </Button>
  ));
}
```

This component:

- Automatically serves optimized formats (like WebP),
- Handles lazy loading,
- Adjusts sizes based on viewport.

## 7. Virtualization for Performance

Infinite scrolling large datasets without lag? That’s thanks to virtualization — rendering only what's visible in the viewport.

In this example I'm using `react-virtuoso` open source library for virtualization. Tanstack is also published a library for virtualization but I see it still new and I just already used to using `react-virtuoso` so maybe if you want, you can see their documentation on [Tanstack Virtual](https://tanstack.com/virtual/latest/docs/introduction)

```tsx
// This is the component that implements virtualization
export const InfiniteProductList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteProducts();

  const products = useMemo(
    () => data?.pages.flatMap((page) => page.products) ?? [],
    [data?.pages]
  );

  return (
    <VirtuosoGrid
      data={products}
      endReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      className="hide-scrollbar"
      listClassName="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4"
      itemClassName=""
      increaseViewportBy={{
        bottom: 1000,
        top: 1000,
      }}
      components={{
        Footer: () =>
          isFetchingNextPage ? (
            <Label className="p-4 text-center text-muted-foreground text-sm">
              Loading more...
            </Label>
          ) : null,
      }}
      itemContent={(_, product) => (
        <Link key={product.id} href={`/product/${product.id}`}>
          <ProductItemCard {...product} />
        </Link>
      )}
    />
  );
};
```

I also use the hooks infinite query from Tanstack Query for fetching the data as we scroll the page

```ts
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
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60, // 1 hour
    placeholderData: {
      pages: [],
      pageParams: [0],
    },
    initialPageParam: 0,
    retry: 0,
  });
};
```

This setup loads new data only when needed and keeps recently viewed data cached for smoother navigation.

# Summary

This project imitates the McMaster-Carr website using Next.js, focusing on:

- Fast navigation via SPA behavior
- Balanced SSR/CSR for SEO and interactivity
- Smart caching (SSR and CSR)
- Metadata and accessibility for SEO
- Optimized images
- Virtualized, infinite-scrolling UI
