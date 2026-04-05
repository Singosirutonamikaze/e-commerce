import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { ROUTES } from "@/lib/utils/constants/routes";

export function DashboardEmptyOrders() {
  return (
    <div className="rounded-sm border border-neutral-100 bg-neutral-50 p-8 text-center">
      <ShoppingBag className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
      <h3 className="text-lg font-bold text-black mb-2">
        Vous n&apos;avez pas encore passé de commande
      </h3>
      <p className="text-sm text-neutral-600 mb-6 max-w-md mx-auto">
        Découvrez nos collections exclusives et commencez votre expérience
        Velure dès maintenant.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href={ROUTES.DASHBOARD.CATALOGUE}
          className="inline-flex items-center justify-center px-6 py-3 bg-black text-white text-sm font-bold uppercase tracking-widest rounded-sm hover:bg-neutral-800 transition-all"
        >
          Parcourir le catalogue
        </Link>
        <Link
          href={ROUTES.DASHBOARD.SHOP}
          className="inline-flex items-center justify-center px-6 py-3 border border-neutral-200 text-black text-sm font-bold uppercase tracking-widest rounded-sm hover:border-black transition-all"
        >
          Explorer les univers
        </Link>
      </div>
    </div>
  );
}
