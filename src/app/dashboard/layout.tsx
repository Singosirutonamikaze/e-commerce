import React from "react";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar/DashboardSidebar";
import { DashboardHeader } from "@/components/layout/DashboardHeader/DashboardHeader";
import { CartDrawer } from "@/components/cart/CartDrawer/CartDrawer";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/utils/constants/routes";

export default async function DashboardLayout({
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

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <DashboardSidebar />

      <main className="flex-1">
        <DashboardHeader />
        <CartDrawer />

        <div className="mx-auto w-full max-w-7xl px-4 pb-8 md:px-6 lg:px-8">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
