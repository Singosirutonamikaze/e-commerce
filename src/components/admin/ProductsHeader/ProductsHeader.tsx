import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/utils/constants/routes";

export function ProductsHeader() {
  return (
    <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">
            Gestion de Stock
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-black uppercase">
          Répertoire des Produits
        </h1>
      </div>
      <Link href={ROUTES.ADMIN.PRODUCT_NEW}>
        <Button
          size="lg"
          className="rounded-sm h-12 px-8 flex items-center gap-3 bg-black text-white hover:bg-neutral-800 transition-all"
        >
          <Plus className="h-4 w-4" />
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Nouveau Produit
          </span>
        </Button>
      </Link>
    </header>
  );
}
