"use client";

import React, { useState } from "react";
import { LogOut, AlertTriangle, X } from "lucide-react";
import { logout } from "@/lib/actions/user";
import { cn } from "@/lib/utils/cn";

interface LogoutButtonWithModalProps {
  isCollapsed?: boolean;
  className?: string;
}

export function LogoutButtonWithModal({
  isCollapsed = false,
  className,
}: Readonly<LogoutButtonWithModalProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleLogout = async () => {
    setIsPending(true);
    await logout();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={cn(
          "group flex items-center h-9 w-full px-3 text-slate-400 hover:text-rose-400 hover:bg-rose-950/20 transition-all text-xs border border-transparent hover:border-rose-900/40",
          isCollapsed && "justify-center px-0",
          className,
        )}
      >
        <LogOut
          className={cn(
            "h-4 w-4 shrink-0 transition-transform group-hover:-translate-x-0.5",
            !isCollapsed && "mr-3",
          )}
        />
        {!isCollapsed && <span>Déconnexion</span>}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 p-6 flex flex-col gap-5 text-slate-100">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-start gap-3">
              <div className="h-9 w-9 bg-rose-950/60 border border-rose-800/80 text-rose-400 flex items-center justify-center shrink-0">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semibold text-white">
                  Confirmer la déconnexion
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Êtes-vous certain de vouloir quitter votre session ? Vos paniers et préférences restent sauvegardés.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={isPending}
                className="h-8 px-4 text-xs font-medium text-slate-300 hover:text-white border border-slate-700 bg-slate-800/60 hover:bg-slate-800 transition-all"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleLogout}
                disabled={isPending}
                className="h-8 px-4 text-xs font-medium text-white bg-rose-600 hover:bg-rose-500 transition-all flex items-center gap-1.5 disabled:opacity-50"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>{isPending ? "Déconnexion..." : "Se déconnecter"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
