import React from 'react'
import { AccountSidebar } from '@/components/layout/AccountSidebar/AccountSidebar'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ROUTES } from '@/lib/utils/constants/routes'

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect(ROUTES.AUTH.LOGIN)
  }

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <AccountSidebar />
      
      <main className="flex-1 p-8 md:p-12 lg:p-16">
        <div className="max-w-5xl mx-auto">
          <header className="mb-12">
            <div className="flex items-center gap-2 mb-2">
               <div className="h-1 w-4 bg-black"></div>
               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">Espace Privé</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-black uppercase">
              Tableau de bord
            </h1>
          </header>
          
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
