import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import prisma from "@/lib/prisma/client";
import { getProducts } from "@/lib/actions/product";
import { ProductGrid } from "@/components/product/ProductGrid/ProductGrid";
import { ROUTES } from "@/lib/utils/constants/routes";

export default async function DashboardCategoryDetailPage({
  params,
}: Readonly<{ params: Promise<{ slug: string }> }>) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({ where: { slug } });

  if (!category) {
    notFound();
  }

  const products = await getProducts({ categorieId: category.id });

  return (
    <div className="pb-16 text-slate-100">
      <div className="max-w-7xl mx-auto">
        <Link
          href={ROUTES.DASHBOARD.SHOP}
          className="inline-flex items-center gap-2 mb-6 text-xs text-slate-400 hover:text-white transition-colors lowercase"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          retour aux univers
        </Link>

        <header className="mb-8 border-b border-slate-800/80 pb-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-slate-400">
              Univers
            </span>
            <h1 className="text-2xl md:text-3xl font-serif text-white capitalize">
              {category.nom}
            </h1>
            <p className="text-xs md:text-sm text-slate-400 max-w-xl leading-relaxed mt-1">
              Explorez notre sélection exclusive dans l&apos;univers {category.nom}.
            </p>
          </div>
        </header>

        <div className="mb-6 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {products.length} {products.length > 1 ? "articles répertoriés" : "article répertorié"}
          </span>
        </div>

        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="border border-slate-800/80 bg-slate-950/60 backdrop-blur-md p-12 text-center">
            <p className="text-xs font-medium text-slate-400">
              Aucun article disponible pour cette catégorie pour le moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
