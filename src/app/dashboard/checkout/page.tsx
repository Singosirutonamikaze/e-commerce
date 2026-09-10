"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Lock,
  ShieldCheck,
  Truck,
  MapPin,
} from "lucide-react";
import { Address } from "@prisma/client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ROUTES } from "@/lib/utils/constants/routes";
import { useCart } from "@/hooks/useCart/useCart";
import { formatPrice } from "@/lib/utils/format";
import { getUserAddresses, getUserProfile, addAddress } from "@/lib/actions/user";

export default function CheckoutPage() {
  const { items, subTotal, isEmpty, clearCart } = useCart();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const [formData, setFormData] = useState({
    prenom: "Komla",
    nom: "Koffi",
    telephone: "+228 90 00 00 00",
    rue: "",
    ville: "Lomé",
    codePostal: "00228",
    pays: "Togo",
    complementAdresse: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    async function loadUserData() {
      try {
        const [userProfile, userAddresses] = await Promise.all([
          getUserProfile(),
          getUserAddresses(),
        ]);

        if (userProfile) {
          setFormData((prev) => ({
            ...prev,
            prenom: userProfile.prenom || prev.prenom,
            nom: userProfile.nom || prev.nom,
            telephone: userProfile.telephone || prev.telephone,
          }));
        }

        if (userAddresses && userAddresses.length > 0) {
          setAddresses(userAddresses);
          const defaultAddr =
            userAddresses.find((a) => a.estParDefaut) || userAddresses[0];
          setSelectedAddressId(defaultAddr.id);
        } else {
          setIsAddingNewAddress(true);
        }
      } catch (err) {
        console.error("Erreur chargement données checkout:", err);
      } finally {
        setIsLoadingData(false);
      }
    }

    loadUserData();
  }, []);

  const shippingCost = subTotal > 100000 || subTotal === 0 ? 0 : 5000;
  const total = subTotal + shippingCost;

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      if (isAddingNewAddress || addresses.length === 0) {
        const result = await addAddress({
          prenom: formData.prenom,
          nom: formData.nom,
          telephone: formData.telephone,
          rue: formData.rue,
          ville: formData.ville,
          codePostal: formData.codePostal,
          pays: formData.pays,
          complementAdresse: formData.complementAdresse || undefined,
          estParDefaut: addresses.length === 0,
        });

        if (result?.error) {
          alert(result.error);
          setIsProcessing(false);
          return;
        }
      }

      setTimeout(() => {
        setIsProcessing(false);
        setIsSuccess(true);
        clearCart();
      }, 1200);
    } catch (err) {
      console.error("Erreur checkout:", err);
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center py-12 px-6">
        <div className="w-full max-w-lg border border-slate-800/80 bg-slate-900/60 p-8 md:p-10 text-center backdrop-blur-sm">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h1 className="text-xl font-semibold text-white mb-2">
            Commande validée avec succès
          </h1>
          <p className="text-xs text-slate-400 mb-8 leading-relaxed">
            Merci pour votre commande. Un e-mail de confirmation avec le récapitulatif détaillé et le suivi d&apos;expédition vous a été envoyé.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={ROUTES.DASHBOARD.ORDERS}>
              <Button className="w-full sm:w-auto h-10 px-6 rounded-none bg-white text-slate-950 text-xs font-medium hover:bg-slate-200">
                Voir mes commandes
              </Button>
            </Link>
            <Link href={ROUTES.PRODUCTS}>
              <Button variant="outline" className="w-full sm:w-auto h-10 px-6 rounded-none border-slate-700 bg-slate-950 text-slate-300 text-xs font-medium hover:bg-slate-900 hover:text-white">
                Retour à la boutique
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="py-4 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <Link
          href={ROUTES.CART}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Retour au panier
        </Link>
        <h1 className="text-2xl font-semibold text-white tracking-tight">
          Finalisation de commande
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Paiement sécurisé et vérification des coordonnées de livraison
        </p>
      </div>

      {isEmpty ? (
        <div className="border border-slate-800/80 bg-slate-900/40 p-12 text-center">
          <p className="text-sm text-slate-300 mb-4">Votre panier est vide.</p>
          <Link href={ROUTES.PRODUCTS}>
            <Button className="h-9 px-5 bg-white text-slate-950 text-xs font-medium rounded-none hover:bg-slate-200">
              Découvrir nos collections
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <form onSubmit={handlePay} className="lg:col-span-7 flex flex-col gap-6">
            <div className="border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-slate-400" />
                  <h2 className="text-sm font-medium text-white">
                    Adresse de livraison
                  </h2>
                </div>

                {addresses.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setIsAddingNewAddress(!isAddingNewAddress)}
                    className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 font-medium"
                  >
                    {isAddingNewAddress ? "Choisir une adresse enregistrée" : "+ Nouvelle adresse"}
                  </button>
                )}
              </div>

              {!isAddingNewAddress && addresses.length > 0 ? (
                <div className="space-y-3">
                  {addresses.map((addr) => {
                    const isSelected = selectedAddressId === addr.id;
                    return (
                      <button
                        key={addr.id}
                        type="button"
                        onClick={() => setSelectedAddressId(addr.id)}
                        className={`w-full text-left p-4 border transition-all flex items-start justify-between ${
                          isSelected
                            ? "border-emerald-500 bg-emerald-950/20 text-white"
                            : "border-slate-800 bg-slate-950/40 text-slate-300 hover:border-slate-700"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <MapPin className={`h-4 w-4 mt-0.5 shrink-0 ${isSelected ? "text-emerald-400" : "text-slate-500"}`} />
                          <div className="text-xs space-y-0.5">
                            <p className="font-semibold text-white">
                              {addr.prenom} {addr.nom}
                            </p>
                            <p className="text-slate-400">
                              {addr.rue}
                              {addr.complementAdresse && `, ${addr.complementAdresse}`}
                            </p>
                            <p className="text-slate-400">
                              {addr.codePostal} {addr.ville}, {addr.pays}
                            </p>
                            {addr.telephone && (
                              <p className="text-[11px] text-slate-500 font-mono pt-1">
                                Tél: {addr.telephone}
                              </p>
                            )}
                          </div>
                        </div>

                        {addr.estParDefaut && (
                          <span className="text-[10px] uppercase font-semibold text-emerald-400 border border-emerald-800/50 bg-emerald-950/40 px-1.5 py-0.5">
                            Par défaut
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label htmlFor="prenom" className="block text-slate-400 mb-1.5 font-medium">Prénom</label>
                    <Input
                      id="prenom"
                      required
                      value={formData.prenom}
                      onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                      placeholder="Komla"
                      className="h-9 rounded-none border-slate-800 bg-slate-950 text-xs text-slate-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="nom" className="block text-slate-400 mb-1.5 font-medium">Nom</label>
                    <Input
                      id="nom"
                      required
                      value={formData.nom}
                      onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                      placeholder="Koffi"
                      className="h-9 rounded-none border-slate-800 bg-slate-950 text-xs text-slate-200"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="telephone" className="block text-slate-400 mb-1.5 font-medium">Numéro de téléphone</label>
                    <Input
                      id="telephone"
                      required
                      value={formData.telephone}
                      onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                      placeholder="+228 90 00 00 00"
                      className="h-9 rounded-none border-slate-800 bg-slate-950 text-xs text-slate-200 font-mono"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="adresse" className="block text-slate-400 mb-1.5 font-medium">Rue & Numéro</label>
                    <Input
                      id="adresse"
                      required
                      value={formData.rue}
                      onChange={(e) => setFormData({ ...formData, rue: e.target.value })}
                      placeholder="12 Boulevard du 13 Janvier"
                      className="h-9 rounded-none border-slate-800 bg-slate-950 text-xs text-slate-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="ville" className="block text-slate-400 mb-1.5 font-medium">Ville</label>
                    <Input
                      id="ville"
                      required
                      value={formData.ville}
                      onChange={(e) => setFormData({ ...formData, ville: e.target.value })}
                      placeholder="Lomé"
                      className="h-9 rounded-none border-slate-800 bg-slate-950 text-xs text-slate-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="codePostal" className="block text-slate-400 mb-1.5 font-medium">Code postal / Région</label>
                    <Input
                      id="codePostal"
                      required
                      value={formData.codePostal}
                      onChange={(e) => setFormData({ ...formData, codePostal: e.target.value })}
                      placeholder="00228"
                      className="h-9 rounded-none border-slate-800 bg-slate-950 text-xs text-slate-200"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-slate-400" />
                  <h2 className="text-sm font-medium text-white">
                    Mode de paiement
                  </h2>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                  <Lock className="h-3 w-3" />
                  <span>Chiffré SSL</span>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label htmlFor="cardNum" className="block text-slate-400 mb-1.5 font-medium">Numéro de carte</label>
                  <Input id="cardNum" required placeholder="4000 1234 5678 9010" className="h-9 rounded-none border-slate-800 bg-slate-950 text-xs text-slate-200 font-mono" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cardExp" className="block text-slate-400 mb-1.5 font-medium">Date d&apos;expiration</label>
                    <Input id="cardExp" required placeholder="MM/AA" className="h-9 rounded-none border-slate-800 bg-slate-950 text-xs text-slate-200 font-mono" />
                  </div>
                  <div>
                    <label htmlFor="cardCvc" className="block text-slate-400 mb-1.5 font-medium">CVC</label>
                    <Input id="cardCvc" required placeholder="123" className="h-9 rounded-none border-slate-800 bg-slate-950 text-xs text-slate-200 font-mono" />
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isProcessing || isLoadingData}
              className="w-full h-11 bg-white text-slate-950 text-xs font-medium rounded-none hover:bg-slate-200 transition-colors disabled:opacity-50"
            >
              {isProcessing ? "Traitement en cours..." : `Payer ${formatPrice(total)}`}
            </Button>
          </form>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-sm">
              <h2 className="text-sm font-semibold text-white tracking-tight mb-4">
                Articles ({items.length})
              </h2>
              <div className="divide-y divide-slate-800/60 max-h-72 overflow-y-auto pr-1 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between text-xs">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-slate-200 font-medium">{item.nom}</span>
                      <span className="text-slate-400 text-[11px]">Quantité: {item.quantite}</span>
                    </div>
                    <span className="text-white font-medium tabular-nums">
                      {formatPrice(item.prix * item.quantite)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-800/80 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Sous-total</span>
                  <span className="text-slate-200 tabular-nums">{formatPrice(subTotal)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Livraison</span>
                  <span className={shippingCost === 0 ? "text-emerald-400" : "text-slate-200 tabular-nums"}>
                    {shippingCost === 0 ? "Gratuit" : formatPrice(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-medium text-white pt-2 border-t border-slate-800/80">
                  <span>Total</span>
                  <span className="tabular-nums font-semibold">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Garantie tranquillité et retour sous 14 jours</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}


