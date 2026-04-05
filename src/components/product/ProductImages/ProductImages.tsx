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
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
        {images.map((img: ProductImage, idx: number) => (
          <button
            key={img.id}
            type="button"
            title={`Voir l'image ${idx + 1}`}
            onClick={() => setActiveImage(img.url)}
            className={cn(
              "relative h-20 w-20 shrink-0 overflow-hidden rounded-sm border-2 transition-all p-1 bg-white",
              activeImage === img.url
                ? "border-accent shadow-md shadow-accent/10"
                : "border-border hover:border-text-hint",
            )}
          >
            <Image
              src={img.url}
              alt={`Miniature ${idx + 1}`}
              fill
              className="object-cover rounded-sm"
              sizes="80px"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative grow aspect-4/5 bg-surface-alt rounded-sm overflow-hidden border border-border shadow-sm">
        <Image
          src={activeImage}
          alt="Produit principal"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
