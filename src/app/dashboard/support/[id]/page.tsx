import React from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { ROUTES } from "@/lib/utils/constants/routes";
import prisma from "@/lib/prisma/client";
import { ArrowLeft, MessageSquare, BadgeInfo } from "lucide-react";
import { ClientChat } from "@/components/chat/ClientChat/ClientChat";

export default async function SupportTicketPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(ROUTES.AUTH.LOGIN);
  }

  const conversation = await prisma.conversation.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });

  if (!conversation || conversation.userId !== user.id) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div className="flex flex-col gap-4">
          <Link
            href={ROUTES.DASHBOARD.SUPPORT}
            className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Retour à l&apos;assistance
          </Link>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-100 mb-2">
              Discussion support
            </h1>
            <p className="text-xs text-slate-400 pl-3 border-l border-slate-800">
              Ticket #{conversation.id.slice(0, 8).toUpperCase()}
            </p>
            <div className="flex items-center gap-3 mt-3">
              <span
                className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  conversation.statut === "OUVERTE"
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-slate-900 text-slate-400 border border-slate-800"
                }`}
              >
                {conversation.statut === "OUVERTE" ? "En cours" : "Résolu"}
              </span>
              {conversation.ordreId && (
                <Link
                  href={ROUTES.DASHBOARD.ORDER_DETAIL(conversation.ordreId)}
                  className="text-xs text-slate-400 hover:text-slate-200 transition-colors underline underline-offset-4"
                >
                  Commande #{conversation.ordreId.slice(0, 12).toUpperCase()}
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-lg flex items-center gap-4">
          <BadgeInfo className="h-5 w-5 text-slate-400 shrink-0" />
          <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
            Veuillez fournir le maximum de détails pour que notre conciergerie puisse vous assister au mieux.
          </p>
        </div>
      </header>

      <ClientChat conversationId={id} />

      <div className="flex items-center justify-between p-6 bg-slate-950/60 rounded-lg border border-slate-800/80 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-slate-900 border border-slate-800 text-slate-200 rounded-lg flex items-center justify-center">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <h4 className="text-sm font-semibold text-slate-100">
              Besoin d&apos;assistance immédiate ?
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Contactez directement notre conciergerie au +33 (0)1 23 45 67 89
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
