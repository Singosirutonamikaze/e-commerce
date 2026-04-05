import { Button } from '@/components/ui/Button'
import { Search, Filter, ChevronRight, Activity } from 'lucide-react'
import { OrderList } from '@/components/admin/OrderList/OrderList'
import { getOrders } from '@/lib/actions/order.actions'
import { Card } from '@/components/ui/Card'

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <div className="flex flex-col gap-10 max-w-screen-2xl mx-auto">
      {/* Pro Header Section */}
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
             <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">Logistique Système</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-black uppercase">
            Flux des Commandes
          </h1>
        </div>

        {/* Status Highlights - Pro System Cards */}
        <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-sm border border-neutral-200">
           <div className="bg-white px-8 py-3 rounded-sm border border-neutral-100 flex flex-col items-center gap-1">
              <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">Aujourd&apos;hui</span>
              <span className="text-xl font-bold text-black tabular-nums">12</span>
           </div>
           <div className="bg-white px-8 py-3 rounded-sm border border-neutral-100 flex flex-col items-center gap-1">
              <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">En attente</span>
              <div className="flex items-center gap-2">
                 <div className="h-1.5 w-1.5 rounded-full bg-black"></div>
                 <span className="text-xl font-bold text-black tabular-nums">5</span>
              </div>
           </div>
        </div>
      </header>

      {/* Professional Filter Infrastructure */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-2 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
          <input 
            type="text" 
            placeholder="RECHERCHER PAR N° TRANSACTION..." 
            className="w-full h-12 pl-12 pr-6 bg-white rounded-sm border border-neutral-200 text-[10px] font-bold uppercase tracking-widest placeholder:text-neutral-400 focus:outline-none focus:border-black transition-all"
          />
        </div>
        <div className="lg:col-span-1 relative">
           <Activity className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
           <select className="w-full h-12 pl-12 pr-10 bg-white rounded-sm border border-neutral-200 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-black transition-all appearance-none cursor-pointer">
              <option>TOUS LES STATUTS</option>
              <option>CONFIRME</option>
              <option>EXPEDIE</option>
              <option>LIVRE</option>
           </select>
           <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400 rotate-90" />
        </div>
        <div className="lg:col-span-1 border border-neutral-200 bg-white rounded-sm h-12 flex items-center justify-center">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-neutral-400">Index de {orders.length} Flux</span>
        </div>
      </div>

      {/* Orders List Container - Sharp & Focused */}
      <Card className="rounded-sm border border-neutral-200 shadow-sm overflow-hidden bg-white">
        <OrderList orders={orders} />
      </Card>
    </div>
  )
}
