import { OrderHistory } from "@/components/order";
import { getMyOrders } from "@/lib/actions/order";

export default async function OrdersPage() {
  const orders = await getMyOrders();

  return (
    <div className="flex flex-col gap-6">
      <header className="border-b border-slate-800/80 pb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold text-slate-400">
            Commandes
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-serif text-white tracking-tight">
          Historique des commandes
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Suivez l&apos;état de vos livraisons et consultez le récapitulatif de vos achats.
        </p>
      </header>

      <OrderHistory orders={orders} />
    </div>
  );
}
