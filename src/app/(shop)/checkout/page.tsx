import React from 'react'
import { ShieldCheck, Truck, Lock } from 'lucide-react'

export default function CheckoutPage() {
  return (
    <main className="pt-32 pb-24 px-6 md:px-12 min-h-screen bg-neutral-50 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white p-12 border border-neutral-100 rounded-sm shadow-xl shadow-black/[0.02] flex flex-col gap-10">
        <header className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black">Protocole de Paiement</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-black uppercase">
            Finalisation de Commande
          </h1>
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest leading-relaxed">
            Votre session est sécurisée par cryptage de niveau bancaire.
          </p>
        </header>

        <div className="flex flex-col gap-6">
          <div className="p-6 bg-neutral-50 border border-neutral-100 rounded-sm flex flex-col gap-4">
             <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-black text-white rounded-sm flex items-center justify-center">
                   <Lock className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                   <span className="text-[10px] font-bold uppercase tracking-widest text-black">Système Certifié</span>
                   <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-neutral-400">Authenticité Garantie</span>
                </div>
             </div>
             <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest leading-relaxed mt-2 border-t border-neutral-100 pt-4">
               Cette section est actuellement en phase finale de déploiement sécurisé. 
               Veuillez patienter pendant la calibration du tunnel d&apos;acquisition.
             </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="flex flex-col gap-2 p-5 border border-neutral-100 rounded-sm text-center">
                <Truck className="h-4 w-4 mx-auto text-black" />
                <span className="text-[8px] font-bold uppercase tracking-widest text-neutral-400">Expédition Pro</span>
             </div>
             <div className="flex flex-col gap-2 p-5 border border-neutral-100 rounded-sm text-center">
                <ShieldCheck className="h-4 w-4 mx-auto text-black" />
                <span className="text-[8px] font-bold uppercase tracking-widest text-neutral-400">Paiement 3D-S</span>
             </div>
          </div>
        </div>
      </div>
    </main>
  )
}
