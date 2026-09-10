import { describe, it, expect, vi, beforeEach } from "vitest";
import { getCart, addToCart, removeFromCart, clearCart } from "../cart.actions";
import prisma from "@/lib/prisma/client";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn().mockResolvedValue({
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: { user: { id: "user-456" } },
      }),
    },
  }),
}));

vi.mock("@/lib/prisma/client", () => ({
  default: {
    cart: {
      findUnique: vi.fn(),
    },
    cartItem: {
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      deleteMany: vi.fn(),
    },
  },
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

describe("Cart Server Actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("récupère le panier de l'utilisateur", async () => {
    vi.mocked(prisma.cart.findUnique).mockResolvedValue({
      id: "cart-1",
      userId: "user-456",
      items: [],
      updatedAt: new Date(),
    } as never);

    const cart = await getCart();
    expect(cart?.id).toBe("cart-1");
  });

  it("ajoute un nouvel article au panier", async () => {
    vi.mocked(prisma.cart.findUnique).mockResolvedValue({
      id: "cart-1",
      userId: "user-456",
      updatedAt: new Date(),
    });
    vi.mocked(prisma.cartItem.findFirst).mockResolvedValue(null);
    vi.mocked(prisma.cartItem.create).mockResolvedValue({
      id: "item-1",
      paniereId: "cart-1",
      produitId: "prod-1",
      quantite: 1,
      ajouteLe: new Date(),
    });

    const res = await addToCart("prod-1", 1);
    expect(res.success).toBe(true);
    expect(prisma.cartItem.create).toHaveBeenCalled();
  });

  it("incrémente la quantité si le produit est déjà présent", async () => {
    vi.mocked(prisma.cart.findUnique).mockResolvedValue({
      id: "cart-1",
      userId: "user-456",
      updatedAt: new Date(),
    });
    vi.mocked(prisma.cartItem.findFirst).mockResolvedValue({
      id: "item-1",
      paniereId: "cart-1",
      produitId: "prod-1",
      quantite: 2,
      ajouteLe: new Date(),
    });

    const res = await addToCart("prod-1", 3);
    expect(res.success).toBe(true);
    expect(prisma.cartItem.update).toHaveBeenCalledWith({
      where: { id: "item-1" },
      data: { quantite: 5 },
    });
  });

  it("supprime un article du panier", async () => {
    vi.mocked(prisma.cartItem.delete).mockResolvedValue({
      id: "item-1",
      paniereId: "cart-1",
      produitId: "prod-1",
      quantite: 1,
      ajouteLe: new Date(),
    });

    const res = await removeFromCart("item-1");
    expect(res.success).toBe(true);
  });

  it("vide le panier de l'utilisateur", async () => {
    vi.mocked(prisma.cart.findUnique).mockResolvedValue({
      id: "cart-1",
      userId: "user-456",
      updatedAt: new Date(),
    });

    const res = await clearCart();
    expect(res.success).toBe(true);
    expect(prisma.cartItem.deleteMany).toHaveBeenCalledWith({
      where: { paniereId: "cart-1" },
    });
  });
});
