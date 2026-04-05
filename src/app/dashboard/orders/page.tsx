import { OrderHistory } from "@/components/order/OrderHistory";
import { getMyOrders } from "@/lib/actions/order.actions";

export default async function OrdersPage() {
  const orders = await getMyOrders();

  return (
    <div className="flex flex-col">
      <header className="mb-10">
        <h2 className="text-2xl font-black text-text-primary tracking-tighter uppercase mb-2">
          Historique des <span className="text-accent italic">commandes</span>
        </h2>
        <p className="text-sm font-medium text-text-muted">
          Suivez l&apos;état de vos achats et gérez vos factures.
        </p>
      </header>

      <OrderHistory orders={orders} />
    </div>
  );
}
