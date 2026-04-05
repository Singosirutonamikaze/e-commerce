"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Edit3,
  Trash2,
  Layers,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/utils/constants/routes";

interface Category {
  id: string;
  nom: string;
  slug: string;
  _count: {
    products: number;
  };
}

interface CategoriesTableProps {
  readonly categories: readonly Category[];
  readonly totalCount: number;
  readonly currentPage: number;
  readonly totalPages: number;
}

export function CategoriesTable({
  categories,
  totalCount,
  currentPage,
  totalPages,
}: Readonly<CategoriesTableProps>) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const handleDeleteClick = (category: Category) => {
    setSelectedCategory(category);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedCategory) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/categories/${selectedCategory.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setShowDeleteModal(false);
        router.refresh();
      } else {
        alert("Erreur lors de la suppression");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Une erreur s'est produite");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h1 className="mb-2 text-3xl font-bold uppercase tracking-tighter text-text-primary">
            Gestion des <span className="italic text-accent">Categories</span>
          </h1>
          <p className="text-sm font-medium text-text-muted">
            Table de gestion avec pagination et actions de contrôle.
          </p>
        </div>
        <Button
          onClick={() => setShowAddModal(true)}
          className="h-14 rounded-sm px-10 font-bold uppercase tracking-widest shadow-xl shadow-accent/20 transition-all hover:scale-105 active:scale-95"
        >
          <Plus className="mr-3 h-5 w-5" />
          Nouvelle Categorie
        </Button>
      </header>

      <div className="overflow-hidden rounded-sm border border-border bg-white shadow-sm">
        <div className="border-b border-border bg-surface-alt/40 px-8 py-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-hint">
            {totalCount} categories indexees
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b border-border bg-neutral-50">
                <th className="px-8 py-4 text-[9px] font-bold uppercase tracking-[0.3em] text-text-hint">
                  Categorie
                </th>
                <th className="px-8 py-4 text-[9px] font-bold uppercase tracking-[0.3em] text-text-hint">
                  Slug
                </th>
                <th className="px-8 py-4 text-center text-[9px] font-bold uppercase tracking-[0.3em] text-text-hint">
                  Produits
                </th>
                <th className="px-8 py-4 text-right text-[9px] font-bold uppercase tracking-[0.3em] text-text-hint">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr
                  key={category.id}
                  className="border-b border-border last:border-0 hover:bg-surface-alt/20"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-accent-light text-accent">
                        <Layers className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-bold uppercase tracking-tight text-text-primary">
                        {category.nom}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-text-hint">
                    {category.slug}
                  </td>
                  <td className="px-8 py-5 text-center text-sm font-bold text-text-primary">
                    {category._count.products}
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={ROUTES.ADMIN.CATEGORY_EDIT(category.id)}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-9 w-9 rounded-sm p-0 text-text-hint transition-all hover:bg-accent-light hover:text-accent"
                          title="Modifier"
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                      </Link>

                      <Link
                        href={ROUTES.CATEGORY_DETAIL(category.slug)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-9 w-9 rounded-sm p-0 text-text-hint transition-all hover:bg-neutral-100 hover:text-text-primary"
                          title="Voir"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </Link>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(category)}
                        className="h-9 w-9 rounded-sm p-0 text-text-hint transition-all hover:bg-red-50 hover:text-red-600"
                        title="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}

              {categories.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-8 py-12 text-center text-sm font-medium text-text-muted"
                  >
                    Aucune categorie disponible.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-border bg-surface-alt/30 px-8 py-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-text-hint">
            Page {currentPage} / {totalPages}
          </p>

          <div className="flex items-center gap-2">
            <Link
              href={`${ROUTES.ADMIN.CATEGORIES}?page=${Math.max(1, currentPage - 1)}`}
            >
              <Button
                variant="outline"
                size="sm"
                className="h-9 rounded-sm px-3"
                disabled={!hasPrev}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </Link>

            <Link
              href={`${ROUTES.ADMIN.CATEGORIES}?page=${Math.min(totalPages, currentPage + 1)}`}
            >
              <Button
                variant="outline"
                size="sm"
                className="h-9 rounded-sm px-3"
                disabled={!hasNext}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Modal Suppression */}
      {showDeleteModal && selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-w-sm rounded-sm border border-border bg-white shadow-xl">
            <div className="border-b border-border bg-surface-alt/40 px-6 py-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-red-50 text-red-600">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-bold uppercase tracking-tight text-red-600">
                Confirmer la suppression
              </h2>
            </div>

            <div className="px-6 py-6">
              <p className="text-sm font-medium text-text-muted mb-2">
                Êtes-vous sûr de vouloir supprimer la catégorie ?
              </p>
              <div className="mt-4 rounded-sm bg-surface-alt/50 p-3 border border-border">
                <p className="text-sm font-bold text-text-primary">
                  {selectedCategory.nom}
                </p>
                <p className="text-xs text-text-hint mt-1">
                  {selectedCategory._count.products} produit
                  {selectedCategory._count.products === 1 ? "" : "s"} associé
                  {selectedCategory._count.products === 1 ? "" : "s"}
                </p>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-red-600 mt-4">
                ⚠️ Cette action est irréversible
              </p>
            </div>

            <div className="border-t border-border bg-surface-alt/30 px-6 py-4 flex items-center justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="h-10 rounded-sm px-6 font-bold tracking-widest"
              >
                Annuler
              </Button>
              <Button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="h-10 rounded-sm px-6 font-bold tracking-widest bg-red-600 text-white hover:bg-red-700"
              >
                {isDeleting ? "Suppression..." : "Confirmer"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Ajout */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-w-sm rounded-sm border border-border bg-white shadow-xl">
            <div className="border-b border-border bg-surface-alt/40 px-6 py-5 flex items-center justify-between">
              <h2 className="text-lg font-bold uppercase tracking-tight text-text-primary">
                Créer une catégorie
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                title="Fermer"
                aria-label="Fermer la modal"
                className="p-1 rounded-sm hover:bg-surface-alt transition-colors"
              >
                <X className="h-5 w-5 text-text-hint" />
              </button>
            </div>

            <div className="px-6 py-6">
              <p className="text-sm text-text-muted font-medium">
                Veuillez remplir le formulaire pour créer une nouvelle
                catégorie.
              </p>
              <Link
                href={ROUTES.ADMIN.CATEGORY_NEW}
                onClick={() => setShowAddModal(false)}
              >
                <Button className="w-full mt-4 h-12 rounded-sm font-bold tracking-widest bg-accent text-white hover:bg-accent-hover">
                  Accéder au formulaire
                </Button>
              </Link>
            </div>

            <div className="border-t border-border bg-surface-alt/30 px-6 py-4">
              <Button
                variant="outline"
                onClick={() => setShowAddModal(false)}
                className="w-full h-10 rounded-sm font-bold tracking-widest"
              >
                Fermer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
