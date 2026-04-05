import React from "react";
import prisma from "@/lib/prisma/client";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/utils/constants/routes";
import { DashboardAddressesList } from "@/components/dashboard/AddressesList";

export default async function AddressesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(ROUTES.AUTH.LOGIN);
  }

  const addresses = await prisma.address.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col">
      <DashboardAddressesList initialAddresses={addresses} />
    </div>
  );
}
