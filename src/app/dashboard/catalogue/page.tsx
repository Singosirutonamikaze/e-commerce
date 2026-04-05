import { CatalogTable } from "@/components/dashboard/CatalogTable/CatalogTable";
import { getProducts } from "@/lib/actions/product.actions";

export default async function DashboardCataloguePage() {
  const products = await getProducts({});

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold tracking-[0.2em] text-neutral-400">
          Dashboard / Catalogue
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-black">
          Catalogue produits
        </h2>
        <p className="text-sm text-neutral-600">
          Tableau complet des produits disponibles. Cliquez sur une ligne pour
          voir les détails.
        </p>
      </div>

      <CatalogTable products={products} />
    </section>
  );
}
