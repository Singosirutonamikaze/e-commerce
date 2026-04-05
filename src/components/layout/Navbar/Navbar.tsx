'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, User, Search, Menu, X, Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/cn';
import { motion, AnimatePresence } from 'framer-motion';
import { ROUTES } from '@/lib/utils/constants/routes';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Produits', href: ROUTES.PRODUCTS },
    { name: 'Catégories', href: ROUTES.CATEGORIES },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled
          ? "bg-surface/80 backdrop-blur-lg shadow-sm border-b border-border py-3"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href={ROUTES.HOME} className="flex items-center gap-2">
          <div className="h-8 w-8 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-xl italic tracking-tighter">V</span>
          </div>
          <span className="text-2xl font-black tracking-tighter text-text-primary uppercase">Velure</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-bold transition-all hover:text-accent",
                pathname === link.href ? "text-accent" : "text-text-muted"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:flex rounded-full px-3">
            <Search className="h-5 w-5" />
          </Button>
          <Link href={ROUTES.ACCOUNT.WISHLIST}>
            <Button variant="ghost" size="sm" className="hidden sm:flex rounded-full px-3">
              <Heart className="h-5 w-5" />
            </Button>
          </Link>
          <Link href={ROUTES.CART}>
            <Button variant="ghost" size="sm" className="rounded-full px-3 relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-3.5 w-3.5 bg-accent text-[10px] font-bold text-white rounded-full flex items-center justify-center">
                0
              </span>
            </Button>
          </Link>
          <hr className="hidden sm:block h-6 w-[1px] bg-border mx-1" />
          <Link href={ROUTES.AUTH.LOGIN} className="hidden sm:block">
            <Button variant="ghost" size="sm" className="rounded-full px-3">
              <User className="h-5 w-5 mr-2" />
              <span className="text-sm font-bold">Connexion</span>
            </Button>
          </Link>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden rounded-full px-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-surface border-b border-border shadow-xl md:hidden overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-bold text-text-primary hover:text-accent transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-border" />
              <div className="flex flex-col gap-2">
                <Link href={ROUTES.AUTH.LOGIN} onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full justify-center font-bold">Connexion / Inscription</Button>
                </Link>
                <Link href={ROUTES.ACCOUNT.ROOT} onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-center font-bold">Mon Compte</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
