"use client";

import { useState } from "react";
import { CheckCircle2, ChevronRight, MapPin, Plus, Trash2 } from "lucide-react";
import { Address } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { useUIStore } from "@/store/ui.store";
import { addAddress } from "@/lib/actions/user.actions";
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
      addToast({ title: "Adresse ajoutee", type: "success" });
      setIsModalOpen(false);
      reset();
      return;
    }

    addToast({ title: "Erreur", description: result.error, type: "danger" });
  };

  return (
    <div className="flex flex-col">
      <header className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div className="flex flex-col gap-2">
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-text-primary">
            Mes adresses
          </h2>
          <p className="text-sm font-medium text-text-muted">
            Gere vos adresses de livraison pour des commandes plus rapides.
          </p>
        </div>

        <Button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="h-12 rounded-sm px-8 font-bold tracking-widest shadow-lg shadow-accent/10 transition-transform hover:scale-105 active:scale-95"
        >
          <Plus className="mr-2 h-5 w-5" />
          Nouvelle adresse
        </Button>
      </header>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {initialAddresses.length > 0 ? (
          initialAddresses.map((address) => (
            <article
              key={address.id}
              className="group relative rounded-sm border border-border bg-surface p-8 shadow-sm transition-all hover:border-accent"
            >
              {address.estParDefaut && (
                <div className="absolute right-8 top-6 flex items-center gap-2 rounded-sm bg-success-bg px-4 py-1.5 text-[10px] font-bold tracking-widest text-success shadow-sm">
                  <CheckCircle2 className="h-3 w-3" />
                  Par defaut
                </div>
              )}

              <div className="mb-8 flex items-start gap-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-surface-alt text-text-hint transition-colors group-hover:bg-accent-light group-hover:text-accent">
                  <MapPin className="h-6 w-6" />
                </div>

                <div className="flex flex-col">
                  <h3 className="font-bold tracking-tight text-text-primary">
                    {address.prenom} {address.nom}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-text-muted">
                    {address.rue}
                  </p>
                  <p className="text-sm font-medium text-text-muted">
                    {address.codePostal} {address.ville}
                  </p>
                  <p className="mt-2 text-[10px] font-bold tracking-widest text-text-hint">
                    {address.pays}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 border-t border-border pt-6">
                <button
                  type="button"
                  className="border-b-2 border-accent/10 pb-0.5 text-xs font-bold tracking-widest text-accent transition-all hover:border-accent"
                >
                  Modifier
                </button>
                {!address.estParDefaut && (
                  <button
                    type="button"
                    className="ml-auto flex items-center gap-1 text-xs font-bold tracking-widest text-text-hint transition-colors hover:text-danger"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Supprimer
                  </button>
                )}
              </div>
            </article>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center gap-4 rounded-sm border-2 border-dashed border-border bg-surface-alt/10 py-20 text-center">
            <MapPin className="h-12 w-12 text-text-hint opacity-20" />
            <p className="text-sm font-semibold tracking-wide text-text-muted">
              Aucune adresse enregistree
            </p>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Ajouter une adresse"
        className="max-w-2xl"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="address-prenom"
                className="text-xs font-bold tracking-widest text-text-muted"
              >
                Prenom
              </label>
              <Input
                id="address-prenom"
                {...register("prenom")}
                error={!!errors.prenom}
                placeholder="Jean"
                className="h-12 rounded-sm"
              />
              {errors.prenom && (
                <p className="text-[10px] font-bold text-danger">
                  {errors.prenom.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label
                htmlFor="address-nom"
                className="text-xs font-bold tracking-widest text-text-muted"
              >
                Nom
              </label>
              <Input
                id="address-nom"
                {...register("nom")}
                error={!!errors.nom}
                placeholder="Dupont"
                className="h-12 rounded-sm"
              />
              {errors.nom && (
                <p className="text-[10px] font-bold text-danger">
                  {errors.nom.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="address-rue"
              className="text-xs font-bold tracking-widest text-text-muted"
            >
              Rue et numero
            </label>
            <Input
              id="address-rue"
              {...register("rue")}
              error={!!errors.rue}
              placeholder="123 rue de Rivoli"
              className="h-12 rounded-sm"
            />
            {errors.rue && (
              <p className="text-[10px] font-bold text-danger">
                {errors.rue.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="address-ville"
                className="text-xs font-bold tracking-widest text-text-muted"
              >
                Ville
              </label>
              <Input
                id="address-ville"
                {...register("ville")}
                error={!!errors.ville}
                placeholder="Paris"
                className="h-12 rounded-sm"
              />
              {errors.ville && (
                <p className="text-[10px] font-bold text-danger">
                  {errors.ville.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label
                htmlFor="address-code-postal"
                className="text-xs font-bold tracking-widest text-text-muted"
              >
                Code postal
              </label>
              <Input
                id="address-code-postal"
                {...register("codePostal")}
                error={!!errors.codePostal}
                placeholder="75001"
                className="h-12 rounded-sm"
              />
              {errors.codePostal && (
                <p className="text-[10px] font-bold text-danger">
                  {errors.codePostal.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="address-telephone"
                className="text-xs font-bold tracking-widest text-text-muted"
              >
                Telephone
              </label>
              <Input
                id="address-telephone"
                {...register("telephone")}
                error={!!errors.telephone}
                placeholder="06 12 34 56 78"
                className="h-12 rounded-sm"
              />
              {errors.telephone && (
                <p className="text-[10px] font-bold text-danger">
                  {errors.telephone.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label
                htmlFor="address-pays"
                className="text-xs font-bold tracking-widest text-text-muted"
              >
                Pays
              </label>
              <Input
                id="address-pays"
                {...register("pays")}
                error={!!errors.pays}
                placeholder="France"
                className="h-12 rounded-sm"
              />
              {errors.pays && (
                <p className="text-[10px] font-bold text-danger">
                  {errors.pays.message}
                </p>
              )}
            </div>
          </div>

          <label className="group flex cursor-pointer items-center gap-3 rounded-sm border border-border bg-surface-alt/30 p-3 transition-all hover:border-accent/40">
            <input
              type="checkbox"
              {...register("estParDefaut")}
              className="h-5 w-5 rounded border-border text-accent focus:ring-accent"
            />
            <span className="text-sm font-bold text-text-primary transition-colors group-hover:text-accent">
              Definir comme adresse par defaut
            </span>
          </label>

          <Button
            type="submit"
            className="mt-4 h-14 w-full rounded-sm text-lg font-bold tracking-widest shadow-xl shadow-accent/10"
          >
            Enregistrer l&apos;adresse
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </form>
      </Modal>
    </div>
  );
}
