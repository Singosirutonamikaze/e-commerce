import React from 'react';

export default function ShippingPage() {
  return (
    <div className="pt-32 pb-32 px-6 min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 text-center sm:text-left border-b border-neutral-100 pb-12">
          <h1 className="text-3xl md:text-4xl font-serif text-black mb-6">
            Expédition et livraison
          </h1>
          <p className="text-sm font-medium text-text-muted leading-relaxed max-w-2xl mx-auto sm:mx-0">
            Nous préparons vos commandes avec soin.
            Voici nos méthodes, tarifs et délais pour l&apos;envoi de vos pièces.
          </p>
        </header>

        <article className="space-y-20 mt-16 bg-transparent">
          <section className="flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="w-full md:w-1/3">
               <h2 className="text-xl font-serif text-black border-l-2 border-black pl-4">Livraison standard (Togo)</h2>
            </div>
            <div className="w-full md:w-2/3 flex flex-col gap-6">
               <div className="flex flex-col gap-1">
                 <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Délai estimé</p>
                 <p className="text-sm font-bold text-black">24 à 48 heures ouvrées</p>
               </div>
               <div className="flex flex-col gap-1">
                 <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Tarif</p>
                 <p className="text-sm font-bold text-black">5 000 FCFA</p>
               </div>
               <p className="text-xs font-medium text-text-muted pt-4 border-t border-neutral-100 mt-2">
                 Expédition offerte pour toute commande dont le montant est supérieur à 100 000 FCFA.
               </p>
            </div>
          </section>

          <section className="flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="w-full md:w-1/3">
               <h2 className="text-xl font-serif text-black border-l-2 border-black pl-4">Express coursier (Lomé)</h2>
            </div>
            <div className="w-full md:w-2/3 flex flex-col gap-6">
               <div className="flex flex-col gap-1">
                 <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Délai estimé</p>
                 <p className="text-sm font-bold text-black">Livraison le jour même (avant 14h)</p>
               </div>
               <div className="flex flex-col gap-1">
                 <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Tarif</p>
                 <p className="text-sm font-bold text-black">10 000 FCFA</p>
               </div>
               <p className="text-xs font-medium text-text-muted pt-4 border-t border-neutral-100 mt-2">
                 Service exclusif de livraison rapide par coursier privé, réservé aux clients résidant à Lomé.
               </p>
            </div>
          </section>

          <section className="flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="w-full md:w-1/3">
               <h2 className="text-xl font-serif text-black border-l-2 border-black pl-4">Processus d&apos;expédition</h2>
            </div>
            <div className="w-full md:w-2/3 text-sm font-medium text-neutral-600 leading-relaxed space-y-4 text-justify">
              <p>
                Toute commande validée avant 14h00 (heure de Lomé) est traitée par notre atelier d&apos;expédition le jour même. 
                Les commandes validées après cet horaire seront systématiquement expédiées le jour ouvré suivant.
              </p>
              <p>
                Un email automatique contenant votre numéro de suivi vous sera envoyé dès que votre colis aura été confié 
                à notre partenaire de transport. Chaque pièce expédiée fait l&apos;objet d&apos;un contrôle de qualité approfondi 
                afin de garantir un état parfait à réception.
              </p>
              <p className="p-4 bg-white rounded-sm border border-neutral-100 italic text-black">
                Pour toute urgence ou demande d&apos;expédition internationale en dehors du territoire, veuillez contacter 
                directement notre service client préalablement à votre commande.
              </p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
