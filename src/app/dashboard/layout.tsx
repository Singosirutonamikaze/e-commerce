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
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <DashboardSidebar />

      <main className="flex-1 min-w-0 flex flex-col">
        <DashboardHeader />
        <CartDrawer />

        <div className="mx-auto w-full max-w-full px-4 pb-12 md:px-8 flex-1">
          <div>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
