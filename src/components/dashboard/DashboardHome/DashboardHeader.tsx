export function DashboardHeader() {
  return (
    <div className="space-y-2">
      <span className="text-[11px] font-semibold tracking-[0.2em] text-neutral-400 text-style-font text-style-font-static">
        Dashboard
      </span>
      <h1 className="text-4xl font-bold text-black text-style-font text-style-font-static">
        Bienvenue dans votre espace
      </h1>
      <p className="max-w-2xl text-sm font-medium text-neutral-500">
        Gérez vos commandes, explorez nos collections et suivez votre expérience
        d&apos;achat.
      </p>
    </div>
  );
}
