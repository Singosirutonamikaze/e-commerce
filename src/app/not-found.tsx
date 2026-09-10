import Link from "next/link";
import { ROUTES } from "@/lib/utils/constants/routes";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between px-6 py-12 md:px-12 lg:px-16">
      <header className="flex items-center justify-between border-b border-slate-800/80 pb-6">
        <Link href={ROUTES.HOME} className="text-sm font-medium tracking-tight text-white lowercase">
          velure
        </Link>
        <span className="font-mono text-xs text-slate-500 lowercase">
          erreur 404
        </span>
      </header>

      <section className="max-w-2xl py-20">
        <p className="font-mono text-xs text-slate-500 mb-4 lowercase">
          page non trouvée
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight leading-tight mb-6">
          La page demandée est introuvable ou n&apos;existe plus.
        </h1>
        <p className="text-sm text-slate-400 max-w-lg leading-relaxed mb-10">
          Vérifiez l&apos;adresse saisie ou explorez nos sélections disponibles en ligne.
        </p>

        <div className="flex flex-wrap items-center gap-6 text-xs">
          <Link
            href={ROUTES.HOME}
            className="px-5 py-2.5 bg-white text-slate-950 font-medium hover:bg-slate-200 transition-colors lowercase"
          >
            retour à l&apos;accueil
          </Link>
          <Link
            href={ROUTES.PRODUCTS}
            className="text-slate-400 hover:text-white underline underline-offset-4 transition-colors lowercase"
          >
            voir les collections
          </Link>
          <Link
            href={ROUTES.CONTACT}
            className="text-slate-500 hover:text-slate-300 transition-colors lowercase"
          >
            contacter le support
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
        <p className="lowercase">© 2026 velure atelier.</p>
        <p className="lowercase">lomé, togo</p>
      </footer>
    </main>
  );
}
