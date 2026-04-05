import { getCategories } from "@/lib/actions/category.actions";
import { ShopTable } from "@/components/dashboard/ShopTable/ShopTable";

export default async function DashboardShopPage() {
  const categories = await getCategories();

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold tracking-[0.2em] text-neutral-400">
          Dashboard / Univers
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-black">
          Exploration des univers
        </h2>
        <p className="text-sm text-neutral-600">
          Tableau des catégories et univers de notre boutique. Cliquez pour
          explorez ou éditer.
        </p>
      </div>

      {categories.length > 0 ? (
        <ShopTable categories={categories} />
      ) : (
        <div className="rounded-sm border border-dashed border-neutral-300 bg-white p-8 text-center">
          <p className="text-sm font-semibold tracking-wide text-neutral-400">
            Aucune catégorie disponible.
          </p>
        </div>
      )}
    </section>
  );
}
