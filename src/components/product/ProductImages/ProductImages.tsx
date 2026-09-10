"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { ProductImage } from "@prisma/client";

interface ProductImagesProps {
  images: ProductImage[];
}

export function ProductImages({ images }: Readonly<ProductImagesProps>) {
  const [activeImage, setActiveImage] = useState(
    images[0]?.url || "/placeholder.png",
  );

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {images.length > 1 && (
        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
          {images.map((img: ProductImage, idx: number) => (
            <button
              key={img.id}
              type="button"
              title={`Image ${idx + 1}`}
              onClick={() => setActiveImage(img.url)}
              className={cn(
                "relative h-16 w-16 shrink-0 overflow-hidden border transition-all bg-slate-900",
                activeImage === img.url
                  ? "border-emerald-400"
                  : "border-slate-800 hover:border-slate-700",
              )}
            >
              <Image
                src={img.url}
                alt={`Miniature ${idx + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}

      <div className="relative grow aspect-4/5 bg-slate-900 overflow-hidden border border-slate-800/80">
        <Image
          src={activeImage}
          alt="Vue principale du produit"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
