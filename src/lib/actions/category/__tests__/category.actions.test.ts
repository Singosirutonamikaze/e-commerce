import { describe, it, expect, vi, beforeEach } from "vitest";
import { getCategories, createCategory, deleteCategory } from "../category.actions";
import prisma from "@/lib/prisma/client";

vi.mock("@/lib/prisma/client", () => ({
  default: {
    category: {
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    product: {
      count: vi.fn(),
    },
  },
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

describe("Category Server Actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("récupère la liste ordonnée des catégories", async () => {
    const mockCategories = [
      { id: "cat-1", nom: "Costumes", slug: "costumes", ordre: 0, _count: { products: 3 } },
      { id: "cat-2", nom: "Souliers", slug: "souliers", ordre: 1, _count: { products: 5 } },
    ];
    vi.mocked(prisma.category.findMany).mockResolvedValue(mockCategories as never);

    const result = await getCategories();
    expect(result).toHaveLength(2);
    expect(result[0].nom).toBe("Costumes");
  });

  it("crée une catégorie avec un slug généré proprement", async () => {
    vi.mocked(prisma.category.create).mockResolvedValue({
      id: "cat-3",
      nom: "Haute Horlogerie",
      slug: "haute-horlogerie",
      imageUrl: null,
      ordre: 2,
      parentId: null,
      createdAt: new Date(),
    });

    const result = await createCategory({
      nom: "Haute Horlogerie",
      ordre: 2,
    });

    expect(result.success).toBe(true);
    expect(result.category?.slug).toBe("haute-horlogerie");
  });

  it("empêche la suppression d'une catégorie si des produits y sont rattachés", async () => {
    vi.mocked(prisma.product.count).mockResolvedValue(4);

    const result = await deleteCategory("cat-1");
    expect(result.error).toContain("Impossible de supprimer");
    expect(prisma.category.delete).not.toHaveBeenCalled();
  });
});
