import { AdminSidebar } from "@/components/layout/AdminSidebar/AdminSidebar"
import { Bell, Search, User, ShieldCheck } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ROUTES } from "@/lib/utils/constants/routes"
import prisma from "@/lib/prisma/client"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect(ROUTES.AUTH.LOGIN)
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { role: true }
  })

  if (dbUser?.role !== 'ADMIN') {
    redirect(ROUTES.HOME)
  }

  return (
    <div className="flex min-h-screen bg-neutral-50 text-black">
      <AdminSidebar />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-neutral-200 bg-white px-8 md:px-12 shadow-sm shadow-black/[0.01]">
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400 group-focus-within:text-black" />
              <input
                placeholder="RECHERCHE SYSTÈME..."
                className="w-full h-10 pl-10 pr-6 rounded-sm border border-transparent bg-neutral-50 text-[10px] font-bold uppercase tracking-[0.2em] placeholder:text-neutral-400 focus:outline-none focus:bg-white focus:border-neutral-200 transition-all"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-2 bg-neutral-50 px-4 py-2 border border-neutral-200 rounded-sm">
               <ShieldCheck className="h-3 w-3 text-black" />
               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black">Console Certifiée</span>
            </div>

            <button className="relative h-10 w-10 flex items-center justify-center rounded-sm bg-neutral-50 border border-neutral-200 hover:bg-neutral-100 transition-all">
               <Bell className="h-4 w-4" />
               <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-red-600"></span>
            </button>

            <div className="h-6 w-[1px] bg-neutral-200" />

            <div className="flex items-center gap-3 px-4 py-2 rounded-sm bg-black text-white outline-none">
               <div className="flex flex-col text-right">
                  <span className="text-[10px] font-bold uppercase tracking-[0.1em]">Administrateur</span>
                  <span className="text-[8px] font-bold text-neutral-400 uppercase tracking-[0.2em]">Console de contrôle</span>
               </div>
               <User className="h-4 w-4 text-white" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-10 md:p-16 lg:p-20 bg-neutral-50/50">
          <div className="mx-auto max-w-screen-2xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
