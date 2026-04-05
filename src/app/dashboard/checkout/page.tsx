import React from "react";
import { ShieldCheck, Truck, Lock } from "lucide-react";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-neutral-50 px-6 pb-24 pt-24 md:px-12">
      <div className="mx-auto flex w-full max-w-xl flex-col gap-10 rounded-sm border border-neutral-100 bg-white p-12 shadow-xl shadow-black/2">
        <header className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black">
              Protocole de Paiement
            </span>
          </div>
          <h1 className="text-xl font-bold uppercase tracking-tight text-black md:text-2xl">
            Finalisation de Commande
          </h1>
          <p className="text-xs font-bold uppercase tracking-widest leading-relaxed text-neutral-400">
            Votre session est securisee par cryptage de niveau bancaire.
          </p>
        </header>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 rounded-sm border border-neutral-100 bg-neutral-50 p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-black text-white">
                <Lock className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-black">
                  Systeme Certifie
                </span>
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                  Authenticite Garantie
                </span>
              </div>
            </div>
            <p className="mt-2 border-t border-neutral-100 pt-4 text-[10px] font-bold uppercase tracking-widest leading-relaxed text-neutral-500">
              Cette section est actuellement en phase finale de deploiement
              securise. Veuillez patienter pendant la calibration du tunnel d
              acquisition.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2 rounded-sm border border-neutral-100 p-5 text-center">
              <Truck className="mx-auto h-4 w-4 text-black" />
              <span className="text-[8px] font-bold uppercase tracking-widest text-neutral-400">
                Expedition Pro
              </span>
            </div>
            <div className="flex flex-col gap-2 rounded-sm border border-neutral-100 p-5 text-center">
              <ShieldCheck className="mx-auto h-4 w-4 text-black" />
              <span className="text-[8px] font-bold uppercase tracking-widest text-neutral-400">
                Paiement 3D-S
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
