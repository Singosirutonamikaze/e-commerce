import { describe, it, expect, vi, beforeEach } from "vitest";
import { getUserProfile, addAddress, toggleWishlist } from "../user.actions";
import prisma from "@/lib/prisma/client";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn().mockResolvedValue({
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: { user: { id: "user-789", email: "client@velure.com" } },
      }),
      signInWithPassword: vi.fn(),
      signOut: vi.fn(),
    },
  }),
}));

vi.mock("@/lib/prisma/client", () => ({
  default: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      findMany: vi.fn(),
    },
    address: {
      findMany: vi.fn(),
      create: vi.fn(),
      updateMany: vi.fn(),
    },
    wishlist: {
      findFirst: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
      findMany: vi.fn(),
    },
    cart: {
      create: vi.fn(),
    },
  },
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

describe("User Server Actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("récupère le profil de l'utilisateur connecté", async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue({
      id: "user-789",
      email: "client@velure.com",
      prenom: "Komla",
      nom: "Koffi",
      telephone: "+228 90 00 00 00",
      avatarUrl: null,
    } as never);

    const profile = await getUserProfile();
    expect(profile?.prenom).toBe("Komla");
    expect(profile?.nom).toBe("Koffi");
  });

  it("ajoute une nouvelle adresse de livraison", async () => {
    vi.mocked(prisma.address.create).mockResolvedValue({
      id: "addr-1",
      userId: "user-789",
      prenom: "Komla",
      nom: "Koffi",
      telephone: "+228 90 00 00 00",
      rue: "Boulevard du Mono",
      complementAdresse: null,
      ville: "Lomé",
      codePostal: "00228",
      pays: "Togo",
      estParDefaut: true,
      createdAt: new Date(),
    });

    const res = await addAddress({
      prenom: "Komla",
      nom: "Koffi",
      telephone: "+228 90 00 00 00",
      rue: "Boulevard du Mono",
      ville: "Lomé",
      codePostal: "00228",
      pays: "Togo",
      estParDefaut: true,
    });

    expect(res.success).toBe(true);
    expect(res.address?.ville).toBe("Lomé");
  });

  it("bascule un produit dans la wishlist (ajoute s'il n'existe pas)", async () => {
    vi.mocked(prisma.wishlist.findFirst).mockResolvedValue(null);
    vi.mocked(prisma.wishlist.create).mockResolvedValue({
      id: "wish-1",
      userId: "user-789",
      produitId: "prod-xyz",
      ajouteLe: new Date(),
    });

    const res = await toggleWishlist("prod-xyz");
    expect(res.success).toBe(true);
    expect(prisma.wishlist.create).toHaveBeenCalledWith({
      data: { userId: "user-789", produitId: "prod-xyz" },
    });
  });

  it("bascule un produit dans la wishlist (supprime s'il existe déjà)", async () => {
    vi.mocked(prisma.wishlist.findFirst).mockResolvedValue({
      id: "wish-1",
      userId: "user-789",
      produitId: "prod-xyz",
      ajouteLe: new Date(),
    });

    const res = await toggleWishlist("prod-xyz");
    expect(res.success).toBe(true);
    expect(prisma.wishlist.delete).toHaveBeenCalledWith({
      where: { id: "wish-1" },
    });
  });
});
