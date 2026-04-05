import Image from "next/image";
import Link from "next/link";
import { Edit3, Trash2, ExternalLink } from "lucide-react";
import { formatPrice } from "@/lib/utils/format";
import { ROUTES } from "@/lib/utils/constants/routes";
import { ProductWithImages } from "@/types";
import { StockBar } from "./StockBar";

interface ProductRowProps {
  product: ProductWithImages & { categorie: { nom: string } | null };
}

export function ProductRow({ product }: Readonly<ProductRowProps>) {
  // Déterminer le label de statut
  const statusLabel = product.estVisible ? "En Ligne" : "Masqué";
  const statusClass = product.estVisible
    ? "bg-neutral-50 border-neutral-200 text-black"
    : "bg-red-50 border-red-100 text-red-600";

  return (
    <tr className="hover:bg-neutral-50/50 transition-all group border-b border-neutral-100">
      {/* Identification */}
      <td className="px-8 py-6">
        <div className="flex items-center gap-5">
          <div className="relative h-16 w-12 rounded-sm overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0">
            <Image
              src={product.images[0]?.url || "/placeholder.png"}
              alt={product.nom}
              fill
              className="object-cover"
              sizes="60px"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-sm font-bold tracking-tight text-black uppercase">
              {product.nom}
            </h4>
            <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">
              {product.categorie?.nom || "NON CLASSÉ"}
            </span>
          </div>
        </div>
      </td>

      {/* Prix Unitaire */}
      <td className="px-8 py-6 text-center tabular-nums">
        <div className="flex flex-col items-center gap-1">
          <span className="text-sm font-bold text-black">
            {formatPrice(Number(product.prix))}
          </span>
          {product.ancienPrix && (
            <span className="text-[9px] text-neutral-400 line-through font-bold">
              {formatPrice(Number(product.ancienPrix))}
            </span>
          )}
        </div>
      </td>

      {/* Disponibilité */}
      <td className="px-8 py-6 text-center">
        <StockBar stock={product.stock} />
      </td>

      {/* Status Vente */}
      <td className="px-8 py-6 text-center">
        <span
          className={`inline-flex px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-sm border ${statusClass}`}
        >
          {statusLabel}
        </span>
      </td>

      {/* Opérations */}
      <td className="px-8 py-6 text-right">
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link href={`${ROUTES.ADMIN.ROOT}/products/${product.id}`}>
            <button
              className="p-2 hover:bg-neutral-100 rounded-sm transition-all"
              title="Éditer"
            >
              <Edit3 className="h-4 w-4 text-neutral-600" />
            </button>
          </Link>
          <button
            className="p-2 hover:bg-red-50 rounded-sm transition-all"
            title="Supprimer"
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </button>
          <Link href={ROUTES.PRODUCT_DETAIL(product.slug)} target="_blank">
            <button
              className="p-2 hover:bg-neutral-100 rounded-sm transition-all"
              title="Voir en ligne"
            >
              <ExternalLink className="h-4 w-4 text-neutral-600" />
            </button>
          </Link>
        </div>
      </td>
    </tr>
  );
}
