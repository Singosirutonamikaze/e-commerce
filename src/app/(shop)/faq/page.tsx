import React from "react";
import Link from "next/link";
import { ROUTES } from "@/lib/utils/constants/routes";

export default function FAQPage() {
  const faqs = [
    {
      category: "Commandes et Paiement",
      items: [
        {
          question: "Quels sont les moyens de paiement acceptés ?",
          answer:
            "Nous acceptons les paiements par carte bancaire (Visa, MasterCard) via notre passerelle sécurisée, ainsi que les transferts par Mobile Money (T-Money, Flooz) pour nos clients au Togo.",
        },
        {
          question: "Puis-je modifier ou annuler ma commande ?",
          answer:
            "Une fois confirmée, votre commande est directement transmise à notre logistique pour expédition. L'annulation n'est plus possible. Vous pourrez toutefois effectuer un retour après réception.",
        },
      ],
    },
    {
      category: "Livraison",
      items: [
        {
          question: "Quels sont les délais de livraison ?",
          answer:
            "Les livraisons standards s'effectuent sous 24 à 48 heures ouvrées. Un service par coursier privé le jour même est disponible pour Lomé (commandes passées avant 14h).",
        },
        {
          question: "Comment suivre l'acheminement de mon colis ?",
          answer:
            "Dès l'expédition de votre commande, un numéro de suivi vous sera communiqué. Vous pourrez suivre l'état de la livraison directement depuis l'historique de votre compte client.",
        },
      ],
    },
    {
      category: "Retours et Qualité",
      items: [
        {
          question: "Quelle est votre politique de retour ?",
          answer:
            "Vous disposez d'un délai strict de 14 jours francs après réception pour nous retourner un article s'il ne vous convient pas. L'article doit être strictement neuf, non porté et renvoyé dans son emballage d'origine.",
        },
        {
          question: "Authenticité des pièces ?",
          answer:
            "Toutes nos pièces sont directement distribuées par notre atelier. Chaque article est inspecté scrupuleusement avant expédition pour garantir un standard de qualité parfait.",
        },
      ],
    },
  ];

  return (
    <div className="pt-32 pb-32 px-6 min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 text-center sm:text-left border-b border-neutral-100 pb-12">
          <h1 className="text-3xl md:text-4xl font-serif text-black mb-6">
            Support et questions fréquentes
          </h1>
          <p className="text-sm font-medium text-text-muted leading-relaxed max-w-2xl mx-auto sm:mx-0">
            Retrouvez ici les réponses aux questions fréquemment posées. Si vous
            ne trouvez pas l&apos;information recherchée, notre service client
            se tient à votre entière disposition.
          </p>
        </header>

        <div className="space-y-20 mt-16">
          {faqs.map((group) => (
            <section
              key={group.category}
              className="flex flex-col md:flex-row gap-8 md:gap-16"
            >
              <div className="w-full md:w-1/3">
                <h2 className="text-xl font-serif text-black border-l-2 border-black pl-4">
                  {group.category}
                </h2>
              </div>
              <div className="w-full md:w-2/3 flex flex-col gap-10">
                {group.items.map((item) => (
                  <div key={item.question} className="flex flex-col gap-3">
                    <h3 className="text-sm font-bold text-black uppercase tracking-tight">
                      {item.question}
                    </h3>
                    <p className="text-sm font-medium text-text-muted leading-relaxed text-justify">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-24 p-12 bg-neutral-50 border border-neutral-100 text-center flex flex-col items-center gap-6 rounded-sm">
          <h3 className="text-xl font-serif text-black tracking-tight">
            Toujours besoin d&apos;assistance ?
          </h3>
          <p className="text-sm font-medium text-neutral-500 max-w-sm">
            Contactez notre conciergerie dédiée pour une prise en charge
            personnalisée.
          </p>
          <Link href={ROUTES.HOME}>
            <button className="h-12 px-8 border border-black text-black hover:bg-black hover:text-white transition-all text-xs font-bold uppercase tracking-widest rounded-sm mt-4">
              Contactez-nous
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
