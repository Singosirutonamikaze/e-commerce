import { notFound } from "next/navigation";
import prisma from "@/lib/prisma/client";
import { AdminChat } from "@/components/chat/AdminChat/AdminChat";
import { ChevronLeft, Phone, Mail, Clock, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { formatDate, formatPrice } from "@/lib/utils/format";
import { Badge } from "@/components/ui/Badge";

export default async function AdminSupportDetailPage({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  const { id } = params;

  const conversation = await prisma.conversation.findUnique({
    where: { id },
    include: {
      user: true,
      order: {
        select: { id: true, total: true, statut: true, createdAt: true },
      },
    },
  });

  if (!conversation) notFound();

  return (
    <div className="flex flex-col gap-10">
      <header className="mb-6 flex flex-col gap-4">
        <Link
          href="/admin/support"
          className="flex items-center gap-2 text-xs font-bold uppercase text-accent hover:text-accent-hover tracking-widest transition-colors mb-2 group"
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Retour au support
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold text-text-primary tracking-tighter uppercase leading-tight">
              Discussion avec{" "}
              <span className="text-accent italic">
                {conversation.user.prenom}
              </span>
            </h2>
            <div className="flex items-center gap-4 text-sm font-medium text-text-muted">
              <span className="flex items-center gap-1.5 uppercase font-bold text-xs tracking-widest">
                <Clock className="h-3 w-3" />
                Mise à jour {formatDate(conversation.updatedAt, true)}
              </span>
              <Badge
                variant="accent"
                className="h-5 px-3 rounded-sm text-[9px] font-bold uppercase tracking-widest"
              >
                {conversation.statut}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-3">
          <AdminChat
            conversationId={id}
            customerName={conversation.user.prenom}
          />
        </div>

        <div className="lg:col-span-1 flex flex-col gap-8">
          {/* Customer Profile Sidecard */}
          <section className="bg-surface rounded-sm p-8 border border-border shadow-sm flex flex-col gap-6">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-hint">
              Profil Client
            </h3>
            <div className="flex flex-col items-center text-center gap-4">
              <div className="h-20 w-20 rounded-sm bg-accent-light text-accent flex items-center justify-center font-bold text-lg shadow-sm">
                {conversation.user.prenom[0]}
                {conversation.user.nom[0]}
              </div>
              <div>
                <h4 className="font-bold text-text-primary text-lg">
                  {conversation.user.prenom} {conversation.user.nom}
                </h4>
                <p className="text-xs text-text-muted font-medium mb-4">
                  Client depuis{" "}
                  {new Date(conversation.user.createdAt).getFullYear()}
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-border">
              <div className="flex items-center gap-3 text-xs font-bold text-text-muted transition-colors hover:text-accent cursor-pointer group">
                <Mail className="h-4 w-4 text-text-hint group-hover:text-accent" />
                <span>{conversation.user.email}</span>
              </div>
              {conversation.user.telephone && (
                <div className="flex items-center gap-3 text-xs font-bold text-text-muted">
                  <Phone className="h-4 w-4 text-text-hint" />
                  <span>{conversation.user.telephone}</span>
                </div>
              )}
            </div>
          </section>

          {/* Linked Order Case */}
          {conversation.order && (
            <section className="bg-surface rounded-sm p-8 border border-border shadow-sm flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-hint">
                  Commande Liée
                </h3>
                <ShoppingBag className="h-4 w-4 text-accent" />
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-bold text-text-primary uppercase tracking-tighter text-sm">
                  #{conversation.order.id.slice(0, 12)}
                </p>
                <p className="text-xs text-text-muted font-medium">
                  Passée le {formatDate(conversation.order.createdAt)}
                </p>
                <div className="flex items-center justify-between mt-4 bg-surface-alt/50 p-4 rounded-sm">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold uppercase text-text-hint tracking-widest mb-1">
                      Status
                    </span>
                    <Badge
                      variant="warning"
                      className="h-5 px-2 text-[8px] font-bold"
                    >
                      {conversation.order.statut}
                    </Badge>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[9px] font-bold uppercase text-text-hint tracking-widest mb-1">
                      Montant
                    </span>
                    <span className="font-bold text-accent text-lg">
                      {formatPrice(Number(conversation.order.total))}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/admin/orders/${conversation.order.id}`}
                  className="mt-4"
                >
                  <button className="w-full h-12 bg-white border border-border hover:border-accent hover:text-accent rounded-sm text-xs font-bold uppercase tracking-widest transition-all">
                    Détails Commande
                  </button>
                </Link>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
