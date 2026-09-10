import { describe, it, expect, vi, beforeEach } from "vitest";
import { getProducts, getProduct, deleteProduct } from "../product.actions";
import prisma from "@/lib/prisma/client";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn().mockResolvedValue({
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: { user: { email: "admin@velure.com" } },
      }),
    },
  }),
}));

vi.mock("@/lib/prisma/client", () => ({
  default: {
    user: {
      findUnique: vi.fn().mockResolvedValue({ role: "ADMIN" }),
    },
    product: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

describe("Product Server Actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("récupère les produits visibles avec conversion numérique des prix", async () => {
    vi.mocked(prisma.product.findMany).mockResolvedValue([
      {
        id: "prod-1",
        nom: "Costume Smoking Velours",
        slug: "costume-smoking-velours",
        description: "Luxe discret",
        prix: 490 as never,
        ancienPrix: null,
        stock: 10,
        estVisible: true,
        categorieId: "cat-1",
        createdAt: new Date(),
        updatedAt: new Date(),
        images: [],
        categorie: { nom: "Costumes" } as never,
      },
    ] as never);

    const products = await getProducts();
    expect(products).toHaveLength(1);
    expect(products[0].prix).toBe(490);
  });

  it("récupère une fiche produit par son ID", async () => {
    vi.mocked(prisma.product.findUnique).mockResolvedValue({
      id: "prod-1",
      nom: "Costume Smoking Velours",
      slug: "costume-smoking-velours",
      description: "Luxe discret",
      prix: 490 as never,
      ancienPrix: 550 as never,
      stock: 10,
      estVisible: true,
      categorieId: "cat-1",
      createdAt: new Date(),
      updatedAt: new Date(),
      images: [],
      categorie: { nom: "Costumes" } as never,
    } as never);

    const product = await getProduct("prod-1");
    expect(product?.nom).toBe("Costume Smoking Velours");
    expect(product?.ancienPrix).toBe(550);
  });

  it("supprime un produit par un administrateur", async () => {
    vi.mocked(prisma.product.delete).mockResolvedValue({ id: "prod-1" } as never);

    const res = await deleteProduct("prod-1");
    expect(res.success).toBe(true);
    expect(prisma.product.delete).toHaveBeenCalledWith({
      where: { id: "prod-1" },
    });
  });
});
