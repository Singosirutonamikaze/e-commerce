"use client";

import { Button } from "@/components/ui/Button";
import { ScannerNavLink } from "@/components/ui/ScannerNavLink";
import { createClient } from "@/lib/supabase/client";
import { ROUTES } from "@/lib/utils/constants/routes";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const getInitialUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    getInitialUser();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const navLinks = [
    { name: "Collections", href: ROUTES.CATEGORIES },
    { name: "Catalogue", href: ROUTES.PRODUCTS },
  ];

  const isDashboardRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/auth");

  if (isDashboardRoute) {
    return null;
  }

  return (
    <nav
      className={
        isScrolled || pathname !== "/"
          ? "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 py-3"
          : "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent py-5"
      }
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        <div className="hidden md:flex items-center gap-3">
          {navLinks.map((link) => (
            <ScannerNavLink
              key={link.name}
              href={link.href}
              label={link.name}
            />
          ))}
        </div>

        <Link href={ROUTES.HOME} className="flex items-center justify-center group">
          <div className="flex items-center gap-2 transition-transform hover:scale-105">
            <Image
              src="/favicon.ico"
              alt="Velure Logo"
              width={24}
              height={24}
              className="h-6 w-6 object-contain"
            />
            <span className="font-serif text-lg font-bold tracking-wider text-white">
              VELURE
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:flex hover:bg-slate-900 text-slate-300 hover:text-white h-8 w-8 rounded-none"
          >
            <Search className="h-4 w-4" />
          </Button>

          <Link href={ROUTES.DASHBOARD.WISHLIST}>
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex hover:bg-slate-900 text-slate-300 hover:text-white h-8 w-8 rounded-none"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </Link>

          <Link href={ROUTES.CART}>
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-slate-900 text-slate-300 hover:text-white h-8 w-8 rounded-none"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-3.5 w-3.5 bg-white text-[9px] font-bold text-slate-950 rounded-full flex items-center justify-center">
                0
              </span>
            </Button>
          </Link>

          <div className="hidden md:block h-3.5 w-px bg-slate-800 mx-2" />

          {user ? (
            <Link href={ROUTES.DASHBOARD.ROOT}>
              <Button
                variant="default"
                size="sm"
                className="h-8 px-3 text-xs font-medium bg-white text-slate-950 hover:bg-slate-200 transition-all flex items-center gap-1.5 rounded-none"
              >
                <User className="h-3 w-3" />
                Tableau de bord
              </Button>
            </Link>
          ) : (
            <Link
              href={`${ROUTES.AUTH.LOGIN}?redirect=${pathname}`}
              className="hidden md:block"
            >
              <Button
                size="sm"
                className="h-8 px-3.5 bg-white text-slate-950 text-xs font-medium hover:bg-slate-200 transition-all rounded-none"
              >
                Connexion
              </Button>
            </Link>
          )}

          <button
            title="Menu"
            className="md:hidden h-8 w-8 flex items-center justify-center hover:bg-slate-900 text-slate-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-slate-950 border-b border-slate-800 p-6 md:hidden">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <ScannerNavLink
                  key={link.name}
                  href={link.href}
                  label={link.name}
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              ))}
            </div>

            <div className="h-px w-full bg-slate-800" />

            <div className="flex flex-col gap-2">
              <Link
                href={user ? ROUTES.DASHBOARD.ROOT : ROUTES.AUTH.LOGIN}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button className="w-full h-9 font-medium text-xs bg-white text-slate-950 rounded-none">
                  {user ? "Tableau de bord" : "Se connecter"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
