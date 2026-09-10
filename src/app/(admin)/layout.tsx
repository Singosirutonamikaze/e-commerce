import { AdminSidebar } from "@/components/layout/AdminSidebar/AdminSidebar";
import { Bell, Search, User, ShieldCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/utils/constants/routes";
import prisma from "@/lib/prisma/client";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(ROUTES.AUTH.LOGIN);
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { role: true },
  });

  if (dbUser?.role !== "ADMIN") {
    redirect(ROUTES.DASHBOARD.ROOT);
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <AdminSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md px-6 md:px-10">
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 group-focus-within:text-white transition-colors" />
              <input
                placeholder="Recherche système..."
                className="w-full h-9 pl-9 pr-4 rounded-sm border border-slate-800 bg-slate-900/60 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-slate-700 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 bg-slate-900/60 px-3 py-1.5 border border-slate-800 rounded-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-xs font-medium text-slate-300">
                Console certifiée
              </span>
            </div>

            <button
              title="Notifications"
              className="relative h-9 w-9 flex items-center justify-center rounded-sm bg-slate-900/60 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white transition-all"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-red-500"></span>
            </button>

            <div className="h-5 w-px bg-slate-800" />

            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-sm bg-slate-900 border border-slate-800">
              <div className="flex flex-col text-right">
                <span className="text-xs font-semibold text-white">
                  Administrateur
                </span>
                <span className="text-[10px] text-slate-400">
                  Contrôle global
                </span>
              </div>
              <div className="h-7 w-7 rounded-sm bg-slate-800 flex items-center justify-center text-slate-200">
                <User className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-10 lg:p-12 bg-slate-950">
          <div className="mx-auto max-w-screen-2xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
