import Link from "next/link";
import type { ComponentType } from "react";
import { Headset, Package, ShoppingBag, Store, UserCircle } from "lucide-react";
import { ROUTES } from "@/lib/utils/constants/routes";

type QuickLinkItem = {
  label: string;
  description: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
};

const quickLinks: QuickLinkItem[] = [
  {
    label: "Catalogue",
    description: "Parcourir les produits disponibles",
    href: ROUTES.DASHBOARD.CATALOGUE,
    icon: Package,
  },
  {
    label: "Shop",
    description: "Explorer les univers de categories",
    href: ROUTES.DASHBOARD.SHOP,
    icon: Store,
  },
  {
    label: "Commandes",
    description: "Suivre les achats et statuts",
    href: ROUTES.DASHBOARD.ORDERS,
    icon: ShoppingBag,
  },
  {
    label: "Profil",
    description: "Mettre a jour vos informations",
    href: ROUTES.DASHBOARD.PROFILE,
    icon: UserCircle,
  },
  {
    label: "Support",
    description: "Contacter le service client",
    href: ROUTES.DASHBOARD.SUPPORT,
    icon: Headset,
  },
];

export function DashboardQuickLinks() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-black">Accès rapide</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quickLinks.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-sm border border-neutral-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-black"
            >
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-sm bg-neutral-100 text-neutral-700 group-hover:bg-black group-hover:text-white">
                <Icon className="h-5 w-5" />
              </div>

              <h3 className="text-base font-semibold text-black">
                {item.label}
              </h3>
              <p className="mt-1 text-sm text-neutral-500">
                {item.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
