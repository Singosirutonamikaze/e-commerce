/**
 * The `DashboardHeader` component renders the header section of the dashboard page. It includes a welcome message and a brief description of the dashboard's features.
 * 
 * @returns The `DashboardHeader` component.
 * @author SINGO Yao Dieu Donné
 * @since 2026-09-10
 */
export function DashboardHeader() {
  return (
    <div className="flex gap-3 justify-between">

      <h1 className="text-xl md:text-xl items-center font-serif text-white leading-tight">
        <></>
        Bienvenue dans <span className="text-slate-400 italic">votre vestiaire</span>
      </h1>
      <p className="max-w-full text-xs sm:text-sm text-slate-400 leading-relaxed">
        Gérez vos commandes, accédez à votre sélection de pièces favorites et découvrez nos nouveautés exclusives.
      </p>
    </div>
  );
}
