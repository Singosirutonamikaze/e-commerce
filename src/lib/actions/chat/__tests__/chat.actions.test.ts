import { describe, it, expect, vi, beforeEach } from "vitest";
import { getBotReply } from "../bot";
import { askConciergeBot } from "../chat.actions";

// Mock Supabase Server
vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn().mockResolvedValue({
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: { user: { id: "user-123", email: "client@velure.com" } },
      }),
    },
  }),
}));

// Mock Prisma Client
vi.mock("@/lib/prisma/client", () => ({
  default: {
    user: {
      findUnique: vi.fn().mockResolvedValue({ prenom: "Koffi", role: "CLIENT" }),
    },
    conversation: {
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      findMany: vi.fn(),
    },
    message: {
      create: vi.fn(),
      findMany: vi.fn(),
    },
  },
}));

// Mock Next.js Cache
vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

describe("Chatbot Conciergerie Engine (bot.ts)", () => {
  it("répond avec les informations de suivi pour une question sur la commande", () => {
    const response = getBotReply("Où en est ma commande ?", "Koffi");
    expect(response.category).toBe("order");
    expect(response.message).toContain("Koffi");
    expect(response.message).toContain("Commandes");
    expect(response.actionLink).toBe("/dashboard/orders");
  });

  it("donne le tarif et le délai de livraison", () => {
    const response = getBotReply("Quels sont vos frais de livraison ?");
    expect(response.category).toBe("shipping");
    expect(response.message).toContain("150 €");
    expect(response.message).toContain("24h");
  });

  it("informe sur la politique de retour sous 30 jours", () => {
    const response = getBotReply("Puis-je retourner un article ?");
    expect(response.category).toBe("return");
    expect(response.message).toContain("30 jours");
  });

  it("conseille sur les tailles et coupes", () => {
    const response = getBotReply("Avez-vous un guide des tailles pour les chemises ?");
    expect(response.category).toBe("sizing");
    expect(response.message).toContain("matières nobles");
  });

  it("détaille les moyens de paiement acceptés (Stripe, Mobile Money)", () => {
    const response = getBotReply("Quels moyens de paiement acceptez-vous ? Flooz ou carte ?");
    expect(response.category).toBe("payment");
    expect(response.message).toContain("Stripe");
    expect(response.message).toContain("Flooz");
  });

  it("fournit une réponse de conciergerie par défaut élégante pour les requêtes inconnues", () => {
    const response = getBotReply("Une question très spécifique non répertoriée");
    expect(response.category).toBe("general");
    expect(response.message).toContain("conciergerie");
  });
});

describe("Chat Server Actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("askConciergeBot renvoie une réponse personnalisée avec le prénom de l'utilisateur", async () => {
    const res = await askConciergeBot("Bonjour, j'ai besoin d'aide");
    expect(res.success).toBe(true);
    expect(res.botReply.message).toContain("Koffi");
  });
});
