import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/product/ProductGrid/ProductGrid";
import prisma from "@/lib/prisma/client";
import { getProducts } from "@/lib/actions/product";

export default async function CategoryPage({
  params,
}: Readonly<{ params: Promise<{ slug: string }> }>) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({ where: { slug } });

  if (!category) {
    notFound();
  }

  const products = await getProducts({ categorieId: category.id });

  return (
    <main className="pt-28 pb-16 min-h-screen text-slate-100 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-slate-400">
              Collection
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-white capitalize">
              {category.nom}
            </h1>
            <p className="text-xs md:text-sm text-slate-400 max-w-xl leading-relaxed">
              Explorez notre sélection exclusive dans la catégorie {category.nom}.
            </p>
          </div>
        </header>

        <div className="mb-6 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {products.length} {products.length > 1 ? "produits disponibles" : "produit disponible"}
          </span>
        </div>

        <ProductGrid products={products} />
      </div>
    </main>
  );
}
