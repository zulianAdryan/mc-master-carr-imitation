import Image from "next/image";

import type { CategoryProducts } from "@/features/category/types";

export const ProductItemCard = (
  props: CategoryProducts & {
    loading?: "eager" | "lazy" | undefined;
    priority?: boolean;
    fetchPriority?: "auto" | "high" | "low" | undefined;
  }
) => {
  return (
    <div
      className="border shadow-sm"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        padding: "0.5rem",
      }}
    >
      <div
        className="size-[80px] sm:size-[100px] md:size-[150px]"
        style={{
          position: "relative",
          minWidth: "80px",
          minHeight: "80px",
        }}
      >
        <Image
          src={props.thumbnail}
          alt={`${props.title} picture`}
          fill
          sizes="(min-width: 768px) 150px, (min-width: 640px) 100px, 80px"
          style={{
            objectFit: "contain",
            userSelect: "none",
          }}
          draggable={false}
          loading={props.loading}
          fetchPriority={props.fetchPriority}
          quality={75}
        />
      </div>
      <p
        className="text-secondary-foreground"
        style={{
          fontWeight: 400,
          textAlign: "center",
          fontSize: "0.875rem",
        }}
      >
        {props.title}
      </p>
    </div>
  );
};
