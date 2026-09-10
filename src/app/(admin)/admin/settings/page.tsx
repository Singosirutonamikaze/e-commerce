import { ShieldCheck, Globe, Bell, Database } from "lucide-react";

export const metadata = {
  title: "Paramètres Système | Velure Admin",
  description: "Configuration globale et paramètres de sécurité de la boutique",
};

export default function AdminSettingsPage() {
  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      <header className="border-b border-slate-800/80 pb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold text-slate-400">
            Administration
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-serif text-white tracking-tight">
          Paramètres du système
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Configurez les paramètres de sécurité, passerelles et préférences de la boutique.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border border-slate-800/80 rounded-lg bg-slate-900/60 backdrop-blur-md flex flex-col gap-4">
          <div className="flex items-center gap-3 border-b border-slate-800/80 pb-3">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
            <div>
              <h3 className="text-sm font-semibold text-white">Sécurité & Accès</h3>
              <p className="text-[11px] text-slate-400">Contrôle d&apos;authentification et rôles</p>
            </div>
          </div>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex items-center justify-between py-2 border-b border-slate-800/60">
              <span>Authentification 2FA</span>
              <span className="px-2 py-0.5 bg-emerald-950/40 text-emerald-400 border border-emerald-800/50 text-[10px] rounded-lg">
                Activé
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-800/60">
              <span>Protection des sessions Supabase</span>
              <span className="px-2 py-0.5 bg-emerald-950/40 text-emerald-400 border border-emerald-800/50 text-[10px] rounded-lg">
                Sécurisé
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span>Contrôle d&apos;accès RBAC</span>
              <span className="text-slate-400">Rôle ADMIN requis</span>
            </div>
          </div>
        </div>

        <div className="p-6 border border-slate-800/80 rounded-lg bg-slate-900/60 backdrop-blur-md flex flex-col gap-4">
          <div className="flex items-center gap-3 border-b border-slate-800/80 pb-3">
            <Globe className="h-5 w-5 text-sky-400" />
            <div>
              <h3 className="text-sm font-semibold text-white">Boutique & Devises</h3>
              <p className="text-[11px] text-slate-400">Paramètres régionaux de la plateforme</p>
            </div>
          </div>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex items-center justify-between py-2 border-b border-slate-800/60">
              <span>Devise principale</span>
              <span className="font-semibold text-white">FCFA (XOF)</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-800/60">
              <span>Seuil de livraison offerte</span>
              <span className="font-semibold text-white">100 000 FCFA</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span>Frais d&apos;expédition standard</span>
              <span className="font-semibold text-white">5 000 FCFA</span>
            </div>
          </div>
        </div>

        <div className="p-6 border border-slate-800/80 rounded-lg bg-slate-900/60 backdrop-blur-md flex flex-col gap-4">
          <div className="flex items-center gap-3 border-b border-slate-800/80 pb-3">
            <Database className="h-5 w-5 text-indigo-400" />
            <div>
              <h3 className="text-sm font-semibold text-white">Base de données</h3>
              <p className="text-[11px] text-slate-400">PostgreSQL avec Prisma ORM</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            La base de données gère les modèles Produits, Catégories, Commandes, Utilisateurs et Adresses en temps réel.
          </p>
        </div>

        <div className="p-6 border border-slate-800/80 rounded-lg bg-slate-900/60 backdrop-blur-md flex flex-col gap-4">
          <div className="flex items-center gap-3 border-b border-slate-800/80 pb-3">
            <Bell className="h-5 w-5 text-amber-400" />
            <div>
              <h3 className="text-sm font-semibold text-white">Notifications & Alertes</h3>
              <p className="text-[11px] text-slate-400">Alertes stock bas et nouvelles commandes</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Les notifications système sont actives pour vous avertir dès qu&apos;une commande est confirmée ou qu&apos;un article passe sous le seuil critique.
          </p>
        </div>
      </div>
    </div>
  );
}
