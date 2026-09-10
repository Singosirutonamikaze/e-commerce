import React from "react";
import Link from "next/link";
import { ROUTES } from "@/lib/utils/constants/routes";
import { HelpCircle, ChevronRight } from "lucide-react";

export default function FAQPage() {
  const faqs = [
    {
      category: "Commandes et paiement",
      items: [
        {
          question: "Quels sont les moyens de paiement acceptés ?",
          answer:
            "Nous acceptons les cartes bancaires (Visa, MasterCard) ainsi que les paiements par Mobile Money (T-Money, Flooz) pour nos clients au Togo.",
        },
        {
          question: "Puis-je modifier ou annuler ma commande ?",
          answer:
            "Une fois validée, la commande entre immédiatement en préparation pour expédition rapide. L'annulation n'est plus possible, mais vous pourrez effectuer un retour après réception.",
        },
      ],
    },
    {
      category: "Livraison",
      items: [
        {
          question: "Quels sont les délais de livraison ?",
          answer:
            "Les livraisons standards s'effectuent sous 24 à 48 heures ouvrées. Un service express par coursier le jour même est disponible pour Lomé (pour toute commande passée avant 14h).",
        },
        {
          question: "Comment suivre l'acheminement de mon colis ?",
          answer:
            "Dès l'expédition, un numéro de suivi vous est transmis par email. Vous pouvez également suivre son état depuis votre tableau de bord client.",
        },
      ],
    },
    {
      category: "Retours et garanties",
      items: [
        {
          question: "Quelle est votre politique de retour ?",
          answer:
            "Vous disposez de 14 jours francs après réception pour retourner un article neuf, non porté et dans son emballage d'origine.",
        },
        {
          question: "Authenticité des pièces",
          answer:
            "Toutes nos pièces proviennent directement de nos ateliers certifiés et font l'objet d'un contrôle rigoureux avant chaque envoi.",
        },
      ],
    },
  ];

  return (
    <div className="pt-28 pb-20 px-6 lg:px-12 text-slate-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 border-b border-slate-800/80 pb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-slate-400">
              Assistance
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Questions fréquentes
          </h1>
          <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-xl">
            Retrouvez les réponses aux questions les plus courantes sur vos commandes, livraisons et retours.
          </p>
        </header>

        <div className="space-y-12">
          {faqs.map((group) => (
            <section key={group.category} className="flex flex-col gap-4">
              <h2 className="text-sm font-semibold text-white tracking-wide border-b border-slate-800/80 pb-2">
                {group.category}
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {group.items.map((item) => (
                  <div
                    key={item.question}
                    className="p-5 rounded-sm bg-slate-950/60 backdrop-blur-md border border-slate-800/80 flex flex-col gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-slate-400 shrink-0" />
                      <h3 className="text-xs font-semibold text-white">
                        {item.question}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed pl-6">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 p-6 rounded-sm bg-slate-900/50 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-white">
              Une autre question ?
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Notre équipe est à votre disposition pour vous aider.
            </p>
          </div>
          <Link
            href={ROUTES.HOME}
            className="text-xs font-medium text-white hover:text-slate-300 flex items-center gap-1 transition-colors"
          >
            Retourner à l&apos;accueil
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
