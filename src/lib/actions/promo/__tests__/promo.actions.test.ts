import { describe, it, expect, vi, beforeEach } from "vitest";
import { validatePromoCode } from "../promo.actions";
import prisma from "@/lib/prisma/client";

vi.mock("@/lib/prisma/client", () => ({
  default: {
    promo: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    user: {
      findUnique: vi.fn(),
    },
  },
}));

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn().mockResolvedValue({
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: { user: { email: "admin@velure.com" } },
      }),
    },
  }),
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

describe("Promo Server Actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("valide avec succès un code promotionnel actif et non expiré", async () => {
    const futureDate = new Date();
    futureDate.setMonth(futureDate.getMonth() + 1);

    vi.mocked(prisma.promo.findUnique).mockResolvedValue({
      id: "promo-1",
      code: "LUXE10",
      reduction: 10,
      type: "POURCENTAGE",
      montantMinimum: null,
      limiteUtilisation: 100,
      nombreUtilisations: 5,
      dateExpiration: futureDate,
      estActif: true,
      createdAt: new Date(),
    } as never);

    const result = await validatePromoCode("luxe10");
    expect(result.success).toBe(true);
    expect(result.promo?.code).toBe("LUXE10");
  });

  it("rejette un code promo inactif", async () => {
    vi.mocked(prisma.promo.findUnique).mockResolvedValue({
      id: "promo-2",
      code: "INACTIF",
      estActif: false,
    } as never);

    const result = await validatePromoCode("INACTIF");
    expect(result.error).toBe("Code promo invalide");
  });

  it("rejette un code promo expiré", async () => {
    const pastDate = new Date();
    pastDate.setMonth(pastDate.getMonth() - 1);

    vi.mocked(prisma.promo.findUnique).mockResolvedValue({
      id: "promo-3",
      code: "EXPIRE",
      estActif: true,
      dateExpiration: pastDate,
    } as never);

    const result = await validatePromoCode("EXPIRE");
    expect(result.error).toBe("Code promo expiré");
  });
});
