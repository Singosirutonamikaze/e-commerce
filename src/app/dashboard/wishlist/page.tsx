import { ProductCard } from "@/components/product/ProductCard/ProductCard";
import { Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { getWishlist } from "@/lib/actions/user";
import { ROUTES } from "@/lib/utils/constants/routes";

export default async function WishlistPage() {
  const wishlistItems = await getWishlist();

  return (
    <div className="flex flex-col gap-6">
      <header className="border-b border-slate-800/80 pb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold text-slate-400">
            Favoris
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-serif text-white tracking-tight">
          Liste de souhaits
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Retrouvez les pièces et accessoires sélectionnés pour vos futurs achats.
        </p>
      </header>

      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <ProductCard key={item.id} product={item.produit} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-slate-950/60 backdrop-blur-md border border-slate-800/80 p-8 gap-5">
          <div className="h-14 w-14 bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
            <Heart className="h-7 w-7 opacity-50 text-rose-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">
              Votre liste de souhaits est vide
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm max-w-sm mb-6 leading-relaxed">
              Ajoutez des articles à vos favoris en cliquant sur l&apos;icône cœur pour les retrouver à tout moment.
            </p>
            <Link href={ROUTES.DASHBOARD.CATALOGUE}>
              <Button
                size="sm"
                className="h-9 px-6 text-xs font-semibold bg-white text-slate-950 hover:bg-slate-200"
              >
                Parcourir le catalogue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
