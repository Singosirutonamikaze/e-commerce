import { Button } from '@/components/ui/Button'
import { Search, Filter } from 'lucide-react'
import { OrderList } from '@/components/admin/OrderList/OrderList'
import { getOrders } from '@/lib/actions/order.actions'

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-text-primary uppercase mb-2">
            Gestion des <span className="text-accent italic">Commandes</span>
          </h1>
          <p className="text-sm font-medium text-text-muted">
            Suivez l'état des ventes et gérez les expéditions de vos clients.
          </p>
        </div>
        <div className="flex items-center gap-4 bg-surface p-2 rounded-2xl border border-border shadow-sm">
           <div className="px-6 py-2 border-r border-border flex flex-col items-center">
              <span className="text-[10px] font-black uppercase text-text-hint tracking-widest">Aujourd'hui</span>
              <span className="text-xl font-black text-text-primary">12</span>
           </div>
           <div className="px-6 py-2 flex flex-col items-center">
              <span className="text-[10px] font-black uppercase text-text-hint tracking-widest">En attente</span>
              <span className="text-xl font-black text-accent">5</span>
           </div>
        </div>
      </header>

      {/* Filters & Search */}
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-hint" />
          <input 
            type="text" 
            placeholder="Rechercher par N° commande ou client..." 
            className="w-full h-12 pl-12 pr-4 bg-surface-alt/50 rounded-2xl border border-border focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none text-sm font-bold"
          />
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <Button variant="outline" className="h-12 px-6 rounded-2xl font-bold bg-surface-alt/20">
             <Filter className="h-4 w-4 mr-2 text-accent" />
             Filtres
          </Button>
          <select className="h-12 px-6 bg-surface-alt/50 rounded-2xl border border-border text-sm font-bold focus:ring-2 focus:ring-accent/50 outline-none appearance-none cursor-pointer flex-grow md:flex-grow-0">
             <option>Tous les statuts</option>
             <option>CONFIRME</option>
             <option>EXPEDIE</option>
             <option>LIVRE</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <OrderList orders={orders} />
    </div>
  )
}
