import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { ChevronLeft, CreditCard, MapPin, Package, Truck } from "lucide-react";

import prisma from "@/lib/prisma/client";
import { createClient } from "@/lib/supabase/server";
import { formatDate, formatPrice } from "@/lib/utils/format";
import { ROUTES } from "@/lib/utils/constants/routes";
import { Badge } from "@/components/ui/Badge";

export default async function OrderDetailPage({
  params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(ROUTES.AUTH.LOGIN);
  }

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      orderItems: true,
      adresse: true,
      promo: true,
      user: true,
    },
  });

  if (!order || order.userId !== user.id) {
    notFound();
  }

  let badgeVariant: "success" | "danger" | "accent" | "warning" = "warning";
  if (order.statut === "LIVRE") {
    badgeVariant = "success";
  } else if (order.statut === "ANNULE") {
    badgeVariant = "danger";
  } else if (order.statut === "EXPEDIE") {
    badgeVariant = "accent";
  }

  return (
    <div className="flex flex-col gap-10">
      <header className="mb-6 flex flex-col gap-4">
        <Link
          href={ROUTES.DASHBOARD.ORDERS}
          className="mb-2 flex items-center gap-2 text-xs font-bold tracking-widest text-accent transition-colors hover:text-accent-hover"
        >
          <ChevronLeft className="h-4 w-4" />
          Retour aux commandes
        </Link>

        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="flex flex-col gap-2">
            <h1 className="mb-2 text-xl font-bold uppercase tracking-tight text-text-primary md:text-2xl">
              Details de commande
            </h1>
            <p className="border-l border-border pl-4 text-[10px] font-bold uppercase tracking-widest text-text-hint">
              ID session: {order.id.slice(0, 8).toUpperCase()}
            </p>
            <p className="text-sm font-medium text-text-muted">
              Passee le{" "}
              <span className="font-bold text-text-primary">
                {formatDate(order.createdAt, true)}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-text-hint">
              #{order.id.slice(0, 12).toUpperCase()}
            </span>
            <Badge
              variant={badgeVariant}
              className="h-8 rounded-sm px-4 text-[10px] font-bold tracking-widest"
            >
              {order.statut}
            </Badge>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="flex flex-col gap-8 lg:col-span-2">
          <section className="overflow-hidden rounded-sm border border-border bg-surface shadow-sm">
            <div className="flex items-center gap-3 border-b border-border bg-surface-alt/50 px-8 py-6">
              <Package className="h-5 w-5 text-accent" />
              <h3 className="text-sm font-bold tracking-widest text-text-primary">
                Articles commandes
              </h3>
            </div>

            <div className="flex flex-col">
              {order.orderItems.map((item) => (
                <div
                  key={item.id}
                  className="group flex gap-6 border-b border-border p-8 transition-all last:border-0 hover:bg-surface-alt/20"
                >
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-sm border border-border bg-surface-alt">
                    <Image
                      src={item.imageProduit || "/placeholder.png"}
                      alt={item.nomProduit}
                      fill
                      sizes="80px"
                      className="object-cover transition-transform group-hover:scale-110"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div>
                      <h4 className="text-lg font-bold text-text-primary transition-colors group-hover:text-accent">
                        {item.nomProduit}
                      </h4>
                      <p className="text-sm font-medium text-text-muted">
                        Quantite: x{item.quantite}
                      </p>
                    </div>
                    <p className="text-lg font-bold text-text-primary">
                      {formatPrice(Number(item.prixUnitaire) * item.quantite)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="flex flex-col items-center gap-8 rounded-sm border border-border bg-white p-8 shadow-sm sm:flex-row">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-sm bg-accent-light text-accent">
              <Truck className="h-8 w-8" />
            </div>
            <div>
              <h3 className="mb-1 text-lg font-bold text-text-primary">
                Suivi de livraison
              </h3>
              <p className="mb-4 text-sm font-medium text-text-muted">
                Votre commande{" "}
                {order.statut === "CONFIRME"
                  ? "est en preparation"
                  : "arrive bientot"}
                .
              </p>
              <Link href={ROUTES.DASHBOARD.SUPPORT}>
                <span className="border-b-2 border-accent/20 pb-1 text-xs font-bold tracking-widest text-accent transition-all hover:border-accent">
                  Besoin d&apos;aide ?
                </span>
              </Link>
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-10 lg:col-span-1">
          <section className="rounded-sm border border-border bg-surface p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <MapPin className="h-5 w-5 text-accent" />
              <h3 className="text-sm font-bold tracking-widest text-text-primary">
                Livraison
              </h3>
            </div>

            <div className="text-sm font-medium leading-relaxed text-text-muted">
              <p className="mb-1 font-bold text-text-primary">
                {order.adresse.prenom} {order.adresse.nom}
              </p>
              <p>{order.adresse.rue}</p>
              {order.adresse.complementAdresse && (
                <p>{order.adresse.complementAdresse}</p>
              )}
              <p>
                {order.adresse.codePostal} {order.adresse.ville}
              </p>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-text-primary">
                {order.adresse.pays}
              </p>
            </div>
          </section>

          <section className="relative overflow-hidden rounded-sm border border-border bg-surface p-8 shadow-sm">
            <div className="absolute right-0 top-0 h-24 w-24 translate-x-12 -translate-y-12 rounded-sm bg-accent/5 blur-2xl"></div>

            <div className="relative z-10 mb-8 flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-accent" />
              <h3 className="text-sm font-bold tracking-tight text-text-primary">
                Recapitulatif financier
              </h3>
            </div>

            <div className="mb-8 space-y-4">
              <div className="flex items-center justify-between text-sm font-medium">
                <span className="text-text-muted">Sous-total</span>
                <span className="font-bold text-text-primary">
                  {formatPrice(Number(order.sousTotal))}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm font-medium">
                <span className="text-text-muted">Livraison</span>
                <span
                  className={
                    Number(order.fraisLivraison) === 0
                      ? "font-bold text-success"
                      : "font-bold text-text-primary"
                  }
                >
                  {Number(order.fraisLivraison) === 0
                    ? "Gratuit"
                    : formatPrice(Number(order.fraisLivraison))}
                </span>
              </div>

              {order.montantReduction !== null &&
                Number(order.montantReduction) > 0 && (
                  <div className="flex items-center justify-between text-sm font-bold text-success">
                    <span>Reduction promo</span>
                    <span>-{formatPrice(Number(order.montantReduction))}</span>
                  </div>
                )}
            </div>

            <hr className="mb-6 border-border" />

            <div className="flex items-end justify-between">
              <span className="text-sm font-bold tracking-tighter text-text-primary">
                Total paye
              </span>
              <span className="text-3xl font-bold text-accent">
                {formatPrice(Number(order.total))}
              </span>
            </div>

            {order.promo && (
              <p className="mt-6 rounded-xl bg-success-bg p-2 text-center text-[10px] font-bold uppercase tracking-widest text-success">
                Code utilise: {order.promo.code}
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
