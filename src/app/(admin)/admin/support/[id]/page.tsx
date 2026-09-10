import { notFound } from "next/navigation";
import prisma from "@/lib/prisma/client";
import { AdminChat } from "@/components/chat/AdminChat/AdminChat";
import { ChevronLeft, Phone, Mail, Clock, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { formatDate, formatPrice } from "@/lib/utils/format";

export default async function AdminSupportDetailPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;

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
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-4">
        <Link
          href="/admin/support"
          className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors group"
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Retour au support
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
              Discussion avec {conversation.user.prenom} {conversation.user.nom}
            </h1>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                Mise à jour {formatDate(conversation.updatedAt, true)}
              </span>
              <span
                className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  conversation.statut === "OUVERTE"
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-slate-900 text-slate-400 border border-slate-800"
                }`}
              >
                {conversation.statut === "OUVERTE" ? "En cours" : "Résolu"}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <AdminChat
            conversationId={id}
            customerName={conversation.user.prenom}
          />
        </div>

        <div className="lg:col-span-1 flex flex-col gap-6">
          <section className="bg-slate-950/60 rounded-lg p-6 border border-slate-800/80 shadow-sm flex flex-col gap-5">
            <h3 className="text-xs font-semibold text-slate-400">
              Profil Client
            </h3>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="h-16 w-16 rounded-full bg-slate-900 border border-slate-800 text-slate-200 flex items-center justify-center font-semibold text-lg shadow-sm">
                {conversation.user.prenom[0]}
                {conversation.user.nom[0]}
              </div>
              <div>
                <h4 className="font-semibold text-slate-100 text-base">
                  {conversation.user.prenom} {conversation.user.nom}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Client depuis {new Date(conversation.user.createdAt).getFullYear()}
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-800/80">
              <div className="flex items-center gap-2.5 text-xs text-slate-400 hover:text-slate-200 transition-colors">
                <Mail className="h-4 w-4 text-slate-500" />
                <span className="truncate">{conversation.user.email}</span>
              </div>
              {conversation.user.telephone && (
                <div className="flex items-center gap-2.5 text-xs text-slate-400">
                  <Phone className="h-4 w-4 text-slate-500" />
                  <span>{conversation.user.telephone}</span>
                </div>
              )}
            </div>
          </section>

          {conversation.order && (
            <section className="bg-slate-950/60 rounded-lg p-6 border border-slate-800/80 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold text-slate-400">
                  Commande liée
                </h3>
                <ShoppingBag className="h-4 w-4 text-slate-400" />
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-medium text-slate-200 text-sm">
                  #{conversation.order.id.slice(0, 12)}
                </p>
                <p className="text-xs text-slate-500">
                  Passée le {formatDate(conversation.order.createdAt)}
                </p>
                <div className="flex items-center justify-between mt-2 bg-slate-900/60 border border-slate-800/80 p-3 rounded-lg">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 mb-0.5">
                      Statut
                    </span>
                    <span className="text-xs font-medium text-slate-300">
                      {conversation.order.statut}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-slate-500 mb-0.5">
                      Montant
                    </span>
                    <span className="font-semibold text-slate-100 text-sm">
                      {formatPrice(Number(conversation.order.total))}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/admin/orders/${conversation.order.id}`}
                  className="mt-2"
                >
                  <button className="w-full h-10 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/80 rounded-lg text-xs font-medium text-slate-200 transition-all">
                    Détails de la commande
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
