import { RaycasterBackground } from "@/components/auth/RaycasterBackground/RaycasterBackground";

/**
 * The layout for the authentication pages.
 *
 * @param param0 The children to render.
 * @returns The layout component.
 * @author SINGO Yao Dieu Donné
 * @since 2026-09-10
 */
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#0B1120] px-4 py-8 overflow-hidden">
      <RaycasterBackground />

      <div
        id="auth-card"
        className="relative z-10 w-full max-w-md bg-slate-950/60 backdrop-blur-xl p-6 md:p-8 border border-slate-800/80 rounded-sm shadow-2xl my-auto text-white"
      >
        {children}
      </div>
    </div>
  );
}
