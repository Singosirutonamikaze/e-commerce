import React from 'react'
import { AccountSidebar } from '@/components/layout/AccountSidebar/AccountSidebar'

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="pt-32 pb-24 px-6 min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-black tracking-tighter text-text-primary uppercase">
            Mon Espace <span className="text-accent italic">Velure</span>
          </h1>
          <p className="text-text-muted font-medium">Gérez votre compte, vos commandes et vos préférences.</p>
          <div className="h-0.5 w-16 bg-accent mt-8 rounded-full"></div>
        </header>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
          <AccountSidebar />
          <div className="flex-grow">
            {children}
          </div>
        </div>
      </div>
    </main>
  )
}
