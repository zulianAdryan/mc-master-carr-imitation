"use client";

import Image from "next/image";
import { useState } from "react";
import {
  MinusIcon,
  PlusIcon,
  SendHorizontalIcon,
  StarIcon,
  TrendingDownIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

import type { Product } from "@/features/products/types";
import { formatterCurrency, formatterDate } from "@/lib/helper";
import { cn } from "@/lib/utils";

export default function ProductPage({ product }: { product: Product }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  const isStockAvailable =
    product?.availabilityStatus?.toLowerCase() === "in stock" ? true : false;

  return (
    <article className="grid xs:grid-cols-3 2xl:grid-cols-[minmax(150px,_600px)_1fr_minmax(100px,_300px)] h-full overflow-y-auto hide-scrollbar lg:p-[2dvh_1.25dvw] 2xl:p-[3dvh_0.25dvw] gap-3">
      <section className="flex flex-col">
        <div className="flex flex-col-reverse 2xl:flex-row justify-start items-start h-full gap-2">
          <div className="flex flex-row 2xl:flex-col max-w-full min-w-fit 2xl:max-h-full w-[110px] overflow-auto gap-2">
            {product?.images?.map((src, i) => (
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
            ))}
          </div>
          <div className="relative border rounded-lg w-full h-[50dvh] 2xl:w-[500px] 2xl:h-full">
            <Image
              src={product?.images[selectedImageIndex]}
              alt={product?.title}
              sizes="(min-width: 1536px) 500px, 100vw"
              fill
              className="object-contain select-none p-[20px]"
              draggable={false}
              priority
            />
          </div>
        </div>
      </section>

      <section className="border rounded-lg p-[1rem_1.5rem]">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="flex flex-col items-start justify-start gap-1">
            <h1 className="text-xl lg:text-2xl font-semibold text-left">
              {product?.title}
            </h1>
            <div className="flex justify-start items-center gap-x-1 lg:gap-x-2">
              <StarIcon className="size-[16px] lg:size-[20px] text-amber-300/80 fill-amber-300" />
              <Label className="text-sm">{product?.rating || 0}</Label>
            </div>
          </div>
          <div className="flex flex-col justify-end items-end">
            <Label className="text-xl md:text-3xl font-bold">
              {formatterCurrency(product?.price)}
            </Label>
            <div
              className={cn("inline-flex gap-x-1 items-center text-amber-500", {
                invisible: product?.discountPercentage <= 0,
              })}
            >
              <TrendingDownIcon className="size-[16px] lg:size-[18px]" />
              <p className="text-sm">{product?.discountPercentage}%</p>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex flex-col">
          <h2 className="font-semibold text-base lg:text-lg">
            About this item
          </h2>
          <p className="text-sm text-muted-foreground text-pretty">
            {product?.description}
          </p>
        </div>
        <div className="grid grid-cols-[1fr_minmax(50px,_100px)] 2xl:grid-cols-[1fr_minmax(80px,_150px)] gap-2 mt-4">
          <div className="grid grid-cols-[minmax(80px,_130px)_1fr] 2xl:grid-cols-[minmax(110px,_120px)_1fr] mt-4 gap-1.5 text-sm lg:text-base">
            <p className="font-semibold">Brand</p>
            <p className="">{product?.brand || "N/A"}</p>
            <p className="font-semibold">Width</p>
            <p className="">{product?.dimensions?.width || 0}cm</p>
            <p className="font-semibold">Height</p>
            <p className="">{product?.dimensions?.height || 0}cm</p>
            <p className="font-semibold">Depth</p>
            <p className="">{product?.dimensions?.depth || 0}cm</p>
            <p className="font-semibold">Warranty</p>
            <p className="">{product?.warrantyInformation || "-"}</p>
            <p className="font-semibold">Ad Created At</p>
            <p className="">{formatterDate(product?.meta?.createdAt) || "-"}</p>
          </div>

          <div className="relative size-full 2xl:size-[120px] m-auto">
            <Image
              alt="qr-code"
              src={product?.meta?.qrCode}
              sizes="120px"
              quality={90}
              fill
              className="object-contain"
            />
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex flex-col justify-start items-start w-full">
          <h2 className="text-lg font-semibold mb-2.5">Reviews</h2>
          <div className="bg-secondary rounded-xl p-2 w-full">
            <ScrollArea className="w-full h-[300px]" isVisuallyHidden>
              <div className="flex flex-col gap-y-4">
                {product?.reviews?.map(
                  ({ comment, rating, date, reviewerName }, i) => (
                    <div
                      key={i}
                      className="flex flex-col border rounded-lg py-2.5 px-3 shadow-sm bg-white"
                    >
                      <div className="flex justify-between items-center">
                        <p className="font-semibold text-base">
                          {reviewerName}
                        </p>
                        <div className="flex justify-end items-center gap-x-1.5">
                          <StarIcon className="size-[15px] text-amber-300/80 fill-amber-300" />
                          <Label className="text-sm">{rating || 0}</Label>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-xs">
                        Reviewed on {formatterDate(date)}
                      </p>
                      <div className="inline-flex gap-x-2 items-center">
                        <SendHorizontalIcon className="size-[18px] text-muted-foreground" />
                        <p className="text-base 2xl:text-lg my-1.5 lg:my-3.5">
                          {comment}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </section>

      <section className="border rounded-lg p-4 flex flex-col gap-y-4 h-fit">
        <div>
          <p
            className={cn("text-lg font-semibold", {
              "text-green-600": isStockAvailable,
              "text-destructive": !isStockAvailable,
            })}
          >
            {product?.availabilityStatus}
          </p>
          <p className="text-sm">{product?.shippingInformation}</p>
          <p className="text-sm">{product?.returnPolicy}</p>
        </div>
        <div className="grid grid-cols-[120px_1fr] text-sm">
          <p className="font-semibold">Minimum Order</p>
          <p className="text-end">{product?.minimumOrderQuantity}</p>
          <p className="font-semibold">Current Stock</p>
          <p className="text-end">{product?.stock}</p>
        </div>

        <div className="flex flex-col justify-center gap-y-2">
          <div className="grid grid-cols-[50px_1fr_50px] gap-2">
            <Button
              variant={"outline"}
              size={"sm"}
              disabled={!isStockAvailable || orderCount === 0}
              onClick={() => {
                setOrderCount((curr) => (curr > 0 ? curr - 1 : curr));
              }}
            >
              <MinusIcon />
            </Button>
            <div className="">
              <p className={cn("text-center font-semibold")}>{orderCount}</p>
            </div>
            <Button
              variant={"outline"}
              size={"sm"}
              disabled={!isStockAvailable || orderCount >= product?.stock}
              onClick={() => {
                setOrderCount((curr) =>
                  curr >= product?.stock ? curr : curr + 1
                );
              }}
            >
              <PlusIcon />
            </Button>
          </div>
          <Label
            className={cn(
              "hidden text-center text-muted-foreground text-xs p-0",
              {
                block: orderCount < product?.minimumOrderQuantity,
              }
            )}
          >
            Please meet the minimum order
          </Label>
        </div>

        <Button
          className="w-full rounded-full"
          type="button"
          variant={
            !isStockAvailable || orderCount < product?.minimumOrderQuantity
              ? "outline"
              : "default"
          }
          disabled={
            !isStockAvailable || orderCount < product?.minimumOrderQuantity
          }
        >
          Add to Cart
        </Button>
      </section>
    </article>
  );
}
