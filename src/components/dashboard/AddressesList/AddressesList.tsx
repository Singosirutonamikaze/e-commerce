"use client";

import { useState } from "react";
import { CheckCircle2, MapPin, Plus, Trash2 } from "lucide-react";
import { Address } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { useUIStore } from "@/store/ui/ui.store";
import { addAddress } from "@/lib/actions/user";
import { addressSchema, AddressInput } from "@/lib/utils/validators";

interface DashboardAddressesListProps {
  initialAddresses: Address[];
}

export function DashboardAddressesList({
  initialAddresses,
}: Readonly<DashboardAddressesListProps>) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToast } = useUIStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddressInput>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      prenom: "",
      nom: "",
      telephone: "",
      rue: "",
      ville: "",
      codePostal: "",
      pays: "",
      complementAdresse: "",
      estParDefaut: false,
    },
  });

  const onSubmit = async (data: AddressInput) => {
    const result = await addAddress(data);

    if (result.success) {
      addToast({ title: "Adresse ajoutée avec succès", type: "success" });
      setIsModalOpen(false);
      reset();
      return;
    }

    addToast({ title: "Erreur", description: result.error, type: "danger" });
  };

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-slate-400">
              Coordonnées
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif text-white tracking-tight">
            Mes adresses de livraison
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Gérez vos lieux d&apos;expédition pour faciliter vos prochaines commandes.
          </p>
        </div>

        <Button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="h-9 px-4 font-semibold text-xs bg-white text-slate-950 hover:bg-slate-200 rounded-lg flex items-center gap-1.5 transition-all"
        >
          <Plus className="h-3.5 w-3.5" />
          Nouvelle adresse
        </Button>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {initialAddresses.length > 0 ? (
          initialAddresses.map((address) => (
            <article
              key={address.id}
              className="relative border border-slate-800/80 bg-slate-950/60 backdrop-blur-md p-6 rounded-lg flex flex-col justify-between gap-5 hover:border-slate-700 transition-all"
            >
              {address.estParDefaut && (
                <div className="absolute right-6 top-6 flex items-center gap-1.5 bg-emerald-950/40 text-emerald-400 border border-emerald-800/50 px-2.5 py-0.5 text-[10px] font-medium rounded-md">
                  <CheckCircle2 className="h-3 w-3" />
                  Adresse par défaut
                </div>
              )}

              <div className="flex items-start gap-4">
                <div className="flex h-9 w-9 items-center justify-center bg-slate-900 border border-slate-800 text-slate-400 shrink-0 rounded-lg">
                  <MapPin className="h-4 w-4" />
                </div>

                <div className="flex flex-col gap-0.5">
                  <h3 className="font-semibold text-white text-sm">
                    {address.prenom} {address.nom}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {address.rue}
                  </p>
                  <p className="text-xs text-slate-400">
                    {address.codePostal} {address.ville}
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono mt-1">
                    {address.pays}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-800/80 pt-4">
                <button
                  type="button"
                  className="text-xs font-semibold text-white hover:text-slate-300 transition-colors"
                >
                  Modifier
                </button>
                {!address.estParDefaut && (
                  <button
                    type="button"
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Supprimer
                  </button>
                )}
              </div>
            </article>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center gap-4 border border-slate-800/80 bg-slate-950/60 backdrop-blur-md py-16 text-center p-8 rounded-lg">
            <div className="h-12 w-12 bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 rounded-lg">
              <MapPin className="h-6 w-6 opacity-50" />
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              Aucune adresse enregistrée dans votre carnet.
            </p>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Ajouter une adresse"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="modal_prenom" className="block text-xs font-medium text-slate-400 mb-1">Prénom</label>
              <Input
                id="modal_prenom"
                placeholder="Ex: Komla"
                className="rounded-lg border-slate-800 bg-slate-900 text-xs text-slate-200"
                error={!!errors.prenom}
                {...register("prenom")}
              />
            </div>
            <div>
              <label htmlFor="modal_nom" className="block text-xs font-medium text-slate-400 mb-1">Nom</label>
              <Input
                id="modal_nom"
                placeholder="Ex: Koffi"
                className="rounded-lg border-slate-800 bg-slate-900 text-xs text-slate-200"
                error={!!errors.nom}
                {...register("nom")}
              />
            </div>
          </div>

          <div>
            <label htmlFor="modal_telephone" className="block text-xs font-medium text-slate-400 mb-1">Téléphone</label>
            <Input
              id="modal_telephone"
              placeholder="Ex: +228 90 00 00 00"
              className="rounded-lg border-slate-800 bg-slate-900 text-xs text-slate-200 font-mono"
              error={!!errors.telephone}
              {...register("telephone")}
            />
          </div>

          <div>
            <label htmlFor="modal_rue" className="block text-xs font-medium text-slate-400 mb-1">Adresse / Rue</label>
            <Input
              id="modal_rue"
              placeholder="Ex: Boulevard du 13 Janvier"
              className="rounded-lg border-slate-800 bg-slate-900 text-xs text-slate-200"
              error={!!errors.rue}
              {...register("rue")}
            />
          </div>

          <div>
            <label htmlFor="modal_complement" className="block text-xs font-medium text-slate-400 mb-1">Complément d&apos;adresse (Optionnel)</label>
            <Input
              id="modal_complement"
              placeholder="Ex: Appartement 4B, 2ème étage"
              className="rounded-lg border-slate-800 bg-slate-900 text-xs text-slate-200"
              error={!!errors.complementAdresse}
              {...register("complementAdresse")}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="modal_ville" className="block text-xs font-medium text-slate-400 mb-1">Ville</label>
              <Input
                id="modal_ville"
                placeholder="Ex: Lomé"
                className="rounded-lg border-slate-800 bg-slate-900 text-xs text-slate-200"
                error={!!errors.ville}
                {...register("ville")}
              />
            </div>
            <div>
              <label htmlFor="modal_codePostal" className="block text-xs font-medium text-slate-400 mb-1">Code postal</label>
              <Input
                id="modal_codePostal"
                placeholder="Ex: 00228"
                className="rounded-lg border-slate-800 bg-slate-900 text-xs text-slate-200"
                error={!!errors.codePostal}
                {...register("codePostal")}
              />
            </div>
          </div>

          <div>
            <label htmlFor="modal_pays" className="block text-xs font-medium text-slate-400 mb-1">Pays</label>
            <Input
              id="modal_pays"
              placeholder="Ex: Togo"
              className="rounded-lg border-slate-800 bg-slate-900 text-xs text-slate-200"
              error={!!errors.pays}
              {...register("pays")}
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="estParDefaut"
              className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-emerald-400 focus:ring-0"
              {...register("estParDefaut")}
            />
            <label htmlFor="estParDefaut" className="text-xs text-slate-300">
              Définir comme adresse de livraison par défaut
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(false)}
              className="rounded-lg border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              size="sm"
              className="rounded-lg bg-white text-slate-950 hover:bg-slate-200 font-medium"
            >
              Enregistrer l&apos;adresse
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
