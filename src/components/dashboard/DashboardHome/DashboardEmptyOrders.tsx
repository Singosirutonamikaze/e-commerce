import Link from "next/link";
import { Package, ArrowRight } from "lucide-react";
import { ROUTES } from "@/lib/utils/constants/routes";
import { Button } from "@/components/ui/Button";

/**
 * The `DashboardEmptyOrders` component displays a message indicating that the user has no current orders. It provides a link to explore the catalog for potential purchases.
 *
 * @returns The `DashboardEmptyOrders` component.
 * @author SINGO Yao Dieu Donné
 * @since 2026-09-10
 */

export function DashboardEmptyOrders() {
  return (
    <div className="rounded-sm border border-slate-800/80 bg-slate-950/60 backdrop-blur-md p-8 text-center sm:p-12 flex flex-col items-center justify-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-sm bg-slate-900 border border-slate-800 text-slate-400">
        <Package className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-white">
        Aucune commande en cours
      </h3>
      <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-sm">
        Votre historique d&apos;achats est vide. Explorez notre catalogue pour
        trouver vos prochaines pièces.
      </p>
      <div className="mt-6">
        <Link href={ROUTES.DASHBOARD.SHOP}>
          <Button
            size="sm"
            className="rounded-sm h-9 px-5 bg-white text-slate-950 hover:bg-slate-200 text-xs font-semibold"
          >
            Explorer le catalogue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
