import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-32 px-6 min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 text-center sm:text-left border-b border-neutral-100 pb-12">
          <h1 className="text-3xl md:text-4xl font-serif text-black mb-6">
            Confidentialité et politique légale
          </h1>
          <p className="text-sm text-text-muted leading-relaxed max-w-xl mx-auto sm:mx-0 font-medium">
            Velure s&apos;engage à protéger votre vie privée. Voici nos conditions claires et simples, pour une relation de confiance mutuelle.
          </p>
          <div className="mt-8 flex justify-center sm:justify-start">
             <Button variant="outline" className="rounded-sm border-neutral-200 hover:border-black font-medium group px-6 h-12 flex items-center gap-3">
                <Download className="h-4 w-4 text-neutral-400 group-hover:text-black transition-colors" />
                Télécharger notre charte au format PDF
             </Button>
          </div>
        </header>

        <article className="space-y-20 mt-16 bg-transparent">
          <section className="flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="w-full md:w-1/3">
              <h2 className="text-xl font-serif text-black border-l-2 border-black pl-4">1. Notre identité</h2>
            </div>
            <div className="w-full md:w-2/3 text-sm font-medium text-neutral-600 leading-relaxed space-y-4 text-justify">
              <p>
                Le site officiel Velure est géré par la société Velure, basée au quartier administratif de Lomé, au Togo.
              </p>
              <p>
                Vous pouvez nous écrire à <span className="text-black font-bold">contact@velure.tg</span> ou nous appeler au <span className="text-black font-bold">+228 90 00 00 00</span>.
              </p>
            </div>
          </section>

          <section className="flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="w-full md:w-1/3">
              <h2 className="text-xl font-serif text-black border-l-2 border-black pl-4">2. Les commandes et les prix</h2>
            </div>
            <div className="w-full md:w-2/3 text-sm font-medium text-neutral-600 leading-relaxed space-y-4 text-justify">
              <p>
                Nous affichons tous nos tarifs en Francs CFA (FCFA). Ces montants incluent toutes les taxes.
              </p>
              <p>
                Lorsque vous commandez un article sur notre site, nous préparons immédiatement votre colis si la pièce est disponible. L&apos;expédition se fait ensuite directement, sous la forme d&apos;une livraison en 24 à 48 heures.
              </p>
            </div>
          </section>

          <section className="flex flex-col md:flex-row gap-8 md:gap-16">
             <div className="w-full md:w-1/3">
              <h2 className="text-xl font-serif text-black border-l-2 border-black pl-4">3. Vos données personnelles</h2>
            </div>
            <div className="w-full md:w-2/3 text-sm font-medium text-neutral-600 leading-relaxed space-y-4 text-justify">
              <p>
                Pour traiter vos achats, nous avons besoin de votre nom, de votre adresse et de votre numéro de téléphone. Ces informations servent uniquement à préparer votre commande et à vous l&apos;envoyer sans problème.
              </p>
              <p>
                Nous gardons vos données strictement privées. Nous ne les vendrons et ne les donnerons jamais à d&apos;autres entreprises. Seul notre livreur officiel recevra votre adresse pour pouvoir vous remettre votre colis.
              </p>
            </div>
          </section>

          <section className="flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="w-full md:w-1/3">
              <h2 className="text-xl font-serif text-black border-l-2 border-black pl-4">4. Vos paiements</h2>
            </div>
            <div className="w-full md:w-2/3 text-sm font-medium text-neutral-600 leading-relaxed space-y-4 text-justify">
              <p>
                Nous utilisons des systèmes bancaires professionnels pour protéger toutes vos transactions. Que vous payiez par carte bancaire ou par Mobile Money, nous ne voyons jamais et nous ne conservons jamais les codes de vos cartes ni vos mots de passe. Vos transactions financières sont totalement protégées de bout en bout.
              </p>
            </div>
          </section>

          <section className="flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="w-full md:w-1/3">
              <h2 className="text-xl font-serif text-black border-l-2 border-black pl-4">5. Les retours et échanges</h2>
            </div>
            <div className="w-full md:w-2/3 text-sm font-medium text-neutral-600 leading-relaxed space-y-4 text-justify">
              <p>
                Si un vêtement ou un accessoire ne vous plaît pas parfaitement, vous avez 14 jours pour nous le renvoyer.
              </p>
              <p>
                L&apos;article doit simplement rester strictement neuf, non porté et conservé dans son état d&apos;origine. Dès que nous vérifions le retour du produit, nous vous remboursons intégralement le prix de la pièce sur votre compte.
              </p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
