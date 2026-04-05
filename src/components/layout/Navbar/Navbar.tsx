'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, User, Search, Menu, X, Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/cn';
import { ROUTES } from '@/lib/utils/constants/routes';
import { createClient } from '@/lib/supabase/client';
import { User as SupabaseUser } from '@supabase/supabase-js';

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
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    getInitialUser();
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const navLinks = [
    { name: 'Collections', href: ROUTES.CATEGORIES },
    { name: 'Catalogue', href: ROUTES.PRODUCTS },
  ];

  const isShopPage = !pathname.startsWith('/admin') && !pathname.startsWith('/account') && !pathname.startsWith('/auth');
  if (!isShopPage) return null;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white border-b border-neutral-100 py-3" : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:text-black",
                pathname === link.href ? "text-black underline underline-offset-4" : "text-neutral-500"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Center: Minimalist Logo Only */}
        <Link href={ROUTES.HOME} className="flex items-center justify-center">
          <div className="h-10 w-10 bg-black rounded-sm flex items-center justify-center text-white font-bold text-xl transition-transform hover:scale-105">
            V
          </div>
        </Link>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="hidden sm:flex hover:bg-neutral-50 rounded-sm">
            <Search className="h-4 w-4" />
          </Button>
          
          <Link href={ROUTES.ACCOUNT.WISHLIST}>
            <Button variant="ghost" size="icon" className="hidden sm:flex hover:bg-neutral-50 rounded-sm">
              <Heart className="h-4 w-4" />
            </Button>
          </Link>

          <Link href={ROUTES.CART}>
            <Button variant="ghost" size="icon" className="relative hover:bg-neutral-50 rounded-sm">
              <ShoppingBag className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-3.5 w-3.5 bg-black text-[8px] font-bold text-white rounded-sm flex items-center justify-center border border-white">
                0
              </span>
            </Button>
          </Link>

          <div className="hidden md:block h-5 w-[1px] bg-neutral-200 mx-2" />

          {user ? (
            <Link href={ROUTES.ACCOUNT.ROOT}>
              <Button variant="default" size="sm" className="h-9 px-5 text-[9px] font-bold tracking-widest uppercase rounded-sm bg-black text-white hover:bg-neutral-900 transition-all flex items-center gap-2">
                <User className="h-3.5 w-3.5" />
                Tableau de bord
              </Button>
            </Link>
          ) : (
            <Link href={ROUTES.AUTH.LOGIN} className="hidden md:block">
              <Button size="sm" className="h-9 px-6 bg-black text-white rounded-sm text-[9px] font-bold uppercase tracking-widest">
                Connexion
              </Button>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden h-10 w-10 flex items-center justify-center rounded-sm hover:bg-neutral-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay - Minimalist */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-neutral-100 p-10 md:hidden shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xl font-bold tracking-tight text-black hover:text-neutral-500 transition-colors uppercase"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className="h-[1px] w-full bg-neutral-100" />
            
            <div className="flex flex-col gap-4">
              <Link href={user ? ROUTES.ACCOUNT.ROOT : ROUTES.AUTH.LOGIN} onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full h-12 rounded-sm font-bold uppercase tracking-widest text-[10px] bg-black text-white">
                  {user ? 'Votre Dashboard' : 'Accéder au Compte'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
