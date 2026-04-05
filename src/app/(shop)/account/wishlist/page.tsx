import { ProductCard } from '@/components/product/ProductCard/ProductCard';
import { Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { getWishlist } from '@/lib/actions/user.actions';
import { ROUTES } from '@/lib/utils/constants/routes';

export default async function WishlistPage() {
  const wishlistItems = await getWishlist();

  return (
    <div className="flex flex-col">
      <header className="mb-12">
        <h2 className="text-2xl font-black text-text-primary tracking-tighter uppercase mb-2">
          Ma Liste de Souhaits
        </h2>
        <p className="text-sm font-medium text-text-muted">
          Retrouvez tous vos articles favoris en un seul endroit.
        </p>
      </header>

      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlistItems.map((item) => (
            <ProductCard key={item.id} product={item.produit} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center bg-surface rounded-[40px] border-2 border-dashed border-border gap-6">
          <div className="h-24 w-24 bg-surface-alt rounded-full flex items-center justify-center text-text-hint relative">
            <Heart className="h-10 w-10 text-danger/30" />
            <div className="absolute top-0 right-0 h-6 w-6 bg-accent rounded-full border-4 border-surface"></div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-text-primary mb-2">Votre liste est vide</h3>
            <p className="text-text-muted text-sm max-w-sm mb-10 font-medium">
              Ajoutez des articles à votre liste de souhaits pour les retrouver plus tard
              ou pour surveiller les baisses de prix !
            </p>
            <Link href={ROUTES.PRODUCTS}>
              <Button size="lg" className="h-16 px-10 text-lg font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-accent/10 group">
                Parcourir la collection
                <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
