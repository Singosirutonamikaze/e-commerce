import { describe, it, expect, vi, beforeEach } from "vitest";
import { getOrder, updateOrderStatus } from "../order.actions";
import prisma from "@/lib/prisma/client";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn().mockResolvedValue({
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: { user: { id: "admin-id", email: "admin@velure.com" } },
      }),
    },
  }),
}));

vi.mock("@/lib/prisma/client", () => ({
  default: {
    user: {
      findUnique: vi.fn().mockResolvedValue({ role: "ADMIN" }),
    },
    order: {
      findUnique: vi.fn(),
      update: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
    },
    cart: {
      findUnique: vi.fn(),
    },
    promo: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
  },
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

describe("Order Server Actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("récupère les détails d'une commande avec calcul des décimaux", async () => {
    vi.mocked(prisma.order.findUnique).mockResolvedValue({
      id: "ord-1",
      userId: "user-1",
      adresseId: "addr-1",
      promoId: null,
      sousTotal: 450,
      fraisLivraison: 0,
      montantReduction: 0,
      total: 450,
      statut: "CONFIRME",
      noteLivraison: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      orderItems: [
        {
          id: "item-1",
          ordreId: "ord-1",
          produitId: "prod-1",
          quantite: 1,
          prixUnitaire: 450,
          nomProduit: "Costume Smoking",
          imageProduit: "",
        },
      ],
      adresse: {} as never,
      promo: null,
      user: {} as never,
    } as never);

    const order = await getOrder("ord-1");
    expect(order?.id).toBe("ord-1");
    expect(order?.total).toBe(450);
    expect(order?.orderItems[0].prixUnitaire).toBe(450);
  });

  it("met à jour le statut d'une commande par un administrateur", async () => {
    vi.mocked(prisma.order.update).mockResolvedValue({
      id: "ord-1",
      statut: "EXPEDIE",
    } as never);

    const res = await updateOrderStatus("ord-1", "EXPEDIE");
    expect(res.success).toBe(true);
    expect(prisma.order.update).toHaveBeenCalledWith({
      where: { id: "ord-1" },
      data: { statut: "EXPEDIE" },
    });
  });
});
