/**
 * Moteur du Chatbot Conciergerie Velure
 * Gère les réponses intelligentes, les conseils de style et l'assistance client instantanée.
 */

export interface BotResponse {
  message: string;
  suggestions?: string[];
  actionLink?: string;
  category?: "order" | "shipping" | "return" | "sizing" | "payment" | "general";
}

const KNOWLEDGE_BASE = [
  {
    keywords: ["commande", "suivi", "colis", "statut", "ou est", "où est", "livré", "expédié"],
    category: "order" as const,
    reply: (userName?: string) => {
      const userGreeting = userName ? " " + userName : "";
      return "Bonjour" + userGreeting + ". Vous pouvez suivre l'état d'avancement de toutes vos commandes en temps réel directement dans votre espace client, rubrique \"Commandes\". Chaque étape (En préparation, Expédiée, Livrée) y est détaillée avec son historique.";
    },
    suggestions: ["Voir mes commandes", "Délai de livraison", "Parler à un conseiller"],
    actionLink: "/dashboard/orders",
  },
  {
    keywords: ["livraison", "frais", "delai", "délai", "combien de temps", "transport", "shipping"],
    category: "shipping" as const,
    reply: () =>
      "Notre service de livraison d'exception assure une expédition sous 24h ouvrées. La livraison standard est offerte pour toute commande supérieure à 150 € (ou 100 000 FCFA). Pour les montants inférieurs, un forfait de 9,99 € est appliqué.",
    suggestions: ["Suivi de commande", "Modes de paiement", "Politique de retour"],
    actionLink: "/dashboard/shop",
  },
  {
    keywords: ["retour", "remboursement", "échanger", "echanger", "rétractation", "renvoyer"],
    category: "return" as const,
    reply: () =>
      "Velure offre un service de retour gracieux sous 30 jours à compter de la réception de vos pièces. Les articles doivent être retournés dans leur état d'origine, non portés et avec leurs étiquettes scellées. Le remboursement est initié dès réception et contrôle de la pièce.",
    suggestions: ["Comment faire un retour ?", "Contacter la conciergerie", "Voir mes commandes"],
    actionLink: "/dashboard/orders",
  },
  {
    keywords: ["taille", "guide", "mesure", "sizing", "comment taille", "coupe", "matière", "matiere"],
    category: "sizing" as const,
    reply: () =>
      "Nos créations respectent une coupe ajustée et contemporaine. Chaque fiche produit dispose des dimensions précises et des détails sur les matières nobles utilisées (soie, cachemire, lin d'exception, cuir pleine fleur). Si vous hésitez entre deux tailles, nous vous conseillons de choisir la taille supérieure pour un confort optimal.",
    suggestions: ["Explorer la collection", "Questions sur une pièce", "Parler à un conseiller"],
    actionLink: "/dashboard/shop",
  },
  {
    keywords: ["paiement", "payer", "carte", "flooz", "t-money", "tmoney", "stripe", "securise", "sécurisé"],
    category: "payment" as const,
    reply: () =>
      "Nous acceptons les règlements par carte bancaire internationale (Visa, Mastercard) sécurisés par Stripe avec protocole 3D Secure, ainsi que les paiements Mobile Money (Flooz, T-Money) pour l'Afrique de l'Ouest. Toutes les transactions sont chiffrées selon les standards bancaires les plus stricts.",
    suggestions: ["Finaliser mon panier", "Sécurité des données", "Frais de livraison"],
    actionLink: "/dashboard/cart",
  },
  {
    keywords: ["bonjour", "salut", "hello", "bonsoir", "aide", "contact", "qui êtes-vous"],
    category: "general" as const,
    reply: (userName?: string) => {
      const userGreeting = userName ? ", " + userName : "";
      return "Bienvenue à la Conciergerie Velure" + userGreeting + ". Je suis votre assistant personnel dédié à vous offrir une expérience d'achat sur-mesure. Comment puis-je vous guider aujourd'hui ?";
    },
    suggestions: ["Suivre ma commande", "Délais de livraison", "Guide des tailles", "Contacter un conseiller"],
  },
];

export function getBotReply(input: string, userName?: string): BotResponse {
  const normalized = input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  for (const item of KNOWLEDGE_BASE) {
    const matches = item.keywords.some((kw) =>
      normalized.includes(
        kw
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, ""),
      ),
    );

    if (matches) {
      return {
        message: item.reply(userName),
        suggestions: item.suggestions,
        actionLink: item.actionLink,
        category: item.category,
      };
    }
  }

  // Réponse par défaut élégante
  return {
    message:
      "Je vous remercie pour votre message. Votre requête a été transmise à notre équipe de conciergerie dédiée. Un conseiller prendra le relais très prochainement pour vous accompagner avec précision.",
    suggestions: [
      "Suivre une commande",
      "Délais de livraison",
      "Guide des tailles",
      "Modes de paiement",
    ],
    category: "general",
  };
}
