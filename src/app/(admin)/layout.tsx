import { AdminSidebar } from "@/components/layout/AdminSidebar/AdminSidebar"
import { ShoppingBag, Bell, Search, User } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-bg-surface-alt">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Admin Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-surface px-8 shadow-sm">
          <div className="flex-1 max-w-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-hint" />
              <Input
                placeholder="Rechercher..."
                className="pl-10 h-10 border-transparent bg-surface-alt focus-visible:bg-surface focus-visible:border-border"
              />
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <Button variant="ghost" size="icon" className="relative text-text-muted hover:text-accent">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-danger ring-2 ring-surface"></span>
            </Button>
            <div className="flex items-center space-x-3 px-2 py-1 rounded-full border border-border hover:bg-surface-alt transition-all cursor-pointer group">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white">
                <User className="h-4 w-4" />
              </div>
              <div className="hidden flex-col text-left lg:flex">
                <span className="text-sm font-bold text-text-primary">Admin Velure</span>
                <span className="text-[11px] font-medium text-text-hint group-hover:text-accent transition-colors">Administrateur</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="mx-auto max-w-screen-2xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
