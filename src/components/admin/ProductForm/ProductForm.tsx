"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { productSchema, ProductInput } from "@/lib/utils/validators";
import { createProduct, updateProduct } from "@/lib/actions/product.actions";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useUIStore } from "@/store/ui.store";
import {
  Save,
  Plus,
  X,
  Package,
  Info,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";

import { ProductWithImages } from "@/types";
import { Category } from "@prisma/client";

interface ProductFormProps {
  categories: Category[];
  initialData?: ProductWithImages;
}

export function ProductForm({
  categories,
  initialData,
}: Readonly<ProductFormProps>) {
  const router = useRouter();
  const { addToast } = useUIStore();
  const [loading, setLoading] = useState(false);
  const isEditing = !!initialData;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.input<typeof productSchema>, object, ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData
      ? {
          nom: initialData.nom,
          description: initialData.description || "",
          prix: initialData.prix,
          ancienPrix: initialData.ancienPrix || 0,
          stock: initialData.stock,
          slug: initialData.slug,
          categorieId: initialData.categorieId,
          estVisible: initialData.estVisible,
        }
      : {
          nom: "",
          description: "",
          prix: 0,
          ancienPrix: 0,
          stock: 10,
          slug: "",
          categorieId: categories[0]?.id || "",
          estVisible: true,
        },
  });

  const [images, setImages] = useState<string[]>(
    initialData?.images?.map((img) => img.url) || [],
  );

  const onSubmit = async (data: ProductInput) => {
    setLoading(true);
    const result =
      isEditing && initialData
        ? await updateProduct(initialData.id, { ...data, images })
        : await createProduct({ ...data, images });

    if (result.success) {
      addToast({
        title: isEditing ? "Produit mis à jour" : "Produit créé",
        type: "success",
      });
      router.push("/admin/products");
      router.refresh();
    } else {
      addToast({ title: "Erreur", description: result.error, type: "danger" });
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
    >
      {/* Main Form Content */}
      <div className="lg:col-span-8 flex flex-col gap-8">
        {/* Section: Basic Info */}
        <section className="bg-white rounded-sm p-8 border border-neutral-200 shadow-sm flex flex-col gap-8">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-6">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-bold tracking-tight text-black uppercase">
                Informations Générales
              </h3>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                Désignation &amp; Description système
              </p>
            </div>
            <Info className="h-4 w-4 text-neutral-200" />
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="product-name"
                className="text-[9px] font-bold uppercase tracking-[0.3em] text-neutral-400 px-1"
              >
                Nom du Produit
              </label>
              <Input
                id="product-name"
                {...register("nom")}
                error={!!errors.nom}
                placeholder="Ex: Veste Oxford"
                className="h-12 rounded-sm border-neutral-200 bg-white"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="product-description"
                className="text-[9px] font-bold uppercase tracking-[0.3em] text-neutral-400 px-1"
              >
                Description Technique
              </label>
              <textarea
                id="product-description"
                {...register("description")}
                className="w-full min-h-40 bg-white rounded-sm border border-neutral-200 px-4 py-3 text-sm font-medium focus:border-black outline-none transition-all placeholder:text-neutral-400"
                placeholder="Détails techniques et composition..."
              />
            </div>
          </div>
        </section>

        {/* Section: Inventory */}
        <section className="bg-white rounded-sm p-8 border border-neutral-200 shadow-sm flex flex-col gap-8">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-6">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-bold tracking-tight text-black uppercase">
                Prix &amp; Inventaire
              </h3>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                Valeurs monétaires &amp; Stock disponible
              </p>
            </div>
            <Package className="h-4 w-4 text-neutral-200" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="product-price"
                className="text-[9px] font-bold uppercase tracking-[0.3em] text-neutral-400 px-1"
              >
                Prix (FCFA)
              </label>
              <Input
                id="product-price"
                type="number"
                step="0.01"
                {...register("prix", { valueAsNumber: true })}
                error={!!errors.prix}
                className="h-12 rounded-sm font-bold tabular-nums"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="product-old-price"
                className="text-[9px] font-bold uppercase tracking-[0.3em] text-neutral-400 px-1"
              >
                Ancien Prix (FCFA)
              </label>
              <Input
                id="product-old-price"
                type="number"
                step="0.01"
                {...register("ancienPrix", { valueAsNumber: true })}
                error={!!errors.ancienPrix}
                className="h-12 rounded-sm text-neutral-500 tabular-nums"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="product-stock"
                className="text-[9px] font-bold uppercase tracking-[0.3em] text-neutral-400 px-1"
              >
                Stock
              </label>
              <Input
                id="product-stock"
                type="number"
                {...register("stock", { valueAsNumber: true })}
                error={!!errors.stock}
                className="h-12 rounded-sm font-bold tabular-nums"
              />
            </div>
          </div>
        </section>

        {/* Section: Images */}
        <section className="bg-white rounded-sm p-8 border border-neutral-200 shadow-sm flex flex-col gap-8">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-6">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-bold tracking-tight text-black uppercase">
                Ressources Visuelles
              </h3>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                Index des images produits
              </p>
            </div>
            <ImageIcon className="h-4 w-4 text-neutral-200" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {images.map((url, idx) => (
              <div
                key={`${url}-${idx}`}
                className="relative aspect-3/4 rounded-sm overflow-hidden border border-neutral-100 bg-neutral-50"
              >
                <img
                  src={url}
                  alt="Aperçu"
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  <button
                    type="button"
                    title="Supprimer cette image"
                    onClick={() =>
                      setImages(images.filter((_, i) => i !== idx))
                    }
                    className="h-7 w-7 bg-white text-black border border-neutral-200 rounded-sm flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setImages([
                  ...images,
                  "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800",
                ])
              }
              className="aspect-3/4 rounded-sm border border-neutral-200 border-dashed flex flex-col items-center justify-center text-neutral-300 hover:border-black hover:text-black transition-all bg-neutral-50"
            >
              <Plus className="h-4 w-4 mb-2" />
              <span className="text-[8px] font-bold uppercase tracking-widest text-center">
                Ajouter
              </span>
            </button>
          </div>
        </section>
      </div>

      {/* Sidebar: Config & Save */}
      <div className="lg:col-span-4 flex flex-col gap-8 sticky top-32">
        {/* Configuration */}
        <section className="bg-white rounded-sm p-8 border border-neutral-200 shadow-sm flex flex-col gap-8">
          <div className="flex flex-col gap-2 border-b border-neutral-100 pb-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">
              Configuration Système
            </h3>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="product-category"
                className="text-[9px] font-bold uppercase tracking-[0.3em] text-neutral-400 px-1"
              >
                Catégorie
              </label>
              <div className="relative">
                <select
                  id="product-category"
                  {...register("categorieId")}
                  className="w-full h-11 bg-white rounded-sm border border-neutral-200 px-4 text-[10px] font-bold uppercase tracking-widest focus:border-black appearance-none cursor-pointer transition-all"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nom}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="product-slug"
                className="text-[9px] font-bold uppercase tracking-[0.3em] text-neutral-400 px-1"
              >
                Identifiant Unique (Slug)
              </label>
              <Input
                id="product-slug"
                {...register("slug")}
                error={!!errors.slug}
                placeholder="identifiant-produit"
                className="h-11 rounded-sm text-[10px] font-bold uppercase"
              />
            </div>

            <div className="pt-4 border-t border-neutral-100">
              <label className="flex items-center justify-between cursor-pointer group p-4 rounded-sm border border-neutral-100 hover:border-black transition-all bg-neutral-50">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-black">
                    Visibilité Shop
                  </span>
                  <span className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest">
                    Activer l&apos;exposition catalogue
                  </span>
                </div>
                <input
                  type="checkbox"
                  {...register("estVisible")}
                  className="h-4 w-4 rounded-sm border-neutral-300 text-black focus:ring-black accent-black"
                />
              </label>
            </div>
          </div>
        </section>

        {/* Action Button */}
        <div className="bg-black p-1 pt-0 rounded-sm">
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-14 font-bold uppercase tracking-widest text-[10px] rounded-sm bg-black text-white hover:bg-neutral-900 border border-neutral-800 transition-all flex items-center justify-center gap-3"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Save className="h-4 w-4" />
                {isEditing ? "Mettre à jour" : "Valider pour catalogue"}
              </>
            )}
          </Button>
        </div>
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.back()}
          className="h-10 font-bold text-[9px] uppercase tracking-widest text-neutral-400 hover:text-black"
        >
          Annuler les modifications
        </Button>
      </div>
    </form>
  );
}
