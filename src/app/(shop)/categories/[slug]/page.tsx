import { notFound } from 'next/navigation'
import { ProductGrid } from "@/components/product/ProductGrid/ProductGrid"
import prisma from "@/lib/prisma/client"
import { getProducts } from "@/lib/actions/product.actions"

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  
  const category = await prisma.category.findUnique({ where: { slug } });

  if (!category) {
    notFound();
  }

  const products = await getProducts({ categorieId: category.id });

  return (
    <main className="pt-24 pb-20 px-6 min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-black text-accent uppercase tracking-widest italic">Collection</p>
            <h1 className="text-4xl font-black tracking-tighter text-text-primary uppercase">
              {category.nom}
            </h1>
            <p className="text-text-muted font-medium max-w-xl">
              Explorer notre sélection exclusive dans la catégorie <span className="text-text-primary font-bold">{category.nom}</span>.
              Qualité et style garantis.
            </p>
          </div>
          
          <div className="h-0.5 w-16 bg-accent mt-8 rounded-full"></div>
        </header>

        <div className="mb-12">
          <span className="text-sm font-black uppercase text-text-hint tracking-widest">
            {products.length} Produits trouvés
          </span>
        </div>

        {/* Content */}
        <ProductGrid products={products} />
      </div>
    </main>
  )
}
